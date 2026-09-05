import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localizedPath, type Locale } from "@/lib/locales";

export const metadata: Metadata = { title: "B2B-Hinweis", robots: { index: false, follow: true } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "de";
  redirect(localizedPath(locale, "/b2b"));
}
