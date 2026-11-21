import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Bus,
  Camera,
  Clock,
  Coffee,
  Flame,
  Heart,
  MapPin,
  Mountain,
  Palmtree,
  ShieldCheck,
  Sparkles,
  Sun,
  Tent,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/gallery";
import {
  site,
  waLink,
  type Offer,
} from "@/lib/site";
import { pagePaths, type Locale } from "@/lib/i18n/config";
import { formatPrice, formatRating, tpl } from "@/lib/i18n/format";
import type { AgadirContent, Dictionary } from "@/lib/i18n/types";
import { BookingButton } from "./BookingButton";
import { ExperienceSlideshow } from "./ExperienceSlideshow";
import { GalleryGrid } from "./gallery-grid";
import { Stars, WhatsAppIcon } from "./icons";
import { SocialLinks } from "./SocialLinks";

const featureIcons: Record<string, LucideIcon> = {
  clock: Clock,
  users: Users,
  bus: Bus,
  coffee: Coffee,
  award: BadgeCheck,
  camera: Camera,
  mountain: Mountain,
  heart: Heart,
  flame: Flame,
  sun: Sun,
  tent: Tent,
  sparkles: Sparkles,
  palm: Palmtree,
};

const statIcons: Record<string, LucideIcon> = {
  users: Users,
  sun: Sun,
  star: Sparkles,
  shield: ShieldCheck,
};

const whyIcons: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  shield: ShieldCheck,
  bus: Bus,
  sparkles: Sparkles,
};

/* ------------------------------------------------------------------ */
/* Stats band                                                          */
/* ------------------------------------------------------------------ */

export function Stats({ dict, agadir }: { dict: Dictionary; agadir: AgadirContent }) {
  return (
    <section aria-label="Company statistics" className="border-b border-white/5 bg-navy-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:gap-0 md:px-6 md:py-12">
        {agadir.stats.map((stat) => {
          const Icon = statIcons[stat.icon] ?? Sparkles;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 text-center md:border-r md:border-white/10 md:last:border-none"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-3xl font-bold text-white md:text-4xl">{stat.value}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-cream-100/70">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Agadir packages. The two real services of our main destination.     */
/* ------------------------------------------------------------------ */

function AgadirOfferCard({
  offer,
  dict,
  locale,
  tall,
}: {
  offer: Offer;
  dict: Dictionary;
  locale: Locale;
  tall?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        offer.popular ? "ring-2 ring-brand-500" : "border border-border"
      }`}
    >
      {offer.badge && (
        <span
          className={`absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg ${
            offer.popular ? "bg-brand-500" : "bg-navy-900"
          }`}
        >
          {offer.badge}
        </span>
      )}
      <div className={`relative overflow-hidden ${tall ? "h-64 md:h-72" : "h-64 md:h-72"}`}>
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          width={offer.imageWidth}
          height={offer.imageHeight}
          sizes="(max-width: 767px) 100vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/75 px-3 py-1 text-xs font-semibold text-cream-100 backdrop-blur">
          {tpl(dict.home.offerCard.cityChip, { city: offer.cityName })}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Stars className="text-gold-500" />
          <span className="text-xs text-muted-foreground">
            {tpl(dict.home.offerCard.ratingLine, { rating: formatRating(site.googleRating, locale) })}
          </span>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{offer.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
        </div>

        <ul className="space-y-2.5">
          {offer.features.map((feature) => {
            const Icon = featureIcons[feature.icon] ?? Sparkles;
            return (
              <li key={feature.label} className="flex items-start gap-2.5 text-sm font-medium text-foreground/85">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {feature.label}
              </li>
            );
          })}
        </ul>

        <p className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" /> {offer.duration} | {offer.groupSize}
        </p>

        <div className="mt-auto flex flex-col items-stretch gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{dict.common.from}</p>
            <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {formatPrice(offer.priceMad, locale)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">{dict.common.perPerson}</span>
            </p>
            {offer.minGuests && (
              <p className="mt-1 text-xs font-semibold text-brand-700">
                {tpl(dict.common.minBooking, { n: offer.minGuests })}
              </p>
            )}
          </div>
          <BookingButton
            destination="Agadir"
            packageId={offer.id}
            className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {dict.common.book}
          </BookingButton>
        </div>
      </div>
    </article>
  );
}

export function AgadirPackages({
  dict,
  agadir,
  locale,
}: {
  dict: Dictionary;
  agadir: AgadirContent;
  locale: Locale;
}) {
  return (
    <section id="flights" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            <Sun className="h-3.5 w-3.5" aria-hidden="true" /> {dict.home.packages.badge}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {dict.home.packages.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{dict.home.packages.text}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            <MapPin className="h-4 w-4" aria-hidden="true" /> {dict.home.packages.launchSite}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:gap-8">
          {agadir.offers.map((offer) => (
            <AgadirOfferCard key={offer.id} offer={offer} dict={dict} locale={locale} tall />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {dict.home.packages.note}{" "}
          <a
            href={waLink(dict.home.packages.questionWa)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-600 underline-offset-4 hover:underline"
          >
            {dict.home.packages.noteLink}
          </a>{" "}
          {dict.home.packages.noteSuffix}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why us                                                              */
/* ------------------------------------------------------------------ */

export function WhyUs({ dict, agadir }: { dict: Dictionary; agadir: AgadirContent }) {
  return (
    <section id="why-us" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {dict.home.whyUs.badge}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {dict.home.whyUs.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{dict.home.whyUs.text}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agadir.whyUs.map((item) => {
            const Icon = whyIcons[item.icon] ?? Sparkles;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Agadir experience: intro + 9 steps + weather note                   */
/* ------------------------------------------------------------------ */

export function Experience({
  dict,
  agadir,
  weatherNote,
  galleryItems,
}: {
  dict: Dictionary;
  agadir: AgadirContent;
  weatherNote: string;
  galleryItems: GalleryItem[];
}) {
  return (
    <section id="experience" className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Intro with the experience slideshow */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl md:h-[440px]">
              <ExperienceSlideshow
                slides={galleryItems
                  .filter((item) => item.type === "image")
                  .map((item) => ({ src: item.src, alt: item.alt ?? dict.galleryGrid.imageAlt }))}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-xl bg-brand-500 px-4 py-2 text-center font-display text-lg font-bold leading-tight text-white shadow-lg">
              {dict.home.experience.slideBadgeTime}
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/85">
                {dict.home.experience.slideBadgeLabel}
              </span>
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {dict.home.experience.badge}
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              {dict.home.experience.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/85">{dict.home.experience.text}</p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-cream-100/85">
                <Wind className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {weatherNote}
              </p>
            </div>

            <BookingButton
              destination="Agadir"
              className="mt-7 rounded-full bg-brand-500 px-7 py-3 font-bold text-white hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {dict.home.experience.planCta}
            </BookingButton>
          </div>
        </div>

        {/* 9 steps */}
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agadir.experienceSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="absolute right-4 top-4 font-display text-4xl font-bold text-white/10" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-block rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold tracking-wider text-brand-300">
                {step.time}
              </span>
              <h3 className="mt-3 pr-10 font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pickup areas                                                        */
/* ------------------------------------------------------------------ */

export function PickupStrip({ dict, agadir }: { dict: Dictionary; agadir: AgadirContent }) {
  return (
    <section aria-label="Pickup areas" className="border-y border-border bg-cream-50 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{dict.home.pickup.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dict.home.pickup.text}</p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-auto">
            {agadir.pickupAreas.map((area) => (
              <div
                key={area.name}
                className={`rounded-xl border p-4 ${
                  area.included ? "border-brand-300 bg-white" : "border-border bg-white/60"
                }`}
              >
                <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MapPin
                    className={`h-4 w-4 ${area.included ? "text-brand-500" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                  {area.name}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{area.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

type GalleryProps = {
  /** Section eyebrow chip text. */
  eyebrow: string;
  /** Section heading. */
  title: string;
  /** Section intro paragraph. */
  description: string;
  /** Destination gallery collection (Agadir or Marrakech, never mixed). */
  items: GalleryItem[];
};

/* Destination gallery driven entirely by its own gallery collection file
 * (localized alt text and captions come with the collection). Every item
 * opens the Google Business Profile in a new tab, so there is no lightbox
 * and no inline video player. */
export function Gallery({ eyebrow, title, description, items }: GalleryProps) {
  return (
    <section id="gallery" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" /> {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <GalleryGrid items={items} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function CtaSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="book" className="relative isolate overflow-hidden bg-navy-950 py-20 md:py-28">
      <Image
        src="/images/agadir-hero.webp"
        alt={dict.home.cta.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/90" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
          {dict.home.cta.badge}
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white text-balance md:text-5xl">
          {dict.home.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-100/85">
          {dict.home.cta.text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton
            destination="Agadir"
            size="lg"
            className="w-full rounded-full bg-brand-500 px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 hover:bg-brand-600 sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {dict.home.cta.bookCta}
          </BookingButton>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto"
          >
            <Link href={pagePaths.marrakech[locale]}>
              {dict.home.cta.exploreLink}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Agadir official social media: this section renders on the Agadir homepage only. */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
            {dict.home.cta.followLabel}
          </p>
          <SocialLinks className="justify-center" />
        </div>
      </div>
    </section>
  );
}
