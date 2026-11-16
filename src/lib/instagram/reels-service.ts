/**
 * LIVE Instagram Reels service. SERVER SIDE ONLY: this module holds the
 * access token flow and must never be imported from a client component.
 * The frontend talks to /api/instagram/reels instead.
 *
 * What it does, fully automatically:
 *   1. Connects to the official Instagram Graph API with a server side
 *      access token (never exposed to the browser).
 *   2. Loads all published Reels of the connected professional account.
 *   3. Reads the verified play count of every Reel from the insights API.
 *   4. Sorts the Reels by view count, highest first, and keeps the TOP 4.
 *   5. Caches the result in memory and refreshes it every 6 hours (with a
 *      stale while revalidate guard so visitors never wait and Instagram is
 *      never called on every request).
 *
 * Publish a new Reel that outperforms one of the current four? The next
 * sync replaces the lowest performing Reel automatically. No manual URL
 * editing, ever.
 *
 * REAL CONTENT POLICY: nothing here invents data. If the API is not
 * configured, if the token is missing permissions or if the sync fails,
 * the service reports a precise diagnostic and the showcase renders
 * nothing instead of placeholder cards.
 *
 * Required setup (environment variables on the server):
 *   INSTAGRAM_ACCESS_TOKEN   (required) Long lived access token.
 *       - Instagram Login token (starts with "IG"): app scopes
 *         instagram_business_basic + instagram_business_manage_insights.
 *       - Facebook Login token: Instagram account linked to a Facebook
 *         Page, app permissions instagram_basic, pages_show_list,
 *         pages_read_engagement + instagram_manage_insights.
 *   INSTAGRAM_USER_ID        (optional) Numeric Instagram account id.
 *       Auto discovered from the token when omitted.
 *   INSTAGRAM_GRAPH_VERSION  (optional) Graph API version, default v21.0.
 *   INSTAGRAM_API_BASE       (optional) Override of graph.instagram.com or
 *       graph.facebook.com. Auto detected from the token shape otherwise.
 *   INSTAGRAM_CACHE_TTL_HOURS (optional) Sync interval, default 6 hours.
 */

export type InstagramReel = {
  id: string;
  permalink: string;
  thumbnailUrl: string | null;
  mediaUrl: string | null;
  /* Verified play count from the Instagram insights API, null when the
     count could not be read for this specific media. */
  views: number | null;
  publishedAt: string | null;
  caption: string | null;
};

export type InstagramAccountInfo = {
  username: string | null;
  accountType: string | null;
  followers: number | null;
};

export type ReelsServiceStatus =
  | "ok"
  | "unconfigured"
  | "error"
  | "insufficient_permissions";

export type ReelsServiceState = {
  status: ReelsServiceStatus;
  message: string | null;
  reels: InstagramReel[];
  /* ISO timestamp of the last successful Instagram sync. */
  updatedAt: string | null;
  account: InstagramAccountInfo | null;
  totalReels: number | null;
  /* Environment variables that are missing (status unconfigured). */
  missing: string[];
  /* Human readable setup requirements, included when the status is not ok. */
  requirements: string[];
  lastError: string | null;
};

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

type InstagramConfig = {
  token: string;
  version: string;
  base: string;
  usesInstagramLogin: boolean;
  explicitUserId: string;
  ttlHours: number;
};

function getConfig(): InstagramConfig {
  const token = (process.env.INSTAGRAM_ACCESS_TOKEN ?? "").trim();
  const version = (process.env.INSTAGRAM_GRAPH_VERSION ?? "v21.0").trim() || "v21.0";
  const base =
    (process.env.INSTAGRAM_API_BASE ?? "").trim() ||
    (token.startsWith("IG") ? "https://graph.instagram.com" : "https://graph.facebook.com");
  const rawTtl = Number((process.env.INSTAGRAM_CACHE_TTL_HOURS ?? "").trim());
  return {
    token,
    version,
    base,
    usesInstagramLogin: base.includes("graph.instagram.com"),
    explicitUserId: (process.env.INSTAGRAM_USER_ID ?? "").trim(),
    ttlHours: Number.isFinite(rawTtl) && rawTtl > 0 ? rawTtl : 6,
  };
}

const SETUP_REQUIREMENTS = [
  "An Instagram Professional account (Business or Creator).",
  "A long lived access token stored in the INSTAGRAM_ACCESS_TOKEN environment variable on the server.",
  "For Instagram Login tokens (they start with IG): the app needs the instagram_business_basic and instagram_business_manage_insights scopes.",
  "For Facebook Login tokens: the Instagram account must be linked to a Facebook Page and the app needs instagram_basic, pages_show_list, pages_read_engagement and instagram_manage_insights permissions.",
];

/* ------------------------------------------------------------------ */
/* Graph API helpers                                                   */
/* ------------------------------------------------------------------ */

type GraphError = Error & { code?: number };

function graphUrl(path: string, params: Record<string, string>): URL {
  const { token, version, base } = getConfig();
  const url = new URL(`${base}/${version}/${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set("access_token", token);
  return url;
}

async function graphGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(graphUrl(path, params), {
      signal: controller.signal,
      cache: "no-store",
    });
    const raw: unknown = await response.json().catch(() => null);
    const payload = raw as { error?: { code?: number; message?: string } } | null;
    if (!response.ok || !payload || payload.error) {
      const error = new Error(
        payload?.error?.message ??
          `Instagram Graph API request failed with HTTP status ${response.status}`,
      ) as GraphError;
      error.code = payload?.error?.code;
      throw error;
    }
    return payload as T;
  } finally {
    clearTimeout(timeout);
  }
}

type FailureKind = "token_invalid" | "permission" | "rate_limit" | "unknown";

function classifyFailure(error: unknown): FailureKind {
  const code = (error as GraphError | null)?.code;
  if (code === 190) return "token_invalid";
  if (code === 10 || code === 102 || code === 200) return "permission";
  if (code === 4 || code === 17 || code === 32) return "rate_limit";
  return "unknown";
}

function permissionMessage(error: unknown): string {
  const raw =
    (error as Error | null)?.message ??
    "Instagram rejected the request because of missing permissions.";
  return `${raw} Required setup: an Instagram Professional account (Business or Creator) plus instagram_basic, pages_show_list, pages_read_engagement and instagram_manage_insights permissions for Facebook Login tokens, or instagram_business_basic and instagram_business_manage_insights scopes for Instagram Login tokens.`;
}

const INSIGHTS_PERMISSION_MESSAGE =
  "View counts are not accessible with the current token. Add the instagram_manage_insights permission (Facebook Login tokens) or the instagram_business_manage_insights scope (Instagram Login tokens), then generate a new long lived token. The showcase only displays reels with verified view counts.";

/* ------------------------------------------------------------------ */
/* Account resolution                                                  */
/* ------------------------------------------------------------------ */

type ResolvedAccount = { igUserId: string; account: InstagramAccountInfo };

const IG_LOGIN_FIELD_SETS = [
  "user_id,username,account_type,followers_count",
  "user_id,username,account_type",
  "user_id,username",
];

const IG_USER_FIELD_SETS = ["id,username,followers_count", "id,username", "id"];

function readAccount(payload: Record<string, unknown>): InstagramAccountInfo {
  return {
    username: typeof payload.username === "string" ? payload.username : null,
    accountType: typeof payload.account_type === "string" ? payload.account_type : null,
    followers:
      typeof payload.followers_count === "number" && Number.isFinite(payload.followers_count)
        ? payload.followers_count
        : null,
  };
}

/* Instagram API with Instagram Login: /me IS the Instagram account and
   /me/media lists its media, no page linking needed. */
async function resolveInstagramLoginAccount(): Promise<ResolvedAccount> {
  let lastError: unknown = null;
  for (const fields of IG_LOGIN_FIELD_SETS) {
    try {
      const me = await graphGet<Record<string, unknown>>("me", { fields });
      return { igUserId: String(me.user_id ?? me.id ?? "me"), account: readAccount(me) };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Could not validate the Instagram access token.");
}

/* Instagram API with Facebook Login: the Instagram account is reached
   through the linked Facebook Page (or an explicit INSTAGRAM_USER_ID). */
async function resolveFacebookLoginAccount(): Promise<ResolvedAccount> {
  const { explicitUserId } = getConfig();

  let lastError: unknown = null;

  if (explicitUserId) {
    for (const fields of IG_USER_FIELD_SETS) {
      try {
        const user = await graphGet<Record<string, unknown>>(explicitUserId, { fields });
        return { igUserId: String(user.id), account: readAccount(user) };
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError ?? new Error("Could not read the configured Instagram account.");
  }

  try {
    const me = await graphGet<{ instagram_business_account?: { id: string } }>("me", {
      fields: "id,instagram_business_account",
    });
    if (me.instagram_business_account?.id) {
      return {
        igUserId: String(me.instagram_business_account.id),
        account: { username: null, accountType: null, followers: null },
      };
    }
  } catch (error) {
    lastError = error;
  }

  const pages = await graphGet<{
    data?: Array<{ instagram_business_account?: { id: string } }>;
  }>("me/accounts", { fields: "id,instagram_business_account" });
  const match = (pages.data ?? []).find((page) => page.instagram_business_account?.id);
  if (!match) {
    const error = new Error(
      "No Instagram professional account is reachable with this token. Link the Instagram account to a Facebook Page and grant pages_show_list, or set the INSTAGRAM_USER_ID environment variable.",
    ) as GraphError;
    error.code = 200;
    throw error;
  }
  return {
    igUserId: String(match.instagram_business_account!.id),
    account: { username: null, accountType: null, followers: null },
  };
}

/* Best effort profile enrichment after the account id is known. */
async function fetchIgUserProfile(igUserId: string): Promise<InstagramAccountInfo> {
  for (const fields of IG_USER_FIELD_SETS) {
    try {
      const user = await graphGet<Record<string, unknown>>(igUserId, { fields });
      return readAccount(user);
    } catch {
      /* Try the next, smaller field set. */
    }
  }
  return { username: null, accountType: null, followers: null };
}

/* ------------------------------------------------------------------ */
/* Media + insights                                                    */
/* ------------------------------------------------------------------ */

type MediaEdgeItem = {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

type MediaEdgeResponse = {
  data?: MediaEdgeItem[];
  paging?: { cursors?: { after?: string } };
};

const MEDIA_FIELD_SETS = [
  "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
];

const MEDIA_PAGE_SIZE = 50;
const MAX_MEDIA_PAGES = 5;
/* Bound the insights workload: the newest 120 reels are ranked, older ones
   keep a null view count and sort last. */
const MAX_REELS_FOR_INSIGHTS = 120;
const INSIGHTS_CONCURRENCY = 8;

function isReelMedia(item: MediaEdgeItem): boolean {
  if (item.media_type !== "VIDEO") return false;
  const product = item.media_product_type;
  /* When the product type is unavailable every video counts as a reel,
     stories and ads can never appear because they need the type field. */
  if (!product) return true;
  return product === "REELS";
}

async function fetchReelMedia(igUserId: string): Promise<MediaEdgeItem[]> {
  let lastError: unknown = null;
  for (const fields of MEDIA_FIELD_SETS) {
    try {
      const collected: MediaEdgeItem[] = [];
      let after: string | undefined;
      for (let page = 0; page < MAX_MEDIA_PAGES; page += 1) {
        const params: Record<string, string> = { fields, limit: String(MEDIA_PAGE_SIZE) };
        if (after) params.after = after;
        const response = await graphGet<MediaEdgeResponse>(`${igUserId}/media`, params);
        const items = response.data ?? [];
        collected.push(...items.filter(isReelMedia));
        after = response.paging?.cursors?.after;
        if (!after || items.length === 0) break;
      }
      return collected;
    } catch (error) {
      lastError = error;
      /* Token and permission problems never get better with fewer fields. */
      if (classifyFailure(error) !== "unknown") throw error;
    }
  }
  throw lastError ?? new Error("Could not load the media list from Instagram.");
}

type InsightsResponse = {
  data?: Array<{
    name?: string;
    values?: Array<{ value?: number }>;
    total_value?: { value?: number };
  }>;
};

async function fetchReelViews(mediaId: string): Promise<number | null> {
  let lastError: unknown = null;
  for (const metric of ["views", "plays"]) {
    try {
      const response = await graphGet<InsightsResponse>(`${mediaId}/insights`, { metric });
      const entry = response.data?.find((item) => item.name === metric) ?? response.data?.[0];
      const value = entry?.values?.[0]?.value ?? entry?.total_value?.value;
      if (typeof value === "number" && Number.isFinite(value)) return value;
      return null;
    } catch (error) {
      lastError = error;
      /* Metric name unsupported in this Graph version: try the next one. */
      if ((error as GraphError).code === 100) continue;
      throw error;
    }
  }
  throw lastError ?? new Error("Could not read the view count from Instagram.");
}

/* ------------------------------------------------------------------ */
/* Top 4 selection                                                     */
/* ------------------------------------------------------------------ */

const TOP_REELS_LIMIT = 4;

function toReel(item: MediaEdgeItem, views: number | null): InstagramReel {
  const caption = (item.caption ?? "").trim();
  return {
    id: item.id,
    permalink: item.permalink ?? "",
    thumbnailUrl: item.thumbnail_url ?? null,
    mediaUrl: item.media_url ?? null,
    views,
    publishedAt: item.timestamp ?? null,
    caption: caption.length > 140 ? `${caption.slice(0, 140)}...` : caption || null,
  };
}

async function fetchTopReels(): Promise<{
  reels: InstagramReel[];
  totalReels: number;
  account: InstagramAccountInfo | null;
}> {
  const { usesInstagramLogin } = getConfig();
  const resolved = usesInstagramLogin
    ? await resolveInstagramLoginAccount()
    : await resolveFacebookLoginAccount();
  const account = usesInstagramLogin
    ? resolved.account
    : await fetchIgUserProfile(resolved.igUserId);

  const media = await fetchReelMedia(resolved.igUserId);
  if (media.length === 0) {
    return { reels: [], totalReels: 0, account };
  }

  const reels: InstagramReel[] = [];
  let sawPermissionFailure = false;

  const targets = media.slice(0, MAX_REELS_FOR_INSIGHTS);
  for (let start = 0; start < targets.length; start += INSIGHTS_CONCURRENCY) {
    const chunk = targets.slice(start, start + INSIGHTS_CONCURRENCY);
    const mapped = await Promise.all(
      chunk.map(async (item): Promise<InstagramReel> => {
        try {
          return toReel(item, await fetchReelViews(item.id));
        } catch (error) {
          const kind = classifyFailure(error);
          if (kind === "permission") {
            sawPermissionFailure = true;
          } else if (kind === "token_invalid" || kind === "rate_limit") {
            throw error;
          }
          /* Timeouts and single media hiccups: rank without a view count. */
          return toReel(item, null);
        }
      }),
    );
    reels.push(...mapped);
  }

  const verified = reels.filter((reel) => typeof reel.views === "number");
  if (sawPermissionFailure && verified.length === 0) {
    const error = new Error(INSIGHTS_PERMISSION_MESSAGE) as GraphError;
    error.code = 200;
    throw error;
  }

  reels.sort((a, b) => (b.views ?? -1) - (a.views ?? -1));
  return { reels: reels.slice(0, TOP_REELS_LIMIT), totalReels: media.length, account };
}

/* ------------------------------------------------------------------ */
/* Cache, scheduler and public state                                   */
/* ------------------------------------------------------------------ */

type ReelsCache = {
  state: ReelsServiceState | null;
  fetchedAt: number;
  inflight: Promise<ReelsServiceState> | null;
};

const globalsWithCache = globalThis as typeof globalThis & {
  __instagramReelsCache?: ReelsCache;
  __instagramReelsTimer?: ReturnType<typeof setInterval>;
};

/* Failed syncs are retried after 5 minutes instead of hammering Instagram. */
const ERROR_RETRY_MS = 5 * 60 * 1000;

function getCache(): ReelsCache {
  if (!globalsWithCache.__instagramReelsCache) {
    globalsWithCache.__instagramReelsCache = { state: null, fetchedAt: 0, inflight: null };
  }
  return globalsWithCache.__instagramReelsCache;
}

function ensureScheduledRefresh(): void {
  const globals = globalsWithCache;
  if (globals.__instagramReelsTimer) return;
  const { token, ttlHours } = getConfig();
  if (!token) return;
  const intervalMs = Math.max(1, ttlHours) * 60 * 60 * 1000;
  const timer = setInterval(() => {
    const cache = getCache();
    if (!cache.inflight) {
      cache.inflight = runRefresh().finally(() => {
        cache.inflight = null;
      });
    }
  }, intervalMs);
  (timer as unknown as { unref?: () => void }).unref?.();
  globals.__instagramReelsTimer = timer;
}

function unconfiguredState(): ReelsServiceState {
  return {
    status: "unconfigured",
    message:
      "Instagram Graph API credentials are not configured on this server yet, so the Reels showcase stays hidden on the homepage. Visitors never see placeholder content.",
    reels: [],
    updatedAt: null,
    account: null,
    totalReels: null,
    missing: ["INSTAGRAM_ACCESS_TOKEN"],
    requirements: [...SETUP_REQUIREMENTS],
    lastError: null,
  };
}

async function runRefresh(): Promise<ReelsServiceState> {
  const cache = getCache();
  try {
    const { reels, totalReels, account } = await fetchTopReels();
    const state: ReelsServiceState = {
      status: "ok",
      message:
        reels.length === 0 ? "The account is connected but has no published Reels yet." : null,
      reels,
      updatedAt: new Date().toISOString(),
      account,
      totalReels,
      missing: [],
      requirements: [],
      lastError: null,
    };
    cache.state = state;
    cache.fetchedAt = Date.now();
    return state;
  } catch (error) {
    const kind = classifyFailure(error);
    const message =
      kind === "permission"
        ? permissionMessage(error)
        : kind === "token_invalid"
          ? "The Instagram access token is invalid or has expired. Generate a new long lived access token, update INSTAGRAM_ACCESS_TOKEN on the server and restart it."
          : kind === "rate_limit"
            ? "Instagram API rate limit reached. The next automatic sync will retry in a few hours."
            : ((error as Error | null)?.message ??
              "Unexpected error while talking to the Instagram Graph API.");

    /* A failed refresh never removes real reels that were synced before:
       they stay visible until the next successful sync replaces them. */
    if (cache.state?.status === "ok") {
      cache.state = { ...cache.state, lastError: message };
      return cache.state;
    }

    const state: ReelsServiceState = {
      status: kind === "permission" ? "insufficient_permissions" : "error",
      message,
      reels: [],
      updatedAt: null,
      account: null,
      totalReels: null,
      missing: [],
      requirements: [...SETUP_REQUIREMENTS],
      lastError: message,
    };
    cache.state = state;
    cache.fetchedAt = Date.now();
    return state;
  }
}

/** Snapshot for the API route and any server side consumer. */
export async function getReelsState(): Promise<ReelsServiceState> {
  const { token, ttlHours } = getConfig();
  if (!token) return unconfiguredState();

  const cache = getCache();
  ensureScheduledRefresh();

  const now = Date.now();
  const ttlMs = ttlHours * 60 * 60 * 1000;
  const freshOk = cache.state?.status === "ok" && now - cache.fetchedAt < ttlMs;
  const recentFailure = Boolean(
    cache.state && cache.state.status !== "ok" && now - cache.fetchedAt < ERROR_RETRY_MS,
  );

  if (cache.state && (freshOk || recentFailure)) return cache.state;

  const inflight =
    cache.inflight ??
    (cache.inflight = runRefresh().finally(() => {
      cache.inflight = null;
    }));

  /* Stale while revalidate: known good data is served instantly while the
     background sync runs. */
  if (cache.state?.status === "ok") return cache.state;

  return inflight;
}

/* Warm the cache as soon as the module is loaded on a configured server,
   so the first visitor never waits for the first Instagram sync. */
if (getConfig().token) {
  const cache = getCache();
  ensureScheduledRefresh();
  if (!cache.state && !cache.inflight) {
    cache.inflight = runRefresh().finally(() => {
      cache.inflight = null;
    });
  }
}
