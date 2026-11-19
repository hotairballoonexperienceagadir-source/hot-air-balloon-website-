# CLAUDE.md

Guide for Claude Code working on this repository. Read this file first, then
verify current state with the commands shown below before changing anything.

## 1. What this project is

Marketing and booking website for **Hot Air Balloon Experience Agadir**, a
licensed hot air balloon operator based in Agadir, Morocco (Souss Valley
launch site). The site presents the experiences and closes every booking
through **WhatsApp deep links** (no payment gateway, no cart, no account
system). The UI language is **French**.

- `/` (src/app/page.tsx) ........ Agadir homepage. Agadir is the MAIN
  destination and the company home base.
- `/marrakech-flights/` (src/app/marrakech-flights/page.tsx) ... Marrakech,
  the SECOND destination, operated by the same team. Own offers, prices,
  photos, timeline and FAQ. The two destinations are never mixed.

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
src/app/page.tsx                     Agadir homepage (section composition)
src/app/marrakech-flights/page.tsx   Marrakech page + its metadata/og + JSON-LD
src/app/layout.tsx                   fonts, global metadata (og image hero-agadir.webp)
src/app/globals.css                  theme tokens (brand palette, fonts, scrollbar)
src/lib/site.ts                      SINGLE SOURCE OF TRUTH for all content:
                                     site identity + WhatsApp number + waLink()
                                     message helpers, cities, agadirOffers
                                     (Classic 2,200 MAD / Private 7,000 MAD),
                                     marrakechOffers (Classic Low Cost 999 /
                                     Classic Flight 2,199 / Private 5,499 +
                                     children 2,999 MAD), stats, whyUs,
                                     experienceSteps, pickupAreas,
                                     marrakechTimeline, reviews (static
                                     fallback), reviewHighlights,
                                     cityGoogleConfig, faqs, marrakechFaqs
src/lib/gallery.ts                   Agadir gallery: 15 items, GalleryItem type
src/lib/marrakech-gallery.ts         Marrakech gallery: exactly the 15 owner
                                     provided photos
src/lib/experience-slides.ts         derives each slideshow from its gallery
src/lib/weather.ts                   live weather service for the forecast widget
src/components/site/                 Header, Footer, Hero, MarrakechHero,
                                     sections.tsx (Agadir sections incl.
                                     ExperienceSlideshow usage, CtaSection),
                                     MarrakechSections.tsx, ExperienceSlideshow,
                                     Reviews, FlightProbability, FaqSection,
                                     FloatingActions, WhatsAppIcon
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
   `waLink()` in site.ts with a prefilled French message. Do not introduce
   other booking or payment flows.
4. **Reviews integrity.** Reviews are only ever READ from Google. Never
   invent, filter, reorder for vanity, or synthesize owner replies.
5. **Do not regress the header behaviors** (section 7) or the
   ExperienceSlideshow contract (section 8).
6. **Sticky footer.** Page root uses `min-h-screen flex flex-col` and the
   footer uses `mt-auto`. Preserve this on any new page.
7. Keep all image dimensions and aspect ratios unchanged when replacing an
   image file, and keep alt text + captions in gallery entries accurate.

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
- Unreferenced legacy files exist in public/images (agadir-premium.jpg,
  agadir-private.jpg, vip-basket.jpg, burner-flame.jpg, breakfast-caidal.jpg,
  hero-sunrise.jpg, logo.jpg, logo.svg). Do not delete or reference them
  without an explicit owner decision.
- next.config.ts: `images.qualities: [75, 90]` (the logo uses 90) and
  remotePatterns for lh3.googleusercontent.com (Google reviewer photos).

## 10. Environment

- `DATABASE_URL` (SQLite) is the only active var in .env; Prisma is unused.
- `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` switch the reviews API to live
  Google data. Never commit secrets; document new vars by name only.

## 11. Build status (already implemented, keep working)

- Two complete pages (Agadir home, Marrakech) with hero + booking widgets
  that build prefilled WhatsApp deep links from date/package/guests.
- Offers cards for both destinations with per-offer WhatsApp messages.
- Galleries (15 + 15 photos) as responsive grids, each feeding its derived
  Experience slideshow (ExperienceSlideshow.tsx, no lightbox).
- Reviews section fed by the reviews API (fallback mode). A ReviewsBanner
  photo strip component exists in Reviews.tsx but is not rendered anywhere.
- 7 day flight probability widget on live weather data (API + caching).
- FAQ accordions, stats strip, pickup areas, closing CTA sections.
- Shared Header/Footer with the logo behaviors described above, floating
  WhatsApp/call buttons, sticky footer.
- SEO: per page metadata + og images, JSON-LD (Organization, offers,
  breadcrumbs), sitemap.ts, robots.ts, /api/og generator, /en redirect.

## 12. Definition of done for any change

1. `bun run lint` passes.
2. dev.log shows no compile or runtime errors.
3. Browser verified: Agadir and Marrakech pages, desktop (1440x900) and
   mobile (390x844): no broken images, galleries render in order,
   slideshows work, WhatsApp CTAs open correct prefilled messages,
   sticky footer correct.
4. No changes outside the scope the user asked for.
