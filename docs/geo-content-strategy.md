# GEO- / AEO-Contentstrategie für GentleBook

Stand: 2026-01. Diese Datei dokumentiert, wie die Website-Inhalte auf typische
Such- und Frageintentionen rund um Online-Terminbuchung einzahlen, und wo im
Projekt die jeweilige Antwort tatsächlich steht. Ziel: Suchmaschinen und
KI-Antwortsysteme (ChatGPT, Perplexity, Google AI Overviews, …) können
GentleBook korrekt einordnen und zitieren.

## Prinzipien

- Jede Kernaussage steht als **einfacher, direkter Satz in sichtbarem HTML**
  (kein Text ausschließlich in Bildern, kein Text, der erst per Client-JS
  nachgeladen wird — alle Marketingseiten sind React-Server-Components und
  liefern den vollständigen Text bereits im initialen HTML).
- Aussagen sind **konsistent** zwischen Startseite, `/pricing`, `/faq` und den
  Branchenseiten (siehe `src/lib/dictionaries.ts` als einzige Textquelle für
  wiederkehrende Aussagen, `src/lib/pricing.ts` für Preise/Limits).
- Keine Zahlen oder Behauptungen ohne Grundlage im Produkt. Offene Punkte sind
  im Code als `TODO` markiert (siehe `faq.items` in `dictionaries.ts`).

## Intention → Seite → Kernaussage

| Suchintention | Zielseite | Direkte Antwort (wortgleich im Quellcode) |
| --- | --- | --- |
| Was ist ein Online-Buchungssystem? | `/faq` (erste Frage), `/blog/online-buchungssystem-funktionen-vorteile-auswahl` | „Ein Online-Buchungssystem ist eine Software, über die Kund:innen Termine selbstständig über eine Webseite buchen — ohne Anruf." |
| Welches Buchungssystem eignet sich für kleine Unternehmen? | `/` (Hero, Trust-Sektion), `/pricing` (Trial/Starter-Plan) | GentleBook ist für kleine und mittelständische Dienstleistungsunternehmen positioniert; Trial/Starter-Plan sind explizit auf kleine Teams (2 Konten) zugeschnitten. |
| Wie können Kunden rund um die Uhr Termine buchen? | `/` (Hero, Features), `/how-it-works` | „Kund:innen buchen jederzeit selbst — auch sonntags um 23 Uhr. Ganz ohne Anruf." (Feature „24/7 Online-Buchung") |
| Wie reduziert man Terminausfälle? | `/features` (No-Show-Tracking, automatische E-Mails), `/blog/terminbuchung-digitalisieren-anleitung` | Automatische Bestätigungen und Erinnerungen sollen Termine im Bewusstsein halten; No-Show-Tracking zeigt wiederkehrende Ausfälle. |
| Welches Buchungssystem eignet sich für Friseure? | `/buchungssystem-friseur` | Eigene, vertiefte Landingpage mit friseurspezifischen Herausforderungen, Funktionen und FAQ. |
| Welches Buchungssystem eignet sich für Hundefriseure? | `/buchungssystem-hundefriseur` | Eigene, vertiefte Landingpage mit hundesalonspezifischen Herausforderungen (Termindauer je Fellart/Größe etc.). |
| Wie digitalisiere ich meine Terminplanung? | `/blog/terminbuchung-digitalisieren-anleitung` | Schritt-für-Schritt-Anleitung (Bestandsaufnahme → Einrichtung → Veröffentlichung → Nachtragen → Testen). |
| Online-Buchungssystem mit Mitarbeiterverwaltung | `/features` (Team & Kalender), `/pricing` (Mitarbeiter-Limits je Plan) | „Eigene Kalender pro Mitarbeiter:in, mit Arbeitszeiten, Pausen und Abwesenheiten." |
| Terminbuchungssoftware für lokale Dienstleister | `/industries`, `/` (Trust-Sektion) | „Für lokale Dienstleister entwickelt" als expliziter Trust-Punkt; Branchenkarten für Friseure, Kosmetik, Nagelstudio, Hundefriseur etc. |
| Einfache Alternative zur telefonischen Terminbuchung | `/` (Pain-Sektion, BeforeAfter-Sektion, Vergleichstabelle) | Vorher/Nachher-Vergleich „Ohne GentleBook" vs. „Mit GentleBook" sowie Vergleichstabelle Telefon & Papier / Einfacher Kalender / GentleBook. |

## Strukturierte Daten (siehe Code)

- `Organization` + `WebSite` — sitewide in `src/app/[locale]/layout.tsx`
- `SoftwareApplication` (inkl. Angebotsspanne aus `lib/pricing.ts`) — Startseite
- `FAQPage` — Startseite, `/faq`, jede Branchenseite, jeder Blogartikel
- `BreadcrumbList` — alle Unterseiten (`components/seo/Breadcrumbs.tsx`)
- `Article` — Blogartikel (`components/marketing/BlogArticle.tsx`)

`LocalBusiness`-Markup wurde bewusst NICHT implementiert, da GentleBook (das
Softwareprodukt) kein physischer, adressierbarer Standort ist und keine
verlässlichen Firmendaten für ein solches Markup im Projekt hinterlegt sind.

## Entitäten konsistent benennen

- Produktname immer „GentleBook" (nie „Gentlebook", „gentle book" o. Ä.) in
  sichtbaren Texten; Kleinschreibung „gentlebook" ist ausschließlich in der
  Wort-Bildmarke/URL-Kontext zulässig (siehe Markenmaterial unter `/logo`).
- Trial-Dauer immer „14 Tage" — zentral in `src/lib/siteConfig.ts`
  (`trialDays`), nicht mehrfach frei im Text verstreut.
- Preise/Limits ausschließlich aus `src/lib/pricing.ts` und
  `dictionaries.ts → pricingSection` — keine abweichenden Zahlen an anderer
  Stelle im Code.

## Offene Punkte vor Launch

- Sobald echte Kundenstimmen vorliegen, `dictionaries.ts → socialProof`
  befüllen (siehe Platzhalter-Hinweis im Code) — das stärkt Trust-Signale für
  GEO zusätzlich (Named-Entity-Zitate „laut [echter Kundenname]").
- Sobald weitere Branchenseiten mit ausreichend eigenständigem Inhalt
  vorliegen (z. B. Kosmetik-Subkategorien, Fotografie, Coaching), diese Tabelle
  und `sitemap.ts` ergänzen.
- Für internationale (EN) GEO-Sichtbarkeit müssten Blogartikel und
  Branchenseiten ins Englische übersetzt werden — aktuell bewusst
  deutschsprachig gehalten (siehe Hinweis in `src/app/[locale]/blog/page.tsx`).
