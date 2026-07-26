import Link from "next/link";
import { Instagram, Linkedin, Globe } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { localizedPath, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const p = (path: string) => localizedPath(locale, path);

  const productLinks = [
    { href: p(siteConfig.routes.features), label: dict.nav.features },
    { href: p(siteConfig.routes.pricing), label: dict.nav.pricing },
    { href: p(siteConfig.routes.industries), label: dict.nav.industries },
    { href: p(siteConfig.routes.howItWorks), label: dict.nav.howItWorks },
  ];

  const helpLinks = [
    { href: p(siteConfig.routes.faq), label: dict.nav.faq },
    { href: p(siteConfig.routes.blog), label: dict.nav.blog },
    { href: p(siteConfig.routes.contact), label: dict.footer.contact },
  ];

  const legalLinks = [
    { href: p(siteConfig.routes.logo), label: dict.footer.brand },
    { href: p(siteConfig.routes.imprint), label: dict.footer.imprint },
    { href: p(siteConfig.routes.privacy), label: dict.footer.privacy },
    { href: p(siteConfig.routes.terms), label: dict.footer.terms },
  ];

  return (
    <footer className="border-t border-ink/5 bg-lavender/50">
      <div className="u-container py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={p("/")} aria-label="GentleBook — Startseite">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              {dict.footer.claim}
            </p>
          </div>

          <nav aria-label={dict.footer.product}>
            <h2 className="text-sm font-semibold text-ink">{dict.footer.product}</h2>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/60 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.help}>
            <h2 className="text-sm font-semibold text-ink">{dict.footer.help}</h2>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/60 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.externalLoginUrl}
                  rel="noopener noreferrer"
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {dict.nav.login}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={dict.footer.legal}>
            <h2 className="text-sm font-semibold text-ink">{dict.footer.legal}</h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/60 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  data-cc="c-settings"
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {dict.footer.cookieSettings}
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-ink">{dict.footer.social}</h2>
            <div className="mt-4 flex items-center gap-3">
              {/* Social-Links: Platzhalter — URLs beim Launch eintragen */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink/70 shadow-soft transition-all hover:-translate-y-0.5 hover:text-violet"
              >
                <Instagram className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink/70 shadow-soft transition-all hover:-translate-y-0.5 hover:text-violet"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
            </div>
            <Link
              href={localizedPath(otherLocale, "/")}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/70 shadow-soft transition-colors hover:text-ink"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {otherLocale === "de" ? "Deutsch" : "English"}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-sm text-mist sm:flex-row sm:items-center">
          <p>
            © {year} GentleBook. {dict.footer.rights}
          </p>
          <p className="text-xs">Made in Düsseldorf</p>
        </div>
      </div>
    </footer>
  );
}
