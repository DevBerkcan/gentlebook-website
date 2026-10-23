"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Rahmen wächst beim Hineinscrollen auf volle Größe (scroll-gesteuert). */
export default function ScaleOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current,
        { scale: 0.8, y: 60 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "center 55%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
