"use client";

import { useCallback, useSyncExternalStore } from "react";
import { config } from "@/lib/config";
import { ui } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

const STORAGE_KEY = "habe-consent";
const EVENT = "habe-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  return window.localStorage.getItem(STORAGE_KEY) ?? "unset";
}

function getServerSnapshot(): string {
  return "unset";
}

function emitChange() {
  window.dispatchEvent(new Event(EVENT));
}

/** GDPR cookie banner. GA4 is only loaded after explicit consent. */
export function CookieConsent({ lang }: { lang: Lang }) {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = ui(lang);

  const decide = useCallback((value: "granted" | "denied") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      if (config.gaMeasurementId) injectGtag(config.gaMeasurementId);
    }
    emitChange();
  }, []);

  if (choice !== "unset") return null;

  return (
    <div role="dialog" aria-live="polite" aria-label={t.cookie.title} className="fixed bottom-20 left-4 right-4 z-50 sm:bottom-4 sm:left-auto sm:max-w-sm">
      <div className="rounded-2xl border border-night-light bg-night p-4 text-sand shadow-2xl">
        <p className="mb-1 font-display text-sm font-bold text-gold">{t.cookie.title}</p>
        <p className="mb-3 text-xs leading-relaxed text-sand/85">{t.cookie.text}</p>
        <div className="flex gap-2">
          <button onClick={() => decide("granted")} className="flex-1 rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-white hover:bg-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
            {t.cookie.accept}
          </button>
          <button onClick={() => decide("denied")} className="flex-1 rounded-full border border-sand/40 px-4 py-2 text-xs font-semibold text-sand hover:bg-sand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
            {t.cookie.decline}
          </button>
        </div>
      </div>
    </div>
  );
}

function injectGtag(id: string) {
  if (document.getElementById("gtag-script")) return;
  const s = document.createElement("script");
  s.id = "gtag-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  const init = document.createElement("script");
  init.id = "gtag-init";
  init.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
  document.head.appendChild(init);
}
