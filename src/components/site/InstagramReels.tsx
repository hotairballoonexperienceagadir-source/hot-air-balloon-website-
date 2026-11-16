"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { instagramHandle, instagramProfileUrl } from "@/lib/site";
import { InstagramIcon } from "./icons";
import type { InstagramReel, ReelsServiceState } from "@/lib/instagram/reels-service";

/**
 * LIVE Instagram Reels showcase. Agadir homepage ONLY: never render this
 * component on the Marrakech page.
 *
 * LIVE DATA POLICY: the cards are fed by /api/instagram/reels, which returns
 * the real TOP 4 reels of the official @hotairballoon_experience account,
 * ranked by verified view count from the Instagram Graph API insights.
 * While the API is not configured, or before the first successful sync,
 * this section renders NOTHING instead of placeholder cards, so visitors
 * never see fake thumbnails, fake view counts or fake links.
 */
type ReelsPayload = Pick<ReelsServiceState, "status" | "reels" | "updatedAt">;

function formatViewCount(views: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(views);
}

function formatSyncDate(iso: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(iso));
}

export function InstagramReels() {
  const [reels, setReels] = useState<InstagramReel[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram/reels")
      .then((response) => response.json())
      .then((payload: ReelsPayload) => {
        if (cancelled) return;
        if (payload?.status === "ok" && Array.isArray(payload.reels) && payload.reels.length > 0) {
          setReels(payload.reels.slice(0, 4));
          setUpdatedAt(payload.updatedAt ?? null);
        }
      })
      .catch(() => {
        /* Without configured API access the section stays hidden by design. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!reels) return null;

  return (
    <section id="instagram" className="bg-white py-16 md:py-24" aria-labelledby="instagram-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200">
            <InstagramIcon className="h-4 w-4" aria-hidden="true" /> Follow Us
          </span>
          <h2
            id="instagram-title"
            className="mt-5 font-display text-3xl font-bold text-navy-900 text-balance md:text-5xl"
          >
            Follow Our Journey on Instagram
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Real moments from real flights over the Souss Valley. These are the four most watched
            reels from our official account, synced automatically from Instagram every 6 hours.
          </p>
        </div>

        {/* Desktop: exactly 4 reels in one row. Mobile: swipe carousel. */}
        <ul className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-12 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible md:gap-6">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-8 py-4 text-sm font-medium tracking-wide text-white shadow-xl shadow-brand-900/25 transition hover:bg-brand-600 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            aria-label={`Open our Instagram profile ${instagramHandle}, opens in a new tab`}
          >
            <InstagramIcon className="h-5 w-5" aria-hidden="true" />
            {instagramHandle}
          </a>
          {updatedAt && (
            <p className="text-xs text-muted-foreground">
              Live from Instagram, last synced {formatSyncDate(updatedAt)} and refreshed
              automatically every 6 hours.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel }: { reel: InstagramReel }) {
  const label = "Watch this reel on Instagram, opens in a new tab";
  const alt =
    reel.caption?.trim() ||
    "Thumbnail of one of our most watched Instagram reels from a hot air balloon flight over Agadir";
  return (
    <li className="w-[72%] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink">
      <a
        href={reel.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-navy-900 shadow-md shadow-navy-950/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {reel.thumbnailUrl ? (
          /* Plain img on purpose: Instagram CDN thumbnails are signed URLs that
             expire, so they must bypass the Next.js image optimizer cache. */
          <img
            src={reel.thumbnailUrl}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : reel.mediaUrl ? (
          <video
            src={reel.mediaUrl}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : null}

        <span
          className="absolute inset-0 bg-navy-950/0 transition duration-300 group-hover:bg-navy-950/25"
          aria-hidden="true"
        />

        {/* Centered Instagram glyph overlay on every thumbnail. */}
        <span className="absolute inset-0 flex items-center justify-center">
          <InstagramIcon
            className="h-9 w-9 text-white/90 drop-shadow-[0_2px_10px_rgba(6,16,28,0.55)] transition duration-300 group-hover:scale-110 group-hover:text-white"
            aria-hidden="true"
          />
        </span>

        {/* Verified view count straight from the Instagram insights API. */}
        {typeof reel.views === "number" && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Play className="h-3 w-3 fill-current" aria-hidden="true" />
            {formatViewCount(reel.views)} views
          </span>
        )}

        {/* Orange brand ring on hover. */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-transparent transition duration-300 group-hover:ring-brand-500"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
