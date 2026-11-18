/* ------------------------------------------------------------------ */
/* Experience section slideshows                                       */
/*                                                                     */
/* PERMANENT RULE: each destination's slideshow is derived from that   */
/* destination's own gallery collection. The galleries are completely  */
/* separate and their media is never mixed:                            */
/*                                                                     */
/*   Agadir homepage slideshow  <- galleryItems (src/lib/gallery.ts)   */
/*   Marrakech page slideshow   <- marrakechGalleryItems               */
/*                                (src/lib/marrakech-gallery.ts)       */
/*                                                                     */
/* What this means for every future gallery update:                    */
/*                                                                     */
/* 1. Adding a photo: add its entry to the destination's gallery list  */
/*    and it automatically joins that destination's slideshow, in      */
/*    gallery order. No slideshow change is ever needed.               */
/*                                                                     */
/* 2. Removing a photo: delete its entry from the destination's list   */
/*    and it automatically disappears from that slideshow as well.     */
/*                                                                     */
/* 3. Reordering photos: the slideshow rotation order always follows   */
/*    the gallery order, top to bottom.                                */
/*                                                                     */
/* 4. Video entries stay gallery grid only and never enter the         */
/*    slideshows; only type "image" entries are picked up.             */
/*                                                                     */
/* Both slideshows render their own derived list through independent   */
/* slideshow instances, so each page keeps its own rotation state      */
/* while always using the latest available gallery photos.             */
/* ------------------------------------------------------------------ */

import { galleryItems } from "./gallery";
import { marrakechGalleryItems } from "./marrakech-gallery";

export type ExperienceSlide = {
  src: string;
  alt: string;
};

/* Derived straight from galleryItems: every Agadir gallery photo joins the Agadir slideshow. */
export const galleryExperienceSlides: ExperienceSlide[] = galleryItems
  .filter((item) => item.type === "image")
  .map((item) => ({
    src: item.src,
    alt: item.alt ?? "Hot air balloon experience in Morocco",
  }));

/* Derived straight from marrakechGalleryItems: every Marrakech gallery photo
 * joins the Marrakech slideshow. Completely independent from Agadir. */
export const marrakechExperienceSlides: ExperienceSlide[] = marrakechGalleryItems
  .filter((item) => item.type === "image")
  .map((item) => ({
    src: item.src,
    alt: item.alt ?? "Hot air balloon experience in Marrakech",
  }));
