import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryLandingPage } from "@/components/marketing/IndustryLandingPage";
import { hundefriseurContent } from "@/content/industries/hundefriseur";

// Deutschsprachige Keyword-Landingpage — bewusst nur auf Deutsch, kein /en-Pendant.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export const metadata: Metadata = {
  title: hundefriseurContent.metaTitle,
  description: hundefriseurContent.metaDescription,
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <IndustryLandingPage content={hundefriseurContent} />;
}
