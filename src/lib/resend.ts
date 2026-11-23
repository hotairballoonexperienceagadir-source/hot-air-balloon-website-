/**
 * Contact form delivery through the Resend HTTPS API (server side only).
 *
 * Used when RESEND_API_KEY is configured (Cloudflare Workers, where outbound
 * SMTP to smtp.gmail.com cannot connect). Plain fetch, no extra dependency.
 * Until a domain is verified in Resend, the sender must stay
 * onboarding@resend.dev and the recipient the Resend account owner address.
 *
 * Never logs the API key or the request body: on failure only the HTTP
 * status and Resend's error name/message are returned to the caller.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Hot Air Balloon Website <onboarding@resend.dev>";

export interface ContactEmail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

/** Request body as documented by Resend's POST /emails endpoint. */
export function buildResendPayload(email: ContactEmail, from?: string) {
  return {
    from: from?.trim() || DEFAULT_FROM,
    to: [email.to],
    reply_to: email.replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  };
}

export type ResendResult =
  | { ok: true }
  | { ok: false; status: number; name?: string; message?: string };

export async function sendWithResend(
  apiKey: string,
  email: ContactEmail,
  from?: string,
): Promise<ResendResult> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildResendPayload(email, from)),
    signal: AbortSignal.timeout(15_000),
  });

  if (response.ok) return { ok: true };

  let name: string | undefined;
  let message: string | undefined;
  try {
    const error = (await response.json()) as { name?: unknown; message?: unknown };
    if (typeof error.name === "string") name = error.name;
    if (typeof error.message === "string") message = error.message;
  } catch {
    /* Non JSON error body: the status code alone is reported. */
  }
  return { ok: false, status: response.status, name, message };
}
