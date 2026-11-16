import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { MarrakechHero } from "@/components/site/MarrakechHero";
import { MarrakechCta, MarrakechExperience, MarrakechPackages } from "@/components/site/MarrakechSections";
import { Reviews } from "@/components/site/Reviews";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { marrakechFaqs, marrakechOffers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hot Air Balloon Marrakech | Sunrise Flights Over the Palmeraie Desert",
  description:
    "Sunrise hot air balloon flights in Marrakech by our Agadir based licensed team. Fly over the Palmeraie desert with Atlas mountain views, Berber breakfast and flight certificate. Book on WhatsApp.",
  keywords: [
    "hot air balloon marrakech",
    "marrakech balloon flight",
    "montgolfiere marrakech",
    "balloon ride marrakech",
    "sunrise balloon marrakech",
    "palmeraie balloon flight",
  ],
  alternates: { canonical: "/marrakech-flights" },
  openGraph: {
    type: "website",
    siteName: "Hot Air Balloon Experience Agadir",
    title: "Hot Air Balloon Marrakech | Sunrise Flights Over the Palmeraie Desert",
    description:
      "Sunrise hot air balloon flights in Marrakech over the Palmeraie desert, operated by our Agadir based licensed team. Book directly on WhatsApp.",
    images: [
      { url: "/images/hero-marrakech.png", width: 1537, height: 1023, alt: "Hot air balloons over the Palmeraie desert of Marrakech at sunrise" },
    ],
  },
  robots: { index: true, follow: true },
};

/** JSON-LD: breadcrumb plus the three Marrakech products. */
function MarrakechStructuredData() {
  const base = "https://www.hotairballoonexperienceagadir.com";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          { "@type": "ListItem", position: 2, name: "Marrakech Flights", item: `${base}/marrakech-flights` },
        ],
      },
      ...marrakechOffers.map((offer) => ({
        "@type": "Product",
        name: `${offer.name} in Marrakech`,
        description: offer.description,
        image: offer.image,
        brand: { "@type": "Brand", name: site.brand },
        offers: {
          "@type": "Offer",
          price: offer.priceMad,
          priceCurrency: "MAD",
          availability: "https://schema.org/InStock",
        },
      })),
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function MarrakechFlightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarrakechStructuredData />
      <Header variant="marrakech" />
      <main className="flex-1">
        <MarrakechHero />
        <MarrakechPackages />
        <MarrakechExperience />
        <Reviews />
        <FaqSection
          items={marrakechFaqs}
          waMessage="Hello! I have a question about the balloon flights in Marrakech."
          title="Marrakech Flights FAQ"
          subtitle="Everything you need to know before your balloon flight over the Palmeraie desert."
        />
        <MarrakechCta />
      </main>
      <Footer variant="marrakech" />
      {/* Spacer so the mobile sticky bar never covers the footer bottom line */}
      <div className="h-16 bg-navy-950 md:hidden" aria-hidden="true" />
      <FloatingActions city="marrakech" />
    </div>
  );
}
