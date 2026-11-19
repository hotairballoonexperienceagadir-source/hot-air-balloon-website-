import { create } from "zustand";

/**
 * Shared contact modal state. One single <ContactModal /> instance is
 * mounted per page (inside <Footer />) and every email contact option on
 * the site opens it through openContact().
 */
interface ContactState {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  isOpen: false,
  openContact: () => set({ isOpen: true }),
  closeContact: () => set({ isOpen: false }),
}));
