"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

type Copy = {
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  industryLabel: string;
  industryPlaceholder: string;
  industries: string[];
  submit: string;
  submitting: string;
  privacyHint: string;
  privacyLink: string;
  errorRequired: string;
  errorEmail: string;
  errorGeneric: string;
  successTitle: string;
  successText: string;
};

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet";

export default function TrialForm({ dict, locale }: { dict: Copy; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const industry = String(form.get("industry") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = dict.errorRequired;
    if (!email) nextErrors.email = dict.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = dict.errorEmail;
    if (!company) nextErrors.company = dict.errorRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    trackEvent("signup_started");
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, industry, locale }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      trackEvent("signup_completed");
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
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="trial-form-status">
      <div>
        <label htmlFor="trial-name" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.nameLabel}
        </label>
        <input
          id="trial-name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "trial-name-error" : undefined}
        />
        {errors.name && (
          <p id="trial-name-error" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="trial-email" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.emailLabel}
        </label>
        <input
          id="trial-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "trial-email-error" : undefined}
        />
        {errors.email && (
          <p id="trial-email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="trial-company" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.companyLabel}
        </label>
        <input
          id="trial-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "trial-company-error" : undefined}
        />
        {errors.company && (
          <p id="trial-company-error" className="mt-1.5 text-xs text-red-600">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="trial-industry" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.industryLabel}
        </label>
        <select id="trial-industry" name="industry" className={inputClass} defaultValue="">
          <option value="" disabled>
            {dict.industryPlaceholder}
          </option>
          {dict.industries.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-70"
        )}
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? dict.submitting : dict.submit}
      </button>

      <p id="trial-form-status" className="text-center text-xs leading-relaxed text-mist">
        {dict.privacyHint}{" "}
        <a href={localizedPath(locale, siteConfig.routes.privacy)} className="underline hover:text-ink">
          {dict.privacyLink}
        </a>
      </p>

      {status === "error" && (
        <p role="alert" className="text-center text-xs text-red-600">
          {dict.errorGeneric}
        </p>
      )}
    </form>
  );
}
