# Hot Air Balloon Experience Agadir - Multilingual SEO Website

Production-ready, data-driven website for sunrise hot air balloon flights in **Marrakech** (palm grove, Agafay desert, Atlas views) and **Agadir** (Souss Valley). 60 pages across 5 languages (`/en/`, `/fr/`, `/de/`, `/es/`, `/nl/`), generated from the SEO plan spreadsheet (`SEO_Plan_Hot_Air_Balloon_Morocco.xlsx`, sheet `2-Site Architecture`).

## Stack

- Next.js 16 (App Router, static output per route) + TypeScript
- Tailwind CSS 4 (brand tokens: terracotta `#C2410C`, sand `#F5E6D3`, night `#1E293B`, gold `#D4A24C`)
- Booking via WhatsApp (no online payment), GA4 `generate_lead` behind cookie consent
- Images: AI-generated brand photography (`public/images/*.webp`), `next/image`, explicit dimensions, hero `priority`
- Fonts: Playfair Display + Inter (preloaded, `display: swap`)

## Project map

```
data/
  pages.json        <- generated from the xlsx (60 pages: URL, meta, H1, keywords, links, hreflang, WhatsApp msg)
  config.json       <- brand, domain, WhatsApp number, prices, locations, reviews settings
  products.json     <- flight catalogue (prices referenced from config.json)
  reviews.json      <- guest reviews (PLACEHOLDERS - replace before launch)
  alternates.json   <- compact URL equivalences for the language switcher
scripts/
  load-seo-plan.mjs <- re-builds data/pages.json + alternates.json from the xlsx
  check-links.ts    <- data integrity: broken links, orphans, metadata, hreflang, keywords, WA number
  generate-images.mjs <- regenerates brand photography into public/images
src/
  app/[lang]/            <- root layout per language + home pages
  app/[lang]/[...slug]/  <- every other page (template chosen by page type)
  lib/content/{en,fr,de,es,nl}/  <- native copy per language (intro, blocks, faqs, itineraries)
  components/templates/          <- Home/City/Product/Pricing/Pillar/Guide/FAQ/Reviews/Booking/About/Legal
  lib/i18n.ts                    <- UI strings + product names (5 languages)
  lib/schema.ts                  <- JSON-LD builders
```

## Everyday tasks

### 1. Change prices or the WhatsApp number
Edit `data/config.json` only:

```json
"whatsappNumber": "212661234567",     // digits only, international format
"prices": { "classic": 1500, "private": 2200, "vip": 3500, "camel": 1900, "agafay": 1700, "agadir": 1500, "classicChild": 900, "agadirChild": 900 }
```

Body copy uses tokens (`{{PRICE_CLASSIC}}`, `{{PRICE_PRIVATE}}`, ...) that render localized ("1,500 MAD" / "1 500 MAD" / "1.500 MAD"). Meta titles/descriptions come from the sheet with the Classic price injected - if you change `classic` significantly, re-run `bun scripts/load-seo-plan.mjs` so titles/descriptions pick up the new price from the sheet's `1,500 MAD` pattern.

EUR prices are derived automatically at ~`config.currency.madPerEur` (rounded to 5).

### 2. Change the domain
`data/config.json` -> `"domain"`. It drives canonical URLs, hreflang, OG URLs, sitemap and JSON-LD.

### 3. Replace placeholder reviews
`data/reviews.json` - replace name/country/date/text with your real verified reviews (Google, TripAdvisor, WhatsApp screenshots). Reviews are shown on reviews pages and product pages. **AggregateRating in JSON-LD is disabled by default** (`config.reviews.aggregateRating.enabled: false`); enable it ONLY after you have real review data - Google penalises fake ratings.

### 4. Add a guide (blog article)
1. Add the page row to the sheet's `2-Site Architecture` (or add it directly to `data/pages.json` after regenerating), e.g. `en-g-winter` at `/en/guide/hot-air-balloon-marrakech-winter/` with title, H1, keywords, word count, links OUT, hreflang alternates.
2. Add the content entry (`intro`, `blocks`, `faqs`) to `src/lib/content/en/guides-a.ts` or `guides-b.ts` (or the `fr/guides.ts` for French) keyed by the page ID.
3. The guide template auto-generates the TOC from your `h2` blocks, the Article schema with the pilot author, breadcrumbs, hreflang and the sitemap entry.
4. Add the internal link to the guides hub intro (`en-blog` / `fr-blog` in the core content files) so it is not an orphan, and run `bun scripts/check-links.ts`.

### 5. Add a language
1. `src/lib/types.ts` -> add the code to `Lang` + `LANGS`.
2. `src/lib/i18n.ts` -> add a full `UiStrings` block (copy the `de` block as the lightest reference; ~40 strings + product names).
3. `src/lib/content/<lang>/index.ts` -> write the 5 light pages (home, agadir, prices, faq, contact) and register the module in `src/lib/content/registry.ts`.
4. `src/middleware.ts` -> add the prefix to `LANG_PREFIX`.
5. Add the page rows for the new language to the sheet and re-run `bun scripts/load-seo-plan.mjs`; add the language to the footer/header (automatic via `LANGS`).
6. `bun scripts/check-links.ts` must pass with 0 errors.

## Commands

```bash
bun run dev                  # dev server (port 3000)
bun run lint                 # ESLint
bun scripts/load-seo-plan.mjs    # regenerate data/pages.json + alternates.json from the xlsx
bun scripts/check-links.ts   # integrity gate - must exit 0 before every deploy
bun scripts/generate-images.mjs  # regenerate brand photography (z-ai image API)
bun run build                # production build (then deploy to Vercel/Netlify)
```

`check-links.ts` validates: zero broken internal links, zero orphan pages, title/description/H1 present with length limits, canonical trailing slashes, hreflang reciprocity + x-default, keyword cannibalisation, WhatsApp number format, and content word-count targets. After a production build you can additionally crawl the static output: `bun scripts/check-links.ts --crawl .next/server/app` (or your export folder).

## Deployment (Vercel or Netlify)

1. Push the repo, import it, accept defaults (`next build`). All 60 routes + `/api/og` are statically prerendered or edge-cached.
2. Set your real domain in `data/config.json` and redeploy.
3. `/` 308-redirects to `/en/` via `src/middleware.ts` (no IP/browser auto-redirect, per spec). Language switcher links only to existing equivalents, falling back to that language's home.
4. `robots.txt` points to `/sitemap-index.xml` (60 URLs, hreflang `xhtml:link` entries + `x-default` -> EN).

## Post-launch checklist

- [ ] **Google Search Console**: verify the domain property, submit `https://YOURDOMAIN/sitemap-index.xml`, monitor Coverage + hreflang reports.
- [ ] **Google Business Profiles**: create one for **Marrakech** (link it to `/en/` + `/fr/` city pages with UTM) and one for **Agadir** (link `/en/agadir-hot-air-balloon/` + `/fr/montgolfiere-agadir/`). Fill categories (Balloon ride / Tourist attraction), hours (sunrise flights), photos, and NAP matching the footer.
- [ ] **Reviews engine**: after every flight, send the WhatsApp review request; mirror reviews to the GBP profiles and import the best ones into `data/reviews.json`. Enable `aggregateRating` in config only once you have 20+ real reviews.
- [ ] **TripAdvisor + GetYourGuide (and Viator)**: list both cities; put the site URL in the operator profile and link back from the footer `sameAs` (`data/config.json`). These OTA pages already rank for "hot air balloon marrakech" - use them as booking funnels AND citation sources.
- [ ] **GA4**: set `data/config.json` -> `"gaMeasurementId"` (e.g. `G-XXXXXXX`). The cookie banner gates it; `generate_lead` events fire with `{flight, lang, page}` on every WhatsApp click.
- [ ] **Rich Results Test**: validate home (Organization/LocalBusiness/FAQPage), one product (Product + Offer + TouristTrip), one guide (Article), and the sitemap hreflang pairs.
- [ ] **Lighthouse mobile** on `/en/`, `/en/marrakech/sunrise-balloon-flight/`, `/en/guide/` - targets: >= 95 across the board, LCP < 2.0 s.
- [ ] **Replace placeholders**: WhatsApp number (config), domain (config), pilot bio/name in `data/config.json.author`, sample reviews, TripAdvisor profile URL in `sameAs`.
- [ ] **Phase 3 content plan**: 2 new guides/month (one EN + one FR), each targeting one keyword from sheet `3-Keyword Map` that has no page yet; add GBP posts weekly during high season (Oct-Apr).
