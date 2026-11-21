import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { toClientI18nValue } from "@/lib/i18n/client-value";
import { de } from "@/lib/i18n/dictionaries/de";
import { de as deContent } from "@/lib/i18n/content/de";
import { jost, poppins } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Ballonfahrt Agadir | Heißluftballon bei Sonnenaufgang im Souss-Tal, Marokko",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Lizenzierte Ballonfahrten mit dem Heißluftballon in Agadir, Marokko. Fliegen Sie bei Sonnenaufgang über das Souss-Tal und den Atlas, genießen Sie ein berberisches Frühstück im Caïdal-Zelt und Ihr Flugzertifikat. Buchung per WhatsApp.",
  keywords: [
    "ballonfahrt agadir",
    "heißluftballon agadir",
    "ballonfahrt marokko",
    "souss-tal",
    "sonnenaufgang ballonfahrt agadir",
    "heißluftballon marokko",
  ],
  alternates: {
    canonical: "/de",
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
    locale: "de_DE",
    alternateLocale: ["en_US", "fr_FR", "es_ES"],
    title: "Ballonfahrt Agadir | Heißluftballon bei Sonnenaufgang im Souss-Tal",
    description:
      "Lizenzierte Ballonfahrten bei Sonnenaufgang in Agadir. Fliegen Sie über das Souss-Tal und den Atlas, mit berberischem Frühstück im Caïdal-Zelt inklusive. Direkte Buchung per WhatsApp.",
    images: [{ url: "/images/hero-agadir.webp", width: 1672, height: 941, alt: "Heißluftballons bei Sonnenaufgang über dem Souss-Tal nahe Agadir" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${jost.variable} ${poppins.variable}`}>
      <body>
        <I18nProvider value={toClientI18nValue("de", de, deContent)}>{children}</I18nProvider>
      </body>
    </html>
  );
}
