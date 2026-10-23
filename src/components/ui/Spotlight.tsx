"use client";

import { createElement, type ElementType, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Karte mit Licht, das dem Cursor folgt (.spotlight in globals.css).
 * Schreibt nur CSS-Variablen — kein React-State, keine Re-Renders.
 */
export default function Spotlight({
  children,
  className,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: `data-${string}`]: string | undefined;
}) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  }

  return createElement(as, { className: cn("spotlight", className), onPointerMove, ...rest }, children);
}
