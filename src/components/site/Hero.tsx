"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingButton } from "./BookingButton";
import { BookingBar } from "./BookingBar";
import { useI18n } from "@/lib/i18n/context";
import { WhatsAppIcon } from "./icons";

/**
 * Agadir hero. "Book Your Agadir Flight" opens THE shared booking modal
 * (BookingModal) with Agadir preselected as destination and only the real
 * Agadir packages selectable. The original inline booking bar (BookingBar)
 * stands right below the CTAs and shares its logic, validation and WhatsApp
 * message with that modal: Agadir default, Agadir packages only.
 */

export function Hero() {
  const { dict } = useI18n();
  const hero = dict.home.hero;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="/images/hero-agadir.webp"
        alt={hero.imageAlt}
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
        aria-label={hero.mobileImageAlt}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/hero-agadir-mobile.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-14 pt-36 md:min-h-screen md:px-6 md:pb-16 md:pt-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-900/40">
            <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" /> {hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {hero.titleLead}{" "}
            <span className="text-brand-400">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 md:text-lg">
            {hero.text}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BookingButton
              size="lg"
              destination="Agadir"
              className="h-13 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-900/40 transition hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.bookCta}
            </BookingButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <a href="#experience">{hero.exploreCta}</a>
            </Button>
          </div>
        </div>

        {/* Original inline booking bar, sharing its logic with the modal that
            every other booking CTA opens. */}
        <BookingBar page="Agadir" />
      </div>
    </section>
  );
}
