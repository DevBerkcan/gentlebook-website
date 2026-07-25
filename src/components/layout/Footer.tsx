import Link from "next/link";
import { Instagram, Linkedin, Globe } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { localizedPath, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const otherLocale: Locale = locale === "de" ? "en" : "de";

  const legalLinks = [
    { href: localizedPath(locale, "/logo"), label: dict.footer.brand },
    { href: localizedPath(locale, "/impressum"), label: dict.footer.imprint },
    { href: localizedPath(locale, "/datenschutz"), label: dict.footer.privacy },
    { href: localizedPath(locale, "/agb"), label: dict.footer.terms },
  ];

  const productLinks = [
    { href: "#features", label: dict.nav.features },
    { href: "#industries", label: dict.nav.industries },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <footer className="border-t border-ink/5 bg-lavender/50">
      <div className="u-container py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href={localizedPath(locale, "/")} aria-label="GentleBook — Startseite">
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
                  <a
                    href={l.href}
                    className="text-sm text-ink/60 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legal}>
            <h2 className="text-sm font-semibold text-ink">{dict.footer.legal}</h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink/60 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
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
