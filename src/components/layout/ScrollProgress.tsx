"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/** Haarfeiner Lesefortschritt am oberen Rand */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-brand-gradient" />
    </div>
  );
}
