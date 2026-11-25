"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import {
  GA_MEASUREMENT_ID,
  OPEN_CONSENT_EVENT,
  destinationFromPath,
  getConsentServerSnapshot,
  getConsentSnapshot,
  isAnalyticsHost,
  startAnalytics,
  stopAnalytics,
  subscribeConsent,
  trackEvent,
  trackPageView,
  writeConsent,
  type ConsentChoice,
} from "@/lib/analytics";

/**
 * GA4 + consent banner, mounted once in each language root layout.
 *
 * - Before Accept nothing is requested from Google and no cookie is set.
 * - gtag.js is injected with next/script (afterInteractive) only after
 *   Accept on an allowed host (see isAnalyticsHost).
 * - page_view is sent for the first page and on every App Router pathname
 *   change (config uses send_page_view: false, so no double count).
 * - One delegated click listener tracks every wa.me / tel: / mailto: link
 *   on the page, including server rendered ones. The booking form opens
 *   WhatsApp with window.open and tracks its own richer lead event.
 * - The banner is position: fixed (no layout shift) and only rendered on
 *   the client after the stored choice was read, so the prerendered HTML
 *   is unchanged.
 */
export function Analytics() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  /* undefined = not read yet (server render / hydration), so the
     prerendered HTML never contains the banner. */
  const choice = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [reopened, setReopened] = useState(false);
  const bannerOpen = choice === null || reopened;
  const gaEnabled = choice === "granted" && isAnalyticsHost();
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  /* Start or stop GA whenever the choice changes (declared before the
     page_view effect so the queue is primed first). */
  useEffect(() => {
    if (gaEnabled) startAnalytics();
    else if (choice === "denied") stopAnalytics();
  }, [choice, gaEnabled]);

  /* page_view: first page once GA is enabled, then every pathname change. */
  useEffect(() => {
    if (gaEnabled) trackPageView();
  }, [gaEnabled, pathname]);

  /* Footer "Cookie settings" link reopens the banner. */
  useEffect(() => {
    function open() {
      setReopened(true);
    }
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  /* Reopened from the footer: move keyboard focus into the banner. */
  useEffect(() => {
    if (bannerOpen && choice !== null && choice !== undefined) firstButtonRef.current?.focus();
  }, [bannerOpen, choice]);

  /* Delegated lead / contact click tracking (no-op without consent). */
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) {
        trackEvent("generate_lead", {
          method: "whatsapp",
          destination: destinationFromPath(window.location.pathname),
          package: link.dataset.leadPackage,
          language: locale,
        });
      } else if (href.startsWith("tel:")) {
        trackEvent("click_phone", { language: locale });
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", { language: locale });
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [locale]);

  function decide(next: ConsentChoice) {
    writeConsent(next);
    setReopened(false);
  }

  return (
    <>
      {gaEnabled && (
        <Script
          id="ga4-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      )}

      {bannerOpen && (
        <section
          role="region"
          aria-label={dict.consent.ariaLabel}
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[60] rounded-2xl border border-white/10 bg-navy-900/95 p-4 text-cream-100 shadow-2xl shadow-navy-950/50 backdrop-blur md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-5"
        >
          <p className="text-sm leading-relaxed text-cream-100/90">{dict.consent.message}</p>
          <div className="mt-3 flex gap-2.5">
            <button
              ref={firstButtonRef}
              type="button"
              onClick={() => decide("denied")}
              className="h-11 flex-1 rounded-xl border border-white/40 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
            >
              {dict.consent.reject}
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="h-11 flex-1 rounded-xl bg-brand-500 px-5 text-sm font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
            >
              {dict.consent.accept}
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Footer link that reopens the consent banner. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="underline-offset-2 transition hover:text-brand-300 hover:underline"
    >
      {label}
    </button>
  );
}
