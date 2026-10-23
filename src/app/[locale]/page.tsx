import { isLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { pricing } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import SheetReveal from "@/components/effects/SheetReveal";
import Hero from "@/components/sections/Hero";
import IndustryMarquee from "@/components/sections/IndustryMarquee";
import Pain from "@/components/sections/Pain";
import HowItWorks from "@/components/sections/HowItWorks";
import Showcase from "@/components/sections/Showcase";
import ProductVideo from "@/components/sections/ProductVideo";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Features from "@/components/sections/Features";
import Industries from "@/components/sections/Industries";
import ProductDemo from "@/components/sections/ProductDemo";
import ObjectionSection from "@/components/sections/ObjectionSection";
import ComparisonTable from "@/components/sections/ComparisonTable";
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
            lowPrice: pricing.trial.monthly,
            highPrice: pricing.business.monthly,
            offerCount: Object.keys(pricing).length,
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
      <IndustryMarquee dict={dict} />
      <Pain dict={dict} index="01" />

      <SheetReveal>
        <Showcase dict={dict} index="02" />
        <HowItWorks dict={dict} locale={locale} index="03" />
        <Features dict={dict} index="04" />
        <ProductDemo dict={dict} locale={locale} index="05" />
        <BeforeAfter dict={dict} index="06" />
        <Industries dict={dict} index="07" />
        <ProductVideo dict={dict} index="08" />
        <ComparisonTable dict={dict} locale={locale} index="09" />
        <SocialProof dict={dict} index="10" />
        <Pricing dict={dict} locale={locale} index="11" />
        <ObjectionSection dict={dict} index="12" />
        <Faq dict={dict} locale={locale} index="13" />
        <FinalCta dict={dict} locale={locale} />
      </SheetReveal>
    </>
  );
}
