"use client";

import { useEffect, useRef } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { Dictionary } from "@/lib/dictionaries";

const bars = [38, 55, 44, 70, 62, 88, 74, 95, 82, 66, 58, 78];

/**
 * Produkt-Showcase als Bühne: Dashboard (Browser) und Buchungsseite (Smartphone)
 * überlappen sich, werden per Maske aufgedeckt, bewegen sich im Parallax
 * gegeneinander und neigen sich leicht zum Cursor.
 */
export default function Showcase({ dict, index }: { dict: Dictionary; index?: string }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const m = dict.showcase.mock;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const trigger = { trigger: stage.current, start: "top 75%", once: true };

      gsap.fromTo(
        q("[data-mask]"),
        { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1.5, ease: "expo.inOut", stagger: 0.18, clearProps: "clipPath", scrollTrigger: trigger }
      );
      gsap.from(q("[data-bar]"), {
        scaleY: 0,
        transformOrigin: "50% 100%",
        duration: 1,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.9,
        scrollTrigger: trigger,
      });
      gsap.from(q("[data-tag]"), { opacity: 0, y: 16, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 1.2, scrollTrigger: trigger });

      const scrub = { trigger: stage.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(q("[data-depth='far']"), { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(q("[data-depth='near']"), { yPercent: 22 }, { yPercent: -18, ease: "none", scrollTrigger: scrub });

      // Leichte 3D-Neigung zum Cursor (nur feiner Zeiger)
      const el = stage.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const tilt = el.querySelector<HTMLElement>("[data-tilt]");
      const rx = gsap.quickTo(tilt, "rotateX", { duration: 1.2, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotateY", { duration: 1.2, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="showcase" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="showcase-title">
      <div className="u-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHeading id="showcase-title" index={index} eyebrow={dict.showcase.eyebrow} title={dict.showcase.title} emphasize={3} />
          <p className="max-w-md text-lg leading-relaxed text-mist lg:justify-self-end">{dict.showcase.text}</p>
        </div>

        <div ref={stage} className="relative mt-16 [perspective:2000px] sm:mt-24">
          <div data-tilt className="relative [transform-style:preserve-3d]">
            {/* ── Dashboard ── */}
            <figure data-depth="far" className="relative ml-auto w-full lg:w-[80%]">
              <div data-mask className="overflow-hidden rounded-[1.75rem] border border-ink/[0.06] bg-white shadow-lifted">
                <div className="flex items-center justify-between border-b border-ink/[0.06] bg-porcelain/80 px-5 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    </span>
                    <span className="text-sm font-semibold text-ink">{m.today}</span>
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-mist ring-1 ring-ink/[0.06]">Sa · 09:00–18:00</span>
                </div>
                <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:pl-[24%]">
                  <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
                    {[
                      [m.utilization, "92 %", "text-ink"],
                      [m.bookings, "18", "text-ink"],
                      [m.noShows, "0", "text-teal"],
                    ].map(([label, value, color]) => (
                      <div key={label} className="rounded-2xl bg-porcelain p-4">
                        <p className="text-xs text-mist">{label}</p>
                        <p className={`mt-1 font-display text-2xl font-medium sm:text-3xl ${color}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex h-44 items-end gap-1.5 rounded-2xl border border-ink/[0.06] p-4 sm:h-52">
                      {bars.map((h, i) => (
                        <span
                          key={i}
                          data-bar
                          style={{ height: `${h}%` }}
                          className={i === 7 ? "flex-1 rounded-t-md bg-brand-gradient" : "flex-1 rounded-t-md bg-violet/15"}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-porcelain px-4 py-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <Users className="h-4 w-4 text-violet" aria-hidden="true" />
                        {m.team}
                      </span>
                      <span className="flex -space-x-2">
                        {[
                          ["M", "bg-violet"],
                          ["A", "bg-teal"],
                          ["L", "bg-ink"],
                        ].map(([l, c]) => (
                          <span key={l} className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${c}`}>
                            {l}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-teal/25 bg-teal/[0.08] px-4 py-3 text-sm text-ink">
                      <TrendingUp className="h-4 w-4 text-teal" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">{m.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption data-tag className="mt-4 flex items-center justify-end gap-3 text-sm font-medium text-mist">
                <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
                {dict.showcase.dashboardLabel}
              </figcaption>
            </figure>

            {/* ── Smartphone mit Buchungsseite ── */}
            <figure
              data-depth="near"
              className="relative mx-auto mt-12 w-[min(20rem,86vw)] lg:absolute lg:left-0 lg:top-[8%] lg:mt-0 lg:w-[19rem]"
            >
              <div data-mask className="rounded-[2.6rem] bg-ink p-2.5 shadow-stage">
                <div className="overflow-hidden rounded-[2.1rem] bg-white">
                  <div className="flex justify-center pb-1 pt-2.5" aria-hidden="true">
                    <span className="h-5 w-24 rounded-full bg-ink" />
                  </div>
                  <div className="px-5 pb-6 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-lg font-medium text-ink">{m.salonName}</p>
                        <p className="text-xs text-mist">{m.salonTag}</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2.5">
                      <div className="flex items-center justify-between rounded-2xl border-2 border-violet/60 bg-brand-gradient-soft px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-ink">{m.service1}</p>
                          <p className="text-xs text-mist">{m.service1Meta}</p>
                        </div>
                        <span className="h-5 w-5 rounded-full border-[6px] border-violet bg-white" />
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-ink/10 px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-ink">{m.service2}</p>
                          <p className="text-xs text-mist">{m.service2Meta}</p>
                        </div>
                        <span className="h-5 w-5 rounded-full border border-ink/20 bg-white" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-1.5">
                      {["09:00", "10:30", "13:00", "15:30"].map((t, i) => (
                        <span
                          key={t}
                          className={
                            i === 1
                              ? "rounded-xl bg-ink px-1 py-2 text-center text-[11px] font-semibold text-white"
                              : "rounded-xl bg-porcelain px-1 py-2 text-center text-[11px] font-medium text-ink/70"
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 rounded-2xl bg-brand-gradient py-3 text-center text-sm font-semibold text-white shadow-cta">
                      {m.bookNow}
                    </div>
                  </div>
                </div>
              </div>
              <figcaption data-tag className="mt-4 flex items-center justify-center gap-3 text-sm font-medium text-mist lg:justify-start">
                <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
                {dict.showcase.bookingLabel}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
