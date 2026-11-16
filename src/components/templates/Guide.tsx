import type { Lang, PageContent, PageMeta } from "@/lib/types";
import { pagesByType } from "@/lib/pages";
import { ui } from "@/lib/i18n";
import { config } from "@/lib/config";
import { JsonLd, TemplateShell } from "./Home";
import { SectionHeading, CtaSection, FaqSection, GuideCards } from "@/components/site/sections";
import { RichText } from "@/components/site/RichText";
import { BodyBlocks } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/site/sections";

/* ================================ GUIDE (blog article) ================================ */
export function GuideTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const guides = pagesByType(lang, "guide").filter((g) => g.id !== page.id).slice(0, 3);
  const msg = page.whatsapp?.message || page.h1;

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />

      <header className="border-b border-border bg-sand-light">
        <div className="container-site max-w-3xl py-12">
          <p className="mb-3 inline-flex rounded-full bg-terracotta/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            {t.nav.guides} - {config.year}
          </p>
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-night sm:text-4xl lg:text-5xl">{page.h1}</h1>
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium text-night">{t.sec.author}: {config.author.name}</span>
          </div>
        </div>
      </header>

      <div className="container-site flex flex-col gap-12 py-12">
        <div className="mx-auto max-w-3xl">
          {content.intro.map((p, i) => (
            <p key={i} className={`mb-5 leading-relaxed text-foreground/90 ${i === 0 ? "text-lg" : ""}`}>
              <RichText text={p} lang={lang} />
            </p>
          ))}
        </div>

        <BodyBlocks blocks={content.blocks} lang={lang} withToc />

        {content.faqs.length > 0 && (
          <section aria-labelledby="faq">
            <SectionHeading title={t.sec.faq} sub={t.sec.faqSub} />
            <span id="faq" className="sr-only">{t.sec.faq}</span>
            <FaqList faqs={content.faqs} lang={lang} />
          </section>
        )}

        <AuthorBox lang={lang} label={t.sec.author} />

        {guides.length > 0 && (
          <section aria-labelledby="more-guides">
            <SectionHeading title={t.sec.guides} sub={t.sec.guidesSub} />
            <span id="more-guides" className="sr-only">{t.sec.guides}</span>
            <GuideCards lang={lang} guides={guides} />
          </section>
        )}

        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

/* ================================ BLOG HUB ================================ */
export function BlogHubTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const guides = pagesByType(lang, "guide");
  const msg = page.whatsapp?.message || page.h1;

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />
      <header className="border-b border-border bg-sand-light">
        <div className="container-site max-w-3xl py-12">
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-night sm:text-4xl lg:text-5xl">{page.h1}</h1>
        </div>
      </header>
      <div className="container-site flex flex-col gap-12 py-12">
        <div className="mx-auto max-w-3xl">
          {content.intro.map((p, i) => (
            <p key={i} className={`mb-5 leading-relaxed text-foreground/90 ${i === 0 ? "text-lg" : ""}`}>
              <RichText text={p} lang={lang} />
            </p>
          ))}
        </div>
        <section aria-labelledby="all-guides">
          <SectionHeading title={t.misc.guidesHub} />
          <span id="all-guides" className="sr-only">{t.misc.guidesHub}</span>
          <GuideCards lang={lang} guides={guides} />
        </section>
        {content.blocks.length > 0 && <BodyBlocks blocks={content.blocks} lang={lang} />}
        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}
