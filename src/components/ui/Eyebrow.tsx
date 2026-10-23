import { cn } from "@/lib/utils";

/**
 * Redaktionelles Label über Section-Headlines:
 * optionale Kapitelnummer „(03)" + Haarlinie + Versalien.
 */
export default function Eyebrow({
  children,
  className,
  index,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
        dark ? "text-white/60" : "text-ink/55",
        className
      )}
    >
      {index && (
        <span
          className={cn(
            "font-display text-sm font-medium normal-case italic tracking-normal",
            dark ? "text-lavender" : "text-violet"
          )}
        >
          ({index})
        </span>
      )}
      <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-white/25" : "bg-ink/20")} />
      {children}
    </span>
  );
}
