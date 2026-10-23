import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AuroraCanvas from "@/components/effects/AuroraCanvas";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

export default function FinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="px-2 pb-2 pt-8 sm:px-4 sm:pb-4" aria-labelledby="final-cta-title">
      <div
        data-nav-theme="dark"
        className="relative isolate overflow-hidden rounded-[2rem] bg-night px-6 py-28 text-center text-white sm:rounded-[2.75rem] sm:py-40"
      >
        <AuroraCanvas className="-z-10" />
        <div aria-hidden="true" className="stage-grid pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-4xl">
          <SectionHeading
            id="final-cta-title"
            eyebrow={dict.finalCta.trust.split(" · ")[0]}
            title={dict.finalCta.title}
            text={dict.finalCta.text}
            tone="dark"
            align="center"
            emphasize={3}
            className="[&_h2]:text-[clamp(2.6rem,6.5vw,5.8rem)] [&_h2]:leading-[1]"
          />

          <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg" variant="light">
                {dict.finalCta.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={localizedPath(locale, siteConfig.routes.demo)} size="lg" variant="glass">
                <Play className="h-4 w-4" aria-hidden="true" />
                {dict.finalCta.ctaSecondary}
              </Button>
            </Magnetic>
          </Reveal>

          <p className="mt-10 text-sm text-white/50">{dict.finalCta.trust}</p>
        </div>
      </div>
    </section>
  );
}
