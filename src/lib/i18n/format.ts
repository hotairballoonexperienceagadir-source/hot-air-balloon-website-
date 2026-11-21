import type { Locale } from "./config";

/**
 * Locale aware formatting helpers.
 *
 * PRICES: the number itself always comes from site.ts (single source of
 * truth). Only the DIGIT GROUPING is localized, exactly as approved:
 * - en: "2,199 MAD"
 * - fr: "2 199 MAD"   (narrow no break space, French convention)
 * - de: "2.199 MAD"
 * - es: "2.199 MAD"
 */

function localeTag(locale: Locale): string {
  switch (locale) {
    case "en":
      return "en-US";
    case "fr":
      return "fr-FR";
    case "de":
      return "de-DE";
    case "es":
      return "es-ES";
  }
}

/** "2,199 MAD" / "2 199 MAD" / "2.199 MAD" */
export function formatPrice(mad: number, locale: Locale): string {
  return `${new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 0 }).format(mad)} MAD`;
}

/** Localized number without the currency suffix. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 0 }).format(value);
}

/** Ratings keep exactly one decimal: "5.0" (en) / "5,0" (fr, de, es). */
export function formatRating(rating: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

/**
 * Tiny "{name}" template resolver. Dictionaries are plain serializable
 * data (they cross the server to client boundary through React context),
 * so they can never contain functions: placeholders are resolved here.
 */
export function tpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
