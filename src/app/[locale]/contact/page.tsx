import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
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
    title: dict.contactPage.title,
    description: dict.contactPage.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  const t = dict.contactPage;

  return (
    <div className="bg-gradient-to-b from-lavender/60 via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="u-container">
        <div className="mx-auto max-w-lg text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
            {t.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-ink">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mist">{t.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
          <ContactForm dict={t.form} locale={locale} />
        </div>
      </div>
    </div>
  );
}
