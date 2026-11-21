import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
/* PHASE B SCAFFOLD: the German layout serves the English dictionary and
 * content until Phase C lands the real translations. Only the <html lang>,
 * the URL prefix and the metadata are already German. */
import { en } from "@/lib/i18n/dictionaries/en";
import { en as enContent } from "@/lib/i18n/content/en";
import { jost, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Ballonfahrt Agadir | Heißluftballon bei Sonnenaufgang im Souss-Tal, Marokko",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Lizenzierte Ballonfahrten mit dem Heißluftballon in Agadir, Marokko. Fliegen Sie bei Sonnenaufgang über das Souss-Tal und den Atlas, genießen Sie ein berberisches Frühstück im Caïdal-Zelt und Ihr Flugzertifikat. Buchung per WhatsApp.",
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
        <I18nProvider value={{ locale: "de", dict: en, content: enContent }}>{children}</I18nProvider>
      </body>
    </html>
  );
}
