import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /**
   * primary  – Ink-Fläche, Marken-Verlauf steigt beim Hover auf
   * light    – Weiße Fläche für dunkle Sektionen
   * outline  – Kontur auf hellem Grund
   * glass    – Kontur auf dunklem Grund
   * ghost    – reiner Textlink
   */
  variant?: "primary" | "light" | "outline" | "glass" | "ghost";
  size?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
  title?: string;
  target?: string;
  rel?: string;
  id?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
  title,
  target,
  rel,
  id,
  onClick,
}: ButtonProps) {
  const filled = variant === "primary" || variant === "light";

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
      id={id}
      onClick={onClick}
      className={cn(
        "group relative isolate inline-flex min-h-11 max-w-full items-center justify-center gap-2 overflow-hidden rounded-full text-center font-semibold transition-[color,box-shadow,border-color,background-color] duration-500 ease-out-expo [&>svg]:shrink-0",
        size === "lg" ? "px-7 py-4 text-[0.95rem]" : "px-5 py-2.5 text-sm",
        variant === "primary" && "bg-ink text-white shadow-[0_14px_40px_-12px_rgba(20,22,43,0.55)] hover:shadow-cta",
        variant === "light" && "bg-white text-ink hover:text-white",
        variant === "outline" && "border border-ink/15 bg-white/60 text-ink backdrop-blur hover:border-ink/40",
        variant === "glass" && "border border-white/20 bg-white/[0.04] text-white backdrop-blur hover:border-white/50 hover:bg-white/10",
        variant === "ghost" && "text-ink hover:text-violet",
        className
      )}
    >
      {filled && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-y-[101%] rounded-full bg-brand-gradient transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        />
      )}
      {children}
    </Link>
  );
}
