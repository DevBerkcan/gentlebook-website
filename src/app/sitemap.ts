import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";

// TODO vor Launch: finale Domain eintragen
const BASE_URL = "https://gentlebook.app";

// Marketingseiten, die es in DE + EN gibt.
const bilingualPaths = [
  "",
  "/features",
  "/pricing",
  "/industries",
  "/how-it-works",
  "/faq",
  "/contact",
  "/register",
  "/demo",
  "/logo",
  "/impressum",
  "/datenschutz",
  "/agb",
];

// Deutschsprachige Keyword-/Ratgeberseiten ohne /en-Pendant (siehe proxy.ts /
// jeweilige page.tsx: dynamicParams = false, nur "de").
const germanOnlyPaths = [
  "/buchungssystem-friseur",
  "/buchungssystem-hundefriseur",
  "/buchungssystem-kosmetikstudio",
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const bilingualEntries: MetadataRoute.Sitemap = bilingualPaths.flatMap((path) => [
    {
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1.0 : 0.7,
      alternates: {
        languages: {
          de: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 0.9 : 0.6,
    },
  ]);

  const germanOnlyEntries: MetadataRoute.Sitemap = germanOnlyPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...bilingualEntries, ...germanOnlyEntries];
}
