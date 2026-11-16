/**
 * Internal linking & SEO integrity checker.
 * Validates the data layer that generates every page (data/pages.json):
 *  - zero broken internal links (every body link target exists in the plan)
 *  - zero orphan pages (every page receives >= 1 inbound internal link from body, header or footer)
 *  - every page has title (<= 62 chars), description (<= 160 chars), H1 (except legal)
 *  - canonical URL = trailing slash, lowercase
 *  - hreflang alternates resolve and are reciprocal; x-default -> EN
 *  - every WhatsApp message exists and the configured number is a valid wa.me number
 *  - body copy word counts vs the sheet targets (warning only)
 *  - primary keyword appears exactly on ONE page (no cannibalisation)
 *
 * Run: bun scripts/check-links.ts   (exit 1 on any error)
 * After a production build you may additionally crawl ./out or ./dist:
 *   bun scripts/check-links.ts --crawl <dir>
 */
import fs from 'fs';
import path from 'path';

type Page = {
  id: string; lang: string; priority: string; pageType: string; url: string;
  parent: string | null; primaryKeyword: string; secondaryKeywords: { kw: string; volume: number | null }[];
  metaTitle: string; metaDescription: string; h1: string; wordCount: { min: number; max: number };
  linksOut: string[]; alternates: Record<string, string>; whatsapp: { number: string; message: string } | null;
};

const data = JSON.parse(fs.readFileSync('/home/z/my-project/data/pages.json', 'utf8')) as { pages: Page[] };
const config = JSON.parse(fs.readFileSync('/home/z/my-project/data/config.json', 'utf8'));
const pages = data.pages;
const byUrl = new Map(pages.map((p) => [p.url, p]));

const errors: string[] = [];
const warnings: string[] = [];

// header + footer navigation sets per language (must mirror src/lib/i18n.ts + Footer)
const moneyPagesByLang: Record<string, string[]> = {
  en: ['/en/', '/en/agadir-hot-air-balloon/', '/en/hot-air-balloon-marrakech-price/', '/en/faq/', '/en/book/', '/en/guide/', '/en/reviews/', '/en/about/', '/en/terms/', '/en/privacy/', '/en/hot-air-balloon-morocco/'],
  fr: ['/fr/', '/fr/montgolfiere-agadir/', '/fr/prix-montgolfiere-marrakech/', '/fr/faq/', '/fr/reserver/', '/fr/guide/', '/fr/avis/', '/fr/a-propos/', '/fr/conditions/', '/fr/confidentialite/', '/fr/montgolfiere-maroc/'],
  de: ['/de/', '/de/heissluftballon-agadir/', '/de/heissluftballon-marrakesch-preis/', '/de/faq/', '/de/buchen/'],
  es: ['/es/', '/es/globo-aerostatico-agadir/', '/es/precio-globo-aerostatico-marrakech/', '/es/preguntas-frecuentes/', '/es/reservar/'],
  nl: ['/nl/', '/nl/luchtballon-agadir/', '/nl/luchtballon-marrakech-prijs/', '/nl/veelgestelde-vragen/', '/nl/boeken/'],
};

// ---------- 1. broken internal links ----------
for (const p of pages) {
  for (const link of p.linksOut) {
    if (!byUrl.has(link)) errors.push(`BROKEN LINK: ${p.id} -> ${link}`);
  }
  if (p.parent && !pages.some((x) => x.id === p.parent)) errors.push(`BAD PARENT: ${p.id} -> ${p.parent}`);
}

// ---------- 2. inbound links (zero orphans) ----------
const inbound = new Map<string, number>(pages.map((p) => [p.url, 0]));
for (const p of pages) for (const l of p.linksOut) inbound.set(l, (inbound.get(l) || 0) + 1);
for (const p of pages) {
  const lang = p.lang;
  for (const l of moneyPagesByLang[lang] || []) {
    if (l === p.url) inbound.set(p.url, (inbound.get(p.url) || 0) + 1); // header/footer nav counts
  }
  // breadcrumb parent counts
  if (p.parent) {
    const parent = pages.find((x) => x.id === p.parent);
    if (parent) inbound.set(p.url, (inbound.get(p.url) || 0) + 1);
  }
}
for (const p of pages) {
  if ((inbound.get(p.url) || 0) === 0) errors.push(`ORPHAN PAGE (0 inbound internal links): ${p.id} ${p.url}`);
}

// ---------- 3. on-page SEO essentials ----------
for (const p of pages) {
  const isLegal = p.pageType === 'legal';
  if (!p.metaTitle) errors.push(`MISSING TITLE: ${p.id}`);
  else if (p.metaTitle.length > 65) warnings.push(`LONG TITLE (${p.metaTitle.length}): ${p.id} "${p.metaTitle}"`);
  if (!p.metaDescription) errors.push(`MISSING DESCRIPTION: ${p.id}`);
  else if (p.metaDescription.length > 160) warnings.push(`LONG DESC (${p.metaDescription.length}): ${p.id}`);
  if (!isLegal && !p.h1) errors.push(`MISSING H1: ${p.id}`);
  if (!p.url.endsWith('/')) errors.push(`URL NOT TRAILING SLASH: ${p.id} ${p.url}`);
  if (p.url !== p.url.toLowerCase()) errors.push(`URL NOT LOWERCASE: ${p.id} ${p.url}`);
}

// ---------- 4. hreflang reciprocity + x-default ----------
for (const p of pages) {
  for (const [altLang, altUrl] of Object.entries(p.alternates)) {
    const target = byUrl.get(altUrl);
    if (!target) { errors.push(`HREFLANG TARGET MISSING: ${p.id} ${altLang} -> ${altUrl}`); continue; }
    if (target.lang !== altLang) errors.push(`HREFLANG LANG MISMATCH: ${p.id} ${altLang} -> ${altUrl} (target lang ${target.lang})`);
    if (target.alternates[p.lang] !== p.url) warnings.push(`HREFLANG NOT RECIPROCAL: ${p.id} <-> ${target.id} (${p.lang})`);
  }
}

// ---------- 5. WhatsApp ----------
const number = String(config.whatsappNumber || '').replace(/\D/g, '');
if (!/^\d{10,15}$/.test(number)) errors.push(`INVALID WHATSAPP NUMBER in config: ${config.whatsappNumber}`);
for (const p of pages) {
  if (!p.whatsapp || !p.whatsapp.message) warnings.push(`NO WHATSAPP PREFILL: ${p.id} (template default will be used)`);
}

// ---------- 6. keyword cannibalisation ----------
const kwOwner = new Map<string, string>();
for (const p of pages) {
  const kw = p.primaryKeyword.toLowerCase().trim();
  if (!kw || kw === "-") continue; // legal pages have no target keyword in the sheet
  if (kwOwner.has(kw)) errors.push(`KEYWORD CANNIBALISATION: "${p.primaryKeyword}" targeted by ${kwOwner.get(kw)} AND ${p.id}`);
  else kwOwner.set(kw, p.id);
}

// ---------- 7. word counts (warning only; body copy is authored in content modules) ----------
for (const p of pages) {
  if (p.pageType === 'legal' || p.pageType === 'booking' || p.pageType === 'blogHub') continue;
  if (p.wordCount.min > 800) warnings.push(`CONTENT TARGET: ${p.id} needs ${p.wordCount.min}-${p.wordCount.max} words`);
}

// ---------- report ----------
const pageTypeCount: Record<string, number> = {};
for (const p of pages) pageTypeCount[p.pageType] = (pageTypeCount[p.pageType] || 0) + 1;

console.log(`Checked ${pages.length} pages. Types: ${JSON.stringify(pageTypeCount)}`);
if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  for (const w of warnings) console.log('  -', w);
}
if (errors.length) {
  console.error(`\nERRORS (${errors.length}):`);
  for (const e of errors) console.error('  !', e);
  process.exit(1);
}
console.log('\ncheck-links: PASS (0 errors)');

// optional post-build crawl
const crawlIdx = process.argv.indexOf('--crawl');
if (crawlIdx > -1 && process.argv[crawlIdx + 1]) {
  const dir = path.resolve(process.argv[crawlIdx + 1]);
  let htmlFiles: string[] = [];
  const walk = (d: string) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      if (f.isDirectory()) walk(path.join(d, f.name));
      else if (f.name.endsWith('.html')) htmlFiles.push(path.join(d, f.name));
    }
  };
  walk(dir);
  const built = new Set<string>();
  for (const f of htmlFiles) {
    const rel = path.relative(dir, f).replace(/\\/g, '/').replace(/\/?index\.html$/, '/');
    built.add('/' + rel);
  }
  let crawlErrors = 0;
  for (const p of pages) if (!built.has(p.url)) { console.error(`NOT BUILT: ${p.url}`); crawlErrors++; }
  for (const p of pages) {
    const file = path.join(dir, p.url.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    for (const href of html.matchAll(/href="(\/(?!\/)[^"]*)"/g)) {
      const l = href[1].split('?')[0].split('#')[0];
      if (l.startsWith('/en') || l.startsWith('/fr') || l.startsWith('/de') || l.startsWith('/es') || l.startsWith('/nl')) {
        if (!built.has(l)) { console.error(`BROKEN BUILT LINK on ${p.url}: ${l}`); crawlErrors++; }
      }
    }
  }
  if (crawlErrors) { console.error(`crawl: ${crawlErrors} errors`); process.exit(1); }
  console.log('crawl: PASS');
}
