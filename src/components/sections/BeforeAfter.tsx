import { X, Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

export default function BeforeAfter({ dict }: { dict: Dictionary }) {
  const t = dict.beforeAfter;

  return (
    <section className="bg-lavender/40 py-20 sm:py-28" aria-labelledby="before-after-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="before-after-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink/10 bg-white/70 p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/50">
              {t.withoutHeading}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {t.withoutItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink/50">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border-2 border-violet/40 bg-white p-8 shadow-lifted">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-violet">
              {t.withHeading}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {t.withItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
