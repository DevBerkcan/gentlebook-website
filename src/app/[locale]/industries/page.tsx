import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import Industries from "@/components/sections/Industries";
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
    title: dict.industries.title,
    description: dict.industries.text,
  };
}

// Detaillierte, eigenständige Landingpages existieren aktuell nur für diese drei
// Branchen. Weitere folgen, sobald genug eigenständiger Inhalt vorliegt (siehe
// Hinweis in der Aufgabenbeschreibung: keine nahezu identischen Doorway-Pages).
const detailedGuides = [
  { href: "/buchungssystem-friseur", label: "Friseure & Barbershops" },
  { href: "/buchungssystem-hundefriseur", label: "Hundefriseure" },
  { href: "/buchungssystem-kosmetikstudio", label: "Kosmetik- & Beautystudios" },
];

export default async function IndustriesPage({
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
            { label: dict.nav.industries },
          ]}
        />
        <h1 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-violet">
          {dict.nav.industries}
        </h1>
      </div>
      <Industries dict={dict} />

      {locale === "de" && (
        <div className="u-container -mt-8 mb-8">
          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              Ausführliche Branchen-Guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-mist">
              Für diese Branchen haben wir vertiefte Seiten mit konkreten Anwendungsfällen
              vorbereitet:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {detailedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-lavender/40 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-violet/40 hover:bg-brand-gradient-soft"
                >
                  {guide.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <FinalCta dict={dict} locale={locale} />
    </div>
  );
}
