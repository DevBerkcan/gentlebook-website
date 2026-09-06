import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/locales";
import { legalDocuments, legalNotice, legalVersion, type LegalPageId } from "@/content/legal/documents";

export type { LegalPageId } from "@/content/legal/documents";
export const legalPageTitles = Object.fromEntries(
  Object.entries(legalDocuments).map(([id, document]) => [id, document.title])
) as Record<LegalPageId, string>;

export default function LegalPage({ locale, page }: { locale: Locale; page: LegalPageId }) {
  const document = legalDocuments[page];
  return (
    <div className="bg-lavender/30 pb-24 pt-36">
      <div className="u-container">
        <Link href={localizedPath(locale, "/")} className="text-sm text-ink underline">
          {locale === "de" ? "Zurück zur Startseite" : "Back to home"}
        </Link>
        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-ink">{document.title}</h1>
        {locale === "en" && <p className="mt-3 text-sm text-mist">German review draft. An English translation is not yet available.</p>}
        <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-50 p-5 text-sm text-amber-900">
          <strong>{legalNotice}</strong>
          <p className="mt-2">Version {legalVersion} · Stand 06.09.2026 · Nicht zur Vertragsannahme freigegeben. Offene Angaben müssen vor Veröffentlichung und Verwendung ergänzt werden.</p>
        </div>
        <nav aria-label="Rechtsdokumente" className="mt-6 flex flex-wrap gap-4 text-sm">
          {Object.entries(legalDocuments).map(([id, doc]) => (
            <Link key={id} href={localizedPath(locale, `/${id}`)} aria-current={id === page ? "page" : undefined} className="text-violet underline">{doc.title}</Link>
          ))}
        </nav>
        <article className="mt-10 max-w-3xl rounded-3xl bg-white p-6 sm:p-10">
          {document.sections.map((section) => (
            <section key={section.title} className="mt-9 first:mt-0">
              <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
              {section.text.map((paragraph) => <p key={paragraph} className="mt-3 break-words text-sm leading-relaxed text-ink/80">{paragraph}</p>)}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
