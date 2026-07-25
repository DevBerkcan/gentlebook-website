import { MessageCircleQuestion } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

export default function ObjectionSection({ dict }: { dict: Dictionary }) {
  const t = dict.objections;

  return (
    <section className="bg-lavender/40 py-20 sm:py-28" aria-labelledby="objections-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="objections-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {t.items.map((item, i) => (
            <Reveal
              key={item.q}
              delay={Math.min(i * 0.04, 0.3)}
              className="flex gap-4 rounded-2xl border border-ink/5 bg-white p-6 shadow-soft"
            >
              <MessageCircleQuestion
                className="mt-0.5 h-5 w-5 shrink-0 text-violet"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-semibold text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
