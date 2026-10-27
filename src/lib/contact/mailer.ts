import "server-only";
import nodemailer from "nodemailer";
import type { ContactInput } from "./schema";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Defence in depth: strip anything that could break out of a mail header.
const headerSafe = (s: string, max = 80) =>
  s.replace(/[\r\n\u2028\u2029\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function buildContactMessage(data: ContactInput, receivedAt: Date, from: string, to: string) {
  const name = headerSafe(data.name, 120);
  const org = data.organisation ? headerSafe(data.organisation, 160) : "";
  const when = receivedAt.toLocaleString("de-AT", { timeZone: "Europe/Vienna" });

  const text = [
    "Neue Anfrage über das Kontaktformular auf nese.consulting",
    "",
    `Name:         ${name}`,
    `Organisation: ${org || "—"}`,
    `E-Mail:       ${data.email}`,
    `Eingang:      ${when}`,
    "",
    "Nachricht:",
    data.enquiry,
    "",
    "—",
    "Auf diese E-Mail antworten, um direkt an den Absender zu schreiben.",
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.5">
<p style="margin:0 0 16px"><strong>Neue Anfrage über das Kontaktformular auf nese.consulting</strong></p>
<table cellpadding="4" style="border-collapse:collapse;margin-bottom:16px">
<tr><td style="color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
<tr><td style="color:#666">Organisation</td><td>${escapeHtml(org || "—")}</td></tr>
<tr><td style="color:#666">E-Mail</td><td>${escapeHtml(data.email)}</td></tr>
<tr><td style="color:#666">Eingang</td><td>${escapeHtml(when)}</td></tr>
</table>
<p style="margin:0 0 6px;color:#666">Nachricht</p>
<div style="white-space:pre-wrap;border-left:3px solid #ccc;padding-left:12px">${escapeHtml(data.enquiry)}</div>
<p style="margin-top:24px;color:#888;font-size:12px">Auf diese E-Mail antworten, um direkt an den Absender zu schreiben.</p>
</body></html>`;

  return {
    from: { name: "NESE Website", address: from },
    to,
    replyTo: { name, address: data.email },
    subject: `Neue Anfrage: ${headerSafe(name, 60)}${org ? ` (${headerSafe(org, 40)})` : ""}`,
    text,
    html,
    headers: { "X-Auto-Response-Suppress": "All", "Auto-Submitted": "auto-generated" },
  };
}

export async function sendContactNotification(data: ContactInput, receivedAt: Date): Promise<void> {
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const port = Number(process.env.SMTP_PORT || 465);
  const to = process.env.CONTACT_TO || user;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ionos.de",
    port,
    secure: port === 465, // implicit TLS on 465, STARTTLS otherwise
    requireTLS: true,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporter.sendMail(buildContactMessage(data, receivedAt, user, to));
}
