import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { fr } from "@/lib/i18n/dictionaries/fr";
import { fr as frContent } from "@/lib/i18n/content/fr";
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
        <I18nProvider value={{ locale: "fr", dict: fr, content: frContent }}>{children}</I18nProvider>
      </body>
    </html>
  );
}
