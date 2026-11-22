import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { CtaSection, Experience, PickupStrip, WhyUs, AgadirPackages, Gallery, Stats } from "@/components/site/sections";
import { FlightProbability } from "@/components/site/FlightProbability";
import { Reviews } from "@/components/site/Reviews";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { site, socialLinks } from "@/lib/site";
import { tpl } from "@/lib/i18n/format";
import { pagePaths, siteUrl } from "@/lib/i18n/config";
import type { AgadirContent, Dictionary, SiteContent } from "@/lib/i18n/types";

/**
 * THE Agadir homepage body, shared by every language. The language layout
 * provides the matching dictionary and content; the JSON-LD is built from
 * the same localized data (English stays byte for byte identical to the
 * pre i18n homepage because the English content re-exports site.ts).
 */

/** JSON-LD structured data: local business, Agadir offers and FAQ. */
function StructuredData({
  dict,
  agadir,
  locale,
}: {
  dict: Dictionary;
  agadir: AgadirContent;
  locale: SiteContent["locale"];
}) {
  const homePath = pagePaths.home[locale];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: site.brand,
        description: dict.home.seo.businessDescription,
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Agadir",
          postalCode: "80000",
          addressCountry: "MA",
        },
        /* aggregateRating removed 2026-11-22 (approved): Search Console
         * flagged it for missing ratingCount/reviewCount. */
        openingHours: "Mo-Su 00:00-24:00",
        /* The page's own canonical URL (with trailing slash, per locale). */
        url: `${siteUrl}${homePath === "/" ? "/" : `${homePath}/`}`,
        /* Official Agadir social profiles plus the Google Business Profile,
         * homepage structured data only. */
        sameAs: [...socialLinks.map((social) => social.url), site.googleReviewsUrl],
      },
      ...agadir.offers.map((offer) => ({
        "@type": "Product",
        name: tpl(dict.home.seo.productNameTemplate, { name: offer.name }),
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
        mainEntity: agadir.faqs.slice(0, 6).map((faq) => ({
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

export function AgadirHome({ dict, content }: { dict: Dictionary; content: SiteContent }) {
  const { locale } = content;
  const agadir = content.destinations.agadir;

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData dict={dict} agadir={agadir} locale={locale} />
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats dict={dict} agadir={agadir} />
        <AgadirPackages dict={dict} agadir={agadir} locale={locale} />
        <WhyUs dict={dict} agadir={agadir} />
        <Experience
          dict={dict}
          agadir={agadir}
          weatherNote={content.weatherNote}
          galleryItems={content.gallery.agadir}
        />
        <PickupStrip dict={dict} agadir={agadir} />
        <Gallery
          eyebrow={dict.home.gallery.eyebrow}
          title={dict.home.gallery.title}
          description={dict.home.gallery.description}
          items={content.gallery.agadir}
        />
        <Reviews city="agadir" />
        {/* Live 7 day flight outlook: Agadir homepage only, never on Marrakech. */}
        <FlightProbability city="agadir" />
        <FaqSection
          items={agadir.faqs}
          waMessage={agadir.faqWaMessage}
          title={dict.home.faq.title}
          subtitle={dict.home.faq.subtitle}
          dict={dict}
        />
        <CtaSection dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} content={content} />
      {/* Spacer so the mobile sticky bar never covers the footer bottom line */}
      <div className="h-16 bg-navy-950 md:hidden" aria-hidden="true" />
      <FloatingActions />
    </div>
  );
}
