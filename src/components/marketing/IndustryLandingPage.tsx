import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export type IndustryContent = {
  slug: string;
  industryLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  painPoints: { title: string; text: string }[];
  fitHeading: string;
  fitText: string;
  fitPoints: string[];
  featuresHeading: string;
  features: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaText: string;
};

const SITE_URL = "https://gentlebook.app";

export function IndustryLandingPage({ content }: { content: IndustryContent }) {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "GentleBook", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Für wen?", item: `${SITE_URL}/industries` },
            { "@type": "ListItem", position: 3, name: content.industryLabel },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <div className="u-container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="transition-colors hover:text-ink">
                GentleBook
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link href="/industries" className="transition-colors hover:text-ink">
                Für wen?
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="font-medium text-ink/70">
                {content.industryLabel}
              </span>
            </li>
          </ol>
        </nav>

        <Link
          href="/industries"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Alle Branchen
        </Link>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
          Online-Buchungssystem für {content.industryLabel}
        </span>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-tight text-ink">
          {content.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{content.intro}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={siteConfig.routes.register} size="lg">
            14 Tage kostenlos testen
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={siteConfig.routes.demo} variant="outline" size="lg">
            Persönliche Demo buchen
          </Button>
        </div>
      </div>

      {/* Branchenspezifische Herausforderungen */}
      <div className="u-container mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Typische Herausforderungen bei {content.industryLabel}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {content.painPoints.map((point) => (
            <div key={point.title} className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{point.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warum GentleBook passt */}
      <div className="mt-16 bg-lavender/40 py-16">
        <div className="u-container">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {content.fitHeading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">{content.fitText}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.fitPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 rounded-2xl bg-white p-4 text-sm text-ink/80 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Relevante Funktionen */}
      <div className="u-container mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {content.featuresHeading}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {content.features.map((f) => (
            <div key={f.title} className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Branchen-FAQ */}
      <div className="u-container mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Häufige Fragen von {content.industryLabel}
        </h2>
        <div className="mt-8 space-y-4">
          {content.faq.map((item) => (
            <div key={item.q} className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="u-container mt-16">
        <div className="relative overflow-hidden rounded-4xl bg-brand-gradient px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{content.ctaHeading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">{content.ctaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={siteConfig.routes.register} size="lg" className="bg-white !text-ink hover:bg-lavender" variant="ghost">
              14 Tage kostenlos testen
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
