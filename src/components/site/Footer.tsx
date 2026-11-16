import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  agadirOffers,
  defaultWaMessage,
  marrakechOffers,
  marrakechWaMessage,
  offerWaMessage,
  site,
  waLink,
} from "@/lib/site";
import { WhatsAppIcon } from "./icons";

type FooterVariant = "home" | "marrakech";

const quickLinksByVariant: Record<FooterVariant, { href: string; label: string }[]> = {
  home: [
    { href: "#home", label: "Home" },
    { href: "#flights", label: "Agadir Flights" },
    { href: "#experience", label: "The Agadir Experience" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Guest Reviews" },
    { href: "#faq", label: "FAQ" },
  ],
  marrakech: [
    { href: "/", label: "Home" },
    { href: "#flights", label: "Marrakech Flights" },
    { href: "#experience", label: "Flight Day Experience" },
    { href: "#reviews", label: "Guest Reviews" },
    { href: "#faq", label: "FAQ" },
    { href: site.homePath, label: "Agadir Flights (main destination)" },
  ],
};

const offerListByVariant: Record<
  FooterVariant,
  { title: string; offers: typeof agadirOffers; path: string; secondary?: { title: string; offers: typeof marrakechOffers; path: string } }
> = {
  home: {
    title: "Agadir Flights | Main Destination",
    offers: agadirOffers,
    path: "#flights",
    secondary: {
      title: "Marrakech Flights | Also Available",
      offers: marrakechOffers,
      path: site.marrakechPath,
    },
  },
  marrakech: {
    title: "Marrakech Flights",
    offers: marrakechOffers,
    path: "#flights",
    secondary: {
      title: "Agadir Flights | Main Destination",
      offers: agadirOffers,
      path: site.homePath,
    },
  },
};

export function Footer({ variant = "home" }: { variant?: FooterVariant }) {
  const quickLinks = quickLinksByVariant[variant];
  const lists = offerListByVariant[variant];
  const homeMessage = variant === "marrakech" ? marrakechWaMessage : defaultWaMessage;

  return (
    <footer id="contact" className="bg-navy-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and contact */}
          <div>
            <Image
              src="/images/logo.jpg"
              alt="Hot Air Balloon Experience Agadir logo"
              width={1000}
              height={630}
              loading="lazy"
              className="h-16 w-auto rounded-lg bg-white px-2 py-1.5"
            />
            <p className="mt-4 text-sm leading-relaxed text-cream-100/75">
              Agadir based licensed sunrise hot air balloon flights over the Souss Valley. Same pilots, same
              safety, and a second launch site in Marrakech for our travelers.
            </p>
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
                  WhatsApp us anytime
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-cream-100/85">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href="mailto:contact@hotairballoonexperienceagadir.com" className="transition hover:text-brand-300">
                  contact@hotairballoonexperienceagadir.com
                </a>
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
                {site.hours}
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-display text-lg font-bold text-white">Quick Links</h3>
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
            <h3 className="font-display text-lg font-bold text-white">{lists.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {lists.offers.map((offer) => (
                <li key={offer.id}>
                  <a
                    href={waLink(offerWaMessage(offer.name, offer.cityName, offer.priceMad))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-100/75 transition hover:text-brand-300"
                  >
                    {offer.name} <span className="text-cream-100/50">| {offer.priceMad.toLocaleString("en-US")} MAD</span>
                  </a>
                </li>
              ))}
            </ul>
            {lists.secondary && (
              <>
                <h3 className="mt-6 font-display text-base font-bold text-white/90">{lists.secondary.title}</h3>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {lists.secondary.offers.map((offer) => (
                    <li key={offer.id}>
                      <Link
                        href={lists.secondary!.path}
                        className="text-cream-100/75 transition hover:text-brand-300"
                      >
                        {offer.name}
                        <span className="text-cream-100/50"> in {offer.cityName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>

          {/* Support */}
          <nav aria-label="Footer support links">
            <h3 className="font-display text-lg font-bold text-white">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "#reviews", label: "Guest Reviews" },
                { href: "#faq", label: "FAQ" },
                { href: "#book", label: "Book Your Flight" },
                { href: site.googleReviewsUrl, label: "Google Business Profile", external: true },
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
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Sunrise flights daily</p>
              <p className="mt-1.5 text-xs leading-relaxed text-cream-100/70">
                Agadir: Souss Valley launch site, our home base.
                <br />
                Marrakech: Palmeraie desert launch site.
                <br />
                {site.hours}
              </p>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream-100/60 sm:flex-row md:px-6">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>Agadir sunrise balloon flights over the Souss Valley, Morocco.</p>
        </div>
      </div>
    </footer>
  );
}
