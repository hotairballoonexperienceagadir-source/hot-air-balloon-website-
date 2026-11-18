import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { reviews, site, type CityKey } from "@/lib/site";

/**
 * Guest reviews API backed by THE single Google Business Profile.
 *
 * The owner confirmed that Agadir and Marrakech share ONE Google Business
 * Profile, so both pages read reviews from that same profile and requests
 * for city=agadir and city=marrakech resolve to the same place on Google.
 *
 * LIVE MODE (official Google integration):
 *   When GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are configured in .env,
 *   reviews are fetched from the official Google Places API (New) place
 *   details endpoint with the server side API key, then cached in local
 *   memory. A review published on Google therefore appears on BOTH pages
 *   within the cache lifetime (3 hours) or immediately after a restart.
 *
 * FALLBACK MODE (current state, no credentials configured yet):
 *   The route returns the verified static data of the same profile. Every
 *   response declares its source ("static-fallback") so nobody can mistake
 *   the fallback for live Google synchronization, and "missing" names the
 *   exact environment variables still required.
 *
 * Integrity rules enforced here:
 *   - Reviews are only ever READ from Google. Nothing is ever published
 *     programmatically on behalf of a customer; publishing happens on
 *     Google's own review interface opened by the "Write a Google Review"
 *     button.
 *   - No review is invented, filtered to look better than it is, or
 *     replaced with placeholder content.
 *   - Owner replies are never part of the payload. The Places API review
 *     resource contains customer reviews only and no owner response is
 *     ever synthesized or displayed.
 */

/* Shape returned to the client for every review. */
interface ApiReview {
  name: string;
  rating: number;
  text: string;
  date: string;
  photo?: string;
}

interface ReviewsPayload {
  city: CityKey;
  /** "google-places-api" = live official Google data, "static-fallback" = verified static data. */
  source: "google-places-api" | "static-fallback";
  /** True when the Places API integration is fully configured and answered. */
  liveConfigured: boolean;
  /** Names of the missing environment variables (or the live error), empty when fully live. */
  missing: string[];
  rating: number | null;
  reviewCount: number | null;
  reviews: ApiReview[];
}

const VALID_CITIES: CityKey[] = ["agadir", "marrakech"];

/* The ONE environment variables required for live synchronization. Both
 * cities share them because both pages share one profile. */
const REQUIRED_ENV_VARS = ["GOOGLE_PLACES_API_KEY", "GOOGLE_PLACE_ID"] as const;

/* Local memory cache (per project stack policy, no external middleware). */
const CACHE_TTL_MS = 3 * 60 * 60 * 1000; /* 3 hours. */
const cache = new Map<string, { expiresAt: number; payload: ReviewsPayload }>();

/* Static fallback: the genuine review already verified from the single
 * Google Business Profile. Because one profile serves both destinations,
 * the same verified data honestly serves both cities instead of inventing
 * a separate Marrakech review. */
const STATIC_REVIEWS: ApiReview[] = reviews.map((r) => ({
  name: r.name,
  rating: 5,
  text: r.text,
  date: r.time,
}));

function staticPayload(city: CityKey, missing: string[]): ReviewsPayload {
  return {
    city,
    source: "static-fallback",
    liveConfigured: false,
    missing,
    rating: site.googleRating,
    reviewCount: null,
    reviews: STATIC_REVIEWS,
  };
}

/* Environment variables still missing for live mode, computed truthfully. */
function currentlyMissing(): string[] {
  return REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
}

/* Fetch place details (rating + reviews) of the shared profile from the
 * Google Places API (New). */
async function fetchFromPlacesApi(city: CityKey): Promise<ReviewsPayload> {
  const missing = currentlyMissing();
  if (missing.length > 0) {
    return staticPayload(city, missing);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId ?? "")}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey ?? "",
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Places API responded ${response.status} for ${city}`);
  }

  const place = (await response.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      relativePublishTimeDescription?: string;
      text?: { text?: string };
      originalText?: { text?: string };
      authorAttribution?: { displayName?: string; photoUri?: string };
    }>;
  };

  const normalized: ApiReview[] = (place.reviews ?? [])
    .filter((r) => r.text?.text && r.authorAttribution?.displayName)
    .map((r) => ({
      name: r.authorAttribution?.displayName ?? "",
      rating: typeof r.rating === "number" ? r.rating : 5,
      text: r.text?.text ?? "",
      date: r.relativePublishTimeDescription ?? "",
      photo: r.authorAttribution?.photoUri || undefined,
    }));

  return {
    city,
    source: "google-places-api",
    liveConfigured: true,
    missing: [],
    rating: typeof place.rating === "number" ? place.rating : null,
    reviewCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
    reviews: normalized,
  };
}

export async function GET(request: NextRequest) {
  const cityParam = request.nextUrl.searchParams.get("city") ?? "";
  if (!VALID_CITIES.includes(cityParam as CityKey)) {
    return NextResponse.json(
      { message: "Unknown city, use city=agadir or city=marrakech." },
      { status: 400 },
    );
  }
  const city = cityParam as CityKey;

  const cached = cache.get(city);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.payload);
  }

  let payload: ReviewsPayload;
  try {
    payload = await fetchFromPlacesApi(city);
  } catch (error) {
    console.error(`[google-reviews] live fetch failed for ${city}:`, error);
    /* Report truthfully what is missing: either the environment variables
     * themselves or, when they exist, a live API failure to investigate. */
    const missing = currentlyMissing();
    payload = staticPayload(
      city,
      missing.length > 0
        ? missing
        : ["GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set but the live Places API call failed, check the server logs"],
    );
  }

  cache.set(city, { expiresAt: Date.now() + CACHE_TTL_MS, payload });
  return NextResponse.json(payload);
}

/* Always evaluate: the cache itself decides freshness. */
export const dynamic = "force-dynamic";
