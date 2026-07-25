import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import type { BlogPost } from "@/content/blog/types";

const SITE_URL = "https://gentlebook.app";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s-]/g, "")
    .replace(/\s+/g, "-");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "GentleBook" },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "GentleBook", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title },
          ],
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
              <Link href="/blog" className="transition-colors hover:text-ink">
                Ratgeber
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="font-medium text-ink/70">
                {post.title}
              </span>
            </li>
          </ol>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Alle Ratgeber-Artikel
        </Link>

        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-ink">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mist">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>Veröffentlicht am {formatDate(post.publishedAt)}</span>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>Aktualisiert am {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="max-w-2xl">
            {/* Direkte Antwort zuerst — für GEO/AEO */}
            <p className="rounded-2xl border border-violet/20 bg-brand-gradient-soft p-5 text-base leading-relaxed text-ink">
              {post.directAnswer}
            </p>

            {post.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 id={slugify(section.heading)} className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-ink/80">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Häufige Fragen
              </h2>
              <div className="mt-5 space-y-4">
                {post.faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-ink/5 bg-white p-5 shadow-soft">
                    <h3 className="text-sm font-semibold text-ink">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 rounded-3xl bg-brand-gradient p-8 text-center text-white">
              <h2 className="font-display text-xl font-semibold">
                Bereit, deine Terminbuchung zu digitalisieren?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/85">
                Teste GentleBook 14 Tage kostenlos und richte deine eigene Buchungsseite ein.
              </p>
              <Button
                href={siteConfig.routes.register}
                size="lg"
                variant="ghost"
                className="mt-6 bg-white !text-ink hover:bg-lavender"
              >
                14 Tage kostenlos testen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Inhaltsverzeichnis */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-ink/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-mist">
                Inhaltsverzeichnis
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {post.sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="text-ink/70 transition-colors hover:text-violet"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
