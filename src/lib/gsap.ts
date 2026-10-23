"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Einmalige Registrierung (idempotent)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
}

export { gsap, ScrollTrigger, SplitText };

/**
 * Media-Query, unter der Animationen laufen dürfen.
 * gsap.matchMedia() räumt Tweens bei Wechsel automatisch auf —
 * damit ist prefers-reduced-motion sauber respektiert.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Große Bildschirme mit erlaubter Bewegung — für gepinnte Scroll-Szenen. */
export const DESKTOP_MOTION = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
