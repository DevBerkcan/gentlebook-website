import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { blogPosts } from "@/content/blog";
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
    title: dict.nav.blog,
    description:
      locale === "de"
        ? "Praxisnahe Ratgeber rund um Online-Terminbuchung und digitale Terminorganisation."
        : "Practical guides on online appointment booking and digital scheduling.",
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return (
    <div className="bg-lavender/20 pb-24 pt-32 sm:pt-40">
      <div className="u-container">
        <Breadcrumbs
          items={[
            { label: dict.meta.title.split(" — ")[0], href: localizedPath(locale, "/") },
            { label: dict.nav.blog },
          ]}
        />
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-ink">
          {dict.nav.blog}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
          {locale === "de"
            ? "Praxisnahe Anleitungen und Hintergründe rund um Online-Terminbuchung — für Dienstleistungsunternehmen, die ihre Terminorganisation digitalisieren wollen."
            : "The German-language guide hub is being translated. In the meantime, explore the guides below (German) or head back to the homepage."}
        </p>

        {locale === "de" ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <h2 className="font-display text-lg font-semibold text-ink">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                  {post.metaDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet">
                  Artikel lesen
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <Link
            href={localizedPath(locale, "/")}
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-violet"
          >
            Back to homepage
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
