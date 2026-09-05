import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/leadMail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    body.privacyAcknowledged !== true ||
    !body.name.trim() ||
    !body.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  try {
    await sendLeadNotification(`Neue Demo-Anfrage von ${body.name}`, {
      name: body.name,
      email: body.email,
      businessType: body.businessType ?? null,
      teamSize: body.teamSize ?? null,
      currentBooking: body.currentBooking ?? null,
      biggestEffort: body.biggestEffort ?? null,
      weeklyAppointments: body.weeklyAppointments ?? null,
      goal: body.goal ?? null,
      locale: body.locale ?? null,
      privacyAcknowledged: "Ja",
      accountCreated: "Nein",
      trialStarted: "Nein",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[demo-request] Mailversand fehlgeschlagen", error);
  }

  return NextResponse.json({ ok: true });
}
