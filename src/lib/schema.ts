import { absUrl, config, priceMad, priceEur } from "./config";
import { aggregateRating, breadcrumbTrail, type PageMeta, type Product, reviews } from "./pages";
import type { Faq, Lang } from "./types";

const ORG_ID = absUrl("/#organization");
const SITE_ID = absUrl("/#website");

export function organizationSchema() {
  const ar = aggregateRating();
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: config.brand,
    url: config.domain,
    logo: absUrl("/icon.svg"),
    image: absUrl("/images/hot-air-balloon-marrakech-sunrise-atlas.webp"),
    telephone: config.phoneIntl,
    email: config.email,
    priceRange: "MAD 1500-3500",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Palmeraie, route de Fes",
      addressLocality: "Marrakech",
      postalCode: "40000",
      addressCountry: "MA",
    },
    sameAs: config.sameAs,
    ...(ar ? { aggregateRating: { "@type": "AggregateRating", ratingValue: ar.ratingValue, reviewCount: ar.reviewCount, bestRating: 5, worstRating: 1 } } : {}),
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: config.domain,
    name: config.brand,
    inLanguage: [lang, "en", "fr", "de", "es", "nl"].filter((v, i, a) => a.indexOf(v) === i),
    publisher: { "@id": ORG_ID },
  };
}

export function localBusinessSchema(city: "marrakech" | "agadir") {
  const loc = config.locations[city];
  const ar = aggregateRating();
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": absUrl(`/#${city}`),
    name: `${config.brand} - ${loc.cityName}`,
    url: config.domain,
    image: absUrl("/images/hot-air-balloon-marrakech-sunrise-atlas.webp"),
    description: `Sunrise hot air balloon flights in ${loc.cityName}, Morocco. Licensed pilots, hotel pickup, Berber breakfast and flight certificate.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.area,
      addressLocality: loc.cityName,
      addressCountry: "MA",
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "05:00",
      closes: "10:30",
    }],
    telephone: config.phoneIntl,
    isAccessibleForFree: false,
    publicAccess: true,
    ...(ar ? { aggregateRating: { "@type": "AggregateRating", ratingValue: ar.ratingValue, reviewCount: ar.reviewCount, bestRating: 5, worstRating: 1 } } : {}),
  };
}

export function productSchema(product: Product, page: PageMeta, name: string, description: string) {
  const flightKey = product.flightKey;
  const imgKey = product.images[0] || "hero";
  const reviewList = reviews.slice(0, 3);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: absUrl(`/images/${imgKey === "hero" ? "hot-air-balloon-marrakech-sunrise-atlas" : PRODUCT_IMG[imgKey]}.webp`),
    brand: { "@type": "Brand", name: config.brand },
    offers: {
      "@type": "Offer",
      url: absUrl(page.url),
      priceCurrency: "MAD",
      price: priceMad(flightKey),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
    },
    review: reviewList.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text[page.lang] || r.text.en,
      datePublished: r.date,
    })),
  };
}

const PRODUCT_IMG: Record<string, string> = {
  palmgrove: "montgolfiere-marrakech-palmeraie-lever-soleil",
  private: "hot-air-balloon-private-flight-couple-marrakech",
  vip: "hot-air-balloon-vip-flight-champagne-marrakech",
  camel: "hot-air-balloon-camel-ride-combo-marrakech",
  agafay: "hot-air-balloon-agafay-desert-marrakech",
  agadir: "hot-air-balloon-agadir-souss-valley",
  inflation: "hot-air-balloon-inflation-dawn-marrakech",
  breakfast: "berber-breakfast-hot-air-balloon-marrakech",
};

export function touristTripSchema(name: string, description: string, itineraryTitles: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    touristType: ["Couples", "Families", "Adventure travellers", "Photographers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: itineraryTitles.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t,
      })),
    },
    provider: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(page: PageMeta, names: Record<string, string>) {
  const trail = breadcrumbTrail(page);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: names[t.url] || t.name,
      item: absUrl(t.url),
    })),
  };
}

export function articleSchema(page: PageMeta, headline: string, description: string, imageKey: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: absUrl(`/images/${imageKey}.webp`),
    author: {
      "@type": "Person",
      name: config.author.name,
      jobTitle: config.author.jobTitle,
      description: config.author.licence,
    },
    publisher: { "@id": ORG_ID },
    datePublished: "2025-10-01",
    dateModified: "2026-01-15",
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(page.url) },
    inLanguage: page.lang,
  };
}

export function webPageSchema(page: PageMeta, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absUrl(page.url),
    inLanguage: page.lang,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function eurMention(): number {
  return priceEur("classic");
}
