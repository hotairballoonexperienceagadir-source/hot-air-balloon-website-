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
