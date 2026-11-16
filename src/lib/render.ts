import type { Metadata } from "next";
import { absUrl, config } from "./config";
import { getContent } from "./content/registry";
import { LANGS, type Lang, type PageMeta } from "./types";
import { hreflangOf } from "./pages";
import {
  organizationSchema, websiteSchema, localBusinessSchema, productSchema,
  touristTripSchema, faqSchema, breadcrumbSchema, articleSchema, webPageSchema,
} from "./schema";
import { productOfPage, productById } from "./pages";
import { ui } from "./i18n";

/* ----------------------------- Metadata ----------------------------- */
export function buildMetadata(page: PageMeta): Metadata {
  const langEntries: Record<string, string> = {};
  for (const h of hreflangOf(page)) {
    langEntries[h.lang] = absUrl(h.url);
  }
  const ogImage = `/api/og?t=${encodeURIComponent(page.metaTitle)}&s=${encodeURIComponent("Marrakech - Agafay - Agadir - Atlas")}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: absUrl(page.url),
      languages: langEntries,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absUrl(page.url),
      siteName: config.brand,
      locale: ogLocale(page.lang),
      type: page.pageType === "guide" ? "article" : "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

function ogLocale(lang: Lang): string {
  return { en: "en_GB", fr: "fr_FR", de: "de_DE", es: "es_ES", nl: "nl_NL" }[lang];
}

/* ----------------------------- Schema assembly ----------------------------- */
export function buildSchema(page: PageMeta): object[] {
  const t = ui(page.lang);
  const out: object[] = [organizationSchema(), websiteSchema(page.lang)];
  const content = getContent(page.lang, page.id);
  const names = breadcrumbNamesFor(page);

  if (page.pageType === "home") {
    out.push(localBusinessSchema("marrakech"));
  }

  if (page.pageType === "product" || page.pageType === "city") {
    const product = productOfPage(page) || (page.pageType === "city" ? productById("agadir") : undefined);
    if (product) {
      out.push(
        productSchema(product, page, page.h1, page.metaDescription),
        touristTripSchema(page.h1, page.metaDescription, content?.itinerary?.steps.map((s) => `${s.time} - ${s.title}`) || ["Hotel pickup", "Balloon inflation", "Sunrise flight", "Berber breakfast", "Return transfer"])
      );
    }
    if (page.pageType === "city") out.push(localBusinessSchema("agadir"));
  }

  if (content && content.faqs.length > 0 && ["home", "product", "city", "pricing", "faq", "guide", "pillar", "booking", "reviews"].includes(page.pageType)) {
    out.push(faqSchema(content.faqs));
  }

  if (page.parent) {
    out.push(breadcrumbSchema(page, names));
  }

  if (page.pageType === "guide") {
    out.push(articleSchema(page, page.h1, page.metaDescription, "atlas-mountains-hot-air-balloon-aerial"));
  } else {
    out.push(webPageSchema(page, page.h1, page.metaDescription));
  }

  return out;
}

function breadcrumbNamesFor(page: PageMeta): Record<string, string> {
  const names: Record<string, string> = {};
  const langNames: Record<string, Record<string, string>> = {
    en: { "/en/": "Home", "/en/guide/": "Guides" },
    fr: { "/fr/": "Accueil", "/fr/guide/": "Guides" },
    de: { "/de/": "Startseite" },
    es: { "/es/": "Inicio" },
    nl: { "/nl/": "Home" },
  };
  for (const [url, name] of Object.entries(langNames[page.lang] || {})) names[url] = name;
  return names;
}

/* ----------------------------- 404 ----------------------------- */
export function langOfPath(pathname: string | null | undefined): Lang {
  if (!pathname) return "en";
  const seg = pathname.split("/")[1];
  return (LANGS as string[]).includes(seg) ? (seg as Lang) : "en";
}
