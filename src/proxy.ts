import { NextResponse, type NextRequest } from "next/server";

/**
 * i18n-Routing:
 * ─ Deutsch (Standard) lebt OHNE Präfix unter "/", intern gerendert als /de/...
 * ─ Englisch lebt unter /en/...
 * ─ /de/... wird auf die saubere URL ohne Präfix umgeleitet (kein Duplicate Content)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /de → / (Redirect, damit es nur EINE deutsche URL gibt)
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/de/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // /en → durchlassen (Segment [locale] = "en")
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Alles andere → intern als Deutsch rendern (URL bleibt ohne Präfix)
  const url = request.nextUrl.clone();
  url.pathname = `/de${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Statische Assets, Next-Interna & Metadaten-Routen ausnehmen
  matcher: [
    "/((?!_next|api|favicon.ico|icon.svg|sitemap.xml|robots.txt|opengraph-image|.*\\..*).*)",
  ],
};
