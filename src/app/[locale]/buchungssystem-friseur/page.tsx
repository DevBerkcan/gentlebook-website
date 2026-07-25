import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryLandingPage } from "@/components/marketing/IndustryLandingPage";
import { friseurContent } from "@/content/industries/friseur";

// Deutschsprachige Keyword-Landingpage — bewusst nur auf Deutsch, kein /en-Pendant.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export const metadata: Metadata = {
  title: friseurContent.metaTitle,
  description: friseurContent.metaDescription,
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <IndustryLandingPage content={friseurContent} />;
}
