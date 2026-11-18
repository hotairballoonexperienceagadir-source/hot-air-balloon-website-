/* ------------------------------------------------------------------ */
/* Experience section slideshows                                       */
/*                                                                     */
/* PERMANENT RULE: the shared gallery configuration                    */
/* (src/lib/gallery.ts) is the single source of truth for BOTH         */
/* Experience slideshows on the Agadir homepage and the Marrakech      */
/* page. There are no separate, manually maintained image lists.       */
/*                                                                     */
/* What this means for every future gallery update:                    */
/*                                                                     */
/* 1. Adding a photo: add its entry to galleryItems in gallery.ts      */
/*    and it automatically becomes part of BOTH slideshows, in gallery */
/*    order. No slideshow change is ever needed.                       */
/*                                                                     */
/* 2. Removing a photo: delete its entry from galleryItems and it      */
/*    automatically disappears from both slideshows as well.           */
/*                                                                     */
/* 3. Reordering photos: the slideshow rotation order always follows   */
/*    the gallery order, top to bottom.                                */
/*                                                                     */
/* 4. Video entries stay gallery grid only and never enter the         */
/*    slideshows; only type "image" entries are picked up.             */
/*                                                                     */
/* Both slideshows render this same derived list through independent   */
/* slideshow instances, so each page keeps its own rotation state      */
/* while always using the latest available gallery photos.             */
/* ------------------------------------------------------------------ */

import { galleryItems } from "./gallery";

export type ExperienceSlide = {
  src: string;
  alt: string;
};

/* Derived straight from galleryItems: every gallery photo joins both slideshows. */
export const galleryExperienceSlides: ExperienceSlide[] = galleryItems
  .filter((item) => item.type === "image")
  .map((item) => ({
    src: item.src,
    alt: item.alt ?? "Hot air balloon experience in Morocco",
  }));
