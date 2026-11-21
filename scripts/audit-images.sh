#!/usr/bin/env bash
# Audits every image element on all 8 pages: expands galleries, scrolls
# through the full page, then reports images that are broken or unloaded.
set -u
cd /home/z/my-project

PAGES=(
  "http://localhost:3000/"
  "http://localhost:3000/marrakech-flights/"
  "http://localhost:3000/fr/"
  "http://localhost:3000/fr/montgolfiere-marrakech/"
  "http://localhost:3000/de/"
  "http://localhost:3000/de/ballonfahrt-marrakesch/"
  "http://localhost:3000/es/"
  "http://localhost:3000/es/globo-aerostatico-marrakech/"
)

JS_AUDIT='(() => {
  const imgs = [...document.querySelectorAll("img")];
  const bad = [];
  for (const i of imgs) {
    const src = i.currentSrc || i.getAttribute("src") || "";
    if (!src || src.startsWith("data:")) continue;
    const ok = i.complete && i.naturalWidth > 0;
    const invisible = i.offsetWidth === 0 && i.offsetHeight === 0;
    if (!ok && !invisible) bad.push({src: src.slice(0,140), complete: i.complete, nw: i.naturalWidth, alt: (i.alt||"").slice(0,40)});
  }
  const seeMore = [...document.querySelectorAll("button")].find(b => /see more|voir plus|mehr anzeigen|ver m|afficher plus|show more/i.test(b.textContent||""));
  return JSON.stringify({total: imgs.length, bad, seeMoreFound: !!seeMore});
})()'

for url in "${PAGES[@]}"; do
  echo "==================== $url"
  agent-browser open "$url" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1
  # expand gallery first so hidden images get requested
  sm=$(agent-browser eval "(() => { const b = [...document.querySelectorAll('button')].find(x => /see more|voir plus|mehr anzeigen|ver m/i.test((x.textContent||''))); if (b) { b.click(); return 'clicked'; } return 'none'; })()" 2>/dev/null)
  echo "  see-more: $sm"
  # scroll stepwise to bottom to trigger lazy loading
  for i in $(seq 1 14); do agent-browser eval "window.scrollBy(0, 700)" >/dev/null 2>&1; sleep 0.4; done
  agent-browser wait --load networkidle >/dev/null 2>&1
  sleep 1.5
  agent-browser eval "$JS_AUDIT" 2>/dev/null
  echo ""
done
