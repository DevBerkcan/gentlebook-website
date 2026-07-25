"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/locales";

export type QualificationCopy = {
  step: string;
  of: string;
  back: string;
  next: string;
  submit: string;
  submitting: string;
  errorGeneric: string;
  successTitle: string;
  successText: string;
  businessTypeQuestion: string;
  businessTypeOptions: string[];
  teamSizeQuestion: string;
  teamSizeOptions: string[];
  currentBookingQuestion: string;
  currentBookingOptions: string[];
  biggestEffortQuestion: string;
  biggestEffortPlaceholder: string;
  weeklyAppointmentsQuestion: string;
  weeklyAppointmentsOptions: string[];
  goalQuestion: string;
  goalOptions: string[];
  contactNameLabel: string;
  contactEmailLabel: string;
  errorRequired: string;
  errorEmail: string;
};

type Answers = {
  businessType: string;
  teamSize: string;
  currentBooking: string;
  biggestEffort: string;
  weeklyAppointments: string;
  goal: string;
  name: string;
  email: string;
};

const emptyAnswers: Answers = {
  businessType: "",
  teamSize: "",
  currentBooking: "",
  biggestEffort: "",
  weeklyAppointments: "",
  goal: "",
  name: "",
  email: "",
};

function OptionGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all",
              active
                ? "border-violet bg-brand-gradient-soft text-ink shadow-soft"
                : "border-ink/10 bg-white text-ink/75 hover:border-ink/25"
            )}
          >
            {option}
          </button>
        );
      })}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export default function DemoQualificationForm({
  dict,
  locale,
}: {
  dict: QualificationCopy;
  locale: Locale;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const steps = useMemo(
    () =>
      [
        {
          key: "businessType",
          question: dict.businessTypeQuestion,
          render: () => (
            <OptionGroup
              name="businessType"
              options={dict.businessTypeOptions}
              value={answers.businessType}
              onChange={(v) => setAnswers((a) => ({ ...a, businessType: v }))}
            />
          ),
          valid: () => Boolean(answers.businessType),
        },
        {
          key: "teamSize",
          question: dict.teamSizeQuestion,
          render: () => (
            <OptionGroup
              name="teamSize"
              options={dict.teamSizeOptions}
              value={answers.teamSize}
              onChange={(v) => setAnswers((a) => ({ ...a, teamSize: v }))}
            />
          ),
          valid: () => Boolean(answers.teamSize),
        },
        {
          key: "currentBooking",
          question: dict.currentBookingQuestion,
          render: () => (
            <OptionGroup
              name="currentBooking"
              options={dict.currentBookingOptions}
              value={answers.currentBooking}
              onChange={(v) => setAnswers((a) => ({ ...a, currentBooking: v }))}
            />
          ),
          valid: () => Boolean(answers.currentBooking),
        },
        {
          key: "biggestEffort",
          question: dict.biggestEffortQuestion,
          render: () => (
            <textarea
              rows={4}
              value={answers.biggestEffort}
              onChange={(e) => setAnswers((a) => ({ ...a, biggestEffort: e.target.value }))}
              placeholder={dict.biggestEffortPlaceholder}
              className="w-full resize-none rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            />
          ),
          valid: () => true,
        },
        {
          key: "weeklyAppointments",
          question: dict.weeklyAppointmentsQuestion,
          render: () => (
            <OptionGroup
              name="weeklyAppointments"
              options={dict.weeklyAppointmentsOptions}
              value={answers.weeklyAppointments}
              onChange={(v) => setAnswers((a) => ({ ...a, weeklyAppointments: v }))}
            />
          ),
          valid: () => Boolean(answers.weeklyAppointments),
        },
        {
          key: "goal",
          question: dict.goalQuestion,
          render: () => (
            <OptionGroup
              name="goal"
              options={dict.goalOptions}
              value={answers.goal}
              onChange={(v) => setAnswers((a) => ({ ...a, goal: v }))}
            />
          ),
          valid: () => Boolean(answers.goal),
        },
      ] as const,
    [answers, dict]
  );

  const isLastStep = step === steps.length;
  const current = steps[step];
  const progress = Math.round(((step + 1) / (steps.length + 1)) * 100);

  function goNext() {
    if (current && !current.valid()) {
      setErrors({ [current.key]: dict.errorRequired });
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, steps.length));
    trackEvent(step === 0 ? "booking_demo_started" : "lead_form_started");
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!answers.name.trim()) nextErrors.name = dict.errorRequired;
    if (!answers.email.trim()) nextErrors.email = dict.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) nextErrors.email = dict.errorEmail;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, locale }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("booking_demo_completed");
      trackEvent("lead_form_completed");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-teal/30 bg-teal/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">{dict.successTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">{dict.successText}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
      {/* Fortschritt */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-mist">
          <span>
            {dict.step} {Math.min(step + 1, steps.length + 1)} {dict.of} {steps.length + 1}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lavender">
          <div
            className="h-full rounded-full bg-brand-gradient transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isLastStep && current ? (
        <div>
          <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
            {current.question}
          </h2>
          <div className="mt-5">{current.render()}</div>
          {errors[current.key] && (
            <p role="alert" className="mt-3 text-xs text-red-600">
              {errors[current.key]}
            </p>
          )}
          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {dict.back}
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
            >
              {dict.next}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
            {dict.contactNameLabel} &amp; {dict.contactEmailLabel}
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium text-ink">
                {dict.contactNameLabel}
              </label>
              <input
                id="demo-name"
                type="text"
                autoComplete="name"
                value={answers.name}
                onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "demo-name-error" : undefined}
              />
              {errors.name && (
                <p id="demo-name-error" className="mt-1.5 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-ink">
                {dict.contactEmailLabel}
              </label>
              <input
                id="demo-email"
                type="email"
                autoComplete="email"
                value={answers.email}
                onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "demo-email-error" : undefined}
              />
              {errors.email && (
                <p id="demo-email-error" className="mt-1.5 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {dict.back}
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === "submitting" ? dict.submitting : dict.submit}
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="mt-4 text-center text-xs text-red-600">
              {dict.errorGeneric}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
