import { pagePaths } from "@/lib/i18n/config";

/**
 * Google Analytics 4 with "basic" consent (GDPR / UK GDPR).
 *
 * - Nothing loads and no cookie is set until the visitor clicks Accept in
 *   the consent banner. Reject loads nothing.
 * - The choice is stored in localStorage for CONSENT_DAYS and the banner is
 *   not shown again until it expires (or the visitor reopens it from the
 *   footer "Cookie settings" link).
 * - Google Consent Mode v2 defaults are all denied; only analytics_storage
 *   is updated to granted after Accept. Ads signals always stay denied.
 * - Enabled only on the production hostname, and on localhost in
 *   development (with debug_mode). Never on *.workers.dev or *.vercel.app.
 * - trackEvent is a no-op without consent. Never pass personal data (names,
 *   emails, phone numbers, message text) as event parameters.
 */

/** GA4 Measurement ID (public, not a secret). */
export const GA_MEASUREMENT_ID = "G-5MBLZHE5VR";

const PRODUCTION_HOSTNAME = "www.hotairballoontoursmorocco.com";
const CONSENT_STORAGE_KEY = "analytics-consent";
const CONSENT_DAYS = 180;
/** Fired by the footer "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = "analytics-consent-open";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/* ------------------------------------------------------------------ */
/* Consent storage                                                     */
/* ------------------------------------------------------------------ */

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: unknown; expires?: unknown };
    if (
      (parsed.choice !== "granted" && parsed.choice !== "denied") ||
      typeof parsed.expires !== "number" ||
      parsed.expires < Date.now()
    ) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }
    return parsed.choice;
  } catch {
    return null;
  }
}

/* Storage blocked (some private modes): the choice lives in memory for this
   page only. */
let memoryChoice: ConsentChoice | null = null;
const consentListeners = new Set<() => void>();

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ choice, expires: Date.now() + CONSENT_DAYS * 24 * 60 * 60 * 1000 }),
    );
  } catch {
    memoryChoice = choice;
  }
  for (const listener of consentListeners) listener();
}

/* useSyncExternalStore plumbing: the server snapshot is undefined ("not
   read yet"), so the prerendered HTML never contains the banner and
   hydration always matches. */
export function subscribeConsent(listener: () => void): () => void {
  consentListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    consentListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getConsentSnapshot(): ConsentChoice | null {
  return readConsent() ?? memoryChoice;
}

export function getConsentServerSnapshot(): undefined {
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Host gate                                                           */
/* ------------------------------------------------------------------ */

function isLocalDevHost(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
  );
}

/** GA runs only on the production hostname (and localhost in dev). */
export function isAnalyticsHost(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === PRODUCTION_HOSTNAME || isLocalDevHost();
}

/* ------------------------------------------------------------------ */
/* gtag                                                                */
/* ------------------------------------------------------------------ */

let active = false;

/* gtag.js expects the Arguments object itself in the dataLayer. */
function gtag(..._args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/**
 * Queue the consent defaults, the analytics grant and the config BEFORE
 * gtag.js loads (it processes the queue in order). Called only after Accept
 * on an allowed host. page_view is sent manually (see trackPageView) so the
 * first page is never counted twice.
 */
export function startAnalytics(): void {
  if (!isAnalyticsHost()) return;
  if (!active) {
    if (!window.dataLayer?.length) {
      gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        ...(isLocalDevHost() ? { debug_mode: true } : {}),
      });
    }
    gtag("consent", "update", { analytics_storage: "granted" });
  }
  active = true;
}

/** Revoke after a previous Accept (footer Cookie settings, then Reject). */
export function stopAnalytics(): void {
  if (active) gtag("consent", "update", { analytics_storage: "denied" });
  active = false;
  /* Remove the GA cookies (_ga, _ga_<id>) on this host and its parents. */
  try {
    const host = window.location.hostname;
    const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0]?.trim();
      if (!name || !/^_ga(_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  } catch {
    /* Cookies unavailable: nothing to remove. */
  }
}

export function isAnalyticsActive(): boolean {
  return active;
}

type EventParams = Record<string, string | number | undefined>;

/** Send a GA4 event. No-op without consent or on a non production host. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (!active) return;
  const clean: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") clean[key] = value;
  }
  gtag("event", name, clean);
}

export function trackPageView(): void {
  if (!active) return;
  gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const marrakechPaths = new Set(
  Object.values(pagePaths.marrakech).map((path) => path.replace(/\/+$/, "")),
);

/** Destination of the current page: the Marrakech pages, else Agadir. */
export function destinationFromPath(pathname: string): "agadir" | "marrakech" {
  return marrakechPaths.has(pathname.replace(/\/+$/, "")) ? "marrakech" : "agadir";
}
