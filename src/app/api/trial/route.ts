import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/leadMail";

/**
 * Trial-Anfrage entgegennehmen. Legt (weiterhin bewusst) KEINEN Account in der
 * GentleBook-App an — das erfordert echte Tenant-Provisionierung im Backend.
 * Benachrichtigt aktuell nur das Sales-Team per E-Mail, damit der Lead nicht
 * verloren geht.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.company !== "string" ||
    body.privacyAcknowledged !== true ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.company.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  try {
    await sendLeadNotification(`Neue Testzugang-Anfrage von ${body.company}`, {
      name: body.name,
      email: body.email,
      company: body.company,
      industry: body.industry ?? null,
      locale: body.locale ?? null,
      privacyAcknowledged: "Ja",
      requestReceivedAt: new Date().toISOString(),
      accountCreated: "Nein",
      trialStarted: "Nein",
      entitlementToActivation: "Nein",
      nextStep: "Persönliches Gespräch, manuelle Einrichtung, rechtliche Bestätigung und gesonderte GentleBook-Freigabe",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[trial-request] Mailversand fehlgeschlagen", error);
  }

  return NextResponse.json({ ok: true });
}
