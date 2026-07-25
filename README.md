# GentleBook — Marketing- & Sales-Funnel-Website

One-Page-Funnel für GentleBook (Online-Terminbuchung für Salons, Barbershops, Beauty-Studios & Praxen).
Zielgruppe: Geschäftsinhaber:innen (B2B) → Trial-Registrierung.

## Stack

- **Next.js 14** (App Router) · TypeScript · TailwindCSS
- **Lenis** — Smooth Scrolling (deaktiviert bei `prefers-reduced-motion`)
- **GSAP + ScrollTrigger** — Section-Reveals, Parallax, Counter, Text-Masken (via `gsap.matchMedia`, respektiert Reduced Motion automatisch)
- **react-three-fiber + drei** — 3D-Hero (schwebende Termin-Kacheln um organischen Gradient-Körper), lazy geladen mit `ssr: false` und statischem SVG-Fallback (kein WebGL / Low-End / Reduced Motion)
- Zweisprachig **DE (Standard, ohne URL-Präfix) / EN (`/en`)** — Middleware-basiert, mit hreflang-Alternates

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktions-Build
```

## Wichtige Stellen zum Anpassen

| Was | Wo |
|---|---|
| **Preise (TBD-Platzhalter)** | `src/lib/pricing.ts` — eine Datei, Rest zieht automatisch |
| Gesamte Copy (DE/EN) | `src/lib/dictionaries.ts` |
| Social Proof (Kennzahlen/Zitate/Logos) | `dictionaries.ts` → `socialProof` + `src/components/sections/SocialProof.tsx` (als Platzhalter markiert) |
| Domain (Metadata/Sitemap/Robots) | `src/app/[locale]/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` (`gentlebook.app` als Platzhalter) |
| Rechtstexte | `src/components/layout/LegalPage.tsx` — Routen `/impressum`, `/datenschutz`, `/agb` sind leere Gerüste, Inhalte kommen vom Betreiber |
| Brand-Farben/Schatten | `tailwind.config.ts` |
| 3D-Szene | `src/components/three/HeroScene.tsx`, Fallback: `public/hero-fallback.svg` |

## Performance-Notizen

- 3D-Bundle wird per `next/dynamic` erst client-seitig geladen (kein SSR, kein Blocking von LCP)
- Nur `transform`/`opacity` animiert, GSAP-Startzustände via CSS (`motion-safe`) → kein FOUC, kein CLS
- `dpr` gedeckelt auf 1.75, keine Environment-HDRs, low-poly Geometrie
- Fonts über `next/font` (Fraunces + Figtree), `display: swap`
