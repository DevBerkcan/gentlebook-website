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
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Sparkles, HeartHandshake, Shield, Puzzle, BadgeEuro];

export default function SocialProof({ dict, index }: { dict: Dictionary; index?: string }) {
  return (
    <section
      data-nav-theme="dark"
      className="relative mx-2 overflow-hidden rounded-[2rem] bg-night py-24 text-white sm:mx-4 sm:rounded-[2.75rem] sm:py-32"
      aria-labelledby="proof-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-teal/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet/25 blur-[120px]" />

      <div className="u-container relative">
        <SectionHeading id="proof-title" index={index} eyebrow={dict.socialProof.eyebrow} title={dict.socialProof.title} tone="dark" emphasize={2} />

        {/* Vertrauenspunkte (qualitativ, keine erfundenen Kennzahlen) */}
        <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {dict.socialProof.trustPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={point.title}
                delay={i * 0.08}
                className="group border-b border-white/10 py-8 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lavender transition-all duration-500 ease-out-expo group-hover:border-violet group-hover:bg-violet group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{point.text}</p>
              </Reveal>
            );
          })}
        </div>

        {/* Testimonial-Platzhalter — bewusst ohne erfundene Zitate */}
        <Reveal delay={0.1} className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{dict.socialProof.testimonialsHeading}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <figure
                key={i}
                className="flex min-h-[180px] flex-col justify-between rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] p-7"
                aria-hidden="true"
              >
                <Quote className="h-7 w-7 text-white/20" />
                <figcaption className="text-sm text-white/40">{dict.socialProof.testimonialsPlaceholder}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* Logo-Leiste: Unternehmen, die auf GentleBook vertrauen (Platzhalter) */}
        <Reveal delay={0.1} className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{dict.socialProof.logosHeading}</p>
            <p className="mt-1 text-xs text-white/35">{dict.socialProof.logosLabel}</p>
          </div>
          <div className="flex flex-wrap gap-3" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="h-9 w-24 rounded-xl bg-white/[0.06]" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
