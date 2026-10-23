"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { localizedPath, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";

/** Liegt unter der Header-Mitte gerade eine dunkle Sektion ([data-nav-theme="dark"])? */
function isOverDarkSection() {
  const probe = 36;
  return Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']")).some((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= probe && r.bottom >= probe;
  });
}

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  // Hide-on-scroll + Farbschema passend zur Sektion darunter
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 200 && y > lastY.current && !open);
      setDark(isOverDarkSection());
      lastY.current = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, pathname]);

  // Menü schließen bei Routenwechsel
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Hintergrund-Scroll sperren, solange das Vollbild-Menü offen ist
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const home = localizedPath(locale, "/");
  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const mobileMenuId = "mobile-navigation";

  // Aktuellen Pfad in die andere Sprache übersetzen
  const pathWithoutLocale =
    locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const switchHref = localizedPath(otherLocale, pathWithoutLocale);

  const nav = [
    { href: localizedPath(locale, siteConfig.routes.features), label: dict.nav.features },
    { href: localizedPath(locale, siteConfig.routes.industries), label: dict.nav.industries },
    { href: localizedPath(locale, siteConfig.routes.howItWorks), label: dict.nav.howItWorks },
    { href: localizedPath(locale, siteConfig.routes.pricing), label: dict.nav.pricing },
    { href: localizedPath(locale, siteConfig.routes.faq), label: dict.nav.faq },
  ];

  const onDark = dark || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-out-expo",
        hidden && "-translate-y-[120%]"
      )}
    >
      <div className="u-container relative z-10">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-full py-2.5 pl-4 pr-2.5 transition-all duration-500 ease-out-expo sm:pl-5",
            scrolled && !open
              ? onDark
                ? "border border-white/10 bg-night/55 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                : "border border-ink/[0.07] bg-white/70 shadow-soft backdrop-blur-xl"
              : "border border-transparent"
          )}
        >
          <Link href={home} aria-label="GentleBook — Startseite" className="shrink-0">
            <Logo tone={onDark ? "dark" : "light"} />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                  onDark ? "text-white/70 hover:text-white" : "text-ink/65 hover:text-ink"
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover:scale-x-100",
                    onDark ? "bg-white/70" : "bg-ink/60"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href={switchHref}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                onDark ? "text-white/60 hover:text-white" : "text-ink/55 hover:text-ink"
              )}
              aria-label={dict.nav.languageLabel}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {otherLocale.toUpperCase()}
            </Link>
            <a
              href={siteConfig.externalLoginUrl}
              rel="noopener noreferrer"
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                onDark ? "text-white/70 hover:text-white" : "text-ink/65 hover:text-ink"
              )}
            >
              {dict.nav.login}
            </a>
            <Button href={localizedPath(locale, siteConfig.routes.register)} variant={onDark ? "light" : "primary"}>
              {dict.nav.cta}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors xl:hidden",
              onDark ? "bg-white/10 text-white" : "bg-ink text-white"
            )}
            aria-expanded={open}
            aria-controls={mobileMenuId}
            aria-label={dict.nav.menuLabel}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-Menü: Vollbild, Links steigen gestaffelt auf */}
      <div
        id={mobileMenuId}
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
        className={cn(
          "fixed inset-x-0 top-0 h-dvh overflow-y-auto overscroll-contain bg-night text-white transition-[clip-path] duration-700 ease-out-expo xl:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        )}
      >
        <div aria-hidden="true" className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-violet/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
        <div className="u-container relative flex min-h-full flex-col gap-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28">
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {nav.map((item, i) => (
              <span key={item.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  className={cn(
                    "flex items-center justify-between gap-4 py-3 font-display text-2xl font-medium transition-transform duration-700 ease-out-expo sm:py-4 sm:text-4xl",
                    open ? "translate-y-0" : "translate-y-full"
                  )}
                >
                  {item.label}
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-white/40" aria-hidden="true" />
                </Link>
              </span>
            ))}
          </nav>
          <div
            className={cn(
              "mt-auto flex flex-col gap-4 transition-opacity delay-300 duration-700",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex items-center justify-between text-sm">
              <a href={siteConfig.externalLoginUrl} rel="noopener noreferrer" onClick={() => setOpen(false)} className="font-medium text-white/70">
                {dict.nav.login}
              </a>
              <Link href={switchHref} className="inline-flex items-center gap-1.5 font-medium text-white/70">
                <Globe className="h-4 w-4" aria-hidden="true" />
                {otherLocale === "de" ? "Deutsch" : "English"}
              </Link>
            </div>
            <Button href={localizedPath(locale, siteConfig.routes.register)} variant="light" size="lg" className="w-full">
              {dict.nav.cta}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
