import { NextResponse } from "next/server";

/**
 * Trial-Anfrage entgegennehmen.
 *
 * TODO vor Launch: Anfrage an das echte Backend/CRM übergeben (z. B. Weiterleitung
 * an die GentleBook-App, E-Mail-Benachrichtigung ans Team oder Speicherung in einer
 * Datenbank). Aktuell wird nur serverseitig validiert und geloggt — es wird KEIN
 * Account angelegt und KEINE E-Mail verschickt.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.company !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.company.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.info("[trial-request]", {
    name: body.name,
    email: body.email,
    company: body.company,
    industry: body.industry ?? null,
    locale: body.locale ?? null,
  });

  return NextResponse.json({ ok: true });
}
