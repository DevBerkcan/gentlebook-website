import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import Faq from "@/components/sections/Faq";
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
    title: dict.faq.title,
    description: dict.faq.title,
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: dict.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <div className="u-container pb-6 pt-32 sm:pt-40">
        <Breadcrumbs
          items={[
            { label: dict.meta.title.split(" — ")[0], href: localizedPath(locale, "/") },
            { label: dict.nav.faq },
          ]}
        />
        <h1 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-violet">
          {dict.nav.faq}
        </h1>
      </div>
      <Faq dict={dict} />
      <FinalCta dict={dict} locale={locale} />
    </div>
  );
}
