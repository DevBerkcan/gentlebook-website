import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { label: string; href?: string };

const SITE_URL = "https://gentlebook.app";

/**
 * Sichtbare Breadcrumb-Navigation + BreadcrumbList strukturierte Daten.
 * `href` beim letzten Eintrag weglassen (aktuelle Seite, kein Link).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink/70">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
