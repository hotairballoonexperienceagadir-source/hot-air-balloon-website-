"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, site } from "@/lib/site";
import { BookingButton } from "./BookingModal";
import { Stars, WhatsAppIcon } from "./icons";

/* ------------------------------------------------------------------ */
/* Marrakech hero                                                      */
/* ------------------------------------------------------------------ */

/**
 * "Book Your Marrakech Flight" opens THE shared booking modal with Marrakech
 * preselected as destination and only the real Marrakech packages selectable.
 * The former inline booking bar moved into that modal so the site keeps
 * exactly one booking form.
 */

export function MarrakechHero() {
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
            <BookingButton
              size="lg"
              destination="Marrakech"
              className="h-13 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 transition hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book Your Marrakech Flight
            </BookingButton>
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

        {/* Trust badges. The booking form itself lives in the shared modal. */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
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
