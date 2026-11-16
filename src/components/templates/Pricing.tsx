import type { Lang, PageContent, PageMeta } from "@/lib/types";
import { pagesByType, productPage, productOfPage } from "@/lib/pages";
import { products } from "@/lib/pages";
import { ui, countryName, cityName } from "@/lib/i18n";
import { JsonLd, TemplateShell } from "./Home";
import { SectionHeading, PricingTable, CtaSection, WeatherStrip, GuideCards } from "@/components/site/sections";
import { RichText } from "@/components/site/RichText";
import { BodyBlocks } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Hero } from "@/components/site/sections";

/* ================================ PRICING ================================ */
export function PricingTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const rows = products
    .map((product) => {
      const p = productPage(product, lang) || productPage(product, "en");
      return p ? { page: p, product } : null;
    })
    .filter((x): x is { page: PageMeta; product: NonNullable<ReturnType<typeof productPage>> } => Boolean(x));
  const msg = page.whatsapp?.message || page.h1;
  const guides = pagesByType(lang, "guide").slice(0, 3);

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />
      <Hero page={page} lang={lang} imageKey="medinaAerial" priceKey="classic" bookMsg={msg} fromLabel={t.misc.from} badge={`${cityName(lang, "marrakech")} - ${countryName(lang)}`}>
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-sand/90 sm:text-lg">{content.intro[0]}</p>
      </Hero>

      <div className="container-site flex flex-col gap-14 py-12 sm:gap-16">
        <section aria-labelledby="prices-table">
          <span id="prices-table" className="sr-only">{t.misc.pricesTableTitle}</span>
          <SectionHeading title={t.misc.pricesTableTitle} sub={t.sec.pricesSub} />
          <PricingTable lang={lang} page={page} rows={rows} />
          <div className="mt-6"><WeatherStrip lang={lang} /></div>
        </section>

        {content.intro.length > 1 && (
          <div className="mx-auto max-w-3xl">
            <RichText text={content.intro[1]} lang={lang} className="text-lg leading-relaxed text-foreground/90" />
          </div>
        )}

        <BodyBlocks blocks={content.blocks} lang={lang} />

        <section aria-labelledby="faq">
          <SectionHeading title={t.sec.faq} sub={t.sec.faqSub} />
          <span id="faq" className="sr-only">{t.sec.faq}</span>
          <FaqList faqs={content.faqs} lang={lang} />
        </section>

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

/* ================================ PILLAR ================================ */
export function PillarTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const cards = products
    .map((product) => {
      const p = productPage(product, lang) || productPage(product, "en");
      return p ? { page: p, product } : null;
    })
    .filter((x): x is { page: PageMeta; product: NonNullable<ReturnType<typeof productPage>> } => Boolean(x));
  const msg = page.whatsapp?.message || page.h1;
  const guides = pagesByType(lang, "guide").slice(0, 6);

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />
      <Hero page={page} lang={lang} imageKey="atlasAerial" priceKey="classic" bookMsg={msg} fromLabel={t.misc.from} badge={`${countryName(lang)}`}>
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-sand/90 sm:text-lg">{content.intro[0]}</p>
      </Hero>

      <div className="container-site flex flex-col gap-14 py-12 sm:gap-16">
        {content.intro.length > 1 && (
          <div className="mx-auto max-w-3xl">
            <RichText text={content.intro[1]} lang={lang} className="text-lg leading-relaxed text-foreground/90" />
          </div>
        )}

        {/* Flight chooser */}
        <section aria-labelledby="choose">
          <SectionHeading title={t.sec.chooseFlight} sub={t.sec.flightsSub} />
          <span id="choose" className="sr-only">{t.sec.chooseFlight}</span>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ page: p, product }) => (
              <a key={p.id} href={p.url} className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:border-terracotta/40 hover:shadow-md">
                <span className="font-semibold text-night group-hover:text-terracotta">{p.h1}</span>
                <span className="mt-2 text-xs text-muted-foreground">{t.products[product.id]?.tagline}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-terracotta">{t.btn.discover} &rarr;</span>
              </a>
            ))}
          </div>
        </section>

        <BodyBlocks blocks={content.blocks} lang={lang} withToc />

        <section aria-labelledby="faq">
          <SectionHeading title={t.sec.faq} sub={t.sec.faqSub} />
          <span id="faq" className="sr-only">{t.sec.faq}</span>
          <FaqList faqs={content.faqs} lang={lang} />
        </section>

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

export { productOfPage };
