import fs from "node:fs";
import path from "node:path";
import { Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScaleOnScroll from "@/components/effects/ScaleOnScroll";
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

export default function ProductVideo({ dict, index }: { dict: Dictionary; index?: string }) {
  const t = dict.productVideo;
  const hasVideo = publicFileExists(VIDEO_PATH);
  const hasPoster = hasVideo && publicFileExists(POSTER_PATH);

  return (
    <section
      data-nav-theme="dark"
      className="relative mx-2 overflow-hidden rounded-[2rem] bg-night py-24 text-white sm:mx-4 sm:rounded-[2.75rem] sm:py-32"
      aria-labelledby="product-video-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]" />
      <div aria-hidden="true" className="stage-grid pointer-events-none absolute inset-0" />

      <div className="u-container relative">
        <SectionHeading id="product-video-title" index={index} eyebrow={t.eyebrow} title={t.title} text={t.text} tone="dark" align="center" emphasize={2} />

        <ScaleOnScroll className="mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-glow">
            {hasVideo ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls preload="none" poster={hasPoster ? POSTER_PATH : undefined} className="h-full w-full">
                <source src={VIDEO_PATH} type="video/mp4" />
              </video>
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-8 text-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(60%_80%_at_30%_20%,rgba(99,85,228,0.45),transparent_70%),radial-gradient(50%_70%_at_80%_90%,rgba(23,163,152,0.3),transparent_70%)]"
                />
                <span className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" />
                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-ink shadow-lifted">
                    <Play className="ml-1 h-7 w-7" aria-hidden="true" />
                  </span>
                </span>
                <div className="relative">
                  <p className="font-display text-xl font-medium text-white">{t.placeholderTitle}</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/55">{t.placeholderText}</p>
                </div>
              </div>
            )}
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
}
