"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { localizedPath, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  // Hide-on-scroll (runter = ausblenden, hoch = einblenden)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > lastY.current && !open);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Menü schließen bei Routenwechsel
  useEffect(() => setOpen(false), [pathname]);

  const home = localizedPath(locale, "/");
  const otherLocale: Locale = locale === "de" ? "en" : "de";

  // Aktuellen Pfad in die andere Sprache übersetzen
  const pathWithoutLocale =
    locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const switchHref = localizedPath(otherLocale, pathWithoutLocale);

  const nav = [
    { href: "#features", label: dict.nav.features },
    { href: "#industries", label: dict.nav.industries },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
        hidden && "-translate-y-full"
      )}
    >
      <div className="u-container">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5",
            scrolled
              ? "border border-white/60 bg-white/80 shadow-soft backdrop-blur-xl"
              : "bg-transparent"
          )}
        >
          <Link href={home} aria-label="GentleBook — Startseite" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
              aria-label={dict.nav.languageLabel}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {dict.nav.login}
            </Link>
            <Button href="#pricing">{dict.nav.cta}</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink lg:hidden"
            aria-expanded={open}
            aria-label={dict.nav.menuLabel}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile-Menü */}
      <div
        className={cn(
          "u-container lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "mt-2 origin-top rounded-2xl border border-white/60 bg-white/95 p-5 shadow-lifted backdrop-blur-xl transition-all duration-300",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-lavender/60 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/60"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {otherLocale === "de" ? "Deutsch" : "English"}
            </Link>
            <Button href="#pricing" className="flex-1 text-center">
              {dict.nav.cta}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
