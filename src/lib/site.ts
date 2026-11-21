/**
 * Single source of truth for site content.
 *
 * POSITIONING: Agadir and the Souss Valley are the home base and the MAIN
 * destination of the company. The homepage is entirely Agadir focused.
 * Marrakech is a secondary destination with its own dedicated page at
 * /marrakech-flights and its own offers, prices and photos.
 *
 * WhatsApp number, Google rating and Google profile link are the real ones
 * from the Hot Air Balloon Experience Agadir business profile.
 * Edit prices and texts here, the pages read everything from this file.
 * Reviews are delivered live by /api/google-reviews, never from this file.
 */

/* ------------------------------------------------------------------ */
/* Official Google Business Profile links. ONE shared source of truth  */
/* for the whole website: the reviews section, header, footer, gallery */
/* and structured data all read these two constants. Never duplicate   */
/* these URL strings anywhere else.                                    */
/*                                                                     */
/* GOOGLE_PROFILE_URL = official "View our Google Business Profile"    */
/*   link (Google share link of the single shared profile).            */
/* GOOGLE_REVIEW_URL = official Google review submission link. Opens   */
/*   Google's own review-writing interface in a new tab, where the     */
/*   customer selects a star rating and publishes directly on Google.  */
/*   There is no on-site review form and reviews are never submitted   */
/*   programmatically on behalf of customers.                          */
/*                                                                     */
/* ONE SINGLE Google Business Profile serves BOTH destinations: the    */
/* owner confirmed that Agadir and Marrakech do NOT have separate      */
/* profiles, so both pages use these exact same official links.        */
/* ------------------------------------------------------------------ */
export const GOOGLE_PROFILE_URL = "https://share.google/XwquPB554mW6IBGgo";
export const GOOGLE_REVIEW_URL = "https://g.page/r/CTpAykunXGoYEAE/review";

export const site = {
  brand: "Hot Air Balloon Experience Agadir",
  brandShort: "HAB Experience",
  phoneDisplay: "+212 609 488 493",
  phoneTel: "+212609488493",
  whatsappNumber: "212609488493",
  /* Business contact email. The footer email button opens the contact form
   * modal and /api/contact delivers the message to this inbox. */
  contactEmail: "hotairballoonexperienceagadir@gmail.com",
  googleRating: 5.0,
  /* Official Google Business Profile link, always the shared constant. ONE
   * single profile serves BOTH the Agadir and Marrakech pages (owner
   * confirmed), so every Google Business Profile reference on the website
   * points to this same URL. */
  googleReviewsUrl: GOOGLE_PROFILE_URL,
  address: "Agadir 80000, Morocco",
  plusCode: "CC4W+7Q Agadir, Morocco",
  hours: "Open 24 hours",
  homePath: "/",
  marrakechPath: "/marrakech-flights",
} as const;

/**
 * Official Agadir social media accounts.
 *
 * IMPORTANT: these profiles belong EXCLUSIVELY to the Agadir brand. They are
 * rendered only on the Agadir homepage (footer and closing CTA) and must
 * NEVER be displayed on the Marrakech page. Update the URLs here only.
 */
export const instagramProfileUrl = "https://www.instagram.com/hotairballoon_experience/";

export const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/hotairballoonexperienceagadir" },
  { name: "TikTok", url: "https://www.tiktok.com/@hotairballoonagadir" },
  { name: "Instagram", url: instagramProfileUrl },
] as const;


export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hello! I would like to book my hot air balloon flight in Agadir. Please send me availability and prices.";

export const marrakechWaMessage =
  "Hello! I would like to book a hot air balloon flight in Marrakech. Please send me availability and prices.";

export const heroWaMessage =
  "Hello! I would like to book my Agadir hot air balloon flight. My preferred date and details are:";

export const offerWaMessage = (offerName: string, city: string, priceMad: number) =>
  `Hello! I would like to book the ${offerName} in ${city} (${priceMad.toLocaleString("en-US")} MAD per person). Please send me availability and pickup details.`;

/* ------------------------------------------------------------------ */
/* Destination model. Agadir is the main destination, Marrakech is     */
/* secondary and lives on its own page.                                */
/* ------------------------------------------------------------------ */

export type CityId = "agadir" | "marrakech";

export interface OfferFeature {
  icon:
    | "clock"
    | "users"
    | "bus"
    | "coffee"
    | "award"
    | "camera"
    | "mountain"
    | "heart"
    | "flame"
    | "sun"
    | "tent"
    | "sparkles"
    | "palm";
  label: string;
}

export interface Offer {
  id: string;
  city: CityId;
  cityName: string;
  name: string;
  description: string;
  /* SEO-only copy for JSON-LD structured data. Owner decision 2026-11-20:
   * the VISIBLE Marrakech copy no longer mentions the Palmeraie, but the
   * JSON-LD Product descriptions must stay EXACTLY as they were before that
   * decision. When seoDescription is set, the JSON-LD renders it and the
   * page renders description. NEVER edit a seoDescription: it freezes the
   * pre-decision SEO copy word for word. */
  seoDescription?: string;
  priceMad: number;
  minGuests?: number;
  duration: string;
  groupSize: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  /* Optional CSS object-position override for the card image crop, used
   * when the subject of the photo is off center (e.g. the Marrakech Royal
   * Flight breakfast table and couple). Defaults to the browser default
   * (center center) when unset. */
  objectPosition?: string;
  features: OfferFeature[];
  badge?: string;
  popular?: boolean;
}

export const cities: Record<
  CityId,
  {
    id: CityId;
    name: string;
    headline: string;
    intro: string;
    launchSite: string;
    isMain: boolean;
  }
> = {
  agadir: {
    id: "agadir",
    name: "Agadir",
    headline: "Hot Air Balloon Flights in Agadir",
    intro:
      "Our home base and the heart of everything we do. Every morning we lift off from the Souss Valley, drifting over green fields, argan groves and Berber villages with the Atlas Mountains glowing on the horizon.",
    launchSite: "Souss Valley launch site, approximately 50 minutes to 1 hour from central Agadir",
    isMain: true,
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    headline: "Hot Air Balloon Flights in Marrakech",
    intro:
      "Our second destination, operated by the same Agadir based team. Lift off from the desert on the edge of the red city and watch the Atlas mountains turn gold at sunrise. A balloon flight in Marrakech is one of the most memorable ways to start the day, and hot air balloon Marrakech prices start at 999 MAD per person for the Classic Low Cost flight.",
    launchSite: "Desert launch area, about 30 minutes from central Marrakech",
    isMain: false,
  },
};

/* ------------------------------------------------------------------ */
/* AGADIR OFFERS. The real packages and prices of our main destination. */
/* Prices approved by the owner on 2026-11-20. The former Agadir Royal  */
/* Flight was REMOVED by owner decision on 2026-11-20: Agadir has       */
/* exactly two packages, Classic Flight and Private Flight. Never       */
/* reintroduce a third Agadir package without an explicit owner         */
/* decision.                                                            */
/* ------------------------------------------------------------------ */

export const agadirOffers: Offer[] = [
  {
    id: "agadir-classic",
    city: "agadir",
    cityName: "Agadir",
    name: "Classic Flight",
    description:
      "Our signature Agadir sunrise. Share a balloon with a small group, drift over the beautiful Souss Valley with panoramic views of the Atlas Mountains, then land to a traditional Berber breakfast in a Caïdal tent.",
    priceMad: 2199,
    duration: "About 60 minutes airborne",
    groupSize: "Shared basket",
    image: "/images/classic-flight-sunrise.webp",
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt:
      "Passengers in the wicker basket of a hot air balloon with the burner glowing at sunrise over the Souss Valley near Agadir",
    features: [
      { icon: "bus", label: "Round-trip transportation from Agadir" },
      { icon: "coffee", label: "Welcome coffee and Moroccan tea" },
      { icon: "mountain", label: "Souss Valley and Atlas views" },
      { icon: "tent", label: "Berber breakfast in a Caïdal tent" },
      { icon: "award", label: "Official flight certificate" },
    ],
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "agadir-private",
    city: "agadir",
    cityName: "Agadir",
    name: "Private Flight",
    description:
      "The ultimate exclusive experience. Your own balloon, your own pilot and a personalized morning above the Souss Valley, designed for couples, families, proposals and special occasions.",
    priceMad: 6999,
    minGuests: 2,
    duration: "About 60 minutes airborne",
    groupSize: "Private basket, minimum 2 guests",
    image: "/images/private-flight-souss-valley.webp",
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt:
      "Couple and pilot flying in a private hot air balloon basket above the Souss Valley landscape at sunrise",
    features: [
      { icon: "bus", label: "Private transportation" },
      { icon: "heart", label: "Exclusive private balloon" },
      { icon: "sparkles", label: "Personalized experience" },
      { icon: "award", label: "Flight certificate" },
      { icon: "tent", label: "Traditional private Berber breakfast under an argan tree" },
    ],
    badge: "Luxury and Exclusive",
  },
];

/* ------------------------------------------------------------------ */
/* MARRAKECH OFFERS. Separate packages for the secondary destination,  */
/* shown only on /marrakech-flights. Never mixed with Agadir.          */
/* All prices below were approved by the owner on 2026-11-20.          */
/* Owner decision 2026-11-20: the word "Palmeraie" is removed from the */
/* VISIBLE Marrakech copy (descriptions, tags, FAQ, booking labels).   */
/* The JSON-LD structured data keeps the original wording untouched    */
/* through the frozen seoDescription fields below.                     */
/* ------------------------------------------------------------------ */

export const marrakechOffers: Offer[] = [
  {
    id: "mk-classic",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Classic Low Cost",
    description:
      "Our most affordable way to fly over the desert landscapes around Marrakech. Join a friendly group, enjoy a shared balloon flight of about 40 minutes and finish the morning with a traditional Berber breakfast at a Kasbah. Sunrise and the first flight of the morning are not guaranteed.",
    seoDescription:
      "Our most affordable way to fly over the Palmeraie desert. Join a friendly group, enjoy a shared balloon flight of about 40 minutes and finish the morning with a traditional Berber breakfast at a Kasbah. Sunrise and the first flight of the morning are not guaranteed.",
    priceMad: 999,
    duration: "About 40 minutes airborne",
    groupSize: "Shared balloon, maximum 19 people",
    image: "/images/marrakech-classic.jpg",
    imageWidth: 1600,
    imageHeight: 896,
    imageAlt:
      "Hot air balloon floating over the Marrakech desert with the snow capped Atlas mountains behind",
    features: [
      { icon: "bus", label: "Shared minibus with multiple pickup points" },
      { icon: "coffee", label: "Coffee and Moroccan tea on arrival" },
      { icon: "clock", label: "About 40 minute shared balloon flight" },
      { icon: "users", label: "Shared balloon, maximum 19 people" },
      { icon: "coffee", label: "Traditional Berber breakfast at a Kasbah" },
    ],
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "mk-comfort",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Classic Flight",
    description:
      "Our signature Marrakech balloon morning. Ride through the desert in a 4x4, fly for about 60 minutes with the Atlas mountains on the horizon and land to a traditional Berber breakfast at a Kasbah overlooking the mountains.",
    priceMad: 1399,
    duration: "About 60 minutes airborne",
    groupSize: "Shared balloon",
    image: "/images/marrakech-comfort.jpg",
    imageWidth: 1216,
    imageHeight: 896,
    imageAlt:
      "Hot air balloon flying above a Moroccan kasbah village with the Atlas mountains at sunrise",
    features: [
      { icon: "bus", label: "Transportation by 4x4 vehicle" },
      { icon: "coffee", label: "Coffee and Moroccan tea on arrival" },
      { icon: "clock", label: "About 60 minute balloon flight" },
      { icon: "award", label: "Official flight certificate" },
      { icon: "coffee", label: "Berber breakfast at a Kasbah overlooking the Atlas mountains" },
    ],
  },
  {
    id: "mk-private",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Private Flight",
    description:
      "The whole balloon just for your party. Travel in a private 4x4, fly for about 60 minutes over Marrakech’s desert landscapes and enjoy a traditional Berber breakfast in a private tent overlooking the Atlas mountains. Ideal for couples, families and special occasions.",
    seoDescription:
      "The whole balloon just for your party. Travel in a private 4x4, fly for about 60 minutes over the Palmeraie desert and enjoy a traditional Berber breakfast in a private tent overlooking the Atlas mountains. Ideal for couples, families and special occasions.",
    priceMad: 5299,
    minGuests: 2,
    duration: "About 60 minutes airborne",
    groupSize: "Private balloon",
    image: "/images/marrakech-private.jpg",
    imageWidth: 1152,
    imageHeight: 768,
    imageAlt: "Couple standing in a hot air balloon basket above Marrakech at sunrise",
    features: [
      { icon: "heart", label: "Private 4x4 transportation" },
      { icon: "coffee", label: "Coffee and Moroccan tea on arrival" },
      { icon: "clock", label: "Private balloon flight of about 60 minutes" },
      { icon: "award", label: "Official flight certificate" },
      { icon: "coffee", label: "Berber breakfast in a private tent overlooking the Atlas mountains" },
    ],
  },
  {
    id: "mk-royal",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Royal Flight",
    description:
      "The whole balloon just for your party, elevated to the most exclusive Marrakech morning. Travel in a private 4x4, fly for about 60 minutes over Marrakech’s desert landscapes and enjoy your Berber breakfast served in the sky aboard the balloon, with the Atlas mountains on the horizon.",
    seoDescription:
      "The whole balloon just for your party, elevated to the most exclusive Marrakech morning. Travel in a private 4x4, fly for about 60 minutes over the Palmeraie desert and enjoy your Berber breakfast served in the sky aboard the balloon, with the Atlas mountains on the horizon.",
    priceMad: 6299,
    minGuests: 2,
    duration: "About 60 minutes airborne",
    groupSize: "Private balloon",
    image: "/images/marrakech-royal-flight.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt:
      "Couple enjoying breakfast in the sky aboard a private hot air balloon over Marrakech at sunrise",
    /* Keep the couple and the breakfast table inside the card crop: the
     * photo sits slightly low in the frame, so anchor the crop below the
     * vertical center. */
    objectPosition: "center 65%",
    features: [
      { icon: "heart", label: "Private 4x4 transportation" },
      { icon: "coffee", label: "Coffee and Moroccan tea on arrival" },
      { icon: "clock", label: "Private balloon flight of about 60 minutes" },
      { icon: "coffee", label: "Breakfast served in the sky aboard the balloon" },
      { icon: "award", label: "Official flight certificate" },
    ],
    badge: "Royal Experience",
  },
];

/* ------------------------------------------------------------------ */
/* Marketing sections                                                  */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: "5.0", label: "Google Rating", icon: "star" },
  { value: "60 min", label: "Over the Souss Valley", icon: "sun" },
  { value: "100%", label: "Safety Record", icon: "shield" },
  { value: "24/7", label: "Booking on WhatsApp", icon: "users" },
] as const;

export const whyUs = [
  {
    icon: "badge",
    title: "Agadir Home Base",
    text: "We are an Agadir company through and through. Our licensed Moroccan pilots fly the Souss Valley every single morning, all year round.",
  },
  {
    icon: "shield",
    title: "Safety First",
    text: "Daily equipment checks, full passenger insurance and strict compliance with Moroccan civil aviation rules on every flight.",
  },
  {
    icon: "bus",
    title: "Hotel Pickup in Agadir",
    text: "Enjoy complimentary round-trip hotel transportation from Agadir City, Taghazout and Tamraght.",
  },
  {
    icon: "sparkles",
    title: "All-Inclusive Morning",
    text: "Welcome coffee and Moroccan tea, about 60 minutes over the Souss Valley, a Berber breakfast in a Caïdal tent and your official flight certificate.",
  },
] as const;

/* The complete Agadir experience, from pickup to drop off. */
export const experienceSteps = [
  {
    time: "04:00 to 05:00",
    title: "Hotel pickup in Agadir",
    text: "Your driver collects you from your hotel while the city is still asleep. The exact time depends on the season and your hotel location.",
  },
  {
    time: "On arrival",
    title: "Welcome coffee and tea",
    text: "Arrive at the Souss Valley launch site and enjoy a warm Moroccan welcome with coffee and traditional mint tea.",
  },
  {
    time: "Before dawn",
    title: "Balloon inflation",
    text: "Watch the balloon come alive as the crew inflates the envelope, then meet your licensed pilot for the safety briefing.",
  },
  {
    time: "Sunrise",
    title: "Take off at first light",
    text: "The burner roars, the ground falls away and you lift off just as the sun rises over the Atlas Mountains.",
  },
  {
    time: "In the air",
    title: "60 minutes over the Souss Valley",
    text: "Enjoy approximately one hour of peaceful flying over green fields, argan groves and Berber villages.",
  },
  {
    time: "In the air",
    title: "Panoramic landscapes",
    text: "Admire the breathtaking scenery of the Souss Valley and the Atlas Mountains glowing in the morning light.",
  },
  {
    time: "After landing",
    title: "Traditional Berber breakfast",
    text: "Sit down to a traditional Moroccan Berber breakfast served in a traditional Caïdal tent, with mint tea and fresh msemen.",
  },
  {
    time: "Ceremony",
    title: "Your flight certificate",
    text: "Receive your official flight certificate, a personal souvenir of your morning in the sky above Agadir.",
  },
  {
    time: "Around 10:00 AM",
    title: "Return to your hotel",
    text: "Relax on the drive back to your hotel, camera roll full of memories. The experience usually finishes around 10:00 AM.",
  },
] as const;

export const weatherNote =
  "Flights are subject to suitable weather and wind conditions. If we have to cancel for safety reasons, you choose between a new date or a full refund.";

export const pickupAreas = [
  { name: "Agadir city", note: "Round-trip hotel pickup included", included: true },
  { name: "Taghazout", note: "Round-trip hotel pickup included", included: true },
  { name: "Tamraght", note: "Round-trip hotel pickup included", included: true },
] as const;

/* Timeline used on the Marrakech page. Steps without a time simply show no time badge. */
export const marrakechTimeline: readonly { time?: string; title: string; text: string }[] = [
  { time: "04:45", title: "Hotel pickup", text: "Your driver collects you from your hotel or riad in Marrakech while the sky is still dark." },
  { title: "Inflation and briefing", text: "Watch the balloon come alive in the desert outside Marrakech and meet your pilot for the safety briefing." },
  { title: "Takeoff at sunrise", text: "The burner roars, the ground falls away and the sun rises with you over the desert." },
  { title: "45 to 60 minutes in the air", text: "Float over Marrakech’s desert plains with the Atlas mountains on the horizon." },
  { title: "Landing ceremony", text: "A gentle landing followed by the traditional pilot toast with the crew." },
  { title: "Berber breakfast", text: "Fresh msemen, dates, eggs, mint tea and coffee served at the landing site." },
  { title: "Flight certificate", text: "You receive your personalized certificate before the drive back." },
  { time: "Around 10:00", title: "Back at your hotel", text: "Drop off in Marrakech with a camera roll full of memories and stories to tell." },
];

/* ------------------------------------------------------------------ */
/* Reviews are NOT stored here anymore. Every displayed review, the     */
/* rating and the review count come from the live official Google       */
/* Places API through /api/google-reviews (see that route for the       */
/* integration details). When the live data is unavailable, the Agadir  */
/* homepage falls back to the verified word for word copy of our real   */
/* Google reviews in src/lib/verified-reviews.ts; the Marrakech page    */
/* keeps hiding the review cards and linking to the Google profile.     */
/* No review is ever invented or shown from an unverified source.       */
/*                                                                     */
/* reviewHighlights are marketing summary lines of the review section, */
/* not review content.                                                 */
/* ------------------------------------------------------------------ */
export const reviewHighlights = [
  "Professional licensed pilot",
  "Safe and smooth sunrise flight",
  "Great breakfast after landing",
] as const;

/* ------------------------------------------------------------------ */
/* Google Business Profile configuration.                              */
/*                                                                     */
/* ONE SINGLE Google Business Profile serves BOTH destinations: the    */
/* owner confirmed that Agadir and Marrakech do NOT have separate      */
/* Google Business Profiles. Both pages therefore use the exact same   */
/* official links:                                                     */
/*                                                                     */
/* reviewUrl  = official Google review submission link. Opens Google's */
/*              own review-writing interface in a new tab, where the   */
/*              customer selects a star rating and publishes directly  */
/*              on Google. There is no on-site review form and reviews */
/*              are never submitted programmatically on behalf of      */
/*              customers.                                             */
/* profileUrl = official Google Business Profile link.                 */
/*                                                                     */
/* Published reviews are read back from this same profile through the  */
/* official Google Places API (see /api/google-reviews) and shown on   */
/* both pages. Owner replies are never displayed anywhere.             */
/* ------------------------------------------------------------------ */
export type CityKey = "agadir" | "marrakech";

export interface CityGoogleConfig {
  reviewUrl: string;
  profileUrl: string;
}

const singleProfileConfig: CityGoogleConfig = {
  reviewUrl: GOOGLE_REVIEW_URL,
  profileUrl: GOOGLE_PROFILE_URL,
};

export const cityGoogleConfig: Record<CityKey, CityGoogleConfig> = {
  agadir: singleProfileConfig,
  marrakech: singleProfileConfig,
};

/* ------------------------------------------------------------------ */
/* FAQ. Homepage FAQ is Agadir focused.                                */
/* ------------------------------------------------------------------ */
export interface Faq {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

export const faqs: Faq[] = [
  {
    q: "What time is the hotel pickup in Agadir?",
    a: "Pickup from your Agadir hotel happens early in the morning, between 4:00 AM and 5:00 AM, depending on the season and your hotel location. The full experience finishes around 10:00 AM with drop off at your hotel.",
  },
  {
    q: "Where do the balloon flights take off?",
    a: "Our launch sites are in the Souss Valley, approximately 50 minutes to 1 hour from central Agadir.",
  },
  {
    q: "Is transportation included from my hotel?",
    a: "Yes! Round-trip hotel pickup is included for guests staying in Agadir City, Taghazout and Tamraght. Our team will coordinate your exact pickup location and time with you via WhatsApp.",
  },
  {
    q: "What does the price include?",
    a: "The Classic Flight is 2,199 MAD per person and includes round-trip transportation from Agadir, welcome coffee and Moroccan tea, the balloon flight over the Souss Valley, a traditional Berber breakfast in a Caïdal tent and the official flight certificate. The Private Flight is 6,999 MAD per person with a minimum of 2 guests and includes private transportation, an exclusive balloon and a traditional private Berber breakfast under an argan tree.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Ballooning depends on suitable weather and wind conditions. If your flight is cancelled for weather or safety reasons, you choose between a new date or a full refund with no fees.",
  },
  {
    q: "How long do we stay in the air?",
    a: "The balloon flies for approximately 60 minutes. Plan the whole morning from pickup between 4:00 and 5:00 AM until drop off around 10:00 AM.",
  },
  {
    q: "What should I wear and bring?",
    a: "Wear warm layers and closed shoes because it is cool before sunrise. Bring a hat, sunglasses and your camera. We provide the rest.",
  },
  {
    q: "Are there age or weight limits?",
    a: "Children from 3 years old can fly with an adult. For guests weighing 140 kg or more, please contact us on WhatsApp so we can check whether it is possible to accommodate you safely.",
    link: {
      href: waLink(
        "Hello! I weigh 140 kg or more and I have a question about the balloon flights in Agadir. Can you check whether it is possible to accommodate me safely?",
      ),
      label: "Contact us on WhatsApp",
    },
  },
  {
    q: "Do you also fly in Marrakech?",
    a: "Yes. Marrakech is our second destination, operated by the same Agadir team, with its own launch site in the desert outside the city and its own offers and prices.",
    link: { href: "/marrakech-flights", label: "Discover our Marrakech Flights" },
  },
  /* Phase E SEO FAQs (owner approved 2026-11-21): APPENDED at the END of the
   * list so the homepage JSON-LD FAQPage slice(0, 6) stays byte identical.
   * Every fact below is already visible on the English site (owner provided
   * pickup clock times are deliberately NOT restated: they would contradict
   * the approved FAQ above). */
  {
    q: "Can I book a private hot air balloon flight in Agadir?",
    a: "Yes. The Private Flight gives you the whole balloon just for your party: 6,999 MAD per person with a minimum of 2 guests, private transportation, your own pilot and a traditional private Berber breakfast under an argan tree.",
  },
  {
    q: "When do the hot air balloon flights take off in Agadir?",
    a: "Every flight is a sunrise flight: the balloon lifts off at first light, just as the sun rises over the Atlas Mountains, and the whole morning ends around 10:00 AM with drop off at your hotel.",
  },
  {
    q: "Can babies join the hot air balloon flight in Agadir?",
    a: "For safety reasons, babies are not permitted on the balloon flights. Children from 3 years old are welcome and can fly with an adult.",
  },
];

export const marrakechFaqs: Faq[] = [
  {
    q: "Where do Marrakech balloon flights take off?",
    a: "Marrakech flights launch from our desert launch area, about 30 minutes from central Marrakech.",
  },
  {
    q: "What time is the hotel pickup in Marrakech?",
    a: "We collect you from your hotel or riad about one hour before takeoff, early in the morning before sunrise. Your exact pickup time is confirmed on WhatsApp the day before the flight.",
  },
  {
    q: "Is hotel transfer included in Marrakech?",
    a: "Yes, pickup and drop off from all hotels and riads in the Marrakech city area are included in every Marrakech flight.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Flights depend on suitable weather and wind conditions. If your flight is cancelled for weather or safety reasons, you choose between a new date or a full refund with no fees.",
  },
  {
    q: "What is included in the Marrakech flights?",
    a: "Every Marrakech flight includes transportation, coffee and Moroccan tea on arrival, the balloon flight, breakfast and the flight certificate. The Classic Low Cost is 999 MAD per person, the Classic Flight is 1,399 MAD per person, the Private Flight is 5,299 MAD per person with a minimum of 2 guests and the Royal Flight is 6,299 MAD per person with a minimum of 2 guests and breakfast served in the sky aboard the balloon.",
  },
  {
    q: "Where is your company based?",
    a: "Our home base is Agadir, where we fly over the Souss Valley every morning. Marrakech is our second destination, flown by the same licensed team.",
    link: { href: "/", label: "Discover our Agadir flights" },
  },
  /* Phase E SEO FAQs (owner approved 2026-11-21): APPENDED at the END of the
   * list. Every time and price below is already stated on the Marrakech
   * page itself (timeline and offers). */
  {
    q: "How much does a hot air balloon flight in Marrakech cost?",
    a: "The Classic Low Cost is 999 MAD per person, the Classic Flight is 1,399 MAD per person, the Private Flight is 5,299 MAD per person with a minimum of 2 guests and the Royal Flight is 6,299 MAD per person with a minimum of 2 guests.",
  },
  {
    q: "How long does the balloon flight last in Marrakech?",
    a: "The Classic Low Cost flies for about 40 minutes. The Classic Flight, the Private Flight and the Royal Flight fly for about 60 minutes, floating over the desert plains outside Marrakech.",
  },
  {
    q: "Can I book a private hot air balloon flight in Marrakech?",
    a: "Yes. The Private Flight is 5,299 MAD per person with a minimum of 2 guests, and the Royal Flight is 6,299 MAD per person with a minimum of 2 guests and your Berber breakfast served in the sky aboard the balloon.",
  },
  {
    q: "Is the Marrakech balloon flight at sunrise?",
    a: "Yes, every Marrakech flight is an early morning sunrise experience: hotel pickup at 04:45, takeoff at sunrise and drop off back at your hotel around 10:00.",
  },
];

/* ------------------------------------------------------------------ */
/* Gallery media now lives in the single shared configuration file src/lib/gallery.ts. */
