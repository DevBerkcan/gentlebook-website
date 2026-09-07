import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/leadMail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    body.privacyAcknowledged !== true ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const topic = body.topic === "agency" ? "agency" : "kontakt";

  try {
    await sendLeadNotification(
      topic === "agency" ? `Neue Agency-Anfrage von ${body.name}` : `Neue Kontaktanfrage von ${body.name}`,
      {
        name: body.name,
        email: body.email,
        message: body.message,
        locale: body.locale ?? null,
        topic,
        privacyAcknowledged: "Ja",
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[contact-request] Mailversand fehlgeschlagen", error);
  }

  return NextResponse.json({ ok: true });
}
