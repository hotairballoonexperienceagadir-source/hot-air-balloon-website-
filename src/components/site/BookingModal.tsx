"use client";

import { useState, useSyncExternalStore, type ComponentProps } from "react";
import { CalendarDays, MapPin, Minus, Plus, ShieldCheck, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import { offersForDestination, useBookingStore, type BookingDestination } from "@/lib/booking-store";
import { WhatsAppIcon } from "./icons";

/**
 * THE booking form of the website, shown in a modal.
 *
 * One single instance is mounted per page (inside <Header />) and every
 * booking CTA opens it through the booking store, which preselects the
 * destination of the current page and, when the CTA belongs to a specific
 * package card, that exact package.
 *
 * Design mirrors the original hero booking bar: navy panel, gold uppercase
 * field labels, white/10 rounded inputs and the brand WhatsApp submit button.
 * WhatsApp opens ONLY when the visitor presses "Check Availability" with a
 * valid date.
 */

/* Today in UTC, read through useSyncExternalStore so the server rendered HTML
   and the hydration pass use the identical (empty) snapshot. A render-time or
   effect-time clock read made SSR and hydration diverge whenever they
   straddled UTC midnight, which tripped React hydration recovery. */
const subscribeToClock = () => () => {};
const getClientToday = () => new Date().toISOString().slice(0, 10);
const getServerToday = () => "";

export function BookingModal() {
  const isOpen = useBookingStore((state) => state.isOpen);
  const destination = useBookingStore((state) => state.destination);
  const packageId = useBookingStore((state) => state.packageId);
  const closeBooking = useBookingStore((state) => state.closeBooking);
  const setDestination = useBookingStore((state) => state.setDestination);
  const setPackageId = useBookingStore((state) => state.setPackageId);

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [dateMissing, setDateMissing] = useState(false);

  /* Deterministic today: SSR and hydration both render without min, the real
     date is applied right after mount. */
  const today = useSyncExternalStore(subscribeToClock, getClientToday, getServerToday);

  const offers = offersForDestination(destination);
  const selectedOffer = offers.find((offer) => offer.id === packageId) ?? offers[0];

  /* A package may carry a minimum number of guests (Private Flight, 2 guests).
     Derived during render: the counter always shows and submits at least the
     selected package minimum, without any state syncing effect. */
  const minGuests = selectedOffer.minGuests ?? 1;
  const effectiveGuests = Math.max(guests, minGuests);

  function handleDestinationChange(next: BookingDestination) {
    setDestination(next);
    setDateMissing(false);
  }

  function handlePackageChange(id: string) {
    setPackageId(id);
    setDateMissing(false);
  }

  function handleCheckAvailability() {
    /* Required field validation: only the date can be missing, the other
       fields always hold a value. WhatsApp never opens before this point. */
    if (!date) {
      setDateMissing(true);
      return;
    }

    const message = [
      "Hello, I would like to check availability for a hot air balloon flight.",
      "",
      `Destination: ${destination}`,
      `Package: ${selectedOffer.name}`,
      `Date: ${date}`,
      `Number of Guests: ${effectiveGuests}`,
      "",
      "Could you please confirm availability?",
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    closeBooking();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(next) => !next && closeBooking()}>
      <DialogContent
        className="gap-0 rounded-2xl border border-white/15 bg-navy-900 p-6 text-cream-100 shadow-2xl shadow-navy-950/70 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-white">
            Book Your Balloon Flight
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm leading-relaxed text-cream-100/75">
            Select your details below and our team confirms availability with you directly on WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Select Date
            </span>
            <input
              type="date"
              min={today || undefined}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setDateMissing(false);
              }}
              aria-label="Flight date"
              aria-invalid={dateMissing || undefined}
              className={`h-12 w-full rounded-xl border bg-white/10 px-4 text-white [color-scheme:dark] outline-none transition focus:border-brand-400 ${
                dateMissing ? "border-red-400/70" : "border-white/15"
              }`}
            />
            {dateMissing && (
              <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-300">
                Please select your preferred flight date.
              </span>
            )}
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Package
            </span>
            <select
              value={selectedOffer.id}
              onChange={(event) => handlePackageChange(event.target.value)}
              aria-label="Flight package"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
            >
              {offers.map((offer) => (
                <option key={offer.id} value={offer.id} className="text-navy-900">
                  {offer.name} | {offer.priceMad.toLocaleString("en-US")} MAD
                  {offer.minGuests ? ` (min ${offer.minGuests} guests)` : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destination
            </span>
            <select
              value={destination}
              onChange={(event) => handleDestinationChange(event.target.value as BookingDestination)}
              aria-label="Flight destination"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
            >
              <option value="Agadir" className="text-navy-900">Agadir (main)</option>
              <option value="Marrakech" className="text-navy-900">Marrakech</option>
            </select>
          </label>

          <div>
            <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Number of Guests
            </span>
            <div className="flex h-12 items-center justify-between rounded-xl border border-white/15 bg-white/10 px-2">
              <button
                type="button"
                aria-label="Remove one guest"
                onClick={() => setGuests((current) => Math.max(minGuests, current - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-base font-bold text-white" aria-live="polite">{effectiveGuests}</span>
              <button
                type="button"
                aria-label="Add one guest"
                onClick={() => setGuests((current) => Math.min(16, current + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleCheckAvailability}
          className="mt-6 h-12 w-full rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 hover:bg-brand-600"
        >
          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
          Check Availability
        </Button>
        <p className="mt-3 text-center text-xs text-cream-100/60">
          WhatsApp opens with your booking details ready to send.
        </p>
      </DialogContent>
    </Dialog>
  );
}

/* BookingButton keeps the exact visual design of the previous WhatsApp link
   buttons while opening the shared booking modal instead. Server components
   use it to trigger the modal without holding any booking state. */
type BookingButtonProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
  destination: BookingDestination;
  /** Preselect a specific package of the given destination. */
  packageId?: string;
};

export function BookingButton({ destination, packageId, onClick, children, ...buttonProps }: BookingButtonProps) {
  const openBooking = useBookingStore((state) => state.openBooking);
  return (
    <Button
      {...buttonProps}
      onClick={(event) => {
        onClick?.(event);
        openBooking({ destination, packageId });
      }}
    >
      {children}
    </Button>
  );
}
