"use client";

import { useEffect, useRef } from "react";
import {
  CalendarClock,
  Users,
  MailCheck,
  ListPlus,
  UserX,
  Palette,
  ContactRound,
  BarChart3,
} from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [
  CalendarClock,
  Users,
  MailCheck,
  ListPlus,
  UserX,
  Palette,
  ContactRound,
  BarChart3,
];

export default function Features({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        "[data-feature-card]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.08, grid: "auto", from: "start" },
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        }
      );
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="features"
      className="bg-lavender/40 py-20 sm:py-28"
      aria-labelledby="features-title"
    >
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{dict.features.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="features-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {dict.features.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.features.items.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={f.title}
                data-feature-card
                className="motion-safe:opacity-0 group rounded-3xl border border-white/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient-soft text-violet transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
