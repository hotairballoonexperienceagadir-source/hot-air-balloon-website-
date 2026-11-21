import type { SiteContent } from "../types";
import {
  agadirOffers,
  cities,
  experienceSteps,
  faqs,
  marrakechFaqs,
  marrakechOffers,
  marrakechTimeline,
  marrakechWaMessage,
  defaultWaMessage,
  pickupAreas,
  reviewHighlights,
  stats,
  weatherNote,
  whyUs,
} from "@/lib/site";
import { galleryItems } from "@/lib/gallery";
import { marrakechGalleryItems } from "@/lib/marrakech-gallery";

/**
 * English site content.
 *
 * IMPORTANT: this file re-exports the EXISTING objects of src/lib/site.ts
 * (and the two gallery collections) by reference. The English pages therefore
 * render exactly the same data as before the i18n work, byte for byte, with
 * zero risk of drift. Only translations for fr/de/es live in their own
 * content files; prices always stay in site.ts as the single source of truth.
 */
export const en: SiteContent = {
  locale: "en",
  destinations: {
    agadir: {
      cityName: cities.agadir.name,
      bookingDestination: "Agadir",
      headline: cities.agadir.headline,
      intro: cities.agadir.intro,
      launchSite: cities.agadir.launchSite,
      offers: agadirOffers,
      timeline: experienceSteps,
      faqs,
      waMessage: defaultWaMessage,
      faqWaMessage: "Hello! I have a question about the balloon flights in Agadir.",
      stats: stats.map((stat) => ({ ...stat })),
      whyUs: whyUs.map((item) => ({ ...item })),
      experienceSteps: experienceSteps.map((step) => ({ ...step })),
      pickupAreas: pickupAreas.map((area) => ({ ...area })),
    },
    marrakech: {
      cityName: cities.marrakech.name,
      bookingDestination: "Marrakech",
      headline: cities.marrakech.headline,
      intro: cities.marrakech.intro,
      launchSite: cities.marrakech.launchSite,
      offers: marrakechOffers,
      timeline: marrakechTimeline,
      faqs: marrakechFaqs,
      waMessage: marrakechWaMessage,
      faqWaMessage: "Hello! I have a question about the balloon flights in Marrakech.",
    },
  },
  weatherNote,
  reviewHighlights: [...reviewHighlights],
  gallery: {
    agadir: galleryItems,
    marrakech: marrakechGalleryItems,
  },
};
