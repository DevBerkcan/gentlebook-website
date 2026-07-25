import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import TrialForm from "@/components/forms/TrialForm";
import { isLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  return {
    title: dict.registerPage.title,
    description: dict.registerPage.subtitle,
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  const t = dict.registerPage;

  return (
    <div className="bg-gradient-to-b from-lavender/60 via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="u-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
              {t.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-ink">
              {t.title}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist">{t.subtitle}</p>

            <div className="mt-10 rounded-3xl border border-ink/10 bg-white/70 p-6">
              <h2 className="text-sm font-semibold text-ink">{t.sideHeading}</h2>
              <ul className="mt-4 space-y-3">
                {t.sideBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-mist">
                {t.sideNote}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
            <TrialForm dict={{ ...t.form, industries: dict.industryOptions }} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
