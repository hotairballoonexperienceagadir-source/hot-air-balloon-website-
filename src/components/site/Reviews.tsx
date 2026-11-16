import Image from "next/image";
import { Button } from "@/components/ui/button";
import { reviews, site } from "@/lib/site";
import { GoogleIcon, Stars } from "./icons";

/**
 * Guest reviews. The 5.0 rating and the Google profile link are the real ones
 * from the Hot Air Balloon Experience Agadir business profile.
 * The individual quotes are editable placeholders in src/lib/site.ts.
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Stars className="text-gold-500" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 font-display text-base font-bold text-brand-600">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-foreground">{review.name}</span>
                  <span className="block text-xs text-muted-foreground">{review.country}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-brand-500 px-6 py-3 font-bold text-brand-700 hover:bg-brand-500 hover:text-white"
          >
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <GoogleIcon className="h-4 w-4" />
              Read All Reviews on Google
            </a>
          </Button>
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
