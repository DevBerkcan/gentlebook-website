import { NextResponse } from "next/server";

/**
 * Kontaktanfrage entgegennehmen.
 *
 * TODO vor Launch: Anfrage per E-Mail ans Support-/Sales-Postfach weiterleiten
 * oder in ein Ticket-/CRM-System übernehmen. Aktuell wird nur serverseitig
 * validiert und geloggt.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.info("[contact-request]", {
    name: body.name,
    email: body.email,
    message: body.message,
    locale: body.locale ?? null,
  });

  return NextResponse.json({ ok: true });
}
