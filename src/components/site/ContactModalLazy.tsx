"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy mount point for THE contact form modal.
 *
 * The contact form fields, validation and the Radix dialog only become
 * relevant once a visitor presses a contact option in the footer, so the
 * code ships as an on demand async chunk instead of weighing down the first
 * paint of every page. The chunk is warmed during idle time right after
 * hydration, so the very first click still opens the form instantly.
 *
 * The modal keeps rendering on the client only exactly like before: it is a
 * popup with no SEO content and no server rendered markup.
 */

const ContactModal = dynamic(
  () => import("./ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

export function ContactModalLazy() {
  useEffect(() => {
    const warm = () => void import("./ContactModal");
    /* requestIdleCallback where available, otherwise a short timeout. */
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return <ContactModal />;
}
