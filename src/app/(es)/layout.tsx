import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { toClientI18nValue } from "@/lib/i18n/client-value";
import { es } from "@/lib/i18n/dictionaries/es";
import { es as esContent } from "@/lib/i18n/content/es";
import { jost, poppins } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Globo aerostático Agadir | Vuelos al amanecer sobre el valle del Souss, Marruecos",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Vuelos en globo aerostático al amanecer en Agadir, Marruecos. Vuela sobre el valle del Souss y las montañas del Atlas, disfruta de un desayuno bereber en una jaima caïdal y recibe tu certificado de vuelo. Reserva por WhatsApp.",
  keywords: [
    "globo aerostático agadir",
    "paseo en globo agadir",
    "vuelo en globo marruecos",
    "valle del souss",
    "amanecer en globo agadir",
    "globo aerostático marruecos",
  ],
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      fr: "/fr",
      de: "/de",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    locale: "es_ES",
    alternateLocale: ["en_US", "fr_FR", "de_DE"],
    title: "Globo aerostático Agadir | Vuelos al amanecer sobre el valle del Souss",
    description:
      "Vuelos en globo al amanecer en Agadir. Vuela sobre el valle del Souss y el Atlas, con desayuno bereber en una jaima caïdal incluido. Reserva directamente por WhatsApp.",
    images: [{ url: "/images/hero-agadir.webp", width: 1672, height: 941, alt: "Globos aerostáticos al amanecer sobre el valle del Souss cerca de Agadir" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${jost.variable} ${poppins.variable}`}>
      <body>
        <I18nProvider value={toClientI18nValue("es", es, esContent)}>{children}</I18nProvider>
      </body>
    </html>
  );
}
