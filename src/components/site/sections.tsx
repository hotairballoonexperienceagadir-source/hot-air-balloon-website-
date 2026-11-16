import Image from "next/image";
import Link from "next/link";
import { config, priceEur, priceMad } from "@/lib/config";
import { productOfPage, reviews, reviewText, type PageMeta, type Product } from "@/lib/pages";
import { image } from "@/lib/images";
import { priceFmt, ui, renderTokens } from "@/lib/i18n";
import type { GalleryItem, Lang, PageContent } from "@/lib/types";
import { BookWhatsApp } from "@/components/booking/BookWhatsApp";
import { Star, CheckIcon, CrossIcon, ShieldIcon, ClockIcon, MapPinIcon, UsersIcon, CertificateIcon, ArrowRight } from "./icons";
import { FaqList } from "./FaqList";

/* ---------------------------------- Heading ---------------------------------- */
export function SectionHeading({ title, sub, align = "center", light = false }: { title: string; sub?: string; align?: "center" | "left"; light?: boolean }) {
  return (
    <div className={`mb-8 ${align === "center" ? "text-center" : ""}`}>
      <h2 className={`text-2xl font-bold sm:text-3xl lg:text-4xl ${light ? "text-white" : "text-night"}`}>{title}</h2>
      {sub && <p className={`mt-3 max-w-2xl text-base leading-relaxed ${align === "center" ? "mx-auto" : ""} ${light ? "text-sand/80" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

/* ---------------------------------- Trust badges ---------------------------------- */
export function TrustBadges({ lang }: { lang: Lang }) {
  const t = ui(lang);
  const items = [
    { icon: <ShieldIcon className="h-5 w-5" />, label: t.misc.licensedBadge },
    { icon: <ShieldIcon className="h-5 w-5" />, label: t.misc.insuranceBadge },
    { icon: <UsersIcon className="h-5 w-5" />, label: t.misc.smallGroups },
    { icon: <CertificateIcon className="h-5 w-5" />, label: t.misc.freeCancellation },
  ];
  const ar = config.reviews.aggregateRating;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ar.enabled && (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-4 w-4 text-gold" /> {ar.ratingValue}/5 - {ar.reviewCount} {lang === "fr" ? "avis" : lang === "de" ? "Bewertungen" : lang === "es" ? "opiniones" : lang === "nl" ? "beoordelingen" : "reviews"}
        </span>
      )}
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {it.icon} {it.label}
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
export function Hero({ page, lang, imageKey, priceKey, bookMsg, fromLabel, badge, children }: {
  page: PageMeta;
  lang: Lang;
  imageKey: string;
  priceKey: string;
  bookMsg: string;
  fromLabel: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  const img = image(imageKey);
  const t = ui(lang);
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <Image
          src={img.src}
          alt={page.h1}
          width={img.width}
          height={img.height}
          priority
          fetchPriority="high"
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
      </div>
      <div className="container-site flex min-h-[560px] flex-col items-center justify-center py-24 text-center sm:min-h-[620px]">
        <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light backdrop-blur">
          <Star className="h-3.5 w-3.5 text-gold" /> {badge || `${config.locations.marrakech.cityName} - ${lang === "fr" ? "Maroc" : lang === "de" ? "Marokko" : lang === "es" ? "Marruecos" : lang === "nl" ? "Marokko" : "Morocco"}`} - {config.year}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">{page.h1}</h1>
        {children}
        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="inline-flex items-baseline gap-2 rounded-full bg-night-dark/70 px-5 py-2 text-white backdrop-blur">
            <span className="text-sm text-sand/80">{fromLabel}</span>
            <span className="font-display text-xl font-bold text-gold">{priceFmt(lang, priceMad(priceKey))}</span>
            <span className="text-sm text-sand/80">/ {t.facts.perPerson}</span>
          </span>
          <BookWhatsApp lang={lang} flight={priceKey} page={page.id} message={bookMsg} variant="hero" label={t.btn.bookWhatsapp} />
          <TrustBadges lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Flight cards ---------------------------------- */
export function FlightCards({ lang, cards }: { lang: Lang; cards: { page: PageMeta; product?: Product }[] }) {
  const t = ui(lang);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ page, product }) => {
        const key = product?.images[0] || "hero";
        const img = image(key);
        const flightKey = product?.flightKey || "classic";
        const msg = page.whatsapp?.message || `${page.h1}`;
        return (
          <article key={page.id} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-xl">
            <Link href={page.url} className="relative block aspect-[16/9] overflow-hidden">
              <Image src={img.src} alt={page.h1} width={img.width} height={img.height} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <span className="absolute left-3 top-3 rounded-full bg-night-dark/80 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                {t.misc.from} {priceFmt(lang, priceMad(flightKey))}
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-1.5 text-lg font-bold text-night">
                <Link href={page.url} className="hover:text-terracotta">{page.h1}</Link>
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product ? t.products[product.id]?.tagline : ""}
              </p>
              <div className="flex items-center justify-between gap-3">
                <BookWhatsApp lang={lang} flight={flightKey} page={page.id} message={msg} variant="card" />
                <Link href={page.url} className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:underline">
                  {t.btn.discover} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------------------------------- How it works ---------------------------------- */
export function HowItWorks({ lang }: { lang: Lang }) {
  const t = ui(lang);
  return (
    <ol className="mx-auto grid max-w-4xl gap-0 sm:grid-cols-2 lg:grid-cols-4">
      {t.howItWorks.map((s, i) => (
        <li key={i} className="relative flex flex-col items-center gap-3 rounded-3xl bg-card p-5 text-center shadow-sm ring-1 ring-border m-2">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-3.5 py-1 text-xs font-bold text-white shadow">{s.time}</span>
          <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-sand font-display text-base font-bold text-terracotta">{i + 1}</span>
          <h3 className="text-sm font-bold text-night">{s.title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------- Why us ---------------------------------- */
export function WhyUs({ lang }: { lang: Lang }) {
  const t = ui(lang);
  return (
    <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
      {t.whyUs.map((w, i) => (
        <div key={i} className="flex gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
            <ShieldIcon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="mb-1 font-bold text-night">{w.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{w.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- Gallery ---------------------------------- */
export function GalleryGrid({ items, lang }: { items: GalleryItem[]; lang: Lang }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((g, i) => {
        const img = image(g.key);
        const tall = i % 5 === 0;
        return (
          <figure key={i} className={`group relative overflow-hidden rounded-2xl ${tall ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
            <Image src={img.src} alt={g.alt} width={img.width} height={img.height} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" loading="lazy" />
            {g.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-dark/80 to-transparent p-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                {g.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Reviews ---------------------------------- */
export function ReviewsRow({ lang, idx }: { lang: Lang; idx?: number[] }) {
  const t = ui(lang);
  const list = (idx && idx.length ? idx.map((i) => reviews[i]).filter(Boolean) : reviews.slice(0, 3));
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {list.map((r, i) => (
        <figure key={i} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-0.5" aria-label={`${r.rating}/5`}>
            {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-4 w-4 text-gold" />)}
          </div>
          <blockquote className="flex-1 text-sm leading-relaxed text-foreground/85">&ldquo;{reviewText(r, lang)}&rdquo;</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 font-display text-sm font-bold text-terracotta">{r.name.charAt(0)}</span>
            <span className="text-sm">
              <span className="block font-semibold text-night">{r.name}</span>
              <span className="block text-xs text-muted-foreground">{r.country[lang] || r.country.en} - {r.date.slice(0, 7)}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ---------------------------------- Meeting point / map ---------------------------------- */
export function MeetingPoint({ lang, city }: { lang: Lang; city: "marrakech" | "agadir" }) {
  const t = ui(lang);
  const loc = config.locations[city];
  const q = city === "marrakech" ? "Palmeraie+Marrakech" : "Souss+valley+Agadir";
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
        <iframe
          title={`Map - ${loc.name}`}
          src={`https://maps.google.com/maps?q=${q}&z=10&output=embed`}
          width="600"
          height="340"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[340px] w-full border-0"
        />
      </div>
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-night"><MapPinIcon className="h-5 w-5 text-terracotta" /> {loc.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{loc.area}</p>
        <ul className="space-y-2 text-sm text-foreground/85">
          <li className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-terracotta" /> {t.footer.hours}</li>
          <li className="flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-terracotta" /> {t.misc.weatherText}</li>
        </ul>
        <p className="rounded-2xl bg-sand-light p-4 text-sm leading-relaxed text-foreground/80 ring-1 ring-sand-dark">
          {city === "marrakech"
            ? (lang === "fr" ? "Nous venons vous chercher gratuitement à votre hôtel ou riad dans et autour de Marrakech (Médina, Guéliz, Palmeraie, Agdal). Sinon, retrouvez-nous directement au terrain de décollage 30 minutes avant le lever du soleil." : lang === "de" ? "Wir holen Sie kostenlos in Ihrem Hotel oder Riad in und um Marrakesch ab (Medina, Gueliz, Palmeraie, Agdal). Oder treffen Sie uns direkt 30 Minuten vor Sonnenaufgang auf dem Startfeld." : lang === "es" ? "Te recogemos gratis en tu hotel o riad en Marrakech y alrededores (Medina, Gueliz, Palmeraie, Agdal). O reúnete con nosotros en el campo de despegue 30 minutos antes del amanecer." : lang === "nl" ? "We halen je gratis op in je hotel of riad in en rond Marrakech (Medina, Gueliz, Palmeraie, Agdal). Of ontmoet ons 30 minuten voor zonsopgang op het startveld." : "We pick you up free of charge at your hotel or riad anywhere in and around Marrakech (Medina, Gueliz, Palmeraie, Agdal). Or meet us directly at the launch field 30 minutes before sunrise.")
            : (lang === "fr" ? "Transfert gratuit depuis votre hôtel à Agadir ou Taghazout. Sinon, retrouvez-nous au terrain de décollage dans la vallée du Souss, 30 minutes avant le lever du soleil." : lang === "de" ? "Kostenloser Transfer von Ihrem Hotel in Agadir oder Taghazout. Oder treffen Sie uns 30 Minuten vor Sonnenaufgang auf dem Startfeld im Souss-Tal." : lang === "es" ? "Traslado gratuito desde tu hotel en Agadir o Taghazout. O reúnete con nosotros en el campo de despegue en el valle del Souss 30 minutos antes del amanecer." : lang === "nl" ? "Gratis transfer vanaf je hotel in Agadir of Taghazout. Of ontmoet ons 30 minuten voor zonsopgang op het startveld in de Souss-vallei." : "Free transfer from your hotel in Agadir or Taghazout. Or meet us at the launch field in the Souss Valley 30 minutes before sunrise.")}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------- CTA box ---------------------------------- */
export function CtaSection({ lang, page, title, text, message }: { lang: Lang; page: PageMeta; title: string; text: string; message: string }) {
  const t = ui(lang);
  return (
    <section className="pattern-zellige-dark relative overflow-hidden rounded-[2rem] bg-night px-6 py-14 text-center shadow-xl">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-3 font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mb-6 leading-relaxed text-sand/85">{text}</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookWhatsApp lang={lang} flight="generic" page={page.id} message={message} variant="hero" />
          <Link href={`/${lang}/`} className="inline-flex items-center gap-1.5 rounded-full border border-sand/30 px-6 py-3 text-sm font-semibold text-sand transition hover:bg-white/10">
            {t.btn.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-4 text-xs text-sand/60">{t.booking.payNote}</p>
      </div>
    </section>
  );
}

/* ---------------------------------- Key facts (product) ---------------------------------- */
export function KeyFacts({ lang, product, page }: { lang: Lang; product: Product; page: PageMeta }) {
  const t = ui(lang);
  const rows = [
    { icon: <ClockIcon className="h-4 w-4" />, label: `${t.facts.duration} (${t.facts.flightTime})`, value: `${product.durationFlight} ${t.misc.minutes}` },
    { icon: <ClockIcon className="h-4 w-4" />, label: t.facts.pickup, value: product.pickupTime },
    { icon: <ClockIcon className="h-4 w-4" />, label: t.facts.back, value: product.returnTime },
    { icon: <UsersIcon className="h-4 w-4" />, label: t.facts.group, value: product.groupSize },
    { icon: <UsersIcon className="h-4 w-4" />, label: t.facts.minAge, value: `${product.minAge}+` },
  ];
  const included = [...t.includedBase, ...(t.includedExtra[product.id] || [])];
  const msg = page.whatsapp?.message || page.h1;
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
        <h2 className="mb-4 text-lg font-bold text-night">{t.sec.keyFacts}</h2>
        <dl className="mb-5 space-y-2.5 text-sm">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3 border-b border-border/60 pb-2.5 last:border-0">
              <dt className="flex items-center gap-2 text-muted-foreground"><span className="text-terracotta">{r.icon}</span>{r.label}</dt>
              <dd className="font-semibold text-night">{r.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 bg-sand-light rounded-xl px-3 py-3 ring-1 ring-sand-dark">
            <dt className="font-semibold text-night">{t.facts.price}</dt>
            <dd className="text-right">
              <span className="font-display text-xl font-bold text-terracotta">{priceFmt(lang, priceMad(product.flightKey))}</span>
              <span className="block text-xs text-muted-foreground">~ {priceFmt(lang, priceEur(product.flightKey), "EUR")} / {t.facts.perPerson}</span>
            </dd>
          </div>
        </dl>
        <BookWhatsApp lang={lang} flight={product.flightKey} page={page.id} message={msg} variant="primary" withForm="compact" className="w-full" />
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
        <h2 className="mb-4 text-lg font-bold text-night">{t.sec.included}</h2>
        <ul className="mb-6 grid gap-2.5 sm:grid-cols-2">
          {included.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp-dark" /> {item}
            </li>
          ))}
        </ul>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.sec.notIncluded}</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.notIncluded.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CrossIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta/70" /> {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-2xl bg-sand-light p-4 text-sm leading-relaxed text-foreground/80 ring-1 ring-sand-dark">
          <strong className="text-night">{t.misc.weatherTitle}: </strong>{t.misc.weatherText}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------- Itinerary timeline ---------------------------------- */
export function ItineraryTimeline({ lang, content }: { lang: Lang; content: PageContent }) {
  const t = ui(lang);
  if (!content.itinerary) return null;
  return (
    <ol className="relative mx-auto max-w-3xl border-l-2 border-sand-dark pl-6 sm:pl-10">
      {content.itinerary.steps.map((s, i) => (
        <li key={i} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-white sm:-left-[51px]">{i + 1}</span>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-terracotta"><ClockIcon className="h-3.5 w-3.5" /> {s.time}</p>
            <h3 className="mb-1.5 font-bold text-night">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------- What to bring + cancellation ---------------------------------- */
export function BringAndCancellation({ lang }: { lang: Lang }) {
  const t = ui(lang);
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-night">{t.sec.bring}</h2>
        <ul className="space-y-2.5">
          {t.bring.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" /> {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-night">{t.sec.cancellation}</h2>
        <p className="text-sm leading-relaxed text-foreground/85">{t.cancellation}</p>
      </div>
    </div>
  );
}

/* ---------------------------------- Compare flights ---------------------------------- */
export function CompareFlights({ lang, pages }: { lang: Lang; pages: PageMeta[] }) {
  const t = ui(lang);
  return (
    <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
      {pages.map((p) => {
        const prod = productOfPage(p);
        const key = prod?.images[0] || "palmgrove";
        const img = image(key);
        return (
          <Link key={p.id} href={p.url} className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:border-terracotta/40 hover:shadow-md">
            <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl">
              <Image src={img.src} alt={p.h1} width={img.width} height={img.height} className="h-full w-full object-cover" loading="lazy" />
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-night group-hover:text-terracotta">{p.h1}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{t.misc.from} {priceFmt(lang, priceMad(prod?.flightKey || "classic"))}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-terracotta" />
          </Link>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Pricing table ---------------------------------- */
export function PricingTable({ lang, page, rows }: { lang: Lang; page: PageMeta; rows: { page: PageMeta; product: Product }[] }) {
  const t = ui(lang);
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-sm scrollbar-thin">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-sand-light text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3.5 font-semibold">{t.sec.flights}</th>
            <th className="px-4 py-3.5 font-semibold">{t.facts.adult}</th>
            <th className="px-4 py-3.5 font-semibold">{t.facts.child}</th>
            <th className="px-4 py-3.5 font-semibold">{t.facts.flightTime}</th>
            <th className="px-4 py-3.5 font-semibold">{t.btn.bookNow}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {rows.map(({ page: p, product }) => {
            const childKey = product.flightKey === "agadir" ? "agadirChild" : "classicChild";
            const msg = p.whatsapp?.message || p.h1;
            return (
              <tr key={p.id} className="hover:bg-sand-light/50">
                <td className="px-4 py-4">
                  <Link href={p.url} className="font-semibold text-night hover:text-terracotta">{p.h1}</Link>
                  {product.city === "agadir" && <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold uppercase text-terracotta">{t.misc.agadir}</span>}
                </td>
                <td className="px-4 py-4">
                  <span className="font-display font-bold text-night">{priceFmt(lang, priceMad(product.flightKey))}</span>
                  <span className="block text-xs text-muted-foreground">~ {priceFmt(lang, priceEur(product.flightKey), "EUR")}</span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {product.flightKey === "classic" || product.flightKey === "agadir" ? priceFmt(lang, priceMad(childKey)) : "-"}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{product.durationFlight} {t.misc.minutes}</td>
                <td className="px-4 py-4">
                  <BookWhatsApp lang={lang} flight={product.flightKey} page={page.id} message={msg} variant="table" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------- Guide cards ---------------------------------- */
export function GuideCards({ lang, guides }: { lang: Lang; guides: PageMeta[] }) {
  const t = ui(lang);
  const keys = ["burner", "medinaAerial", "pilot", "breakfast", "passengers", "atlasAerial"];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g, i) => {
        const img = image(keys[i % keys.length]);
        return (
          <article key={g.id} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-lg">
            <Link href={g.url} className="relative block aspect-[16/10] overflow-hidden">
              <Image src={img.src} alt={g.h1} width={img.width} height={img.height} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-base font-bold text-night">
                <Link href={g.url} className="hover:text-terracotta">{g.h1}</Link>
              </h3>
              <p className="mb-3 flex-1 text-sm leading-relaxed text-muted-foreground">{g.metaDescription}</p>
              <Link href={g.url} className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:underline">
                {t.btn.readGuide} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Author box ---------------------------------- */
export function AuthorBox({ lang, label }: { lang: Lang; label: string }) {
  return (
    <aside className="mx-auto mt-10 flex max-w-3xl flex-col items-start gap-4 rounded-3xl border border-sand-dark bg-sand-light p-5 sm:flex-row sm:items-center">
      <Image src={image("pilot").src} alt={config.author.name} width={72} height={96} className="h-24 w-[4.5rem] rounded-2xl object-cover" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">{label} {config.author.name}</p>
        <p className="mt-1 font-bold text-night">{config.author.jobTitle}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{config.author.licence}</p>
      </div>
    </aside>
  );
}

/* ---------------------------------- FAQ section wrapper ---------------------------------- */
export function FaqSection({ lang, faqs, title, sub }: { lang: Lang; faqs: { q: string; a: string }[]; title: string; sub?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <SectionHeading title={title} sub={sub} />
      <FaqList faqs={faqs} lang={lang} />
    </section>
  );
}

/* ---------------------------------- Weather guarantee strip ---------------------------------- */
export function WeatherStrip({ lang }: { lang: Lang }) {
  const t = ui(lang);
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl bg-whatsapp/10 p-4 ring-1 ring-whatsapp/30">
      <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp-dark" />
      <p className="text-sm leading-relaxed text-foreground/85"><strong className="text-night">{t.misc.weatherTitle}:</strong> {t.misc.weatherText}</p>
    </div>
  );
}

export { renderTokens };
