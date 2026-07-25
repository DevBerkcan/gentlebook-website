"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";

export default function ProductDemo({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.productDemo;
  const [step, setStep] = useState(0);
  const [service, setService] = useState<number | null>(null);
  const [employee, setEmployee] = useState<number | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const isDone = step === 4;
  const progress = ((step + 1) / t.stepLabels.length) * 100;

  function next() {
    if (!started) {
      setStarted(true);
      trackEvent("booking_demo_started");
    }
    setStep((s) => Math.min(s + 1, t.stepLabels.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function restart() {
    setStep(0);
    setService(null);
    setEmployee(null);
    setDate(null);
    setTime(null);
  }

  const canProceed =
    (step === 0 && service !== null) ||
    (step === 1 && employee !== null) ||
    (step === 2 && date !== null) ||
    (step === 3 && time !== null);

  return (
    <section id="product-demo" className="py-20 sm:py-28" aria-labelledby="product-demo-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="product-demo-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-mist">{t.text}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-lg">
          <div className="overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-lifted">
            {/* Browser-Chrome */}
            <div className="flex items-center gap-2 border-b border-ink/5 bg-lavender/60 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-mist">
                studio-mila.gentlebook.app
              </span>
            </div>

            <div className="p-6">
              {!isDone && (
                <>
                  <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-lavender">
                    <div
                      className="h-full rounded-full bg-brand-gradient transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-mist">
                    {t.stepLabels[step]}
                  </p>
                </>
              )}

              {step === 0 && (
                <div className="mt-4 space-y-3">
                  {t.services.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      aria-pressed={service === i}
                      onClick={() => setService(i)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left transition-all",
                        service === i
                          ? "border-violet bg-brand-gradient-soft"
                          : "border-ink/10 hover:border-ink/25"
                      )}
                    >
                      <div>
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <p className="text-xs text-mist">{s.meta}</p>
                      </div>
                      <span
                        className={cn(
                          "h-5 w-5 rounded-full border-[6px]",
                          service === i ? "border-violet bg-white" : "border-ink/20 bg-white"
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {t.employees.map((e, i) => (
                    <button
                      key={e.name}
                      type="button"
                      aria-pressed={employee === i}
                      onClick={() => setEmployee(i)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition-all",
                        employee === i
                          ? "border-violet bg-brand-gradient-soft"
                          : "border-ink/10 hover:border-ink/25"
                      )}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                        {e.name[0]}
                      </span>
                      <span className="text-xs font-semibold text-ink">{e.name}</span>
                      <span className="text-[11px] text-mist">{e.role}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {t.dates.map((d, i) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={date === i}
                      onClick={() => setDate(i)}
                      className={cn(
                        "rounded-xl px-1.5 py-3 text-center text-xs font-semibold transition-all",
                        date === i ? "bg-brand-gradient text-white" : "bg-lavender/70 text-ink/70 hover:bg-lavender"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {t.times.map((time_, i) => (
                    <button
                      key={time_}
                      type="button"
                      aria-pressed={time === i}
                      onClick={() => setTime(i)}
                      className={cn(
                        "rounded-xl px-2 py-2.5 text-center text-xs font-semibold transition-all",
                        time === i ? "bg-brand-gradient text-white" : "bg-lavender/70 text-ink/70 hover:bg-lavender"
                      )}
                    >
                      {time_}
                    </button>
                  ))}
                </div>
              )}

              {isDone && (
                <div className="py-4 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-teal" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {t.confirmedTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{t.confirmedText}</p>
                  {service !== null && date !== null && time !== null && (
                    <p className="mt-4 rounded-2xl bg-lavender/60 px-4 py-3 text-sm font-medium text-ink">
                      {t.services[service].title} · {t.dates[date]} · {t.times[time]}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.restart}
                  </button>
                </div>
              )}

              {!isDone && (
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-0"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t.back}
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {step === 3 ? t.confirmCta : t.next}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg">
            {t.afterCtaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
