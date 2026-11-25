"use client";

import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import { pagePaths } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n/context";
import { tpl } from "@/lib/i18n/format";
import { trackEvent } from "@/lib/analytics";
import { BookingButton } from "./BookingButton";
import { WhatsAppIcon } from "./icons";

/**
 * Desktop: floating WhatsApp bubble above the sticky bar area.
 * Mobile: sticky bottom bar with a cross-destination link and booking action.
 * Both booking actions open THE shared booking modal, prefilled with the
 * destination of the current page.
 */
export function FloatingActions({ city = "agadir" }: { city?: "agadir" | "marrakech" }) {
  const { dict, locale } = useI18n();
  const destination = city === "marrakech" ? "Marrakech" : "Agadir";
  const otherCity = city === "marrakech" ? "agadir" : "marrakech";
  /* pagePaths keys are "home" (Agadir) and "marrakech". */
  const destinationLink = pagePaths[city === "marrakech" ? "home" : "marrakech"][locale];
  const destinationLabel =
    city === "marrakech" ? dict.header.nav.agadirFlights : dict.header.nav.marrakechFlights;

  return (
    <>
      {/* Floating booking bubble, desktop only */}
      <BookingButton
        destination={destination}
        aria-label={dict.floating.bookAria}
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl shadow-navy-950/40 transition hover:scale-105 hover:bg-whatsapp-dark md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-20" aria-hidden="true" />
      </BookingButton>
      <a
        href={`tel:${site.phoneTel}`}
        aria-label={tpl(dict.floating.callAria, { phone: site.phoneDisplay })}
        className="fixed bottom-24 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy-900/90 text-cream-100 shadow-xl backdrop-blur transition hover:scale-105 hover:bg-navy-800 md:flex"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* Sticky action bar, mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-900/95 px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur md:hidden">
        <div className="flex items-center gap-2 pb-1">
          <Link
            href={destinationLink}
            onClick={() =>
              trackEvent("select_destination", {
                from: city,
                to: otherCity,
                language: locale,
              })
            }
            className="flex h-10 min-w-0 flex-[1.05] items-center justify-center gap-1 whitespace-nowrap rounded-full border border-brand-400/40 bg-brand-500/10 px-1 text-[11px] font-semibold text-brand-300 transition active:bg-brand-500/20"
          >
            <span>{destinationLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
          <BookingButton
            destination={destination}
            className="flex h-10 flex-[1.15] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-whatsapp px-2 text-xs font-bold text-white shadow-lg shadow-whatsapp/25 transition active:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
            {dict.floating.bookOnWhatsApp}
          </BookingButton>
        </div>
      </div>
    </>
  );
}
