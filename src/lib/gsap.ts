"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Einmalige Registrierung (idempotent)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Media-Query, unter der Animationen laufen dürfen.
 * gsap.matchMedia() räumt Tweens bei Wechsel automatisch auf —
 * damit ist prefers-reduced-motion sauber respektiert.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
