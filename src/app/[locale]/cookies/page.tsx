import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { isLocale } from "@/lib/locales";
export const metadata: Metadata = { robots: { index: false, follow: true } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage locale={isLocale(locale) ? locale : "de"} page="cookies" />;
}
