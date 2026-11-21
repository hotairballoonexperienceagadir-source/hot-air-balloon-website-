import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { es } from "@/lib/i18n/dictionaries/es";
import { es as esContent } from "@/lib/i18n/content/es";
import { jost, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotairballoonexperienceagadir.com"),
  title: {
    default: "Globo aerostático Agadir | Vuelos al amanecer sobre el valle del Souss, Marruecos",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Vuelos en globo aerostático al amanecer en Agadir, Marruecos. Vuela sobre el valle del Souss y las montañas del Atlas, disfruta de un desayuno bereber en una jaima caïdal y recibe tu certificado de vuelo. Reserva por WhatsApp.",
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
        <I18nProvider value={{ locale: "es", dict: es, content: esContent }}>{children}</I18nProvider>
      </body>
    </html>
  );
}
