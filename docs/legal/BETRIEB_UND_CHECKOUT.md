# Betrieb, Verarbeitung und Checkout – Prüfanlage

Entwurf zur anwaltlichen Prüfung – keine Rechtsberatung. Stand 06.09.2026.

## Verwendung und Veröffentlichung

Ergänzt: eigenständige Seiten `/sepa`, `/testphase` und `/kuendigung`, ebenfalls im bestehenden Footer. Löschhinweise stehen unter `/loeschkonzept`. Die Software stellt für diese Seiten und die weiteren Anlagen eigene Redirectrouten bereit, deren Ziel gemeinsam über `NEXT_PUBLIC_LEGAL_SITE_URL` gepflegt wird. Die Seiten informieren; ihr Aufruf erteilt kein Mandat, kündigt kein Abonnement und löscht keine Daten.

Rechtstexte werden ausschließlich in `src/content/legal/documents.ts` gepflegt. `node scripts/legal-review.mjs --export` erzeugt das lesbare Anwaltspaket und die Platzhalterliste. `node --test scripts/legal.test.mjs` prüft Routenzuordnung und App-Linkziele. Dieser Export ist **kein** manipulationsgeschütztes Vertragsarchiv und keine Freigabe.

Öffentliche deutsche URLs sind `/impressum`, `/datenschutz`, `/agb`, `/auftragsverarbeitung`, `/unterauftragsverarbeiter`, `/b2b`, `/cookies`, `/nutzungsrichtlinien`, `/tom`, `/loeschkonzept`; `/en/…` zeigt vorerst ausdrücklich den deutschen Entwurf. Die bestehenden `/widerruf`-Routen verweisen nur auf B2B.

Die App verwendet bereits `NEXT_PUBLIC_LEGAL_SITE_URL` (aktuell Fallback `https://gentlebook.app`). Für die endgültige Domain diesen Wert setzen und die App neu bauen. Auch Website-SEO-/Site-URL und Mailvorlagen abgleichen. Ziel darf nicht auf dieselbe App-Redirectroute zeigen. Vor Veröffentlichung öffentliche Erreichbarkeit über alle Domains und Login-/Einladungs-/Recovery-Flows testen.

Keine Backend-Versionskonstante wurde auf die neue Entwurfsfassung gesetzt. Bestehende Zustimmung `2026-08-01` ist nicht Zustimmung zu `2026-09-06-entwurf-1`. Vor Verwendung historische Texte sichern, Freigabefassung archivieren und Bestellungen serverseitig an diese binden. Nicht deployen, solange Platzhalter/Blocker offen sind.

## Texte für Test und Checkout

Test: „14 Tage kostenlos ab ausdrücklicher Freischaltung. Keine Zahlungsmethode erforderlich. Der Test endet ohne automatische kostenpflichtige Verlängerung. Danach kannst du aktiv ein Abonnement bestellen oder eine Datenlöschung anfragen. Beginn: [TESTBEGINN], Ende: [TESTENDE].“

Bestellübersicht unmittelbar vor Abschluss:

| Feld | Inhalt aus serverseitigem Angebot |
|---|---|
| Anbieter/Kunde | bestätigte Vertragsparteien |
| Tarif/Funktionen/Limits | ausgewählter Starter/Pro-Tarif oder angenommenes Agency-Angebot |
| Gesamtpreis | 29 €/Monat oder 278 €/Jahr; 59 €/Monat oder 566 €/Jahr; Agency individueller konkreter Betrag |
| Steuern | tatsächliche Behandlung bestätigen; § 19 UStG nicht ungeprüft zusagen |
| Intervall | monatlich oder jährlich im Voraus; Jahresgesamtbetrag prominent |
| Beginn | konkretes Datum und Auslöseereignis |
| Laufzeit/Verlängerung | ein bzw. zwölf Monate; erneuter gleicher Zeitraum |
| Kündigung | jederzeit zum Ende des laufenden Zeitraums; Kontakt und Kontofunktion |
| Zahlungsart | tatsächlich im Mollie-Profil angebotenes Verfahren |
| Dokumente | freigegebene AGB/AVV und aktuelle Datenschutzinformation |

Nicht vorausgewählt: „Ich bestätige, dass ich das Abonnement ausschließlich in Ausübung meiner gewerblichen oder selbstständigen beruflichen Tätigkeit abschließe.“

Separat, nicht vorausgewählt: „Ich akzeptiere die AGB in der angegebenen Fassung.“

Hinweis ohne pauschale Einwilligung: „Informationen zur Verarbeitung personenbezogener Daten findest du in unserer Datenschutzerklärung.“

Button: „Kostenpflichtiges Abonnement abschließen“. Tarif-/Intervallauswahl bis zum Absenden korrigierbar. Doppelklickschutz im Frontend ergänzt, ersetzt aber keine Backend-Idempotenz.

Nach Abschluss: E-Mail mit Anbieter/Kunde, Angebot, Gesamtbetrag/Steuerdarstellung, Beginn, Intervall, Verlängerung/Kündigung, Zahlungsart, AGB und AVV in vereinbarter Fassung sowie Mandats-/Vorabinformationen, Support. Volltext oder unveränderliche Datei mitsenden; nur ein Link auf aktuelle AGB genügt nicht als Volltextnachweis. Outbox mit Retry und Versandnachweis, ohne geheime Zahlungsdaten zu protokollieren.

## SEPA-Text – ausschließlich Prüfmuster, nicht zweites Mandat

„Ich ermächtige [ANBIETERNAME_EINTRAGEN], wiederkehrende Zahlungen für mein GentleBook-Abonnement mittels SEPA-Basislastschrift von dem angegebenen Konto einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von [ANBIETERNAME_EINTRAGEN] auf mein Konto gezogenen Lastschriften einzulösen. Ich kann innerhalb von acht Wochen ab Belastungsdatum die Erstattung des belasteten Betrags verlangen. Es gelten die mit meinem Kreditinstitut vereinbarten Bedingungen. Gläubiger-Identifikationsnummer: [GLÄUBIGER_ID_EINTRAGEN]. Mandatsreferenz: [MOLLIE_MANDATSREFERENZ_EINTRAGEN].“

Vor Verwendung tatsächlichen Gläubiger und Autorisierungstext mit Mollie klären. Der Code erstellt eine `first`-Zahlung und ruft den Providerstatus ab; das Mandat entsteht im Providerverfahren. Der Text ist deshalb nicht als zusätzliche lokale Checkbox eingebaut. Zahlungshöhe, Erstbelastung, Datum, Mandatsstatus/-referenz und vorab informierte Folgebelastung prüfen. Keine Verkürzung der Vorabankündigung ungeprüft vereinbaren. Mandatswiderruf und Vertragskündigung sind verschiedene Vorgänge. Version des Nachweises, Providerbeleg, Account, UTC-Zeit und Vorabinformationen speichern.

## Verarbeitungstätigkeiten-Matrix (Arbeitsstand)

Rollen: V = eigene Verantwortung; AV = Verarbeitung für Studio. Sämtliche konkreten Speicherfristen, Providerregionen und Transfers bleiben nachzuweisen.

| Tätigkeit / Rolle | Personen und Daten / Herkunft | Zweck / vorgeschlagene Grundlage | Empfänger | Löschkriterium / Bereitstellung |
|---|---|---|---|---|
| Website V | Besucher; IP, Browser, Abrufdaten direkt | Auslieferung/Sicherheit; Art. 6(1)(f), Abwägung | Vercel laut Projekt | technische Notwendigkeit; konkrete Logfrist offen |
| Interessenten V | Anfragende/Ansprechpartner; Kontakt und Inhalt, direkt oder durch Firma | Anbahnung; b bei eigenem Vertrag, f bei Firmenansprechpartner | Mailhosting, ggf. CRM | Abschluss + erforderlicher Nachweis; Kontakt notwendig |
| Konto/Abrechnung V | Inhaber/Admin; Login, Rollen, Anschrift, Preis, Annahmen, Belege | Vertrag b/f, konkrete gesetzliche Pflicht c | API-Hosting, Mollie, E-Mail, ggf. Buchhaltung/CRM | nach Kategorie/Fristbeginn; notwendige Vertragsdaten |
| Support V/AV | Anfragende und betroffene Studiokunden; Nachricht/Auszüge | Support b/f, Studioinhalte nur Weisung | berechtigter Support/Mail/Hosting | Bearbeitung + notwendiger Nachweis; Daten minimieren |
| Sicherheit V | Nutzer; Account, Aktion, Zeit, Fehler/IP falls notwendig | Sicherheit f; konkrete Nachweispflicht ggf. c | Admin/Hosting | zweckbezogene Logfrist offen |
| Termine/Kunden AV | Studiokunden; Kontakt, Termin, Leistung; direkt oder Studio | Buchung/Verwaltung; Grundlage durch Studio | Hosting/Mail freigeben | AVV-Weisung; erforderliche Buchungsdaten |
| Mitarbeiter AV | Team; Kontakt, Rollen, Zeiten, Abwesenheiten, Notizen | Personal-/Einsatzverwaltung; Grundlage durch Studio | Hosting, berechtigtes Studio | Studio-Löschplan; sensible Daten gesondert prüfen |
| Zusatzfunktionen AV | Kunden; Intake, Bewertungen, Treue, Gutscheine, Warteliste | nur bestellte freigegebene Funktion | Hosting, ggf. Mail | zweckbezogen durch Studio; optionale Daten freiwillig soweit zutreffend |
| KI/Import AV bzw. zweckabhängig | Prompts, Kontext, Websiteinhalte; Nutzer/angegebene URL | Assistenz; Zulässigkeit vor Übermittlung prüfen | OpenAI nur nach nachgewiesener Freigabe | Vertrags-/Konfigurationsdaten offen; nicht pauschal aktiv |
| Analyse V bzw. Studiozweck prüfen | Besucher/Nutzer; Kennungen/Interaktionen | optionale Analyse a, § 25 TDDDG separat | Google/Microsoft falls aktiviert, eigene API | konkrete Providerlaufzeiten offen; freiwillig |
| Marketing V | freiwillige Interessenten; Kontakt/Consent | Einwilligung und UWG separat prüfen | Versanddienst falls eingerichtet | Widerruf + minimaler erforderlicher Nachweis; freiwillig |
| Backups V/AV | jeweiliger Datenbestand | Wiederherstellung; gleiche Rollenbindung | Backup-/Hostingdienst klären | bestätigter Zyklus, Löschwiederholung nach Restore |

Keine eigene ausschließlich automatisierte Entscheidung mit erheblicher Wirkung wird durch den Entwurf eingeführt. Tatsächliche KI-/Profilingabläufe separat kontrollieren. Bei indirekter Erhebung Quelle und Art.-14-Information dokumentieren. Betroffenenrechte und Beschwerdekontakt stehen im Datenschutzentwurf.

## Datenschutzvorfall-Prozess

1. Meldung an [VORFALLKONTAKT_EINTRAGEN]; Vertretung [VORFALLVERTRETUNG_EINTRAGEN]. Zeitpunkt der Kenntnis dokumentieren, Incident-ID vergeben.
2. Betroffene Systeme/Schlüssel eingrenzen, Zugriff sperren, Beweise geschützt sichern; keine Inhalte wahllos in Tickets kopieren. Wiederherstellung kontrolliert planen.
3. Rolle bestimmen: bei Auftragsdaten Studio unverzüglich informieren, auch wenn noch nicht alle Fakten vorliegen. Informationen laufend ergänzen.
4. Bei eigener Verantwortung Risiko für Rechte/Freiheiten beurteilen. Art. 33 DSGVO: erforderliche Behördenmeldung möglichst binnen 72 Stunden ab Kenntnis; Verzögerung begründen. Nicht jeder Vorfall ist meldepflichtig, jeder Befund/Entscheidungsgrund ist zu dokumentieren.
5. Bei voraussichtlich hohem Risiko Art. 34 prüfen und betroffene Personen gegebenenfalls ohne unangemessene Verzögerung informieren; Maßnahmen verständlich beschreiben.
6. Ursache beseitigen, Integrität und sichere Wiederaufnahme prüfen, Dienstleister einbeziehen, Abschluss und Verbesserungen dokumentieren. Prozess regelmäßig üben.

## Zusätzliche Platzhalter dieser Anlage

`[TESTBEGINN]`, `[TESTENDE]`, `[GLÄUBIGER_ID_EINTRAGEN]`, `[MOLLIE_MANDATSREFERENZ_EINTRAGEN]`, `[VORFALLKONTAKT_EINTRAGEN]`, `[VORFALLVERTRETUNG_EINTRAGEN]`. Weitere Angaben werden automatisch in OFFENE_ANGABEN.md aus den zentralen Texten aufgelistet.
