"use client";

import { useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Vorher/Nachher: Beim Scrollen wird der alte Alltag Zeile für Zeile
 * durchgestrichen, während auf der GentleBook-Seite die Haken einrasten.
 */
export default function BeforeAfter({ dict, index }: { dict: Dictionary; index?: string }) {
  const t = dict.beforeAfter;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q("[data-compare]")[0], start: "top 70%", end: "bottom 55%", scrub: 0.6 },
      });
      const strikes = q("[data-strike]");
      const rows = q("[data-without-row]");
      const checks = q("[data-check]");
      const withRows = q("[data-with-row]");
      strikes.forEach((line, i) => {
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, i * 0.5)
          .to(rows[i], { opacity: 0.4, duration: 0.3 }, i * 0.5 + 0.2);
      });
      checks.forEach((check, i) => {
        tl.fromTo(check, { scale: 0, rotate: -45 }, { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2.5)" }, i * 0.5 + 0.15)
          .fromTo(withRows[i], { opacity: 0.25, x: 12 }, { opacity: 1, x: 0, duration: 0.35 }, i * 0.5 + 0.15);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-32" aria-labelledby="before-after-title">
      <div className="u-container">
        <SectionHeading id="before-after-title" index={index} eyebrow={t.eyebrow} title={t.title} emphasize={3} />

        <div data-compare className="mt-16 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-ink/[0.08] bg-white/50 p-8 sm:p-10">
            <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
              {t.withoutHeading}
            </h3>
            <ul className="mt-8 divide-y divide-ink/[0.06]">
              {t.withoutItems.map((item) => (
                <li key={item} data-without-row className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink/40">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="relative text-ink/70">
                    {item}
                    <span
                      data-strike
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-1/2 h-[1.5px] w-full origin-left scale-x-0 bg-ink/50 motion-reduce:hidden"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-8 text-white shadow-stage sm:p-10">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-teal/25 blur-3xl" />
            <h3 className="relative flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
              <span className="h-px w-8 bg-lavender/50" aria-hidden="true" />
              {t.withHeading}
            </h3>
            <ul className="relative mt-8 divide-y divide-white/[0.08]">
              {t.withItems.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4">
                  <span data-check className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span data-with-row className="font-medium text-white/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
