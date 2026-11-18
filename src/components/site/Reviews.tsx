"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  cityGoogleConfig,
  reviewHighlights,
  reviews as staticReviews,
  site,
  type CityKey,
} from "@/lib/site";
import { GoogleIcon, Stars } from "./icons";

/**
 * Guest reviews section, identical for both destinations.
 *
 * The owner confirmed that Agadir and Marrakech share ONE Google Business
 * Profile, so both pages render reviews of that same profile and both use
 * the exact same official Google links. No destination ever shows a
 * different Google profile.
 *
 * Data flow: the section renders the verified static profile data
 * immediately, then /api/google-reviews upgrades it to live Google Places
 * API data for the shared profile when the official integration is
 * configured. When the API reports the static fallback, the verified
 * static data stays. No review is ever invented, and owner replies are
 * never displayed anywhere.
 */

interface DisplayReview {
  name: string;
  rating: number;
  text: string;
  date: string;
  photo?: string;
}

interface ReviewsState {
  rating: number | null;
  reviewCount: number | null;
  reviews: DisplayReview[];
}

/* Verified static data of the single shared Google Business Profile: the
 * genuine published reviews, rendered instantly on both pages until the
 * live Places API integration takes over. */
const SHARED_STATIC_STATE: ReviewsState = {
  rating: site.googleRating,
  reviewCount: null,
  reviews: staticReviews.map((r) => ({ name: r.name, rating: 5, text: r.text, date: r.time })),
};

const SECTION_TITLE: Record<CityKey, string> = {
  agadir: "What Our Guests Say",
  marrakech: "What Our Marrakech Guests Say",
};

export function Reviews({ city = "agadir" }: { city?: CityKey }) {
  const [data, setData] = useState<ReviewsState>(SHARED_STATIC_STATE);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/google-reviews?city=${city}`, { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Bad response"))))
      .then((payload: { source?: string; rating: number | null; reviewCount: number | null; reviews: DisplayReview[] }) => {
        /* Only trust live official Google data; the static fallback is
         * already rendered and never overrides it with anything invented. */
        if (payload.source === "google-places-api" && Array.isArray(payload.reviews)) {
          setData({ rating: payload.rating, reviewCount: payload.reviewCount, reviews: payload.reviews });
        }
      })
      .catch(() => {
        /* Network or API hiccup: keep showing the verified static data. */
      });
    return () => controller.abort();
  }, [city]);

  /* The single Google Business Profile shared by both destinations. */
  const google = cityGoogleConfig[city];
  const featured = data.reviews[0] ?? null;
  const more = data.reviews.slice(1);

  return (
    <section id="reviews" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Stars className="text-gold-500" /> Guest Reviews
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            {SECTION_TITLE[city]}
          </h2>
          {data.rating !== null && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
              <GoogleIcon className="h-6 w-6" />
              <span className="font-display text-3xl font-bold text-foreground">
                {data.rating.toFixed(1)}
              </span>
              <Stars className="text-gold-500" />
              {data.reviewCount !== null ? (
                <span className="text-sm text-muted-foreground">{data.reviewCount} Google reviews</span>
              ) : (
                <span className="text-sm text-muted-foreground">on Google Business Profile</span>
              )}
            </div>
          )}
          {/* Prominent call to action: opens Google's own review-writing
           * interface for our official profile in a new tab. Customers
           * publish directly on Google; there is no on-site review form. */}
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-brand-500 px-7 py-3 font-display text-base font-bold text-white shadow-lg shadow-brand-900/25 hover:bg-brand-600"
            >
              <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                <GoogleIcon className="h-5 w-5" />
                Write a Google Review
              </a>
            </Button>
          </div>
        </div>

        {featured ? (
          <>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Genuine customer review card, straight from Google. */}
              <figure className="flex flex-col rounded-2xl bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <Stars rating={featured.rating} className="text-gold-500" />
                  <GoogleIcon className="h-5 w-5" />
                </div>
                <blockquote className="mt-4 font-display text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
                  &ldquo;{featured.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  {featured.photo ? (
                    <Image
                      src={featured.photo}
                      alt={`Google profile photo of ${featured.name}`}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 font-display text-lg font-bold text-brand-600">
                      {featured.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-bold text-foreground">{featured.name}</span>
                    <span className="block text-xs text-muted-foreground">{featured.date}</span>
                  </span>
                </figcaption>
              </figure>

              {/* Rating summary and calls to action */}
              <div className="flex flex-col gap-6">
                {data.rating !== null && (
                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Review summary</p>
                    <div className="mt-4 flex items-end gap-3">
                      <span className="font-display text-5xl font-bold leading-none text-foreground">
                        {data.rating.toFixed(1)}
                      </span>
                      <div className="pb-1">
                        <Stars className="text-gold-500" />
                        <p className="mt-1 text-xs text-muted-foreground">Based on verified Google reviews</p>
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
                    <a
                      href={google.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 underline-offset-4 hover:underline"
                    >
                      View our Google Business Profile
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}

                <div className="rounded-2xl bg-navy-900 p-6 text-cream-100 shadow-sm">
                  <p className="font-display text-lg font-bold text-white">Have you flown with us?</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">
                    Your review helps other travelers choose their sunrise adventure.
                  </p>
                  <Button
                    asChild
                    className="mt-4 w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                  >
                    <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                      <GoogleIcon className="h-4 w-4" />
                      Write a Google Review
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {more.length > 0 && (
              <div className="mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-2">
                {more.map((review) => (
                  <figure key={`${review.name}-${review.date}`} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <Stars rating={review.rating} className="text-gold-500" />
                      <GoogleIcon className="h-5 w-5" />
                    </div>
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                      {review.photo ? (
                        <Image
                          src={review.photo}
                          alt={`Google profile photo of ${review.name}`}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 font-display text-base font-bold text-brand-600">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <span>
                        <span className="block text-sm font-bold text-foreground">{review.name}</span>
                        <span className="block text-xs text-muted-foreground">{review.date}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Defensive fallback if Google ever reports no reviews for the
           * shared profile: show only the genuine call to action, never
           * invented reviews. */
          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-2xl bg-navy-900 p-6 text-center text-cream-100 shadow-sm md:p-8">
              <p className="font-display text-lg font-bold text-white">Have you flown with us?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">
                Your review helps other travelers choose their sunrise adventure.
              </p>
              <Button
                asChild
                className="mt-4 w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer">
                  <GoogleIcon className="h-4 w-4" />
                  Write a Google Review
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
  return (
    <section aria-hidden="true" className="relative overflow-hidden bg-cream-100 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative h-40 overflow-hidden rounded-2xl md:h-56">
          <Image
            src="/images/gallery-3.jpg"
            alt="Green and red hot air balloons inflating in the Moroccan desert at dawn"
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
