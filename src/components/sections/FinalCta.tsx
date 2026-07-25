import { ArrowRight, Play } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";

export default function FinalCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="pb-20 pt-4 sm:pb-28" aria-labelledby="final-cta-title">
      <div className="u-container">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-4xl bg-brand-gradient px-6 py-16 text-center text-white shadow-lifted sm:px-12 sm:py-20">
            {/* dekorative Kreise */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-ink/20 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2
                id="final-cta-title"
                className="font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight"
              >
                {dict.finalCta.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/85">{dict.finalCta.text}</p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="#"
                  size="lg"
                  className="bg-white !text-ink shadow-lifted hover:bg-lavender"
                  variant="ghost"
                >
                  {dict.finalCta.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  href="#showcase"
                  size="lg"
                  variant="ghost"
                  className="border border-white/40 text-white hover:border-white hover:!text-white"
                >
                  <Play className="h-4 w-4" />
                  {dict.finalCta.ctaSecondary}
                </Button>
              </div>

              <p className="mt-7 text-sm text-white/70">{dict.finalCta.trust}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
