/**
 * Leichtgewichtige A/B-Test-Vorbereitung ohne eigenes Experiment-Framework.
 * Variante wird zentral hier gewählt (Standard: "a").
 *
 * Hinweis: Die deutschsprachigen Werte hier sind die Referenz-Varianten aus
 * der Konzeption. Die tatsächlich ausgespielte (zweisprachige) Hero-Copy lebt
 * weiterhin in `dictionaries.ts` (dort die einzige Quelle für Layout-kritische
 * Texte, siehe `hero.titleLine1/titleLine2/ctaPrimary`), damit es keine zwei
 * widersprüchlichen Textquellen gibt. Für einen echten Test: Variante hier
 * umschalten und den gewählten Text 1:1 in `dictionaries.ts` übernehmen (oder
 * `dictionaries.ts` künftig aus dieser Datei ableiten, sobald EN-Varianten
 * ebenfalls final sind).
 */

export type Variant = "a" | "b" | "c";

/** Aktive Variante für die Hero-Headline und den primären CTA-Text. */
export const ACTIVE_VARIANT: Variant = "a";

export const heroHeadlineVariants: Record<Variant, { line1: string; line2: string }> = {
  a: { line1: "Mehr Termine.", line2: "Weniger Verwaltungsaufwand." },
  b: { line1: "Deine Kunden buchen.", line2: "GentleBook organisiert." },
  c: { line1: "Auch nach Feierabend", line2: "neue Termine erhalten." },
};

export const primaryCtaVariants: Record<Variant, string> = {
  a: "14 Tage kostenlos testen",
  b: "Kostenlose Buchungsseite erstellen",
  c: "GentleBook ausprobieren",
};

export function getHeroHeadline(variant: Variant = ACTIVE_VARIANT) {
  return heroHeadlineVariants[variant];
}

export function getPrimaryCtaLabel(variant: Variant = ACTIVE_VARIANT) {
  return primaryCtaVariants[variant];
}
