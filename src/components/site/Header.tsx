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
import { site } from "@/lib/site";
import { BookingButton, BookingModal } from "./BookingModal";
import { WhatsAppIcon } from "./icons";

type HeaderVariant = "home" | "marrakech";

const navByVariant: Record<
  HeaderVariant,
  {
    main: { href: string; label: string; external?: boolean }[];
    secondary: { href: string; label: string };
    strip: string;
    bookingDestination: "Agadir" | "Marrakech";
  }
> = {
  home: {
    main: [
      { href: "#home", label: "Home" },
      { href: "#flights", label: "Agadir Flights" },
      { href: "#experience", label: "Experience" },
      { href: "#gallery", label: "Gallery" },
      { href: "#reviews", label: "Reviews" },
      { href: "#faq", label: "FAQ" },
    ],
    secondary: { href: site.marrakechPath, label: "Marrakech Flights" },
    strip: "Sunrise flights over the Souss Valley, Agadir",
    bookingDestination: "Agadir",
  },
  marrakech: {
    main: [
      { href: "/", label: "Home" },
      { href: "#flights", label: "Marrakech Flights" },
      { href: "#experience", label: "Experience" },
      { href: "#reviews", label: "Reviews" },
      { href: "#faq", label: "FAQ" },
    ],
    secondary: { href: site.homePath, label: "Agadir Flights" },
    strip: "Marrakech flights operated by our Agadir base",
    bookingDestination: "Marrakech",
  },
};

export function Header({ variant = "home" }: { variant?: HeaderVariant }) {
  const [scrolled, setScrolled] = useState(false);
  /* Logo emphasis state: the painted logo grows gently only while the page
     rests at the very top and shrinks back to its exact regular size as soon
     as the visitor scrolls. Pure CSS transform, so the layout box and the
     header height never change. */
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const nav = navByVariant[variant];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setAtTop(window.scrollY <= 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Logo click behaviour. While on the homepage the URL often carries a hash
     such as #reviews (set by the nav links). A plain Link to "/" from a hash
     URL is a same page navigation for Next.js: it keeps the hash and the
     scroll position, so the visitor stays mid page. To avoid that we take
     over the click when already on "/": clear the hash with replaceState and
     scroll back to the very top. From the Marrakech page we do nothing and
     let the Link navigate normally, which lands on "/" and scrolls to the
     top of the Agadir homepage. */
  function onLogoClick(e: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
              <span className="text-gold-400">★</span> {site.googleRating.toFixed(1)} on Google
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cream-100/70">{nav.strip}</span>
            <span className="h-3 w-px bg-cream-100/30" aria-hidden="true" />
            <span className="font-medium text-brand-300">Open 24 hours</span>
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
            href={site.homePath}
            onClick={onLogoClick}
            className="flex items-center"
            aria-label="Hot Air Balloon Experience Agadir, home"
          >
            {/* Transform scale only: the layout box keeps its exact size, so
                the header height, spacing and alignment never shift while the
                painted logo gently grows at the top of the page. */}
            <Image
              src="/images/logo.webp"
              alt="Hot Air Balloon Experience Agadir logo"
              width={1536}
              height={1024}
              priority
              quality={90}
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
            <BookingButton
              destination={nav.bookingDestination}
              className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Book Now
            </BookingButton>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 border-navy-800 bg-navy-900 text-cream-100">
                <SheetTitle className="text-cream-100">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to the main sections of the site
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
          booking CTA through the booking store. */}
      <BookingModal />
    </>
  );
}
