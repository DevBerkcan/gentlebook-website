"use client";

import { useEffect, useRef } from "react";
import {
  Scissors,
  Brush,
  Hand,
  Flower2,
  HeartPulse,
  PenTool,
  Activity,
} from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Scissors, Brush, Flower2, Hand, HeartPulse, PenTool, Activity];

/**
 * Branchen als horizontal scrollende Card-Reihe:
 * ─ nativ per Touch/Trackpad scrollbar (überall bedienbar)
 * ─ zusätzlich driftet die Reihe scroll-gesteuert leicht nach links (GSAP)
 */
export default function Industries({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      const el = track.current;
      if (!el) return;
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow <= 0) return;
      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -Math.min(overflow, 320),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        }
      );
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="industries"
      className="overflow-hidden py-20 sm:py-28"
      aria-labelledby="industries-title"
    >
      <div className="u-container">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.industries.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="industries-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {dict.industries.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-mist">{dict.industries.text}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <div
          ref={track}
          className="flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:overflow-visible lg:px-[max(2rem,calc((100vw-72rem)/2))]"
          style={{ scrollbarWidth: "none" }}
          role="list"
        >
          {dict.industries.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={item.title}
                role="listitem"
                className="w-64 shrink-0 rounded-3xl border border-ink/5 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
