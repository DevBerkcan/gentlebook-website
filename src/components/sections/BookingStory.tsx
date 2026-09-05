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
    try: "Jetzt selbst ausprobieren",
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
    try: "Try it yourself",
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
    }, root);
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo("[data-story-panel]", { y: 8, opacity: 0.65 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
    }, root);
    return () => mm.revert();
  }, [active]);

  return (
    <div ref={root} className="booking-story mt-12">
      <div className="mb-8 text-center">
        <h3 className="font-display text-2xl font-semibold text-ink">{t.label}</h3>
        <p className="mt-2 text-sm text-mist">{t.hint}</p>
      </div>
      <div className="booking-story-grid grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <ol className="grid gap-3">
          {t.steps.map(([title, description], index) => (
            <li key={title} data-story-step className="booking-story-step flex items-center">
              <button type="button" aria-pressed={active === index} aria-controls="booking-story-preview" onClick={() => setActive(index)}
                className={cn("w-full rounded-2xl border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet", active === index ? "border-violet/30 bg-lavender/70" : "border-ink/5 bg-white hover:bg-lavender/30")}>
                <span className="text-xs font-semibold tracking-widest text-violet">0{index + 1}</span>
                <span className="mt-2 block text-lg font-semibold text-ink">{title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-mist">{description}</span>
              </button>
            </li>
          ))}
        </ol>
        <div id="booking-story-preview" className="booking-story-preview overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-lifted">
          <div className="flex items-center justify-between gap-3 border-b border-ink/5 bg-lavender/60 px-6 py-4">
            <span className="text-sm font-semibold text-ink">Studio Mila</span>
            <span className="text-xs text-mist">{t.preview}</span>
          </div>
          <div className="space-y-3 p-5 sm:p-7">
            {t.steps.map(([title], index) => {
              const Icon = icons[index];
              const detail = [demo.services[0].title + " · " + demo.services[0].meta, demo.employees[0].name + " · " + demo.employees[0].role, demo.dates[1] + " · " + demo.times[1], demo.confirmedTitle, t.reminder][index];
              return (
                <div key={title} data-story-panel={active === index ? "" : undefined}
                  className={cn("flex gap-3 rounded-2xl border p-4 transition-colors", active === index ? "border-violet/40 bg-brand-gradient-soft" : "border-ink/5 bg-white")}>
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", active === index ? "bg-violet text-white" : "bg-lavender text-violet")}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  <div><p className="text-xs font-medium text-mist">{title}</p><p className="mt-1 text-sm font-semibold text-ink">{detail}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="mt-12 text-center font-display text-xl font-semibold text-ink">{t.try}</p>
    </div>
  );
}
