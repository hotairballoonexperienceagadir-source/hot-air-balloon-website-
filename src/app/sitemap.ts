import type { MetadataRoute } from "next";

/**
 * Sitemap.
 *
 * PHASE D (owner approved 2026-11-21): the two English entries keep their
 * EXACT original shape and URLs, byte for byte. The six translated URLs are
 * ADDED below, each carrying the hreflang alternates of its city group.
 * Per the approved option 1, the English hreflang set lives in the page
 * <head> (metadata alternates.languages), so the English entries here stay
 * untouched and carry no alternates of their own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hotairballoonexperienceagadir.com";

  const homeAlternates = {
    languages: {
      en: base,
      fr: `${base}/fr`,
      de: `${base}/de`,
      es: `${base}/es`,
      "x-default": base,
    },
  };

  const marrakechAlternates = {
    languages: {
      en: `${base}/marrakech-flights`,
      fr: `${base}/fr/montgolfiere-marrakech`,
      de: `${base}/de/ballonfahrt-marrakesch`,
      es: `${base}/es/globo-aerostatico-marrakech`,
      "x-default": `${base}/marrakech-flights`,
    },
  };

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/marrakech-flights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: homeAlternates,
    },
    {
      url: `${base}/de`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: homeAlternates,
    },
    {
      url: `${base}/es`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: homeAlternates,
    },
    {
      url: `${base}/fr/montgolfiere-marrakech`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: marrakechAlternates,
    },
    {
      url: `${base}/de/ballonfahrt-marrakesch`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: marrakechAlternates,
    },
    {
      url: `${base}/es/globo-aerostatico-marrakech`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: marrakechAlternates,
    },
  ];
}
