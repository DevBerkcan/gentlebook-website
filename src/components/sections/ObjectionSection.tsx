"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Spotlight from "@/components/ui/Spotlight";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

/** Typische Bedenken als Karten-Mauerwerk — jede Karte kippt beim Erscheinen sanft ein. */
export default function ObjectionSection({ dict, index }: { dict: Dictionary; index?: string }) {
  const t = dict.objections;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-objection]", root.current).forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          rotateX: -18,
          transformPerspective: 900,
          transformOrigin: "50% 0%",
          duration: 1.1,
          ease: "expo.out",
          delay: (i % 2) * 0.08,
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-32" aria-labelledby="objections-title">
      <div className="u-container">
        <SectionHeading id="objections-title" index={index} eyebrow={t.eyebrow} title={t.title} emphasize={3} />

        <div className="mt-16 gap-4 sm:columns-2 [&>*]:mb-4">
          {t.items.map((item, i) => (
            <Spotlight
              key={item.q}
              data-objection=""
              className="group break-inside-avoid overflow-hidden rounded-[1.5rem] border border-ink/[0.07] bg-white p-7 transition-shadow duration-700 ease-out-expo hover:shadow-lifted sm:p-8"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="-mt-2 font-display text-5xl leading-none text-violet/30 transition-colors duration-500 group-hover:text-violet"
                >
                  “
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium leading-snug text-ink">{item.q}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{item.a}</p>
                </div>
              </div>
              <span className="mt-6 block text-right font-display text-xs italic text-ink/25">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
