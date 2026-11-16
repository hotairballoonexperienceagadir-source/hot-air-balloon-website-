import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    title: "Hot Air Balloon Agadir | Sunrise Flights Over the Souss Valley",
    description:
      "Licensed sunrise balloon flights in Agadir. Fly over the Souss Valley and the Atlas Mountains with a Berber breakfast in a Caïdal tent included. Book directly on WhatsApp.",
    images: [{ url: "/images/agadir-hero.jpg", width: 2048, height: 1152, alt: "Hot air balloons at sunrise over the Souss Valley near Agadir" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
