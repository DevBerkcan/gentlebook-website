import type { Locale } from "./locales";
import { pricing, yearlyPerMonth } from "./pricing";

/**
 * Gesamte Website-Copy, zweisprachig. Deutsch ist die Referenz.
 * Struktur bewusst flach & typisiert, damit Sections streng typed bleiben.
 */

const de = {
  meta: {
    title: "GentleBook — Online-Terminbuchung für Salons & Studios",
    description:
      "Weniger Telefon-Chaos, weniger No-Shows: GentleBook ist die Online-Terminbuchung für Friseure, Barbershops, Beauty- & Nagelstudios, Massage- und Physio-Praxen. In 5 Minuten startklar.",
    ogAlt: "GentleBook — Online-Terminbuchung für Salons & Studios",
  },
  nav: {
    features: "Funktionen",
    industries: "Branchen",
    pricing: "Preise",
    faq: "FAQ",
    login: "Anmelden",
    cta: "Kostenlos starten",
    menuLabel: "Menü",
    languageLabel: "Sprache",
  },
  hero: {
    eyebrow: "Online-Terminbuchung für Salons & Studios",
    titleLine1: "Dein Kalender",
    titleLine2: "füllt sich von selbst.",
    subline:
      "GentleBook nimmt Termine an, während du deine Kund:innen verwöhnst — rund um die Uhr, ohne Telefonklingeln, mit automatischen Erinnerungen gegen No-Shows.",
    ctaPrimary: "Kostenlos starten",
    ctaSecondary: "Demo ansehen",
    trust: "In 5 Minuten startklar · Keine Kreditkarte nötig",
    cardBooking: "Neue Buchung",
    cardBookingDetail: "Balayage · Sa 10:30",
    cardReminder: "Erinnerung gesendet",
    cardReminderDetail: "24 h vor dem Termin",
    scrollHint: "Scrollen",
  },
  pain: {
    eyebrow: "Kommt dir bekannt vor?",
    title: "Ein voller Laden — und trotzdem klingelt ständig das Telefon.",
    items: [
      {
        title: "Telefon-Chaos",
        text: "Mitten im Haarschnitt ans Telefon? Jede Unterbrechung kostet Fokus, Zeit — und wirkt vor Kund:innen unprofessionell.",
      },
      {
        title: "No-Shows",
        text: "Leere Stühle, die eigentlich gebucht waren. Ohne Erinnerungen und Warteliste bleibt der Umsatz einfach liegen.",
      },
      {
        title: "Zettel & Excel",
        text: "Terminbuch, Zettelwirtschaft, Excel-Tabellen: Doppelbuchungen und Suchen statt einem Kalender, der einfach stimmt.",
      },
      {
        title: "Unsichtbar nach Feierabend",
        text: "Kund:innen wollen abends um 22 Uhr buchen. Wer dann nicht buchbar ist, verliert sie an den Salon, der es ist.",
      },
    ],
  },
  showcase: {
    eyebrow: "Die Lösung",
    title: "Eine Buchungsseite, die aussieht wie dein Salon. Ein Dashboard, das mitdenkt.",
    text: "Deine Kund:innen buchen auf deiner eigenen Buchungsseite — mit deinem Namen, deinen Farben, deiner URL. Du behältst im Dashboard Team, Termine und Auslastung im Blick.",
    bookingLabel: "Deine gebrandete Buchungsseite",
    dashboardLabel: "Dein Admin-Dashboard",
    mock: {
      salonName: "Studio Mila",
      salonTag: "Balayage · Cut · Color",
      service1: "Balayage & Schnitt",
      service1Meta: "2 Std · ab 149 €",
      service2: "Herrenschnitt",
      service2Meta: "45 Min · 38 €",
      bookNow: "Termin buchen",
      today: "Heute",
      utilization: "Auslastung",
      bookings: "Buchungen",
      noShows: "No-Shows",
      team: "Team heute",
    },
  },
  features: {
    eyebrow: "Alles drin, was dein Alltag braucht",
    title: "Funktionen, die dir Stunden zurückgeben.",
    items: [
      {
        title: "24/7 Online-Buchung",
        text: "Kund:innen buchen jederzeit selbst — auch sonntags um 23 Uhr. Ganz ohne Anruf.",
      },
      {
        title: "Team & Kalender",
        text: "Eigene Kalender pro Mitarbeiter:in, mit Arbeitszeiten, Pausen und Abwesenheiten.",
      },
      {
        title: "Automatische E-Mails",
        text: "Bestätigung, Erinnerung, Storno — GentleBook schreibt, damit du es nicht musst.",
      },
      {
        title: "Warteliste",
        text: "Wird ein Termin frei, rückt automatisch die Warteliste nach. Kein Stuhl bleibt leer.",
      },
      {
        title: "No-Show-Tracking",
        text: "Erkenne, wer wiederholt nicht erscheint — und schütze deine wertvollen Slots.",
      },
      {
        title: "Deine Buchungsseite",
        text: "Eigene URL, dein Design, dein Logo. Deine Marke steht im Mittelpunkt — nicht unsere.",
      },
      {
        title: "Kundenverwaltung",
        text: "Historie, Notizen und Vorlieben pro Kund:in — für Beratung, die sich persönlich anfühlt.",
      },
      {
        title: "Auslastungs-Statistiken",
        text: "Sieh auf einen Blick, welche Zeiten, Services und Teammitglieder am besten laufen.",
      },
    ],
  },
  industries: {
    eyebrow: "Für wen ist GentleBook?",
    title: "Gemacht für Termine, bei denen Menschen im Mittelpunkt stehen.",
    text: "Ob 1-Personen-Studio oder Team mit zehn Stühlen — GentleBook passt sich deinem Handwerk an.",
    items: [
      { title: "Friseursalons", text: "Vom Trockenschnitt bis Balayage — Services mit eigener Dauer & eigenem Preis." },
      { title: "Barbershops", text: "Walk-in-Kultur trifft Planbarkeit: kurze Slots, volle Auslastung." },
      { title: "Beauty- & Kosmetikstudios", text: "Behandlungen, Pakete und Folgetermine — sauber getaktet." },
      { title: "Nagelstudios", text: "Neumodellage oder Refill? Kund:innen wählen den passenden Slot selbst." },
      { title: "Massage-Praxen", text: "Ruhige Übergänge zwischen Terminen dank Pufferzeiten." },
      { title: "Tattoo-Studios", text: "Lange Sessions, Anzahlungslogik im Blick, Termine pro Artist." },
      { title: "Physiotherapie", text: "Serientermine und Rezept-Zeiträume ohne Zettelwirtschaft." },
    ],
  },
  socialProof: {
    eyebrow: "Zahlen, die für sich sprechen",
    title: "Salons, die umgestiegen sind, bleiben.",
    // ── PLATZHALTER-KOMPONENTE ──
    // Kennzahlen & Testimonials sind Beispieldaten und werden vor Launch
    // durch echte Werte/Zitate ersetzt (siehe Kommentar in SocialProof.tsx).
    stats: [
      { value: 128000, suffix: "+", label: "Buchungen verarbeitet" },
      { value: 42, suffix: " %", label: "weniger No-Shows im Schnitt" },
      { value: 5, suffix: " Min", label: "bis zur ersten Buchungsseite" },
    ],
    testimonials: [
      {
        quote:
          "Seit GentleBook klingelt das Telefon vielleicht noch zweimal am Tag. Vorher waren es zwanzig Anrufe — mitten im Färben.",
        name: "Platzhalter · Inhaberin",
        business: "Friseursalon, Düsseldorf",
      },
      {
        quote:
          "Die Erinnerungs-Mails haben unsere No-Shows fast halbiert. Das ist bares Geld am Ende des Monats.",
        name: "Platzhalter · Inhaber",
        business: "Barbershop, Köln",
      },
      {
        quote:
          "Ich habe die Buchungsseite an einem Abend eingerichtet. Meine Kundinnen sagen, sie sieht besser aus als meine alte Website.",
        name: "Platzhalter · Inhaberin",
        business: "Nagelstudio, Essen",
      },
    ],
    logosLabel: "Bald hier: Logos unserer Kunden",
  },
  pricingSection: {
    eyebrow: "Preise",
    title: "Fair, transparent, monatlich kündbar.",
    text: "Starte kostenlos und wachse, wenn dein Kalender wächst. Alle Preise zzgl. USt.",
    monthly: "Monatlich",
    yearly: "Jährlich",
    yearlyBadge: "−20 %",
    perMonth: "/ Monat",
    billedYearly: "bei jährlicher Zahlung",
    popular: "Beliebt",
    ctaTrial: "Kostenlos testen",
    ctaContact: "Beratung anfragen",
    disclaimer: "Preise sind vorläufig (TBD) und können sich bis zum Launch ändern.",
    plans: [
      {
        id: "starter" as const,
        name: "Starter",
        description: "Für Solo-Studios, die endlich online buchbar sein wollen.",
        features: [
          "1 Mitarbeiter:in",
          "Bis 100 Buchungen / Monat",
          "Eigene Buchungsseite",
          "Bestätigungs- & Erinnerungs-Mails",
          "Kundenverwaltung",
        ],
      },
      {
        id: "professional" as const,
        name: "Professional",
        description: "Für Teams, die Telefon-Chaos und No-Shows loswerden wollen.",
        features: [
          "Bis 5 Mitarbeiter:innen",
          "Unbegrenzte Buchungen",
          "Warteliste & No-Show-Tracking",
          "Eigenes Branding & eigene URL",
          "Auslastungs-Statistiken",
          "Prioritäts-Support",
        ],
      },
      {
        id: "business" as const,
        name: "Business",
        description: "Für wachsende Studios mit mehreren Standorten im Blick.",
        features: [
          "Unbegrenzte Mitarbeiter:innen",
          "Unbegrenzte Buchungen",
          "Erweiterte Analytics & Exporte",
          "Vollständiges White-Label-Branding",
          "Onboarding mit persönlicher Einrichtung",
          "Persönliche:r Ansprechpartner:in",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Noch Fragen?",
    title: "Die häufigsten Fragen — ehrlich beantwortet.",
    items: [
      {
        q: "Wie aufwendig ist der Umstieg von Terminbuch oder Excel?",
        a: "Überschaubar: Services anlegen, Arbeitszeiten eintragen, Buchungslink teilen — fertig. Die meisten Studios sind in unter 30 Minuten startklar, die erste Version der Buchungsseite steht in etwa 5 Minuten. Bestehende Termine trägst du einmalig nach, danach läuft alles an einem Ort.",
      },
      {
        q: "Was passiert mit den Daten meiner Kund:innen?",
        a: "Deine Kundendaten gehören dir. GentleBook wird DSGVO-konform betrieben, die Daten werden verschlüsselt übertragen und in der EU gehostet. Details regelt der Auftragsverarbeitungsvertrag (AVV), den du im Account abschließen kannst.",
      },
      {
        q: "Brauchen meine Kund:innen eine App?",
        a: "Nein. Deine Buchungsseite läuft im Browser — auf dem Handy genauso wie am Laptop. Kund:innen klicken deinen Link, wählen Service, Zeit und Teammitglied und bekommen sofort eine Bestätigung per E-Mail.",
      },
      {
        q: "Kann ich jederzeit kündigen?",
        a: "Ja. Monatliche Tarife sind zum Monatsende kündbar, ohne Mindestlaufzeit. Beim Jahrestarif endet der Vertrag zum Ende des bezahlten Jahres. Deine Daten kannst du vorher exportieren.",
      },
      {
        q: "Was, wenn ich mal keine Online-Buchungen möchte?",
        a: "Du behältst die Kontrolle: Zeiten blocken, Services pausieren oder die Online-Buchung komplett deaktivieren — dein Kalender bleibt trotzdem dein zentrales Werkzeug für manuell eingetragene Termine.",
      },
      {
        q: "Funktioniert GentleBook auch mit Walk-ins?",
        a: "Ja. Spontane Kund:innen trägst du in Sekunden manuell ein. Der Kalender zeigt Online-Buchungen und Walk-ins gemeinsam, damit nichts kollidiert.",
      },
    ],
  },
  finalCta: {
    title: "Der nächste freie Termin gehört dir.",
    text: "Richte deine Buchungsseite heute ein — und lass das Telefon morgen einfach mal stumm.",
    ctaPrimary: "Kostenlos starten",
    ctaSecondary: "Demo ansehen",
    trust: "Keine Kreditkarte · Monatlich kündbar · DSGVO-konform",
  },
  footer: {
    claim: "Online-Terminbuchung für Salons, Barbershops, Beauty-Studios und Praxen.",
    product: "Produkt",
    legal: "Rechtliches",
    social: "Social",
    imprint: "Impressum",
    privacy: "Datenschutz",
    terms: "AGB",
    brand: "Markenmaterial",
    rights: "Alle Rechte vorbehalten.",
  },
  legalPage: {
    backHome: "Zurück zur Startseite",
    placeholderTitle: "Inhalt folgt",
    placeholderText:
      "Diese Seite ist als Platzhalter angelegt. Die rechtlichen Inhalte werden separat vom Betreiber eingepflegt.",
    pages: {
      impressum: "Impressum",
      datenschutz: "Datenschutzerklärung",
      agb: "Allgemeine Geschäftsbedingungen",
    },
  },
  logoPage: {
    eyebrow: "Markenmaterial",
    title: "Logo & Marke",
    subtitle:
      "Das offizielle GentleBook-Logo zum Download — als SVG und PNG, in Farbe sowie in Schwarz und Weiß. Für Presse, Partner:innen und alle, die GentleBook korrekt einbinden möchten.",
    primaryHeading: "Hauptlogo",
    primaryText:
      "Das horizontale Logo ist die bevorzugte Variante für die meisten Anwendungen — auf hellem wie auf dunklem Untergrund.",
    onLight: "Für helle Hintergründe",
    onDark: "Für dunkle Hintergründe",
    variantsHeading: "Weitere Varianten",
    variantsText:
      "Vertikales Logo, Wortmarke und Bildmarke — für Situationen, in denen das horizontale Logo nicht passt.",
    vertical: "Vertikales Logo",
    wordmark: "Wortmarke",
    markColor: "Bildmarke · Farbe",
    markBlack: "Bildmarke · Schwarz",
    markWhite: "Bildmarke · Weiß",
    iconsHeading: "Favicon & App-Icon",
    iconsText: "Für Browser-Tabs, Startbildschirme und App-Stores, in mehreren Auflösungen.",
    favicon: "Favicon",
    appIcon: "App-Icon",
    colorsHeading: "Farben",
    colorsText:
      "Die Markenfarben von GentleBook — als Referenz für Präsentationen, Partnermaterial oder eigene Vorlagen.",
    spacingHeading: "Schutzraum & Mindestgröße",
    spacingText:
      "Der Mindestabstand rundum entspricht der Höhe der Bildmarke. Nichts darf in diesen Bereich hineinragen.",
    minSizeHorizontal: "Horizontales Logo",
    minSizeMark: "Bildmarke",
    minSizeFavicon: "Favicon",
    minSizeApp: "App-Icon",
    dontHeading: "Bitte vermeiden",
    dont1: "Logo verzerren, drehen oder neigen",
    dont2: "Eigene Farben oder Verläufe verwenden",
    dont3: "Vor unruhige oder farbige Hintergründe setzen",
    dont4: "Schatten, Kontur oder andere Effekte hinzufügen",
  },
};

const en: typeof de = {
  meta: {
    title: "GentleBook — Online booking for salons & studios",
    description:
      "Less phone chaos, fewer no-shows: GentleBook is online appointment booking for hair salons, barbershops, beauty & nail studios, massage and physio practices. Ready in 5 minutes.",
    ogAlt: "GentleBook — Online booking for salons & studios",
  },
  nav: {
    features: "Features",
    industries: "Industries",
    pricing: "Pricing",
    faq: "FAQ",
    login: "Log in",
    cta: "Start for free",
    menuLabel: "Menu",
    languageLabel: "Language",
  },
  hero: {
    eyebrow: "Online booking for salons & studios",
    titleLine1: "Your calendar",
    titleLine2: "fills itself.",
    subline:
      "GentleBook takes bookings while you take care of your clients — around the clock, no ringing phone, with automatic reminders that fight no-shows.",
    ctaPrimary: "Start for free",
    ctaSecondary: "Watch demo",
    trust: "Ready in 5 minutes · No credit card required",
    cardBooking: "New booking",
    cardBookingDetail: "Balayage · Sat 10:30",
    cardReminder: "Reminder sent",
    cardReminderDetail: "24 h before the appointment",
    scrollHint: "Scroll",
  },
  pain: {
    eyebrow: "Sound familiar?",
    title: "A packed studio — and the phone still won't stop ringing.",
    items: [
      {
        title: "Phone chaos",
        text: "Answering calls mid-haircut? Every interruption costs focus and time — and looks unprofessional in front of clients.",
      },
      {
        title: "No-shows",
        text: "Empty chairs that were supposed to be booked. Without reminders and a waitlist, that revenue simply evaporates.",
      },
      {
        title: "Paper & Excel",
        text: "Appointment book, sticky notes, spreadsheets: double bookings and endless searching instead of one calendar that's simply right.",
      },
      {
        title: "Invisible after hours",
        text: "Clients want to book at 10 pm. If they can't book with you, they'll book with the salon where they can.",
      },
    ],
  },
  showcase: {
    eyebrow: "The solution",
    title: "A booking page that looks like your salon. A dashboard that thinks ahead.",
    text: "Your clients book on your own booking page — with your name, your colors, your URL. In the dashboard, you keep team, appointments and utilization in view.",
    bookingLabel: "Your branded booking page",
    dashboardLabel: "Your admin dashboard",
    mock: {
      salonName: "Studio Mila",
      salonTag: "Balayage · Cut · Color",
      service1: "Balayage & cut",
      service1Meta: "2 hrs · from €149",
      service2: "Men's cut",
      service2Meta: "45 min · €38",
      bookNow: "Book appointment",
      today: "Today",
      utilization: "Utilization",
      bookings: "Bookings",
      noShows: "No-shows",
      team: "Team today",
    },
  },
  features: {
    eyebrow: "Everything your day-to-day needs",
    title: "Features that give you hours back.",
    items: [
      {
        title: "24/7 online booking",
        text: "Clients book themselves any time — even Sunday at 11 pm. No phone call needed.",
      },
      {
        title: "Team & calendars",
        text: "A calendar per team member, with working hours, breaks and time off.",
      },
      {
        title: "Automatic emails",
        text: "Confirmation, reminder, cancellation — GentleBook writes them so you don't have to.",
      },
      {
        title: "Waitlist",
        text: "When a slot frees up, the waitlist moves up automatically. No chair stays empty.",
      },
      {
        title: "No-show tracking",
        text: "Spot repeat no-shows early — and protect your most valuable slots.",
      },
      {
        title: "Your booking page",
        text: "Your own URL, your design, your logo. Your brand takes center stage — not ours.",
      },
      {
        title: "Client management",
        text: "History, notes and preferences per client — for service that feels personal.",
      },
      {
        title: "Utilization analytics",
        text: "See at a glance which times, services and team members perform best.",
      },
    ],
  },
  industries: {
    eyebrow: "Who is GentleBook for?",
    title: "Built for appointments where people come first.",
    text: "Solo studio or a team of ten chairs — GentleBook adapts to your craft.",
    items: [
      { title: "Hair salons", text: "From dry cuts to balayage — services with their own duration & price." },
      { title: "Barbershops", text: "Walk-in culture meets plannability: short slots, full chairs." },
      { title: "Beauty & cosmetic studios", text: "Treatments, packages and follow-ups — perfectly paced." },
      { title: "Nail studios", text: "Full set or refill? Clients pick the right slot themselves." },
      { title: "Massage practices", text: "Calm transitions between sessions thanks to buffer times." },
      { title: "Tattoo studios", text: "Long sessions, deposits in view, calendars per artist." },
      { title: "Physiotherapy", text: "Recurring appointments and prescription periods without paperwork." },
    ],
  },
  socialProof: {
    eyebrow: "Numbers that speak for themselves",
    title: "Salons that switch, stay.",
    stats: [
      { value: 128000, suffix: "+", label: "bookings processed" },
      { value: 42, suffix: " %", label: "fewer no-shows on average" },
      { value: 5, suffix: " min", label: "to your first booking page" },
    ],
    testimonials: [
      {
        quote:
          "Since GentleBook, the phone rings maybe twice a day. It used to be twenty calls — right in the middle of coloring.",
        name: "Placeholder · Owner",
        business: "Hair salon, Düsseldorf",
      },
      {
        quote:
          "The reminder emails nearly halved our no-shows. That's real money at the end of the month.",
        name: "Placeholder · Owner",
        business: "Barbershop, Cologne",
      },
      {
        quote:
          "I set up the booking page in one evening. My clients say it looks better than my old website.",
        name: "Placeholder · Owner",
        business: "Nail studio, Essen",
      },
    ],
    logosLabel: "Coming soon: our customers' logos",
  },
  pricingSection: {
    eyebrow: "Pricing",
    title: "Fair, transparent, cancel monthly.",
    text: "Start for free and grow as your calendar grows. All prices excl. VAT.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "−20 %",
    perMonth: "/ month",
    billedYearly: "billed yearly",
    popular: "Popular",
    ctaTrial: "Try for free",
    ctaContact: "Talk to us",
    disclaimer: "Prices are preliminary (TBD) and may change before launch.",
    plans: [
      {
        id: "starter" as const,
        name: "Starter",
        description: "For solo studios that finally want to be bookable online.",
        features: [
          "1 team member",
          "Up to 100 bookings / month",
          "Your own booking page",
          "Confirmation & reminder emails",
          "Client management",
        ],
      },
      {
        id: "professional" as const,
        name: "Professional",
        description: "For teams that want to ditch phone chaos and no-shows.",
        features: [
          "Up to 5 team members",
          "Unlimited bookings",
          "Waitlist & no-show tracking",
          "Custom branding & your own URL",
          "Utilization analytics",
          "Priority support",
        ],
      },
      {
        id: "business" as const,
        name: "Business",
        description: "For growing studios with multiple locations in mind.",
        features: [
          "Unlimited team members",
          "Unlimited bookings",
          "Advanced analytics & exports",
          "Full white-label branding",
          "Guided onboarding & setup",
          "Dedicated point of contact",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Questions?",
    title: "The most common questions — answered honestly.",
    items: [
      {
        q: "How much effort is switching from a paper book or Excel?",
        a: "Manageable: create your services, set working hours, share your booking link — done. Most studios are ready in under 30 minutes, and a first version of your booking page takes about 5. Existing appointments are added once, then everything lives in one place.",
      },
      {
        q: "What happens to my clients' data?",
        a: "Your client data belongs to you. GentleBook operates in compliance with the GDPR, data is transferred encrypted and hosted in the EU. Details are covered by the data processing agreement (DPA) you can conclude in your account.",
      },
      {
        q: "Do my clients need an app?",
        a: "No. Your booking page runs in the browser — on a phone just as well as on a laptop. Clients open your link, pick a service, time and team member, and instantly receive a confirmation email.",
      },
      {
        q: "Can I cancel any time?",
        a: "Yes. Monthly plans can be cancelled at the end of any month, no minimum term. Yearly plans end with the paid year. You can export your data beforehand.",
      },
      {
        q: "What if I don't want online bookings for a while?",
        a: "You stay in control: block time, pause services or turn off online booking entirely — your calendar remains your central tool for manually entered appointments.",
      },
      {
        q: "Does GentleBook work with walk-ins?",
        a: "Yes. Add spontaneous clients manually in seconds. The calendar shows online bookings and walk-ins together so nothing collides.",
      },
    ],
  },
  finalCta: {
    title: "The next open slot belongs to you.",
    text: "Set up your booking page today — and let the phone stay silent tomorrow.",
    ctaPrimary: "Start for free",
    ctaSecondary: "Watch demo",
    trust: "No credit card · Cancel monthly · GDPR-compliant",
  },
  footer: {
    claim: "Online appointment booking for salons, barbershops, beauty studios and practices.",
    product: "Product",
    legal: "Legal",
    social: "Social",
    imprint: "Imprint",
    privacy: "Privacy",
    terms: "Terms",
    brand: "Brand assets",
    rights: "All rights reserved.",
  },
  legalPage: {
    backHome: "Back to homepage",
    placeholderTitle: "Content coming soon",
    placeholderText:
      "This page is a placeholder. The legal content will be added separately by the operator.",
    pages: {
      impressum: "Imprint",
      datenschutz: "Privacy Policy",
      agb: "Terms & Conditions",
    },
  },
  logoPage: {
    eyebrow: "Brand assets",
    title: "Logo & brand",
    subtitle:
      "The official GentleBook logo for download — as SVG and PNG, in color as well as black and white. For press, partners, and anyone who needs to feature GentleBook correctly.",
    primaryHeading: "Primary logo",
    primaryText:
      "The horizontal logo is the preferred variant for most use cases — on light and dark backgrounds alike.",
    onLight: "For light backgrounds",
    onDark: "For dark backgrounds",
    variantsHeading: "More variants",
    variantsText:
      "Vertical logo, wordmark, and mark — for situations where the horizontal logo doesn't fit.",
    vertical: "Vertical logo",
    wordmark: "Wordmark",
    markColor: "Mark · Color",
    markBlack: "Mark · Black",
    markWhite: "Mark · White",
    iconsHeading: "Favicon & app icon",
    iconsText: "For browser tabs, home screens, and app stores, in several resolutions.",
    favicon: "Favicon",
    appIcon: "App icon",
    colorsHeading: "Colors",
    colorsText:
      "GentleBook's brand colors — for reference in presentations, partner material, or your own templates.",
    spacingHeading: "Clear space & minimum size",
    spacingText:
      "The minimum space around the logo equals the height of the mark. Nothing should intrude into that area.",
    minSizeHorizontal: "Horizontal logo",
    minSizeMark: "Mark",
    minSizeFavicon: "Favicon",
    minSizeApp: "App icon",
    dontHeading: "Please avoid",
    dont1: "Stretching, rotating, or skewing the logo",
    dont2: "Using custom colors or gradients",
    dont3: "Placing it on busy or colorful backgrounds",
    dont4: "Adding shadows, outlines, or other effects",
  },
};

export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Für die Pricing-Section: Werte aus lib/pricing.ts injizieren */
export function getPlanPrice(id: keyof typeof pricing, yearly: boolean) {
  return yearly ? yearlyPerMonth(id) : pricing[id].monthly;
}
