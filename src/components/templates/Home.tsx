import type { Lang, PageContent, PageMeta } from "@/lib/types";
import { productById, productPage, products, pagesByType } from "@/lib/pages";
import { ui, countryName, cityName } from "@/lib/i18n";
import { Hero, FlightCards, HowItWorks, WhyUs, GalleryGrid, ReviewsRow, MeetingPoint, CtaSection, SectionHeading, PricingTable, WeatherStrip, FaqSection } from "@/components/site/sections";
import { RichText } from "@/components/site/RichText";
import { BodyBlocks } from "@/components/site/Blocks";
import { GuideCards } from "@/components/site/sections";
import { StickyMobileBar } from "@/components/site/StickyMobileBar";
import { waLink } from "@/lib/config";
import Link from "next/link";

/** Shared chrome pieces rendered on every template */
export function JsonLd({ data }: { data: object[] }) {
  return (
    <>
      {data.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}

export function TemplateShell({ page, lang, children }: { page: PageMeta; lang: Lang; children: React.ReactNode }) {
  const msg = page.whatsapp?.message || `${page.h1}`;
  return (
    <>
      <main id="main">{children}</main>
      <StickyMobileBar lang={lang} message={msg} />
    </>
  );
}

function flightCardList(lang: Lang, city?: "marrakech" | "agadir") {
  return products
    .filter((p) => !city || p.city === city)
    .map((product) => {
      const page = productPage(product, lang) || productPage(product, "en");
      return page ? { page, product } : null;
    })
    .filter((x): x is { page: PageMeta; product: NonNullable<ReturnType<typeof productPage>> } => Boolean(x));
}

/* ================================ HOME ================================ */
export function HomeTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const cards = flightCardList(lang);
  const guides = pagesByType(lang, "guide").slice(0, 3);
  const pricingPage = pagesByType(lang, "pricing")[0];
  const gallery = content.gallery || [];
  const msg = page.whatsapp?.message || page.h1;

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Hero page={page} lang={lang} imageKey="hero" priceKey="classic" bookMsg={msg} fromLabel={t.misc.from} badge={`${cityName(lang, "marrakech")} - ${countryName(lang)}`}>
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-sand/90 sm:text-lg">{content.intro[0]}</p>
      </Hero>

      <div className="container-site flex flex-col gap-16 py-14 sm:gap-20">
        {content.intro.length > 1 && (
          <div className="mx-auto max-w-3xl text-center">
            <RichText text={content.intro[1]} lang={lang} className="text-lg leading-relaxed text-foreground/90" />
          </div>
        )}

        {/* Flights grid */}
        <section aria-labelledby="flights">
          <SectionHeading title={t.sec.flights} sub={t.sec.flightsSub} />
          <span id="flights" className="sr-only">{t.sec.flights}</span>
          <FlightCards lang={lang} cards={cards} />
          {pricingPage && (
            <p className="mt-6 text-center">
              <Link href={pricingPage.url} className="inline-flex items-center gap-1.5 font-semibold text-terracotta hover:underline">
                {t.btn.seePrices} &rarr;
              </Link>
            </p>
          )}
        </section>

        {/* How it works */}
        <section aria-labelledby="how-it-works">
          <SectionHeading title={t.sec.howItWorks} sub={t.sec.howItWorksSub} />
          <span id="how-it-works" className="sr-only">{t.sec.howItWorks}</span>
          <HowItWorks lang={lang} />
        </section>

        {/* Why us */}
        <section aria-labelledby="why-us">
          <SectionHeading title={t.sec.whyUs} sub={t.sec.whyUsSub} />
          <span id="why-us" className="sr-only">{t.sec.whyUs}</span>
          <WhyUs lang={lang} />
        </section>

        {/* Editorial body (what you will see + internal links) */}
        <BodyBlocks blocks={content.blocks} lang={lang} />

        {/* Gallery */}
        {gallery.length > 0 && (
          <section aria-labelledby="gallery">
            <SectionHeading title={t.sec.gallery} sub={t.sec.gallerySub} />
            <span id="gallery" className="sr-only">{t.sec.gallery}</span>
            <GalleryGrid items={gallery} lang={lang} />
          </section>
        )}

        {/* Reviews */}
        <section aria-labelledby="reviews">
          <SectionHeading title={t.sec.reviews} sub={t.sec.reviewsSub} />
          <span id="reviews" className="sr-only">{t.sec.reviews}</span>
          <ReviewsRow lang={lang} idx={content.reviewIdx} />
        </section>

        {/* Prices teaser */}
        {pricingPage && (
          <section aria-labelledby="prices-teaser">
            <SectionHeading title={t.sec.prices} sub={t.sec.pricesSub} />
            <span id="prices-teaser" className="sr-only">{t.sec.prices}</span>
            <PricingTable lang={lang} page={page} rows={flightCardList(lang).slice(0, 4)} />
            <p className="mt-6 text-center">
              <Link href={pricingPage.url} className="inline-flex items-center gap-1.5 font-semibold text-terracotta hover:underline">
                {t.btn.seePrices} &rarr;
              </Link>
            </p>
            <div className="mt-6"><WeatherStrip lang={lang} /></div>
          </section>
        )}

        {/* Meeting point */}
        <section aria-labelledby="meeting">
          <SectionHeading title={t.sec.meeting} sub={t.sec.meetingSub} />
          <span id="meeting" className="sr-only">{t.sec.meeting}</span>
          <MeetingPoint lang={lang} city="marrakech" />
        </section>

        {/* FAQ */}
        <FaqSection lang={lang} faqs={content.faqs} title={t.sec.faq} sub={t.sec.faqSub} />

        {/* Latest guides */}
        {guides.length > 0 && (
          <section aria-labelledby="guides">
            <SectionHeading title={t.sec.guides} sub={t.sec.guidesSub} />
            <span id="guides" className="sr-only">{t.sec.guides}</span>
            <GuideCards lang={lang} guides={guides} />
          </section>
        )}

        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

/* ================================ CITY (Agadir) ================================ */
export function CityTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const guides = pagesByType(lang, "guide").slice(0, 3);
  const pricingPage = pagesByType(lang, "pricing")[0];
  const agadirProduct = productById("agadir")!;
  const marrakechCards = flightCardList(lang, "marrakech").slice(0, 3);
  const msg = page.whatsapp?.message || page.h1;
  const gallery = content.gallery || [];

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Hero page={page} lang={lang} imageKey="agadir" priceKey="agadir" bookMsg={msg} fromLabel={t.misc.from} badge={`${cityName(lang, "agadir")} - ${countryName(lang)}`}>
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-sand/90 sm:text-lg">{content.intro[0]}</p>
      </Hero>

      <div className="container-site flex flex-col gap-16 py-14 sm:gap-20">
        {content.intro.length > 1 && (
          <div className="mx-auto max-w-3xl text-center">
            <RichText text={content.intro[1]} lang={lang} className="text-lg leading-relaxed text-foreground/90" />
          </div>
        )}

        {/* How it works */}
        <section aria-labelledby="how-it-works">
          <SectionHeading title={t.sec.howItWorks} sub={t.sec.howItWorksSub} />
          <span id="how-it-works" className="sr-only">{t.sec.howItWorks}</span>
          <HowItWorks lang={lang} />
        </section>

        <BodyBlocks blocks={content.blocks} lang={lang} />

        {/* Gallery */}
        {gallery.length > 0 && (
          <section aria-labelledby="gallery">
            <SectionHeading title={t.sec.gallery} sub={t.sec.gallerySub} />
            <span id="gallery" className="sr-only">{t.sec.gallery}</span>
            <GalleryGrid items={gallery} lang={lang} />
          </section>
        )}

        {/* Marrakech flights cross-sell */}
        <section aria-labelledby="other-city">
          <SectionHeading title={t.sec.compare} sub={t.sec.compareSub} />
          <span id="other-city" className="sr-only">{t.sec.compare}</span>
          <FlightCards lang={lang} cards={marrakechCards} />
        </section>

        {/* Reviews */}
        <section aria-labelledby="reviews">
          <SectionHeading title={t.sec.reviews} sub={t.sec.reviewsSub} />
          <span id="reviews" className="sr-only">{t.sec.reviews}</span>
          <ReviewsRow lang={lang} idx={content.reviewIdx || [4, 0, 2]} />
        </section>

        {/* Prices teaser */}
        {pricingPage && (
          <section aria-labelledby="prices-teaser">
            <SectionHeading title={t.sec.prices} sub={t.sec.pricesSub} />
            <span id="prices-teaser" className="sr-only">{t.sec.prices}</span>
            <PricingTable lang={lang} page={page} rows={[{ page, product: agadirProduct }, ...flightCardList(lang, "marrakech").slice(0, 3)]} />
            <p className="mt-6 text-center">
              <Link href={pricingPage.url} className="inline-flex items-center gap-1.5 font-semibold text-terracotta hover:underline">
                {t.btn.seePrices} &rarr;
              </Link>
            </p>
          </section>
        )}

        {/* Meeting point */}
        <section aria-labelledby="meeting">
          <SectionHeading title={t.sec.meeting} sub={t.sec.meetingSub} />
          <span id="meeting" className="sr-only">{t.sec.meeting}</span>
          <MeetingPoint lang={lang} city="agadir" />
        </section>

        <FaqSection lang={lang} faqs={content.faqs} title={t.sec.faq} sub={t.sec.faqSub} />

        {guides.length > 0 && (
          <section aria-labelledby="guides">
            <SectionHeading title={t.sec.guides} sub={t.sec.guidesSub} />
            <span id="guides" className="sr-only">{t.sec.guides}</span>
            <GuideCards lang={lang} guides={guides} />
          </section>
        )}

        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

export { waLink };
