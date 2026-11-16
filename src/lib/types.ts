/** Shared site types */

export type Lang = "en" | "fr" | "de" | "es" | "nl";

export const LANGS: Lang[] = ["en", "fr", "de", "es", "nl"];

export type PageType =
  | "home" | "product" | "city" | "pillar" | "pricing" | "reviews"
  | "faq" | "booking" | "blogHub" | "guide" | "about" | "legal" | "info";

export interface PageMeta {
  id: string;
  lang: Lang;
  priority: string;
  pageType: PageType;
  pageTypeRaw: string;
  url: string;
  parent: string | null;
  primaryKeyword: string;
  primaryVolume: number | null;
  secondaryKeywords: { kw: string; volume: number | null }[];
  intent: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  wordCount: { min: number; max: number };
  schema: string[];
  linksOut: string[];
  alternates: Partial<Record<Lang, string>>;
  whatsapp: { number: string; message: string } | null;
}

export interface Faq {
  q: string;
  a: string;
}

/** Rich text body blocks. Text supports inline links `[anchor](/path)` and tokens {{PRICE_X}} {{YEAR}} {{BRAND}}. */
export type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "img"; key: string; alt: string; caption?: string }
  | { t: "quote"; text: string; author?: string };

export interface ItineraryStep {
  time: string;
  title: string;
  text: string;
}

export interface GalleryItem {
  key: string;
  alt: string;
  caption?: string;
}

export interface PageContent {
  /** 1-2 paragraphs right under the H1. Primary keyword in the first 100 words. */
  intro: string[];
  blocks: Block[];
  faqs: Faq[];
  /** Product pages: step-by-step morning timeline */
  itinerary?: { title: string; steps: ItineraryStep[] };
  /** Home / city pages: curated photo gallery */
  gallery?: GalleryItem[];
  /** Which sample reviews to show (indices into data/reviews.json) */
  reviewIdx?: number[];
}

export type LangContent = Record<string, PageContent>;
