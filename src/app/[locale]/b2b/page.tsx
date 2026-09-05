import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { isLocale, type Locale } from "@/lib/locales";

export const metadata: Metadata = { title: "B2B-Hinweis", robots: { index: false, follow: true } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : "de";
  return <LegalPage locale={locale} page="b2b" />;
}
