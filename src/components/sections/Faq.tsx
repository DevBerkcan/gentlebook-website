"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/siteConfig";
import { localizedPath, type Locale } from "@/lib/locales";

export default function Faq({ dict, locale, index }: { dict: Dictionary; locale: Locale; index?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const contactHref = localizedPath(locale, siteConfig.routes.contact);

  return (
    <section id="faq" className="py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="u-container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" index={index} eyebrow={dict.faq.eyebrow} title={dict.faq.title} emphasize={2} />
          <Reveal delay={0.2} className="mt-10">
            <Link
              href={contactHref}
              className="group inline-flex items-center gap-3 rounded-full border border-ink/15 py-2 pl-5 pr-2 text-sm font-semibold text-ink transition-colors duration-500 hover:border-ink"
            >
              {dict.footer.contact}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="border-t border-ink/10">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.25)} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "text-lg font-semibold transition-colors duration-300 sm:text-xl",
                        isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out-expo",
                        isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-ink/15 text-ink/60 group-hover:border-ink/40"
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 leading-relaxed text-mist">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
