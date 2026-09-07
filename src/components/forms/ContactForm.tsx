"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { localizedPath, type Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/siteConfig";

type Copy = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
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

export default function ContactForm({ dict, locale }: { dict: Copy; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const isAgencyRequest = searchParams.get("plan") === "agency";
  const agencyPrefill = locale === "de"
    ? "Ich interessiere mich für den Agency-Plan und möchte ein persönliches Angebot erhalten."
    : "I'm interested in the Agency plan and would like to receive a personal offer.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const privacyAcknowledged = form.get("privacyAcknowledged") === "on";

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = dict.errorRequired;
    if (!email) nextErrors.email = dict.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = dict.errorEmail;
    if (!message) nextErrors.message = dict.errorRequired;
    if (!privacyAcknowledged) nextErrors.privacyAcknowledged = dict.errorRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          locale,
          privacyAcknowledged,
          topic: isAgencyRequest ? "agency" : undefined,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
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
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {isAgencyRequest && (
        <div className="rounded-2xl border border-violet/20 bg-brand-gradient-soft/40 p-4 text-sm text-ink">
          {locale === "de"
            ? "Deine Anfrage zum Agency-Plan: Wir melden uns mit einem persönlichen Angebot (Monats- und Jahrespreis)."
            : "Your Agency plan request: we'll get back to you with a personal offer (monthly and annual pricing)."}
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
          {dict.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          defaultValue={isAgencyRequest ? agencyPrefill : undefined}
          className={cn(inputClass, "resize-none")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-4 text-sm text-ink/80">
        <label className="flex items-start gap-3">
          <input name="privacyAcknowledged" type="checkbox" className="mt-1 h-4 w-4 accent-violet" />
          <span>{locale === "de" ? "Ich habe die Datenschutzerklärung zur Kenntnis genommen." : "I have read and acknowledged the privacy policy."}</span>
        </label>
        {errors.privacyAcknowledged && <p className="mt-2 text-xs text-red-600">{errors.privacyAcknowledged}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? dict.submitting : dict.submit}
      </button>

      <p className="text-center text-xs leading-relaxed text-mist">
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
