"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Spotlight from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { getAnnualPrice, getPlanPrice } from "@/lib/dictionaries";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

const PRICE_FORMATTERS: Record<Locale, Intl.NumberFormat> = {
  de: new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }),
  en: new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }),
};

/**
 * Preise kommen zentral aus lib/pricing.ts (Platzhalter/TBD) —
 * hier wird nur gerendert.
 */
export default function Pricing({ dict, locale, index }: { dict: Dictionary; locale: Locale; index?: string }) {
  const [yearly, setYearly] = useState(false);
  const t = dict.pricingSection;
  const priceFormatter = PRICE_FORMATTERS[locale];

  return (
    <section id="pricing" className="py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="u-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="pricing-title" index={index} eyebrow={t.eyebrow} title={t.title} text={t.text} emphasize={2} />

          <Reveal className="shrink-0">
            <div
              className="relative inline-grid grid-cols-2 rounded-full border border-ink/10 bg-white p-1.5 shadow-soft"
              role="group"
              aria-label={locale === "de" ? "Abrechnungszeitraum" : "Billing period"}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-ink transition-transform duration-500 ease-out-expo",
                  yearly && "translate-x-full"
                )}
              />
              <button
                type="button"
                onClick={() => setYearly(false)}
                aria-pressed={!yearly}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-500",
                  !yearly ? "text-white" : "text-ink/60 hover:text-ink"
                )}
              >
                {t.monthly}
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                aria-pressed={yearly}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-500",
                  yearly ? "text-white" : "text-ink/60 hover:text-ink"
                )}
              >
                {t.yearly}
              </button>
              <span className="absolute -top-3 right-0 whitespace-nowrap rounded-full bg-brand-gradient px-2.5 py-0.5 text-[11px] font-bold text-white shadow-cta">
                {t.yearlyBadge}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.plans.map((plan, i) => {
            const highlighted = plan.id === "professional";
            const price = getPlanPrice(plan.id, yearly);
            const annualPrice = getAnnualPrice(plan.id);
            return (
              <Reveal key={plan.id} delay={i * 0.1} variant="scale" className={cn("flex", highlighted && "conic-border rounded-[1.9rem] p-px")}>
                <Spotlight
                  as="article"
                  className={cn(
                    "relative flex w-full flex-col rounded-[1.85rem] p-7 sm:p-8",
                    highlighted ? "bg-night text-white" : "border border-ink/[0.07] bg-white text-ink"
                  )}
                >
                  {highlighted && (
                    <>
                      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/40 blur-3xl" />
                      <span className="absolute right-6 top-6 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                        {t.popular}
                      </span>
                    </>
                  )}

                  <h3 className="relative font-display text-2xl font-medium">{plan.name}</h3>
                  <p className={cn("relative mt-2 min-h-[2.75rem] text-sm leading-relaxed", highlighted ? "text-white/60" : "text-mist")}>
                    {plan.description}
                  </p>

                  <div className="relative mt-8 overflow-hidden">
                    {plan.id === "business" ? (
                      <p className="font-display text-3xl font-medium tracking-tight">
                        {locale === "de" ? "Preis auf Anfrage" : "Custom pricing"}
                      </p>
                    ) : (
                      <p className="flex items-baseline gap-1.5">
                        <span key={`${plan.id}-${yearly}`} className="inline-block animate-price-in font-display text-6xl font-medium tracking-tight tabular-nums">
                          {priceFormatter.format(price)}
                          <span className="ml-1 text-3xl">€</span>
                        </span>
                        <span className={cn("text-sm", highlighted ? "text-white/60" : "text-mist")}>
                          {plan.id === "trial" ? t.trialDuration : t.perMonth}
                        </span>
                      </p>
                    )}
                  </div>
                  <p className={cn("relative mt-2 min-h-5 text-xs", highlighted ? "text-white/50" : "text-mist")}>
                    {plan.id === "trial"
                      ? locale === "de" ? "Ohne Zahlungsmethode" : "No payment method"
                      : plan.id === "business"
                        ? locale === "de" ? "Individuell nach Teamgröße & Anforderungen" : "Custom, based on team size & needs"
                        : yearly
                          ? `${t.billedYearly} · ${priceFormatter.format(annualPrice)} €/${locale === "de" ? "Jahr" : "year"}`
                          : locale === "de" ? "Monatlich im Voraus" : "Billed monthly in advance"}
                  </p>
                  {plan.id === "business" ? (
                    <p className={cn("relative mt-2 text-xs leading-relaxed", highlighted ? "text-white/60" : "text-mist")}>
                      {locale === "de"
                        ? "Nach deiner Anfrage: persönliches Angebot mit Monats- und Jahrespreis, danach jederzeit zum Periodenende kündbar."
                        : "After your request: a personal offer with monthly and annual pricing, then cancellable at the end of any billing period."}
                    </p>
                  ) : plan.id !== "trial" && (
                    <p className={cn("relative mt-2 text-xs leading-relaxed", highlighted ? "text-white/60" : "text-mist")}>
                      {locale === "de"
                        ? `${yearly ? "Jährlich" : "Monatlich"} zum Periodenende kündbar · Keine Einrichtungsgebühr · Keine Provision pro Buchung · Gemäß § 19 UStG kein Umsatzsteuerausweis`
                        : `Cancel at the end of the ${yearly ? "annual" : "monthly"} period · No setup fee · No booking commission · No VAT charged under § 19 UStG`}
                    </p>
                  )}

                  <div className={cn("relative my-7 h-px", highlighted ? "bg-white/10" : "bg-ink/[0.07]")} />

                  <ul className="relative flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            highlighted ? "bg-brand-gradient text-white" : "bg-porcelain text-violet"
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className={highlighted ? "text-white/85" : "text-ink/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={
                      plan.id === "business"
                        ? `${localizedPath(locale, siteConfig.routes.contact)}?plan=agency`
                        : localizedPath(locale, siteConfig.routes.register)
                    }
                    size="lg"
                    variant={highlighted ? "light" : "outline"}
                    className="relative mt-8 w-full"
                  >
                    {plan.id === "trial" ? t.ctaTrial : plan.id === "business" ? t.ctaContact : t.ctaActivate}
                  </Button>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {t.conditions.map((condition) => (
            <div key={condition.title} className="bg-porcelain p-6">
              <h3 className="text-sm font-semibold text-ink">{condition.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{condition.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-mist">{t.disclaimer}</p>
      </div>
    </section>
  );
}
