import type { MetadataRoute } from "next";

const BASE_URL = "https://gentlebook.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Login ist kein Marketing-Content (siehe robots-Meta auf /login) und
        // API-Routen liefern keine indexierbaren Seiten. Platzhalter für
        // künftige Dashboard-/App-Bereiche außerhalb dieses Marketing-Repos.
        disallow: ["/login", "/en/login", "/api/", "/dashboard", "/app"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
