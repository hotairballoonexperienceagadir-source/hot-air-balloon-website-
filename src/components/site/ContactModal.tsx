"use client";

import { useState, type ComponentPropsWithoutRef, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContactStore } from "@/lib/contact-store";
import { site } from "@/lib/site";

/**
 * THE contact form of the website, shown in a modal with the same navy and
 * gold branding as the booking popup.
 *
 * It is opened by every email contact option on the site (the footer email
 * button) through the contact store. All fields are required and validated
 * on the client, validated again on the server by /api/contact, and the
 * message is delivered over SMTP by that server side route. The form shows
 * a loading state while sending, a clear success message after delivery and
 * an honest error message if sending fails. Duplicate submissions are
 * prevented on the client (guard + disabled controls while sending) and on
 * the server (per IP rate limit).
 */

type FieldId = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_VALUES: Record<FieldId, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function FieldLabel({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {children}
    </span>
  );
}

const inputClassName = (invalid: boolean) =>
  `w-full rounded-xl border bg-white/10 px-4 text-white outline-none transition placeholder:text-cream-100/40 focus:border-brand-400 ${
    invalid ? "border-red-400/70" : "border-white/15"
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="mt-1.5 block text-xs font-semibold text-red-300">
      {message}
    </span>
  );
}

export function ContactModal() {
  const isOpen = useContactStore((state) => state.isOpen);
  const closeContact = useContactStore((state) => state.closeContact);

  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [serverError, setServerError] = useState("");

  const sending = status === "sending";

  function setValue(field: FieldId, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }

  function validate(): boolean {
    const next: Partial<Record<FieldId, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    const email = values.email.trim();
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Please enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Please enter a subject.";
    if (!values.message.trim()) next.message = "Please enter your message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /* Duplicate submission guard: a second click while a send is in flight
       does nothing. The button is also disabled while sending. */
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setStatus("success");
        return;
      }

      if (data?.fieldErrors) {
        setErrors((current) => ({ ...current, ...data.fieldErrors }));
      }
      setServerError(
        data?.error ??
          "Your message could not be sent right now. Please try again in a moment, or reach us directly on WhatsApp or by phone.",
      );
      setStatus("error");
    } catch {
      setServerError(
        "Network error: your message could not be sent. Please check your connection and try again, or reach us on WhatsApp or by phone.",
      );
      setStatus("error");
    }
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setServerError("");
    setStatus("idle");
  }

  function handleOpenChange(next: boolean) {
    /* A send in flight is never interrupted: Escape, the close button and
       clicks outside the modal are ignored until it finishes. */
    if (!next && sending) return;
    if (!next) closeContact();
  }

  const describedBy = (field: FieldId) => (errors[field] ? `${field}-error` : undefined);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 rounded-2xl border border-white/15 bg-navy-900 p-6 text-cream-100 shadow-2xl shadow-navy-950/70 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-white">Contact Us</DialogTitle>
          <DialogDescription className="mt-1.5 text-sm leading-relaxed text-cream-100/75">
            Send us a message and our team replies directly to your email inbox. We answer 24 hours a day.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="mt-5">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-bold text-white">
                Message sent successfully!
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/80">
                Thank you {values.name.trim()}, your message is on its way to our team. We will reply to{" "}
                <span className="font-semibold text-white">{values.email.trim()}</span> as soon as possible.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="h-11 flex-1 rounded-xl border-white/25 bg-white/5 text-sm font-bold text-white hover:bg-white/15 hover:text-white"
              >
                Send Another Message
              </Button>
              <Button
                type="button"
                onClick={closeContact}
                className="h-11 flex-1 rounded-xl bg-brand-500 text-sm font-bold text-white shadow-lg shadow-brand-900/40 hover:bg-brand-600"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block">
                  <FieldLabel icon={User}>Full Name</FieldLabel>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={(event) => setValue("name", event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name")}
                  className={`${inputClassName(Boolean(errors.name))} h-12`}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>

              <div>
                <label htmlFor="contact-email" className="block">
                  <FieldLabel icon={Mail}>Email Address</FieldLabel>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(event) => setValue("email", event.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email")}
                  className={`${inputClassName(Boolean(errors.email))} h-12`}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="block">
                  <FieldLabel icon={Tag}>Subject</FieldLabel>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Sunrise flight for two in March"
                  value={values.subject}
                  onChange={(event) => setValue("subject", event.target.value)}
                  aria-invalid={errors.subject ? true : undefined}
                  aria-describedby={describedBy("subject")}
                  className={`${inputClassName(Boolean(errors.subject))} h-12`}
                />
                <FieldError id="contact-subject-error" message={errors.subject} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="block">
                  <FieldLabel icon={MessageSquare}>Message</FieldLabel>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your plans, questions or special requests..."
                  value={values.message}
                  onChange={(event) => setValue("message", event.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy("message")}
                  className={`${inputClassName(Boolean(errors.message))} min-h-28 py-3`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>
            </div>

            {status === "error" && serverError && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-relaxed text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{serverError}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={sending}
              aria-busy={sending || undefined}
              className="mt-5 h-12 w-full rounded-xl bg-brand-500 px-6 text-sm font-bold text-white shadow-lg shadow-brand-900/40 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-cream-100/60">
              Delivered securely to {site.contactEmail}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ContactButton opens THE contact modal. It keeps the exact visual design of
   the previous mailto link while never opening an external mail application. */
type ContactButtonProps = ComponentPropsWithoutRef<"button">;

export function ContactButton({ onClick, children, ...buttonProps }: ContactButtonProps) {
  const openContact = useContactStore((state) => state.openContact);
  return (
    <button
      type="button"
      {...buttonProps}
      onClick={(event) => {
        onClick?.(event);
        openContact();
      }}
    >
      {children}
    </button>
  );
}
