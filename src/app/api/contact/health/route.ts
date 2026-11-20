import { NextResponse } from "next/server";
import { isSmtpConfigured } from "@/lib/contact-config";

export const dynamic = "force-dynamic";

/**
 * Simple health check for the contact form email delivery.
 *
 * GET /api/contact/health -> { smtpConfigured: true | false }
 *
 * Names only: the response never contains the SMTP variable values, it
 * only reports whether the email delivery is configured. When this returns
 * false, the contact modal automatically offers the WhatsApp fallback.
 */
export function GET() {
  return NextResponse.json({ smtpConfigured: isSmtpConfigured() });
}
