import type { Metadata } from "next";
import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The English Marrakech page at "/marrakech-flights" (URL unchanged).
 * This metadata is the EXACT original Marrakech metadata, untouched. */
export const metadata: Metadata = {
  title: "Hot Air Balloon Marrakech | Sunrise Flights Over the Palmeraie Desert",
  description:
    "Sunrise hot air balloon flights in Marrakech by our Agadir based licensed team. Fly over the Palmeraie desert with Atlas mountain views, Berber breakfast and flight certificate. Book on WhatsApp.",
  keywords: [
    "hot air balloon marrakech",
    "marrakech balloon flight",
    "montgolfiere marrakech",
    "balloon ride marrakech",
    "sunrise balloon marrakech",
    "palmeraie balloon flight",
  ],
  alternates: { canonical: "/marrakech-flights" },
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    title: "Hot Air Balloon Marrakech | Sunrise Flights Over the Palmeraie Desert",
    description:
      "Sunrise hot air balloon flights in Marrakech over the Palmeraie desert, operated by our Agadir based licensed team. Book directly on WhatsApp.",
    images: [
      { url: "/images/hero-marrakech.webp", width: 1537, height: 1023, alt: "Hot air balloons over the Palmeraie desert of Marrakech at sunrise" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function MarrakechFlightsPage() {
  return <MarrakechPage dict={en} content={enContent} />;
}
