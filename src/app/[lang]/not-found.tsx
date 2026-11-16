"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/lib/i18n";
import { pagesByLang, type PageMeta } from "@/lib/pages";
import type { Lang } from "@/lib/types";

/**
 * Localized 404. Detects the language from the URL (falls back to EN),
 * and always links to real pages: home, all flights, prices, book.
 */
export default function LangNotFound() {
  const pathname = usePathname() || "/en/";
  const seg = pathname.split("/")[1] || "en";
  const lang = (["en", "fr", "de", "es", "nl"].includes(seg) ? seg : "en") as Lang;
  const t = ui(lang);
  const langPages = pagesByLang(lang);
  const byId = (id: string): PageMeta | undefined => langPages.find((p) => p.id === id);

  const home = byId(`${lang}-home`);
  const prices = langPages.find((p) => p.pageType === "pricing");
  const book = byId(`${lang}-contact`);
  const flights = langPages.filter((p) => p.pageType === "product").slice(0, 3);

  return (
    <main className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-bold text-terracotta">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-night sm:text-3xl">{t.notFound.title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{t.notFound.text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {home && <Link href={home.url} className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark">{t.notFound.home}</Link>}
        {flights.map((f) => (
          <Link key={f.id} href={f.url} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-night hover:border-terracotta hover:text-terracotta">
            {f.h1}
          </Link>
        ))}
        {prices && <Link href={prices.url} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-night hover:border-terracotta hover:text-terracotta">{t.notFound.prices}</Link>}
        {book && <Link href={book.url} className="rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white hover:bg-whatsapp-dark">{t.notFound.book}</Link>}
      </div>
    </main>
  );
}
