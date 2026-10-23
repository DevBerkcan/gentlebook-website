"use client";

import { useEffect, useRef } from "react";
import { Scissors, Brush, Hand, Flower2, HeartPulse, PenTool, Activity } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, DESKTOP_MOTION } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Scissors, Brush, Flower2, Hand, HeartPulse, PenTool, Activity];

/**
 * Branchen als horizontale Fahrt:
 * ─ Desktop: Sektion pinnt, vertikales Scrollen schiebt die Karten seitlich
 * ─ Mobil / Reduced Motion: native Wisch-Reihe mit Scroll-Snap
 */
export default function Industries({ dict, index }: { dict: Dictionary; index?: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const total = dict.industries.items.length;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const el = track.current;
      if (!el) return;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const current = Math.min(total, Math.floor(self.progress * (total - 1)) + 1);
            if (counter.current) counter.current.textContent = String(current).padStart(2, "0");
            gsap.set("[data-ind-progress]", { scaleX: self.progress });
          },
        },
      });
    });
    return () => mm.revert();
  }, [total]);

  return (
    <section ref={root} id="industries" className="relative overflow-hidden" aria-labelledby="industries-title">
      <div className="py-24 sm:py-32 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-10">
        <div className="u-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="industries-title"
            index={index}
            eyebrow={dict.industries.eyebrow}
            title={dict.industries.title}
            text={dict.industries.text}
            emphasize={3}
          />
          <div className="hidden w-56 shrink-0 lg:block" aria-hidden="true">
            <p className="font-display text-sm text-mist">
              <span ref={counter} className="text-2xl font-medium text-ink">01</span> / {String(total).padStart(2, "0")}
            </p>
            <div className="mt-3 h-px w-full bg-ink/10">
              <div data-ind-progress className="h-full origin-left scale-x-0 bg-ink" />
            </div>
          </div>
        </div>

        <div
          ref={track}
          role="list"
          className="industries-track no-scrollbar mt-14 lg:mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:gap-5 lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))]"
        >
          {dict.industries.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={item.title}
                role="listitem"
                className="group relative flex h-[23rem] w-[78vw] max-w-[20rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-ink/[0.07] bg-white p-7 transition-colors duration-700 ease-out-expo hover:border-transparent hover:bg-night lg:h-[min(26rem,44vh)] lg:w-[23rem] lg:max-w-none"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/0 blur-3xl transition-colors duration-700 group-hover:bg-violet/50"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-teal/0 blur-3xl transition-colors duration-700 group-hover:bg-teal/30"
                />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-porcelain text-violet transition-all duration-700 ease-out-expo group-hover:rotate-[-12deg] group-hover:bg-white/10 group-hover:text-lavender">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm italic text-ink/30 transition-colors duration-700 group-hover:text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-auto font-display text-[1.85rem] font-medium leading-tight tracking-tight text-ink transition-colors duration-700 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-mist transition-colors duration-700 group-hover:text-white/65">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
