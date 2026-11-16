/**
 * SEO Plan loader — reads upload/SEO_Plan_Hot_Air_Balloon_Morocco.xlsx (sheet 2-Site Architecture)
 * and generates /data/pages.json (one entry per page, all sheet columns normalized).
 * Run: bun scripts/load-seo-plan.mjs
 */
import XLSX from 'xlsx';
import fs from 'fs';

const FILE = '/home/z/my-project/upload/SEO_Plan_Hot_Air_Balloon_Morocco.xlsx';
const OUT = '/home/z/my-project/data/pages.json';
const config = JSON.parse(fs.readFileSync('/home/z/my-project/data/config.json', 'utf8'));

const LANGS = ['en', 'fr', 'de', 'es', 'nl'];

// ---------- helpers ----------
function parseAlternates(raw) {
  const map = {};
  if (!raw) return map;
  for (const part of String(raw).split('|')) {
    const m = part.trim().match(/^([a-z]{2}):\s*(\/\S*\/?)$/);
    if (m) map[m[1]] = m[2].endsWith('/') ? m[2] : m[2] + '/';
  }
  return map;
}

function parseLinks(raw) {
  if (!raw) return [];
  return String(raw)
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('/'))
    .map((s) => (s.endsWith('/') ? s : s + '/'));
}

function parseWa(raw) {
  if (!raw) return null;
  const m = String(raw).match(/^https:\/\/wa\.me\/([\dX]+)\?text=(.+)$/);
  if (!m) return null;
  const text = m[2].replace(/%20/g, ' ').trim();
  return { number: m[1], message: text };
}

function normalizePageType(raw) {
  const t = String(raw || '').toLowerCase();
  if (t.includes('home') || t.includes('accueil')) return 'home';
  if (t.includes('city') || t.includes('ville')) return 'city';
  if (t.includes('produit') || t.includes('product')) return 'product';
  if (t.includes('pilier') || t.includes('pillar')) return 'pillar';
  if (t.includes('pricing') || t.includes('tarifs')) return 'pricing';
  if (t.includes('trust') && t.includes('e-e-a-t')) return 'about';
  if (t.includes('confiance') && t.includes('e-e-a-t')) return 'about';
  if (t.includes('trust') || t.includes('confiance')) return 'reviews';
  if (t.includes('faq')) return 'faq';
  if (t.includes('booking') || t.includes('réservation') || t.includes('reservation')) return 'booking';
  if (t.includes('blog hub') || t.includes('hub blog')) return 'blogHub';
  if (t.includes('guide')) return 'guide';
  if (t.includes('legal')) return 'legal';
  return 'info';
}

function parseWordCount(raw) {
  const m = String(raw || '').match(/(\d+)\s*-\s*(\d+)/);
  if (!m) return { min: 400, max: 800 };
  return { min: Number(m[1]), max: Number(m[2]) };
}

function parseSchema(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/\/|\+/)
    .map((s) => s.trim().replace(/\(.*\)/, '').trim())
    .filter(Boolean);
}

// price tokens inside meta title / description, per language formatting
function priceIn(lang, n) {
  const s = String(n);
  switch (lang) {
    case 'en': return `${Number(n).toLocaleString('en-US')} MAD`;
    case 'fr': return `${Number(n).toLocaleString('fr-FR')} MAD`;
    case 'de': return `${Number(n).toLocaleString('de-DE')} MAD`;
    case 'es': return `${Number(n).toLocaleString('es-ES')} MAD`;
    case 'nl': return `${Number(n).toLocaleString('nl-NL')} MAD`;
    default: return `${n} MAD`;
  }
}
function injectPrices(str, lang) {
  let out = String(str || '');
  // match "1,500 MAD" / "1 500 MAD" / "1.500 MAD" / "1500 MAD"
  out = out.replace(/1[\.,\s\u202f]?500 MAD/g, priceIn(lang, config.prices.classic));
  return out;
}

function parseSecondary(raw) {
  if (!raw) return [];
  return String(raw)
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const m = s.match(/^(.+?)\s*\((\d+)\)$/);
      return m ? { kw: m[1].trim(), volume: Number(m[2]) } : { kw: s, volume: null };
    });
}

// ---------- main ----------
const wb = XLSX.readFile(FILE);
const ws = wb.Sheets['2-Site Architecture'];
const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

const pages = [];
for (const r of rows) {
  const lang = String(r['Lang'] || '').trim();
  if (!LANGS.includes(lang)) continue;
  const urlFull = String(r['URL'] || '').trim();
  let url = urlFull.replace(/^https?:\/\/[^/]+/, '');
  if (!url) url = '/';
  if (!url.endsWith('/')) url += '/';
  if (url === '//') url = '/' + lang + '/';

  const wa = parseWa(r['WhatsApp CTA link']);

  pages.push({
    id: String(r['Page ID'] || '').trim(),
    lang,
    priority: String(r['Priority'] || '').trim(),
    pageType: normalizePageType(r['Page type']),
    pageTypeRaw: String(r['Page type'] || '').trim(),
    url,
    parent: (() => {
      const p = String(r['Parent'] || '').trim();
      return p && p !== '-' ? p : null;
    })(),
    primaryKeyword: String(r['Primary keyword'] || '').trim(),
    primaryVolume: r['Volume (Semrush/GKP)'] !== '' ? Number(r['Volume (Semrush/GKP)']) || null : null,
    secondaryKeywords: parseSecondary(r['Secondary / supporting keywords']),
    intent: String(r['Intent'] || '').trim(),
    metaTitle: injectPrices(r['Meta title'], lang),
    metaDescription: injectPrices(r['Meta description'], lang),
    h1: String(r['H1'] || '').trim(),
    wordCount: parseWordCount(r['Word count']),
    schema: parseSchema(r['Schema']),
    linksOut: parseLinks(r['Internal links OUT (in body)']),
    alternates: parseAlternates(r['hreflang alternates']),
    whatsapp: wa,
  });
}

// sanity: x-default + self are added by the sitemap/head builder, not stored here.

// Compact alternates map for the client-side language switcher (URL -> lang -> URL)
const altMap = {};
for (const p of pages) {
  altMap[p.url] = { [p.lang]: p.url, ...p.alternates };
}
fs.writeFileSync('/home/z/my-project/data/alternates.json', JSON.stringify(altMap, null, 1));

fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), langs: LANGS, pages }, null, 2));

// ---------- report ----------
const byLang = {};
for (const p of pages) byLang[p.lang] = (byLang[p.lang] || 0) + 1;
console.log('TOTAL pages:', pages.length, '| by lang:', JSON.stringify(byLang));
console.log('\nID | P | lang | type | url | parent | h1');
for (const p of pages) {
  console.log(`${p.id} | ${p.priority} | ${p.lang} | ${p.pageType} | ${p.url} | ${p.parent || '-'} | ${p.h1}`);
}
// integrity checks
const urlSet = new Set(pages.map((p) => p.url));
const idSet = new Set(pages.map((p) => p.id));
let broken = 0, missingAlt = 0;
for (const p of pages) {
  for (const l of p.linksOut) if (!urlSet.has(l)) { console.log('BROKEN OUT:', p.id, '->', l); broken++; }
  if (p.parent && !idSet.has(p.parent)) { console.log('BAD PARENT:', p.id, p.parent); broken++; }
  for (const [l, u] of Object.entries(p.alternates)) if (!urlSet.has(u)) { console.log('BROKEN ALT:', p.id, l, u); missingAlt++; }
}
console.log(`\nBroken internal links: ${broken} | broken alternates: ${missingAlt}`);
