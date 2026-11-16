import { Phone } from "lucide-react";
import { site, waLink, defaultWaMessage } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Desktop: floating WhatsApp bubble above the sticky bar area.
 * Mobile: sticky bottom bar with Call and WhatsApp actions.
 */
export function FloatingActions() {
  return (
    <>
      {/* Floating WhatsApp bubble, desktop only */}
      <a
        href={waLink(defaultWaMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl shadow-navy-950/40 transition hover:scale-105 hover:bg-whatsapp-dark md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-20" aria-hidden="true" />
      </a>
      <a
        href={`tel:${site.phoneTel}`}
        aria-label={`Call ${site.phoneDisplay}`}
        className="fixed bottom-24 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy-900/90 text-cream-100 shadow-xl backdrop-blur transition hover:scale-105 hover:bg-navy-800 md:flex"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* Sticky action bar, mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-900/95 px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur md:hidden">
        <div className="flex items-center gap-2 pb-1">
          <a
            href={`tel:${site.phoneTel}`}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-bold text-cream-100 transition active:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </a>
          <a
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-[1.4] items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-bold text-white shadow-lg shadow-whatsapp/25 transition active:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
