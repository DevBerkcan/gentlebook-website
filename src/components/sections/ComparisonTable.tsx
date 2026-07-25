import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

function ValueIcon({ value }: { value: "no" | "partial" | "yes" }) {
  if (value === "yes") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-lavender text-ink/50">
        <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 text-ink/30">
      <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

const valueLabel: Record<"no" | "partial" | "yes", string> = {
  no: "Nein",
  partial: "Teilweise",
  yes: "Ja",
};

export default function ComparisonTable({ dict }: { dict: Dictionary }) {
  const t = dict.comparison;

  return (
    <section className="py-20 sm:py-28" aria-labelledby="comparison-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="comparison-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-mist">{t.text}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-3xl border border-ink/10 bg-white">
            <thead>
              <tr>
                <th scope="col" className="p-5 text-left text-sm font-semibold text-ink/60">
                  &nbsp;
                </th>
                {t.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "p-5 text-center text-sm font-semibold",
                      i === t.columns.length - 1 ? "bg-brand-gradient-soft text-violet" : "text-ink/60"
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, ri) => (
                <tr key={row.feature} className={ri % 2 === 0 ? "bg-lavender/20" : undefined}>
                  <th scope="row" className="p-5 text-left text-sm font-medium text-ink">
                    {row.feature}
                  </th>
                  {row.values.map((value, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "p-5 text-center",
                        ci === row.values.length - 1 && "bg-brand-gradient-soft/40"
                      )}
                    >
                      <span className="sr-only">{valueLabel[value]}</span>
                      <ValueIcon value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-6 text-center text-xs text-mist">{t.disclaimer}</p>
      </div>
    </section>
  );
}
