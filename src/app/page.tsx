import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { CtaSection, Experience, PickupStrip, WhyUs, AgadirPackages, Gallery, Stats } from "@/components/site/sections";
import { Reviews } from "@/components/site/Reviews";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { agadirOffers, faqs, site } from "@/lib/site";

/** JSON-LD structured data: local business, Agadir offers and FAQ. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.hotairballoonexperienceagadir.com/#business",
        name: site.brand,
        description:
          "Licensed sunrise hot air balloon flights in Agadir over the Souss Valley and the Atlas Mountains.",
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Agadir",
          postalCode: "80000",
          addressCountry: "MA",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.googleRating,
          bestRating: 5,
        },
        openingHours: "Mo-Su 00:00-24:00",
        url: site.googleReviewsUrl,
      },
      ...agadirOffers.map((offer) => ({
        "@type": "Product",
        name: `${offer.name} in Agadir`,
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
      {
        "@type": "FAQPage",
        mainEntity: faqs.slice(0, 6).map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData />
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <AgadirPackages />
        <WhyUs />
        <Experience />
        <PickupStrip />
        <Gallery />
        <Reviews />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      {/* Spacer so the mobile sticky bar never covers the footer bottom line */}
      <div className="h-16 bg-navy-950 md:hidden" aria-hidden="true" />
      <FloatingActions />
    </div>
  );
}
