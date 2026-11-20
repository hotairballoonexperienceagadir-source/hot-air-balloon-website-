"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy mount point for THE shared booking modal.
 *
 * The booking form, its validation and the Radix dialog only become relevant
 * once a visitor presses a booking CTA, so the code ships as an on demand
 * async chunk instead of weighing down the first paint of every page. The
 * chunk is warmed during idle time right after hydration, so the very first
 * click still opens the modal instantly, with no spinner and no delay.
 *
 * The modal keeps rendering on the client only exactly like before: it is a
 * popup with no SEO content and no server rendered markup.
 */

const BookingModal = dynamic(
  () => import("./BookingModal").then((module) => module.BookingModal),
  { ssr: false },
);

export function BookingModalLazy() {
  useEffect(() => {
    const warm = () => void import("./BookingModal");
    /* requestIdleCallback where available, otherwise a short timeout. */
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return <BookingModal />;
}
