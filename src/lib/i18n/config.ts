/**
 * i18n configuration: locales, native language names and the URL map.
 *
 * ROUTING MODEL (owner approved 2026-11-21):
 * - English stays the DEFAULT language at the exact existing URLs "/" and
 *   "/marrakech-flights". Those two URLs are NEVER moved or redirected.
 * - French, German and Spanish live under their own prefix with their own
 *   translated, keyword friendly slugs:
 *       /fr/                          /fr/montgolfiere-marrakech
 *       /de/                          /de/ballonfahrt-marrakesch
 *       /es/                          /es/globo-aerostatico-marrakech
 * - There is NO automatic browser or IP based language redirect anywhere.
 *   Visitors pick their language with the header switcher; the choice is
 *   remembered in localStorage only for convenience (it never triggers a
 *   redirect by itself).
 */

export const locales = ["en", "fr", "de", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Native language names shown in the switcher (identical in every UI language). */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
};

/** Uppercase short code shown next to the globe icon in the switcher. */
export const localeShortCodes: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
};

/**
 * Language name written in English. Used ONLY inside WhatsApp messages
 * ("Language: French") so the team can filter incoming conversations
 * regardless of the language the visitor writes in.
 */
export const languageNameInEnglish: Record<Locale, string> = {
  en: "English",
  fr: "French",
  de: "German",
  es: "Spanish",
};

export type PageKey = "home" | "marrakech";

/**
 * The exact URL of every page in every language. ONE single map, used by
 * the language switcher, the hreflang alternates and the sitemap, so all
 * three can never drift apart.
 */
export const pagePaths: Record<PageKey, Record<Locale, string>> = {
  home: {
    en: "/",
    fr: "/fr",
    de: "/de",
    es: "/es",
  },
  marrakech: {
    en: "/marrakech-flights",
    fr: "/fr/montgolfiere-marrakech",
    de: "/de/ballonfahrt-marrakesch",
    es: "/es/globo-aerostatico-marrakech",
  },
};

/** Absolute URL helpers for hreflang and the sitemap. */
export function absolutePageUrl(pageKey: PageKey, locale: Locale): string {
  const base = "https://www.hotairballoonexperienceagadir.com";
  return `${base}${pagePaths[pageKey][locale]}`;
}

/**
 * Which of the two real pages does this pathname belong to? Used by the
 * language switcher so it always links to the SAME page in the other
 * language (Agadir home to Agadir home, Marrakech page to Marrakech page).
 * Unknown paths (404 and friends) fall back to the homepage.
 */
export function pageKeyFromPathname(pathname: string): PageKey {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (
    clean === "/marrakech-flights" ||
    clean === "/fr/montgolfiere-marrakech" ||
    clean === "/de/ballonfahrt-marrakesch" ||
    clean === "/es/globo-aerostatico-marrakech"
  ) {
    return "marrakech";
  }
  return "home";
}
