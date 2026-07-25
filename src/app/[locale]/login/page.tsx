import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isLocale, localizedPath, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  return {
    title: dict.loginPage.title,
    // Login ist kein Marketing-Content und noch nicht final — nicht indexieren.
    robots: { index: false, follow: true },
  };
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);
  const t = dict.loginPage;

  return (
    <div className="bg-lavender/30 pb-24 pt-36">
      <div className="u-container">
        <Link
          href={localizedPath(locale, "/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.backHome}
        </Link>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
          {t.eyebrow}
        </span>

        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-ink">
          {t.title}
        </h1>

        <div className="mt-10 max-w-xl rounded-3xl border border-dashed border-ink/15 bg-white p-10 text-center">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-mist">{t.text}</p>
          <Link
            href={localizedPath(locale, siteConfig.routes.contact)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
          >
            {t.contactCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
