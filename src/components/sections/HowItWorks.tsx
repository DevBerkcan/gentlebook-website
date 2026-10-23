"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import {
  ArrowRight,
  Settings2,
  Share2,
  CalendarCheck,
  Globe2,
  Instagram,
  Facebook,
  Mail,
  QrCode,
  IdCard,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

const stepIcons = [Settings2, Share2, CalendarCheck];
const shareIcons = [Globe2, Globe2, Instagram, Facebook, Mail, QrCode, IdCard];

/**
 * Drei Schritte auf einer Zeitleiste: Die Linie zeichnet sich scroll-gesteuert,
 * jeder Knoten leuchtet auf, sobald die Linie ihn erreicht.
 */
export default function HowItWorks({ dict, locale, index }: { dict: Dictionary; locale: Locale; index?: string }) {
  const t = dict.howItWorks;
  const root = useRef<HTMLElement>(null);
  const process = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: process.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      });
      tl.fromTo(q("[data-process-line]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 3, ease: "none" }, 0);
      gsap.utils.toArray<HTMLElement>(q("[data-process-step]")).forEach((step, i) => {
        const at = i * 1.25;
        tl.fromTo(
          step.querySelector("[data-node]"),
          { backgroundColor: "#ffffff", color: "#6355e4", scale: 0.85 },
          { backgroundColor: "#14162b", color: "#ffffff", scale: 1, duration: 0.4, ease: "back.out(2)" },
          at
        )
          .fromTo(step.querySelector("[data-node-ring]"), { scale: 0.8, opacity: 0.7 }, { scale: 1.8, opacity: 0, duration: 0.6 }, at)
          .fromTo(step.querySelectorAll("[data-step-copy]"), { opacity: 0.25, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, at);
      });

      gsap.from(q("[data-chip]"), {
        opacity: 0,
        y: 24,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.8)",
        stagger: 0.05,
        scrollTrigger: { trigger: q("[data-chips]")[0], start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="how-it-works" className="py-24 sm:py-32" aria-labelledby="how-it-works-title">
      <div className="u-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="how-it-works-title" index={index} eyebrow={t.eyebrow} title={t.title} emphasize={2} />
          <Magnetic className="shrink-0">
            <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg">
              {t.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Magnetic>
        </div>

        <ol ref={process} className="relative mt-20 grid gap-14 pl-16 md:grid-cols-3 md:gap-10 md:pl-0">
          {/* Zeitleiste: horizontal ab md, vertikal auf Mobil */}
          <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-7 hidden h-px w-full overflow-visible md:block" preserveAspectRatio="none">
            <line x1="28" y1="0" x2="100%" y2="0" stroke="rgba(20,22,43,0.1)" strokeWidth="1.5" />
            <line data-process-line x1="28" y1="0" x2="100%" y2="0" stroke="url(#gb-line)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="gb-line" gradientUnits="userSpaceOnUse" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="0" stopColor="#6355E4" />
                <stop offset="1" stopColor="#17A398" />
              </linearGradient>
            </defs>
          </svg>
          <svg aria-hidden="true" className="pointer-events-none absolute left-7 top-0 h-full w-px overflow-visible md:hidden">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(20,22,43,0.1)" strokeWidth="1.5" />
            <line data-process-line x1="0" y1="0" x2="0" y2="100%" stroke="#6355E4" strokeWidth="1.5" />
          </svg>

          {t.steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <li key={step.title} data-process-step className="relative">
                <span className="absolute -left-16 top-0 md:static md:block">
                  <span className="relative flex h-14 w-14 items-center justify-center">
                    <span data-node-ring aria-hidden="true" className="absolute inset-0 rounded-full border border-violet opacity-0" />
                    <span data-node className="relative flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-ink text-white shadow-soft">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                </span>
                <span data-step-copy className="block font-display text-6xl font-light italic leading-none text-ink/15 md:mt-10">
                  0{i + 1}
                </span>
                <h3 data-step-copy className="mt-5 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p data-step-copy className="mt-3 max-w-sm leading-relaxed text-mist">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Lokales SEO: wie der Buchungslink geteilt werden kann */}
        <div data-chips className="mt-24 rounded-[2rem] border border-ink/[0.06] bg-white/60 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">{t.shareHeading}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {t.shareChannels.map((channel, i) => {
              const Icon = shareIcons[i % shareIcons.length];
              return (
                <li
                  key={channel}
                  data-chip
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-medium text-ink/75 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-violet/40 hover:text-ink hover:shadow-soft"
                >
                  <Icon className="h-4 w-4 text-violet" aria-hidden="true" />
                  {channel}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
