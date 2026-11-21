import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { jost, poppins } from "@/lib/fonts";
import { AgadirHome } from "@/components/site/AgadirHome";

/* English root layout. This is the EXACT metadata of the original site root
 * layout, untouched (title, description, keywords, canonical, Open Graph):
 * English stays the default language at "/" and "/marrakech-flights". */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Hot Air Balloon Agadir | Sunrise Flights Over the Souss Valley, Morocco",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Licensed sunrise hot air balloon flights in Agadir, Morocco. Fly over the Souss Valley and the Atlas Mountains, enjoy a Berber breakfast in a Caïdal tent and your flight certificate. Book on WhatsApp.",
  keywords: [
    "hot air balloon agadir",
    "hot air balloon experience agadir",
    "agadir balloon flight",
    "hot air balloon souss valley",
    "sunrise balloon flight agadir",
    "balloon ride morocco",
    "montgolfiere agadir",
    /* Phase E: additive English keyword phrases, appended only. */
    "hot air balloon ride agadir",
    "agadir sunrise balloon",
    "hot air balloon morocco agadir",
  ],
  /* Phase D: the hreflang alternates are ADDED to the existing metadata;
   * the canonical, title, description, keywords and Open Graph stay exactly
   * as they were. x-default points to the English homepage. */
  alternates: {
    canonical: "/",
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
    title: "Hot Air Balloon Agadir | Sunrise Flights Over the Souss Valley",
    description:
      "Licensed sunrise balloon flights in Agadir. Fly over the Souss Valley and the Atlas Mountains with a Berber breakfast in a Caïdal tent included. Book directly on WhatsApp.",
    images: [{ url: "/images/hero-agadir.webp", width: 1672, height: 941, alt: "Hot air balloons at sunrise over the Souss Valley near Agadir" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${jost.variable} ${poppins.variable}`}>
      <body>
        <I18nProvider value={{ locale: "en", dict: en, content: enContent }}>{children}</I18nProvider>
      </body>
    </html>
  );
}
