/* ------------------------------------------------------------------ */
/* Shared gallery configuration                                        */
/*                                                                     */
/* This is the SINGLE place to manage every photo and video shown in   */
/* the gallery on both the Agadir homepage and the Marrakech page.     */
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
/* ------------------------------------------------------------------ */

/** Google Business Profile: opened in a new tab when any gallery item is clicked. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/MskrWRpaSVK8HGEHs";

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

/* The manually curated gallery. Same media on Agadir and Marrakech. */
export const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-1.jpg",
    alt: "Dozens of hot air balloons flying over the Souss Valley at dawn",
    caption: "Dawn over the Souss Valley",
    width: 1800,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-2.jpg",
    alt: "Colorful hot air balloons rising into a clear sky above Agadir",
    caption: "Balloons in first light",
    width: 1200,
    height: 780,
  },
  {
    type: "image",
    src: "/images/burner-flame.jpg",
    alt: "Balloon burner flame lighting up the envelope before dawn in the Souss Valley",
    caption: "Inflation before dawn",
    width: 768,
    height: 1344,
  },
  {
    type: "video",
    src: "/videos/sunrise-flight-sample.mp4",
    poster: "/videos/sunrise-flight-sample-poster.jpg",
    alt: "Slow zoom over hot air balloons flying at dawn above the Souss Valley",
    caption: "Souss Valley sunrise clip",
    width: 1280,
    height: 720,
  },
  {
    type: "image",
    src: "/images/gallery-4.jpg",
    alt: "Moroccan mint tea being poured into traditional glasses",
    caption: "Moroccan mint tea",
    width: 1024,
    height: 1024,
  },
  {
    type: "image",
    src: "/images/breakfast-caidal.jpg",
    alt: "Traditional Berber breakfast with mint tea served inside a Caïdal tent",
    caption: "Berber breakfast",
    width: 1824,
    height: 1216,
  },
  {
    type: "image",
    src: "/images/gallery-6.jpg",
    alt: "Guest watching hot air balloons fill the sunrise sky above the Souss Valley",
    caption: "Morning full of balloons",
    width: 841,
    height: 1051,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-sunrise.jpg",
    alt: "Red and green hot air balloon flying over the Souss Valley near Agadir in the early morning",
    caption: "Morning flight",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.jpg",
    alt: "Golden checkered hot air balloon floating above argan trees at sunrise",
    caption: "Above the argan trees",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.jpg",
    alt: "Close-up of a golden and red checkered hot air balloon rising into the clear morning sky",
    caption: "Rising at sunrise",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.jpg",
    alt: "Red hot air balloon seen through the wooden pillars of a terrace at sunrise",
    caption: "View from the terrace",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.jpg",
    alt: "Red hot air balloon framed by a window opening in the early morning sky",
    caption: "Through the window",
    width: 1080,
    height: 1350,
  },
];
