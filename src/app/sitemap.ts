import type { MetadataRoute } from "next";

// TODO vor Launch: finale Domain eintragen
const BASE_URL = "https://gentlebook.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { de: BASE_URL, en: `${BASE_URL}/en` } },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
