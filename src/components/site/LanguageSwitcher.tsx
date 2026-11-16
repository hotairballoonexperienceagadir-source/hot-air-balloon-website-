"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import altMapJson from "../../../data/alternates.json";
import { LANGS, type Lang } from "@/lib/types";
import { GlobeIcon } from "./icons";

type AltMap = Record<string, Record<string, string>>;
const ALT = altMapJson as AltMap;

/**
 * Language switcher. Links ONLY to existing equivalents (data/alternates.json);
 * falls back to that language's home when no equivalent exists. Never a dead link.
 */
export function LanguageSwitcher({ lang, mobile = false }: { lang: Lang; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}/`;
  // Next serves both with and without trailing slash; normalize.
  const key = pathname.endsWith("/") ? pathname : pathname + "/";
  const entry = ALT[key] || { [lang]: key };

  function hrefFor(target: Lang): string {
    const eq = entry[target];
    if (eq) return eq;
    return `/${target}/`;
  }

  const label = (l: Lang) => (l === "en" ? "English" : l === "fr" ? "Français" : l === "de" ? "Deutsch" : l === "es" ? "Español" : "Nederlands");

  if (mobile) {
    return (
      <div className="mt-2 border-t border-white/10 pt-3">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
          <GlobeIcon className="h-3.5 w-3.5" /> Language
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGS.map((l) => (
            <Link
              key={l}
              href={hrefFor(l)}
              lang={l}
              hrefLang={l}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase ${l === lang ? "bg-terracotta text-white" : "border border-white/20 text-sand hover:bg-white/10"}`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Language"
        className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase text-sand hover:bg-white/10"
      >
        <GlobeIcon className="h-4 w-4" />
        {lang}
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 w-40 pt-1">
          <div className="overflow-hidden rounded-xl border border-night-light bg-night-dark py-1 shadow-2xl">
            {LANGS.map((l) => (
              <Link
                key={l}
                href={hrefFor(l)}
                lang={l}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm ${l === lang ? "bg-white/10 font-semibold text-gold" : "text-sand hover:bg-white/5"}`}
              >
                {l.toUpperCase()} - {label(l)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
