"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Zieht das Kind sanft zum Cursor (nur bei feinem Zeiger & erlaubter Bewegung).
 * quickTo statt React-State → kein Re-Render pro Mausbewegung.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.45)" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
