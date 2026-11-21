"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { localeNames, localeShortCodes, locales, pageKeyFromPathname, pagePaths, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";

/**
 * Language switcher (desktop dropdown + mobile list).
 *
 * RULES (owner approved 2026-11-21):
 * - Real crawlable <a href> links, never JS only buttons.
 * - Switching keeps the visitor on the SAME page: Agadir home to Agadir
 *   home, Marrakech page to Marrakech page (exact localized slugs).
 * - The choice is stored in localStorage for convenience only. It is NEVER
 *   used to auto redirect: the default language on "/" is always English.
 */

/* localStorage key of the remembered choice (no redirect is ever driven by it). */
export const PREFERRED_LOCALE_KEY = "preferred-locale";

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(PREFERRED_LOCALE_KEY, locale);
  } catch {
    /* Private mode or storage disabled: remembering the choice is a pure
       convenience, never a requirement. */
  }
}

export function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const pageKey = pageKeyFromPathname(pathname ?? "/");
  const otherLocales = locales.filter((code) => code !== locale);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: globalThis.PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={dict.switcher.triggerLabel.replace("{name}", localeNames[locale])}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {localeShortCodes[locale]}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/15 bg-navy-900 py-1.5 shadow-2xl shadow-navy-950/60"
          role="menu"
          aria-label={dict.switcher.triggerLabel.replace("{name}", localeNames[locale])}
        >
          {locales.map((code) => (
            <a
              key={code}
              role="menuitem"
              href={pagePaths[pageKey][code]}
              hreflang={code}
              lang={code}
              onClick={() => {
                rememberLocale(code);
                setOpen(false);
              }}
              className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 ${
                code === locale ? "text-brand-300" : "text-cream-100/90 hover:text-white"
              }`}
              aria-current={code === locale ? "true" : undefined}
            >
              {localeNames[code]}
              {code === locale && <Check className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />}
            </a>
          ))}
          {/* otherLocales kept for future filtering needs; all four languages are listed */}
          <span className="sr-only">{otherLocales.length} other languages available</span>
        </div>
      )}
    </div>
  );
}

/**
 * Mobile variant: the same four crawlable links rendered as a plain list
 * inside the header Sheet, styled like the existing mobile nav items.
 */
export function LanguageSwitcherMobileList() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const pageKey = pageKeyFromPathname(pathname ?? "/");

  return (
    <div className="mt-2">
      <p className="flex items-center gap-2 px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-cream-100/50">
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        {dict.switcher.triggerLabel.replace("{name}", localeNames[locale]).split(",")[0]}
      </p>
      <div className="grid grid-cols-2 gap-1.5 px-2">
        {locales.map((code) => (
          <a
            key={code}
            href={pagePaths[pageKey][code]}
            hreflang={code}
            lang={code}
            onClick={() => rememberLocale(code)}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              code === locale
                ? "bg-brand-500/15 text-brand-300"
                : "text-cream-100/90 hover:bg-white/10 hover:text-white"
            }`}
            aria-current={code === locale ? "true" : undefined}
          >
            <span className="w-6 text-left text-xs font-bold text-cream-100/60">{localeShortCodes[code]}</span>
            {localeNames[code]}
          </a>
        ))}
      </div>
    </div>
  );
}
