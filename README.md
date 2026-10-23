# GentleBook — Marketing- & Sales-Funnel-Website

One-Page-Funnel für GentleBook (Online-Terminbuchung für Salons, Barbershops, Beauty-Studios & Praxen).
Zielgruppe: Geschäftsinhaber:innen (B2B) → Trial-Registrierung.

## Stack

- **Next.js 14** (App Router) · TypeScript · TailwindCSS
- **Lenis** — Smooth Scrolling (deaktiviert bei `prefers-reduced-motion`)
- **GSAP + ScrollTrigger** — Section-Reveals, Parallax, Counter, Text-Masken (via `gsap.matchMedia`, respektiert Reduced Motion automatisch)
- **WebGL-Polarlicht** — eigener Fragment-Shader (`src/components/effects/AuroraCanvas.tsx`, ohne three.js), halbe Auflösung, pausiert außerhalb des Viewports, CSS-Verlauf als Fallback
- **Gepinnte Hero-Bühne** — der Wochenkalender richtet sich beim Scrollen auf und füllt sich Termin für Termin (`src/components/sections/Hero.tsx` + `hero/HeroCalendar.tsx`); mobil & bei Reduced Motion normaler Fluss
- Zweisprachig **DE (Standard, ohne URL-Präfix) / EN (`/en`)** — Middleware-basiert, mit hreflang-Alternates

## Starten

```bash
copy .env.example .env.local
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktions-Build
```

In Vercel muss `NEXT_PUBLIC_GENTLEBOOK_APP_URL` pro Umgebung gesetzt werden:
Staging verweist auf die Staging-App, Production auf die Live-App. Dadurch
führen Login- und CTA-Links aus einem Website-Preview nicht versehentlich nach
Production.

## Wichtige Stellen zum Anpassen

| Was | Wo |
|---|---|
| **Preise (TBD-Platzhalter)** | `src/lib/pricing.ts` — eine Datei, Rest zieht automatisch |
| Gesamte Copy (DE/EN) | `src/lib/dictionaries.ts` |
| Social Proof (Kennzahlen/Zitate/Logos) | `dictionaries.ts` → `socialProof` + `src/components/sections/SocialProof.tsx` (als Platzhalter markiert) |
| **Produkt-Video** (erste Einblicke) | Datei einfach unter `public/videos/produkt-einblick.mp4` ablegen (optional Vorschaubild `public/videos/produkt-einblick-poster.jpg`) — die Sektion (`src/components/sections/ProductVideo.tsx`) erkennt die Datei automatisch und schaltet vom Platzhalter auf den echten Player um, keine Code-Änderung nötig |
| Domain (Metadata/Sitemap/Robots) | `src/app/[locale]/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` (`gentlebook.app` als Platzhalter) |
| Rechtstexte | `src/components/layout/LegalPage.tsx` — Routen `/impressum`, `/datenschutz`, `/agb` sind leere Gerüste, Inhalte kommen vom Betreiber |
| Brand-Farben/Schatten | `tailwind.config.ts` |
| Hero-Bühne & Kalender-Mockup | `src/components/sections/Hero.tsx`, `src/components/sections/hero/HeroCalendar.tsx` |
| Gemeinsame Bausteine (Section-Kopf, Magnet-Button, Spotlight) | `src/components/ui/` · Effekte: `src/components/effects/` |

## Performance-Notizen

- Shader-Hintergrund rendert in halber Auflösung und nur sichtbar; Reduced Motion zeigt ein Standbild
- Nur `transform`/`opacity` animiert, GSAP-Startzustände via CSS (`motion-safe`) → kein FOUC, kein CLS
- `dpr` gedeckelt auf 1.75, keine Environment-HDRs, low-poly Geometrie
- Fonts über `next/font` (Fraunces + Figtree), `display: swap`
