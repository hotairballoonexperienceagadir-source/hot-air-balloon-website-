"use client";

import { useState, useSyncExternalStore } from "react";
import { waLink } from "@/lib/site";
import type { BookingDestination } from "@/lib/booking-store";

/**
 * Shared booking form logic used by BOTH booking surfaces of the site:
 * - <BookingBar />, the original inline booking bar restored in both heroes.
 * - <BookingModal />, the popup opened by every Book Now CTA.
 *
 * One single source of truth for the form state, the required field
 * validation (the flight date is the only field that can be missing) and the
 * exact WhatsApp availability message, so the two forms can never drift
 * apart or send different details.
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
   site goes through this one builder. The price always comes from the
   selected offer (site.ts), so the message can never drift from the
   displayed price. */
function buildBookingMessage(input: {
  destination: BookingDestination;
  packageName: string;
  priceMad: number;
  date: string;
  guests: number;
}): string {
  return [
    "Hello, I would like to check availability for a hot air balloon flight.",
    "",
    `Destination: ${input.destination}`,
    `Package: ${input.packageName}`,
    `Date: ${input.date}`,
    `Number of Guests: ${input.guests}`,
    `Price: ${input.priceMad.toLocaleString("en-US")} MAD per person`,
    "",
    "Could you please confirm availability?",
  ].join("\n");
}

export function useBookingForm(options: {
  destination: BookingDestination;
  packageName: string;
  /* The per person price of the selected package, shown in the WhatsApp
     message. Always read from the offer in site.ts. */
  priceMad: number;
  /* A package may carry a minimum number of guests (Private and Royal
     Flights, 2). */
  minGuests?: number;
  /* Called after WhatsApp opened successfully (the modal closes itself). */
  onSubmitted?: () => void;
}) {
  const { destination, packageName, priceMad, minGuests = 1, onSubmitted } = options;

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

    const message = buildBookingMessage({
      destination,
      packageName,
      priceMad,
      date,
      guests: effectiveGuests,
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
