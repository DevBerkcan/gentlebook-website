"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";

/** Riesige Wortmarke am Seitenende — Buchstaben steigen gestaffelt auf. */
export default function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const split = SplitText.create(ref.current, { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.045,
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <p
      ref={ref}
      aria-hidden="true"
      className="select-none whitespace-nowrap text-center font-display text-[18.5vw] font-medium leading-[0.8] tracking-[-0.05em] text-white/[0.06]"
    >
      GentleBook
    </p>
  );
}
