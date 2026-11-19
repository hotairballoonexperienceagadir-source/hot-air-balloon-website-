import { create } from "zustand";
import { agadirOffers, marrakechOffers } from "@/lib/site";

/**
 * Shared booking modal state for BOTH destinations.
 *
 * One single booking form instance lives in <BookingModal /> (mounted once per
 * page inside <Header />). Every booking CTA on the site opens it through
 * openBooking(), which locks the destination and package to the current page
 * context:
 * - Agadir homepage: destination "Agadir", only agadirOffers selectable.
 * - Marrakech page: destination "Marrakech", only marrakechOffers selectable.
 *
 * A requested packageId is only honoured when it belongs to the requested
 * destination, so Agadir and Marrakech packages can never mix.
 */

export type BookingDestination = "Agadir" | "Marrakech";

const offersByDestination: Record<BookingDestination, typeof agadirOffers> = {
  Agadir: agadirOffers,
  Marrakech: marrakechOffers,
};

interface BookingState {
  isOpen: boolean;
  destination: BookingDestination;
  packageId: string;
  openBooking: (options?: { destination?: BookingDestination; packageId?: string }) => void;
  closeBooking: () => void;
  setDestination: (destination: BookingDestination) => void;
  setPackageId: (packageId: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  destination: "Agadir",
  packageId: agadirOffers[0].id,
  openBooking: (options) =>
    set((state) => {
      const destination = options?.destination ?? state.destination;
      const offers = offersByDestination[destination];
      const requested = options?.packageId;
      const packageId =
        requested && offers.some((offer) => offer.id === requested) ? requested : offers[0].id;
      return { isOpen: true, destination, packageId };
    }),
  closeBooking: () => set({ isOpen: false }),
  setDestination: (destination) =>
    set({ destination, packageId: offersByDestination[destination][0].id }),
  setPackageId: (packageId) => set({ packageId }),
}));

export const offersForDestination = (destination: BookingDestination) =>
  offersByDestination[destination];
