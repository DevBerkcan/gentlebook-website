import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { isLocale, type Locale } from "@/lib/locales";

export const metadata: Metadata = { title: "Unterauftragsverarbeiter", robots: { index: false, follow: true } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : "de";
  return <LegalPage locale={locale} page="unterauftragsverarbeiter" />;
}
