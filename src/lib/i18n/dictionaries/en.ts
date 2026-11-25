import type { Dictionary } from "../types";

/**
 * English dictionary.
 *
 * Every value here is the EXISTING approved English copy, copied word for
 * word from the components it used to be hardcoded in. The English pages
 * must render exactly as before the i18n work: never edit these strings
 * except for an explicit owner approved additive change (Phase E).
 */
export const en: Dictionary = {
  locale: "en",

  common: {
    book: "Book",
    bookNow: "Book Now",
    from: "From",
    perPerson: "/ person",
    minBooking: "Minimum booking: {n} people",
    checkAvailability: "Check Availability",
    stillQuestion: "Still have a question?",
    askUs: "Ask Us on WhatsApp",
  },

  header: {
    logoAlt: "Hot Air Balloon Experience Agadir logo",
    logoAria: "Hot Air Balloon Experience Agadir, home",
    ratingOnGoogle: "{rating} on Google",
    stripHome: "Sunrise flights over the Souss Valley, Agadir",
    stripMarrakech: "Marrakech flights operated by our Agadir base",
    open24: "Open 24 hours",
    nav: {
      home: "Home",
      agadirFlights: "Agadir Flights",
      marrakechFlights: "Marrakech Flights",
      experience: "Experience",
      gallery: "Gallery",
      reviews: "Reviews",
      faq: "FAQ",
    },
    openMenu: "Open menu",
    menuTitle: "Menu",
    menuDescription: "Navigate to the main sections of the site",
  },

  switcher: {
    triggerLabel: "Change language, current language: {name}",
  },

  home: {
    hero: {
      badge: "Agadir | Souss Valley | Morocco",
      titleLead: "Experience the Magic of Hot Air Balloon Flights in",
      titleHighlight: "Agadir",
      text: "Discover the breathtaking beauty of the Souss Valley from above. Enjoy a magical sunrise flight, a traditional Berber breakfast and unforgettable views of the Atlas Mountains. A hot air balloon ride in Agadir is one of the most beautiful experiences in Morocco.",
      bookCta: "Book Your Agadir Flight",
      exploreCta: "Explore Our Experience",
      imageAlt:
        "Red hot air balloon floating at sunrise above the Souss Valley near Agadir with the Atlas Mountains on the horizon and a Berber lounge in the foreground",
      mobileImageAlt:
        "Red hot air balloon floating at sunrise above the Souss Valley near Agadir with a Berber lounge in the foreground",
    },
    packages: {
      badge: "Agadir Balloon Flight Packages",
      title: "Our Flight Packages and Prices in Agadir",
      text: "Two ways to live the sunrise over the Souss Valley: our shared Classic Flight or the fully private experience. Every flight includes hotel pickup in Agadir, welcome tea, the flight and the Berber breakfast.",
      launchSite: "Souss Valley launch site, approximately 50 minutes to 1 hour from central Agadir",
      note: "Sunrise over the Souss Valley and panoramic views of the Atlas Mountains are included in every flight. Children from 3 years old can fly with an adult.",
      noteLink: "Ask us on WhatsApp",
      noteSuffix: "for family pricing.",
      questionWa: "Hello! I have a question about balloon flights in Agadir.",
      childrenNote: "Travelling with a child under 3?",
      childrenNoteLink: "Message us on WhatsApp",
      childrenNoteSuffix: "and we may have a solution for your family.",
      childrenWa:
        "Hello, I would like to book a hot air balloon flight with a child under 3 years old.\n\nDestination: Agadir\nLanguage: English",
    },
    offerCard: {
      cityChip: "{city} | Souss Valley",
      ratingLine: "{rating} rated on Google",
    },
    whyUs: {
      badge: "Why Choose Us",
      title: "Why Choose Our Agadir Experience",
      text: "From the balloons we fly to the crew we train, every decision is built around your safety and your morning above the Souss Valley. Our hot air balloon flights in Agadir run every single morning when the weather allows.",
    },
    experience: {
      slideBadgeTime: "04:00 to 05:00",
      slideBadgeLabel: "Hotel pickup",
      badge: "The Experience",
      title: "How Your Agadir Balloon Morning Works",
      text: "From the first knock on your hotel door before dawn to the last sip of mint tea in the Caïdal tent, here is the complete journey we share with you over the Souss Valley.",
      planCta: "Plan Your Flight",
    },
    pickup: {
      title: "Hotel Pickup and Transportation in Agadir",
      text: "Round-trip transportation from your hotel is included in every Agadir flight across Agadir city, Taghazout and Tamraght.",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Agadir and the Souss Valley From Above",
      description:
        "A glimpse of the landscapes, flights and mornings waiting for you in the skies of Agadir.",
    },
    cta: {
      badge: "Ready for Adventure?",
      title: "Book Your Agadir Balloon Flight Today",
      text: "Do not miss the experience of a lifetime. Send us a message today and fly over the Souss Valley at sunrise tomorrow morning. Book your Agadir sunrise balloon flight today and see why our guests rate us five stars.",
      bookCta: "Book Your Agadir Flight",
      exploreLink: "Explore Marrakech Flights",
      followLabel: "Follow our Agadir adventures",
      imageAlt: "Hot air balloons flying over the Souss Valley near Agadir at golden sunrise",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Everything you need to know before your balloon flight over the Souss Valley in Agadir.",
      wa: "Hello! I have a question about the balloon flights in Agadir.",
    },
    seo: {
      businessDescription:
        "Licensed sunrise hot air balloon flights in Agadir over the Souss Valley and the Atlas Mountains.",
      productNameTemplate: "{name} in Agadir",
    },
  },

  marrakech: {
    hero: {
      badge: "Second Destination | Operated by our Agadir base",
      titleLead: "Hot Air Balloon Flights in",
      titleHighlight: "Marrakech",
      bookCta: "Book Your Marrakech Flight",
      discoverCta: "Discover Our Agadir Flights",
      imageAlt:
        "Colorful hot air balloons drifting over the desert of Marrakech at sunrise with the Atlas mountains behind",
      mobileImageAlt:
        "Colorful hot air balloons drifting over the desert of Marrakech at sunrise with the Atlas mountains behind",
    },
    packages: {
      badge: "Marrakech Balloon Flights",
      note: "Children from 3 years old can fly with an adult.",
      noteLink: "Ask us on WhatsApp",
      noteSuffix: "for family pricing.",
      questionWa: "Hello! I have a question about balloon flights in Marrakech.",
      childrenNote: "Travelling with a child under 3?",
      childrenNoteLink: "Message us on WhatsApp",
      childrenNoteSuffix: "and we may have a solution for your family.",
      childrenWa:
        "Hello, I would like to book a hot air balloon flight with a child under 3 years old.\n\nDestination: Marrakech\nLanguage: English",
      lookingFor: "Looking for our main destination?",
      discoverLink: "Discover our Agadir flights over the Souss Valley",
    },
    offerCard: {
      ratingLine: "{rating} rated company on Google",
    },
    experience: {
      badgeCity: "Marrakech",
      badgeLabel: "Desert launch site",
      badge: "Flight Day",
      title: "How Your Marrakech Balloon Morning Works",
      text: "The same careful routine our team applies in Agadir, adapted to the desert launch area outside Marrakech: a dark early drive, a glowing inflation, a golden sunrise and a Berber breakfast to finish. A sunrise hot air balloon ride over Marrakech is one of the top things to do in the red city.",
      planCta: "Plan Your Marrakech Flight",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Marrakech From Above",
      description:
        "A glimpse of the landscapes, flights and mornings waiting for you in the skies of Marrakech.",
    },
    cta: {
      badge: "Ready for Adventure?",
      title: "Book Your Marrakech Sunrise Flight",
      text: "Send us a message today and fly over the desert landscapes around Marrakech and the Atlas mountains tomorrow morning. Our private hot air balloon flights in Marrakech can be booked directly on WhatsApp.",
      bookCta: "Book Your Marrakech Flight",
      discoverLink: "Discover Agadir Flights",
      imageAlt: "Hot air balloons floating over the desert of Marrakech at sunrise",
    },
    faq: {
      title: "Marrakech Flights FAQ",
      subtitle:
        "Everything you need to know before your balloon flight over Marrakech’s desert landscapes.",
      wa: "Hello! I have a question about the balloon flights in Marrakech.",
    },
    seo: {
      breadcrumbHome: "Home",
      breadcrumbSelf: "Marrakech Flights",
      productNameTemplate: "{name} in Marrakech",
    },
  },

  booking: {
    modalTitle: "Book Your Balloon Flight",
    modalDescription:
      "Select your details below and our team confirms availability with you directly on WhatsApp.",
    modalNote: "WhatsApp opens with your booking details ready to send.",
    dateLabel: "Select Date",
    dateAria: "Flight date",
    dateError: "Please select your preferred flight date.",
    packageLabel: "Package",
    packageAria: "Flight package",
    minGuestsOption: " (min {n} guests)",
    destinationLabel: "Destination",
    destinationAria: "Flight destination",
    guestsLabel: "Number of Guests",
    decreaseAria: "Remove one guest",
    increaseAria: "Add one guest",
    goToMarrakechButton: "Marrakech Flights",
    goToMarrakechNote:
      "Marrakech flights have their own dedicated page with separate offers and prices.",
    exploreMarrakech: "Explore Marrakech Flights",
    destinationAgadir: "Agadir (main)",
    destinationMarrakech: "Marrakech",
    trust: {
      googleReviews: "{rating} on Google Reviews",
      licensed: "Licensed pilots and full insurance",
      whatsapp: "Instant booking on WhatsApp",
      ratedCompany: "{rating} rated company on Google",
      samePilots: "Same licensed pilots as Agadir",
    },
    messages: {
      greeting: "Hello, I would like to check availability for a hot air balloon flight.",
      destinationLabel: "Destination:",
      packageLabel: "Package:",
      dateLabel: "Date:",
      guestsLabel: "Number of Guests:",
      priceLabel: "Price:",
      perPerson: "per person",
      totalLabel: "Total:",
      languageLabel: "Language:",
      confirm: "Could you please confirm availability?",
    },
  },

  contact: {
    title: "Contact Us",
    description:
      "Send us a message and our team replies directly to your email inbox. We answer 24 hours a day.",
    nameLabel: "Full Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "you@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "e.g. Sunrise flight for two in March",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your plans, questions or special requests...",
    errorName: "Please enter your full name.",
    errorEmailRequired: "Please enter your email address.",
    errorEmailInvalid: "Please enter a valid email address.",
    errorSubject: "Please enter a subject.",
    errorMessage: "Please enter your message.",
    successTitle: "Message sent successfully!",
    successText:
      "Thank you {name}, your message is on its way to our team. We will reply to {email} as soon as possible.",
    sendAnother: "Send Another Message",
    close: "Close",
    send: "Send Message",
    sending: "Sending...",
    deliveredTo: "Delivered securely to {email}",
    fallbackText:
      "We couldn’t send your email right now. Tap below to send the same message on WhatsApp. We reply 24 hours a day.",
    sendOnWhatsApp: "Send on WhatsApp",
    emailInstead: "Email us instead",
    mailtoSubject: "Website message",
    messageLabels: {
      greeting: "Hello, I’m contacting you from the website.",
      name: "Name:",
      email: "Email:",
      subject: "Subject:",
      message: "Message:",
      languageLabel: "Language:",
    },
  },

  reviews: {
    eyebrow: "Guest Reviews",
    titleAgadir: "What Our Guests Say",
    titleMarrakech: "What Our Marrakech Guests Say",
    viewOnGoogle: "View on Google",
    googleReviewsCount: "{n} Google reviews",
    onGoogleProfile: "on Google Business Profile",
    writeReview: "Write a Google Review",
    ratingBadgeAria:
      "Read our Google reviews, rated {rating} out of 5, opens in a new tab",
    reviewCardAria: "Read {name}'s review on Google",
    profileAria: "Open our Google Business Profile to read all reviews",
    summaryLabel: "Review summary",
    basedOnCount: "Based on {n} Google reviews",
    basedOnVerified: "Based on verified Google reviews",
    viewProfile: "View our Google Business Profile",
    flownWithUs: "Have you flown with us?",
    reviewHelps: "Your review helps other travelers choose their sunrise adventure.",
    showMore: "See more reviews",
    showLess: "Show less",
    readAllOnGoogle: "Read all reviews on Google",
    allOnGoogleTitle: "All of our guest reviews live on Google",
    allOnGoogleText:
      "Every review is published on our official Google Business Profile. Read them all there.",
    readOnGoogle: "Read our reviews on Google",
    bannerAlt: "Green and red hot air balloons inflating in the Moroccan desert at dawn",
    dates: {
      today: "today",
      yesterday: "yesterday",
      daysAgo: "{n} days ago",
      oneWeek: "1 week ago",
      weeksAgo: "{n} weeks ago",
      oneMonth: "1 month ago",
      monthsAgo: "{n} months ago",
      oneYear: "1 year ago",
      yearsAgo: "{n} years ago",
    },
  },

  weather: {
    liveOutlook: "Live Outlook",
    title: "7-Day Balloon Flight Probability",
    areaAgadir: "Agadir, Souss Valley launch area",
    areaMarrakech: "Marrakech, desert launch area",
    indicativeScores: "Indicative scores, always confirm on flight morning",
    estimateNote:
      "An indicative estimate only, never a guarantee of flight availability. Final approval always belongs to the pilot.",
    disclaimer:
      "Flight probability is an indicative weather estimate, not a flight guarantee. Final approval always depends on the pilot’s safety assessment.",
    statusLikely: "Likely",
    statusUncertain: "Uncertain",
    statusHighRisk: "High Risk",
    conditionsLabel: "Flight Conditions:",
    today: "Today",
    windLabel: "Wind",
    tempLabel: "Temp",
    humidityLabel: "Hum",
    gustsLabel: "Gusts",
    rainLabel: "Rain",
    notAvailable: "N/A",
    errorFetch: "The live weather forecast is temporarily unavailable, please try again shortly.",
    tryAgain: "Try again",
    staleNotice: "Live refresh failed just now, showing the last successful update from {time}.",
    updatedNotice:
      "Updated {time} · Live data from {source} · Refreshes automatically every 15 minutes",
    connecting: "Connecting to the live weather service",
    fullForecast: "Full Forecast & History",
    dialogTitle: "{city} Full Forecast & History",
    dialogDescription: "{city}, {area} · Live data from {source}, updated {time}.",
    next7Days: "The next 7 days",
    recentHistory: "Recent history, last {n} days",
    howScoreTitle: "How the score is calculated",
    howScoreBullets: [
      "Measured over the real ballooning window of each morning, 05:00 to 11:00 local time.",
      "Wind of 15 km/h or less and gusts of 28 km/h or less score full marks.",
      "Rain, storms and fog strongly reduce the score, exactly as they ground the balloons.",
      "From 55 the morning is Likely, from 35 it is Uncertain, below 35 it is High Risk.",
    ],
    howScoreNote:
      "Flight probability is an indicative estimate computed from public forecast data, never a guarantee of flight availability. Weather can change fast and the final flight approval always belongs to your licensed pilot on the morning of the flight.",
    tableHeaders: {
      day: "Day",
      score: "Score",
      conditions: "Conditions",
      wind: "Wind",
      gusts: "Gusts",
      temp: "Temp",
      humidity: "Humidity",
      rain: "Rain",
      sunrise: "Sunrise",
    },
    captionNext: "The next seven days",
    captionRecorded: "Recorded past days",
    captionSuffix: " with flight probability, wind, gusts, temperature, humidity and rain",
    recorded: "recorded",
    probabilityAria: "Flight probability {score} percent, {status}",
  },

  footer: {
    about:
      "Agadir based licensed sunrise hot air balloon flights over the Souss Valley. Same pilots, same safety, and a second launch site in Marrakech for our travelers.",
    whatsappUs: "WhatsApp us anytime",
    followTitle: "Follow Our Agadir Adventures",
    followText: "Real sunrise flights, real mornings over the Souss Valley.",
    quickLinksTitle: "Quick Links",
    quickLinks: {
      home: "Home",
      agadirFlights: "Agadir Flights",
      agadirExperience: "The Agadir Experience",
      gallery: "Gallery",
      guestReviews: "Guest Reviews",
      faq: "FAQ",
      marrakechFlights: "Marrakech Flights",
      flightDayExperience: "Flight Day Experience",
      agadirFlightsMain: "Agadir Flights (main destination)",
    },
    offersHomeTitle: "Agadir Flights | Main Destination",
    offersMarrakechSecondaryTitle: "Marrakech Flights | Also Available",
    offersMarrakechTitle: "Marrakech Flights",
    offerWaTemplate:
      "Hello! I would like to book the {name} in {city} ({price} per person). Please send me availability and pickup details.",
    inCity: "in {city}",
    supportTitle: "Support",
    guestReviews: "Guest Reviews",
    faq: "FAQ",
    bookYourFlight: "Book Your Flight",
    googleBusinessProfile: "Google Business Profile",
    sunriseDaily: "Sunrise flights daily",
    agadirLaunch: "Agadir: Souss Valley launch site, our home base.",
    marrakechLaunch: "Marrakech: desert launch site.",
    copyright: "© {year} {brand}. All rights reserved.",
    tagline: "Agadir sunrise balloon flights over the Souss Valley, Morocco.",
    hours: "Open 24 hours",
  },

  floating: {
    bookAria: "Book your balloon flight",
    callAria: "Call {phone}",
    call: "Call",
    bookOnWhatsApp: "Book on WhatsApp",
  },

  galleryGrid: {
    more: "See more",
    less: "See less",
    tileAria:
      "{caption}: see more photos and videos on our Google Business Profile (opens in a new tab)",
    imageAlt: "Gallery photo",
    videoAlt: "Gallery video clip",
  },

  social: {
    followAria: "Follow us on {name}, opens in a new tab",
    followTitle: "{name}, opens in a new tab",
  },

  consent: {
    ariaLabel: "Cookie consent",
    message: "We use analytics cookies to understand how visitors use our site. Accept?",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
  },
};
