/* ------------------------------------------------------------------ */
/* Agadir gallery configuration                                        */
/*                                                                     */
/* This is the SINGLE place to manage every photo and video shown in   */
/* the gallery on the AGADIR HOMEPAGE. The Marrakech page has its own  */
/* completely separate gallery collection in                           */
/* src/lib/marrakech-gallery.ts; the two destinations never share      */
/* gallery media.                                                      */
/*                                                                     */
/* How to manage the gallery (no component changes ever needed):       */
/*                                                                     */
/* 1. Add a photo:  drop the file in public/images (or a subfolder)    */
/*    and add one entry { type: "image", src: "/images/your-file.jpg" }*/
/*    Supported image formats: JPG, JPEG, PNG, WebP.                   */
/*                                                                     */
/* 2. Add a video:  drop the file in public/videos and a thumbnail in  */
/*    public/images (or public/videos), then add one entry             */
/*    { type: "video", src: "/videos/your-clip.mp4",                   */
/*      poster: "/images/your-thumbnail.jpg" }.                        */
/*    Supported video formats: MP4, WebM. Videos are never played in   */
/*    the grid, so a poster thumbnail is what visitors see.            */
/*                                                                     */
/* 3. Remove an item: delete its entry from the list below.            */
/*                                                                     */
/* 4. Reorder items: move entries up or down in the list. The grid     */
/*    follows the order of this array from top to bottom.              */
/*                                                                     */
/* 5. Captions and alt text are optional. `caption` is the short label */
/*    shown on hover, `alt` describes the media for screen readers.    */
/*    `width` and `height` are optional (natural pixel size of the     */
/*    image or poster) and fall back to a safe default.                */
/*                                                                     */
/* Every gallery item links to the Google Business Profile below.      */
/* There is no automatic sync and no live feed: only the manually      */
/* curated entries in this file are displayed.                         */
/*                                                                     */
/* Gallery media format: Instagram portrait, 1080 x 1350 px (4:5).     */
/* ------------------------------------------------------------------ */

import { GOOGLE_PROFILE_URL } from "@/lib/site";

/** Google Business Profile: opened in a new tab when any gallery item is clicked.
 * Re-export of the ONE shared constant from src/lib/site.ts, so the gallery
 * can never drift from the links used everywhere else on the site. */
export const GOOGLE_BUSINESS_PROFILE_URL = GOOGLE_PROFILE_URL;

export type GalleryMediaType = "image" | "video";

export type GalleryItem = {
  /** "image" for photos, "video" for video clips. */
  type: GalleryMediaType;
  /** Local public path of the photo or video file. */
  src: string;
  /** Videos only: local path of the thumbnail shown in the grid. Strongly recommended. */
  poster?: string;
  /** Optional accessibility description of the media. */
  alt?: string;
  /** Optional short caption shown on hover. */
  caption?: string;
  /** Optional natural width in pixels of the image or poster. */
  width?: number;
  /** Optional natural height in pixels of the image or poster. */
  height?: number;
};

/* The manually curated AGADIR gallery. Used by the Agadir homepage
 * gallery grid and the Agadir Experience slideshow ONLY. Marrakech has
 * its own separate collection and slideshow in marrakech-gallery.ts.
 *
 * Order note: the lookalike red balloon shots are deliberately spread
 * across the whole list (positions 1, 5, 8, 11, 13, 15) so similar
 * photos never sit next to each other. One leads the gallery and one
 * closes it, with people, food and camp scenes in between. */
export const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-kasbah-takeoff.webp",
    alt: "Red and green hot air balloon rising behind a traditional Moroccan kasbah at dawn",
    caption: "Takeoff by the kasbah",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-berber-breakfast.webp",
    alt: "Guests sharing a traditional Berber breakfast around a low table after their flight",
    caption: "Berber breakfast",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-tagine-ceramics.webp",
    alt: "Hand painted Moroccan tagine pots with blue and white patterns waiting on the breakfast table",
    caption: "Moroccan tagines",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.webp",
    alt: "Golden and red checkered hot air balloon floating above the argan trees at sunrise",
    caption: "Above the argan trees",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-palm-camp-view.webp",
    alt: "Hot air balloon floating behind palm fronds above the Berber camp at sunrise",
    caption: "Behind the palms",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-basket-aerial-view.webp",
    alt: "View from the balloon basket flying over the Souss Valley countryside at dawn",
    caption: "From the basket",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-argan-camp-arrival.jpg",
    alt: "Argan tree shading the Berber camp with a 4x4 parked by the wall in the hazy morning",
    caption: "Arrival at the camp",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.webp",
    alt: "Red and green hot air balloon seen from the shaded terrace between dark wooden beams",
    caption: "View from the terrace",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-campfire-night.jpg",
    alt: "Guests sharing mint tea around lanterns and a crackling campfire under the argan trees at night",
    caption: "Evening around the fire",
    width: 1086,
    height: 1448,
  },
  {
    type: "image",
    src: "/images/gallery-guests-launch-morning.webp",
    alt: "Guests gathered together at the balloon launch site in the early morning",
    caption: "Guests before the flight",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.webp",
    alt: "Red and green hot air balloon with a golden patterned band seen through an open window at dawn",
    caption: "Through the window",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.webp",
    alt: "Closeup of a golden and red checkered hot air balloon rising into the morning sky",
    caption: "Rising at sunrise",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-inflation-dawn-fire.jpg",
    alt: "Crew holding the basket of a giant red hot air balloon at dawn beside a blazing fire pit",
    caption: "Dawn inflation",
    width: 896,
    height: 1600,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-camp-frame.webp",
    alt: "Golden and red checkered hot air balloon framed by the dark silhouette of the camp at dawn",
    caption: "Balloon from the camp",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-flight.webp",
    alt: "Red and green hot air balloon flying over the Souss Valley near Agadir in the early morning",
    caption: "Morning flight",
    width: 1080,
    height: 1350,
  },
];
