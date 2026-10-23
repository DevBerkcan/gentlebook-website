"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import type { Dictionary } from "@/lib/dictionaries";
import BookingStory from "./BookingStory";

const tryCopy = {
  de: {
    title: "Jetzt selbst ausprobieren.",
    text: "Klick dich durch den Buchungsablauf, so wie deine Kund:innen ihn erleben — in unter 30 Sekunden.",
  },
  en: {
    title: "Try it yourself.",
    text: "Click through the booking flow exactly as your clients experience it — in under 30 seconds.",
  },
};

export default function ProductDemo({ dict, locale, index }: { dict: Dictionary; locale: Locale; index?: string }) {
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

  const option = (selected: boolean) =>
    cn(
      "transition-all duration-300 ease-out-expo active:scale-[0.97]",
      selected ? "border-ink bg-ink text-white" : "border-ink/10 bg-white text-ink hover:border-ink/30"
    );

  return (
    <section id="product-demo" className="py-24 sm:py-32" aria-labelledby="product-demo-title">
      <div className="u-container">
        <SectionHeading id="product-demo-title" index={index} eyebrow={t.eyebrow} title={t.title} text={t.text} emphasize={3} />

        <BookingStory dict={dict} locale={locale} />

        <div className="mt-24 grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-24">
          <Reveal>
            <p className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-ink">
              {tryCopy[locale].title}
            </p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">{tryCopy[locale].text}</p>
            <div className="mt-8">
              <Magnetic>
                <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg">
                  {t.afterCtaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          {/* Interaktive Demo im Smartphone-Rahmen */}
          <Reveal variant="scale" delay={0.1} className="mx-auto w-full max-w-[24rem]">
            <div className="relative rounded-[3rem] bg-ink p-3 shadow-stage">
              <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-violet/20 blur-3xl" />
              <div className="flex min-h-[34rem] flex-col overflow-hidden rounded-[2.4rem] bg-white">
                <div className="flex justify-center pb-1 pt-3" aria-hidden="true">
                  <span className="h-6 w-28 rounded-full bg-ink" />
                </div>
                <div className="flex items-center gap-3 px-6 pb-4 pt-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-medium text-ink">{dict.showcase.mock.salonName}</span>
                    <span className="block text-[11px] text-mist">studio-mila.gentlebook.app</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6">
                  {!isDone && (
                    <>
                      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-porcelain">
                        <div
                          className="h-full rounded-full bg-brand-gradient transition-all duration-500 ease-out-expo"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist" aria-live="polite">
                        {t.stepLabels[step]}
                      </p>
                    </>
                  )}

                  <div key={step} className="flex-1 animate-step-in">
                    {step === 0 && (
                      <div className="mt-4 space-y-2.5">
                        {t.services.map((s, i) => (
                          <button
                            key={s.title}
                            type="button"
                            aria-pressed={service === i}
                            onClick={() => setService(i)}
                            className={cn("flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left", option(service === i))}
                          >
                            <span>
                              <span className="block text-sm font-semibold">{s.title}</span>
                              <span className={cn("block text-xs", service === i ? "text-white/60" : "text-mist")}>{s.meta}</span>
                            </span>
                            <span className={cn("h-5 w-5 rounded-full border-[6px]", service === i ? "border-teal bg-white" : "border-ink/15 bg-white")} />
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="mt-4 grid grid-cols-3 gap-2.5">
                        {t.employees.map((e, i) => (
                          <button
                            key={e.name}
                            type="button"
                            aria-pressed={employee === i}
                            onClick={() => setEmployee(i)}
                            className={cn("flex flex-col items-center gap-2 rounded-2xl border px-2 py-4", option(employee === i))}
                          >
                            <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold", employee === i ? "bg-white text-ink" : "bg-ink text-white")}>
                              {e.name[0]}
                            </span>
                            <span className="text-xs font-semibold">{e.name}</span>
                            <span className={cn("text-[11px]", employee === i ? "text-white/60" : "text-mist")}>{e.role}</span>
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
                            className={cn("rounded-xl border px-1 py-3 text-center text-xs font-semibold", option(date === i))}
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
                            className={cn("rounded-xl border px-2 py-3 text-center text-xs font-semibold", option(time === i))}
                          >
                            {time_}
                          </button>
                        ))}
                      </div>
                    )}

                    {isDone && (
                      <div className="flex h-full flex-col items-center justify-center py-6 text-center">
                        <span className="relative flex h-16 w-16 items-center justify-center">
                          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-teal/30 animate-pulse-ring" />
                          <CheckCircle2 className="relative h-14 w-14 text-teal" aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 font-display text-xl font-medium text-ink">{t.confirmedTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist">{t.confirmedText}</p>
                        {service !== null && date !== null && time !== null && (
                          <p className="mt-5 rounded-2xl bg-porcelain px-4 py-3 text-sm font-medium text-ink">
                            {t.services[service].title} · {t.dates[date]} · {t.times[time]}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={restart}
                          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
                        >
                          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.restart}
                        </button>
                      </div>
                    )}
                  </div>

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
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                      >
                        {step === 3 ? t.confirmCta : t.next}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
