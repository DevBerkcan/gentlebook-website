"use client";

import { useEffect, useRef } from "react";
import { PhoneOff, UserX, FileSpreadsheet, MoonStar } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [PhoneOff, UserX, FileSpreadsheet, MoonStar];

export default function Pain({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        "[data-pain-card]",
        { opacity: 0, y: 46, rotate: (i) => (i % 2 === 0 ? -1.5 : 1.5) },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink py-20 text-white sm:py-28"
      aria-labelledby="pain-title"
    >
      {/* dezenter Gradient-Schein im Dunkeln */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
      />

      <div className="u-container relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className="bg-white/10 text-lavender">{dict.pain.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="pain-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight"
            >
              {dict.pain.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.pain.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={item.title}
                data-pain-card
                className="motion-safe:opacity-0 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lavender">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
