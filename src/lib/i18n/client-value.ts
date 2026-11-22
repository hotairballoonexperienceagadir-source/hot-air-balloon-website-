import type { Dictionary, SiteContent } from "./types";

export function toClientI18nValue(
  locale: "en" | "fr" | "de" | "es",
  dict: Dictionary,
  content: SiteContent,
) {
  return {
    locale,
    dict: {
      common: dict.common,
      header: dict.header,
      switcher: dict.switcher,
      home: { hero: dict.home.hero },
      marrakech: { hero: dict.marrakech.hero },
      booking: dict.booking,
      contact: dict.contact,
      reviews: dict.reviews,
      weather: dict.weather,
      floating: dict.floating,
      galleryGrid: dict.galleryGrid,
      social: dict.social,
    },
    content: {
      destinations: {
        agadir: { cityName: content.destinations.agadir.cityName },
        marrakech: {
          cityName: content.destinations.marrakech.cityName,
          heroText: content.destinations.marrakech.heroText,
        },
      },
      reviewHighlights: content.reviewHighlights,
    },
  };
}
