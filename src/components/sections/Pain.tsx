"use client";

import { useEffect, useRef } from "react";
import { PhoneOff, UserX, FileSpreadsheet, MoonStar } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [PhoneOff, UserX, FileSpreadsheet, MoonStar];

/**
 * Problem-Sektion: Die Aussage wird beim Scrollen Wort für Wort „ausgeleuchtet",
 * danach ziehen die vier Schmerzpunkte mit wachsender Haarlinie ein.
 */
export default function Pain({ dict, index }: { dict: Dictionary; index?: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const split = SplitText.create(q("[data-pain-statement]")[0], {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: q("[data-pain-statement]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
            }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>(q("[data-pain-item]")).forEach((item, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q("[data-pain-grid]")[0], start: "top 78%", once: true },
          delay: i * 0.12,
        });
        tl.fromTo(item.querySelector("[data-pain-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" })
          .fromTo(
            item.querySelectorAll("[data-pain-in]"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 },
            0.15
          );
      });

      return () => split.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-night pb-28 pt-24 text-white sm:pb-36 sm:pt-32"
      aria-labelledby="pain-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-violet/20 blur-[120px]"
      />

      <div className="u-container relative">
        <Eyebrow index={index} tone="dark">
          {dict.pain.eyebrow}
        </Eyebrow>
        <h2
          id="pain-title"
          data-pain-statement
          className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5.6vw,5rem)] font-medium leading-[1.05] tracking-[-0.025em]"
        >
          {dict.pain.title}
        </h2>

        <div data-pain-grid className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {dict.pain.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={item.title} data-pain-item className="group relative pt-8">
                <span data-pain-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
                <div data-pain-in className="flex items-center justify-between">
                  <span className="font-display text-5xl font-light italic text-white/25 transition-colors duration-500 group-hover:text-lavender">
                    0{i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lavender transition-all duration-500 group-hover:rotate-[-12deg] group-hover:border-violet group-hover:bg-violet group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                </div>
                <h3 data-pain-in className="mt-8 text-xl font-semibold">
                  {item.title}
                </h3>
                <p data-pain-in className="mt-3 text-[0.95rem] leading-relaxed text-white/55">
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
