"use client";

import { useEffect, useRef } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Produkt-Showcase: Buchungsseite & Dashboard als CSS-Mockups
 * (gestochen scharf auf jedem Display, keine Bild-Assets nötig).
 * Beide Frames bewegen sich beim Scrollen in leichtem Parallax gegeneinander.
 */
export default function Showcase({ dict }: { dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const m = dict.showcase.mock;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.to("[data-parallax-slow]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to("[data-parallax-fast]", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="showcase"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="showcase-title"
    >
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{dict.showcase.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="showcase-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {dict.showcase.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-mist">{dict.showcase.text}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* ── Mockup 1: gebrandete Buchungsseite ── */}
          <Reveal variant="scale" className="lg:mt-10" >
            <figure data-parallax-slow>
              <div className="overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-lifted">
                {/* Browser-Chrome */}
                <div className="flex items-center gap-2 border-b border-ink/5 bg-lavender/60 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-mist">
                    studio-mila.gentlebook.app
                  </span>
                </div>
                {/* Buchungsseite */}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">{m.salonName}</p>
                      <p className="text-xs text-mist">{m.salonTag}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border-2 border-violet/60 bg-brand-gradient-soft px-4 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-ink">{m.service1}</p>
                        <p className="text-xs text-mist">{m.service1Meta}</p>
                      </div>
                      <span className="h-5 w-5 rounded-full border-[6px] border-violet bg-white" />
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-ink/10 px-4 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-ink">{m.service2}</p>
                        <p className="text-xs text-mist">{m.service2Meta}</p>
                      </div>
                      <span className="h-5 w-5 rounded-full border border-ink/20 bg-white" />
                    </div>
                  </div>
                  {/* Zeit-Slots */}
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {["09:00", "10:30", "13:00", "15:30"].map((t, i) => (
                      <span
                        key={t}
                        className={
                          i === 1
                            ? "rounded-xl bg-brand-gradient px-2 py-2 text-center text-xs font-semibold text-white"
                            : "rounded-xl bg-lavender/70 px-2 py-2 text-center text-xs font-medium text-ink/70"
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-brand-gradient py-3 text-center text-sm font-semibold text-white shadow-cta">
                    {m.bookNow}
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 text-center text-sm font-medium text-mist">
                {dict.showcase.bookingLabel}
              </figcaption>
            </figure>
          </Reveal>

          {/* ── Mockup 2: Admin-Dashboard ── */}
          <Reveal variant="scale" delay={0.12}>
            <figure data-parallax-fast>
              <div className="overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-lifted">
                <div className="flex items-center justify-between border-b border-ink/5 bg-lavender/60 px-5 py-3">
                  <p className="text-sm font-semibold text-ink">{m.today}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-mist">
                    Sa · 09:00–18:00
                  </span>
                </div>
                <div className="p-6">
                  {/* KPI-Zeile */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-lavender/60 p-3.5">
                      <p className="text-xs text-mist">{m.utilization}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-ink">92 %</p>
                    </div>
                    <div className="rounded-2xl bg-lavender/60 p-3.5">
                      <p className="text-xs text-mist">{m.bookings}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-ink">18</p>
                    </div>
                    <div className="rounded-2xl bg-lavender/60 p-3.5">
                      <p className="text-xs text-mist">{m.noShows}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-teal">0</p>
                    </div>
                  </div>
                  {/* Mini-Balkendiagramm */}
                  <div className="mt-5 flex h-24 items-end gap-1.5 rounded-2xl border border-ink/5 p-4">
                    {[38, 55, 44, 70, 62, 88, 74, 95, 82, 66, 58, 78].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className={
                          i === 7
                            ? "flex-1 rounded-t-md bg-brand-gradient"
                            : "flex-1 rounded-t-md bg-violet/20"
                        }
                      />
                    ))}
                  </div>
                  {/* Team-Zeile */}
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-lavender/60 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-ink">
                      <Users className="h-4 w-4 text-violet" aria-hidden="true" />
                      {m.team}
                    </span>
                    <span className="flex -space-x-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white ring-2 ring-white">M</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white ring-2 ring-white">A</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white ring-2 ring-white">L</span>
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-2xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-ink">
                    <TrendingUp className="h-4 w-4 text-teal" aria-hidden="true" />
                    <span className="text-xs sm:text-sm">+23 % vs. letzte Woche</span>
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 text-center text-sm font-medium text-mist">
                {dict.showcase.dashboardLabel}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
