"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Minus, Plus, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agadirOffers, heroWaMessage, site, waLink } from "@/lib/site";
import { Stars, WhatsAppIcon } from "./icons";

/**
 * Agadir hero. Agadir is preselected and the form only proposes the two real
 * Agadir packages. Choosing Marrakech sends visitors to the dedicated
 * Marrakech page, as requested.
 */

/* Today in UTC, read through useSyncExternalStore so the server rendered HTML
   and the hydration pass use the identical (empty) snapshot. A render-time or
   effect-time clock read made SSR and hydration diverge whenever they
   straddled UTC midnight, which tripped React hydration recovery and cascaded
   into Radix aria attribute mismatches on triggers rendered through Button. */
const subscribeToClock = () => () => {};
const getClientToday = () => new Date().toISOString().slice(0, 10);
const getServerToday = () => "";

export function Hero() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [city, setCity] = useState<"Agadir" | "Marrakech">("Agadir");
  const [packageId, setPackageId] = useState(agadirOffers[0].id);

  /* Deterministic today: SSR and hydration both render without min, the real
     date is applied right after mount. */
  const today = useSyncExternalStore(subscribeToClock, getClientToday, getServerToday);
  const selectedOffer = agadirOffers.find((o) => o.id === packageId) ?? agadirOffers[0];
  const isMarrakech = city === "Marrakech";

  const waHref = useMemo(() => {
    const parts = [heroWaMessage];
    parts.push(`Package: ${selectedOffer.name} (${selectedOffer.priceMad.toLocaleString("en-US")} MAD per person)`);
    if (date) parts.push(`Date: ${date}`);
    parts.push(`Guests: ${guests}`);
    return waLink(parts.join(" | "));
  }, [date, guests, selectedOffer]);

  function pickPackage(id: string) {
    setPackageId(id);
    const offer = agadirOffers.find((o) => o.id === id);
    if (offer?.minGuests && guests < offer.minGuests) setGuests(offer.minGuests);
  }

  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="/images/hero-agadir.webp"
        alt="Red hot air balloon floating at sunrise above the Souss Valley near Agadir with the Atlas Mountains on the horizon and a Berber lounge in the foreground"
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
        aria-label="Red hot air balloon floating at sunrise above the Souss Valley near Agadir with a Berber lounge in the foreground"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/hero-agadir-mobile.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-14 pt-36 md:min-h-screen md:px-6 md:pb-16 md:pt-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-900/40">
            <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" /> Agadir | Souss Valley | Morocco
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Experience the Magic of Hot Air Balloon Flights in{" "}
            <span className="text-brand-400">Agadir</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 md:text-lg">
            Discover the breathtaking beauty of the Souss Valley from above. Enjoy a magical sunrise flight,
            a traditional Berber breakfast and unforgettable views of the Atlas Mountains.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 transition hover:bg-brand-600"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Book Your Agadir Flight
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <a href="#experience">Explore Our Experience</a>
            </Button>
          </div>
        </div>

        {/* Booking bar. Agadir default, Marrakech goes to its own page. */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-white/15 bg-navy-950/70 p-4 shadow-2xl shadow-navy-950/60 backdrop-blur-md sm:grid sm:grid-cols-2 sm:items-end sm:gap-4 sm:p-5 lg:grid-cols-[1fr_1.3fr_0.9fr_0.9fr_auto]">
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

            {!isMarrakech && (
              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Package
                </span>
                <select
                  value={packageId}
                  onChange={(e) => pickPackage(e.target.value)}
                  aria-label="Flight package"
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
                >
                  {agadirOffers.map((offer) => (
                    <option key={offer.id} value={offer.id} className="text-navy-900">
                      {offer.name} | {offer.priceMad.toLocaleString("en-US")} MAD
                      {offer.minGuests ? ` (min ${offer.minGuests} guests)` : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destination
              </span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as "Agadir" | "Marrakech")}
                aria-label="Flight destination"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
              >
                <option value="Agadir" className="text-navy-900">Agadir (main)</option>
                <option value="Marrakech" className="text-navy-900">Marrakech</option>
              </select>
            </label>

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

            {isMarrakech ? (
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 sm:w-auto"
              >
                <Link href={site.marrakechPath}>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  Marrakech Flights
                </Link>
              </Button>
            ) : (
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
            )}
          </div>

          {isMarrakech ? (
            <p className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-center text-sm text-cream-100/85">
              Marrakech flights have their own dedicated page with separate offers and prices.
              <Link
                href={site.marrakechPath}
                className="inline-flex items-center gap-1 font-bold text-brand-300 underline-offset-4 hover:underline"
              >
                Explore Marrakech Flights <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          ) : (
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
              <span className="inline-flex items-center gap-2">
                <Stars className="text-gold-400" /> {site.googleRating.toFixed(1)} on Google Reviews
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" /> Licensed pilots and full insurance
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> Instant booking on WhatsApp
              </span>
              {selectedOffer.minGuests && guests < selectedOffer.minGuests && (
                <span className="w-full text-center text-xs font-semibold text-gold-400">
                  The Private Flight requires a minimum of 2 guests.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
