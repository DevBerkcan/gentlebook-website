/**
 * Zentrale Site-Konfiguration: Routen, Trial-Bedingungen, CTA-Ziele.
 * Zahlen/Bedingungen bewusst NICHT mehrfach als Freitext im Projekt verteilen —
 * hier ändern, überall zieht es nach.
 */

export const siteConfig = {
  name: "GentleBook",
  parentCompany: "Gentle Suite",
  trialDays: 14,
  // Laut Preise-Sektion: Aktivierung eines Plans erfolgt aktuell manuell (~24h),
  // keine automatisierte Kartenabfrage vorgesehen. Vor Launch final bestätigen.
  trialRequiresCreditCard: false,
  // Ohne aktiven (angefragten) Plan wird die Admin-Oberfläche nach 14 Tagen
  // gesperrt statt automatisch in ein bezahltes Abo zu wechseln.
  trialAutoConverts: false,
  // Die eigentliche GentleBook-Anwendung (Admin/Tenant-Login). Marketing-Site
  // verlinkt "Anmelden" direkt dorthin statt auf eine eigene Login-Seite.
  externalAppUrl: "https://gentle-book-ui.vercel.app",
  externalLoginUrl: "https://gentle-book-ui.vercel.app/admin/login",
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
