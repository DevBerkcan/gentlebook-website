"use client";

import { useEffect, useRef } from "react";
import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";

type Value = "no" | "partial" | "yes";

function ValueIcon({ value }: { value: Value }) {
  if (value === "yes") {
    return (
      <span data-yes className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-lavender text-ink/50">
        <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-ink/[0.05] text-ink/30">
      <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

const valueLabel: Record<Locale, Record<Value, string>> = {
  de: { no: "Nein", partial: "Teilweise", yes: "Ja" },
  en: { no: "No", partial: "Partly", yes: "Yes" },
};

export default function ComparisonTable({ dict, locale = "de", index }: { dict: Dictionary; locale?: Locale; index?: string }) {
  const t = dict.comparison;
  const root = useRef<HTMLElement>(null);
  const last = t.columns.length - 1;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const trigger = { trigger: q("table")[0], start: "top 80%", once: true };
      gsap.from(q("[data-highlight-col]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 1.4, ease: "expo.out", scrollTrigger: trigger });
      gsap.from(q("tbody tr"), { opacity: 0, y: 24, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.2, scrollTrigger: trigger });
      gsap.from(q("[data-yes]"), { scale: 0, rotate: -60, duration: 0.7, ease: "back.out(2.4)", stagger: 0.08, delay: 0.5, scrollTrigger: trigger });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-32" aria-labelledby="comparison-title">
      <div className="u-container">
        <SectionHeading id="comparison-title" index={index} eyebrow={t.eyebrow} title={t.title} text={t.text} emphasize={2} />

        <div className="no-scrollbar relative mt-16 overflow-x-auto">
          <div className="relative min-w-[600px]">
            {/* Hervorgehobene GentleBook-Spalte als dunkle Säule */}
            <div
              aria-hidden="true"
              data-highlight-col
              className="absolute bottom-0 right-0 top-0 w-[22%] rounded-[1.5rem] bg-night shadow-stage"
            />
            <table className="relative w-full table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <th scope="col" className="w-[34%] p-5 text-left">
                    <span className="sr-only">{t.eyebrow}</span>
                  </th>
                  {t.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        "w-[22%] p-5 pt-7 text-center text-sm font-semibold",
                        i === last ? "font-display text-lg font-medium text-white" : "text-ink/55"
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, ri) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      className={cn(
                        "border-t border-ink/[0.07] p-5 text-left font-medium text-ink",
                        ri === t.rows.length - 1 && "pb-7"
                      )}
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "border-t p-5 text-center",
                          ci === last ? "border-white/10" : "border-ink/[0.07]",
                          ri === t.rows.length - 1 && "pb-7"
                        )}
                      >
                        <span className="sr-only">{valueLabel[locale][value]}</span>
                        <ValueIcon value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-mist">{t.disclaimer}</p>
      </div>
    </section>
  );
}
