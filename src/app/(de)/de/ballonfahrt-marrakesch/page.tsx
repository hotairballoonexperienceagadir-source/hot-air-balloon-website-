import type { Metadata } from "next";
import { de } from "@/lib/i18n/dictionaries/de";
import { de as deContent } from "@/lib/i18n/content/de";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The German Marrakech page at "/de/ballonfahrt-marrakesch". Phase D
 * metadata: keyword focus « Ballonfahrt Marrakesch » and
 * « Heißluftballon Marrakesch ». No Palmeraie anywhere in the translated
 * metadata; the English SEO exemption stays untouched. */
export const metadata: Metadata = {
  title: "Ballonfahrt Marrakesch | Heißluftballon bei Sonnenaufgang",
  description:
    "Ballonfahrt in Marrakesch mit unserem lizenzierten Team aus Agadir. Start in der Wüste bei Sonnenaufgang, Blick auf den Atlas, berberisches Frühstück und Flugzertifikat inklusive. Buchung per WhatsApp.",
  keywords: [
    "ballonfahrt marrakesch",
    "heißluftballon marrakesch",
    "ballonfahrt marokko",
    "sonnenaufgang ballonfahrt marrakesch",
    "heißluftballon marokko",
  ],
  alternates: {
    canonical: "/de/ballonfahrt-marrakesch",
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
    locale: "de_DE",
    alternateLocale: ["en_US", "fr_FR", "es_ES"],
    title: "Ballonfahrt Marrakesch | Heißluftballon bei Sonnenaufgang in der Wüste",
    description:
      "Ballonfahrt in Marrakesch, betrieben von unserem lizenzierten Team aus Agadir. Direkte Buchung per WhatsApp.",
    images: [
      { url: "/images/hero-marrakech.webp", width: 1537, height: 1023, alt: "Heißluftballons über der Wüste von Marrakesch bei Sonnenaufgang" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <MarrakechPage dict={de} content={deContent} />;
}
