"use client";

import { useEffect, useRef } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { gsap, MOTION_OK } from "@/lib/gsap";
import {
  Check,
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
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

const stepIcons = [Settings2, Share2, CalendarCheck];
const shareIcons = [Globe2, Globe2, Instagram, Facebook, Mail, QrCode, IdCard];

export default function HowItWorks({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.howItWorks;
  const process = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin);
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: process.current, start: "top 75%", end: "bottom 45%", scrub: 0.4 } });
      timeline.fromTo("[data-process-line]", { drawSVG: "0%" }, { drawSVG: "100% live", duration: 3, ease: "none" }, 0);
      gsap.utils.toArray<HTMLElement>("[data-process-card]", process.current).forEach((card, index) => {
        timeline.fromTo(card, { y: 8 }, { y: 0, duration: 0.35 }, index);
        timeline.fromTo(card.querySelector("[data-process-check]"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3 }, index);
        timeline.fromTo(card.querySelector("[data-process-icon]"), { backgroundColor: "#ecebf2", color: "#6355e4" }, { backgroundColor: "#6355e4", color: "#ffffff", duration: 0.3 }, index);
        timeline.fromTo(card.querySelector("[data-process-text]"), { opacity: 0.4 }, { opacity: 1, duration: 0.4 }, index);
      });
    }, process);
    return () => mm.revert();
  }, []);

  return (
    <section id="how-it-works" className="py-20 sm:py-28" aria-labelledby="how-it-works-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="how-it-works-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
        </div>

        <div ref={process} className="relative mt-14 grid gap-6 pl-6 md:grid-cols-3 md:pl-0 md:pt-8">
          <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 hidden h-4 w-full overflow-visible md:block">
            <line x1="16%" y1="8" x2="84%" y2="8" fill="none" stroke="#ecebf2" strokeWidth="2" />
            <line data-process-line x1="16%" y1="8" x2="84%" y2="8" fill="none" stroke="#6355e4" strokeWidth="2" />
          </svg>
          <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-4 md:hidden">
            <line x1="8" y1="0" x2="8" y2="100%" fill="none" stroke="#ecebf2" strokeWidth="2" />
            <line data-process-line x1="8" y1="0" x2="8" y2="100%" fill="none" stroke="#6355e4" strokeWidth="2" />
          </svg>
          {t.steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <div
                key={step.title}
                data-process-card
                className="relative rounded-3xl border border-ink/5 bg-white p-7 shadow-soft"
              >
                <span data-process-icon className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-violet text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span data-process-check className="absolute -right-2 -top-2 rounded-full bg-teal p-1 text-white"><Check className="h-3 w-3" aria-hidden="true" /></span>
                </span>
                <span className="mt-5 block font-display text-3xl font-semibold text-ink/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p data-process-text className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Button href={localizedPath(locale, siteConfig.routes.register)} size="lg">
            {t.ctaLabel}
          </Button>
        </Reveal>

        {/* Lokales SEO: wie der Buchungslink geteilt werden kann */}
        <Reveal delay={0.1} className="mt-16">
          <p className="text-center text-sm font-medium text-ink/70">{t.shareHeading}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {t.shareChannels.map((channel, i) => {
              const Icon = shareIcons[i % shareIcons.length];
              return (
                <span
                  key={channel}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium text-ink/70"
                >
                  <Icon className="h-3.5 w-3.5 text-violet" aria-hidden="true" />
                  {channel}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
