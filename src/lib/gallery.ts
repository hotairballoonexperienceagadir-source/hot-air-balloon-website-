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

/** Google Business Profile: opened in a new tab when any gallery item is clicked.
 * ONE single Google Business Profile serves both destinations (owner confirmed),
 * so this is the exact same official profile link used everywhere on the site. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/V4QKDqSaXmN6ySAhl";

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
 * its own separate collection and slideshow in marrakech-gallery.ts. */
export const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-kasbah-takeoff.jpg",
    alt: "Red and green hot air balloon rising behind a traditional Moroccan kasbah at dawn",
    caption: "Takeoff by the kasbah",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-palm-camp-view.jpg",
    alt: "Hot air balloon floating behind palm fronds above the Berber camp at sunrise",
    caption: "Behind the palms",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-berber-breakfast.jpg",
    alt: "Guests sharing a traditional Berber breakfast around a low table after their flight",
    caption: "Berber breakfast",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-guests-launch-morning.jpg",
    alt: "Guests gathered together at the balloon launch site in the early morning",
    caption: "Guests before the flight",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-basket-aerial-view.jpg",
    alt: "View from the balloon basket flying over the Souss Valley countryside at dawn",
    caption: "From the basket",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.jpg",
    alt: "Red and green hot air balloon with a golden patterned band seen through an open window at dawn",
    caption: "Through the window",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-flight.jpg",
    alt: "Red and green hot air balloon flying over the Souss Valley near Agadir in the early morning",
    caption: "Morning flight",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.jpg",
    alt: "Golden and red checkered hot air balloon floating above the argan trees at sunrise",
    caption: "Above the argan trees",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.jpg",
    alt: "Closeup of a golden and red checkered hot air balloon rising into the morning sky",
    caption: "Rising at sunrise",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.jpg",
    alt: "Red and green hot air balloon seen from the shaded terrace between dark wooden beams",
    caption: "View from the terrace",
    width: 1080,
    height: 1350,
  },
];
