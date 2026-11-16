import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ownerReply, reviews, site } from "@/lib/site";
import { GoogleIcon, Stars } from "./icons";

/**
 * Guest reviews section. The 5.0 rating, the review text, the reviewer name
 * and the owner reply below are real, taken from the Google Business Profile
 * of Hot Air Balloon Experience Agadir (link points to the live profile).
 */
export function Reviews() {
  return (
    <section id="reviews" className="bg-cream-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Stars className="text-gold-500" /> Guest Reviews
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground text-balance md:text-4xl">
            What Our Guests Say
          </h2>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
            <GoogleIcon className="h-6 w-6" />
            <span className="font-display text-3xl font-bold text-foreground">{site.googleRating.toFixed(1)}</span>
            <Stars className="text-gold-500" />
            <span className="text-sm text-muted-foreground">on Google Business Profile</span>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Real review card */}
          <figure className="flex flex-col rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <Stars className="text-gold-500" />
              <GoogleIcon className="h-5 w-5" />
            </div>
            <blockquote className="mt-4 font-display text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
              &ldquo;{reviews[0].text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 font-display text-lg font-bold text-brand-600">
                {reviews[0].name.charAt(0).toUpperCase()}
              </span>
              <span>
                <span className="block text-sm font-bold text-foreground">{reviews[0].name}</span>
                <span className="block text-xs text-muted-foreground">
                  {reviews[0].meta} · {reviews[0].time}
                </span>
              </span>
            </figcaption>

            {/* Real reply from the owner, shown on Google */}
            <div className="mt-5 rounded-xl bg-cream-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Response from the owner</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{ownerReply}</p>
            </div>
          </figure>

          {/* Rating breakdown and calls to action */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Review summary</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-5xl font-bold leading-none text-foreground">
                  {site.googleRating.toFixed(1)}
                </span>
                <div className="pb-1">
                  <Stars className="text-gold-500" />
                  <p className="mt-1 text-xs text-muted-foreground">Based on verified Google reviews</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                {[
                  "Professional licensed pilot",
                  "Safe and smooth sunrise flight",
                  "Great breakfast after landing",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Highlights taken from real guest feedback on our Google profile.
              </p>
            </div>

            <div className="rounded-2xl bg-navy-900 p-6 text-cream-100 shadow-sm">
              <p className="font-display text-lg font-bold text-white">Have you flown with us?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">
                Your review helps other travelers choose their sunrise adventure.
              </p>
              <Button
                asChild
                className="mt-4 w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
                  <GoogleIcon className="h-4 w-4" />
                  Read and Write Reviews
                </a>
              </Button>
            </div>
          </div>
        </div>
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
