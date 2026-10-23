"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  text?: ReactNode;
  index?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Anzahl der letzten Wörter, die kursiv im Lichtverlauf gesetzt werden */
  emphasize?: number;
  className?: string;
  children?: ReactNode;
};

/** Titel mit kursiv hervorgehobenen Schlusswörtern — redaktioneller Akzent */
export function EmphasizedTitle({ title, emphasize = 0, tone = "light" }: { title: string; emphasize?: number; tone?: "light" | "dark" }) {
  if (!emphasize) return <>{title}</>;
  const words = title.split(" ");
  const head = words.slice(0, -emphasize).join(" ");
  const tail = words.slice(-emphasize).join(" ");
  return (
    <>
      {head}{" "}
      <em className={cn("font-display italic", tone === "dark" ? "text-aurora" : "text-violet")}>{tail}</em>
    </>
  );
}

/**
 * Einheitlicher Section-Kopf: Zeilen der Headline steigen maskiert
 * aus der Grundlinie auf (SplitText), Eyebrow & Text folgen weich.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  index,
  tone = "light",
  align = "left",
  emphasize = 0,
  className,
  children,
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const title = el.querySelector<HTMLElement>("[data-heading-title]");
      if (!title) return;
      const trigger = { trigger: el, start: "top 85%", once: true };
      const split = SplitText.create(title, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: trigger,
          });
        },
      });
      gsap.from(el.querySelectorAll("[data-heading-fade]"), {
        opacity: 0,
        y: 18,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: trigger,
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, []);

  const dark = tone === "dark";

  return (
    <div
      ref={root}
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}
    >
      <div data-heading-fade>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </div>
      <h2
        id={id}
        data-heading-title
        className={cn(
          "mt-6 font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.02em]",
          dark ? "text-white" : "text-ink"
        )}
      >
        <EmphasizedTitle title={title} emphasize={emphasize} tone={tone} />
      </h2>
      {text && (
        <p
          data-heading-fade
          className={cn(
            "mt-6 text-lg leading-relaxed",
            align === "center" && "mx-auto",
            "max-w-2xl",
            dark ? "text-white/65" : "text-mist"
          )}
        >
          {text}
        </p>
      )}
      {children && <div data-heading-fade>{children}</div>}
    </div>
  );
}
