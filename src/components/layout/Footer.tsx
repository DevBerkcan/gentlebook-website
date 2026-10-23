import Link from "next/link";
import { Instagram, Linkedin, Globe } from "lucide-react";
import Logo from "@/components/layout/Logo";
import FooterWordmark from "@/components/layout/FooterWordmark";
import { localizedPath, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";

const linkClass =
  "group relative inline-block text-sm text-white/55 transition-colors duration-300 hover:text-white";

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
    { href: p("/sepa"), label: locale === "de" ? "SEPA-Hinweise" : "SEPA information" },
    { href: p("/testphase"), label: locale === "de" ? "Testphase" : "Free trial" },
    { href: p("/kuendigung"), label: locale === "de" ? "Kündigung" : "Cancellation" },
    { href: p("/cookies"), label: "Cookies" },
    { href: p("/nutzungsrichtlinien"), label: locale === "de" ? "Nutzungsrichtlinien" : "Acceptable use" },
    { href: p("/tom"), label: "TOM" },
    { href: p("/loeschkonzept"), label: locale === "de" ? "Löschkonzept" : "Data deletion" },
    { href: p(siteConfig.routes.logo), label: dict.footer.brand },
    { href: p(siteConfig.routes.imprint), label: dict.footer.imprint },
    { href: p(siteConfig.routes.privacy), label: dict.footer.privacy },
    { href: p(siteConfig.routes.terms), label: dict.footer.terms },
    { href: p(siteConfig.routes.b2b), label: locale === "de" ? "B2B-Hinweis" : "B2B notice" },
    { href: p(siteConfig.routes.processing), label: locale === "de" ? "Auftragsverarbeitung" : "Data processing" },
    { href: p(siteConfig.routes.subprocessors), label: locale === "de" ? "Unterauftragsverarbeiter" : "Subprocessors" },
  ];

  const heading = "text-xs font-semibold uppercase tracking-[0.2em] text-white/35";

  return (
    <footer data-nav-theme="dark" className="relative mt-2 overflow-hidden bg-night text-white sm:mt-4">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      <div className="u-container relative pt-20 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={p("/")} aria-label="GentleBook — Startseite">
              <Logo tone="dark" />
            </Link>
            <p className="mt-6 max-w-xs leading-relaxed text-white/60">{dict.footer.claim}</p>
            <p className="mt-3 max-w-xs text-xs font-medium text-white/40">{dict.footer.companyNotice}</p>
          </div>

          <nav aria-label={dict.footer.product}>
            <h2 className={heading}>{dict.footer.product}</h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.help}>
            <h2 className={heading}>{dict.footer.help}</h2>
            <ul className="mt-5 space-y-3">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={siteConfig.externalLoginUrl} rel="noopener noreferrer" className={linkClass}>
                  {dict.nav.login}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={dict.footer.legal}>
            <h2 className={heading}>{dict.footer.legal}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" data-cc="c-settings" className={linkClass}>
                  {dict.footer.cookieSettings}
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={heading}>{dict.footer.social}</h2>
            <div className="mt-5 flex items-center gap-3">
              {/* Social-Links: Platzhalter — URLs beim Launch eintragen */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
            </div>
            <Link
              href={localizedPath(otherLocale, "/")}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {otherLocale === "de" ? "Deutsch" : "English"}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center">
          <p>
            © {year} GentleBook. {dict.footer.rights}
          </p>
          <p className="text-xs">Made in Wuppertal</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden">
        <FooterWordmark />
      </div>
    </footer>
  );
}
