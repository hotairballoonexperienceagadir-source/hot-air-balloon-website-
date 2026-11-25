"use client";

import { useState, useSyncExternalStore } from "react";
import { waLink } from "@/lib/site";
import { languageNameInEnglish } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";
import { formatPrice } from "@/lib/i18n/format";
import type { BookingDestination } from "@/lib/booking-store";
import { trackEvent } from "@/lib/analytics";

/**
 * Shared booking form logic used by BOTH booking surfaces of the site:
 * - <BookingBar />, the original inline booking bar restored in both heroes.
 * - <BookingModal />, the popup opened by every Book Now CTA.
 *
 * One single source of truth for the form state, the required field
 * validation (the flight date is the only field that can be missing) and the
 * exact WhatsApp availability message, so the two forms can never drift
 * apart or send different details.
 *
 * LOCALIZATION: the message is written in the language of the page the
 * visitor is on (owner approved 2026-11-21). After the Total line it always
 * carries a literal "Language: English/French/German/Spanish" line so the
 * team can see the conversation language at a glance. The price and total
 * come from the selected offer (site.ts), so they can never drift from the
 * displayed price, and the total is computed at submit time. Never hardcode
 * totals. The date stays ISO (YYYY-MM-DD) in every language.
 */

/* Upper limit of the guest counter, identical everywhere. */
const MAX_GUESTS = 16;

/* Today in UTC, read through useSyncExternalStore so the server rendered HTML
   and the hydration pass use the identical (empty) snapshot. A render-time or
   effect-time clock read made SSR and hydration diverge whenever they
   straddled UTC midnight, which tripped React hydration recovery. */
const subscribeToClock = () => () => {};
const getClientToday = () => new Date().toISOString().slice(0, 10);
const getServerToday = () => "";

export function useToday() {
  return useSyncExternalStore(subscribeToClock, getClientToday, getServerToday);
}

/* The exact availability message WhatsApp receives. Every booking on the
   site goes through this one builder. */
function buildBookingMessage(input: {
  packageName: string;
  priceMad: number;
  date: string;
  guests: number;
  destinationName: string;
  locale: "en" | "fr" | "de" | "es";
  messages: {
    greeting: string;
    destinationLabel: string;
    packageLabel: string;
    dateLabel: string;
    guestsLabel: string;
    priceLabel: string;
    perPerson: string;
    totalLabel: string;
    languageLabel: string;
    confirm: string;
  };
}): string {
  return [
    input.messages.greeting,
    "",
    `${input.messages.destinationLabel} ${input.destinationName}`,
    `${input.messages.packageLabel} ${input.packageName}`,
    `${input.messages.dateLabel} ${input.date}`,
    `${input.messages.guestsLabel} ${input.guests}`,
    `${input.messages.priceLabel} ${formatPrice(input.priceMad, input.locale)} ${input.messages.perPerson}`,
    `${input.messages.totalLabel} ${formatPrice(input.priceMad * input.guests, input.locale)}`,
    `${input.messages.languageLabel} ${languageNameInEnglish[input.locale]}`,
    "",
    input.messages.confirm,
  ].join("\n");
}

export function useBookingForm(options: {
  destination: BookingDestination;
  /* Offer id of the selected package (analytics only, never in the message). */
  packageId: string;
  packageName: string;
  /* The per person price of the selected package, shown in the WhatsApp
     message. Always read from the offer in site.ts. */
  priceMad: number;
  /* A package may carry a minimum number of guests (the Private Flights in
     both cities and the Marrakech Royal Flight, 2). */
  minGuests?: number;
  /* Called after WhatsApp opened successfully (the modal closes itself). */
  onSubmitted?: () => void;
}) {
  const { destination, packageId, packageName, priceMad, minGuests = 1, onSubmitted } = options;
  const { locale, content, dict } = useI18n();

  const today = useToday();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [dateMissing, setDateMissing] = useState(false);

  /* Derived during render: the counter always shows and submits at least the
     selected package minimum, without any state syncing effect. */
  const effectiveGuests = Math.max(guests, minGuests);

  function handleDateChange(value: string) {
    setDate(value);
    setDateMissing(false);
  }

  function clearDateMissing() {
    setDateMissing(false);
  }

  function stepGuests(delta: number) {
    setGuests((current) => Math.min(MAX_GUESTS, Math.max(minGuests, current + delta)));
  }

  /* Required field validation: only the date can be missing, the other
     fields always hold a value. WhatsApp never opens before this point. */
  function checkAvailability(): boolean {
    if (!date) {
      setDateMissing(true);
      return false;
    }

    /* Localized destination name for the message: "Agadir", "Marrakech",
       "Marrakesch" (German)... always the display name of the city. */
    const destinationName =
      destination === "Agadir"
        ? content.destinations.agadir.cityName
        : content.destinations.marrakech.cityName;

    const message = buildBookingMessage({
      packageName,
      priceMad,
      date,
      guests: effectiveGuests,
      destinationName,
      locale,
      messages: dict.booking.messages,
    });

    /* GA4 lead (no-op without analytics consent). No personal data. */
    trackEvent("generate_lead", {
      method: "whatsapp",
      destination: destination === "Agadir" ? "agadir" : "marrakech",
      package: packageId,
      guests: effectiveGuests,
      value: priceMad * effectiveGuests,
      currency: "MAD",
      language: locale,
    });

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    onSubmitted?.();
    return true;
  }

  return {
    today,
    date,
    handleDateChange,
    guests,
    effectiveGuests,
    minGuests,
    stepGuests,
    dateMissing,
    clearDateMissing,
    checkAvailability,
  };
}
