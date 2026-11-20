"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useBookingStore, type BookingDestination } from "@/lib/booking-store";

/**
 * The button every booking CTA renders. It opens THE shared booking modal
 * (BookingModal) through the booking store, which preselects the destination
 * of the current page and, when the CTA belongs to a specific package card,
 * that exact package.
 *
 * It lives in its own module so pages and sections can import it without
 * pulling the modal code into the initial JavaScript bundle: the modal
 * itself is loaded on demand (see BookingModalLazy).
 */

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
