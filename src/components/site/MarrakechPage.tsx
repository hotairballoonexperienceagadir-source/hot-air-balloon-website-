import { Header } from "@/components/site/Header";
import { MarrakechHero } from "@/components/site/MarrakechHero";
import { MarrakechCta, MarrakechExperience, MarrakechPackages } from "@/components/site/MarrakechSections";
import { Gallery } from "@/components/site/sections";
import { Reviews } from "@/components/site/Reviews";
import { FlightProbability } from "@/components/site/FlightProbability";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { site } from "@/lib/site";
import { pagePaths } from "@/lib/i18n/config";
import { tpl } from "@/lib/i18n/format";
import type { Dictionary, MarrakechContent, SiteContent } from "@/lib/i18n/types";

/**
 * THE Marrakech page body, shared by every language. The language layout
 * provides the matching dictionary and content. The JSON-LD keeps the exact
 * shape of the original English page: breadcrumb plus the four Marrakech
 * products, whose descriptions render the frozen seoDescription when set
 * (English SEO stays untouched) and the translated description otherwise.
 */

/** JSON-LD: breadcrumb plus the four Marrakech products. */
function MarrakechStructuredData({
  dict,
  locale,
  marrakech,
}: {
  dict: Dictionary;
  locale: SiteContent["locale"];
  marrakech: MarrakechContent;
}) {
  const base = "https://www.hotairballoonexperienceagadir.com";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.marrakech.seo.breadcrumbHome, item: base },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.marrakech.seo.breadcrumbSelf,
            item: `${base}${pagePaths.marrakech[locale]}`,
          },
        ],
      },
      ...marrakech.offers.map((offer) => ({
        "@type": "Product",
        name: tpl(dict.marrakech.seo.productNameTemplate, { name: offer.name }),
        /* English: JSON-LD must stay EXACTLY as it was, even where it
         * contains "Palmeraie". The frozen seoDescription fields in site.ts
         * preserve the original structured data wording while the visible
         * card copy is Palmeraie free. Translated pages have no frozen
         * description, so their translated card copy is used. */
        description: offer.seoDescription ?? offer.description,
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

export function MarrakechPage({ dict, content }: { dict: Dictionary; content: SiteContent }) {
  const { locale } = content;
  const marrakech = content.destinations.marrakech;

  return (
    <div className="flex min-h-screen flex-col">
      <MarrakechStructuredData dict={dict} locale={locale} marrakech={marrakech} />
      <Header variant="marrakech" />
      <main className="flex-1">
        <MarrakechHero />
        <MarrakechPackages dict={dict} marrakech={marrakech} locale={locale} />
        {/* Marrakech gallery: its own completely separate collection, never
         * mixed with Agadir media (localized alt text and captions). */}
        <MarrakechExperience
          dict={dict}
          marrakech={marrakech}
          weatherNote={content.weatherNote}
          galleryItems={content.gallery.marrakech}
        />
        <Gallery
          eyebrow={dict.marrakech.gallery.eyebrow}
          title={dict.marrakech.gallery.title}
          description={dict.marrakech.gallery.description}
          items={content.gallery.marrakech}
        />
        {/* Guest reviews: ONE single Google Business Profile serves BOTH
         * destinations, so this renders the same official profile data and
         * the same Google links as the homepage. Owner replies are never
         * displayed. */}
        <Reviews city="marrakech" />
        {/* Live 7 day flight outlook: Marrakech data only, independent from Agadir. */}
        <FlightProbability city="marrakech" />
        <FaqSection
          items={marrakech.faqs}
          waMessage={marrakech.faqWaMessage}
          title={dict.marrakech.faq.title}
          subtitle={dict.marrakech.faq.subtitle}
          dict={dict}
        />
        <MarrakechCta dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} content={content} variant="marrakech" />
      {/* Spacer so the mobile sticky bar never covers the footer bottom line */}
      <div className="h-16 bg-navy-950 md:hidden" aria-hidden="true" />
      <FloatingActions city="marrakech" />
    </div>
  );
}
