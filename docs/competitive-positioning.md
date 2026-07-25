# Wettbewerbspositionierung — Treatwell & Salonized

Stand: 2026-07 (Recherche per Websuche). **Internes Strategiedokument** — nicht
für eine öffentliche Vergleichsseite mit Namensnennung gedacht. Vergleichende
Werbung mit Konkurrenznamen ist in Deutschland nur unter engen Voraussetzungen
zulässig (§6 UWG: objektiv, nachprüfbar, nicht herabsetzend), und Preise/
Konditionen von Drittanbietern ändern sich — vor jeder öffentlichen Verwendung
neu verifizieren. Die Website nennt Treatwell/Salonized daher bewusst nicht
namentlich; stattdessen werden GentleBooks eigene, verifizierbare Vorteile
deutlicher kommuniziert.

## Treatwell for Business

Marktplatz + Software-Anbieter, über 60.000 Salons/Spas in Europa.

- **Provisionsmodell**: 35 % vom Brutto bei Erstbuchungen über den Marktplatz,
  zzgl. 19 % MwSt. → effektiv rund 41,65 % Bruttobelastung für kleine
  Unternehmen bei Neukundenbuchungen.
  [Quelle: Tagesspiegel](https://www.tagesspiegel.de/berlin/berliner-wirtschaft/ein-drittel-provision--lohnt-sich-das-wie-treatwell-das-beauty-business-digitalisiert-12571145.html)
- **Zusatzkosten**: 99 € Setup-Gebühr, 7,50 €/Monat für ein verpflichtendes
  TSE-Gerät, Zahlungsabwicklung 0,79 % + 0,20 €/Transaktion. Seit Juni 2024
  keine kostenlosen SMS-Erinnerungen mehr.
  [Quelle: SoftwareAdvice](https://www.softwareadvice.com/salon/treatwell-connect-profile/)
- **Nutzerkritik** (aus Bewertungsportalen): hohe Provisionen, lange
  Supportwartezeiten (teils über eine Stunde), Einschränkungen bei der
  Verlinkung der eigenen Website, Buchungen können über den Marktplatz nicht
  abgelehnt werden.
  [Quelle: Trustpilot](https://de.trustpilot.com/review/treatwell.de),
  [Quelle: erfahrungenscout.de](https://erfahrungenscout.de/dienstleistungen/treatwell-bewertungen)
- Positiv: großes Marktplatz-Netzwerk kann Neukund:innen bringen, die man
  ohne Marktplatz nicht hätte — das ist der eigentliche "Deal", den Salons
  eingehen (Reichweite gegen Provision + Kontrollverlust).

## Salonized

Reines SaaS-Abo-Modell, kein Marktplatz.

- Ab ca. 17,50–29 €/Monat je nach Teamgröße.
  [Quelle: SoftwareAdvice](https://www.softwareadvice.de/software/154561/salonized),
  [Quelle: Salonized Help Center](https://help.salonized.com/en/articles/572113-what-are-salonized-plans-and-pricings)
- SMS-Erinnerungen kosten extra (0,15 €/SMS).
- Kein Provisionsmodell, aber auch kein zusätzlicher Marktplatz-Traffic.
- Bietet eine kostenlose Testphase; laut Vergleichsportalen nur
  Web-Zugang, keine dedizierten nativen Mobile-Apps.
  [Quelle: SpotSaaS-Vergleich](https://www.spotsaas.com/compare/treatwell-vs-salonized-vs-fresha)

## Ableitung: Wo GentleBook heute schon ehrlich punktet

| Recherchierter Nachteil bei der Konkurrenz | GentleBooks Antwort (verifizierbar) | Wo umgesetzt |
| --- | --- | --- |
| Treatwell: ~35–41,65 % Provision auf Buchungen | Fester Plan-Preis (`lib/pricing.ts`), keine Provision pro Buchung, unabhängig vom Buchungsvolumen innerhalb der Plan-Limits | `dictionaries.ts` → `faq.items`, `socialProof.trustPoints`, `pricingSection.conditions` |
| Treatwell: 99 € Setup-Gebühr, Pflicht-TSE-Gerät (7,50 €/Monat) | Keine Setup-Gebühr, keine Pflicht-Zusatzgeräte — transparente, feste Preise | `pricingSection.disclaimer` ("Keine versteckten Kosten") |
| Treatwell: Einschränkungen bei Verlinkung der eigenen Website | Volle Kontrolle über eigene Buchungsseite/URL/Branding | `features.items` ("Deine Buchungsseite" — "Deine Marke steht im Mittelpunkt — nicht unsere") |
| Treatwell: lange Supportwartezeiten | Persönlicher Support als Kernversprechen | `socialProof.trustPoints` ("Persönlicher Support") |
| Beide: kein spezifischer Fokus auf branchenübergreifende lokale Dienstleister (Fokus liegt stark auf Beauty/Salon) | GentleBook positioniert sich breiter für lokale Dienstleister generell (Hundefriseure, Coaches, Werkstätten, …) | `industries`-Sektion, Branchenlandingpages unter `/buchungssystem-*` |

## Nicht verwendbare Punkte (zu unsicher/veränderlich für öffentliche Aussagen)

- Exakte aktuelle Nutzerbewertungs-Scores (ändern sich laufend, teils
  widersprüchliche Werte je nach Quelle).
- Salonized-Preise variieren je nach Quelle (17,50 € vs. 29 €) — nicht
  verlässlich genug für eine eigene Preisaussage über Dritte.

## Empfehlung

Keine öffentliche "GentleBook vs. Treatwell/Salonized"-Seite. Stattdessen die
oben genannten eigenen Stärken in bestehenden Sektionen (FAQ, Trust-Sektion,
Preis-Bedingungen) klar herausstellen — das transportiert dieselben
Kaufargumente ohne rechtliches Risiko und ohne Konkurrenz-Branding auf der
eigenen Seite zu verstärken.
