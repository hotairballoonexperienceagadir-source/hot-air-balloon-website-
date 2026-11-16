import Image from "next/image";
import {
  BadgeCheck,
  Bus,
  Camera,
  Clock,
  Coffee,
  Flame,
  Heart,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, offers, offerWaMessage, packages, stats, timeline, waLink, defaultWaMessage, whyUs, type CityId, type Offer } from "@/lib/site";
import { Stars, WhatsAppIcon } from "./icons";

const featureIcons: Record<string, LucideIcon> = {
  clock: Clock,
  users: Users,
  bus: Bus,
  coffee: Coffee,
  award: Sparkles,
  camera: Camera,
  mountain: Mountain,
  heart: Heart,
  flame: Flame,
  sun: Sun,
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

export function Stats() {
  return (
    <section aria-label="Company statistics" className="border-b border-white/5 bg-navy-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:gap-0 md:px-6 md:py-12 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = statIcons[stat.icon] ?? Sparkles;
          return (
            <div key={stat.label} className="flex flex-col items-center gap-3 text-center md:border-r md:border-white/10 md:last:border-none">
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
/* Flight offers per city                                              */
/* ------------------------------------------------------------------ */

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        offer.popular ? "ring-2 ring-brand-500" : "border border-border"
      }`}
    >
      {offer.popular && (
        <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
          Most Popular
        </span>
      )}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          width={offer.imageWidth}
          height={offer.imageHeight}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/75 px-3 py-1 text-xs font-semibold text-cream-100 backdrop-blur">
          {offer.cityName}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-2">
          <Stars className="text-gold-500" />
          <span className="text-xs text-muted-foreground">5.0 rated on Google</span>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{offer.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
        </div>

        <ul className="grid grid-cols-2 gap-2">
          {offer.features.map((feature) => {
            const Icon = featureIcons[feature.icon] ?? Sparkles;
            return (
              <li key={feature.label} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <Icon className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                {feature.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">From</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {offer.priceMad.toLocaleString("en-US")} MAD
              <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
            </p>
          </div>
          <Button asChild className="rounded-full bg-brand-500 px-5 font-bold text-white hover:bg-brand-600">
            <a href={waLink(offerWaMessage(offer.name, offer.cityName))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              Book
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function FlightSections() {
  return (
    <>
      {(Object.keys(cities) as CityId[]).map((cityId) => {
        const city = cities[cityId];
        const cityOffers = offers.filter((offer) => offer.city === cityId);
        return (
          <section key={cityId} id={cityId} className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" /> {city.name} Balloon Flights
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
                  {city.headline}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{city.intro}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <MapPinSmall /> {city.launchSite}
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cityOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Children from 6 years fly at a reduced price in {city.name}.{" "}
                <a
                  href={waLink(`Hello! I have a question about balloon flights in ${city.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 underline-offset-4 hover:underline"
                >
                  Ask us on WhatsApp
                </a>
              </p>
            </div>
          </section>
        );
      })}
    </>
  );
}

function MapPinSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Why us                                                              */
/* ------------------------------------------------------------------ */

export function WhyUs() {
  return (
    <section id="why-us" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Why Us
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            Your Trust Is Our Greatest Asset
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From the balloons we fly to the crew we train, every decision is built around your safety and your experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => {
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
/* Experience: story + day timeline                                    */
/* ------------------------------------------------------------------ */

export function Experience() {
  return (
    <section id="experience" className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Story */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/burner-flame.jpg"
                alt="Balloon burner flame lighting up the envelope in the dark before sunrise"
                width={768}
                height={1344}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-xl bg-brand-500 px-4 py-2 text-center font-display text-lg font-bold leading-tight text-white shadow-lg">
              12+
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/85">Years in the sky</span>
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Our Story
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              The Friendliest Sunrise in Moroccan Skies
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/85">
              Hot Air Balloon Experience Agadir was born in the Souss valley, flying guests over argan groves and the
              Atlas foothills. Years later we added our Marrakech operation in the Palmeraie desert, so every visitor to
              Morocco can live the same sunrise from a different sky.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream-100/85">
              Our team of licensed Moroccan pilots flies every single morning with one rule only: never compromise on
              safety.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Licensed pilots with thousands of flight hours",
                "Full passenger insurance on every flight",
                "Complimentary hotel pickup and drop off",
                "Daily safety inspections, zero compromise",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-cream-100/90">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 rounded-full bg-brand-500 px-7 py-3 font-bold text-white hover:bg-brand-600">
              <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                Plan Your Flight
              </a>
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Flight Day
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              How Your Balloon Morning Works
            </h3>
            <p className="mt-4 text-base leading-relaxed text-cream-100/80">
              The same careful routine in Marrakech and Agadir, from the first knock on your hotel door to the last sip of mint tea.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="absolute right-4 top-4 font-display text-4xl font-bold text-white/10" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-block rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold tracking-wider text-brand-300">
                  {step.time}
                </span>
                <h4 className="mt-3 font-semibold text-white">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-100/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Special packages                                                    */
/* ------------------------------------------------------------------ */

export function Packages() {
  return (
    <section id="packages" className="bg-navy-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" /> Special Packages
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance md:text-4xl">
            Beyond an Ordinary Balloon Ride
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-100/80">
            Curated experiences for the moments you will remember forever, available in both Marrakech and Agadir.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article key={pkg.title} className="group relative overflow-hidden rounded-2xl">
              <Image
                src={pkg.image}
                alt={pkg.imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {pkg.tag}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{pkg.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/85">{pkg.text}</p>
                <a
                  href={waLink(`Hello! I am interested in the ${pkg.title} package. Please send me details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-brand-200"
                >
                  Learn More
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

const galleryImages = [
  { src: "/images/gallery-1.jpg", w: 1800, h: 1350, alt: "Dozens of hot air balloons flying over a Moroccan town at dawn" },
  { src: "/images/gallery-2.jpg", w: 1200, h: 780, alt: "Colorful hot air balloons rising into a clear blue sky" },
  { src: "/images/gallery-3.jpg", w: 736, h: 1104, alt: "Green and red Moroccan balloons inflating in the desert" },
  { src: "/images/gallery-4.jpg", w: 1024, h: 1024, alt: "Moroccan mint tea being poured into traditional glasses" },
  { src: "/images/gallery-5.jpg", w: 1800, h: 982, alt: "Fresh msemen flatbread served with honey and mint tea" },
  { src: "/images/gallery-6.jpg", w: 841, h: 1051, alt: "Guest watching hot air balloons fill the sunrise sky" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" /> Gallery
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            Moments Above Morocco
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A glimpse of the landscapes, flights and mornings that are waiting for you in the skies of Marrakech and Agadir.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <div key={img.src} className="group relative overflow-hidden rounded-2xl">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 md:h-64"
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/70 px-3 py-1 text-[11px] font-semibold text-cream-100 opacity-0 backdrop-blur transition group-hover:opacity-100">
                {i % 2 === 0 ? "Marrakech" : "Agadir"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function CtaSection() {
  return (
    <section id="book" className="relative isolate overflow-hidden bg-navy-950 py-20 md:py-28">
      <Image
        src="/images/vip-basket.jpg"
        alt="Guests enjoying breakfast in a hot air balloon basket at sunrise over Morocco"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/90" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
          Ready for Adventure?
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white text-balance md:text-5xl">
          Ready for Your Moroccan Sunrise Adventure?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-100/85">
          Do not miss the experience of a lifetime. Send us a message today and fly over Marrakech or Agadir at sunrise.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-900/40 hover:bg-brand-600 sm:w-auto">
            <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              Book on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto"
          >
            <a href="#marrakech">Compare Flights</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
