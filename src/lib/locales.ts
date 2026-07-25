export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pfad für den Sprach-Switcher: Deutsch lebt ohne Präfix, Englisch unter /en */
export function localizedPath(locale: Locale, path: string = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "de") return clean === "/" ? "/" : clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}
