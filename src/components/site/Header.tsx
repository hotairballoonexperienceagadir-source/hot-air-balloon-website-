"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pagePaths } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";
import { formatRating, tpl } from "@/lib/i18n/format";
import { site } from "@/lib/site";
import { BookingButton } from "./BookingButton";
import { BookingModalLazy } from "./BookingModalLazy";
import { LanguageSwitcher, LanguageSwitcherMobileList } from "./LanguageSwitcher";
import { WhatsAppIcon } from "./icons";

type HeaderVariant = "home" | "marrakech";

/**
 * The shared header. All labels come from the i18n dictionary of the
 * current language (provided once per language layout through context);
 * the internal booking destination stays the untranslated store key.
 */
export function Header({ variant = "home" }: { variant?: HeaderVariant }) {
  const { locale, dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  /* Logo emphasis state: the painted logo grows gently only while the page
     rests at the very top and shrinks back to its exact regular size as soon
     as the visitor scrolls. Pure CSS transform, so the layout box and the
     header height never change. */
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setAtTop(window.scrollY <= 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Logo click behaviour. While on the homepage of the current language the
     URL often carries a hash such as #reviews (set by the nav links). A
     plain Link to the localized home path from a hash URL is a same page
     navigation for Next.js: it keeps the hash and the scroll position, so
     the visitor stays mid page. To avoid that we take over the click when
     already on the localized home path: clear the hash with replaceState and
     scroll back to the very top. From the Marrakech page we do nothing and
     let the Link navigate normally, which lands on the localized homepage
     and scrolls it to the top. */
  const homePath = pagePaths.home[locale];
  function onLogoClick(e: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname.replace(/\/+$/, "") !== homePath.replace(/\/+$/, "")) return;
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const nav = {
    main:
      variant === "home"
        ? [
            { href: "#home", label: dict.header.nav.home },
            { href: "#flights", label: dict.header.nav.agadirFlights },
            { href: "#experience", label: dict.header.nav.experience },
            { href: "#gallery", label: dict.header.nav.gallery },
            { href: "#reviews", label: dict.header.nav.reviews },
            { href: "#faq", label: dict.header.nav.faq },
          ]
        : [
            { href: homePath, label: dict.header.nav.home },
            { href: "#flights", label: dict.header.nav.marrakechFlights },
            { href: "#experience", label: dict.header.nav.experience },
            { href: "#reviews", label: dict.header.nav.reviews },
            { href: "#faq", label: dict.header.nav.faq },
          ],
    secondary:
      variant === "home"
        ? { href: pagePaths.marrakech[locale], label: dict.header.nav.marrakechFlights }
        : { href: homePath, label: dict.header.nav.agadirFlights },
    strip: variant === "home" ? dict.header.stripHome : dict.header.stripMarrakech,
    bookingDestination: (variant === "home" ? "Agadir" : "Marrakech") as "Agadir" | "Marrakech",
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
      {/* Top contact strip */}
      <div className="hidden bg-navy-950/90 text-[13px] text-cream-100/90 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phoneTel}`} className="flex items-center gap-2 transition hover:text-brand-300">
              <Phone className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-brand-300"
            >
              <span className="text-gold-400">★</span>{" "}
              {tpl(dict.header.ratingOnGoogle, { rating: formatRating(site.googleRating, locale) })}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cream-100/70">{nav.strip}</span>
            <span className="h-3 w-px bg-cream-100/30" aria-hidden="true" />
            <span className="font-medium text-brand-300">{dict.header.open24}</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "fixed inset-x-0 top-0 bg-navy-900/95 shadow-lg shadow-navy-950/40 backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href={homePath}
            onClick={onLogoClick}
            className="flex items-center"
            aria-label={dict.header.logoAria}
          >
            {/* Transform scale only: the layout box keeps its exact size, so
                the header height, spacing and alignment never shift while the
                painted logo gently grows at the top of the page. */}
            <Image
              src="/images/logo.webp"
              alt={dict.header.logoAlt}
              width={1536}
              height={1024}
              priority
              quality={90}
              /* The logo renders 72 px wide on mobile and 84 px on desktop;
               * without this hint the browser downloads the logo at its full
               * 1536 px width on every device. */
              sizes="(max-width: 767px) 72px, 84px"
              className="h-12 w-auto object-contain transition-transform duration-300 ease-out motion-reduce:transition-none md:h-14"
              style={{ transform: atTop ? "scale(1.45)" : "scale(1)" }}
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {nav.main.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-cream-100/90 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {/* Secondary destination link */}
            <Link
              href={nav.secondary.href}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-brand-400/40 bg-brand-500/10 px-3.5 py-2 text-sm font-semibold text-brand-300 transition hover:bg-brand-500/20 hover:text-brand-200"
            >
              {nav.secondary.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <BookingButton
              destination={nav.bookingDestination}
              className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {dict.common.bookNow}
            </BookingButton>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={dict.header.openMenu}
                  className="rounded-full border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 border-navy-800 bg-navy-900 text-cream-100">
                <SheetTitle className="text-cream-100">{dict.header.menuTitle}</SheetTitle>
                <SheetDescription className="sr-only">
                  {dict.header.menuDescription}
                </SheetDescription>
                <nav aria-label="Mobile navigation" className="mt-6 flex flex-col gap-1">
                  {nav.main.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-semibold text-cream-100/90 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href={nav.secondary.href}
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-between rounded-xl border border-brand-400/40 bg-brand-500/10 px-4 py-3 text-base font-semibold text-brand-300"
                  >
                    {nav.secondary.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <LanguageSwitcherMobileList />
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-base font-semibold"
                  >
                    <Phone className="h-4 w-4 text-brand-400" aria-hidden="true" />
                    {site.phoneDisplay}
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </header>
      {/* THE shared booking form. One instance per page, opened by every
          booking CTA through the booking store. Loaded as an async chunk so
          it never weighs down the first paint. */}
      <BookingModalLazy />
    </>
  );
}
