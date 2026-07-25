import type { Metadata } from "next";
import DemoQualificationForm from "@/components/forms/DemoQualificationForm";
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
    title: dict.demoPage.title,
    description: dict.demoPage.subtitle,
  };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  const t = dict.demoPage;

  return (
    <div className="bg-gradient-to-b from-lavender/60 via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
            {t.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-ink">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mist">{t.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <DemoQualificationForm dict={t.form} locale={locale} />
        </div>
      </div>
    </div>
  );
}
