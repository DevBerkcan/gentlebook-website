"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Magnetic from "@/components/ui/Magnetic";
import AuroraCanvas from "@/components/effects/AuroraCanvas";
import HeroCalendar from "./hero/HeroCalendar";
import { gsap, SplitText, MOTION_OK, DESKTOP_MOTION } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

const liveCopy = {
  de: "Jetzt online buchbar",
  en: "Bookable right now",
};

/** „Live"-Indikator mit lokaler Uhrzeit — erst nach dem Mount, kein Hydration-Mismatch */
function LiveBadge({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <span className="hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur sm:inline-flex">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-teal animate-pulse-ring" />
        <span className="relative h-2 w-2 rounded-full bg-teal" />
      </span>
      {liveCopy[locale]}
      {time && <span className="tabular-nums text-white/40">· {time}</span>}
    </span>
  );
}

/**
 * Hero als gepinnte Bühne (Desktop):
 * 1. Intro — Headline steigt Wort für Wort aus der Maske, Polarlicht blendet ein
 * 2. Scroll — die Copy tritt zurück, der geneigte Kalender richtet sich auf
 *    und füllt sich Termin für Termin; Kennzahlen zählen mit, Toasts erscheinen.
 * Mobil & bei Reduced Motion: normaler Fluss, Kalender statisch darunter.
 */
export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: MOTION_OK, desktop: DESKTOP_MOTION }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion || !root.current) return;
      const q = gsap.utils.selector(root);

      // ── Intro ──
      const title = q(".hero-title")[0] as HTMLElement;
      const accent = q("[data-hero-accent]")[0] as HTMLElement;
      const split = SplitText.create(title, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        wordsClass: "hero-word",
        onSplit(self) {
          // Verlauf pro Wort setzen — background-clip:text überlebt keine transformierten Kinder.
          // Bricht die Zeile um, klont SplitText den Akzent-Span pro Zeile → alle Fragmente behandeln.
          title.querySelectorAll<HTMLElement>("[data-hero-accent]").forEach((fragment) => {
            fragment.classList.remove("text-aurora");
            fragment.querySelectorAll(".hero-word").forEach((w) => w.classList.add("text-aurora"));
          });
          gsap.set(title, { visibility: "visible" });
          return gsap.from(self.words, {
            yPercent: 118,
            rotate: 5,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.075,
            delay: 0.15,
          });
        },
      });

      gsap.fromTo(
        q("[data-hero-fade]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, delay: 0.55 }
      );
      gsap.fromTo(
        q(".hero-calendar-intro"),
        { y: 180, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "expo.out", delay: 0.75 }
      );

      const counters = { util: 0, book: 0 };
      const utilEl = q("[data-count-util]")[0];
      const bookEl = q("[data-count-book]")[0];
      const writeCounters = () => {
        if (utilEl) utilEl.textContent = String(Math.round(counters.util));
        if (bookEl) bookEl.textContent = String(Math.round(counters.book));
      };

      if (desktop) {
        // ── Gepinnte Scroll-Sequenz ──
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(q("[data-hero-copy]"), { y: -160, opacity: 0, duration: 0.3, ease: "power1.in" }, 0)
          .to(q("[data-hero-aurora]"), { opacity: 0.45, duration: 0.5 }, 0)
          .fromTo(
            q(".hero-calendar"),
            { y: () => window.innerHeight * 0.66, rotateX: 42, scale: 0.84 },
            { y: 0, rotateX: 0, scale: 1, duration: 0.42, ease: "power2.out" },
            0
          )
          .fromTo(
            q("[data-appt]"),
            { opacity: 0, scale: 0.5, transformOrigin: "50% 0%" },
            { opacity: 1, scale: 1, duration: 0.06, ease: "back.out(2)", stagger: { each: 0.017, from: "random" } },
            0.3
          )
          .fromTo(q("[data-count-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.36 }, 0.3)
          .fromTo(counters, { util: 0, book: 0 }, { util: 92, book: 18, duration: 0.36, onUpdate: writeCounters }, 0.3)
          .fromTo(
            q("[data-toast]"),
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.08, stagger: 0.12, ease: "back.out(1.6)" },
            0.62
          )
          .to({}, { duration: 0.2 });
      } else {
        // ── Mobil: Kalender füllt sich einmalig beim Hineinscrollen ──
        const trigger = { trigger: q(".hero-calendar")[0], start: "top 75%", once: true };
        gsap.from(q("[data-appt]"), {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "50% 0%",
          duration: 0.6,
          ease: "back.out(2)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: trigger,
        });
        gsap.from(counters, { util: 0, book: 0, duration: 1.4, ease: "power2.out", onUpdate: writeCounters, scrollTrigger: trigger });
        gsap.from(q("[data-toast]"), { opacity: 0, y: 20, duration: 0.8, stagger: 0.2, delay: 0.8, ease: "back.out(1.6)", scrollTrigger: trigger });
      }

      return () => {
        split.revert();
        accent.classList.add("text-aurora");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-theme="dark"
      className="hero-stage relative bg-night text-white"
      aria-labelledby="hero-title"
    >
      <div className="hero-sticky relative overflow-hidden">
        <div data-hero-aurora className="absolute inset-0">
          <AuroraCanvas />
        </div>
        <div aria-hidden="true" className="stage-grid pointer-events-none absolute inset-0" />

        <div className="u-container relative pt-32 sm:pt-36 lg:pt-[clamp(7rem,15vh,10rem)]">
          <div data-hero-copy>
            <div data-hero-fade className="flex items-center justify-between gap-4">
              <Eyebrow tone="dark">{dict.hero.eyebrow}</Eyebrow>
              <LiveBadge locale={locale} />
            </div>

            <h1
              id="hero-title"
              className="hero-title mt-8 font-display text-[clamp(3rem,min(9.2vw,15vh),9.5rem)] font-medium leading-[0.95] tracking-[-0.035em]"
            >
              <span className="block">{dict.hero.titleLine1}</span>
              <span data-hero-accent className="block pb-[0.06em] pr-[0.1em] italic text-aurora">
                {dict.hero.titleLine2}
              </span>
            </h1>

            <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <p data-hero-fade className="max-w-xl text-lg leading-relaxed text-white/70">
                {dict.hero.subline}
              </p>
              <div data-hero-fade className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button href={localizedPath(locale, siteConfig.routes.register)} variant="light" size="lg">
                    {dict.hero.ctaPrimary}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="#product-demo" variant="glass" size="lg">
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {dict.hero.ctaSecondary}
                  </Button>
                </Magnetic>
              </div>
            </div>

            <ul data-hero-fade className="mt-8 flex flex-wrap gap-x-7 gap-y-2.5 text-sm text-white/55" aria-label={dict.hero.trust}>
              {dict.hero.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal" strokeWidth={3} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-calendar-wrap u-container relative mt-14 pb-16 lg:px-0 lg:pb-0">
          <div className="hero-calendar-intro">
            <div className="hero-calendar will-change-transform">
              <HeroCalendar dict={dict} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
