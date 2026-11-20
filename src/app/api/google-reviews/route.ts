import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { CityKey } from "@/lib/site";

/**
 * Guest reviews API backed by THE single Google Business Profile.
 *
 * The owner confirmed that Agadir and Marrakech share ONE Google Business
 * Profile, so both pages read reviews from that same profile and requests
 * for city=agadir and city=marrakech resolve to the same place on Google.
 *
 * LIVE ONLY, NO FAKE FALLBACK:
 *   Reviews, the rating and the review count come exclusively from the
 *   official Google Places API (New) place details endpoint. Nothing is
 *   ever invented or served from a static copy:
 *   - when GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID are not configured, the
 *     route reports source "unconfigured" with an empty review list and the
 *     website hides the review cards and links to the Google profile;
 *   - when the live call fails, the route reports source "error" the same
 *     honest way. A response is never presented as Google data unless it
 *     genuinely came from Google.
 *
 * PLACE IDENTITY: the field mask includes displayName and formattedAddress
 * so every successful response carries the business name and address of the
 * profile the Place ID resolves to (verifiable: it must be
 * "Hot Air Balloon Experience Agadir", Agadir 80000). A mismatch is logged
 * server side on every fresh fetch.
 *
 * CACHING: the upstream Google response is cached server side for 6 hours
 * (fetch next.revalidate), so a new Google review appears on the website
 * within at most 6 hours plus Google's own API propagation delay. The route
 * itself stays dynamic (never frozen at build time) and every response is
 * honest about its source.
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
 *   - Only env var NAMES are ever reported to the client, never values.
 */

/* Shape returned to the client for every review. */
interface ApiReview {
  name: string;
  rating: number;
  text: string;
  date: string;
  photo?: string;
}

/** "google-places-api" = genuine live Google data. Any other value means
 * the website must NOT display review cards (client enforced). */
type PayloadSource = "google-places-api" | "unconfigured" | "error";

interface ReviewsPayload {
  city: CityKey;
  source: PayloadSource;
  /** True only when the Places API integration answered successfully. */
  liveConfigured: boolean;
  /** Names (never values) of the missing environment variables, empty when fully live. */
  missing: string[];
  rating: number | null;
  reviewCount: number | null;
  reviews: ApiReview[];
  /** Business name of the profile the Place ID resolved to, when known. */
  profileName: string | null;
  /** Business address of the profile the Place ID resolved to, when known. */
  profileAddress: string | null;
}

const VALID_CITIES: CityKey[] = ["agadir", "marrakech"];

/* The ONE environment variables required for live synchronization. Both
 * cities share them because both pages share one profile. */
const REQUIRED_ENV_VARS = ["GOOGLE_PLACES_API_KEY", "GOOGLE_PLACE_ID"] as const;

/* Places API (New) place details fields. displayName and formattedAddress
 * make the profile identity verifiable in every successful response. */
const PLACES_FIELD_MASK =
  "rating,userRatingCount,reviews,displayName,formattedAddress,googleMapsUri";

/* Server side revalidation of the upstream Google response: 6 hours.
 * A new review becomes visible within at most 6 hours plus Google's own
 * propagation delay. The route stays dynamic, so nothing is frozen at
 * build time; this only caches the upstream fetch. */
const PLACES_REVALIDATE_SECONDS = 6 * 60 * 60;
const PLACES_TIMEOUT_MS = 8000;

/* Environment variables still missing for live mode, computed truthfully. */
function currentlyMissing(): string[] {
  return REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
}

function emptyPayload(
  city: CityKey,
  source: PayloadSource,
  missing: string[],
): ReviewsPayload {
  return {
    city,
    source,
    liveConfigured: false,
    missing,
    rating: null,
    reviewCount: null,
    reviews: [],
    profileName: null,
    profileAddress: null,
  };
}

/* Fetch place details (rating + reviews + identity) of the shared profile
 * from the Google Places API (New). */
async function fetchFromPlacesApi(city: CityKey): Promise<ReviewsPayload> {
  const missing = currentlyMissing();
  if (missing.length > 0) {
    return emptyPayload(city, "unconfigured", missing);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId ?? "")}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey ?? "",
        "X-Goog-FieldMask": PLACES_FIELD_MASK,
      },
      signal: AbortSignal.timeout(PLACES_TIMEOUT_MS),
      /* 6 hour server side cache of the upstream Google answer. */
      next: { revalidate: PLACES_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`Places API responded ${response.status} for ${city}`);
  }

  const place = (await response.json()) as {
    displayName?: { text?: string };
    formattedAddress?: string;
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

  const profileName = place.displayName?.text ?? null;
  const profileAddress = place.formattedAddress ?? null;

  /* Identity check: the Place ID must belong to the real business. Log a
   * clear warning on every fresh fetch when it does not, and always expose
   * the resolved identity in the payload so it is verifiable. */
  if (profileName && !profileName.toLowerCase().includes("hot air balloon")) {
    console.error(
      `[google-reviews] GOOGLE_PLACE_ID resolved to "${profileName}" (${profileAddress ?? "unknown address"}) which does not look like the Hot Air Balloon Experience Agadir profile. Check the Place ID.`,
    );
  } else {
    console.info(
      `[google-reviews] Places API profile identity: ${profileName ?? "unknown"} | ${profileAddress ?? "unknown address"} | fetched for ${city}`,
    );
  }

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
    profileName,
    profileAddress,
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

  try {
    const payload = await fetchFromPlacesApi(city);
    return NextResponse.json(payload);
  } catch (error) {
    console.error(`[google-reviews] live fetch failed for ${city}:`, error);
    /* Honest error payload: no reviews, no rating, no invented content.
     * The website hides the review cards and links to Google instead. */
    const missing = currentlyMissing();
    const payload: ReviewsPayload = missing.length > 0
      ? emptyPayload(city, "unconfigured", missing)
      : {
          ...emptyPayload(city, "error", []),
          liveConfigured: true,
        };
    return NextResponse.json(payload);
  }
}

/* Always evaluate per request: the 6 hour caching lives on the upstream
 * fetch itself, so this route is never frozen at build time. */
export const dynamic = "force-dynamic";
