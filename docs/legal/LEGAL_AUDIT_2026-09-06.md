# GentleBook – rechtliches Grundgerüst und technisches Audit

Stand: 06.09.2026. Entwurf zur anwaltlichen Prüfung – keine Rechtsberatung.

Produktentscheidung im Gespräch bestätigt: **14 Tage Test und das bestehende Homepage-Abonnementmodell** (Starter/Pro monatlich oder jährlich, Agency individuell). Die abweichenden Vorgaben im eingefügten Prompt sind insoweit überholt. Das laufende Geschäftsmodell wurde nicht geändert.

## Ergebnis und Grenzen

Die Software hat bereits B2B-Bestätigungen, eine manuelle Testfreigabe, externe Rechtslinks, Mollie-Statusabfragen und eine operative Löschroutine. Das ist keine Freigabe für den ersten Kunden. Ungeprüfte Tatsachenbehauptungen in den bisherigen Texten müssen ersetzt werden. Eine öffentlich angezeigte AVV-Zusammenfassung ersetzt keinen vollständigen abgeschlossenen AV-Vertrag mit Anlagen.

Geprüft wurde der lokale Quellcode von API, UI und Marketingwebsite. Produktive Konfiguration, Providerverträge, tatsächliche Datenflüsse im Livebetrieb, Backups und Unternehmensregister wurden nicht eingesehen. Das danebenliegende GentleSuite-CRM ist eine zusätzliche Systemgrenze und muss vor produktiver Übermittlung von Kunden-/Abrechnungsdaten separat geprüft werden. Bestehende uncommittete Zahlungsänderungen bleiben erhalten.

## Blocker vor erstem Kunden

| Risiko | Befund / Maßnahme | Nachweis / Zuständigkeit |
|---|---|---|
| BLOCKER | Anbieteridentität, ladungsfähige Anschrift, Rechtsform, Register-/ID-Pflichten und Kleinunternehmerstatus bestätigen. Vorhandene Angaben sind kein unabhängiger Nachweis. | Betreiber + Steuerberatung; bisher LegalPage.tsx |
| MITTEL | Modellentscheidung erledigt: 14 Tage, monatlich/jährlich, Agency-Angebot bestätigt. Produktive Konfiguration muss diesen Vorgaben entsprechen. | SuperAdminController.cs, dictionaries.ts, trial-activation-form.tsx, PlanLimits |
| BLOCKER | Rechtsfassungen nicht unveränderlich zum einzelnen Standardcheckout archiviert. Versionskonstante und Audittext allein sichern den Volltext nicht. | TenantController.StartMollieMandateFlow, LegalDocumentVersions.cs |
| BLOCKER | Vollständigen AVV einschließlich konkret belegter TOM und freigegebener Subprozessoren bereits vor Test mit Echtdaten abschließen. | TrialAccessInvitation, bisher nur AVV-Kurzbeschreibung auf Website |
| BLOCKER | Studiospezifischer Datenschutzlink/-text fehlt als eigenes Feld in TenantSettings; Buchungsformular verwendet allgemeine Datenschutzhinweise. | TenantSettings.cs, components/booking/ContactForm.tsx |
| HOCH | MollieClient/MollieService auf dauerhafte Idempotenz bei Erstzahlung und Subscription-Erstellung erweitern. Unique-Webhookindex ersetzt keinen atomaren Checkout. | MollieClient.cs, MollieService.cs, SkinbloomDbContext.cs |
| HOCH | Fehlerhafte Paymentverarbeitung kann eine nicht abgeschlossene Dedup-Zeile hinterlassen; erneuter Insert kollidiert. Wiederaufnahme und Reconciliation mit Alarmierung testen. | MollieWebhookController.HandlePaymentAsync |
| HOCH | Webhook-Fetchfehler werden als HTTP 200 beantwortet; Kommentar über Mollie-Retry stimmt damit nicht überein. | MollieWebhookController.cs |
| HOCH | Mandatstext/-version, tatsächlicher Gläubiger, Referenz und Vorabinformation im konkreten Mollie-Flow belegen; keine zweite lokale Mandatserteilung einbauen. | MollieService, MollieClient, EmailService |
| HOCH | Browser-lesbare Auth-/Superadmin-Tokens erhöhen XSS-Folgen. Cookie/BFF-Konzept einschließlich CSRF und Recovery/MFA erstellen und testen. | lib/auth/storage.ts |
| HOCH | Gesundheitsdaten können in Freitexten, Formularantworten und KI-Anfragen landen; Erfassung bis gesonderter Freigabe begrenzen. | Notes, IntakeForm*, AiMessages, EmployeeNotes |
| HOCH | Hostingregionen, Transfers, Auftragsverträge, Backup-Laufzeiten und produktive KI-/Trackingaktivierung sind nicht belegt. | Program.cs registriert OpenAI-Adapter bei konfiguriertem Schlüssel; Website behauptete keine aktive KI |
| HOCH | Export, Kontolöschanfrage und rechtmäßige Archivierung vollständig Ende-zu-Ende prüfen, insbesondere bei gesperrtem Konto. Ein Supportlink ist kein umgesetzter Datenexport. | SubscriptionService, TenantMiddleware, Subscription-Seite |
| HOCH | BFSG-Anwendbarkeit der öffentlichen Endkundenbuchung separat prüfen; B2B-SaaS schließt Verbraucherbezug der Buchungsseiten nicht aus. | Betreiber + Anwalt |

## Kurz nach Launch (nur soweit kein oben genannter Blocker)

| Risiko | Maßnahme |
|---|---|
| MITTEL | Regelmäßiger Restore-Test, Löschlaufkontrolle, Datenschutzvorfallübung und Rechteprüfung |
| MITTEL | Dienstleisteränderungen, Auskunftsanfragen und Consent-Widerrufe nachvollziehbar bearbeiten |
| MITTEL | Marketingclaims, englische Seiten und tatsächliche Funktionsgrenzen regelmäßig abgleichen |

## Später sinnvoll

| Risiko | Maßnahme |
|---|---|
| NIEDRIG | Automatisiertes Kundenportal für AVV-Nachweise und historische Vertragsfassungen |
| NIEDRIG | Wiederkehrende externe Sicherheitsprüfung und dokumentierte Lieferantenbewertung |

## Datei- und Funktionsinventar / Änderungsvorschlag

Pfade relativ zum jeweiligen Projekt, sofern nicht anders angegeben. Zeilennummern ändern sich mit der Umsetzung.

| Datei / Bereich | Befund und konkrete nächste Änderung |
|---|---|
| Website src/components/layout/LegalPage.tsx | Zentrale Darstellung; unbelegte Tatsachen durch explizite Klärungspunkte ersetzen, gemeinsame Entwurfskennzeichnung |
| Website src/app/[locale]/{impressum,datenschutz,agb,auftragsverarbeitung,unterauftragsverarbeiter,b2b}/page.tsx | Bereits öffentliche Seiten; um Cookies, Nutzung, TOM und Löschkonzept ergänzen |
| Website src/app/[locale]/widerruf/page.tsx | Bereits Redirect auf B2B, keine echte Widerrufsbelehrung; beibehalten |
| Website src/proxy.ts | Deutsche URLs ohne Präfix, englische URLs mit /en; neue Seiten müssen beide unterstützen |
| Website src/components/layout/Footer.tsx | Bestehende Rechtslinks und Cookie-Einstellungen; neue Anlagen verlinken |
| Website src/lib/{cookieConsent,analytics,experiments}.ts; CookieConsent.tsx | Consent-Speicher und Experiment-/Analyseinfrastruktur inventarisieren; analytics.ts ist derzeit Console-/TODO-Adapter, kein Beweis für sämtliche Produktionsskripte |
| Website src/lib/leadMail.ts; forms/*; app/api/* | Interessenten-/Kontakt-/Testanfragen, SMTP-Übermittlung und Fehlerlogs; Löschkriterien und SMTP-Dienst bestätigen |
| UI lib/config.ts; app/{impressum,datenschutz,agb,widerruf} | Zentraler NEXT_PUBLIC_LEGAL_SITE_URL bereits vorhanden; zusätzliche Ziele und Redirects ergänzen |
| UI components/Footer.tsx; app/admin/layout.tsx; Login/Recovery/Trial | Rechtslinks ohne Login und innerhalb App prüfen; AVV und Subprozessoren ergänzen |
| UI app/admin/subscription/page.tsx | Existierende lokale Änderungen; Checkout-Summary, Korrektur, Button, Nachweise und getrennte Kündigung/Löschung gezielt weiterentwickeln |
| UI components/booking/ContactForm.tsx; app/booking/[slug]/* | Studio-Verantwortlichen und eigene Hinweise einbinden, keine pauschale Datenschutz-Einwilligung |
| UI components/analytics/*; hooks/useAnalyticsConsent.ts; lib/tracking.ts | Google Analytics, Microsoft Clarity und eigene Trackingpfade konfigurationsabhängig; Ablehnung/Widerruf im Browser einschließlich Netzwerkanfragen testen |
| UI components/KlaroCookieConsent.tsx; Website src/lib/siteConfig.ts | Externes Klaro-Skript über jsDelivr; Google-Calendar-Buchungslinks. Externe Abrufe/Empfänger ebenfalls berücksichtigen; Consent-Skript möglichst selbst hosten |
| UI lib/auth/storage.ts | access_token, auth_user, employee, superadmin_token, superadmin_user im localStorage; Migration gesondert entwerfen |
| API Controllers/SuperAdminController.cs; TrialAccessInvitation.cs; ManualTrialActivationTests.cs | Einladung, Annahme, manuelle Aktivierung; konfigurierbare Testdauer statt abweichender Textkonstanten |
| API Controllers/TenantController.cs | B2B-/AGB-/Billing-Flags vor Mollie-Start; vollständigen serverseitigen Bestellsnapshot vor externem Aufruf speichern |
| API Services/{MollieClient,MollieService,MollieReconciliationJob}.cs | Zahlungsveranlassung, Mandatsprüfung, Status und Reconciliation; Idempotenz und parallele Requests mit relationaler DB testen |
| API Controllers/MollieWebhookController.cs | Vertrauenswürdige Serverabfrage vorhanden; Fehlerwiederaufnahme und Statusübergänge absichern |
| API Services/SubscriptionService.cs | Ablauf ohne Zahlung, Kündigung, Mahnung, 30-Tage-Retention und Löschung vorhanden; keine allgemeine gesetzliche 30-Tage-Frist. Hold, Logs, Dateien, CRM und Backups gesondert erfassen |
| API Services/EmailService.cs | Transaktionsmails vorhanden; archivierte AGB/AVV und Preisnachweis mit Outbox/Retry ergänzen |
| API Data/Entities/{Subscription,SubscriptionRequest,TenantSettings}.cs; Data/SkinbloomDbContext.cs | Angebotsannahme teilweise strukturiert; reguläre Bestellungen und Rechtstextvolltexte ergänzen |
| API Program.cs; Controllers/AuthController.cs | Rate Limiting vorhanden; produktive Schlüsselpersistenz, MFA, TLS/at-rest, Secrets-Rotation und vollständige Mandantentrennung nicht durch dieses Audit bewiesen |
| API Gentle.Book.API.Tests/* | 129 bestehende Tests vor Änderungen erfolgreich; keine Freigabe der Live-Zahlungsstrecke |

## Gap-Analyse je Rechtsdokument

| Dokument | Bestand | Umsetzung / verbleibende Lücke |
|---|---|---|
| Impressum | Konkrete, unbestätigte Betreiber-/Steuerdaten | Platzhalter und bedingte Pflichtangaben; Betreiber muss ausfüllen |
| AGB | Umfangreicher Text mit abweichendem Geschäftsmodell | B2B-Entwurf; Laufzeit/Preis/Haftung anwaltlich und operativ freigeben |
| Datenschutz | Teilweise unbelegte Betriebsbehauptungen | Verantwortlicher/Auftragsverarbeiter trennen; Matrix und Klärungspunkte |
| AVV | Zusammenfassung | Vollständiges Vertragsgerüst plus Anlagen; Abschluss/Nachweis noch zu implementieren |
| Subprozessoren | Teilweise behauptete Regionen | Dienstleisterinventar mit unbestätigten Regionen/Verträgen/Transfergrundlagen |
| Cookies / Nutzung / TOM / Löschung | Keine separaten vollständigen Anlagen | Neue zentrale Entwürfe; Umsetzung der TOM ist nicht durch den Text bewiesen |
| Widerruf | B2B-Redirect | Keine B2C-Texte ergänzen; tatsächliche Kundenprüfung und Endkunden-BFSG separat |

## Vorgeschlagene Datenbankmigrationen (nicht ausgeführt)

1. LegalDocument: Typ, Version, Sprache, Volltextbytes, SHA-256, Freigabezeit. Unique(Typ, Version, Sprache); nach Freigabe keine Updates, Zugriffsschutz plus unveränderliches Archiv. Git oder Hash allein ist kein revisionssicheres Archiv.
2. ContractAcceptance: TenantId, ActorId, UTC-Zeit, Dokument-FKs, B2B-Erklärungstext, Tarif-/Feature-/Preis-/Steuer-/Laufzeitsnapshot, Bestell-ID. Transaktion vor Mollie-Aufruf, keine unnötige IP-Speicherung.
3. CheckoutAttempt/PaymentOperation: TenantId, BusinessOperationId unique, IdempotencyKey unique, Provider-IDs mit gefilterten Unique-Indizes, Status, Retry-Zeit, Fehlerklasse; Outbox für Zahlungs-/Mailjobs, keine geheimen Bankdaten im Audit.
4. MandateEvidence: Providerreferenz, tatsächlicher Gläubiger, Textversion oder Provider-Nachweis, Status, Erteilungs-/Widerrufszeit, Vorabinformationen; keine zweite Mandatserteilung.
5. TenantSettings: PrivacyUrl/PrivacyText, ImprintUrl und Verantwortlichenkontakt; URL nur HTTPS, keine Script-/Data-URLs. API/DTO/Settingsformular/alle Buchungstemplates gemeinsam ändern.
6. DeletionRequest/RetentionHold: Auftrag, Scope, Fälligkeit, Status, legitimer Hold-Grund, Prüftermin, Ergebnis ohne gelöschte Inhaltsdaten; Löschjobs berücksichtigen den Hold.

Historische Annahmen nicht nachträglich mit einer neuen Fassung oder erfundenen Zustimmung versehen. Bestehende Modell-Snapshot-Änderungen vor einer EF-Migration integrieren.

## Erforderliche fachliche Tests

- Parallele identische Checkout-Requests erzeugen genau eine Provideroperation; nach Timeout mit demselben Idempotenzschlüssel fortsetzen.
- Doppelte/parallel zugestellte und zunächst fehlgeschlagene Webhooks, paid→chargeback, unbekannte Fremd-ID; relationales DB-Backend statt nur InMemory verwenden.
- Trialablauf verursacht null Zahlungsaufrufe, Export/Löschanfrage bleiben autorisiert erreichbar; keine Fremdmandantendaten.
- Bestätigung verwendet exakt bestellte Dokumentbytes/Preis; Versandfehler wird nachgeholt, spätere Dokumentänderung verändert Altnachweis nicht.
- Ablehnen/Annehmen/Widerrufen: tatsächliche Requests von GA/Clarity/Tracking, Cookies und Storage kontrollieren.
- Löschung: Abrechnung bleibt geschützt, operative Daten und Dateien verschwinden, Hold verhindert unzulässige Löschung, Restore stellt gelöschte Daten nicht dauerhaft wieder her.
- Studiohinweise auf jedem Buchungstemplate und allen Login-/Recovery-Seiten sowie Domainwechsel ohne Redirectschleife prüfen.

## Anwaltliche und betriebliche Freigabecheckliste

- [ ] Betreiber-/Register-/Steuerdaten und Datenschutzbeauftragtenpflicht geklärt.
- [ ] Testdauer, Angebotspreise, Jahresabos, Beginn, Verlängerung, Kündigung und Steuerdarstellung einheitlich.
- [ ] AGB: Haftung, Mängelrechte, Preisänderung, Gerichtsstand und Zahlungsverzug geprüft.
- [ ] AVV abgeschlossen; TOM tatsächlich umgesetzt und Dienstleisterverträge/Transfers belegt.
- [ ] Gesundheitsdaten/DSFA, Mitarbeiterdaten und Endkundenrollen einschließlich Art. 13/14 geklärt.
- [ ] Vertragssnapshot, dauerhafte Bestätigung, Mollie-Mandat und Vorabinformation verifiziert.
- [ ] Löschfristen nach konkretem Dokumenttyp, Fristbeginn, Steuerstatus und Rechtslage festgelegt; keine pauschale Rechnungsfrist geraten.
- [ ] B2B-Prüfung tatsächlich durchgeführt; Verbraucherabschluss ggf. separat abgesichert.
- [ ] BFSG für Endkundenbuchung, UWG für Einladungen/Werbung und ggf. DSA-Diensteklassifizierung geprüft.
- [ ] Erst nach diesen Freigaben veröffentlichen; vorhandene Zustimmungsversionen nicht stillschweigend ersetzen.

## Primärquellen (abgerufen 06.09.2026)

- [DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html): Anbieterinformationen.
- [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/deu): insbesondere Art. 5, 6, 9, 12–22, 28, 30, 32–36 und 44 ff.; Grundlage der Prüffragen, keine Aussage über deren Umsetzung.
- [TDDDG § 25](https://www.gesetze-im-internet.de/ttdsg/__25.html): Einwilligung und Ausnahmen beim Endgerätezugriff.
- [BGB § 312k](https://www.gesetze-im-internet.de/bgb/__312k.html): Verbraucher-Kündigung bei erfassten Online-Dauerschuldverhältnissen.
- [Mollie Recurring Payments](https://docs.mollie.com/docs/recurring-payments): Erstzahlung, Mandat und Folgezahlungen; die konkrete aktivierte Zahlart muss im Händlerkonto geprüft werden.

## Umgesetzt und geprüft

- Zehn zentral gepflegte Entwürfe in Website `src/content/legal/documents.ts`; gemeinsame Kennzeichnung und Version, vier neue öffentliche Routen für Cookies/Nutzung/TOM/Löschung, Verlinkung sämtlicher Anlagen.
- Anwaltspaket in Website `docs/legal/RECHTSTEXTE_ENTWURF.md`, 37 Textplatzhalter in `OFFENE_ANGABEN.md`, ergänzende Checkout-/SEPA-/Vorfalltexte und Verarbeitungsmatrix in `BETRIEB_UND_CHECKOUT.md` (sechs zusätzliche operative Platzhalter dort aufgeführt).
- UI: zusätzliche zentrale Linkziele und Footerlinks; `components/LegalNavigation.tsx` im Rootlayout macht Rechtslinks auf Admin-/Superadmin-/Recovery-/Testaktivierungs- und E-Mail-Verifikationsseiten unabhängig von der Anmeldung erreichbar. Keine GentleBook-Abobedingungen zusätzlich in Studio-Buchungsseiten eingebaut.
- Bestehendes Zahlungs-/Testmodell, vorhandene Backend-Versionsnummern und fremde uncommittete Änderungen nicht geändert. Keine neue Datenbankmigration ausgeführt, keine Zahlung, Datenlöschung, Veröffentlichung oder Deployment vorgenommen.
- Vor Änderungen: Website-Typecheck erfolgreich; API: 129/129 Tests erfolgreich. Nach Änderungen: Website-Produktionsbuild erfolgreich (59 generierte Seiten), vier neue Struktur-/Linktests erfolgreich, Website-/UI-Typechecks erfolgreich, UI: 58/58 Tests erfolgreich. Kleine anschließende Renderer-/Textänderungen erneut mit Website-Typecheck und Linktests geprüft.
- Grenzen: Linktests prüfen Routenzuordnung im Repository, nicht die endgültige externe Domain. Keine visuelle Browserprüfung, keine Live-Consent-/Zahlungs-/Export-/Löschprüfung. Die Backend-Blocker sind dokumentierte Änderungsvorschläge, nicht als behoben ausgewiesen. Tests belegen keine Rechtskonformität.
