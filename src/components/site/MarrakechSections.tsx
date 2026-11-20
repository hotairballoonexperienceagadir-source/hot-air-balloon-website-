import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Flame, MapPin, Mountain, Sparkles, Sun, Tent, Wind, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marrakechExperienceSlides } from "@/lib/experience-slides";
import {
  cities,
  marrakechOffers,
  marrakechTimeline,
  site,
  waLink,
  weatherNote,
  type Offer,
} from "@/lib/site";
import { BookingButton } from "./BookingButton";
import { ExperienceSlideshow } from "./ExperienceSlideshow";
import { Stars, WhatsAppIcon } from "./icons";

const mkFeatureIcons: Record<string, LucideIcon> = {
  clock: Clock,
  users: Sparkles,
  bus: Sun,
  coffee: Tent,
  award: Sparkles,
  camera: Sun,
  mountain: Mountain,
  heart: Sun,
  flame: Flame,
  sun: Sun,
};

/* ------------------------------------------------------------------ */
/* Marrakech packages, separate from Agadir                            */
/* ------------------------------------------------------------------ */

function MarrakechOfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        offer.popular ? "ring-2 ring-brand-500" : "border border-border"
      }`}
    >
      {offer.badge && (
        <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
          {offer.badge}
        </span>
      )}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          width={offer.imageWidth}
          height={offer.imageHeight}
          sizes="(max-width: 768px) 46vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/75 px-3 py-1 text-xs font-semibold text-cream-100 backdrop-blur">
          {offer.cityName} | Palmeraie
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Stars className="text-gold-500" />
          <span className="text-xs text-muted-foreground">{site.googleRating.toFixed(1)} rated company on Google</span>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{offer.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {offer.features.map((feature) => {
            const Icon = mkFeatureIcons[feature.icon] ?? Sparkles;
            return (
              <li key={feature.label} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <Icon className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                {feature.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex flex-col items-stretch gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">From</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {offer.priceMad.toLocaleString("en-US")} MAD
              <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
            </p>
          </div>
          <BookingButton
            destination="Marrakech"
            packageId={offer.id}
            className="rounded-full bg-brand-500 px-5 font-bold text-white hover:bg-brand-600"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book
          </BookingButton>
        </div>
      </div>
    </article>
  );
}

export function MarrakechPackages() {
  const city = cities.marrakech;
  return (
    <section id="flights" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            <Sun className="h-3.5 w-3.5" aria-hidden="true" /> Marrakech Balloon Flights
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {city.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{city.intro}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            <MapPin className="h-4 w-4" aria-hidden="true" /> {city.launchSite}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {marrakechOffers.map((offer) => (
            <MarrakechOfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          Children from 3 years old can fly with an adult.{" "}
          <a
            href={waLink("Hello! I have a question about balloon flights in Marrakech.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-600 underline-offset-4 hover:underline"
          >
            Ask us on WhatsApp
          </a>{" "}
          for family pricing.
        </p>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Looking for our main destination?{" "}
          <Link
            href={site.homePath}
            className="font-semibold text-brand-600 underline-offset-4 hover:underline"
          >
            Discover our Agadir flights over the Souss Valley
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marrakech flight day experience                                     */
/* ------------------------------------------------------------------ */

export function MarrakechExperience() {
  return (
    <section id="experience" className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[520px]">
              <ExperienceSlideshow
                slides={marrakechExperienceSlides}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-xl bg-brand-500 px-4 py-2 text-center font-display text-lg font-bold leading-tight text-white shadow-lg">
              Palmeraie
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/85">Desert launch site</span>
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Flight Day
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              How Your Marrakech Balloon Morning Works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/85">
              The same careful routine our team applies in Agadir, adapted to the Palmeraie desert: a dark early
              drive, a glowing inflation, a golden sunrise over the palm groves and a Berber breakfast to finish.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-cream-100/85">
                <Wind className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {weatherNote}
              </p>
            </div>

            <BookingButton
              destination="Marrakech"
              className="mt-7 rounded-full bg-brand-500 px-7 py-3 font-bold text-white hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Plan Your Marrakech Flight
            </BookingButton>
          </div>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marrakechTimeline.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="absolute right-4 top-4 font-display text-4xl font-bold text-white/10" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step.time ? (
                <span className="inline-block rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold tracking-wider text-brand-300">
                  {step.time}
                </span>
              ) : (
                <span className="block h-6" aria-hidden="true" />
              )}
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
/* Marrakech final CTA                                                 */
/* ------------------------------------------------------------------ */

export function MarrakechCta() {
  return (
    <section id="book" className="relative isolate overflow-hidden bg-navy-950 py-20 md:py-28">
      <Image
        src="/images/marrakech-classic.jpg"
        alt="Hot air balloons floating over the Palmeraie desert of Marrakech at sunrise"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/90" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
          Ready for Adventure?
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white text-balance md:text-5xl">
          Book Your Marrakech Sunrise Flight
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-100/85">
          Send us a message today and fly over the Palmeraie desert and the Atlas mountains tomorrow morning.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton
            destination="Marrakech"
            size="lg"
            className="w-full rounded-full bg-brand-500 px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 hover:bg-brand-600 sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book Your Marrakech Flight
          </BookingButton>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto"
          >
            <Link href={site.homePath}>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              Discover Agadir Flights
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
