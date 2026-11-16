"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, Minus, Plus, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroWaMessage, waLink } from "@/lib/site";
import { Stars, WhatsAppIcon } from "./icons";

export function Hero() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [city, setCity] = useState("Marrakech");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const waHref = useMemo(() => {
    const parts = [heroWaMessage];
    if (date) parts.push(`Date: ${date}`);
    parts.push(`City: ${city}`);
    parts.push(`Guests: ${guests}`);
    return waLink(parts.join(" | "));
  }, [date, guests, city]);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="/images/hero-sunrise.jpg"
        alt="Hot air balloons floating at golden sunrise over the Moroccan landscape with mountains behind"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-14 pt-36 md:min-h-screen md:px-6 md:pb-16 md:pt-44">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-900/40">
            <span className="text-gold-400">✦</span> Morocco&apos;s Premier Balloon Company
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Soar Above the <span className="text-brand-400">Magic of Marrakech</span> and Agadir
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 md:text-lg">
            Licensed sunrise balloon flights over the Palmeraie desert, the Souss valley and the Atlas mountains.
            Hotel pickup, Berber breakfast and a flight certificate included, every single morning.
          </p>
        </div>

        {/* Booking bar */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-white/15 bg-navy-950/70 p-4 shadow-2xl shadow-navy-950/60 backdrop-blur-md sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4 sm:p-5 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Select Date
              </span>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Flight date"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white [color-scheme:dark] outline-none transition focus:border-brand-400"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> City
              </span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Flight city"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition focus:border-brand-400"
              >
                <option value="Marrakech" className="text-navy-900">Marrakech</option>
                <option value="Agadir" className="text-navy-900">Agadir</option>
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

            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 sm:w-auto"
            >
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <Search className="h-4 w-4" aria-hidden="true" />
                Check Availability
              </a>
            </Button>
          </div>

          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-100/85">
            <span className="inline-flex items-center gap-2">
              <Stars className="text-gold-400" /> {5.0.toFixed(1)} on Google Reviews
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" /> Licensed pilots and full insurance
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> Instant booking on WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
