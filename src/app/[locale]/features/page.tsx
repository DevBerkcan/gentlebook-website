import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import FinalCta from "@/components/sections/FinalCta";
import { isLocale, localizedPath, type Locale } from "@/lib/locales";
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
    title: dict.features.title,
    description: dict.features.eyebrow,
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return (
    <div>
      <div className="u-container pb-6 pt-32 sm:pt-40">
        <Breadcrumbs
          items={[
            { label: dict.meta.title.split(" — ")[0], href: localizedPath(locale, "/") },
            { label: dict.nav.features },
          ]}
        />
        <h1 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-violet">
          {dict.nav.features}
        </h1>
      </div>
      <Showcase dict={dict} />
      <Features dict={dict} />
      <FinalCta dict={dict} locale={locale} />
    </div>
  );
}
