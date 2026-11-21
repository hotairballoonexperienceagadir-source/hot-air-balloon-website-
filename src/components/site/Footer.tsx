import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, waLink } from "@/lib/site";
import { pagePaths } from "@/lib/i18n/config";
import { formatPrice, tpl } from "@/lib/i18n/format";
import type { Dictionary, SiteContent } from "@/lib/i18n/types";
import { WhatsAppIcon } from "./icons";
import { ContactButton } from "./ContactModal";
import { ContactModalLazy } from "./ContactModalLazy";
import { SocialLinks } from "./SocialLinks";

type FooterVariant = "home" | "marrakech";

/**
 * The shared footer. Server component: dict and content arrive as props
 * from the page (server components cannot consume the client context).
 * Package names stay English in every language; only the surrounding UI,
 * the city names and the WhatsApp messages are localized.
 */
export function Footer({
  dict,
  content,
  variant = "home",
}: {
  dict: Dictionary;
  content: SiteContent;
  variant?: FooterVariant;
}) {
  const { locale } = content;
  const agadir = content.destinations.agadir;
  const marrakech = content.destinations.marrakech;

  const quickLinks =
    variant === "home"
      ? [
          { href: "#home", label: dict.footer.quickLinks.home },
          { href: "#flights", label: dict.footer.quickLinks.agadirFlights },
          { href: "#experience", label: dict.footer.quickLinks.agadirExperience },
          { href: "#gallery", label: dict.footer.quickLinks.gallery },
          { href: "#reviews", label: dict.footer.quickLinks.guestReviews },
          { href: "#faq", label: dict.footer.quickLinks.faq },
        ]
      : [
          { href: pagePaths.home[locale], label: dict.footer.quickLinks.home },
          { href: "#flights", label: dict.footer.quickLinks.marrakechFlights },
          { href: "#experience", label: dict.footer.quickLinks.flightDayExperience },
          { href: "#reviews", label: dict.footer.quickLinks.guestReviews },
          { href: "#faq", label: dict.footer.quickLinks.faq },
          { href: pagePaths.home[locale], label: dict.footer.quickLinks.agadirFlightsMain },
        ];

  const lists = {
    main:
      variant === "home"
        ? {
            title: dict.footer.offersHomeTitle,
            offers: agadir.offers,
            path: "#flights",
          }
        : {
            title: dict.footer.offersMarrakechTitle,
            offers: marrakech.offers,
            path: "#flights",
          },
    secondary:
      variant === "home"
        ? {
            title: dict.footer.offersMarrakechSecondaryTitle,
            offers: marrakech.offers,
            path: pagePaths.marrakech[locale],
          }
        : {
            title: dict.footer.offersHomeTitle,
            offers: agadir.offers,
            path: pagePaths.home[locale],
          },
  };

  const homeMessage = variant === "marrakech" ? marrakech.waMessage : agadir.waMessage;

  return (
    <>
      <footer id="contact" className="bg-navy-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and contact */}
          <div>
            <Image
              src="/images/logo.webp"
              alt={dict.header.logoAlt}
              width={1536}
              height={1024}
              loading="lazy"
              quality={90}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-cream-100/75">{dict.footer.about}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`tel:${site.phoneTel}`} className="flex items-center gap-2.5 text-cream-100/85 transition hover:text-brand-300">
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink(homeMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream-100/85 transition hover:text-brand-300"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-whatsapp" />
                  {dict.footer.whatsappUs}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-cream-100/85">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <ContactButton className="text-left transition hover:text-brand-300">
                  {site.contactEmail}
                </ContactButton>
              </li>
              <li className="flex items-start gap-2.5 text-cream-100/85">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>
                  {site.address}
                  <span className="block text-xs text-cream-100/60">Plus code {site.plusCode}</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-cream-100/85">
                <Clock className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {dict.footer.hours}
              </li>
            </ul>

          {/* Agadir official social media: homepage variant only, never on Marrakech. */}
          {variant === "home" && (
            <div className="mt-7 border-t border-white/10 pt-6">
              <h3 className="font-display text-base font-bold text-white">{dict.footer.followTitle}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-cream-100/65">{dict.footer.followText}</p>
              <SocialLinks className="mt-4" />
            </div>
          )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-display text-lg font-bold text-white">{dict.footer.quickLinksTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-cream-100/75 transition hover:text-brand-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Flights: main destination first */}
          <nav aria-label="Footer flight offers">
            <h3 className="font-display text-lg font-bold text-white">{lists.main.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {lists.main.offers.map((offer) => (
                <li key={offer.id}>
                  <a
                    href={waLink(
                      tpl(dict.footer.offerWaTemplate, {
                        name: offer.name,
                        city: offer.cityName,
                        price: formatPrice(offer.priceMad, locale),
                      }),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-100/75 transition hover:text-brand-300"
                  >
                    {offer.name} <span className="text-cream-100/50">| {formatPrice(offer.priceMad, locale)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-base font-bold text-white/90">{lists.secondary.title}</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {lists.secondary.offers.map((offer) => (
                <li key={offer.id}>
                  <Link
                    href={lists.secondary.path}
                    className="text-cream-100/75 transition hover:text-brand-300"
                  >
                    {offer.name}
                    <span className="text-cream-100/50"> {tpl(dict.footer.inCity, { city: offer.cityName })}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Footer support links">
            <h3 className="font-display text-lg font-bold text-white">{dict.footer.supportTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "#reviews", label: dict.footer.guestReviews },
                { href: "#faq", label: dict.footer.faq },
                { href: "#book", label: dict.footer.bookYourFlight },
                { href: site.googleReviewsUrl, label: dict.footer.googleBusinessProfile, external: true },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-cream-100/75 transition hover:text-brand-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">{dict.footer.sunriseDaily}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-cream-100/70">
                {dict.footer.agadirLaunch}
                <br />
                {dict.footer.marrakechLaunch}
                <br />
                {dict.footer.hours}
              </p>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream-100/60 sm:flex-row md:px-6">
          <p>{tpl(dict.footer.copyright, { year: new Date().getFullYear(), brand: site.brand })}</p>
          <p>{dict.footer.tagline}</p>
        </div>
      </div>
      </footer>
      {/* THE shared contact form. One instance per page, opened by every
          email contact option through the contact store. */}
      <ContactModalLazy />
    </>
  );
}
