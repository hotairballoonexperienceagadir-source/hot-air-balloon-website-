"use client";

/* Interactive gallery grid used by the Agadir homepage and the Marrakech page.

   The grid renders the destination's OWN gallery collection passed via the
   items prop: the Agadir homepage uses galleryItems (src/lib/gallery.ts) and
   the Marrakech page uses marrakechGalleryItems
   (src/lib/marrakech-gallery.ts). The two collections are never mixed.

   Shows the first 8 photos initially (4 columns x 2 rows on desktop,
   2 columns x 4 rows on mobile) and a centered "Voir plus" button below
   the grid. Expanding reveals every remaining photo in the same grid and
   in the original order, without any page reload or redirect, and swaps
   the button to "Voir moins" to return to the initial 8 photo display.

   Every tile still opens the Google Business Profile in a new tab. */

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_BUSINESS_PROFILE_URL, galleryItems, type GalleryItem } from "@/lib/gallery";

/* Number of photos displayed before the visitor expands the gallery. */
const INITIAL_VISIBLE_COUNT = 8;

/* items defaults to the Agadir gallery so the Agadir homepage keeps its
 * exact previous behavior; the Marrakech page passes its own collection. */
export function GalleryGrid({ items = galleryItems }: { items?: GalleryItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > INITIAL_VISIBLE_COUNT;
  const visibleItems = expanded
    ? items
    : items.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <>
      <div id="gallery-grid" className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {visibleItems.map((item) => (
          <a
            key={item.src}
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.caption ?? item.alt ?? "Gallery media"}: see more photos and videos on our Google Business Profile (opens in a new tab)`}
            className="group relative block overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <Image
              src={item.type === "video" ? (item.poster ?? item.src) : item.src}
              alt={item.alt ?? (item.type === "video" ? "Gallery video clip" : "Gallery photo")}
              width={item.width ?? 1200}
              height={item.height ?? 800}
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 25vw"
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition duration-300 group-hover:scale-110 md:h-14 md:w-14">
                  <Play className="ml-0.5 h-5 w-5 fill-brand-600 text-brand-600 md:h-6 md:w-6" />
                </span>
              </span>
            )}
            {item.caption && (
              <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/70 px-3 py-1 text-[11px] font-semibold text-cream-100 opacity-0 backdrop-blur transition group-hover:opacity-100">
                {item.caption}
              </span>
            )}
            <span
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls="gallery-grid"
            className="h-auto rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-900/40 hover:bg-brand-600"
          >
            {expanded ? (
              <ChevronUp className="size-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="size-5" aria-hidden="true" />
            )}
            {expanded ? "Voir moins" : "Voir plus"}
          </Button>
        </div>
      )}
    </>
  );
}
