import { Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getPlanPrice } from "@/lib/dictionaries";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

/**
 * Preise kommen zentral aus lib/pricing.ts (Platzhalter/TBD) —
 * hier wird nur gerendert.
 */
export default function Pricing({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.pricingSection;

  return (
    <section id="pricing" className="bg-lavender/40 py-20 sm:py-28" aria-labelledby="pricing-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="pricing-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-mist">{t.text}</p>
          </Reveal>

        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.plans.map((plan, i) => {
            const highlighted = plan.id === "professional";
            const price = getPlanPrice(plan.id);
            return (
              <Reveal
                key={plan.id}
                delay={i * 0.1}
                variant="scale"
                as="article"
                className={cn(
                  "relative flex flex-col rounded-4xl p-7",
                  highlighted
                    ? "bg-ink text-white shadow-lifted xl:-my-4 xl:py-11"
                    : "border border-ink/5 bg-white text-ink shadow-soft"
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-cta">
                    {t.popular}
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", highlighted ? "text-white/60" : "text-mist")}>
                  {plan.description}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-semibold tracking-tight">
                    {price} €
                  </span>
                  <span className={cn("text-sm", highlighted ? "text-white/60" : "text-mist")}>
                    {plan.id === "trial" ? t.trialDuration : t.perMonth}
                  </span>
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          highlighted ? "bg-brand-gradient text-white" : "bg-brand-gradient-soft text-violet"
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={highlighted ? "text-white/85" : "text-ink/80"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={localizedPath(
                    locale,
                    plan.id === "business" ? siteConfig.routes.contact : siteConfig.routes.register
                  )}
                  size="lg"
                  variant={highlighted ? "primary" : "outline"}
                  className="mt-8 w-full"
                >
                  {plan.id === "trial"
                    ? t.ctaTrial
                    : plan.id === "business"
                      ? t.ctaContact
                      : t.ctaActivate}
                </Button>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 rounded-4xl border border-ink/5 bg-white/75 p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {t.conditions.map((condition) => (
            <div key={condition.title}>
              <h3 className="text-sm font-semibold text-ink">{condition.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-mist">{condition.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-mist">{t.disclaimer}</p>
      </div>
    </section>
  );
}
