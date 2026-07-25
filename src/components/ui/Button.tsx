import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  className?: string;
};

/**
 * CTA-Button. "primary" trägt den Marken-Gradient —
 * bewusst sparsam eingesetzt (1–2 pro Viewport).
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300",
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
        variant === "primary" &&
          "bg-brand-gradient text-white shadow-cta hover:-translate-y-0.5 hover:shadow-lifted",
        variant === "outline" &&
          "border border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-ink/30 hover:bg-white",
        variant === "ghost" && "text-ink hover:text-violet",
        className
      )}
    >
      {children}
    </Link>
  );
}
