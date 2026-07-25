import { cn } from "@/lib/utils";

/** Wortmarke „GentleBook" mit der offiziellen Bildmarke in Gradient-Kachel. */
export default function Logo({
  className,
  tileClassName,
}: {
  className?: string;
  tileClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-cta",
          tileClassName
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 48 48" width="20" height="20" fill="none">
          <circle cx="24" cy="19" r="11.5" stroke="currentColor" strokeWidth="5" />
          <path
            d="M35.5 19 V29.5 a11.5 11.5 0 0 1 -19 8.6"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        GentleBook
      </span>
    </span>
  );
}
