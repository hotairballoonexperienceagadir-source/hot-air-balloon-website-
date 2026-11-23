import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createTransport } from "nodemailer";
import { site } from "@/lib/site";
import { isSmtpConfigured } from "@/lib/contact-config";

/**
 * Contact form email delivery, server side only.
 *
 * Modes (mutually exclusive, always honest):
 * - LIVE MODE: when SMTP_USER and SMTP_PASSWORD are configured in .env (the
 *   Gmail App Password setup), the message is genuinely delivered over
 *   SMTP (default smtp.gmail.com:465) to CONTACT_RECIPIENT_EMAIL, falling
 *   back to the business inbox from the site config.
 * - NOT CONFIGURED MODE (after a sandbox reset wiped .env, or a broken
 *   deployment): the route returns 503, logs a server warning WITHOUT any
 *   secret values, and the ContactModal on the client offers the customer
 *   a WhatsApp fallback with the same message, so a customer message is
 *   never lost. A message is NEVER reported as sent when it was not
 *   delivered.
 * - FAIL MODE: when the SMTP delivery itself throws, the route returns
 *   500 and logs the failure; the client offers the same WhatsApp fallback.
 *
 * Security rules enforced here:
 *   - SMTP credentials live only in environment variables, never in the
 *     frontend bundle and never in a response.
 *   - All input is validated server side with zod (required fields, email
 *     format, length caps), independent of the client side validation.
 *   - A per IP in memory rate limit (5 messages per 15 minutes) blocks
 *     spam and duplicate bursts.
 *   - The visitor email is only ever used as the Reply-To address so the
 *     business replies to the real sender; it is never trusted as sender
 *     of the SMTP envelope.
 */

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(100, "Your name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Your email address is too long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a subject.")
    .max(150, "Your subject is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .max(2000, "Your message is too long (maximum 2000 characters)."),
});

/* Simple per IP sliding window rate limit. In memory is enough for this
   single instance site; pruning keeps the map tiny. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const sendTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (sendTimestampsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    sendTimestampsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  sendTimestampsByIp.set(ip, recent);
  return false;
}

/* Cloudflare Workers sets cf-connecting-ip to the real visitor IP; Vercel and
   other proxies use x-forwarded-for, kept as the fallback. */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/* Escape user content before embedding it into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many messages sent recently. Please try again later, or contact us directly on WhatsApp or by phone.",
      },
      { status: 429 },
    );
  }

  if (!isSmtpConfigured()) {
    /* Server warning without any secret values: the customer is not shown
       this technical wording, the client modal offers the WhatsApp
       fallback instead and the typed message is never lost. */
    console.warn(
      "[contact] SMTP not configured — customer was offered WhatsApp fallback",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured yet. Please contact us directly on WhatsApp or by phone, we answer 24 hours a day.",
      },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  const recipient =
    process.env.CONTACT_RECIPIENT_EMAIL?.trim() || site.contactEmail;
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  const transport = createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASSWORD as string,
    },
  });

  const textBody = [
    `New message from the ${site.brand} website contact form.`,
    "",
    `Full Name: ${name}`,
    `Email Address: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    `Reply to this email to answer ${name} directly.`,
  ].join("\n");

  const htmlBody = [
    `<p style="margin:0 0 16px;color:#666;font-size:13px">New message from the ${escapeHtml(site.brand)} website contact form.</p>`,
    `<p style="margin:0 0 4px"><strong>Full Name:</strong> ${escapeHtml(name)}</p>`,
    `<p style="margin:0 0 4px"><strong>Email Address:</strong> ${escapeHtml(email)}</p>`,
    `<p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
    `<p style="margin:0 0 4px"><strong>Message:</strong></p>`,
    `<p style="margin:0 0 16px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
    `<p style="margin:0;color:#666;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p>`,
  ].join("\n");

  try {
    await transport.sendMail({
      from: `"${site.brand} Website" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipient,
      subject: `Website contact: ${subject}`,
      text: textBody,
      html: htmlBody,
    });
  } catch (error) {
    console.error("[api/contact] Email delivery failed:", error);
    console.warn(
      "[contact] SMTP send failed — customer was offered WhatsApp fallback",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Your message could not be sent right now. Please try again in a moment, or reach us directly on WhatsApp or by phone.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
