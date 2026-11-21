"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cityGoogleConfig,
  type CityKey,
} from "@/lib/site";
import { verifiedReviews } from "@/lib/verified-reviews";
import { useI18n } from "@/lib/i18n/context";
import { formatRating, tpl } from "@/lib/i18n/format";
import { GoogleIcon, Stars } from "./icons";

/**
 * Guest reviews section.
 *
 * The owner confirmed that Agadir and Marrakech share ONE Google Business
 * Profile, so both pages talk about that same profile and use the exact
 * same official Google links (defined once in src/lib/site.ts).
 *
 * Data priority, per destination:
 * - 1. LIVE: every displayed review, the rating and the review count come
 *   from the official Google Places API via /api/google-reviews when it
 *   answers with source "google-places-api". A response is never presented
 *   as Google data unless it genuinely came from Google.
 * - 2. VERIFIED (Agadir homepage only): while the live integration is not
 *   configured, the section shows the verified word for word copy of our
 *   real Google reviews from src/lib/verified-reviews.ts. Average rating
 *   and review count are always computed from that data, never hardcoded.
 *   The Marrakech page never uses the verified copy: it keeps showing an
 *   honest "Read our reviews on Google" link state instead.
 *
 * Integrity rules enforced here:
 *   - No review is ever invented, filtered to look better than it is, or
 *     replaced with placeholder content.
 *   - Review TEXTS are never translated: only the surrounding UI is
 *     localized (owner approved 2026-11-21).
 *   - Owner replies are never displayed.
 *   - Reviewer photos are never displayed.
 *   - Nothing is presented as Google data unless it genuinely came from
 *     Google (live API) or was copied word for word from our profile
 *     (verified file).
 */

interface DisplayReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsState {
  rating: number | null;
  reviewCount: number | null;
  reviews: DisplayReview[];
}

/* At most this many review cards are visible before the "See more reviews"
 * button reveals the rest. With 4 or fewer reviews the button never renders. */
const INITIAL_VISIBLE_CARDS = 4;

/* Localized relative review dates, same math as
 * src/lib/verified-reviews.ts. Non ISO strings (for example the relative
 * labels returned live by Google) pass through unchanged. */
function formatRelativeReviewDate(
  isoDate: string,
  dates: {
    today: string;
    yesterday: string;
    daysAgo: string;
    oneWeek: string;
    weeksAgo: string;
    oneMonth: string;
    monthsAgo: string;
    oneYear: string;
    yearsAgo: string;
  },
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return isoDate;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const reviewTime = Date.UTC(year, month - 1, day);
  const now = new Date();
  const todayTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.floor((todayTime - reviewTime) / 86_400_000);
  if (days <= 0) return dates.today;
  if (days === 1) return dates.yesterday;
  if (days < 7) return tpl(dates.daysAgo, { n: days });
  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? dates.oneWeek : tpl(dates.weeksAgo, { n: weeks });
  const months = Math.floor(days / 30);
  if (days < 365) return months === 1 ? dates.oneMonth : tpl(dates.monthsAgo, { n: months });
  const years = Math.floor(days / 365);
  return years === 1 ? dates.oneYear : tpl(dates.yearsAgo, { n: years });
}

/* Builds the display state from the verified word for word reviews.
 * Average and count are computed from the data at call time so they can
 * never drift from the array, and relative dates are computed at render
 * time so they never go stale. */
function buildVerifiedReviewsState(dateLabels: Parameters<typeof formatRelativeReviewDate>[1]): ReviewsState {
  const reviews = verifiedReviews.map((review) => ({
    name: review.author,
    rating: review.rating,
    text: review.text,
    date: formatRelativeReviewDate(review.date, dateLabels),
  }));
  return {
    rating:
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : null,
    reviewCount: reviews.length,
    reviews,
  };
}

export function Reviews({ city = "agadir" }: { city?: CityKey }) {
  const { dict, content } = useI18n();
  const t = dict.reviews;

  /* For Agadir the state starts from the verified reviews so real content
   * renders immediately (SSR included). For Marrakech it stays null until
   * live Google data arrives: no cards, only the honest Google links. */
  const [data, setData] = useState<ReviewsState | null>(() =>
    city === "agadir" ? buildVerifiedReviewsState(t.dates) : null,
  );
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    /* Every await in this chain is inside the try, so a rejection can never
     * escape unhandled: fetch, response.json() and the state update are all
     * guarded here. */
    async function loadLiveReviews() {
      try {
        const response = await fetch(`/api/google-reviews?city=${city}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = (await response.json()) as {
          source?: string;
          rating: number | null;
          reviewCount: number | null;
          reviews: DisplayReview[];
        };
        /* Never touch state after unmount or abort. */
        if (controller.signal.aborted) return;
        /* Live official Google data wins when it is genuinely available.
         * Anything else (unconfigured, error) keeps the current state. */
        if (
          payload.source === "google-places-api" &&
          Array.isArray(payload.reviews) &&
          payload.reviews.length > 0
        ) {
          setData({
            rating: payload.rating,
            reviewCount: payload.reviewCount,
            reviews: payload.reviews,
          });
        }
      } catch (error) {
        /* Unmount and city switches abort this fetch on purpose: that is not
         * an error, so it stays completely silent (no logging, no state). */
        const isAbort =
          controller.signal.aborted ||
          (typeof error === "object" &&
            error !== null &&
            (error as { name?: unknown }).name === "AbortError");
        if (isAbort) return;
        /* Network or API hiccup: keep showing the current honest state. */
      }
    }

    void loadLiveReviews();

    /* Abort with a named AbortError reason: aborting without one makes some
     * browsers report "signal is aborted without reason" as a runtime error. */
    return () => controller.abort(new DOMException("Component unmounted", "AbortError"));
  }, [city]);

  /* The single Google Business Profile shared by both destinations. */
  const google = cityGoogleConfig[city];
  const reviewHighlights = content.reviewHighlights;
  const sectionTitle = city === "agadir" ? t.titleAgadir : t.titleMarrakech;
  const hasReviews = data !== null && data.reviews.length > 0;
  const allReviews = hasReviews ? data.reviews : [];
  /* The "See more reviews" button exists only when there are MORE than the
   * initial number of visible cards. */
  const reviewsOverflow = allReviews.length > INITIAL_VISIBLE_CARDS;
  const visibleReviews = showAllReviews
    ? allReviews
    : allReviews.slice(0, INITIAL_VISIBLE_CARDS);
  const featured = visibleReviews[0] ?? null;
  const more = visibleReviews.slice(1);
  /* Adaptive grid so 1, 2, 3, 4 or more secondary cards never leave an
   * awkward empty gap or a single stretched card. */
  const moreGridClass =
    more.length === 1
      ? "mx-auto mt-6 grid max-w-2xl gap-6"
      : more.length === 3
        ? "mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-3"
        : "mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-2";

  /* Shared link styling for the whole clickable review cards. */
  const cardLinkClass =
    "group block rounded-2xl bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
  const viewHint = (
    <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-70 transition group-hover:opacity-100">
      {t.viewOnGoogle}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );

  return (
    <section id="reviews" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Stars className="text-gold-500" /> {t.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {sectionTitle}
          </h2>
          {data?.rating != null && (
            /* Rating badge: the whole badge opens our Google Business Profile. */
            <a
              href={google.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tpl(t.ratingBadgeAria, { rating: formatRating(data.rating, content.locale) })}
              className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <GoogleIcon className="h-6 w-6" />
              <span className="font-display text-3xl font-bold text-foreground">
                {formatRating(data.rating, content.locale)}
              </span>
              <Stars className="text-gold-500" />
              {data.reviewCount !== null ? (
                <span className="text-sm text-muted-foreground">
                  {tpl(t.googleReviewsCount, { n: data.reviewCount })}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">{t.onGoogleProfile}</span>
              )}
            </a>
          )}
          {/* Prominent call to action: opens Google's own review-writing
           * interface for our official profile in a new tab. Customers
           * publish directly on Google; there is no on-site review form.
           * Stays a standalone link, never nested inside a clickable card. */}
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-brand-500 px-7 py-3 font-display text-base font-bold text-white shadow-lg shadow-brand-900/25 hover:bg-brand-600"
            >
              <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                <GoogleIcon className="h-5 w-5" />
                {t.writeReview}
              </a>
            </Button>
          </div>
        </div>

        {featured ? (
          <>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Genuine customer review card. The whole card is one link to
               * our Google Business Profile (contains no nested links). */}
              <a
                href={google.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tpl(t.reviewCardAria, { name: featured.name })}
                className={cardLinkClass}
              >
                <figure className="flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Stars rating={featured.rating} className="text-gold-500" />
                    <GoogleIcon className="h-5 w-5" />
                  </div>
                  <blockquote className="mt-4 font-display text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
                    &ldquo;{featured.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-display text-lg font-bold text-brand-600">
                      {featured.name.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-foreground">{featured.name}</span>
                      <span suppressHydrationWarning className="block text-xs text-muted-foreground">{featured.date}</span>
                    </span>
                    {viewHint}
                  </figcaption>
                </figure>
              </a>

              {/* Rating summary and calls to action, stacked in the sidebar
               * column exactly like the original layout. */}
              <div className="flex flex-col gap-6">
                {/* Rating summary: the whole card is one link to our Google
                 * Business Profile (contains no nested links). */}
                {data?.rating != null && (
                  <a
                    href={google.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.profileAria}
                    className={`${cardLinkClass} p-6`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.summaryLabel}</p>
                    <div className="mt-4 flex items-end gap-3">
                      <span className="font-display text-5xl font-bold leading-none text-foreground">
                        {formatRating(data.rating, content.locale)}
                      </span>
                      <div className="pb-1">
                        <Stars className="text-gold-500" />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {data.reviewCount !== null
                            ? tpl(t.basedOnCount, { n: data.reviewCount })
                            : t.basedOnVerified}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                      {reviewHighlights.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 underline-offset-4 group-hover:underline">
                      {t.viewProfile}
                      <span aria-hidden="true">→</span>
                    </span>
                  </a>
                )}

                {/* Plain (non clickable) card: hosts the standalone
                 * "Write a Google Review" link, never nested in a link. */}
                <div className="rounded-2xl bg-navy-900 p-6 text-cream-100 shadow-sm">
                  <p className="font-display text-lg font-bold text-white">{t.flownWithUs}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">{t.reviewHelps}</p>
                  <Button
                    asChild
                    className="mt-4 w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                  >
                    <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                      <GoogleIcon className="h-4 w-4" />
                      {t.writeReview}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {more.length > 0 && (
              <div
                key={showAllReviews ? "all" : "initial"}
                className={`${moreGridClass} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {more.map((review, index) => (
                  <a
                    key={`${review.name}-${index}`}
                    href={google.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tpl(t.reviewCardAria, { name: review.name })}
                    className={cardLinkClass}
                  >
                    <figure className="flex h-full flex-col p-6">
                      <div className="flex items-center justify-between gap-4">
                        <Stars rating={review.rating} className="text-gold-500" />
                        <GoogleIcon className="h-5 w-5" />
                      </div>
                      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-display text-base font-bold text-brand-600">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-foreground">{review.name}</span>
                          <span suppressHydrationWarning className="block text-xs text-muted-foreground">{review.date}</span>
                        </span>
                        {viewHint}
                      </figcaption>
                    </figure>
                  </a>
                ))}
              </div>
            )}

            {/* Exists only with MORE than the initial number of cards; never
             * rendered with 4 or fewer. Reveals the rest inline, then flips
             * to "Show less". Stays a standalone button, never nested in a
             * clickable card. */}
            {reviewsOverflow && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAllReviews((value) => !value)}
                  aria-expanded={showAllReviews}
                  className="rounded-full border-brand-600/40 bg-white px-6 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50"
                >
                  {showAllReviews ? t.showLess : t.showMore}
                </Button>
              </div>
            )}

            {/* Google attribution and link to every review on Google. */}
            <div className="mt-6 text-center">
              <a
                href={google.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                {t.readAllOnGoogle}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          /* Honest state whenever no review data is available (loading,
           * integration not configured on Marrakech, or API failure with no
           * verified copy for this destination): no review cards, no
           * invented content, only the genuine Google links. */
          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
              <GoogleIcon className="mx-auto h-8 w-8" />
              <p className="mt-3 font-display text-lg font-bold text-foreground">{t.allOnGoogleTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.allOnGoogleText}</p>
              <Button
                asChild
                variant="outline"
                className="mt-4 w-full rounded-full border-brand-600/40 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50"
              >
                <a href={google.profileUrl} target="_blank" rel="noopener noreferrer">
                  <GoogleIcon className="h-4 w-4" />
                  {t.readOnGoogle}
                </a>
              </Button>
            </div>
            <div className="mt-6 rounded-2xl bg-navy-900 p-6 text-center text-cream-100 shadow-sm md:p-8">
              <p className="font-display text-lg font-bold text-white">{t.flownWithUs}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">{t.reviewHelps}</p>
              <Button
                asChild
                className="mt-4 w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                  <GoogleIcon className="h-4 w-4" />
                  {t.writeReview}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* Photo strip used between reviews and gallery for a travel brochure feel. */
export function ReviewsBanner() {
  const { dict } = useI18n();
  return (
    <section aria-hidden="true" className="relative overflow-hidden bg-cream-100 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative h-40 overflow-hidden rounded-2xl md:h-56">
          <Image
            src="/images/gallery-3.webp"
            alt={dict.reviews.bannerAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/25" />
        </div>
      </div>
    </section>
  );
}
