import { NextResponse } from "next/server";

/**
 * Demo-/Beratungsanfrage (Lead-Qualifizierung) entgegennehmen.
 *
 * TODO vor Launch: Anfrage an das echte CRM/Kalender-Tool übergeben (z. B.
 * Terminbuchung, E-Mail-Benachrichtigung ans Sales-Team). Aktuell wird nur
 * serverseitig validiert und geloggt.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.info("[demo-request]", {
    name: body.name,
    email: body.email,
    businessType: body.businessType ?? null,
    teamSize: body.teamSize ?? null,
    currentBooking: body.currentBooking ?? null,
    biggestEffort: body.biggestEffort ?? null,
    weeklyAppointments: body.weeklyAppointments ?? null,
    goal: body.goal ?? null,
    locale: body.locale ?? null,
  });

  return NextResponse.json({ ok: true });
}
