import { NextResponse, type NextRequest } from "next/server";

const LANG_PREFIX = /^\/(en|fr|de|es|nl)(\/|$)/;

/**
 * - "/" 308-redirects to "/en/" (no IP or browser-language auto-redirect; users pick via the switcher)
 * - Any non-language path is rewritten to the EN version so visitors always land on a real,
 *   localized page (unknown slugs render the localized 404).
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/en/", req.url), 308);
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/images") || pathname.startsWith("/api") || pathname === "/robots.txt" || pathname === "/sitemap-index.xml" || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  if (!LANG_PREFIX.test(pathname)) {
    return NextResponse.rewrite(new URL(`/en${pathname}${search}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
