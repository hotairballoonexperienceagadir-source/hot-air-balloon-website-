import type { Metadata } from "next";
import { es } from "@/lib/i18n/dictionaries/es";
import { es as esContent } from "@/lib/i18n/content/es";
import { MarrakechPage } from "@/components/site/MarrakechPage";

/* The Spanish Marrakech page at "/es/globo-aerostatico-marrakech". Phase D
 * metadata: keyword focus « globo aerostático Marrakech » and
 * « paseo en globo Marrakech ». No Palmeraie anywhere in the translated
 * metadata; the English SEO exemption stays untouched. */
export const metadata: Metadata = {
  title: "Globo aerostático Marrakech | Vuelos al amanecer en el desierto",
  description:
    "Vuelo en globo aerostático en Marrakech con nuestro equipo con licencia de Agadir. Despegue al amanecer en el desierto, vistas al Atlas, desayuno bereber y certificado de vuelo incluidos. Reserva por WhatsApp.",
  keywords: [
    "globo aerostático marrakech",
    "paseo en globo marrakech",
    "vuelo en globo marruecos",
    "amanecer en globo marrakech",
    "globo aerostático desierto marruecos",
  ],
  alternates: {
    canonical: "/es/globo-aerostatico-marrakech",
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
    locale: "es_ES",
    alternateLocale: ["en_US", "fr_FR", "de_DE"],
    title: "Globo aerostático Marrakech | Vuelo al amanecer en el desierto",
    description:
      "Vuelo en globo aerostático en Marrakech, operado por nuestro equipo con licencia de Agadir. Reserva directamente por WhatsApp.",
    images: [
      { url: "/images/hero-marrakech.webp", width: 1537, height: 1023, alt: "Globos aerostáticos sobre el desierto de Marrakech al amanecer" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <MarrakechPage dict={es} content={esContent} />;
}
