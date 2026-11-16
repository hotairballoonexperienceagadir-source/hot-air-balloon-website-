import { absUrl } from "@/lib/config";
import { hreflangOf, pages } from "@/lib/pages";

export const dynamic = "force-static";

/**
 * sitemap-index.xml — every page of the plan with hreflang xhtml:link alternates
 * (self + languages listed in the sheet + x-default pointing at the EN version).
 */
export function GET() {
  const priorities: Record<string, string> = { P0: "0.9", P1: "0.7", P2: "0.5" };
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages
    .map((p) => {
      const alts = hreflangOf(p);
      const links = alts
        .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${absUrl(a.url)}"/>`)
        .join("");
      const pr = p.url === "/en/" ? "1.0" : priorities[p.priority] || "0.5";
      return `  <url>
    <loc>${absUrl(p.url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pr}</priority>${links}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
