/* ------------------------------------------------------------------ */
/* Marrakech gallery configuration                                     */
/*                                                                     */
/* This is the SINGLE place to manage every photo shown in the gallery */
/* on the Marrakech page (/marrakech-flights). It is a COMPLETELY      */
/* SEPARATE collection from the Agadir gallery in src/lib/gallery.ts.  */
/* The two destinations never share gallery media.                     */
/*                                                                     */
/* The Marrakech Experience slideshow is derived from this exact list   */
/* (see src/lib/experience-slides.ts), so every future change here      */
/* automatically updates both the Marrakech gallery grid and its        */
/* slideshow.                                                           */
/*                                                                     */
/* 1. Add a photo:  drop the file in public/images, add one entry       */
/*    { type: "image", src: "/images/your-file.jpg" }.                  */
/* 2. Remove a photo: delete its entry from the list below.             */
/* 3. Reorder items: move entries up or down in the list.               */
/* 4. Captions and alt text are optional but strongly recommended.      */
/*                                                                     */
/* Every item still links to the single shared Google Business Profile  */
/* (GOOGLE_BUSINESS_PROFILE_URL from src/lib/gallery.ts).               */
/* ------------------------------------------------------------------ */

import type { GalleryItem } from "./gallery";

/* The Marrakech gallery: exactly the 6 owner provided photos. */
export const marrakechGalleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/marrakech-sunrise-village.jpg",
    alt: "Colorful hot air balloons floating at sunrise above a traditional clay village in the Marrakech desert with mountains on the horizon",
    caption: "Sunrise over the village",
    width: 1928,
    height: 2560,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-breakfast.jpg",
    alt: "Breakfast served inside a hot air balloon basket at sunrise with many balloons flying outside",
    caption: "Breakfast in the sky",
    width: 500,
    height: 400,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-sunset.jpg",
    alt: "Yellow hot air balloon rising into a golden sunset sky surrounded by other balloons above the desert",
    caption: "Golden hour flight",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-morocco-balloon-atlas.jpg",
    alt: "Red, white and green Morocco hot air balloon floating toward the sunrise with the Atlas mountains behind",
    caption: "Morocco balloon at sunrise",
    width: 554,
    height: 554,
  },
  {
    type: "image",
    src: "/images/marrakech-red-star-balloon.jpg",
    alt: "Large red hot air balloon decorated with the green Moroccan star floating above the plain at golden sunrise",
    caption: "Moroccan star balloon",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-atlas.jpg",
    alt: "Green and red striped hot air balloon floating above a rocky desert hill with the snowy High Atlas mountains on the horizon under a clear blue sky",
    caption: "Green balloon over the Atlas",
    width: 678,
    height: 452,
  },
];
