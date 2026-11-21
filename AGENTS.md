# AGENTS.md

Guide for Codex (and any other AI agent) working on this repository.
Read this file first, then verify current state with the commands shown
below before changing anything. A parallel copy of this guide exists in
CLAUDE.md for Claude Code; keep the two files in sync when conventions
change.

## 1. What this project is

Marketing and booking website for **Hot Air Balloon Experience Agadir**, a
licensed hot air balloon operator based in Agadir, Morocco (Souss Valley
launch site). The site presents the experiences and closes every booking
through **WhatsApp deep links** (no payment gateway, no cart, no account
system). The site is multilingual (i18n, 2026-11-21): **English is the
default language** at the original URLs, with French, German and Spanish
versions under their own prefixes.

- `/` (src/app/(en)/page.tsx) ........ Agadir homepage (EN, default).
  Agadir is the MAIN destination and the company home base.
- `/marrakech-flights/` (src/app/(en)/marrakech-flights/page.tsx) ...
  Marrakech, the SECOND destination, operated by the same team. Own offers,
  prices, photos, timeline and FAQ. The two destinations are never mixed.
- `/fr/` + `/fr/montgolfiere-marrakech/` ... French versions.
- `/de/` + `/de/ballonfahrt-marrakesch/` ... German versions (the city is
  spelled "Marrakesch").
- `/es/` + `/es/globo-aerostatico-marrakech/` ... Spanish versions.

Everything the visitor reads (prices, texts, offers, reviews, FAQs) lives in
typed data files under `src/lib/` and flows into the pages from there.

## 2. Tech stack

- Next.js 16 (App Router, Turbopack dev), TypeScript strict
- Tailwind CSS 4 + shadcn/ui (New York) in `src/components/ui/`, Lucide icons
- bun as package manager and runtime
- Prisma + SQLite scaffolded in `prisma/schema.prisma` / `src/lib/db.ts`
  but NOT used by the site yet (content is static typed data, caches are
  in server memory)
- Fonts via next/font: Poppins 700 headings (`--font-poppins`), Jost 400/500
  body (`--font-jost`)
- `sharp` available for image processing

## 3. Commands

```bash
bun install            # install deps
bun run dev            # dev server on port 3000, logs tee'd to dev.log
bun run lint           # eslint (must pass before finishing work)
bun run db:push        # apply prisma schema changes (only if you touch schema)
bun run build          # production build (standalone output)
```

Notes:
- Keep the dev server running in the background while iterating and check
  `dev.log` (tail it) for compile/runtime errors after every change.
- `trailingSlash: true` is set in next.config.ts, so pages are served with a
  trailing slash. Use `curl -L` when probing URLs from the CLI.
- Do not change the port or add extra dev servers.

## 4. Where things live (map)

```
src/app/(en)/layout.tsx              EN root layout: original metadata UNTOUCHED
                                     (+ hreflang alternates added Phase D)
src/app/(en)/page.tsx                Agadir homepage (EN)
src/app/(en)/marrakech-flights/      Marrakech page (EN) + its metadata/og
src/app/(fr|de|es)/layout.tsx        Locale root layouts (<html lang>, own
                                     metadata, og:locale, hreflang)
src/app/(fr)/fr/montgolfiere-marrakech/   (de)/de/ballonfahrt-marrakesch/
src/app/(es)/es/globo-aerostatico-marrakech/   translated Marrakech pages
src/app/global-not-found.tsx         English shell 404 behind the four groups
                                     (needs experimental.globalNotFound)
src/app/globals.css                  theme tokens (brand palette, fonts, scrollbar)
                                     IMPORTANT: imported by EACH language layout
src/lib/i18n/config.ts               locales, pagePaths URL map (ONE source for
                                     switcher + hreflang + sitemap), native names
src/lib/i18n/types.ts                Dictionary + SiteContent + client subset types
src/lib/i18n/dictionaries/{en,fr,de,es}.ts   all UI strings per language (EN
                                     dictionary = the approved copy, word for word)
src/lib/i18n/content/{en,fr,de,es}.ts localized data (EN re-exports site.ts by
                                     reference so English never drifts; locale
                                     files pull prices from site.ts by offer id)
src/lib/i18n/context.tsx             I18nProvider + useI18n (client components)
src/lib/i18n/client-value.ts         builds the SLIM context value (server passes
                                     the full dict/content to server components
                                     as props; only a subset goes to the client)
src/lib/i18n/format.ts               formatPrice / formatRating / tpl placeholders
src/lib/fonts.ts                     Jost + Poppins, imported by all 4 layouts
src/lib/site.ts                      SINGLE SOURCE OF TRUTH for all content:
                                     site identity + WhatsApp number + waLink()
                                     message helpers, cities, agadirOffers
                                     (exactly two packages: Classic 2,199 MAD /
                                     Private 6,999 MAD, min 2 guests, private
                                     breakfast under an argan tree; the former
                                     Agadir Royal Flight was removed by owner
                                     decision on 2026-11-20 and must not be
                                     reintroduced without an explicit owner
                                     decision),
                                     marrakechOffers (Classic Low Cost 999 /
                                     Classic Flight 1,399 / Private 5,299 /
                                     Royal 6,299 MAD, Private and Royal min
                                     2 guests, Royal breakfast served in the
                                     sky aboard the balloon, Royal card image
                                     /images/marrakech-royal-flight.webp;
                                     approved by the owner on 2026-11-20),
                                     stats, whyUs, experienceSteps,
                                     pickupAreas, marrakechTimeline, reviews
                                     (static fallback), reviewHighlights,
                                     cityGoogleConfig, faqs, marrakechFaqs
src/lib/gallery.ts                   Agadir gallery: 15 items, GalleryItem type
src/lib/marrakech-gallery.ts         Marrakech gallery: exactly the 15 owner
                                     provided photos
src/lib/experience-slides.ts         derives each slideshow from its gallery
src/lib/weather.ts                   live weather service for the forecast widget
src/components/site/                 Header (+ LanguageSwitcher), Footer, Hero,
                                     MarrakechHero, sections.tsx, MarrakechSections.tsx,
                                     AgadirHome.tsx + MarrakechPage.tsx (shared page
                                     bodies incl. per-locale JSON-LD), ExperienceSlideshow,
                                     BookingBar/BookingModal/BookingFields,
                                     ContactModal, Reviews, FlightProbability,
                                     FaqSection, FloatingActions, WhatsAppIcon
src/app/sitemap.ts                   2 English entries (original shape) + 6 locale
                                     entries with xhtml hreflang alternates
src/app/api/google-reviews/route.ts  reviews API (see section 6)
src/app/api/flight-forecast/route.ts forecast API (see section 6)
src/app/api/og/route.tsx             dynamic 1200x630 OG image generator
public/images/                       all site images
```

## 5. Hard rules of this codebase

1. **Destination separation.** Agadir content and Marrakech content never
   mix: separate galleries, separate offers, separate slideshows (the
   derivation rule in `experience-slides.ts` is PERMANENT). The social links
   (Facebook, TikTok, Instagram) belong to Agadir only and must never appear
   on the Marrakech page. One Google Business Profile serves BOTH pages
   (owner confirmed), so both cities share `googleReviewsUrl` and the same
   reviews API profile.
2. **French copy style.** User visible text NEVER contains an en dash (U+2013)
   or em dash (U+2014). Use "|" separators instead (e.g. "Agadir | Souss
   Valley | Morocco"). Apostrophes in copy are U+2019 (right single quote),
   never the ASCII apostrophe. Check with:
   `rg -n "–|—" src/` and `rg -n "'" src/components src/lib`
3. **Booking is WhatsApp only.** Every CTA builds a `wa.me` link through
   `waLink()` in site.ts with a prefilled message in the LANGUAGE of the
   page (owner approved 2026-11-21). Do not introduce other booking or
   payment flows. The shared availability message in `use-booking-form.ts`
   (used by BOTH the BookingModal and the inline BookingBar) carries a
   literal "Language: English/French/German/Spanish" line after the Total
   line, an ISO date and the localized destination name (German
   "Marrakesch"). The Total is computed at submit time as
   selectedOffer.priceMad x guests and localized ("Total: 1,998 MAD" EN /
   "2 199 MAD" FR narrow no break space / "2.199 MAD" DE and ES). Never
   hardcode totals anywhere. Package names stay ENGLISH in every language
   (owner decision): Classic Flight, Private Flight, Royal Flight,
   Classic Low Cost.
4. **Reviews integrity.** Reviews are only ever READ from Google. Never
   invent, filter, reorder for vanity, or synthesize owner replies.
5. **Do not regress the header behaviors** (section 7) or the
   ExperienceSlideshow contract (section 8).
6. **Sticky footer.** Page root uses `min-h-screen flex flex-col` and the
   footer uses `mt-auto`. Preserve this on any new page.
7. Keep all image dimensions and aspect ratios unchanged when replacing an
   image file, and keep alt text + captions in gallery entries accurate.
8. **No "Palmeraie" in visible Marrakech content.** Owner decision
   2026-11-20: the word "Palmeraie" must not appear in VISIBLE Marrakech
   copy in ANY language (EN, FR, DE, ES). Offer card location tags, the
   booking bar chip, the booking modal destination and the WhatsApp
   message destination read just "Marrakech" ("Marrakesch" in German);
   descriptions, timeline, FAQ answers, footer, gallery captions and
   image alt texts describe the area as Marrakech desert landscapes /
   desert launch area instead. SEO is intentionally left UNCHANGED on the
   ENGLISH page only: page title, meta description, keywords, Open Graph,
   JSON-LD and slugs keep their original wording even where they contain
   "Palmeraie". The three marrakechOffers `seoDescription` fields in
   site.ts freeze the pre-decision JSON-LD copy (the Marrakech Product
   schema renders `offer.seoDescription ?? offer.description`) and must
   NEVER be edited. Translated pages have NO Palmeraie exemption: their
   metadata and JSON-LD are Palmeraie free.
9. **i18n rules (owner approved 2026-11-21).** English is the default
   language and the two English URLs (`/`, `/marrakech-flights`) are never
   moved or redirected. NO automatic browser/IP language redirect ever
   exists: the header switcher links to the same page in the other
   language (map in `src/lib/i18n/config.ts` pagePaths) and only stores
   the choice in localStorage (`preferred-locale`). Every new visible
   string goes into all four dictionaries (typed by `Dictionary`; the
   provider carries only the client subset). Dictionaries are plain data:
   no functions, placeholders resolved with `tpl()`. Prices always come
   from site.ts; format only with `formatPrice()`. New ENGLISH copy is
   append only (never rewrite or remove approved sentences) and new
   English FAQs are appended at the END of the FAQ arrays so the homepage
   JSON-LD FAQPage `faqs.slice(0, 6)` stays byte identical. Each language
   keeps Agadir and Marrakech content fully separated and each layout
   imports `../globals.css` (the original restructure bug: pages render
   unstyled without it).
10. **Never delete images from /public (owner rule 2026-11-21).** Image
   files in `public/images/` are referenced across BOTH pages and all
   four languages (cards, heroes, gallery, CTA, OG). Never delete, rename
   or "clean up" an image file without the owner's explicit approval, and
   never replace an approved image with a different or newly generated
   one. After ANY refactor that touches image paths, components or
   layouts, check ALL 8 pages (/, /marrakech-flights/, /fr/,
   /fr/montgolfiere-marrakech/, /de/, /de/ballonfahrt-marrakesch/, /es/,
   /es/globo-aerostatico-marrakech/) in the browser for broken images
   (every `<img>` must reach naturalWidth > 0, galleries expanded via the
   See more button). Note: a long running dev server can get a stuck
   in memory image optimizer worker (requests to a specific
   `/_next/image` width hang forever with no status and no bytes while
   other widths and raw /images/ URLs return 200): if exactly one width
   of one image never loads, restart the dev server and retest before
   changing any code.

## 6. API routes

- `GET /api/google-reviews/?city=agadir|marrakech`
  Current mode: **static fallback** (no Google credentials in .env yet):
  returns the verified static reviews from site.ts with
  `source: "static-fallback"` and `missing: ["GOOGLE_PLACES_API_KEY",
  "GOOGLE_PLACE_ID"]`. If both env vars are set, it calls the official
  Google Places API (New) and caches results in server memory for 3 hours.
- `GET /api/flight-forecast?city=agadir|marrakech`
  7 day ballooning probability for the 05:00-10:59 Africa/Casablanca flight
  window. Sources in order: Open-Meteo, MET Norway, 7Timer. Per city 10 min
  in-memory cache; stale results are served with a stale flag on upstream
  failure. Route is `force-dynamic`.
- `GET /api/contact` POST
  Contact form delivery over Gmail SMTP (see section 10). 503 when SMTP
  is not configured, 500 on delivery failure, both logged as server
  warnings without secrets; the client modal then offers the WhatsApp
  fallback so the message is never lost.
- `GET /api/contact/health`
  Returns `{ smtpConfigured: true | false }` (boolean only, never any
  variable value) so email delivery can be checked after a sandbox
  reset. Route is `force-dynamic`.
- `GET /api/og?t=<title>&s=<subtitle>` renders the dynamic OG image.

## 7. Header behaviors (shared by both pages, in Header.tsx)

- Logo is a Link to `site.homePath` ("/") with `onLogoClick`: when already
  on "/" it preventDefaults, strips any hash via history.replaceState, and
  smooth-scrolls to top (so "/#reviews" always resets cleanly). On the
  Marrakech page it performs a normal navigation.
- The logo image scales to `scale(1.45)` while the page is at the top
  (`atTop`, scrollY <= 0) and back to `scale(1)` once scrolled. Pure
  transform: layout box and header height (80px desktop / 72px mobile) stay
  unchanged; `motion-reduce:transition-none` is set.
- A sticky solid bar appears at `scrollY > 40` (fixed, navy/95, blur).

## 8. ExperienceSlideshow contract (ExperienceSlideshow.tsx)

Rotates ONLY while its section is OUTSIDE the viewport (IntersectionObserver
on the enclosing section): frozen when visible, crossfade every 12s when
off-screen (900ms fade), next slide preloaded eagerly, reduced motion swaps
instantly, no controls rendered. Do not make it rotate on screen.

## 9. Images: current state and constraints

- 19 images were converted to WebP (sharp, quality 82-90, effort 6; heroes
  visually verified side by side). References were updated in gallery.ts,
  marrakech-gallery.ts, MarrakechHero.tsx, sections.tsx, Reviews.tsx and the
  Marrakech og metadata. Original files were deleted after browser
  verification and remain recoverable from git history.
- **17 referenced images intentionally remain JPEG** because their sources
  are already so compressed that an equal-quality WebP came out LARGER.
  They are all served through next/image (which delivers optimized WebP to
  browsers anyway). Do not "fix" them back to WebP without new files:
  marrakech-classic.jpg, marrakech-comfort.jpg, marrakech-private.jpg,
  gallery-argan-camp-arrival.jpg, gallery-campfire-night.jpg,
  gallery-inflation-dawn-fire.jpg, marrakech-basket-breakfast.jpg,
  marrakech-red-star-balloon.jpg, marrakech-green-balloon-atlas.jpg,
  marrakech-red-balloon-hazy-sunset.jpg, marrakech-balloons-green-plains.jpg,
  marrakech-launch-site-dawn.jpg, marrakech-green-balloon-palms.jpg,
  marrakech-basket-passengers-burner.jpg, marrakech-balloons-morning-fields.jpg,
  marrakech-checkered-balloon-descent.jpg, marrakech-star-balloon-inflight.jpg
- Mobile heroes are RAW-served CSS backgrounds on `md:hidden` divs
  (hero-agadir-mobile.webp, hero-marrakech-mobile.webp, both 941x1672).
  Desktop heroes use next/image (hero-agadir.webp, hero-marrakech.webp)
  hidden with `visibility` so the layout box and sizes check stay intact.
- `src/app/icon.png` must stay PNG: the Next.js favicon convention does not
  accept webp for `icon.*`.
- `/images/marrakech-royal-flight.webp` (Marrakech Royal Flight card,
  1536x1024, owner supplied on 2026-11-20) is kept byte for byte from the
  original upload: a WebP quality 80 re-encode introduced visible sky
  banding, so the original encoding is preserved. Do not re-encode it.
- `gallery-basket-aerial-view.webp` (Agadir gallery only) and
  `marrakech-basket-breakfast.jpg` (Marrakech gallery only) are gallery
  media and must NOT be used as package card images.
- Unreferenced legacy files exist in public/images (agadir-premium.jpg,
  agadir-private.jpg, vip-basket.jpg, burner-flame.jpg, breakfast-caidal.jpg,
  hero-sunrise.jpg, logo.jpg, logo.svg). Do not delete or reference them
  without an explicit owner decision.
- next.config.ts: `images.qualities: [75, 90]` (the logo uses 90) and
  remotePatterns for lh3.googleusercontent.com (Google reviewer photos).

## 10. Environment

- Variables currently used in .env (NAMES only, never commit values):
  `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
  `SMTP_PASSWORD` (Gmail App Password, spaces removed),
  `CONTACT_RECIPIENT_EMAIL`.
- The Z.ai sandbox resets .env from time to time (it is git ignored, so
  a reset restores the repo without it). After a reset the contact
  route answers 503, logs "[contact] SMTP not configured — customer was
  offered WhatsApp fallback" and the modal keeps the message safe via
  the WhatsApp fallback. Restore the five SMTP variables in .env and
  restart the dev server; check with GET /api/contact/health.
- `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` switch the reviews API to live
  Google data. Never commit secrets; document new vars by name only.

## 11. Build status (already implemented, keep working)

- Two complete pages in FOUR languages (EN default at the original URLs,
  FR/DE/ES under their prefixes) with hero + booking widgets that build
  prefilled WhatsApp deep links from date/package/guests, in the visitor
  language with the Language line.
- Offers cards for both destinations with per-offer WhatsApp messages.
- Galleries (15 + 15 photos) as responsive grids, each feeding its derived
  Experience slideshow (ExperienceSlideshow.tsx, no lightbox).
- Reviews section fed by the reviews API (fallback mode). A ReviewsBanner
  photo strip component exists in Reviews.tsx but is not rendered anywhere.
- 7 day flight probability widget on live weather data (API + caching).
- FAQ accordions, stats strip, pickup areas, closing CTA sections.
- Contact form modal delivering over Gmail SMTP; on missing SMTP config,
  delivery failure or network failure it shows a WhatsApp fallback
  ("Send on WhatsApp" + "Email us instead" mailto) with the message
  pre-filled and keeps the form values, so a customer message is never
  lost. Health check: GET /api/contact/health.
- Shared Header/Footer with the logo behaviors described above, floating
  WhatsApp/call buttons, sticky footer.
- SEO: per page metadata + og images in all four languages, hreflang
  alternates (en/fr/de/es + x-default to the English URL) and self
  canonicals, per-locale JSON-LD (LocalBusiness, offers, FAQ slice(0,6)
  on Agadir homes, breadcrumbs on Marrakech), sitemap.ts with the 6
  locale entries carrying alternates, robots.ts, /api/og generator,
  /en redirect. Never redirect on Accept-Language.
- Language switcher in the header (desktop dropdown + mobile menu list):
  real crawlable `<a href>` links, same-page mapping, localStorage
  memory only.

## 12. Definition of done for any change

1. `bun run lint` passes.
2. dev.log shows no compile or runtime errors.
3. Browser verified: all 8 pages (2 x 4 languages), desktop (1440x900)
   and mobile (390x844): no broken images, galleries render in order,
   slideshows work, WhatsApp CTAs open correct prefilled messages (per
   language, with the Language line), language switcher keeps the visitor
   on the same page, sticky footer correct.
4. No changes outside the scope the user asked for.
