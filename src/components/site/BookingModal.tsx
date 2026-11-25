"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { offersForDestination, useBookingStore, type BookingDestination } from "@/lib/booking-store";
import { useBookingForm } from "@/lib/use-booking-form";
import { useI18n } from "@/lib/i18n/context";
import { BookingDateField, BookingDestinationField, BookingGuestsField, BookingPackageField } from "./BookingFields";
import { WhatsAppIcon } from "./icons";

/**
 * THE booking modal of the website, shown in a popup.
 *
 * One single instance is mounted per page (inside <Header /> through
 * BookingModalLazy) and every booking CTA opens it through the booking
 * store, which preselects the destination of the current page and, when the
 * CTA belongs to a specific package card, that exact package.
 *
 * It shares its state handling, required field validation and the exact
 * WhatsApp message with the inline hero BookingBar through useBookingForm
 * and BookingFields, so the two booking surfaces can never drift apart.
 * WhatsApp opens ONLY when the visitor presses "Check Availability" with a
 * valid date.
 */

export function BookingModal() {
  const { dict } = useI18n();
  const isOpen = useBookingStore((state) => state.isOpen);
  const destination = useBookingStore((state) => state.destination);
  const packageId = useBookingStore((state) => state.packageId);
  const closeBooking = useBookingStore((state) => state.closeBooking);
  const setDestination = useBookingStore((state) => state.setDestination);
  const setPackageId = useBookingStore((state) => state.setPackageId);

  const offers = offersForDestination(destination);
  const selectedOffer = offers.find((offer) => offer.id === packageId) ?? offers[0];

  const booking = useBookingForm({
    destination,
    packageId: selectedOffer.id,
    packageName: selectedOffer.name,
    priceMad: selectedOffer.priceMad,
    minGuests: selectedOffer.minGuests,
    onSubmitted: closeBooking,
  });

  function handleDestinationChange(next: BookingDestination) {
    setDestination(next);
    booking.clearDateMissing();
  }

  function handlePackageChange(id: string) {
    setPackageId(id);
    booking.clearDateMissing();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(next) => !next && closeBooking()}>
      <DialogContent
        className="gap-0 rounded-2xl border border-white/15 bg-navy-900 p-6 text-cream-100 shadow-2xl shadow-navy-950/70 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-white">
            {dict.booking.modalTitle}
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm leading-relaxed text-cream-100/75">
            {dict.booking.modalDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <BookingDateField
            value={booking.date}
            min={booking.today}
            onChange={booking.handleDateChange}
            invalid={booking.dateMissing}
          />
          <BookingPackageField offers={offers} value={selectedOffer.id} onChange={handlePackageChange} />
          <BookingDestinationField value={destination} onChange={handleDestinationChange} />
          <BookingGuestsField
            guests={booking.effectiveGuests}
            onDecrease={() => booking.stepGuests(-1)}
            onIncrease={() => booking.stepGuests(1)}
          />
        </div>

        <Button
          type="button"
          onClick={booking.checkAvailability}
          className="mt-6 h-12 w-full rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 hover:bg-brand-600"
        >
          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
          {dict.common.checkAvailability}
        </Button>
        <p className="mt-3 text-center text-xs text-cream-100/60">
          {dict.booking.modalNote}
        </p>
      </DialogContent>
    </Dialog>
  );
}

