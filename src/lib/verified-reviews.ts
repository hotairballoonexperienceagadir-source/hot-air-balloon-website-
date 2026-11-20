/* Real reviews copied word-for-word from our Google Business Profile. Never add, invent, or edit reviews. To add a new review, add one entry to this array (newest first). */

/*
 * Integrity rules for this file:
 *   - Every entry must be a real customer review copied word for word
 *     from our Google Business Profile (text, star rating, author name
 *     and posting date). Nothing is paraphrased, translated, shortened
 *     or improved.
 *   - Owner replies are never stored and never displayed anywhere.
 *   - The average rating and the review count shown on the website are
 *     always computed from this array, never hardcoded elsewhere.
 *   - The official Google links live exactly once in src/lib/site.ts
 *     (GOOGLE_PROFILE_URL and GOOGLE_REVIEW_URL); do not add URLs here.
 */

export interface VerifiedReview {
  author: string;
  rating: number;
  text: string;
  /* ISO calendar date of the review, format "YYYY-MM-DD". */
  date: string;
  source: "google";
}

export const verifiedReviews: VerifiedReview[] = [
  {
    author: "Mohamed Ouhammi",
    rating: 5,
    text: "Absolutely unforgettable! From the friendly welcome to the amazing balloon flight, everything was wonderful. The views were stunning and the team was fantastic. A must-do activity when visiting Agadir!",
    date: "2026-11-19",
    source: "google",
  },
  {
    author: "wai mei poon",
    rating: 5,
    text: "Amazing air balloon ride over Agadir with sunrise view! Professional pilot and take us for a safe flight! Also it serves us a Great breakfast!!",
    date: "2026-10-30",
    source: "google",
  },
];

/* Converts an ISO "YYYY-MM-DD" review date into a human readable
 * relative label ("3 weeks ago") computed from the current date, so the
 * labels never go stale. Strings that are not ISO dates (for example
 * the relative labels returned by the live Google API) pass through
 * unchanged. */
export function formatRelativeReviewDate(isoDate: string): string {
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
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (days < 365) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
