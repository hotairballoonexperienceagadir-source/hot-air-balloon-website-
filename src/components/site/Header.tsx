"use client";

import { useState } from "react";
import Link from "next/link";
import { ui, priceFmt } from "@/lib/i18n";
import { config, priceMad } from "@/lib/config";
import type { Lang, PageMeta } from "@/lib/types";
import { BalloonMark, MenuIcon, CloseIcon, WhatsAppIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang, home, products, agadirUrl, pricesUrl, guidesUrl, faqUrl, bookUrl, bookMsg }: {
  lang: Lang;
  home: PageMeta;
  products: { page: PageMeta; flightKey: string; name: string }[];
  agadirUrl: string;
  pricesUrl: string;
  guidesUrl: string | null;
  faqUrl: string;
  bookUrl: string;
  bookMsg: string;
}) {
  const t = ui(lang);
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  const waHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(bookMsg)}`;

  const navLinks = (
    <>
      <Link href={home.url} className="rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>
        {t.nav.home}
      </Link>
      <div
        className="relative"
        onMouseEnter={() => setProdOpen(true)}
        onMouseLeave={() => setProdOpen(false)}
      >
        <button
          aria-expanded={prodOpen}
          aria-haspopup="true"
          onClick={() => setProdOpen((v) => !v)}
          className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white"
        >
          {t.nav.marrakech}
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {prodOpen && (
          <div className="absolute left-0 top-full z-50 w-72 pt-1">
            <div className="overflow-hidden rounded-2xl border border-night-light bg-night-dark shadow-2xl">
              {products.map((p) => (
                <Link
                  key={p.page.id}
                  href={p.page.url}
                  onClick={() => { setProdOpen(false); setOpen(false); }}
                  className="block border-b border-white/5 px-4 py-3 last:border-0 hover:bg-white/5"
                >
                  <span className="block text-sm font-semibold text-white">{p.name}</span>
                  <span className="block text-xs text-gold-light">{priceFmt(lang, priceMad(p.flightKey))}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Link href={agadirUrl} className="rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{t.nav.agadir}</Link>
      <Link href={pricesUrl} className="rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{t.nav.prices}</Link>
      {guidesUrl && <Link href={guidesUrl} className="rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{t.nav.guides}</Link>}
      <Link href={faqUrl} className="rounded-full px-3 py-2 text-sm font-medium text-sand hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{t.nav.faq}</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night-dark/95 text-sand backdrop-blur supports-[backdrop-filter]:bg-night-dark/85">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <Link href={home.url} className="flex items-center gap-2.5" aria-label={config.brand}>
          <BalloonMark className="h-9 w-8" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide text-white sm:text-base">Hot Air Balloon</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold sm:text-[11px]">Experience Morocco</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navLinks}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <Link
            href={bookUrl}
            className="hidden rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-terracotta-dark sm:inline-flex"
          >
            {t.nav.book}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden rounded-full bg-whatsapp/20 p-2.5 text-whatsapp transition hover:bg-whatsapp/30 md:inline-flex"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex rounded-full p-2.5 text-sand hover:bg-white/10 lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-night-dark lg:hidden">
          <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
            {navLinks}
            <Link href={bookUrl} onClick={() => setOpen(false)} className="mt-2 rounded-full bg-terracotta px-5 py-3 text-center text-sm font-semibold text-white">
              {t.nav.book}
            </Link>
            <LanguageSwitcher lang={lang} mobile />
          </nav>
        </div>
      )}
    </header>
  );
}
