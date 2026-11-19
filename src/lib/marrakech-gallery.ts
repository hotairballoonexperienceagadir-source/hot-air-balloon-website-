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

/* The Marrakech gallery: exactly the 15 owner provided photos. */
export const marrakechGalleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/marrakech-sunrise-village.webp",
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
    src: "/images/marrakech-yellow-balloon-sunset.webp",
    alt: "Yellow hot air balloon rising into a golden sunset sky surrounded by other balloons above the desert",
    caption: "Golden hour flight",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-morocco-balloon-atlas.webp",
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
  {
    type: "image",
    src: "/images/marrakech-red-balloon-hazy-sunset.jpg",
    alt: "Red hot air balloon flying high above a hazy desert plain at sunset with distant mountains and smaller balloons around",
    caption: "Red balloon at sunset",
    width: 547,
    height: 365,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-green-plains.jpg",
    alt: "Many colorful hot air balloons drifting over green fields and a traditional village with mountains on the horizon under a clear blue sky",
    caption: "Balloons over the plains",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-green-fields.webp",
    alt: "Yellow hot air balloon glowing at golden sunrise with many colorful balloons around and green fields stretching below",
    caption: "Golden hour balloons",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-launch-site-dawn.jpg",
    alt: "Hot air balloons standing on the desert launch ground at dawn with a large red balloon with the green Moroccan star in front and pink skies above",
    caption: "Dawn at the launch site",
    width: 452,
    height: 678,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-palms.jpg",
    alt: "Green and red striped hot air balloon landing among palm trees with the snow covered Atlas mountains rising behind under a blue sky",
    caption: "Green balloon and the Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-passengers-burner.jpg",
    alt: "Happy passengers standing in a large wicker balloon basket while the burner fires into the orange envelope above against a clear sky",
    caption: "Passengers and the burner",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-morning-fields.jpg",
    alt: "Dozens of colorful hot air balloons scattered across a blue morning sky above green and gold fields with hills on the horizon",
    caption: "Morning fleet",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-checkered-balloon-descent.jpg",
    alt: "Checkered hot air balloon descending toward the desert with a white and orange balloon behind and the chase vehicle waiting below",
    caption: "Gentle landing",
    width: 494,
    height: 619,
  },
  {
    type: "image",
    src: "/images/marrakech-star-balloon-inflight.jpg",
    alt: "Red hot air balloon with the green Moroccan star floating over the desert village at sunrise seen from a nearby balloon",
    caption: "Moroccan star in flight",
    width: 486,
    height: 411,
  },
];
