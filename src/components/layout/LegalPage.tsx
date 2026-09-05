import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/locales";

export type LegalPageId =
  | "impressum"
  | "datenschutz"
  | "agb"
  | "b2b"
  | "auftragsverarbeitung"
  | "unterauftragsverarbeiter";

export const legalPageTitles: Record<LegalPageId, string> = {
  impressum: "Impressum",
  datenschutz: "Datenschutzerklärung",
  agb: "Allgemeine Geschäftsbedingungen",
  b2b: "B2B-Hinweis",
  auftragsverarbeitung: "Auftragsverarbeitung",
  unterauftragsverarbeiter: "Unterauftragsverarbeiter",
};

const CONTACT_EMAIL = "info@gentlebook.app";
const SUPPORT_EMAIL = "support@gentlegroup.de";
const CONTACT_PHONE = "+49 157 35985449";
const OPERATOR_NAME = "Berk-Can Atesoglu";
const OPERATOR_ADDRESS = ["Girardetstraße 17", "42109 Wuppertal", "Deutschland"];
const UPDATED_AT = "1. August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 first:mt-0">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-mist">{children}</div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-outside list-disc space-y-1.5 pl-5">{children}</ul>;
}

function ContactDetails() {
  return (
    <div className="space-y-1 text-ink">
      <p>{OPERATOR_NAME}</p>
      <p>handelnd unter den Geschäftsbezeichnungen GentleGroup und GentleBook</p>
      {OPERATOR_ADDRESS.map((line) => <p key={line}>{line}</p>)}
      <p>
        E-Mail: <a className="text-violet hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}

function DraftNotice() {
  return (
    <div className="mb-8 rounded-2xl border border-amber-400/40 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
      <strong>Launch-Fassung – noch nicht anwaltlich geprüft.</strong> Bitte vor dem
      Produktivstart rechtlich prüfen und freigeben lassen.
    </div>
  );
}

function ImpressumContent() {
  return (
    <>
      <Section title="Angaben gemäß § 5 Digitale-Dienste-Gesetz">
        <ContactDetails />
      </Section>
      <Section title="Kontakt">
        <p>Telefon: {CONTACT_PHONE}</p>
        <p>E-Mail: <a className="text-violet hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p>Technischer Support: <a className="text-violet hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
      </Section>
      <Section title="Unternehmensform">
        <p>Einzelunternehmen</p>
        <p>Inhaber: {OPERATOR_NAME}</p>
      </Section>
      <Section title="Umsatzsteuer">
        <p>Aufgrund der Anwendung der Kleinunternehmerregelung gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen.</p>
      </Section>
      <Section title="Kein Verbraucherangebot">
        <p>GentleBook richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Verträge mit Verbrauchern werden nicht geschlossen.</p>
      </Section>
      <Section title="Verantwortlichkeit für Inhalte">
        <p>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Eine Gewähr für ihre Richtigkeit, Vollständigkeit und Aktualität wird nicht übernommen, soweit keine zwingende gesetzliche Haftung besteht.</p>
        <p>Verantwortlich für den Inhalt: {OPERATOR_NAME}, {OPERATOR_ADDRESS.join(", ")}.</p>
      </Section>
    </>
  );
}

function AgbContent() {
  return (
    <>
      <DraftNotice />
      <p className="text-xs font-medium uppercase tracking-wide text-mist">Stand: {UPDATED_AT}</p>
      <Section title="§ 1 Anbieter und Geltungsbereich">
        <ContactDetails />
        <p>Diese AGB gelten für alle Verträge über die Nutzung der Software-as-a-Service-Lösung GentleBook. Abweichende Geschäftsbedingungen gelten nur nach ausdrücklicher Zustimmung des Anbieters in Textform.</p>
      </Section>
      <Section title="§ 2 Ausschließliche Ausrichtung an Unternehmer">
        <p>GentleBook richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Ein Vertragsschluss mit Verbrauchern im Sinne des § 13 BGB ist ausgeschlossen.</p>
        <p>Der Kunde bestätigt bei Abschluss des Testvertrags oder bei Bestellung eines Tarifs, dass er GentleBook ausschließlich im Rahmen seiner gewerblichen oder selbstständigen beruflichen Tätigkeit nutzt. Der Anbieter darf geeignete Nachweise anfordern.</p>
      </Section>
      <Section title="§ 3 Vertragsgegenstand und Leistungen">
        <p>GentleBook ist eine webbasierte Software für terminbasierte Unternehmen. Je nach Tarif gehören dazu insbesondere:</p>
        <List>
          <li>öffentliche Buchungsseiten, Termin-, Kalender- und Kundenverwaltung,</li>
          <li>Mitarbeiter, Arbeitszeiten, Abwesenheiten, Leistungen, Preise und Standorte,</li>
          <li>E-Mail-Bestätigungen, Erinnerungen, Wartelisten und Stornierungen,</li>
          <li>Branding, Logos, Texte, Links, Templates, Statistiken und Datenexporte,</li>
          <li>automatisierte Assistenzfunktionen sowie Website- und Markenimport.</li>
        </List>
        <p>Der konkrete Umfang ergibt sich aus der bei Vertragsschluss geltenden Tarifbeschreibung. Roadmap- oder Vorschaufunktionen sind nicht geschuldet. Ein bestimmter wirtschaftlicher Erfolg wird nicht geschuldet.</p>
      </Section>
      <Section title="§ 4 Einrichtung, Freigabe und Zugang zu GentleBook">
        <p>GentleBook ist kein öffentlich zugängliches Selbstregistrierungssystem. Konten werden ausschließlich durch den Anbieter nach vorheriger Kontaktaufnahme und persönlicher Abstimmung mit dem Unternehmen eingerichtet.</p>
        <p>Eine Anfrage über die Marketingseite dient nur der Information, Terminvereinbarung und Vorbereitung eines möglichen Testzugangs. Sie richtet noch kein Konto ein, startet keine Testphase, schließt keinen kostenpflichtigen Vertrag und begründet keinen Anspruch auf Einrichtung, Freigabe oder dauerhafte Bereitstellung. Der Anbieter entscheidet nach dem Gespräch und der Prüfung der Unternehmensangaben, ob ein Testmandant vorbereitet wird.</p>
        <p>Der Anbieter kann einen individuellen Mandanten einschließlich öffentlicher Buchungsseite, Administratorzugängen, Standorten, Mitarbeitern, Leistungen, Arbeitszeiten und Grundeinstellungen vorbereiten. Die bloße technische Anlage oder Vorbereitung stellt keine Freigabe dar und setzt die Testphase nicht in Gang.</p>
        <p>Vor einer möglichen Freigabe muss das Unternehmen seine Unternehmereigenschaft bestätigen, die geltenden AGB akzeptieren, die Datenschutzerklärung zur Kenntnis nehmen und den Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO elektronisch oder in Textform abschließen. Die Abgabe dieser Bestätigungen startet den Test noch nicht.</p>
        <p>Die Nutzung ist erst nach einer anschließenden ausdrücklichen Freigabe durch den Anbieter zulässig. Der Anbieter teilt Freischaltungsdatum, Beginn und Ende der Testphase sowie die Zugangsdaten in Textform mit. Das Unternehmen muss die vorbereiteten Unternehmensangaben, Leistungen, Preise, Mitarbeiter, Arbeitszeiten, Buchungs- und Stornierungsbedingungen sowie Datenschutzinformationen vor der produktiven Nutzung prüfen.</p>
      </Section>
      <Section title="§ 5 Kostenlose Testphase">
        <p>Nach vorheriger persönlicher Abstimmung kann der Anbieter dem Unternehmen einen kostenlosen Testzugang für 14 Tage bereitstellen. Die Testphase beginnt ausschließlich mit dem vom Anbieter ausdrücklich mitgeteilten Freischaltungsdatum. Die vorherige technische Anlage, Einrichtung oder rechtliche Bestätigung gehört nicht zur Testphase.</p>
        <p>Beginn und Ende werden dem Unternehmen mit der Freischaltung in Textform mitgeteilt.</p>
        <p>Eine Zahlungsmethode ist nicht erforderlich. Die Testphase geht nicht automatisch in ein kostenpflichtiges Abonnement über und nach ihrem Ablauf erfolgen keine automatischen Abbuchungen. Ein kostenpflichtiger SaaS-Vertrag entsteht erst durch die ausdrückliche Auswahl und Bestätigung eines kostenpflichtigen Monats- oder Jahresabonnements.</p>
        <p>Während der Testphase können sämtliche oder ausgewählte Funktionen bereitgestellt und Funktionen, Nutzungslimits oder Integrationen eingeschränkt werden. Werden personenbezogene Daten verarbeitet, gelten der vorab abgeschlossene Vertrag zur Auftragsverarbeitung und die datenschutzrechtlichen Pflichten des Unternehmens.</p>
        <p>Nach Ablauf kann der Anbieter den administrativen Zugang und die öffentliche Buchungsseite deaktivieren, neue Buchungen unterbinden und das Konto einschränken. Tarifauswahl und Datenexport auf Anfrage bleiben während der 30-tägigen Aufbewahrungsphase möglich.</p>
        <p>Wird innerhalb von 30 Tagen nach Testende kein kostenpflichtiger Tarif abgeschlossen, werden die operativen Daten gelöscht oder irreversibel anonymisiert, soweit keine gesetzlichen Aufbewahrungspflichten oder sonstigen Rechtsgrundlagen entgegenstehen.</p>
      </Section>
      <Section title="§ 6 Tarife und Nutzungsgrenzen">
        <p>Tarife können sich insbesondere bei Mitarbeitern, Leistungen, monatlichen Buchungen, Templates, Analytics, Assistenzfunktionen, Schnittstellen und Support unterscheiden. Die jeweils geltenden Grenzen werden vor Abschluss angezeigt.</p>
        <p>Bei Erreichen einer Grenze kann die betroffene Funktion bis zum nächsten Abrechnungszeitraum eingeschränkt oder ein Tarifwechsel angeboten werden. Sicherheits- und Datenschutzfunktionen bleiben davon unberührt.</p>
      </Section>
      <Section title="§ 7 Kundeninhalte">
        <p>Der Kunde darf je nach Funktion Logos, Texte, Leistungsbeschreibungen, Links, Farben und Bilder hinterlegen und versichert, die erforderlichen Rechte zu besitzen.</p>
        <p>Er räumt GentleBook für die Vertragsdauer das zur Speicherung, Verarbeitung und Darstellung erforderliche einfache Nutzungsrecht ein. Weitere Rechte werden nicht übertragen. Rechtswidrige Inhalte dürfen nach Prüfung gesperrt oder entfernt werden.</p>
      </Section>
      <Section title="§ 8 Öffentliche Buchungen und Endkundenverträge">
        <p>GentleBook stellt ausschließlich die technische Plattform bereit. Vertragspartner des Endkunden für die gebuchte Dienstleistung ist allein das jeweilige Unternehmen. GentleBook wird nicht Partei des Dienstleistungs- oder Behandlungsvertrags und nimmt derzeit keine Zahlungen für diese Leistungen entgegen.</p>
        <p>Das Unternehmen verantwortet Leistungen, Preise, Verfügbarkeiten, Stornierungen, Anzahlungen, Erstattungen, Hinweise und gesetzliche Informationspflichten. GentleBook erhebt nach dem derzeitigen Modell keine Provision pro Endkundenbuchung.</p>
      </Section>
      <Section title="§ 10 Website- und Markenimport">
        <p>Der Kunde darf nur Websites analysieren lassen, deren Inhaber er ist oder für die er ausreichende Rechte besitzt. Aus öffentlich erreichbaren Farben, Logos, Schriften, Metadaten und Unternehmensinformationen können Vorschläge entstehen.</p>
        <p>Erkannte Inhalte werden nicht automatisch veröffentlicht. Der Kunde muss Vorschläge prüfen und ausdrücklich übernehmen und bleibt für Richtigkeit, Aktualität und Rechtmäßigkeit verantwortlich.</p>
      </Section>
      <Section title="§ 11 Automatisierte Assistenzfunktionen">
        <p>Service-Finder, Gestaltungs-, Text- oder Markenvorschläge und automatisierte Hinweise sind unverbindliche Vorschläge. Sie müssen vor Verwendung fachlich, rechtlich und inhaltlich geprüft werden.</p>
        <p>GentleBook erteilt keine medizinische, therapeutische, rechtliche oder steuerliche Beratung. Buchungen und andere rechtlich relevante Aktionen werden nicht allein aufgrund einer automatisierten Ausgabe verbindlich ausgeführt, sondern erfordern eine ausdrückliche Bestätigung.</p>
      </Section>
      <Section title="§ 12 Preise und Zahlungsbedingungen">
        <p>GentleBook wird in den Tarifen Starter (29,00 € monatlich oder 278,00 € jährlich) und Pro (59,00 € monatlich oder 566,00 € jährlich) angeboten. Maßgeblich ist der unmittelbar vor Abschluss angezeigte Preis. Der Tarif Agency wird individuell nach Teamgröße und Anforderungen angeboten; der Preis wird dem Kunden vor Vertragsschluss im Angebot mitgeteilt.</p>
        <p>Der Kunde kann zwischen monatlicher und jährlicher Abrechnung wählen. Die Vergütung wird für den jeweils gewählten Abrechnungszeitraum vollständig im Voraus fällig.</p>
        <p>Die angegebenen Monats- und Jahrespreise sind die jeweils zu zahlenden Gesamtpreise. Gemäß § 19 UStG wird aufgrund der Kleinunternehmerregelung keine Umsatzsteuer berechnet oder ausgewiesen.</p>
        <p>Entfallen künftig die Voraussetzungen der Kleinunternehmerregelung, werden zukünftige Preise und Rechnungen an die geltenden umsatzsteuerrechtlichen Vorgaben angepasst. Der Kunde wird vor einer dadurch verursachten Preisänderung informiert.</p>
        <p>Die Zahlungsabwicklung erfolgt über Mollie B.V. Die konkret verfügbaren Zahlungsarten werden vor Abschluss angezeigt. Der Kunde muss eine gültige Zahlungsmethode bereitstellen. Rechnungen werden elektronisch im Benutzerkonto oder per E-Mail bereitgestellt.</p>
      </Section>
      <Section title="§ 13 Vertragslaufzeit und Kündigung">
        <p>Das Abonnement läuft auf unbestimmte Zeit. Je nach Auswahl beträgt der Abrechnungszeitraum einen Monat oder zwölf Monate und verlängert sich jeweils automatisch um einen weiteren Zeitraum gleicher Dauer, sofern es nicht gekündigt wurde. Es kann jederzeit zum Ende des laufenden, bereits bezahlten Zeitraums über das Benutzerkonto oder in Textform gekündigt werden.</p>
        <p>Der Zugang bleibt bis dahin aktiv; anschließend erfolgen keine weiteren Abbuchungen. Eine anteilige Erstattung erfolgt nicht, soweit kein zwingender Anspruch besteht. Das Recht zur außerordentlichen Kündigung bleibt unberührt.</p>
      </Section>
      <Section title="§ 14 Fehlgeschlagene Zahlungen">
        <p>Bei einer fehlgeschlagenen Zahlung kann das Abonnement als „Zahlung ausstehend“ geführt werden. Der Kunde wird informiert und erhält grundsätzlich sieben Tage Kulanz ab dem ersten fehlgeschlagenen Vorgang. Ohne erfolgreiche Zahlung kann der Zugang anschließend eingeschränkt und der Vertrag gekündigt werden.</p>
      </Section>
      <Section title="§ 15 Verfügbarkeit und Wartung">
        <p>Eine ununterbrochene und jederzeit fehlerfreie Verfügbarkeit wird ohne gesonderte Service-Level-Vereinbarung nicht geschuldet. Einschränkungen können insbesondere durch Wartung, Sicherheitsupdates, technische Störungen, Ausfälle von Dienstleistern, höhere Gewalt oder Gefahrenabwehr entstehen.</p>
        <p>Planbare Wartung wird nach Möglichkeit beeinträchtigungsarm durchgeführt. „Priorisierter Support“ garantiert keine bestimmte Reaktions- oder Wiederherstellungszeit.</p>
      </Section>
      <Section title="§ 16 Datenschutz und Auftragsverarbeitung">
        <p>Personenbezogene Daten werden nach Datenschutzrecht und Datenschutzerklärung verarbeitet. Bei Endkunden- und Mitarbeiterdaten verarbeitet GentleBook regelmäßig im Auftrag des Kunden; hierfür ist eine Vereinbarung nach Art. 28 DSGVO abzuschließen.</p>
        <p>Der Kunde bleibt für die Rechtmäßigkeit der Erhebung verantwortlich. Unterauftragsverarbeiter dürfen unter Einhaltung der gesetzlichen Voraussetzungen eingesetzt werden.</p>
      </Section>
      <Section title="§ 17 Daten nach Vertragsende">
        <p>Der Kunde muss weiterhin benötigte Daten vor Vertragsende über die verfügbaren Exportfunktionen sichern. Nach dem wirksamen Vertragsende werden operative Mandanten-, Kunden-, Mitarbeiter-, Buchungs- und Konfigurationsdaten 30 Tage vorgehalten. Währenddessen kann der Kunde Bereitstellung oder Export anfragen.</p>
        <p>Nach 30 Tagen werden operative Daten gelöscht oder irreversibel anonymisiert, soweit keine gesetzlichen Aufbewahrungspflichten, Rechtsansprüche oder behördlichen beziehungsweise gerichtlichen Anordnungen entgegenstehen. Eine frühere Löschung kann verlangt werden, soweit keine gesetzlichen, vertraglichen oder technischen Gründe entgegenstehen.</p>
        <p>Daten in Sicherungskopien können bis zum Ende des regulären Backup-Zyklus fortbestehen, werden nicht erneut produktiv verwendet und regulär überschrieben oder gelöscht. Rechnungen, Buchungsbelege, Zahlungsnachweise und sonstige steuer- oder handelsrechtlich relevante Unterlagen werden getrennt für die gesetzlich vorgeschriebene Dauer aufbewahrt und anschließend gelöscht, sofern keine weitere Rechtsgrundlage besteht.</p>
        <p>Diese Regeln gelten entsprechend nach dem Ende einer kostenlosen Testphase, wenn innerhalb der 30-tägigen Aufbewahrungsfrist kein kostenpflichtiger Tarif abgeschlossen wird.</p>
      </Section>
      <Section title="§ 18 Haftung und Freistellung">
        <p>Der Anbieter haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Schäden an Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz, bei Garantien und soweit ein Ausschluss unzulässig ist.</p>
        <p>Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den typischen, vorhersehbaren Schaden begrenzt; im Übrigen ist leichte Fahrlässigkeit ausgeschlossen. Der Anbieter haftet insbesondere nicht für Kundeninhalte, die Durchführung von Terminen, Endkundenverträge, ausbleibende Umsätze oder ungeprüfte automatisierte Vorschläge.</p>
        <p>Der Kunde stellt den Anbieter von berechtigten Drittansprüchen frei, die auf einer von ihm zu vertretenden rechtswidrigen Nutzung oder seinen Inhalten beruhen.</p>
      </Section>
      <Section title="§ 20 Änderungen von Leistungen und Preisen">
        <p>GentleBook darf technisch weiterentwickelt werden, solange der wesentliche Vertragszweck erhalten bleibt. Preisänderungen für künftige Zeiträume werden rechtzeitig mitgeteilt; bei wesentlichen Erhöhungen kann der Kunde zum Inkrafttreten kündigen.</p>
      </Section>
      <Section title="§ 21 Schlussbestimmungen">
        <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Soweit gesetzlich zulässig, ist Gerichtsstand Wuppertal, insbesondere bei Kaufleuten, juristischen Personen des öffentlichen Rechts und öffentlich-rechtlichen Sondervermögen. Erfüllungsort ist der Sitz des Anbieters.</p>
        <p>Änderungen bedürfen mindestens der Textform. Die Unwirksamkeit einzelner Bestimmungen berührt die übrigen Bestimmungen nicht.</p>
      </Section>
    </>
  );
}

function DatenschutzContent() {
  return (
    <>
      <DraftNotice />
      <p className="text-xs font-medium uppercase tracking-wide text-mist">Stand: {UPDATED_AT}</p>
      <Section title="1. Verantwortlicher"><ContactDetails /><p>Telefon: {CONTACT_PHONE}</p></Section>
      <Section title="2. Allgemeine Hinweise">
        <p>Wir verarbeiten personenbezogene Daten nur, soweit dies für Website, Anfragen, Vertragsschluss, Vertragsdurchführung und Betrieb von GentleBook erforderlich ist oder eine andere Rechtsgrundlage besteht.</p>
      </Section>
      <Section title="3. Websiteaufruf und Hosting">
        <p>Beim Aufruf können IP-Adresse, Zeitpunkt, aufgerufene Ressource, Browser, Betriebssystem, Referrer und Statuscode verarbeitet werden. Zweck sind Bereitstellung, Stabilität, Sicherheit und Missbrauchserkennung; Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
        <p>Website und Frontend werden über Vercel bereitgestellt. Dabei können technische Verbindungs- und Nutzungsdaten auch außerhalb des EWR verarbeitet werden. Übermittlungen erfolgen nur unter den gesetzlichen Voraussetzungen, etwa auf Grundlage des EU-US Data Privacy Framework oder von Standardvertragsklauseln.</p>
      </Section>
      <Section title="4. Kontaktaufnahme">
        <p>Bei Kontakt-, Demo- und Testzugangsanfragen verarbeiten wir insbesondere Name, Unternehmen, E-Mail, Telefonnummer, Anfrageinhalt und Zeitpunkt ausschließlich zur Bearbeitung der Anfrage, zur Terminvereinbarung und zur Vorbereitung eines möglichen Testzugangs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Maßnahmen auf Anfrage der betroffenen Person und Art. 6 Abs. 1 lit. f DSGVO bei sonstigen geschäftlichen Anfragen.</p>
        <p>Die Kenntnisnahme der Datenschutzerklärung wird im jeweiligen Formular gesondert bestätigt. Eine Anfrage wird nicht automatisch als Newsletter- oder Werbeeinwilligung behandelt. Daten werden gelöscht, sobald sie nicht mehr benötigt werden und keine Aufbewahrungspflichten entgegenstehen.</p>
      </Section>
      <Section title="5. Kontaktaufnahme, Testfreischaltung und Benutzerkonto">
        <p>Verarbeitet werden insbesondere Name, geschäftliche E-Mail, Unternehmen, Branche, Anschrift, optionale Telefonnummer, geschütztes Passwort, Rolle sowie der Nachweis der B2B-, AGB-, Datenschutz- und AVV-Bestätigungen mit Dokumentversion, Datum und Uhrzeit und – soweit für den Nachweis erforderlich – IP-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, bei gesetzlichen Pflichten zusätzlich lit. c und für die Nachweis- und Missbrauchssicherheit lit. f.</p>
        <p>Die rechtlichen Bestätigungen starten die Testphase noch nicht. Beginn und Ende entstehen erst mit der anschließenden ausdrücklichen Freigabe durch GentleBook. Die kostenlose Testphase endet nach 14 Tagen und wird nicht automatisch kostenpflichtig.</p>
      </Section>
      <Section title="6. Zahlung über Mollie und Rechnungen">
        <p>Für GentleBook-Abonnements nutzt der Anbieter Mollie B.V. Verarbeitet werden können Unternehmens- und Rechnungsdaten, E-Mail, Betrag, Währung, Zahlungsart und -status, Transaktions-, Mandats- und technische Daten. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b und c DSGVO.</p>
        <p>Mollie verarbeitet bestimmte Zahlungsdaten in eigener Verantwortung. Vertrags-, Zahlungs- und Rechnungsunterlagen werden entsprechend gesetzlicher Aufbewahrungspflichten gespeichert.</p>
      </Section>
      <Section title="7. Hosting der GentleBook-API und Datenbank">
        <p>Für das Hosting der GentleBook-API und der zugehörigen Datenbank nutzen wir Dienste von MonsterASP.NET.</p>
        <p>Die für GentleBook eingesetzte Webanwendung und die zugehörige Datenbank sind dem EU-Rechenzentrum von MonsterASP.NET zugeordnet. Nach den Angaben des Anbieters befindet sich das EU-Rechenzentrum in Deutschland.</p>
        <p>Im Rahmen des Hostings können insbesondere Benutzer- und Unternehmenskontodaten, Kunden- und Mitarbeiterdaten, Buchungs- und Termindaten, Service- und Standortdaten, Konfigurations- und Brandingdaten, Vertrags- und Abonnementinformationen, technische Verbindungsdaten, IP-Adressen sowie Server-, Zugriffs- und Fehlerprotokolle verarbeitet werden.</p>
        <p>Die Verarbeitung erfolgt zur sicheren, zuverlässigen und vertragsgemäßen Bereitstellung der GentleBook-Software.</p>
        <p>Rechtsgrundlage für die Verarbeitung von Vertrags- und Nutzungsdaten ist Art. 6 Abs. 1 lit. b DSGVO. Die Verarbeitung von Sicherheits-, Fehler- und Protokolldaten erfolgt auf Grundlage unseres berechtigten Interesses an einem sicheren und stabilen Betrieb gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
        <p>Sicherungskopien können nach Angaben des Hosting-Anbieters räumlich getrennt in Rechenzentren innerhalb der Europäischen Union, insbesondere in Deutschland und Finnland, gespeichert werden.</p>
        <p>Soweit MonsterASP.NET personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt dies auf Grundlage eines Vertrags zur Auftragsverarbeitung gemäß Art. 28 DSGVO.</p>
      </Section>
      <Section title="8. E-Mail-Versand und E-Mail-Hosting über netcup">
        <p>Für geschäftliche E-Mail-Postfächer und den Versand beziehungsweise Empfang von E-Mails nutzen wir die netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe, Deutschland.</p>
        <p>Verarbeitet werden können Name, E-Mail-Adresse, Unternehmen, Absender und Empfänger, Betreff, Inhalt, Anhänge, Versand- und Empfangszeitpunkt, technische Zustellinformationen, IP-Adressen sowie Buchungs-, Vertrags- oder Supportinformationen.</p>
        <p>Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b DSGVO für vertragsbezogene Kommunikation und Art. 6 Abs. 1 lit. f DSGVO für zuverlässige geschäftliche Kommunikation. Soweit netcup im Auftrag verarbeitet, erfolgt dies auf Grundlage eines Vertrags nach Art. 28 DSGVO.</p>
      </Section>
      <Section title="9. E-Mail-Benachrichtigungen">
        <p>GentleBook versendet insbesondere Einrichtungs-, Freischaltungs-, Sicherheits-, Zahlungs-, Vertrags-, Kündigungs-, Buchungs- und Erinnerungs-E-Mails. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b und f DSGVO. Werbung wird nur mit ausreichender Rechtsgrundlage versandt.</p>
      </Section>
      <Section title="10. Cookies und ähnliche Technologien">
        <p>Technisch notwendige Technologien können für Anmeldung, Sicherheit, Sitzungen und Einwilligungsverwaltung eingesetzt werden. Optionale Analyse-, Marketing- oder Personalisierungstechnologien werden erst nach Einwilligung aktiviert; diese kann über die Cookie-Einstellungen widerrufen werden.</p>
      </Section>
      <Section title="11. Öffentliche Buchungsseiten">
        <p>Bei Buchungen können Name, Kontakt, Leistung, Mitarbeiter, Termin, Hinweise, Stornierungsinformationen und konfigurierte Formularangaben verarbeitet werden. Verantwortlich ist grundsätzlich das jeweilige buchbare Unternehmen; GentleBook verarbeitet diese Daten regelmäßig als Auftragsverarbeiter.</p>
      </Section>
      <Section title="12. Automatisierte Funktionen">
        <p>Service-Empfehlungen, Gestaltungs-, Marken- und Textvorschläge sowie Hinweise werden nicht ohne erforderliche Bestätigung verbindlich umgesetzt. Derzeit ist kein externer KI-Modellanbieter produktiv angebunden und es finden keine ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung statt.</p>
      </Section>
      <Section title="13. Website- und Markenimport">
        <p>Auf Anforderung können öffentlich zugängliche Website-Adresse, Logo-Kandidaten, Farben, Schriften, Metadaten, Überschriften, Kontaktdaten, Öffnungszeiten und Social-Media-Links verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Der Kunde muss seine Berechtigung bestätigen; erkannte Inhalte werden nicht automatisch veröffentlicht.</p>
      </Section>
      <Section title="14. Empfänger, Dienstleister und Drittlandübermittlungen">
        <p>Empfänger können Hosting-, Cloud-, Datenbank-, Speicher-, E-Mail-, Zahlungs-, Monitoring-, Sicherheits- und Supportdienstleister sein. Auftragsverarbeiter werden vertraglich nach Art. 28 DSGVO verpflichtet.</p>
        <p>Drittlandübermittlungen erfolgen nur mit zulässiger Grundlage, insbesondere Angemessenheitsbeschluss, Data Privacy Framework, Standardvertragsklauseln und gegebenenfalls zusätzlichen Schutzmaßnahmen. Die aktuelle Liste steht unter <Link className="text-violet hover:underline" href="/unterauftragsverarbeiter">Unterauftragsverarbeiter</Link>.</p>
      </Section>
      <Section title="15. Speicherdauer und Vertragsende">
        <p>Daten werden nur so lange gespeichert, wie es für den Zweck erforderlich ist. Nach Ende eines Abonnements werden operative Account-, Kunden-, Mitarbeiter-, Buchungs- und Konfigurationsdaten grundsätzlich noch 30 Tage für eine kurzfristige Reaktivierung oder einen Datenexport gespeichert.</p>
        <p>Danach werden sie gelöscht oder irreversibel anonymisiert, soweit keine gesetzlichen Aufbewahrungspflichten, Rechtsansprüche oder behördlichen Anordnungen entgegenstehen. Rechnungen, Buchungsbelege, Zahlungsnachweise und steuerlich relevante Vertragsunterlagen werden getrennt für die gesetzlich vorgeschriebene Dauer aufbewahrt.</p>
        <p>Backups können bis zum Ablauf ihres technischen Sicherungszyklus fortbestehen. Sie werden nur zur Wiederherstellung nach einem Sicherheits- oder Systemvorfall erneut in das Produktivsystem übernommen und anschließend wieder der regulären Löschung unterzogen.</p>
      </Section>
      <Section title="16. Rechte betroffener Personen">
        <List><li>Auskunft und Berichtigung</li><li>Löschung und Einschränkung</li><li>Datenübertragbarkeit</li><li>Widerspruch</li><li>Widerruf einer Einwilligung für die Zukunft</li></List>
        <p>Anfragen bitte an <a className="text-violet hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Direktwerbung kann jederzeit widersprochen werden.</p>
      </Section>
      <Section title="17. Beschwerderecht und Datenschutzkontakt">
        <p>Zuständig ist grundsätzlich die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Postfach 20 04 44, 40102 Düsseldorf, poststelle@ldi.nrw.de.</p>
        <p>Ein Datenschutzbeauftragter ist derzeit nicht bestellt. Datenschutzanfragen richten Sie an {CONTACT_EMAIL}.</p>
      </Section>
      <Section title="18. Sicherheit und Änderungen">
        <p>Wir setzen angemessene technische und organisatorische Maßnahmen ein, insbesondere Verschlüsselung, Berechtigungskonzepte, Mandantentrennung, sichere Passwortspeicherung, Protokollierung, Aktualisierung und Sicherungsverfahren.</p>
        <p>Diese Erklärung kann bei Änderungen von Verfahren, Dienstleistern oder Rechtslage angepasst werden. Es gilt die veröffentlichte Fassung.</p>
      </Section>
    </>
  );
}

function B2BContent() {
  return (
    <>
      <Section title="Kein Verbraucherangebot und kein Verbraucherwiderrufsrecht">
        <p>GentleBook richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen.</p>
        <p>Ein Vertragsschluss mit Verbrauchern im Sinne des § 13 BGB ist ausgeschlossen. Das gesetzliche Widerrufsrecht für Verbraucher bei Fernabsatzverträgen findet auf GentleBook-Abonnements daher keine Anwendung.</p>
        <p>Mit Abschluss eines Abonnements bestätigt der Kunde, dass er den Vertrag ausschließlich im Rahmen seiner gewerblichen oder selbstständigen beruflichen Tätigkeit abschließt.</p>
        <p>Dies betrifft die GentleBook-Softwaretarife und den Testvertrag. Privatpersonen dürfen die öffentlichen Buchungsseiten nutzen, um Termine beim jeweiligen Unternehmen zu buchen; sie schließen dadurch kein GentleBook-Abonnement ab.</p>
      </Section>
    </>
  );
}

function ProcessingContent() {
  return (
    <>
      <DraftNotice />
      <Section title="Auftragsverarbeitung nach Art. 28 DSGVO">
        <p>GentleBook verarbeitet Buchungs-, Kunden- und Mitarbeiterdaten regelmäßig im Auftrag des jeweiligen Unternehmenskunden. Dafür schließen Anbieter und Kunde eine gesonderte Vereinbarung zur Auftragsverarbeitung.</p>
        <p>Die Vereinbarung regelt insbesondere Gegenstand und Dauer, Art und Zweck der Verarbeitung, Datenarten und betroffene Personen, Weisungsbindung, Vertraulichkeit, technische und organisatorische Maßnahmen, Unterauftragsverarbeiter, Unterstützungspflichten sowie Rückgabe und Löschung von Daten.</p>
        <p>Die Vereinbarung wird elektronisch vor der Freischaltung des Testzugangs abgeschlossen, wenn im Test Kunden-, Mitarbeiter- oder Buchungsdaten verarbeitet werden können. Sie gilt damit bereits vor der ersten Auftragsverarbeitung und nicht erst mit einem späteren kostenpflichtigen Abonnement.</p>
      </Section>
    </>
  );
}

function SubprocessorsContent() {
  return (
    <>
      <DraftNotice />
      <p className="text-xs font-medium uppercase tracking-wide text-mist">Stand: {UPDATED_AT}</p>
      <Section title="Vercel Inc.">
        <p><strong>Leistung:</strong> Hosting und Auslieferung der Website beziehungsweise des Next.js-Frontends.</p>
        <p><strong>Daten:</strong> Technische Verbindungs- und Server-Protokolldaten sowie je nach Nutzung übertragene Anwendungsdaten.</p>
        <p><strong>Verarbeitungsort:</strong> Europäische Union und Vereinigte Staaten. Als Übermittlungsgrundlage kommen insbesondere EU-US Data Privacy Framework und Standardvertragsklauseln in Betracht.</p>
      </Section>
      <Section title="MonsterASP.NET s.r.o.">
        <p><strong>Leistung:</strong> Hosting der GentleBook-API, der SQL-Datenbank und der zugehörigen technischen Infrastruktur.</p>
        <p><strong>Verarbeitete Daten:</strong> Benutzer-, Unternehmens-, Kunden-, Mitarbeiter-, Buchungs-, Konfigurations-, Vertrags-, Protokoll- und technische Verbindungsdaten.</p>
        <p><strong>Primärer Verarbeitungsort:</strong> Deutschland. Die GentleBook-Webanwendung und Datenbank sind dem deutschen EU-Rechenzentrum zugeordnet.</p>
        <p><strong>Sicherungskopien:</strong> Räumlich getrennte Speicherung innerhalb der Europäischen Union möglich, nach Anbieterangaben insbesondere in Deutschland und Finnland.</p>
        <p><strong>Rolle:</strong> Auftragsverarbeiter, soweit MonsterASP.NET personenbezogene Daten im Auftrag von GentleBook verarbeitet.</p>
      </Section>
      <Section title="netcup GmbH">
        <p>Emmy-Noether-Straße 10, 76131 Karlsruhe, Deutschland.</p>
        <p><strong>Leistung:</strong> E-Mail-Hosting sowie Versand und Empfang geschäftlicher und transaktionaler E-Mails.</p>
        <p><strong>Daten:</strong> Namen, E-Mail-Adressen, Kommunikationsinhalte, Buchungs-, Support- und Vertragsinformationen.</p>
        <p><strong>Verarbeitungsort:</strong> Deutschland beziehungsweise Europäische Union entsprechend dem gebuchten Dienst und den vertraglichen Angaben.</p>
        <p><strong>Rolle:</strong> Auftragsverarbeiter, soweit netcup Daten im Auftrag von GentleBook verarbeitet.</p>
      </Section>
      <Section title="Mollie B.V.">
        <p><strong>Leistung:</strong> Zahlungsabwicklung für GentleBook-Abonnements.</p>
        <p><strong>Sitz:</strong> Niederlande.</p>
        <p><strong>Daten:</strong> Kunden-, Zahlungs-, Transaktions- und Abrechnungsdaten. Mollie verarbeitet bestimmte Zahlungsdaten in eigener datenschutzrechtlicher Verantwortung.</p>
      </Section>
      <Section title="Externe KI-Anbieter">
        <p>Derzeit ist kein externer KI-Modellanbieter produktiv an GentleBook angebunden. Vor Aktivierung wird diese Liste einschließlich Zweck, Datenarten, Ort und Übermittlungsgrundlage ergänzt.</p>
      </Section>
    </>
  );
}

function PageContent({ page }: { page: LegalPageId }) {
  if (page === "impressum") return <ImpressumContent />;
  if (page === "agb") return <AgbContent />;
  if (page === "datenschutz") return <DatenschutzContent />;
  if (page === "b2b") return <B2BContent />;
  if (page === "auftragsverarbeitung") return <ProcessingContent />;
  return <SubprocessorsContent />;
}

export default function LegalPage({ locale, page }: { locale: Locale; page: LegalPageId }) {
  return (
    <div className="bg-lavender/30 pb-24 pt-36">
      <div className="u-container">
        <Link href={localizedPath(locale, "/")} className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === "de" ? "Zurück zur Startseite" : "Back to home"}
        </Link>
        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-ink">{legalPageTitles[page]}</h1>
        {locale === "en" && <p className="mt-3 text-sm text-mist">The German text is the authoritative version.</p>}
        <div className="mt-10 max-w-3xl rounded-3xl bg-white p-8 sm:p-10"><PageContent page={page} /></div>
      </div>
    </div>
  );
}
