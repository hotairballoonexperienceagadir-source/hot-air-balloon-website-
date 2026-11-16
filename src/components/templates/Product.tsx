import Image from "next/image";
import type { Lang, PageContent, PageMeta } from "@/lib/types";
import { productOfPage, siblingsOf } from "@/lib/pages";
import { image } from "@/lib/images";
import { ui } from "@/lib/i18n";
import { JsonLd, TemplateShell } from "./Home";
import { KeyFacts, ItineraryTimeline, BringAndCancellation, ReviewsRow, CompareFlights, CtaSection, SectionHeading, GalleryGrid, WeatherStrip } from "@/components/site/sections";
import { RichText } from "@/components/site/RichText";
import { BodyBlocks } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

/* ================================ PRODUCT ================================ */
export function ProductTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const product = productOfPage(page);
  if (!product) return null;
  const siblings = siblingsOf(product, lang).filter((p) => p.lang === lang);
  const msg = page.whatsapp?.message || page.h1;
  const heroImg = image(product.images[0] || "palmgrove");

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />

      {/* Page head */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImg.src} alt={page.h1} width={heroImg.width} height={heroImg.height} priority fetchPriority="high" className="h-full w-full object-cover" sizes="100vw" />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        </div>
        <div className="container-site flex flex-col items-start justify-center py-20 text-left sm:py-24">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light backdrop-blur">
            {t.products[product.id]?.name || page.h1} - {product.durationFlight} {t.misc.minutes}
          </p>
          <h1 className="max-w-3xl text-balance font-display text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl">{page.h1}</h1>
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-sand/90">
            <RichText text={content.intro[0]} lang={lang} />
          </div>
        </div>
      </section>

      <div className="container-site flex flex-col gap-14 py-12 sm:gap-16">
        {content.intro.length > 1 && (
          <div className="mx-auto max-w-3xl">
            <RichText text={content.intro[1]} lang={lang} className="text-lg leading-relaxed text-foreground/90" />
          </div>
        )}

        <KeyFacts lang={lang} product={product} page={page} />

        {content.itinerary && (
          <section aria-labelledby="itinerary">
            <SectionHeading title={content.itinerary.title || t.sec.itinerary} align="center" />
            <span id="itinerary" className="sr-only">{t.sec.itinerary}</span>
            <ItineraryTimeline lang={lang} content={content} />
          </section>
        )}

        {content.gallery && content.gallery.length > 0 && (
          <section aria-labelledby="gallery">
            <SectionHeading title={t.sec.gallery} sub={t.sec.gallerySub} />
            <span id="gallery" className="sr-only">{t.sec.gallery}</span>
            <GalleryGrid items={content.gallery} lang={lang} />
          </section>
        )}

        <BodyBlocks blocks={content.blocks} lang={lang} />

        <BringAndCancellation lang={lang} />

        <section aria-labelledby="reviews">
          <SectionHeading title={t.sec.reviews} sub={t.sec.reviewsSub} />
          <span id="reviews" className="sr-only">{t.sec.reviews}</span>
          <ReviewsRow lang={lang} idx={content.reviewIdx} />
        </section>

        <section aria-labelledby="faq">
          <SectionHeading title={t.sec.faq} sub={t.sec.faqSub} />
          <span id="faq" className="sr-only">{t.sec.faq}</span>
          <FaqList faqs={content.faqs} lang={lang} />
        </section>

        <WeatherStrip lang={lang} />

        {siblings.length > 0 && (
          <section aria-labelledby="compare">
            <SectionHeading title={t.sec.compare} sub={t.sec.compareSub} />
            <span id="compare" className="sr-only">{t.sec.compare}</span>
            <CompareFlights lang={lang} pages={siblings} />
          </section>
        )}

        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}
