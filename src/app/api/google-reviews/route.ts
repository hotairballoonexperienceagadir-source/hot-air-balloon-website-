import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { reviews, site, type CityKey } from "@/lib/site";

/**
 * Guest reviews API with strict per-destination separation.
 *
 * LIVE MODE (official Google integration):
 *   When GOOGLE_PLACES_API_KEY and the destination place ID
 *   (GOOGLE_PLACE_ID_AGADIR / GOOGLE_PLACE_ID_MARRAKECH) are configured in
 *   .env, reviews are fetched from the official Google Places API (New)
 *   place details endpoint with the server side API key, then cached in
 *   local memory. Newly published Google reviews therefore appear on the
 *   website within the cache lifetime (or immediately after a restart).
 *
 * FALLBACK MODE (current state, no credentials configured yet):
 *   The route returns the static review already verified from the Agadir
 *   Google Business Profile. For Marrakech, whose Google links and data are
 *   not configured yet, it returns an empty review list instead of inventing
 *   content. Every response declares its source so nobody can mistake the
 *   fallback for live Google synchronization.
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
  /** True when the Places API integration is fully configured for this city. */
  liveConfigured: boolean;
  /** Names of the missing environment variables, empty when fully configured. */
  missing: string[];
  rating: number | null;
  reviewCount: number | null;
  reviews: ApiReview[];
}

const VALID_CITIES: CityKey[] = ["agadir", "marrakech"];

/* Local memory cache (per project stack policy, no external middleware). */
const CACHE_TTL_MS = 3 * 60 * 60 * 1000; /* 3 hours. */
const cache = new Map<string, { expiresAt: number; payload: ReviewsPayload }>();

const PLACE_ID_ENV: Record<CityKey, string> = {
  agadir: "GOOGLE_PLACE_ID_AGADIR",
  marrakech: "GOOGLE_PLACE_ID_MARRAKECH",
};

/* Static fallback: the genuine review already verified from the Agadir
 * profile. Marrakech has no verified static review yet, so it stays empty
 * instead of inventing one. */
const STATIC_RATING: Record<CityKey, number | null> = {
  agadir: site.googleRating,
  marrakech: null,
};

const STATIC_REVIEWS: Record<CityKey, ApiReview[]> = {
  agadir: reviews.map((r) => ({ name: r.name, rating: 5, text: r.text, date: r.time })),
  marrakech: [],
};

function staticPayload(city: CityKey, missing: string[]): ReviewsPayload {
  return {
    city,
    source: "static-fallback",
    liveConfigured: false,
    missing,
    rating: STATIC_RATING[city],
    reviewCount: null,
    reviews: STATIC_REVIEWS[city],
  };
}

/* Fetch place details (rating + reviews) from the Google Places API (New). */
async function fetchFromPlacesApi(city: CityKey): Promise<ReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env[PLACE_ID_ENV[city]];

  if (!apiKey || !placeId) {
    const missing: string[] = [];
    if (!apiKey) missing.push("GOOGLE_PLACES_API_KEY");
    if (!placeId) missing.push(PLACE_ID_ENV[city]);
    return staticPayload(city, missing);
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
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
    payload = staticPayload(city, [PLACE_ID_ENV[city], "GOOGLE_PLACES_API_KEY"]);
  }

  cache.set(city, { expiresAt: Date.now() + CACHE_TTL_MS, payload });
  return NextResponse.json(payload);
}

/* Always evaluate: the cache itself decides freshness. */
export const dynamic = "force-dynamic";
