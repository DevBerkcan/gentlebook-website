"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck, BellRing, Play, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroVisual from "@/components/three/HeroVisual";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";
import { CheckCircle2 } from "lucide-react";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Headline-Zeilen steigen aus der Maske
      tl.fromTo(
        "[data-hero-line] > span",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, stagger: 0.12 },
        0.15
      )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.55
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          0.4
        )
        .fromTo(
          "[data-hero-chip]",
          { opacity: 0, y: 26, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18, ease: "back.out(1.6)" },
          1
        );

      // Sanfter Parallax des Visuals beim Weiterscrollen
      gsap.to("[data-hero-visual]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-lavender/70 via-white to-white pb-16 pt-32 sm:pb-24 sm:pt-40"
      aria-labelledby="hero-title"
    >
      {/* dekorative Blur-Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-56 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
      />

      <div className="u-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="max-w-xl">
            <div data-hero-fade className="motion-safe:opacity-0">
              <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.05] tracking-tight text-ink"
            >
              <span className="line-mask" data-hero-line>
                <span>{dict.hero.titleLine1}</span>
              </span>
              <span className="line-mask" data-hero-line>
                <span className="text-gradient italic">{dict.hero.titleLine2}</span>
              </span>
            </h1>

            <p
              data-hero-fade
              className="mt-6 max-w-lg text-lg leading-relaxed text-mist motion-safe:opacity-0"
            >
              {dict.hero.subline}
            </p>

            <div
              data-hero-fade
              className="mt-8 flex flex-wrap items-center gap-4 motion-safe:opacity-0"
            >
              <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg">
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="#product-demo" variant="outline" size="lg">
                <Play className="h-4 w-4" />
                {dict.hero.ctaSecondary}
              </Button>
            </div>

            <p data-hero-fade className="mt-6 text-sm text-mist motion-safe:opacity-0">
              {dict.hero.trust}
            </p>

            <ul
              data-hero-fade
              className="mt-5 grid max-w-lg grid-cols-1 gap-x-6 gap-y-2 text-sm text-ink/70 motion-safe:opacity-0 sm:grid-cols-2"
            >
              {dict.hero.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative mx-auto aspect-[10/9] w-full max-w-[560px]">
            <div data-hero-visual className="absolute inset-0 motion-safe:opacity-0">
              <HeroVisual />
            </div>

            {/* Floating Notification-Chips über dem 3D-Visual */}
            <div
              data-hero-chip
              className="motion-safe:opacity-0 absolute left-0 top-[14%] flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lifted backdrop-blur-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <CalendarCheck className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {dict.hero.cardBooking}
                </span>
                <span className="block text-xs text-mist">{dict.hero.cardBookingDetail}</span>
              </span>
            </div>

            <div
              data-hero-chip
              className="motion-safe:opacity-0 absolute bottom-[10%] right-0 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lifted backdrop-blur-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-white">
                <BellRing className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {dict.hero.cardReminder}
                </span>
                <span className="block text-xs text-mist">{dict.hero.cardReminderDetail}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scroll-Hinweis */}
        <div className="mt-16 hidden justify-center lg:flex" aria-hidden="true">
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist">
            {dict.hero.scrollHint}
            <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-violet to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
