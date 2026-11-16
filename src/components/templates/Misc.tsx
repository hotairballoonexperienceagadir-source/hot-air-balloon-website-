import type { Lang, PageContent, PageMeta } from "@/lib/types";
import { reviews as allReviews, reviewText, pagesByType } from "@/lib/pages";
import { config } from "@/lib/config";
import { ui } from "@/lib/i18n";
import { JsonLd, TemplateShell } from "./Home";
import { SectionHeading, CtaSection, ReviewsRow, WhyUs, TrustBadges } from "@/components/site/sections";
import { RichText } from "@/components/site/RichText";
import { BodyBlocks } from "@/components/site/Blocks";
import { FaqList } from "@/components/site/FaqList";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BookWhatsApp } from "@/components/booking/BookWhatsApp";
import { telHref } from "@/lib/booking";
import { Star, MapPinIcon, ClockIcon, CertificateIcon } from "@/components/site/icons";
import { FaqSection } from "@/components/site/sections";

/* ================================ REVIEWS ================================ */
export function ReviewsTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const msg = page.whatsapp?.message || page.h1;
  const ar = config.reviews.aggregateRating;

  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />
      <header className="border-b border-border bg-sand-light">
        <div className="container-site max-w-3xl py-12 text-center">
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-night sm:text-4xl lg:text-5xl">{page.h1}</h1>
          {ar.enabled && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 ring-1 ring-border">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 text-gold" />)}
              </span>
              <span className="font-semibold text-night">{ar.ratingValue}/5</span>
              <span className="text-sm text-muted-foreground">- {ar.reviewCount} {lang === "fr" ? "avis vérifiés" : lang === "de" ? "verifizierte Bewertungen" : lang === "es" ? "opiniones verificadas" : lang === "nl" ? "geverifieerde beoordelingen" : "verified reviews"}</span>
            </p>
          )}
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
        <ReviewsRow lang={lang} idx={content.reviewIdx} />
        <BodyBlocks blocks={content.blocks} lang={lang} />
        {content.faqs.length > 0 && <FaqSection lang={lang} faqs={content.faqs} title={t.sec.faq} sub={t.sec.faqSub} />}
        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

/* ================================ FAQ ================================ */
export function FaqTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
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
        <FaqList faqs={content.faqs} lang={lang} />
        <BodyBlocks blocks={content.blocks} lang={lang} />
        <CtaSection lang={lang} page={page} title={t.btn.ask} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

/* ================================ BOOKING ================================ */
export function BookingTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
  const msg = page.whatsapp?.message || page.h1;
  const loc = config.locations.marrakech;
  return (
    <TemplateShell page={page} lang={lang}>
      <JsonLd data={schema} />
      <Breadcrumbs page={page} />
      <header className="border-b border-border bg-sand-light">
        <div className="container-site max-w-3xl py-12 text-center">
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-night sm:text-4xl lg:text-5xl">{page.h1}</h1>
          {content.intro[0] && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"><RichText text={content.intro[0]} lang={lang} /></p>}
        </div>
      </header>
      <div className="container-site flex flex-col gap-14 py-12">
        <section aria-labelledby="how">
          <SectionHeading title={t.booking.howTitle} />
          <span id="how" className="sr-only">{t.booking.howTitle}</span>
          <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {t.booking.howSteps.map((s, i) => (
              <li key={i} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-terracotta font-display font-bold text-white">{i + 1}</span>
                <h3 className="mb-1.5 font-bold text-night">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="booking-form" className="mx-auto w-full max-w-2xl">
          <span id="booking-form" className="sr-only">Booking form</span>
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-lg sm:p-8">
            <h2 className="mb-1 font-display text-xl font-bold text-night">{t.btn.bookWhatsapp}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{t.booking.formNote}</p>
            <BookWhatsApp lang={lang} flight="generic" page={page.id} message={msg} variant="booking" withForm="full" className="w-full" />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.booking.payNote}</p>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <ClockIcon className="mr-1 inline h-4 w-4 text-terracotta" /> {t.booking.responseTime}
          </p>
        </section>

        <BodyBlocks blocks={content.blocks} lang={lang} />

        <section className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2" aria-label="Contact">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-night"><CertificateIcon className="h-5 w-5 text-terracotta" /> {t.booking.contactTitle}</h2>
            <ul className="space-y-2 text-sm text-foreground/85">
              <li><a href={telHref()} className="font-semibold text-terracotta hover:underline">{config.phoneDisplay}</a></li>
              <li><a href={`mailto:${config.email}`} className="hover:underline">{config.email}</a></li>
              <li>WhatsApp: <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-terracotta hover:underline">{config.phoneDisplay}</a></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-night"><MapPinIcon className="h-5 w-5 text-terracotta" /> {t.booking.meetingTitle}</h2>
            <p className="text-sm leading-relaxed text-foreground/85">{loc.area}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.footer.hours}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{t.booking.weatherNote}</p>
          </div>
        </section>

        {content.faqs.length > 0 && <FaqSection lang={lang} faqs={content.faqs} title={t.sec.faq} sub={t.sec.faqSub} />}
      </div>
    </TemplateShell>
  );
}

/* ================================ ABOUT ================================ */
export function AboutTemplate({ page, lang, content, schema }: { page: PageMeta; lang: Lang; content: PageContent; schema: object[] }) {
  const t = ui(lang);
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
        <BodyBlocks blocks={content.blocks} lang={lang} />
        <section aria-labelledby="values">
          <SectionHeading title={t.sec.whyUs} sub={t.sec.whyUsSub} />
          <span id="values" className="sr-only">{t.sec.whyUs}</span>
          <WhyUs lang={lang} />
        </section>
        <CtaSection lang={lang} page={page} title={t.btn.bookNow} text={t.booking.formNote} message={msg} />
      </div>
    </TemplateShell>
  );
}

/* ================================ LEGAL ================================ */
export function LegalTemplate({ page, lang, content }: { page: PageMeta; lang: Lang; content: PageContent; schema?: object[] }) {
  return (
    <TemplateShell page={page} lang={lang}>
      <Breadcrumbs page={page} />
      <header className="border-b border-border bg-sand-light">
        <div className="container-site max-w-3xl py-12">
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-night sm:text-4xl">{page.h1 && page.h1 !== "-" ? page.h1 : page.metaTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{lang === "fr" ? "Dernière mise à jour" : lang === "de" ? "Zuletzt aktualisiert" : lang === "es" ? "Última actualización" : lang === "nl" ? "Laatst bijgewerkt" : "Last updated"}: 2026-01-15</p>
        </div>
      </header>
      <div className="container-site py-12">
        <div className="mx-auto max-w-3xl">
          {content.intro.map((p, i) => (
            <p key={i} className="mb-5 leading-relaxed text-foreground/90">
              <RichText text={p} lang={lang} />
            </p>
          ))}
        </div>
        <BodyBlocks blocks={content.blocks} lang={lang} />
      </div>
    </TemplateShell>
  );
}

export { allReviews, reviewText, pagesByType, TrustBadges };
