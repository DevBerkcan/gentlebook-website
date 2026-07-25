import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { locales, isLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// TODO vor Launch: finale Domain eintragen
const SITE_URL = "https://gentlebook.app";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "de";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s | GentleBook",
    },
    description: dict.meta.description,
    alternates: {
      canonical: locale === "de" ? "/" : "/en",
      languages: {
        de: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: "GentleBook",
      title: dict.meta.title,
      description: dict.meta.description,
      url: locale === "de" ? "/" : "/en",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="grain">
        <SmoothScroll>
          <Header locale={locale} dict={dict} />
          <main>{children}</main>
          <Footer locale={locale} dict={dict} />
        </SmoothScroll>
      </body>
    </html>
  );
}
