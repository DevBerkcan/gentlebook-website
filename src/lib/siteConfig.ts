/**
 * Zentrale Site-Konfiguration: Routen, Trial-Bedingungen, CTA-Ziele.
 * Zahlen/Bedingungen bewusst NICHT mehrfach als Freitext im Projekt verteilen —
 * hier ändern, überall zieht es nach.
 */

export const siteConfig = {
  name: "GentleBook",
  parentCompany: "Gentle Suite",
  trialDays: 14,
  // TODO (Produktentscheidung, vor Launch bestätigen): Kreditkarte für Testphase nötig?
  trialRequiresCreditCard: null as boolean | null,
  // TODO (Produktentscheidung): verlängert sich der Test automatisch in ein bezahltes Abo?
  trialAutoConverts: null as boolean | null,
  routes: {
    home: "/",
    features: "/features",
    pricing: "/pricing",
    industries: "/industries",
    howItWorks: "/how-it-works",
    faq: "/faq",
    blog: "/blog",
    contact: "/contact",
    login: "/login",
    register: "/register",
    demo: "/demo",
    privacy: "/datenschutz",
    imprint: "/impressum",
    terms: "/agb",
    logo: "/logo",
  },
} as const;

export type SiteConfig = typeof siteConfig;
