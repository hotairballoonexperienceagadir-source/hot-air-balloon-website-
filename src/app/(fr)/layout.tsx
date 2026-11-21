import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
/* PHASE B SCAFFOLD: the French layout serves the English dictionary and
 * content until Phase C lands the real translations. Only the <html lang>,
 * the URL prefix and the metadata are already French. */
import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { jost, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Montgolfière Agadir | Vols au lever du soleil sur la vallée du Souss, Maroc",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Vols en montgolfière au lever du soleil à Agadir, Maroc. Survolez la vallée du Souss et les montagnes de l’Atlas, savourez un petit-déjeuner berbère sous une tente caïdale et repartez avec votre certificat de vol. Réservation par WhatsApp.",
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
        <I18nProvider value={{ locale: "fr", dict: en, content: enContent }}>{children}</I18nProvider>
      </body>
    </html>
  );
}
