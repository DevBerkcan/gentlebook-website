/**
 * ─────────────────────────────────────────────────────────────
 *  VERTRAUENS-SEKTION
 *  trustPoints sind bewusst qualitative, produktbezogene Aussagen —
 *  KEINE erfundenen Kennzahlen. Die Testimonial-Karten sind technisch
 *  vorbereitete, klar gekennzeichnete Platzhalter (kein Name, kein Zitat,
 *  kein Unternehmen) und müssen vor Launch durch echte, freigegebene
 *  Kundenstimmen ersetzt werden (siehe dictionaries.ts → socialProof).
 * ─────────────────────────────────────────────────────────────
 */

import { Quote, Shield, HeartHandshake, Puzzle, Sparkles, BadgeEuro } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Sparkles, HeartHandshake, Shield, Puzzle, BadgeEuro];

export default function SocialProof({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink py-20 text-white sm:py-28" aria-labelledby="proof-title">
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

        {/* Vertrauenspunkte (qualitativ, keine erfundenen Kennzahlen) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {dict.socialProof.trustPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={point.title}
                delay={i * 0.08}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lavender">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{point.text}</p>
              </Reveal>
            );
          })}
        </div>

        {/* Testimonial-Platzhalter — bewusst ohne erfundene Zitate */}
        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-sm font-medium text-white/50">
            {dict.socialProof.testimonialsHeading}
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <figure
                key={i}
                className="flex min-h-[172px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-7 text-center"
                aria-hidden="true"
              >
                <Quote className="h-6 w-6 text-white/25" />
                <figcaption className="mt-4 text-sm text-white/40">
                  {dict.socialProof.testimonialsPlaceholder}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* Logo-Leiste: Unternehmen, die auf GentleBook vertrauen (Platzhalter) */}
        <Reveal delay={0.1} className="mt-10">
          <p className="text-center text-sm font-medium text-white/50">
            {dict.socialProof.logosHeading}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 p-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} aria-hidden="true" className="h-9 w-28 rounded-xl bg-white/[0.07]" />
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
