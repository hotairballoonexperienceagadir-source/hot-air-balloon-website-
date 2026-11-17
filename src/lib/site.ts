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
 * Edit prices, texts and reviews here, the pages read everything from this file.
 */

export const site = {
  brand: "Hot Air Balloon Experience Agadir",
  brandShort: "HAB Experience",
  phoneDisplay: "+212 609 488 493",
  phoneTel: "+212609488493",
  whatsappNumber: "212609488493",
  googleRating: 5.0,
  googleReviewsUrl: "https://share.google/usziGz8xr4d8qD8av",
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
  priceMad: number;
  minGuests?: number;
  duration: string;
  groupSize: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
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
    launchSite: "Souss Valley launch site, about 30 minutes from central Agadir",
    isMain: true,
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    headline: "Hot Air Balloon Flights in Marrakech",
    intro:
      "Our second destination, operated by the same Agadir based team. Lift off from the Palmeraie desert on the edge of the red city and watch the Atlas mountains turn gold at sunrise.",
    launchSite: "Palmeraie desert, about 20 minutes from central Marrakech",
    isMain: false,
  },
};

/* ------------------------------------------------------------------ */
/* AGADIR OFFERS. The real packages and prices of our main destination. */
/* ------------------------------------------------------------------ */

export const agadirOffers: Offer[] = [
  {
    id: "agadir-classic",
    city: "agadir",
    cityName: "Agadir",
    name: "Classic Flight",
    description:
      "Our signature Agadir sunrise. Share a balloon with a small group, drift over the beautiful Souss Valley with panoramic views of the Atlas Mountains, then land to a traditional Berber breakfast in a Caïdal tent.",
    priceMad: 2200,
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
    priceMad: 7000,
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
      { icon: "tent", label: "Berber breakfast onboard or under an argan tree" },
    ],
    badge: "Luxury and Exclusive",
  },
];

/* ------------------------------------------------------------------ */
/* MARRAKECH OFFERS. Separate packages for the secondary destination,  */
/* shown only on /marrakech-flights. Never mixed with Agadir.          */
/* ------------------------------------------------------------------ */

export const marrakechOffers: Offer[] = [
  {
    id: "mk-classic",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Classic Sunrise Flight",
    description:
      "Our most loved flight in Marrakech. A shared balloon, a big sunrise over the Atlas mountains and a full Berber breakfast waiting for you on landing.",
    priceMad: 1600,
    duration: "45 to 60 min airborne",
    groupSize: "Up to 16 guests",
    image: "/images/marrakech-classic.jpg",
    imageWidth: 1600,
    imageHeight: 896,
    imageAlt:
      "Hot air balloon floating over the Marrakech desert with the snow capped Atlas mountains behind",
    features: [
      { icon: "bus", label: "Hotel transfer" },
      { icon: "coffee", label: "Berber breakfast" },
      { icon: "award", label: "Flight certificate" },
      { icon: "mountain", label: "Atlas views" },
    ],
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "mk-comfort",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Comfort Small Group Flight",
    description:
      "The same magic with fewer people around you. A smaller balloon, a wide basket and a photographer who captures the whole morning for you.",
    priceMad: 2100,
    duration: "45 to 60 min airborne",
    groupSize: "Up to 8 guests",
    image: "/images/marrakech-comfort.jpg",
    imageWidth: 1216,
    imageHeight: 896,
    imageAlt:
      "Hot air balloon flying above a Moroccan kasbah village with the Atlas mountains at sunrise",
    features: [
      { icon: "users", label: "Small balloon" },
      { icon: "camera", label: "Photo service" },
      { icon: "coffee", label: "Premium breakfast" },
      { icon: "sun", label: "Sunrise takeoff" },
    ],
  },
  {
    id: "mk-private",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Private Romantic Flight",
    description:
      "The whole basket just for your party. Perfect for proposals, honeymoons and anniversaries, with decorations, photos and a toast in the sky.",
    priceMad: 3500,
    duration: "60 min airborne",
    groupSize: "Private basket, 2 to 8 guests",
    image: "/images/marrakech-private.jpg",
    imageWidth: 1152,
    imageHeight: 768,
    imageAlt: "Couple standing in a hot air balloon basket above Marrakech at sunrise",
    features: [
      { icon: "heart", label: "Exclusive basket" },
      { icon: "camera", label: "Video and photos" },
      { icon: "flame", label: "Proposal setup" },
      { icon: "award", label: "Champagne toast" },
    ],
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

/* Timeline used on the Marrakech page. */
export const marrakechTimeline = [
  { time: "04:45", title: "Hotel pickup", text: "Your driver collects you from your hotel or riad in Marrakech while the sky is still dark." },
  { time: "05:30", title: "Inflation and briefing", text: "Watch the balloon come alive in the Palmeraie desert and meet your pilot for the safety briefing." },
  { time: "06:15", title: "Takeoff at sunrise", text: "The burner roars, the ground falls away and the sun rises with you over the palm groves." },
  { time: "06:45", title: "45 to 60 minutes in the air", text: "Float over the Palmeraie and the desert plains with the Atlas mountains on the horizon." },
  { time: "07:45", title: "Landing ceremony", text: "A gentle landing followed by the traditional pilot toast with the crew." },
  { time: "08:15", title: "Berber breakfast", text: "Fresh msemen, dates, eggs, mint tea and coffee served at the landing site." },
  { time: "09:00", title: "Flight certificate", text: "You receive your personalized certificate before the drive back." },
  { time: "10:30", title: "Back at your hotel", text: "Drop off in Marrakech with a camera roll full of memories and stories to tell." },
] as const;

/* ------------------------------------------------------------------ */
/* Reviews. Real data from the Google Business Profile (rating 5.0).   */
/* ------------------------------------------------------------------ */
export const reviews = [
  {
    name: "wai mei poon",
    meta: "8 reviews · 5 photos on Google",
    time: "2 weeks ago",
    text: "Amazing air balloon ride over Agadir with sunrise view! Professional pilot and take us for a safe flight! Also it serves us a Great breakfast!!",
  },
] as const;

export const ownerReply =
  "Thank you for your kind review! We're glad you enjoyed the experience and hope to see you again!";

export const reviewHighlights = [
  "Professional licensed pilot",
  "Safe and smooth sunrise flight",
  "Great breakfast after landing",
] as const;

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
    a: "Our launch sites are in the Souss Valley, about 30 minutes from central Agadir. The exact field depends on the wind direction of the morning and is always chosen by your pilot with safety first.",
  },
  {
    q: "Is transportation included from my hotel?",
    a: "Yes! Round-trip hotel pickup is included for guests staying in Agadir City, Taghazout and Tamraght. Our team will coordinate your exact pickup location and time with you via WhatsApp.",
  },
  {
    q: "What does the price include?",
    a: "The Classic Flight is 2,200 MAD per person and includes round-trip transportation from Agadir, welcome coffee and Moroccan tea, the balloon flight over the Souss Valley, a traditional Berber breakfast in a Caïdal tent and the official flight certificate. The Private Flight is 7,000 MAD per person with a minimum of 2 guests and includes private transportation, an exclusive balloon and breakfast onboard or under an argan tree.",
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
    a: "Children from 6 years old can fly with an adult. For guests above 100 kg, contact us on WhatsApp so we can arrange the right basket and seats.",
  },
  {
    q: "Do you also fly in Marrakech?",
    a: "Yes. Marrakech is our second destination, operated by the same Agadir team, with its own launch site in the Palmeraie desert and its own offers and prices.",
    link: { href: "/marrakech-flights", label: "Discover our Marrakech Flights" },
  },
];

export const marrakechFaqs: Faq[] = [
  {
    q: "Where do Marrakech balloon flights take off?",
    a: "Marrakech flights launch from the Palmeraie desert, about 20 minutes from central Marrakech. The exact field depends on the wind of the morning and is chosen by your pilot.",
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
    a: "Every Marrakech flight includes hotel transfer, the balloon flight, breakfast and the flight certificate. The Classic Sunrise Flight is 1,600 MAD per person, the Comfort Small Group Flight is 2,100 MAD per person and the Private Romantic Flight is 3,500 MAD per person.",
  },
  {
    q: "Where is your company based?",
    a: "Our home base is Agadir, where we fly over the Souss Valley every morning. Marrakech is our second destination, flown by the same licensed team.",
    link: { href: "/", label: "Discover our Agadir flights" },
  },
];

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const galleryImages = [
  { src: "/images/gallery-1.jpg", w: 1800, h: 1350, alt: "Dozens of hot air balloons flying over the Souss Valley at dawn", label: "Dawn over the Souss Valley" },
  { src: "/images/gallery-2.jpg", w: 1200, h: 780, alt: "Colorful hot air balloons rising into a clear sky above Agadir", label: "Balloons in first light" },
  { src: "/images/burner-flame.jpg", w: 768, h: 1344, alt: "Balloon burner flame lighting up the envelope before dawn in the Souss Valley", label: "Inflation before dawn" },
  { src: "/images/gallery-4.jpg", w: 1024, h: 1024, alt: "Moroccan mint tea being poured into traditional glasses", label: "Moroccan mint tea" },
  { src: "/images/breakfast-caidal.jpg", w: 1824, h: 1216, alt: "Traditional Berber breakfast with mint tea served inside a Caïdal tent", label: "Berber breakfast" },
  { src: "/images/gallery-6.jpg", w: 841, h: 1051, alt: "Guest watching hot air balloons fill the sunrise sky above the Souss Valley", label: "Morning full of balloons" },
] as const;
