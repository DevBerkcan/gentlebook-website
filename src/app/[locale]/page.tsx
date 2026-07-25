import { isLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { pricing } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Showcase from "@/components/sections/Showcase";
import Features from "@/components/sections/Features";
import Industries from "@/components/sections/Industries";
import SocialProof from "@/components/sections/SocialProof";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return (
    <>
      {/* Strukturierte Daten: Software + FAQ (Featured Snippets) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "GentleBook",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: dict.meta.description,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: pricing.starter.monthly,
            highPrice: pricing.business.monthly,
            offerCount: 3,
          },
        }}
      />
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

      <Hero dict={dict} locale={locale} />
      <Pain dict={dict} />
      <Showcase dict={dict} />
      <Features dict={dict} />
      <Industries dict={dict} />
      <SocialProof dict={dict} />
      <Pricing dict={dict} locale={locale} />
      <Faq dict={dict} />
      <FinalCta dict={dict} locale={locale} />
    </>
  );
}
