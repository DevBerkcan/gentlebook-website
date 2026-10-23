"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Helles „Papier", das sich über die dunkle Bühne legt und dabei
 * auf volle Breite aufzieht. Bewusst clip-path statt transform —
 * ein transformierter Vorfahr würde gepinnte Sektionen darin brechen.
 */
export default function SheetReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0% 4% 0% 4% round 3rem 3rem 0rem 0rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 2.5rem 2.5rem 0rem 0rem)",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 25%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-porcelain">
      {children}
    </div>
  );
}
