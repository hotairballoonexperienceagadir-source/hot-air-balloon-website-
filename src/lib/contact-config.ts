/**
 * Shared server side check for the contact form email delivery.
 *
 * Returns ONLY a boolean so both /api/contact and /api/contact/health can
 * answer "is SMTP email delivery available" without ever exposing the
 * SMTP variable values. The values themselves live only in .env (git
 * ignored) and are read exclusively on the server.
 *
 * The Z.ai sandbox can reset .env from time to time. When this returns
 * false, /api/contact responds 503 and the ContactModal offers the
 * customer a WhatsApp fallback so the message is never lost (owner
 * decision 2026-11-20).
 */
export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

/** Resend HTTPS email API (used on Cloudflare Workers, where outbound SMTP
 * connections to smtp.gmail.com fail). Boolean only, never the key. */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export type EmailTransport = "resend" | "smtp";

/** Resend wins when its key exists; otherwise the original SMTP path, so a
 * deployment without RESEND_API_KEY (Vercel today) behaves exactly as before. */
export function getEmailTransport(): EmailTransport | null {
  if (isResendConfigured()) return "resend";
  if (isSmtpConfigured()) return "smtp";
  return null;
}
