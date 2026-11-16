import configJson from "../../data/config.json";

export interface SiteConfig {
  brand: string;
  brandShort: string;
  domain: string;
  whatsappNumber: string;
  phoneDisplay: string;
  phoneIntl: string;
  email: string;
  gaMeasurementId: string;
  year: number;
  currency: { madSymbol: string; eurSymbol: string; madPerEur: number };
  prices: Record<string, number>;
  flightsPerYear: number;
  businessHours: string;
  reviews: { note: string; aggregateRating: { enabled: boolean; ratingValue: number; reviewCount: number } };
  locations: Record<string, { name: string; area: string; geo: { lat: number; lng: number }; cityName: string }>;
  sameAs: string[];
  author: { name: string; jobTitle: string; licence: string };
}

export const config = configJson as unknown as SiteConfig;

export function priceMad(key: string): number {
  return config.prices[key] ?? 0;
}

export function priceEur(key: string): number {
  const mad = priceMad(key);
  return Math.round((mad / config.currency.madPerEur) / 5) * 5;
}

export function waLink(message: string): string {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absUrl(pathname: string): string {
  return `${config.domain}${pathname}`;
}
