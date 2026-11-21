import type { Metadata } from "next";
import { fr } from "@/lib/i18n/dictionaries/fr";
import { fr as frContent } from "@/lib/i18n/content/fr";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The French Marrakech page at "/fr/montgolfiere-marrakech". Phase D
 * metadata: keyword focus « montgolfière marrakech » (vol en montgolfière,
 * prix, lever du soleil). No Palmeraie anywhere in the translated
 * metadata; the English SEO exemption stays untouched. */
export const metadata: Metadata = {
  title: "Montgolfière Marrakech | Vol en montgolfière au lever du soleil",
  description:
    "Vol en montgolfière à Marrakech par notre équipe licenciée basée à Agadir. Envol au lever du soleil au-dessus du désert, vues sur l’Atlas, petit-déjeuner berbère et certificat de vol inclus. Réservation par WhatsApp.",
  keywords: [
    "montgolfière marrakech",
    "vol en montgolfière marrakech",
    "montgolfière marrakech prix",
    "lever du soleil marrakech",
    "vol en montgolfière maroc",
  ],
  alternates: {
    canonical: "/fr/montgolfiere-marrakech",
    languages: {
      en: "/marrakech-flights",
      fr: "/fr/montgolfiere-marrakech",
      de: "/de/ballonfahrt-marrakesch",
      es: "/es/globo-aerostatico-marrakech",
      "x-default": "/marrakech-flights",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "es_ES"],
    title: "Montgolfière Marrakech | Vol au lever du soleil au-dessus du désert",
    description:
      "Vol en montgolfière à Marrakech, opéré par notre équipe licenciée basée à Agadir. Réservation directe par WhatsApp.",
    images: [
      { url: "/images/hero-marrakech.webp", width: 1537, height: 1023, alt: "Montgolfières au-dessus du désert de Marrakech au lever du soleil" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <MarrakechPage dict={fr} content={frContent} />;
}
