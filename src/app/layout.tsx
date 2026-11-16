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
    default: "Hot Air Balloon Marrakech and Agadir | Sunrise Flights in Morocco",
    template: "%s | Hot Air Balloon Experience Agadir",
  },
  description:
    "Licensed sunrise hot air balloon flights in Marrakech and Agadir. Hotel pickup, Berber breakfast, flight certificate and a 5.0 Google rating. Book directly on WhatsApp.",
  keywords: [
    "hot air balloon marrakech",
    "hot air balloon agadir",
    "montgolfiere marrakech",
    "montgolfiere agadir",
    "hot air balloon morocco",
    "sunrise balloon flight morocco",
  ],
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    title: "Hot Air Balloon Marrakech and Agadir | Sunrise Flights in Morocco",
    description:
      "Licensed sunrise hot air balloon flights in Marrakech and Agadir. Hotel pickup, Berber breakfast, flight certificate and a 5.0 Google rating. Book directly on WhatsApp.",
    images: [{ url: "/images/hero-sunrise.jpg", width: 2560, height: 1600, alt: "Hot air balloons at sunrise over Morocco" }],
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
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
