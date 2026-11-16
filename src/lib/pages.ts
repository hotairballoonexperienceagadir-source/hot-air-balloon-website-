import pagesJson from "../../data/pages.json";
import productsJson from "../../data/products.json";
import reviewsJson from "../../data/reviews.json";
import { LANGS, type Lang, type PageMeta } from "./types";
import { config } from "./config";

export const pages: PageMeta[] = (pagesJson as unknown as { pages: PageMeta[] }).pages;

export function pageById(id: string): PageMeta | undefined {
  return pages.find((p) => p.id === id);
}

export function pageByUrl(url: string): PageMeta | undefined {
  const normalized = url.endsWith("/") ? url : url + "/";
  return pages.find((p) => p.url === normalized);
}

export function pageBySlug(lang: Lang, slug: string[]): PageMeta | undefined {
  if (!LANGS.includes(lang)) return undefined;
  if (slug.length === 0) return pageByUrl(`/${lang}/`);
  return pageByUrl(`/${lang}/${slug.join("/")}/`);
}

export function pagesByLang(lang: Lang): PageMeta[] {
  return pages.filter((p) => p.lang === lang);
}

export function pagesByType(lang: Lang, type: PageMeta["pageType"]): PageMeta[] {
  return pagesByLang(lang).filter((p) => p.pageType === type);
}

/** All hreflang entries for a page: itself + alternates + x-default (EN version when it exists). */
export function hreflangOf(page: PageMeta): { lang: string; url: string }[] {
  const out: { lang: string; url: string }[] = [{ lang: page.lang, url: page.url }];
  for (const [l, u] of Object.entries(page.alternates)) {
    if (u && l !== page.lang && !out.some((o) => o.lang === l)) out.push({ lang: l, url: u });
  }
  const en = page.lang === "en" ? page : pageById(`en-${page.id.replace(/^[a-z]{2}-/, "")}`);
  if (en && page.lang !== "en") {
    if (!out.some((o) => o.lang === "en")) out.push({ lang: "en", url: en.url });
    out.push({ lang: "x-default", url: en.url });
  } else {
    out.push({ lang: "x-default", url: page.url });
  }
  return out;
}

/** Language switcher: link to equivalent, else that language's home. Never a dead link. */
export function switcherUrl(page: PageMeta, target: Lang): string {
  if (target === page.lang) return page.url;
  const alt = page.alternates[target];
  if (alt) return alt;
  return `/${target}/`;
}

export function breadcrumbTrail(page: PageMeta): { name: string; url: string }[] {
  const trail: { name: string; url: string }[] = [];
  let current: PageMeta | undefined = page;
  const guard = new Set<string>();
  while (current) {
    if (guard.has(current.id)) break;
    guard.add(current.id);
    trail.unshift({ name: current.h1, url: current.url });
    current = current.parent ? pageById(current.parent) : undefined;
  }
  return trail;
}

export interface Product {
  id: string;
  city: "marrakech" | "agadir";
  flightKey: string;
  durationFlight: number;
  pickupTime: string;
  returnTime: string;
  groupSize: string;
  minAge: number;
  images: string[];
  pageByLang: Partial<Record<Lang, string>>;
  siblingIds: string[];
}

export const products: Product[] = (productsJson as unknown as { products: Product[] }).products;

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productPage(product: Product, lang: Lang): PageMeta | undefined {
  const url = product.pageByLang[lang];
  if (!url) return undefined;
  return pageByUrl(url);
}

/** The product page for this URL (if the URL is a product page). */
export function productOfPage(page: PageMeta): Product | undefined {
  return products.find((p) => p.pageByLang[page.lang] === page.url);
}

export function siblingsOf(product: Product, lang: Lang): PageMeta[] {
  return product.siblingIds
    .map((id) => productById(id))
    .filter((p): p is Product => Boolean(p))
    .map((p) => productPage(p, lang) || productPage(p, "en"))
    .filter((p): p is PageMeta => Boolean(p));
}

export interface Review {
  name: string;
  country: Record<string, string>;
  rating: number;
  date: string;
  flight: string;
  text: Record<string, string>;
}

export const reviews: Review[] = (reviewsJson as unknown as { reviews: Review[] }).reviews;

export function reviewText(review: Review, lang: Lang): string {
  return review.text[lang] || review.text.en;
}

export function aggregateRating() {
  const ar = config.reviews.aggregateRating;
  return ar.enabled ? ar : null;
}

export { LANGS };
export type { Lang };
