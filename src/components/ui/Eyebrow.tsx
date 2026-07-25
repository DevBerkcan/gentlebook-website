import { cn } from "@/lib/utils";

/** Kleines Label über Section-Headlines */
export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet",
        className
      )}
    >
      {children}
    </span>
  );
}
