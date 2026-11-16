import { waLink } from "@/lib/config";
import { floatingWaHref, telHref } from "@/lib/booking";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { ui } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

/** Floating WhatsApp button (desktop + tablet). The sticky bar covers mobile. */
export function FloatingWhatsApp({ lang }: { lang: Lang }) {
  return (
    <a
      href={floatingWaHref(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl transition-transform hover:scale-105 md:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

/** Sticky booking bar, mobile only (always visible while scrolling). */
export function StickyMobileBar({ lang, message, label }: { lang: Lang; message: string; label?: string }) {
  const t = ui(lang);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-night-light bg-night-dark/95 px-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))", paddingTop: "0.625rem" }}
    >
      <div className="flex items-center gap-2">
        <a
          href={telHref()}
          aria-label={t.sticky.call}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-sand"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {label || t.sticky.book}
        </a>
      </div>
    </div>
  );
}
