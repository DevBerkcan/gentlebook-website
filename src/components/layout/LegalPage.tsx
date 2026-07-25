import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

/**
 * Layout-Grundgerüst für die Rechtsseiten.
 * ABSICHTLICH OHNE INHALT — Impressum/Datenschutz/AGB werden
 * separat vom Betreiber eingepflegt. Keine generierten Rechtstexte!
 */
export default function LegalPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "impressum" | "datenschutz" | "agb";
}) {
  const dict = getDictionary(locale);
  const title = dict.legalPage.pages[page];

  return (
    <div className="bg-lavender/30 pb-24 pt-36">
      <div className="u-container">
        <Link
          href={localizedPath(locale, "/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.legalPage.backHome}
        </Link>

        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-ink">
          {title}
        </h1>

        <div className="mt-10 max-w-3xl rounded-3xl border border-dashed border-ink/15 bg-white p-10 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            {dict.legalPage.placeholderTitle}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
            {dict.legalPage.placeholderText}
          </p>
          {/*
            ── HIER RECHTSTEXT EINFÜGEN ──
            z. B. als importierte MDX/HTML-Datei oder direkt als JSX.
          */}
        </div>
      </div>
    </div>
  );
}
