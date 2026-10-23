"use client";

import { useEffect, useRef, type ComponentType } from "react";
import {
  CalendarClock,
  Users,
  MailCheck,
  ListPlus,
  UserX,
  Palette,
  ContactRound,
  BarChart3,
  Link2,
  KeyRound,
  MoonStar,
  Instagram,
  CalendarCheck,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Spotlight from "@/components/ui/Spotlight";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [CalendarClock, Users, MailCheck, ListPlus, UserX, Palette, ContactRound, BarChart3, Link2, KeyRound];

/** Bento-Raster: Position im Array → Kachelgröße */
const layout: Record<number, string> = {
  0: "md:col-span-2 lg:row-span-2",
  5: "md:col-span-2",
  8: "md:col-span-2",
  9: "md:col-span-2",
};

/** 24/7: Buchungen, die nachts eintrudeln */
function NightVisual({ services }: { services: string[] }) {
  const rows = ["21:14", "22:38", "23:47"].map((time, i) => [time, services[i % services.length]]);
  return (
    <div className="relative mt-8 flex-1">
      <div className="flex items-baseline gap-3">
        <MoonStar className="h-6 w-6 text-lavender" aria-hidden="true" />
        <span className="font-display text-6xl font-light tabular-nums tracking-tight text-white sm:text-7xl">23:47</span>
      </div>
      <ul className="mt-8 space-y-2.5">
        {rows.map(([time, label], i) => (
          <li
            key={time}
            data-night-row
            className={cn(
              "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur",
              i === rows.length - 1 && "border-violet/50 bg-violet/20"
            )}
          >
            <CalendarCheck className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
            <span className="text-sm font-medium text-white/85">{label}</span>
            <span className="ml-auto text-xs tabular-nums text-white/45">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Eigene Buchungsseite: Markenfarben wechseln durch */
function BrandVisual() {
  return (
    <div className="mt-6 flex items-center gap-4" aria-hidden="true">
      <div className="flex-1 overflow-hidden rounded-2xl border border-ink/[0.07] bg-porcelain">
        <div className="h-9 animate-[hue_10s_linear_infinite] bg-brand-gradient" />
        <div className="space-y-2 p-3">
          <div className="h-2 w-2/3 rounded-full bg-ink/15" />
          <div className="h-2 w-1/2 rounded-full bg-ink/10" />
          <div className="mt-3 h-6 w-24 animate-[hue_10s_linear_infinite] rounded-full bg-violet" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {["bg-violet", "bg-teal", "bg-ink", "bg-[#E4A0B7]"].map((c) => (
          <span key={c} className={cn("h-6 w-6 rounded-full ring-2 ring-white shadow-soft", c)} />
        ))}
      </div>
    </div>
  );
}

/** Link-Seite für die Social-Bio */
function LinkVisual() {
  return (
    <div className="mt-6 flex gap-2.5" aria-hidden="true">
      {[
        [CalendarCheck, "bg-ink text-white"],
        [Instagram, "bg-porcelain text-ink"],
        [MapPin, "bg-porcelain text-ink"],
      ].map(([Icon, cls], i) => {
        const I = Icon as typeof CalendarCheck;
        return (
          <span key={i} className={cn("flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold", cls as string)}>
            <I className="h-3.5 w-3.5" />
            <span className="h-1.5 w-8 rounded-full bg-current opacity-30" />
          </span>
        );
      })}
    </div>
  );
}

/** Kundenportal: Termin aus der Mail heraus verwalten */
function PortalVisual() {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/[0.07] bg-porcelain p-3" aria-hidden="true">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet shadow-soft">
        <MailCheck className="h-4 w-4" />
      </span>
      <span className="flex-1 space-y-1.5">
        <span className="block h-2 w-3/4 rounded-full bg-ink/15" />
        <span className="block h-2 w-1/2 rounded-full bg-ink/10" />
      </span>
      <span className="rounded-full bg-ink px-3 py-1.5 text-[10px] font-semibold text-white">•••</span>
    </div>
  );
}

const visuals: Record<number, ComponentType> = {
  5: BrandVisual,
  8: LinkVisual,
  9: PortalVisual,
};

export default function Features({ dict, index }: { dict: Dictionary; index?: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-feature-card]"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: q("[data-bento]")[0], start: "top 80%", once: true },
        }
      );
      gsap.from(q("[data-night-row]"), {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.25,
        delay: 0.6,
        scrollTrigger: { trigger: q("[data-bento]")[0], start: "top 80%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="features" className="py-24 sm:py-32" aria-labelledby="features-title">
      <div className="u-container">
        <SectionHeading id="features-title" index={index} eyebrow={dict.features.eyebrow} title={dict.features.title} emphasize={2} />

        <div data-bento className="mt-16 grid auto-rows-[minmax(14rem,auto)] gap-4 [grid-auto-flow:dense] md:grid-cols-2 lg:grid-cols-4">
          {dict.features.items.map((f, i) => {
            const Icon = icons[i % icons.length];
            const Visual = visuals[i];
            const hero = i === 0;
            return (
              <Spotlight
                as="article"
                key={f.title}
                data-feature-card=""
                className={cn(
                  "group flex flex-col overflow-hidden rounded-[1.75rem] p-7 transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1",
                  hero
                    ? "relative bg-night text-white shadow-stage"
                    : "border border-ink/[0.07] bg-white hover:shadow-lifted",
                  layout[i]
                )}
              >
                {hero && (
                  <>
                    <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet/40 blur-3xl" />
                    <div aria-hidden="true" className="absolute -bottom-24 -left-10 h-60 w-60 rounded-full bg-teal/25 blur-3xl" />
                  </>
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out-expo group-hover:rotate-[-10deg]",
                      hero ? "bg-white/10 text-lavender" : "bg-porcelain text-violet group-hover:bg-ink group-hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className={cn("font-display text-sm italic", hero ? "text-white/35" : "text-ink/30")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {hero && <NightVisual services={dict.productDemo.services.map((s) => s.title)} />}
                <h3 className={cn("relative mt-auto pt-8 font-semibold", hero ? "text-2xl sm:text-3xl" : "text-lg")}>{f.title}</h3>
                <p className={cn("relative mt-2 text-[0.95rem] leading-relaxed", hero ? "max-w-sm text-white/60" : "text-mist")}>{f.text}</p>
                {Visual && <Visual />}
              </Spotlight>
            );
          })}
        </div>
      </div>
    </section>
  );
}
