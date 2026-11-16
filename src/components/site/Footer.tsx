import Link from "next/link";
import { config } from "@/lib/config";
import { pagesByLang, pageByUrl } from "@/lib/pages";
import { ui } from "@/lib/i18n";
import { LANGS, type Lang, type PageMeta } from "@/lib/types";
import { BalloonMark } from "./icons";

export function Footer({ lang, home }: { lang: Lang; home: PageMeta }) {
  const t = ui(lang);
  const all = pagesByLang(lang);
  const byUrl = (u: string) => pageByUrl(u);

  const flightPages = all.filter((p) => p.pageType === "product" || p.pageType === "city");
  const hub = pageByUrl(`/${lang}/guide/`);
  const guidePages = all.filter((p) => p.pageType === "guide");
  const companyPages = all.filter((p) => p.pageType === "about" || p.pageType === "reviews" || p.pageType === "faq" || p.pageType === "booking");
  const legalPages = all.filter((p) => p.pageType === "legal");

  return (
    <footer className="mt-auto border-t border-night-light bg-night-dark text-sand">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href={home.url} className="mb-4 flex items-center gap-2.5">
            <BalloonMark className="h-10 w-9" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-white">Hot Air Balloon</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">Experience Morocco</span>
            </span>
          </Link>
          <p className="mb-4 max-w-sm text-sm leading-relaxed text-sand/75">{t.footer.blurb}</p>
          <p className="mb-1 text-sm font-semibold text-gold">{t.footer.contactCol}</p>
          <address className="not-italic text-sm leading-relaxed text-sand/75">
            {config.locations.marrakech.area}
            <br />
            <a href={`tel:${config.phoneIntl}`} className="hover:text-gold">{config.phoneDisplay}</a>
            <br />
            <a href={`mailto:${config.email}`} className="hover:text-gold">{config.email}</a>
          </address>
          <p className="mt-2 text-xs text-sand/60">{t.footer.hours}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-gold">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {t.footer.licensed}
          </p>
        </div>

        <nav aria-label="Flights">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.flights}</p>
          <ul className="space-y-2 text-sm">
            {flightPages.map((p) => (
              <li key={p.id}><Link href={p.url} className="text-sand/75 hover:text-white hover:underline">{p.h1}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.company}>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.company}</p>
          <ul className="space-y-2 text-sm">
            {companyPages.map((p) => (
              <li key={p.id}><Link href={p.url} className="text-sand/75 hover:text-white hover:underline">{p.h1}</Link></li>
            ))}
          </ul>
          <p className="mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.legal}</p>
          <ul className="space-y-2 text-sm">
            {legalPages.map((p) => (
              <li key={p.id}><Link href={p.url} className="text-sand/75 hover:text-white hover:underline">{p.h1}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.guides}>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.guides}</p>
          {hub && (
            <ul className="space-y-2 text-sm">
              {guidePages.slice(0, 6).map((p) => (
                <li key={p.id}><Link href={p.url} className="text-sand/75 hover:text-white hover:underline">{p.h1}</Link></li>
              ))}
              <li><Link href={hub.url} className="font-medium text-gold hover:underline">{t.misc.guidesHub}</Link></li>
            </ul>
          )}
          <p className="mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.languages}</p>
          <ul className="flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <li key={l}>
                <Link
                  href={`/${l}/`}
                  lang={l}
                  hrefLang={l}
                  className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold uppercase ${l === lang ? "bg-terracotta text-white" : "border border-white/20 text-sand/80 hover:bg-white/10"}`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-4 text-xs text-sand/60 sm:flex-row">
          <p>(c) {config.year} {config.brand}. {t.footer.rights}</p>
          <p>{t.footer.follow}: <a href={config.sameAs[0]} rel="noopener noreferrer" target="_blank" className="hover:text-gold">Instagram</a> - <a href={config.sameAs[1]} rel="noopener noreferrer" target="_blank" className="hover:text-gold">Facebook</a> - <a href={config.sameAs[2]} rel="noopener noreferrer" target="_blank" className="hover:text-gold">TripAdvisor</a></p>
        </div>
      </div>
    </footer>
  );
}
