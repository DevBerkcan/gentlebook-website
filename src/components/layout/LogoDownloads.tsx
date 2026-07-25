import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

type Asset = {
  label: string;
  preview: string;
  previewClassName?: string;
  svg?: string;
  png?: string;
};

const BRAND = "/brand";

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <div
        className={`flex h-28 items-center justify-center rounded-xl ${
          asset.previewClassName ?? "bg-lavender/50"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset.preview} alt={asset.label} className="max-h-14 max-w-[78%]" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink">{asset.label}</span>
        <div className="flex items-center gap-3">
          {asset.svg && (
            <a
              href={asset.svg}
              download
              className="text-xs font-semibold text-violet transition-colors hover:text-ink"
            >
              SVG
            </a>
          )}
          {asset.png && (
            <a
              href={asset.png}
              download
              className="text-xs font-semibold text-violet transition-colors hover:text-ink"
            >
              PNG
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LogoDownloads({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.logoPage;

  const variants: Asset[] = [
    {
      label: t.vertical,
      preview: `${BRAND}/svg/gentlebook-logo-vertical.svg`,
      svg: `${BRAND}/svg/gentlebook-logo-vertical.svg`,
    },
    {
      label: t.wordmark,
      preview: `${BRAND}/svg/gentlebook-wordmark.svg`,
      svg: `${BRAND}/svg/gentlebook-wordmark.svg`,
    },
    {
      label: t.markColor,
      preview: `${BRAND}/svg/gentlebook-mark.svg`,
      svg: `${BRAND}/svg/gentlebook-mark.svg`,
      png: `${BRAND}/png/gentlebook-mark-512.png`,
    },
    {
      label: t.markBlack,
      preview: `${BRAND}/svg/gentlebook-mark-black.svg`,
      svg: `${BRAND}/svg/gentlebook-mark-black.svg`,
      png: `${BRAND}/png/gentlebook-mark-black-512.png`,
    },
    {
      label: t.markWhite,
      preview: `${BRAND}/svg/gentlebook-mark-white.svg`,
      previewClassName: "bg-ink",
      svg: `${BRAND}/svg/gentlebook-mark-white.svg`,
      png: `${BRAND}/png/gentlebook-mark-white-512.png`,
    },
  ];

  const icons: Asset[] = [
    {
      label: `${t.favicon} · 32px`,
      preview: `${BRAND}/svg/gentlebook-favicon.svg`,
      svg: `${BRAND}/svg/gentlebook-favicon.svg`,
      png: `${BRAND}/png/favicon-32.png`,
    },
    {
      label: `${t.favicon} · 64px`,
      preview: `${BRAND}/svg/gentlebook-favicon.svg`,
      svg: `${BRAND}/svg/gentlebook-favicon.svg`,
      png: `${BRAND}/png/favicon-64.png`,
    },
    {
      label: `${t.appIcon} · 192px`,
      preview: `${BRAND}/svg/gentlebook-app-icon.svg`,
      svg: `${BRAND}/svg/gentlebook-app-icon.svg`,
      png: `${BRAND}/png/app-icon-192.png`,
    },
    {
      label: `${t.appIcon} · 512px`,
      preview: `${BRAND}/svg/gentlebook-app-icon.svg`,
      svg: `${BRAND}/svg/gentlebook-app-icon.svg`,
      png: `${BRAND}/png/app-icon-512.png`,
    },
  ];

  const colors = [
    { name: "Ink", hex: "#14162B", className: "bg-ink" },
    { name: "Lavender", hex: "#ECEBF2", className: "bg-lavender" },
    { name: "Violet", hex: "#6355E4", className: "bg-violet" },
    { name: "Teal", hex: "#17A398", className: "bg-teal" },
    { name: "Mist", hex: "#8A8A8A", className: "bg-mist" },
  ];

  const minSizes = [
    { label: t.minSizeHorizontal, value: "≥ 120 px" },
    { label: t.minSizeMark, value: "≥ 24 px" },
    { label: t.minSizeFavicon, value: "16 px" },
    { label: t.minSizeApp, value: "≥ 44 px" },
  ];

  const donts = [t.dont1, t.dont2, t.dont3, t.dont4];

  return (
    <div className="bg-lavender/30 pb-24 pt-36">
      <div className="u-container">
        <Link
          href={localizedPath(locale, "/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.legalPage.backHome}
        </Link>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
          {t.eyebrow}
        </span>

        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-ink">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">{t.subtitle}</p>

        {/* Primary logo */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.primaryHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{t.primaryText}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="flex h-32 items-center justify-center rounded-xl bg-lavender/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BRAND}/svg/gentlebook-logo-horizontal.svg`}
                  alt="GentleBook"
                  className="max-h-12 max-w-[80%]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{t.onLight}</span>
                <a
                  href={`${BRAND}/svg/gentlebook-logo-horizontal.svg`}
                  download
                  className="text-xs font-semibold text-violet transition-colors hover:text-ink"
                >
                  SVG
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="flex h-32 items-center justify-center rounded-xl bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BRAND}/svg/gentlebook-logo-horizontal-dark.svg`}
                  alt="GentleBook"
                  className="max-h-12 max-w-[80%]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{t.onDark}</span>
                <a
                  href={`${BRAND}/svg/gentlebook-logo-horizontal-dark.svg`}
                  download
                  className="text-xs font-semibold text-violet transition-colors hover:text-ink"
                >
                  SVG
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.variantsHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{t.variantsText}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {variants.map((asset) => (
              <AssetCard key={asset.label} asset={asset} />
            ))}
          </div>
        </section>

        {/* Icons */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.iconsHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{t.iconsText}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {icons.map((asset) => (
              <AssetCard key={asset.label} asset={asset} />
            ))}
          </div>
        </section>

        {/* Colors */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">{t.colorsHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{t.colorsText}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((color) => (
              <div
                key={color.hex}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-white"
              >
                <div className={`h-16 ${color.className}`} />
                <div className="p-4">
                  <div className="text-sm font-semibold text-ink">{color.name}</div>
                  <div className="mt-0.5 text-xs text-mist">{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clear space & min size, do & don't */}
        <section className="mt-14 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-ink">{t.spacingHeading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{t.spacingText}</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {minSizes.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-ink/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-ink/80">{row.label}</span>
                  <span className="font-semibold text-ink">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-ink">{t.dontHeading}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {donts.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink/80">
                  <span className="mt-0.5 text-[#C0453F]" aria-hidden="true">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
