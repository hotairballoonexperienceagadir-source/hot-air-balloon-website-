/* ------------------------------------------------------------------ */
/* Experience section slideshows                                       */
/*                                                                     */
/* Both slideshows reuse the existing photos from the shared gallery   */
/* configuration (src/lib/gallery.ts). Nothing here copies, moves or   */
/* modifies the gallery files themselves: each slideshow only picks a  */
/* curated, ordered subset of the gallery entries by their src path.   */
/*                                                                     */
/* The first entry of each list is the image visitors see when the     */
/* page loads. The order below is the rotation order used while the    */
/* Experience section is outside the viewport.                         */
/* ------------------------------------------------------------------ */

import { galleryItems, type GalleryItem } from "./gallery";

export type ExperienceSlide = {
  src: string;
  alt: string;
};

function pickSlides(srcs: string[]): ExperienceSlide[] {
  return srcs
    .map((src) => galleryItems.find((item) => item.type === "image" && item.src === src))
    .filter((item): item is GalleryItem => item !== undefined)
    .map((item) => ({
      src: item.src,
      alt: item.alt ?? "Hot air balloon experience in Morocco",
    }));
}

/* Agadir Experience section: the Souss Valley morning story, in order. */
export const agadirExperienceSlides = pickSlides([
  "/images/gallery-guests-launch-morning.jpg",
  "/images/gallery-kasbah-takeoff.jpg",
  "/images/gallery-basket-aerial-view.jpg",
  "/images/gallery-berber-breakfast.jpg",
  "/images/gallery-red-balloon-flight.jpg",
]);

/* Marrakech Experience section: the Palmeraie desert morning story, in order. */
export const marrakechExperienceSlides = pickSlides([
  "/images/gallery-checkered-balloon-closeup.jpg",
  "/images/gallery-palm-camp-view.jpg",
  "/images/gallery-golden-balloon-argan-trees.jpg",
  "/images/gallery-balloon-window-view.jpg",
  "/images/gallery-balloon-terrace-view.jpg",
]);
