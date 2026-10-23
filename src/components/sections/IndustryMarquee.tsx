"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

function Mark() {
  return (
    <svg viewBox="0 0 48 48" className="mx-6 h-[0.45em] w-[0.45em] shrink-0 text-violet sm:mx-10" fill="none" aria-hidden="true">
      <circle cx="24" cy="19" r="11.5" stroke="currentColor" strokeWidth="5" />
      <path d="M35.5 19 V29.5 a11.5 11.5 0 0 1 -19 8.6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Endlos laufendes Branchen-Band. Scroll-Geschwindigkeit beschleunigt das Band,
 * die Scroll-Richtung kehrt es um.
 */
export default function IndustryMarquee({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loop = gsap.to(track.current, { xPercent: -50, duration: 50, ease: "none", repeat: -1 });
      let direction = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          direction = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(loop, {
            timeScale: direction * boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
            },
          });
        },
      });
      return () => {
        st.kill();
        loop.kill();
      };
    });
    return () => mm.revert();
  }, []);

  const items = dict.industries.items.map((i) => i.title);
  const row = (copy: number) =>
    items.map((title, i) => (
      <span key={`${copy}-${title}`} className="flex items-center">
        <span className={cn(i % 2 === 0 ? "text-white" : "text-outline")}>{title}</span>
        <Mark />
      </span>
    ));

  return (
    <div
      ref={root}
      data-nav-theme="dark"
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.07] bg-night py-7 sm:py-9"
    >
      <div
        ref={track}
        className="flex w-max whitespace-nowrap font-display text-[clamp(2rem,5vw,4.2rem)] font-medium italic leading-none tracking-tight"
      >
        <div className="flex items-center">{row(0)}</div>
        <div className="flex items-center">{row(1)}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
