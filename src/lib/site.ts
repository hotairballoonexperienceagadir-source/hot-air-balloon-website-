/**
 * Single source of truth for site content.
 * WhatsApp number, Google rating and Google Maps link are the real ones from
 * the Hot Air Balloon Experience Agadir business profile.
 * Edit prices, texts and review quotes here, the page reads everything from this file.
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
  yearsFlying: 12,
  guestsFlown: "10,000+",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hello! I would like to book a hot air balloon flight. Please send me availability and prices.";

export const heroWaMessage =
  "Hello! I would like to check availability for a hot air balloon flight. My preferred date and city are:";

export const offerWaMessage = (offerName: string, city: string) =>
  `Hello! I would like to book the ${offerName} in ${city}. Please send me availability and price details.`;

/* ------------------------------------------------------------------ */
/* Offers. Prices differ between the two cities on purpose.            */
/* ------------------------------------------------------------------ */

export type CityId = "marrakech" | "agadir";

export interface OfferFeature {
  icon: "clock" | "users" | "bus" | "coffee" | "award" | "camera" | "mountain" | "heart" | "flame" | "sun";
  label: string;
}

export interface Offer {
  id: string;
  city: CityId;
  cityName: string;
  name: string;
  description: string;
  priceMad: number;
  childMad?: number;
  duration: string;
  groupSize: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  features: OfferFeature[];
  popular?: boolean;
}

export const cities: Record<
  CityId,
  { id: CityId; name: string; headline: string; intro: string; launchSite: string; anchor: string }
> = {
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    headline: "Hot Air Balloon Flights in Marrakech",
    intro:
      "Lift off from the Palmeraie desert on the edge of the red city. You drift over palm groves and desert plains while the snow capped Atlas mountains turn gold in the first sunlight.",
    launchSite: "Palmeraie desert, 20 minutes from central Marrakech",
    anchor: "#marrakech",
  },
  agadir: {
    id: "agadir",
    name: "Agadir",
    headline: "Hot Air Balloon Flights in Agadir",
    intro:
      "Our home base and the original Hot Air Balloon Experience. You fly over the Souss valley, argan groves and farming villages with the Anti Atlas foothills around you. Same pilots, same safety, different landscape.",
    launchSite: "Souss valley, 30 minutes from central Agadir",
    anchor: "#agadir",
  },
};

export const offers: Offer[] = [
  {
    id: "mk-classic",
    city: "marrakech",
    cityName: "Marrakech",
    name: "Classic Sunrise Flight",
    description:
      "Our most loved flight in Marrakech. A shared balloon, a big sunrise over the Atlas mountains and a full Berber breakfast waiting for you on landing.",
    priceMad: 1600,
    childMad: 900,
    duration: "45 to 60 min airborne",
    groupSize: "Up to 16 guests",
    image: "/images/marrakech-classic.jpg",
    imageWidth: 1600,
    imageHeight: 896,
    imageAlt: "Hot air balloon floating over the Marrakech desert with the snow capped Atlas mountains behind",
    features: [
      { icon: "bus", label: "Hotel transfer" },
      { icon: "coffee", label: "Berber breakfast" },
      { icon: "award", label: "Flight certificate" },
      { icon: "mountain", label: "Atlas views" },
    ],
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
    imageAlt: "Hot air balloon flying above a Moroccan kasbah village with the Atlas mountains at sunrise",
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
  {
    id: "ag-classic",
    city: "agadir",
    cityName: "Agadir",
    name: "Classic Souss Valley Flight",
    description:
      "The Agadir signature. Drift over the green Souss valley, argan groves and Berber villages while the Anti Atlas foothills glow at sunrise.",
    priceMad: 1400,
    childMad: 800,
    duration: "45 to 60 min airborne",
    groupSize: "Up to 16 guests",
    image: "/images/agadir-classic.jpg",
    imageWidth: 1500,
    imageHeight: 1001,
    imageAlt: "Hot air balloons flying over the green Souss valley near Agadir with the Atlas mountains",
    features: [
      { icon: "bus", label: "Hotel transfer" },
      { icon: "coffee", label: "Berber breakfast" },
      { icon: "award", label: "Flight certificate" },
      { icon: "mountain", label: "Valley views" },
    ],
    popular: true,
  },
  {
    id: "ag-premium",
    city: "agadir",
    cityName: "Agadir",
    name: "Premium Small Group Flight",
    description:
      "A calmer, roomier flight over the Souss valley. Fewer passengers, more space to take photos and a dedicated crew on the ground with 4x4 support.",
    priceMad: 1900,
    duration: "45 to 60 min airborne",
    groupSize: "Up to 8 guests",
    image: "/images/agadir-premium.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    imageAlt: "Hot air balloon landing in the Souss valley field with 4x4 support vehicles waiting",
    features: [
      { icon: "users", label: "Small balloon" },
      { icon: "camera", label: "Photo service" },
      { icon: "coffee", label: "Breakfast included" },
      { icon: "sun", label: "Sunrise takeoff" },
    ],
  },
  {
    id: "ag-private",
    city: "agadir",
    cityName: "Agadir",
    name: "Private Souss Valley Flight",
    description:
      "Your own balloon and your own route over the Souss valley. Ideal for couples, families and small celebrations, with photos and a toast on landing.",
    priceMad: 3000,
    duration: "60 min airborne",
    groupSize: "Private basket, 2 to 8 guests",
    image: "/images/agadir-private.jpg",
    imageWidth: 1280,
    imageHeight: 800,
    imageAlt: "Private hot air balloon descending to a desert camp near Agadir with guests waiting",
    features: [
      { icon: "heart", label: "Exclusive basket" },
      { icon: "camera", label: "Video and photos" },
      { icon: "flame", label: "Flexible route" },
      { icon: "award", label: "Champagne toast" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Marketing sections                                                  */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: site.guestsFlown, label: "Happy Guests", icon: "users" },
  { value: `${site.yearsFlying}+`, label: "Years in the Sky", icon: "sun" },
  { value: "5.0", label: "Google Rating", icon: "star" },
  { value: "100%", label: "Safety Record", icon: "shield" },
] as const;

export const whyUs = [
  {
    icon: "badge",
    title: "Licensed Pilots",
    text: "Every pilot holds a commercial balloon licence with thousands of flight hours over Morocco and continuous training.",
  },
  {
    icon: "shield",
    title: "Safety First",
    text: "Daily equipment checks, full passenger insurance and strict compliance with Moroccan civil aviation rules.",
  },
  {
    icon: "bus",
    title: "Hotel Transfer",
    text: "Complimentary pickup and drop off from every hotel and riad in Marrakech and Agadir city areas.",
  },
  {
    icon: "sparkles",
    title: "Premium Experience",
    text: "Berber breakfast, flight certificate, photos of your morning and a warm crew that treats you like family.",
  },
] as const;

export const timeline = [
  { time: "04:45", title: "Hotel pickup", text: "Your driver collects you from your hotel or riad while the sky is still dark." },
  { time: "05:30", title: "Inflation and briefing", text: "Watch the balloon come alive and meet your pilot for the safety briefing." },
  { time: "06:15", title: "Takeoff at sunrise", text: "The burner roars, the ground falls away and the sun rises with you." },
  { time: "06:45", title: "45 to 60 minutes in the air", text: "Float over the landscape, take photos and enjoy the pure silence between burns." },
  { time: "07:45", title: "Landing ceremony", text: "A gentle landing followed by the traditional pilot toast with the crew." },
  { time: "08:15", title: "Berber breakfast", text: "Fresh msemen, dates, eggs, mint tea and coffee served at the landing site." },
  { time: "09:00", title: "Flight certificate", text: "You receive your personalized certificate before the drive back." },
  { time: "10:30", title: "Back at your hotel", text: "Drop off with a camera roll full of memories and stories to tell." },
] as const;

export const packages = [
  {
    tag: "Special Experience",
    title: "Honeymoon in the Sky",
    text: "Start married life with a private sunrise flight for two, decorated basket, photos and a champagne toast above Morocco.",
    image: "/images/gallery-3.jpg",
    imageAlt: "Green and red hot air balloons floating over the desert at dawn",
  },
  {
    tag: "Special Experience",
    title: "Marriage Proposal Flight",
    text: "We help you plan the perfect yes: a private basket, decorations, a photographer and the Atlas mountains as your backdrop.",
    image: "/images/marrakech-private.jpg",
    imageAlt: "Couple in a hot air balloon basket with Marrakech in the background",
  },
  {
    tag: "Photography",
    title: "Photography Flight",
    text: "Golden light, low clouds and a sky full of balloons. A flight designed for photographers and content creators.",
    image: "/images/gallery-6.jpg",
    imageAlt: "Guest watching hot air balloons fill the sky at sunrise",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Reviews. Real data from the Google Business Profile (rating 5.0).   */
/* The profile currently holds a single public review, quoted below    */
/* together with the owner reply. Add more reviews here as they come   */
/* in on Google and the section will keep the same layout.             */
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

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "What time do balloon flights take off?",
    a: "Balloon flights happen at sunrise, every day when the weather allows it. We pick you up from your hotel about one hour before takeoff so you are at the launch site for the inflation.",
  },
  {
    q: "Do you fly in both Marrakech and Agadir?",
    a: "Yes. Marrakech flights launch from the Palmeraie desert on the edge of the city and Agadir flights launch from the Souss valley, which is our home base. The landscapes, prices and offers are different in each city.",
  },
  {
    q: "Is hotel transfer included in the price?",
    a: "Yes, pickup and drop off from all hotels and riads in the Marrakech and Agadir city areas are included in every flight.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Ballooning depends on the wind. If your flight is cancelled for weather or safety reasons you choose between a new date or a full refund with no fees.",
  },
  {
    q: "How long does the whole experience last?",
    a: "Plan around four hours from hotel pickup to drop off. The balloon itself stays in the air for 45 to 60 minutes.",
  },
  {
    q: "What should I wear and bring?",
    a: "Wear warm layers and closed shoes because mornings are cool before sunrise. Bring a hat, sunglasses and your camera. We provide the rest.",
  },
  {
    q: "Are there age or weight limits?",
    a: "Children from 6 years old can fly with an adult. For guests above 100 kg contact us on WhatsApp so we can arrange the right basket and seats.",
  },
  {
    q: "How do I book my flight?",
    a: "The fastest way is the WhatsApp button on this site. You confirm the date, the city and the number of guests, and you pay on the day of the flight or in advance for private flights.",
  },
] as const;
