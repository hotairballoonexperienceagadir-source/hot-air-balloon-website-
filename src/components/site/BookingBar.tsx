"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { pagePaths } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";
import { formatRating, tpl } from "@/lib/i18n/format";
import { offersForDestination, type BookingDestination } from "@/lib/booking-store";
import { useBookingForm } from "@/lib/use-booking-form";
import {
  BookingDateField,
  BookingDestinationField,
  BookingGuestsField,
  BookingPackageField,
} from "./BookingFields";
import { Stars, WhatsAppIcon } from "./icons";

/**
 * The original inline booking bar of the hero sections, restored on both
 * pages. It is the always visible twin of the BookingModal and shares the
 * exact same state handling, required field validation and WhatsApp message
 * through useBookingForm and BookingFields, so the two booking surfaces can
 * never drift apart.
 *
 * - Agadir homepage: destination Agadir by default, only the two real Agadir
 *   packages selectable. Choosing Marrakech in the Destination select sends
 *   visitors to the dedicated Marrakech page instead of booking, so the two
 *   destinations and their packages never mix (original behaviour).
 * - Marrakech page: destination locked to Marrakech, only the
 *   real Marrakech packages selectable.
 *
 * WhatsApp opens ONLY when the visitor presses "Check Availability" with a
 * valid date, exactly like in the modal.
 */

export function BookingBar({ page }: { page: BookingDestination }) {
  const { locale, dict, content } = useI18n();
  /* Local form state. The bar never writes to the booking store: the modal
     keeps its own CTA driven preselection (package cards, header, ...). */
  const [destination, setDestination] = useState<BookingDestination>(page);
  const [packageId, setPackageId] = useState(() => offersForDestination(page)[0].id);

  const offers = offersForDestination(destination);
  const selectedOffer = offers.find((offer) => offer.id === packageId) ?? offers[0];

  const booking = useBookingForm({
    destination,
    packageName: selectedOffer.name,
    priceMad: selectedOffer.priceMad,
    minGuests: selectedOffer.minGuests,
  });

  /* Only the Agadir bar can switch into the "go to the Marrakech page" mode:
     the package select disappears and the submit button becomes a link to
     the dedicated Marrakech page. */
  const goToMarrakech = page === "Agadir" && destination === "Marrakech";

  function handleDestinationChange(next: BookingDestination) {
    setDestination(next);
    setPackageId(offersForDestination(next)[0].id);
    booking.clearDateMissing();
  }

  function handlePackageChange(id: string) {
    setPackageId(id);
    booking.clearDateMissing();
  }

  return (
    <div className="mt-8 md:mt-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-white/15 bg-navy-950/70 p-4 shadow-2xl shadow-navy-950/60 backdrop-blur-md sm:grid sm:grid-cols-2 sm:items-end sm:gap-4 sm:p-5 lg:grid-cols-[1fr_1.3fr_0.9fr_0.9fr_auto]">
        <BookingDateField
          value={booking.date}
          min={booking.today}
          onChange={booking.handleDateChange}
          invalid={booking.dateMissing}
        />

        {!goToMarrakech && (
          <BookingPackageField
            offers={offers}
            value={selectedOffer.id}
            onChange={handlePackageChange}
          />
        )}

        {page === "Agadir" ? (
          <BookingDestinationField value={destination} onChange={handleDestinationChange} />
        ) : (
          <div>
            <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {dict.booking.destinationLabel}
            </span>
            <div className="flex h-12 items-center justify-between rounded-xl border border-brand-400/40 bg-brand-500/10 px-4 text-sm font-bold text-brand-200">
              {content.destinations.marrakech.cityName}
            </div>
          </div>
        )}

        <BookingGuestsField
          guests={booking.effectiveGuests}
          onDecrease={() => booking.stepGuests(-1)}
          onIncrease={() => booking.stepGuests(1)}
        />

        {goToMarrakech ? (
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 sm:w-auto"
          >
            <Link href={pagePaths.marrakech[locale]}>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              {dict.booking.goToMarrakechButton}
            </Link>
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            onClick={booking.checkAvailability}
            className="h-12 rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
            {dict.common.checkAvailability}
          </Button>
        )}
      </div>

      {goToMarrakech ? (
        <p className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-sm text-cream-100/85">
          {dict.booking.goToMarrakechNote}
          <Link
            href={pagePaths.marrakech[locale]}
            className="inline-flex items-center gap-1 font-bold text-brand-300 underline-offset-4 hover:underline"
          >
            {dict.booking.exploreMarrakech} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      ) : page === "Agadir" ? (
        <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
          <span className="inline-flex items-center gap-2">
            <Stars className="text-gold-400" />{" "}
            {tpl(dict.booking.trust.googleReviews, { rating: formatRating(site.googleRating, locale) })}
          </span>
          <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" /> {dict.booking.trust.licensed}
          </span>
          <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> {dict.booking.trust.whatsapp}
          </span>
        </div>
      ) : (
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
          <span className="inline-flex items-center gap-2">
            <Stars className="text-gold-400" />{" "}
            {tpl(dict.booking.trust.ratedCompany, { rating: formatRating(site.googleRating, locale) })}
          </span>
          <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" /> {dict.booking.trust.samePilots}
          </span>
        </div>
      )}
    </div>
  );
}
