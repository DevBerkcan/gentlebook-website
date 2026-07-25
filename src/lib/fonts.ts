import localFont from "next/font/local";

/**
 * Lokal gehostete Variable Fonts (Fontsource/OFL) —
 * kein Google-Fonts-Request, deterministische Builds, DSGVO-freundlich.
 *
 * Fraunces: warme, charaktervolle Display-Serif — passt zu Beauty/Lifestyle
 * statt kalter Corporate-SaaS-Optik.
 * Figtree: freundliche, sehr gut lesbare Sans für Fließtext & UI.
 */
export const fontDisplay = localFont({
  src: [
    {
      path: "../fonts/fraunces-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/fraunces-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = localFont({
  src: [
    {
      path: "../fonts/figtree-latin-wght-normal.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
