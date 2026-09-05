import nodemailer from "nodemailer";

/**
 * Versendet Lead-Benachrichtigungen (Kontakt/Demo/Trial) per SMTP ans Sales-Postfach.
 * Ohne SMTP_HOST/SMTP_USER/SMTP_PASS wird nur geloggt, nicht gesendet — damit lokale
 * Entwicklung ohne Mail-Zugangsdaten funktioniert.
 */
export async function sendLeadNotification(subject: string, lines: Record<string, unknown>) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO_EMAIL } = process.env;
  const body = Object.entries(lines)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // eslint-disable-next-line no-console
    console.warn(
      "[leadMail] SMTP_HOST/SMTP_USER/SMTP_PASS nicht gesetzt — Lead wird nur geloggt, nicht gemailt.",
      { subject, body }
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"GentleBook Website" <${SMTP_USER}>`,
    to: LEADS_TO_EMAIL || "info@gentlebook.de",
    replyTo: typeof lines.email === "string" ? lines.email : undefined,
    subject,
    text: body,
  });
}
