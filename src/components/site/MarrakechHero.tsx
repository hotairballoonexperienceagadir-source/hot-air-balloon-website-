"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Minus, Plus, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, marrakechWaMessage, site, waLink } from "@/lib/site";
import { Stars, WhatsAppIcon } from "./icons";

/* ------------------------------------------------------------------ */
/* Marrakech hero                                                      */
/* ------------------------------------------------------------------ */

/* Today in UTC, read through useSyncExternalStore so the server rendered HTML
   and the hydration pass use the identical (empty) snapshot. Reading the clock
   during render diverged whenever SSR and hydration straddled UTC midnight and
   tripped React hydration recovery. */
const subscribeToClock = () => () => {};
const getClientToday = () => new Date().toISOString().slice(0, 10);
const getServerToday = () => "";

export function MarrakechHero() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  /* Deterministic today: SSR and hydration both render without min, the real
     date is applied right after mount. */
  const today = useSyncExternalStore(subscribeToClock, getClientToday, getServerToday);

  const waHref = useMemo(() => {
    const parts = [marrakechWaMessage];
    if (date) parts.push(`Date: ${date}`);
    parts.push(`Guests: ${guests}`);
    return waLink(parts.join(" | "));
  }, [date, guests]);

  const city = cities.marrakech;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="/images/hero-marrakech.webp"
        alt="Colorful hot air balloons drifting over the Palmeraie desert of Marrakech at sunrise with the Atlas mountains behind"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="invisible object-cover object-[24%_center] md:visible md:object-center"
      />
      {/* Mobile-only hero art direction. The uploaded max-quality file is served
          raw (no optimizer re-encoding) and, being a CSS background on an
          md:hidden element, it is never downloaded on desktop. The desktop
          Image is hidden with visibility (not display) so its layout box and
          next/image sizes check stay intact. */}
      <div
        role="img"
        aria-label="Colorful hot air balloons drifting over the Palmeraie desert of Marrakech at sunrise with the Atlas mountains behind"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/hero-marrakech-mobile.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-4 pb-14 pt-36 md:min-h-[90svh] md:px-6 md:pb-16 md:pt-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-300 ring-1 ring-white/20 backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" /> Second Destination | Operated by our Agadir base
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl">
            Hot Air Balloon Flights in <span className="text-brand-400">Marrakech</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 md:text-lg">
            {city.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 transition hover:bg-brand-600"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Book Your Marrakech Flight
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link href={site.homePath}>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                Discover Our Agadir Flights
              </Link>
            </Button>
          </div>
        </div>

        {/* Simple booking bar for Marrakech */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/15 bg-navy-950/70 p-4 shadow-2xl shadow-navy-950/60 backdrop-blur-md sm:grid sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end sm:gap-4 sm:p-5">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Select Date
              </span>
              <input
                type="date"
                min={today || undefined}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Flight date"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white [color-scheme:dark] outline-none transition focus:border-brand-400"
              />
            </label>

            <div>
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destination
              </span>
              <div className="flex h-12 items-center justify-between rounded-xl border border-brand-400/40 bg-brand-500/10 px-4 text-sm font-bold text-brand-200">
                Marrakech
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-300/80">Palmeraie</span>
              </div>
            </div>

            <div>
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <Users className="h-3.5 w-3.5" aria-hidden="true" /> Guests
              </span>
              <div className="flex h-12 items-center justify-between rounded-xl border border-white/15 bg-white/10 px-2">
                <button
                  type="button"
                  aria-label="Remove one guest"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-base font-bold text-white" aria-live="polite">{guests}</span>
                <button
                  type="button"
                  aria-label="Add one guest"
                  onClick={() => setGuests((g) => Math.min(16, g + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white/15"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 sm:w-auto"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                Check Availability
              </a>
            </Button>
          </div>

          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
            <span className="inline-flex items-center gap-2">
              <Stars className="text-gold-400" /> {site.googleRating.toFixed(1)} rated company on Google
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" /> Same licensed pilots as Agadir
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
