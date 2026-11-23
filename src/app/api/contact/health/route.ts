import { NextResponse } from "next/server";
import {
  getEmailTransport,
  isResendConfigured,
  isSmtpConfigured,
} from "@/lib/contact-config";

export const dynamic = "force-dynamic";

/**
 * Simple health check for the contact form email delivery.
 *
 * GET /api/contact/health ->
 *   { smtpConfigured: boolean, resendConfigured: boolean,
 *     transport: "resend" | "smtp" | null }
 *
 * Booleans and the transport name only: the response never contains any
 * variable value. When no transport is configured, the contact modal
 * automatically offers the WhatsApp fallback.
 */
export function GET() {
  return NextResponse.json({
    smtpConfigured: isSmtpConfigured(),
    resendConfigured: isResendConfigured(),
    transport: getEmailTransport(),
  });
}
