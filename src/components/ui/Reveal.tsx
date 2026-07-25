"use client";

import { createElement, useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Verzögerung in Sekunden (für gestaffelte Nachbarn) */
  delay?: number;
  /** "up" (Standard) oder "scale" für Karten/Mockups */
  variant?: "up" | "scale";
  id?: string;
};

/**
 * Generischer Scroll-Reveal.
 * Der Startzustand kommt aus globals.css ([data-reveal], nur bei
 * prefers-reduced-motion: no-preference) — dadurch kein Aufblitzen
 * und automatisch barrierefrei.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  variant = "up",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, [delay]);

  const dataAttr = variant === "scale" ? { "data-reveal-scale": "" } : { "data-reveal": "" };

  return createElement(
    Tag,
    {
      ref,
      id,
      className,
      ...dataAttr,
    },
    children
  );
}
