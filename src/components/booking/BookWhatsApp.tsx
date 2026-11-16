"use client";

import { useMemo, useState } from "react";
import { waLink } from "@/lib/config";
import { renderTokens } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { WhatsAppIcon } from "@/components/site/icons";

export interface BookWhatsAppProps {
  lang: Lang;
  /** Stable flight identifier for GA4: classic | private | vip | camel | agafay | agadir | generic */
  flight: string;
  /** Current page id for GA4 */
  page: string;
  /** Prefilled WhatsApp message (from the SEO sheet). Tokens are rendered. */
  message: string;
  /** Visual variants */
  variant?: "primary" | "hero" | "card" | "table" | "inline" | "booking" | "sticky";
  label?: string;
  /** Show the optional fields (date / adults / children / hotel) - used on booking page & product quick-book */
  withForm?: "compact" | "full" | false;
  className?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Booking button that opens WhatsApp with a prefilled message.
 * Fires GA4 `generate_lead` {flight, lang, page} only when analytics consent was granted.
 */
export function BookWhatsApp({
  lang,
  flight,
  page,
  message,
  variant = "primary",
  label,
  withForm = false,
  className = "",
}: BookWhatsAppProps) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState("");

  const href = useMemo(() => {
    let msg = renderTokens(message, lang);
    if (withForm) {
      const extra: string[] = [];
      if (date) extra.push(`${lang === "fr" ? "Date" : lang === "de" ? "Datum" : lang === "es" ? "Fecha" : lang === "nl" ? "Datum" : "Date"}: ${date}`);
      if (withForm === "full" || adults !== 2 || children !== 0) extra.push(`${adults} ${lang === "fr" ? "adultes" : lang === "de" ? "Erwachsene" : lang === "es" ? "adultos" : lang === "nl" ? "volwassenen" : "adults"}${children ? ` + ${children} ${lang === "fr" ? "enfants" : lang === "de" ? "Kinder" : lang === "es" ? "niños" : lang === "nl" ? "kinderen" : "children"}` : ""}`);
      if (hotel) extra.push(`${hotel}`);
      if (extra.length) msg += "\n" + extra.join(" | ");
    }
    return waLink(msg);
  }, [message, lang, withForm, date, adults, children, hotel]);

  function track() {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", { flight, lang, page });
    }
  }

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-dark";
  const styles: Record<string, string> = {
    primary: "bg-whatsapp px-6 py-3 text-white shadow-md hover:bg-whatsapp-dark hover:shadow-lg",
    hero: "bg-whatsapp px-7 py-4 text-base text-white shadow-xl hover:bg-whatsapp-dark sm:text-lg",
    card: "bg-whatsapp px-5 py-2.5 text-sm text-white hover:bg-whatsapp-dark",
    table: "bg-whatsapp px-4 py-2 text-xs text-white hover:bg-whatsapp-dark",
    inline: "bg-whatsapp px-5 py-2.5 text-sm text-white hover:bg-whatsapp-dark",
    booking: "bg-whatsapp px-8 py-4 text-lg text-white shadow-lg hover:bg-whatsapp-dark",
    sticky: "bg-whatsapp px-4 py-2.5 text-sm text-white hover:bg-whatsapp-dark",
  };

  const labelText = label || (variant === "hero" || variant === "booking" ? "Book on WhatsApp" : "Book on WhatsApp");

  return (
    <span className={withForm ? "block" : "inline-flex " + className}>
      {withForm === "full" && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-night">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/50" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-night">Hotel / riad</span>
            <input type="text" value={hotel} onChange={(e) => setHotel(e.target.value)} placeholder="..." className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-terracotta/50" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-night">Adults</span>
            <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/50">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-night">Children (5-11)</span>
            <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/50">
              {[0, 1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
      )}
      {withForm === "compact" && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="text-xs text-white/90">
            <span className="mr-1.5 opacity-90">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-white/30 bg-white/10 px-2.5 py-1.5 text-white [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-white/50" />
          </label>
          <label className="text-xs text-white/90">
            <span className="mr-1.5 opacity-90">Pax</span>
            <select value={adults + children} onChange={(e) => setAdults(Number(e.target.value))} className="rounded-lg border border-white/30 bg-white/10 px-2 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n} className="text-night">{n}</option>)}
            </select>
          </label>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={track}
        aria-label={labelText}
        className={`${base} ${styles[variant]} ${withForm ? "mt-3 w-full sm:w-auto" : ""} ${!withForm ? className : ""}`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>{labelText}</span>
      </a>
    </span>
  );
}

/** Simple WhatsApp link (no form) used in sticky bars / floating button. */
export function WhatsAppAnchor({ href, label, className, ariaLabel }: { href: string; label?: string; className?: string; ariaLabel: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={className}>
      {label ? (
        <span className="inline-flex items-center gap-2">
          <WhatsAppIcon className="h-5 w-5" />
          {label}
        </span>
      ) : (
        <WhatsAppIcon className="h-7 w-7" />
      )}
    </a>
  );
}

