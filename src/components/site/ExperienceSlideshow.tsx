"use client";

/* ------------------------------------------------------------------ */
/* ExperienceSlideshow                                                 */
/*                                                                     */
/* A smart slideshow for the Experience section images on the Agadir   */
/* homepage and the Marrakech page. Its slide list comes straight from */
/* the shared gallery configuration (src/lib/gallery.ts), which is the */
/* single source of truth: every gallery photo joins both slideshows   */
/* automatically, and removed photos drop out automatically. It        */
/* rotates through the photos, but ONLY while the section is outside   */
/* the viewport.                                                       */
/*                                                                     */
/* Behavior:                                                           */
/* - While any part of the enclosing Experience section is on screen,  */
/*   the current photo is frozen. The timer is fully stopped, so the   */
/*   image never changes while the visitor is reading the section.     */
/* - When the section leaves the viewport, an interval starts and the  */
/*   photo crossfades to the next one every 12 seconds.                */
/* - When the visitor returns, the latest photo is already in place    */
/*   and the timer stops again, freezing it immediately.               */
/*                                                                     */
/* Visibility is detected with an IntersectionObserver attached to the */
/* enclosing <section> element (found via closest), with the slideshow */
/* container itself as a fallback.                                     */
/*                                                                     */
/* Performance and accessibility:                                      */
/* - Only the current photo, the outgoing photo during a crossfade,    */
/*   and a single preloaded upcoming photo are ever mounted, so all    */
/*   gallery photos are never loaded at once.                          */
/* - While the section is off screen, the upcoming photo is preloaded  */
/*   eagerly so each crossfade starts instantly from the cache.        */
/* - Timers, observers and animation frames are cleaned up on unmount. */
/* - Crossfades are disabled for visitors who prefer reduced motion.   */
/* - No controls, dots, arrows or extra text are rendered.             */
/* ------------------------------------------------------------------ */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ExperienceSlide } from "@/lib/experience-slides";

/* A new photo is picked every 12 seconds while the section is off screen. */
const ROTATE_INTERVAL_MS = 12000;

/* Crossfade duration. The outgoing layer is removed shortly after it ends. */
const FADE_DURATION_MS = 900;
const FADE_FINALIZE_MS = FADE_DURATION_MS + 120;

type ExperienceSlideshowProps = {
  /** Ordered gallery photos derived from the shared gallery configuration. */
  slides: ExperienceSlide[];
  /** next/image sizes matching the Experience section layout. */
  sizes: string;
};

export function ExperienceSlideshow({ slides, sizes }: ExperienceSlideshowProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [overlayReady, setOverlayReady] = useState(false);
  const [inViewport, setInViewport] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Mirrors the current index so the interval callback never goes stale. */
  const currentRef = useRef(0);
  /* Pending animation frame ids, cancelled on unmount. */
  const rafRef = useRef<number[]>([]);

  /* Watch the enclosing Experience section: frozen while it is on screen. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const target = node.closest("section") ?? node;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  /* Rotate only while the section is outside the viewport. */
  useEffect(() => {
    if (inViewport || slides.length < 2) return;

    const timer = window.setInterval(() => {
      const from = currentRef.current;
      const next = (from + 1) % slides.length;
      currentRef.current = next;
      setPrevious(from);
      setCurrent(next);
      setOverlayReady(false);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [inViewport, slides.length]);

  /* Once the incoming photo has fully faded in, drop the outgoing layer. */
  useEffect(() => {
    if (previous === null || !overlayReady) return;
    const timer = window.setTimeout(() => setPrevious(null), FADE_FINALIZE_MS);
    return () => window.clearTimeout(timer);
  }, [previous, overlayReady]);

  /* Respect prefers-reduced-motion: swap photos instantly, no crossfade. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  /* Cancel any pending animation frames on unmount. */
  useEffect(() => {
    const rafs = rafRef;
    return () => {
      rafs.current.forEach((id) => window.cancelAnimationFrame(id));
      rafs.current = [];
    };
  }, []);

  /* Wait two painted frames before fading in, so cached photos still crossfade. */
  const handleOverlayLoad = useCallback(() => {
    const first = window.requestAnimationFrame(() => {
      const second = window.requestAnimationFrame(() => setOverlayReady(true));
      rafRef.current = [second];
    });
    rafRef.current = [...rafRef.current, first];
  }, []);

  if (slides.length === 0) return null;

  const active = slides[current];
  const outgoing = previous !== null ? slides[previous] : null;
  const upcoming = slides.length > 1 ? slides[(current + 1) % slides.length] : null;
  const fading = outgoing !== null;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {outgoing ? (
        <Image
          key={`slide-${previous}`}
          src={outgoing.src}
          alt={outgoing.alt}
          fill
          sizes={sizes}
          className="object-cover opacity-100"
          aria-hidden="true"
        />
      ) : null}

      {!inViewport && !fading && upcoming ? (
        <Image
          key={`preload-${current}`}
          src={upcoming.src}
          alt=""
          fill
          sizes={sizes}
          loading="eager"
          className="pointer-events-none opacity-0"
          aria-hidden="true"
        />
      ) : null}

      <Image
        key={`slide-${current}`}
        src={active.src}
        alt={active.alt}
        fill
        sizes={sizes}
        loading={fading ? "eager" : undefined}
        onLoad={fading ? handleOverlayLoad : undefined}
        className={
          fading
            ? `object-cover transition-opacity ease-in-out ${
                reducedMotion ? "" : "duration-[900ms]"
              } ${overlayReady ? "opacity-100" : "opacity-0"}`
            : "object-cover"
        }
      />
    </div>
  );
}
