"use client";

import { useEffect, useRef, useState } from "react";
import { BellRing, CalendarCheck, Check, Scissors, UserRound } from "lucide-react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

const copy = {
  de: {
    label: "Eine Buchung. Alles verbunden.",
    hint: "Beim Scrollen entdecken oder einen Schritt auswählen.",
    preview: "Beispielvorschau",
    steps: [
      ["Leistung auswählen", "Deine Kundin sieht Leistungen, Dauer und Preise auf einen Blick."],
      ["Lieblingsmenschen wählen", "Sie entscheidet, bei wem sie ihren nächsten Termin buchen möchte."],
      ["Freien Termin finden", "Passende Tage und freie Uhrzeiten machen die Auswahl einfach."],
      ["Buchung bestätigen", "Der Termin landet im Kalender. Die Bestätigung kommt automatisch."],
      ["Rechtzeitig erinnern", "Eine automatische Erinnerung hält den nächsten Besuch im Blick."],
    ],
    reminder: "Dein Termin ist morgen. Wir freuen uns auf dich!",
  },
  en: {
    label: "One booking. Everything connected.",
    hint: "Explore as you scroll or select a step.",
    preview: "Example preview",
    steps: [
      ["Choose a service", "Your client sees services, duration and prices at a glance."],
      ["Choose a team member", "They decide who they would like to book their next appointment with."],
      ["Find an available time", "Available days and time slots make choosing easy."],
      ["Confirm the booking", "The appointment appears in the calendar. Confirmation follows automatically."],
      ["Send a timely reminder", "An automatic reminder keeps the next visit in mind."],
    ],
    reminder: "Your appointment is tomorrow. We look forward to seeing you!",
  },
};
const icons = [Scissors, UserRound, CalendarCheck, Check, BellRing];

export default function BookingStory({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const t = copy[locale];
  const demo = dict.productDemo;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`, () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", root.current);
      steps.forEach((element, index) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
      gsap.fromTo(
        "[data-story-progress]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-story-list]", start: "top 55%", end: "bottom 55%", scrub: true } }
      );
    }, root);
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo("[data-story-panel]", { x: -8, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.5, ease: "expo.out" });
    }, root);
    return () => mm.revert();
  }, [active]);

  return (
    <div ref={root} className="booking-story mt-20">
      <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-display text-3xl font-medium tracking-tight text-ink">{t.label}</h3>
        <p className="text-sm text-mist">{t.hint}</p>
      </div>
      <div className="booking-story-grid grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <ol data-story-list className="relative grid gap-3">
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-ink/10 lg:block" />
          <span aria-hidden="true" data-story-progress className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-brand-gradient lg:block" />
          {t.steps.map(([title, description], index) => (
            <li key={title} data-story-step className="booking-story-step flex items-center lg:pl-8">
              <button
                type="button"
                aria-pressed={active === index}
                aria-controls="booking-story-preview"
                onClick={() => setActive(index)}
                className={cn(
                  "w-full rounded-[1.5rem] border p-6 text-left transition-all duration-500 ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet",
                  active === index ? "border-ink/10 bg-white shadow-lifted" : "border-transparent hover:bg-white/60"
                )}
              >
                <span className={cn("font-display text-sm italic transition-colors", active === index ? "text-violet" : "text-ink/35")}>
                  0{index + 1}
                </span>
                <span className={cn("mt-2 block text-xl font-semibold transition-colors", active === index ? "text-ink" : "text-ink/45")}>
                  {title}
                </span>
                <span className="mt-2 block leading-relaxed text-mist">{description}</span>
              </button>
            </li>
          ))}
        </ol>
        <div
          id="booking-story-preview"
          className="booking-story-preview overflow-hidden rounded-[1.75rem] border border-ink/[0.07] bg-white shadow-lifted"
        >
          <div className="flex items-center justify-between gap-3 border-b border-ink/[0.06] bg-porcelain/80 px-6 py-4">
            <span className="text-sm font-semibold text-ink">Studio Mila</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-mist ring-1 ring-ink/[0.06]">{t.preview}</span>
          </div>
          <div className="space-y-2.5 p-5 sm:p-7">
            {t.steps.map(([title], index) => {
              const Icon = icons[index];
              const detail = [
                demo.services[0].title + " · " + demo.services[0].meta,
                demo.employees[0].name + " · " + demo.employees[0].role,
                demo.dates[1] + " · " + demo.times[1],
                demo.confirmedTitle,
                t.reminder,
              ][index];
              const isActive = active === index;
              const done = index < active;
              return (
                <div
                  key={title}
                  data-story-panel={isActive ? "" : undefined}
                  className={cn(
                    "flex gap-3.5 rounded-2xl border p-4 transition-all duration-500 ease-out-expo",
                    isActive ? "border-violet/30 bg-brand-gradient-soft" : "border-ink/[0.05] bg-white",
                    !isActive && !done && "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500",
                      isActive ? "bg-ink text-white" : done ? "bg-teal/15 text-teal" : "bg-porcelain text-violet"
                    )}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-mist">{title}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
