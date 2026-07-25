import {
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

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <Reveal
                key={step.title}
                delay={i * 0.1}
                className="relative rounded-3xl border border-ink/5 bg-white p-7 shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-5 block font-display text-3xl font-semibold text-ink/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
              </Reveal>
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
