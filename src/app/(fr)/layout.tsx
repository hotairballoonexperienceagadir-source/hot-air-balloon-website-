import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { toClientI18nValue } from "@/lib/i18n/client-value";
import { fr } from "@/lib/i18n/dictionaries/fr";
import { fr as frContent } from "@/lib/i18n/content/fr";
import { jost, poppins } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Montgolfière Agadir | Vols au lever du soleil sur la vallée du Souss, Maroc",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Vols en montgolfière au lever du soleil à Agadir, Maroc. Survolez la vallée du Souss et les montagnes de l’Atlas, savourez un petit-déjeuner berbère sous une tente caïdale et repartez avec votre certificat de vol. Réservation par WhatsApp.",
  keywords: [
    "montgolfière agadir",
    "vol en montgolfière agadir",
    "montgolfière agadir prix",
    "vallée du souss",
    "lever du soleil agadir",
    "montgolfière maroc",
  ],
  alternates: {
    canonical: "/fr",
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
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "es_ES"],
    title: "Montgolfière Agadir | Vols au lever du soleil sur la vallée du Souss",
    description:
      "Vols en montgolfière au lever du soleil à Agadir. Survolez la vallée du Souss et l’Atlas avec un petit-déjeuner berbère sous une tente caïdale inclus. Réservation directe par WhatsApp.",
    images: [{ url: "/images/hero-agadir.webp", width: 1672, height: 941, alt: "Montgolfières au lever du soleil sur la vallée du Souss près d’Agadir" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${jost.variable} ${poppins.variable}`}>
      <body>
        <I18nProvider value={toClientI18nValue("fr", fr, frContent)}>{children}</I18nProvider>
      </body>
    </html>
  );
}
