import type { CityId, Faq, Offer } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import type { Locale } from "./config";

/**
 * THE translation contract.
 *
 * Dictionary = every UI string of the website (all hardcoded copy from the
 * components, collected in one plain, serializable object per language).
 * Dictionaries never contain functions: placeholders use "{name}" syntax
 * and are resolved with tpl() from ./format.
 *
 * SiteContent = the localized DATA of the site (offers, timeline, FAQs,
 * gallery alt text, WhatsApp messages...). English content re-exports the
 * objects of src/lib/site.ts directly, so the English rendering stays
 * byte for byte identical to the pre i18n site.
 */

export interface Dictionary {
  locale: Locale;

  common: {
    book: string;
    bookNow: string;
    from: string;
    perPerson: string;
    minBooking: string;
    checkAvailability: string;
    stillQuestion: string;
    askUs: string;
  };

  header: {
    logoAlt: string;
    logoAria: string;
    ratingOnGoogle: string;
    stripHome: string;
    stripMarrakech: string;
    open24: string;
    nav: {
      home: string;
      agadirFlights: string;
      marrakechFlights: string;
      experience: string;
      gallery: string;
      reviews: string;
      faq: string;
    };
    openMenu: string;
    menuTitle: string;
    menuDescription: string;
  };

  switcher: {
    triggerLabel: string;
  };

  home: {
    hero: {
      badge: string;
      titleLead: string;
      titleHighlight: string;
      text: string;
      bookCta: string;
      exploreCta: string;
      imageAlt: string;
      mobileImageAlt: string;
    };
    packages: {
      badge: string;
      title: string;
      text: string;
      launchSite: string;
      note: string;
      noteLink: string;
      noteSuffix: string;
      questionWa: string;
      /** Children under 3 note, rendered under the packages note. */
      childrenNote: string;
      childrenNoteLink: string;
      childrenNoteSuffix: string;
      /** Prefilled WhatsApp message of the children under 3 note link. */
      childrenWa: string;
    };
    offerCard: {
      cityChip: string;
      ratingLine: string;
    };
    whyUs: {
      badge: string;
      title: string;
      text: string;
    };
    experience: {
      slideBadgeTime: string;
      slideBadgeLabel: string;
      badge: string;
      title: string;
      text: string;
      planCta: string;
    };
    pickup: {
      title: string;
      text: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      badge: string;
      title: string;
      text: string;
      bookCta: string;
      exploreLink: string;
      followLabel: string;
      imageAlt: string;
    };
    faq: {
      title: string;
      subtitle: string;
      wa: string;
    };
    seo: {
      businessDescription: string;
      productNameTemplate: string;
    };
  };

  marrakech: {
    hero: {
      badge: string;
      titleLead: string;
      titleHighlight: string;
      bookCta: string;
      discoverCta: string;
      imageAlt: string;
      mobileImageAlt: string;
    };
    packages: {
      badge: string;
      note: string;
      noteLink: string;
      noteSuffix: string;
      questionWa: string;
      /** Children under 3 note, rendered under the packages note. */
      childrenNote: string;
      childrenNoteLink: string;
      childrenNoteSuffix: string;
      /** Prefilled WhatsApp message of the children under 3 note link. */
      childrenWa: string;
      lookingFor: string;
      discoverLink: string;
    };
    offerCard: {
      ratingLine: string;
    };
    experience: {
      badgeCity: string;
      badgeLabel: string;
      badge: string;
      title: string;
      text: string;
      planCta: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      badge: string;
      title: string;
      text: string;
      bookCta: string;
      discoverLink: string;
      imageAlt: string;
    };
    faq: {
      title: string;
      subtitle: string;
      wa: string;
    };
    seo: {
      breadcrumbHome: string;
      breadcrumbSelf: string;
      productNameTemplate: string;
    };
  };

  booking: {
    modalTitle: string;
    modalDescription: string;
    modalNote: string;
    dateLabel: string;
    dateAria: string;
    dateError: string;
    packageLabel: string;
    packageAria: string;
    minGuestsOption: string;
    destinationLabel: string;
    destinationAria: string;
    guestsLabel: string;
    decreaseAria: string;
    increaseAria: string;
    goToMarrakechButton: string;
    goToMarrakechNote: string;
    exploreMarrakech: string;
    destinationAgadir: string;
    destinationMarrakech: string;
    trust: {
      googleReviews: string;
      licensed: string;
      whatsapp: string;
      ratedCompany: string;
      samePilots: string;
    };
    /** Exact WhatsApp availability message, one builder for bar and modal. */
    messages: {
      greeting: string;
      destinationLabel: string;
      packageLabel: string;
      dateLabel: string;
      guestsLabel: string;
      priceLabel: string;
      /** "per person" / "par personne" — the localized "MAD" amount comes from formatPrice. */
      perPerson: string;
      totalLabel: string;
      languageLabel: string;
      confirm: string;
    };
  };

  contact: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    errorName: string;
    errorEmailRequired: string;
    errorEmailInvalid: string;
    errorSubject: string;
    errorMessage: string;
    successTitle: string;
    successText: string;
    sendAnother: string;
    close: string;
    send: string;
    sending: string;
    deliveredTo: string;
    fallbackText: string;
    sendOnWhatsApp: string;
    emailInstead: string;
    mailtoSubject: string;
    /** Field labels of the never lose the message fallback message. */
    messageLabels: {
      greeting: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      languageLabel: string;
    };
  };

  reviews: {
    eyebrow: string;
    titleAgadir: string;
    titleMarrakech: string;
    viewOnGoogle: string;
    googleReviewsCount: string;
    onGoogleProfile: string;
    writeReview: string;
    ratingBadgeAria: string;
    reviewCardAria: string;
    profileAria: string;
    summaryLabel: string;
    basedOnCount: string;
    basedOnVerified: string;
    viewProfile: string;
    flownWithUs: string;
    reviewHelps: string;
    showMore: string;
    showLess: string;
    readAllOnGoogle: string;
    allOnGoogleTitle: string;
    allOnGoogleText: string;
    readOnGoogle: string;
    bannerAlt: string;
    dates: {
      today: string;
      yesterday: string;
      daysAgo: string;
      oneWeek: string;
      weeksAgo: string;
      oneMonth: string;
      monthsAgo: string;
      oneYear: string;
      yearsAgo: string;
    };
  };

  weather: {
    liveOutlook: string;
    title: string;
    areaAgadir: string;
    areaMarrakech: string;
    indicativeScores: string;
    estimateNote: string;
    disclaimer: string;
    statusLikely: string;
    statusUncertain: string;
    statusHighRisk: string;
    conditionsLabel: string;
    today: string;
    windLabel: string;
    tempLabel: string;
    humidityLabel: string;
    gustsLabel: string;
    rainLabel: string;
    notAvailable: string;
    errorFetch: string;
    tryAgain: string;
    staleNotice: string;
    updatedNotice: string;
    connecting: string;
    fullForecast: string;
    dialogTitle: string;
    dialogDescription: string;
    next7Days: string;
    recentHistory: string;
    howScoreTitle: string;
    howScoreBullets: string[];
    howScoreNote: string;
    tableHeaders: {
      day: string;
      score: string;
      conditions: string;
      wind: string;
      gusts: string;
      temp: string;
      humidity: string;
      rain: string;
      sunrise: string;
    };
    captionNext: string;
    captionRecorded: string;
    captionSuffix: string;
    recorded: string;
    probabilityAria: string;
  };

  footer: {
    about: string;
    whatsappUs: string;
    followTitle: string;
    followText: string;
    quickLinksTitle: string;
    quickLinks: {
      home: string;
      agadirFlights: string;
      agadirExperience: string;
      gallery: string;
      guestReviews: string;
      faq: string;
      marrakechFlights: string;
      flightDayExperience: string;
      agadirFlightsMain: string;
    };
    offersHomeTitle: string;
    offersMarrakechSecondaryTitle: string;
    offersMarrakechTitle: string;
    /** WhatsApp message of the footer package links. {name} and {city} stay the real offer values, {price} is already localized. */
    offerWaTemplate: string;
    inCity: string;
    supportTitle: string;
    guestReviews: string;
    faq: string;
    bookYourFlight: string;
    googleBusinessProfile: string;
    sunriseDaily: string;
    agadirLaunch: string;
    marrakechLaunch: string;
    copyright: string;
    tagline: string;
    hours: string;
  };

  floating: {
    bookAria: string;
    callAria: string;
    call: string;
    bookOnWhatsApp: string;
  };

  galleryGrid: {
    more: string;
    less: string;
    tileAria: string;
    imageAlt: string;
    videoAlt: string;
  };

  social: {
    followAria: string;
    followTitle: string;
  };

  /** Analytics cookie consent banner + footer "Cookie settings" link. */
  consent: {
    ariaLabel: string;
    message: string;
    accept: string;
    reject: string;
    settings: string;
  };
}

/* ------------------------------------------------------------------ */
/* Localized site content                                              */
/* ------------------------------------------------------------------ */

export interface LocalizedStep {
  time?: string;
  title: string;
  text: string;
}

export interface LocalizedStat {
  value: string;
  label: string;
  icon: string;
}

export interface LocalizedWhy {
  icon: string;
  title: string;
  text: string;
}

export interface LocalizedPickupArea {
  name: string;
  note: string;
  included: boolean;
}

interface DestinationContentBase {
  /** Display name in this language ("Marrakech", "Marrakesch"...). */
  cityName: string;
  /** Internal booking destination key, never translated. */
  bookingDestination: "Agadir" | "Marrakech";
  launchSite: string;
  offers: Offer[];
  timeline: LocalizedStep[];
  faqs: Faq[];
  /** Footer / general WhatsApp interest message. */
  waMessage: string;
  /** FAQ section "Ask us on WhatsApp" message. */
  faqWaMessage: string;
}

export interface AgadirContent extends DestinationContentBase {
  stats: LocalizedStat[];
  whyUs: LocalizedWhy[];
  experienceSteps: LocalizedStep[];
  pickupAreas: LocalizedPickupArea[];
}

export interface MarrakechContent extends DestinationContentBase {
  /** Hero paragraph of the Marrakech page. Deliberately separate from the
   * packages intro (intro) so the hero and the packages section can never
   * share the same text again (owner fix 2026-11-22). */
  heroText: string;
  /** Packages section H2, deliberately different from the page H1. */
  packagesHeadline: string;
  /** Packages section intro paragraph, never rendered in the hero. */
  intro: string;
}

export interface SiteContent {
  locale: Locale;
  destinations: {
    agadir: AgadirContent;
    marrakech: MarrakechContent;
  };
  weatherNote: string;
  reviewHighlights: string[];
  /** Gallery collections with translated alt text and captions. */
  gallery: Record<CityId, GalleryItem[]>;
}

/* ------------------------------------------------------------------ */
/* Client subset                                                       */
/* ------------------------------------------------------------------ */

/**
 * The server components receive the FULL dictionary and content as props
 * from the pages. Only the CLIENT components consume the React context, and
 * they need just a small subset. Slimming the provider value keeps the
 * serialized RSC payload (the inline HTML of every prerendered page) small.
 */
export interface ClientDictionary {
  common: Dictionary["common"];
  header: Dictionary["header"];
  switcher: Dictionary["switcher"];
  home: Pick<Dictionary["home"], "hero">;
  marrakech: Pick<Dictionary["marrakech"], "hero">;
  booking: Dictionary["booking"];
  contact: Dictionary["contact"];
  reviews: Dictionary["reviews"];
  weather: Dictionary["weather"];
  floating: Dictionary["floating"];
  galleryGrid: Dictionary["galleryGrid"];
  social: Dictionary["social"];
  consent: Dictionary["consent"];
}

export interface ClientContent {
  destinations: {
    agadir: { cityName: string };
    marrakech: { cityName: string; heroText: string };
  };
  reviewHighlights: string[];
}

export interface I18nValue {
  locale: Locale;
  dict: ClientDictionary;
  content: ClientContent;
}
