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
 *
 * The grouping is written by hand instead of relying on Intl.NumberFormat:
 * CLDR treats Spanish as "grouping from 10000 only" (2199 would render
 * "2199"), while the approved site convention is "2.199 MAD" in Spanish.
 */

function groupDigits(value: string, separator: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/** "2,199 MAD" / "2 199 MAD" / "2.199 MAD" */
export function formatPrice(mad: number, locale: Locale): string {
  const digits = groupDigits(String(mad), locale === "en" ? "," : locale === "fr" ? "\u202f" : ".");
  return `${digits} MAD`;
}

/** Localized number without the currency suffix. */
export function formatNumber(value: number, locale: Locale): string {
  return groupDigits(String(value), locale === "en" ? "," : locale === "fr" ? "\u202f" : ".");
}

/** Ratings keep exactly one decimal: "5.0" (en) / "5,0" (fr, de, es). */
export function formatRating(rating: number, locale: Locale): string {
  const fixed = rating.toFixed(1);
  return locale === "en" ? fixed : fixed.replace(".", ",");
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
