import fs from "node:fs";
import path from "node:path";
import { PlayCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Video-Sektion für einen ersten Einblick in die Anwendung.
 *
 * So aktivierst du das echte Video: Lege die Datei unter
 *   public/videos/produkt-einblick.mp4
 * ab (optional zusätzlich ein Vorschaubild unter
 *   public/videos/produkt-einblick-poster.jpg
 * ). Die Sektion erkennt die Datei automatisch beim nächsten Build/Request
 * und zeigt dann den echten Player statt des Platzhalters — keine
 * Code-Änderung nötig.
 */
const VIDEO_PATH = "/videos/produkt-einblick.mp4";
const POSTER_PATH = "/videos/produkt-einblick-poster.jpg";

function publicFileExists(relativePath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}

export default function ProductVideo({ dict }: { dict: Dictionary }) {
  const t = dict.productVideo;
  const hasVideo = publicFileExists(VIDEO_PATH);
  const hasPoster = hasVideo && publicFileExists(POSTER_PATH);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="product-video-title">
      <div className="u-container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="product-video-title"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
            >
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-mist">{t.text}</p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="aspect-video overflow-hidden rounded-3xl border border-ink/5 bg-ink shadow-lifted">
            {hasVideo ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                controls
                preload="none"
                poster={hasPoster ? POSTER_PATH : undefined}
                className="h-full w-full"
              >
                <source src={VIDEO_PATH} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 border-2 border-dashed border-white/15 p-8 text-center">
                <PlayCircle className="h-14 w-14 text-white/25" aria-hidden="true" />
                <div>
                  <p className="font-display text-base font-semibold text-white/70">
                    {t.placeholderTitle}
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/40">
                    {t.placeholderText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
