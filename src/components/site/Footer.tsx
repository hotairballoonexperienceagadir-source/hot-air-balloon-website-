import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { cities, offers, offerWaMessage, site, waLink, defaultWaMessage } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#marrakech", label: "Marrakech Flights" },
  { href: "#agadir", label: "Agadir Flights" },
  { href: "#experience", label: "Flight Day Experience" },
  { href: "#packages", label: "Special Packages" },
  { href: "#gallery", label: "Gallery" },
];

const supportLinks = [
  { href: "#reviews", label: "Guest Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#book", label: "Book Your Flight" },
  { href: site.googleReviewsUrl, label: "Google Business Profile", external: true },
];

export function Footer() {
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
              Licensed sunrise hot air balloon flights over Marrakech and Agadir. Same pilots, same safety, two
              unforgettable landscapes.
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
                  href={waLink(defaultWaMessage)}
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
                <li key={link.href}>
                  <a href={link.href} className="text-cream-100/75 transition hover:text-brand-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Flights */}
          <nav aria-label="Footer flight offers">
            <h3 className="font-display text-lg font-bold text-white">Our Flights</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {offers.map((offer) => (
                <li key={offer.id}>
                  <a
                    href={waLink(offerWaMessage(offer.name, offer.cityName))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-100/75 transition hover:text-brand-300"
                  >
                    {offer.name} <span className="text-cream-100/50">in {offer.cityName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Footer support links">
            <h3 className="font-display text-lg font-bold text-white">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {supportLinks.map((link) => (
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
                Marrakech: Palmeraie desert launch site.
                <br />
                Agadir: Souss valley launch site.
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
          <p>Marrakech and Agadir sunrise balloon flights in Morocco.</p>
        </div>
      </div>
    </footer>
  );
}
