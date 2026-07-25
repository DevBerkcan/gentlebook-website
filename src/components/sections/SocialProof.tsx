"use client";

/**
 * ─────────────────────────────────────────────────────────────
 *  SOCIAL PROOF — PLATZHALTER-KOMPONENTE
 *  Kennzahlen, Zitate & Logos sind Beispieldaten (siehe
 *  dictionaries.ts → socialProof) und werden vor dem Launch
 *  durch echte Werte ersetzt. Struktur & Animationen bleiben.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

function formatNumber(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US").format(Math.round(n));
}

export default function SocialProof({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const root = useRef<HTMLElement>(null);

  // Animierte Counter (GSAP) — bei Reduced Motion stehen die Endwerte direkt im Markup
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const counters = root.current?.querySelectorAll<HTMLElement>("[data-counter]");
      counters?.forEach((el) => {
        const target = Number(el.dataset.counter);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = formatNumber(obj.value, locale);
          },
        });
      });
    }, root);
    return () => mm.revert();
  }, [locale]);

  return (
    <section
      ref={root}
      className="bg-ink py-20 text-white sm:py-28"
      aria-labelledby="proof-title"
    >
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="bg-white/10 text-lavender">{dict.socialProof.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="proof-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight"
            >
              {dict.socialProof.title}
            </h2>
          </Reveal>
        </div>

        {/* Kennzahlen mit Count-up */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {dict.socialProof.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center"
            >
              <p className="font-display text-4xl font-semibold sm:text-5xl">
                <span data-counter={stat.value}>
                  {formatNumber(stat.value, locale)}
                </span>
                <span className="text-gradient">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-white/60">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Testimonials (Platzhalter) */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {dict.socialProof.testimonials.map((t, i) => (
            <Reveal
              key={t.business}
              delay={i * 0.1}
              as="figure"
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-7"
            >
              <Quote className="h-6 w-6 text-teal" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                „{t.quote}“
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/50">{t.business}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {/* Logo-Leiste (Platzhalter) */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 p-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                aria-hidden="true"
                className="h-9 w-28 rounded-xl bg-white/[0.07]"
              />
            ))}
            <span className="w-full text-center text-xs text-white/40">
              {dict.socialProof.logosLabel}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
