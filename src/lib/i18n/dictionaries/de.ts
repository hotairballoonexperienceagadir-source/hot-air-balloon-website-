import type { Dictionary } from "../types";

/**
 * German dictionary (DE, Deutschland / DACH).
 * Ton: höfliche «Sie» Ansprache, warm und touristisch. «Marrakesch» als
 * deutsche Schreibweise (Eigentümer Entscheidung 2026-11-21). Die Namen der
 * Pakete bleiben englisch (Classic Flight, Private Flight, Royal Flight,
 * Classic Low Cost).
 */
export const de: Dictionary = {
  locale: "de",

  common: {
    book: "Buchen",
    bookNow: "Jetzt buchen",
    from: "Ab",
    perPerson: "/ Person",
    minBooking: "Mindestbuchung: {n} Personen",
    checkAvailability: "Verfügbarkeit prüfen",
    stillQuestion: "Noch eine Frage?",
    askUs: "Fragen Sie uns auf WhatsApp",
  },

  header: {
    logoAlt: "Hot Air Balloon Experience Agadir Logo",
    logoAria: "Hot Air Balloon Experience Agadir, Startseite",
    ratingOnGoogle: "{rating} auf Google",
    stripHome: "Ballonfahrten bei Sonnenaufgang über das Souss-Tal, Agadir",
    stripMarrakech: "Ballonfahrten in Marrakesch, durchgeführt von unserer Basis in Agadir",
    open24: "Rund um die Uhr geöffnet",
    nav: {
      home: "Startseite",
      agadirFlights: "Ballonfahrten Agadir",
      marrakechFlights: "Ballonfahrten Marrakesch",
      experience: "Erlebnis",
      gallery: "Galerie",
      reviews: "Bewertungen",
      faq: "FAQ",
    },
    openMenu: "Menü öffnen",
    menuTitle: "Menü",
    menuDescription: "Zu den Hauptbereichen der Website navigieren",
  },

  switcher: {
    triggerLabel: "Sprache wechseln, aktuelle Sprache: {name}",
  },

  home: {
    hero: {
      badge: "Agadir | Souss-Tal | Marokko",
      titleLead: "Erleben Sie die Magie einer Ballonfahrt in",
      titleHighlight: "Agadir",
      text: "Entdecken Sie die atemberaubende Schönheit des Souss-Tals von oben. Genießen Sie eine magische Ballonfahrt bei Sonnenaufgang, ein traditionelles berberisches Frühstück und unvergessliche Blicke auf das Atlasgebirge.",
      bookCta: "Ihre Agadir-Ballonfahrt buchen",
      exploreCta: "Unser Erlebnis entdecken",
      imageAlt:
        "Roter Heißluftballon bei Sonnenaufgang über dem Souss-Tal nahe Agadir, mit dem Atlasgebirge am Horizont und einer berberischen Loungelandschaft im Vordergrund",
      mobileImageAlt:
        "Roter Heißluftballon bei Sonnenaufgang über dem Souss-Tal nahe Agadir, mit einer berberischen Loungelandschaft im Vordergrund",
    },
    packages: {
      badge: "Ballonfahrt-Pakete in Agadir",
      title: "Unsere Ballonfahrten und Preise in Agadir",
      text: "Zwei Arten, den Sonnenaufgang über dem Souss-Tal zu erleben: unseren gemeinsamen Classic Flight oder das völlig private Erlebnis. Jede Fahrt beinhaltet die Abholung im Hotel in Agadir, den Willkommens-Tee, die Ballonfahrt und das berberische Frühstück.",
      launchSite: "Startplatz im Souss-Tal, ca. 50 Minuten bis 1 Stunde von der Innenstadt Agadirs entfernt",
      note: "Der Sonnenaufgang über dem Souss-Tal und die Panoramablicke auf das Atlasgebirge sind bei jeder Fahrt inklusive. Kinder ab 3 Jahren dürfen in Begleitung eines Erwachsenen mitfliegen.",
      noteLink: "Fragen Sie uns auf WhatsApp",
      noteSuffix: "für Familientarife.",
      questionWa: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Agadir.",
      childrenNote: "Sie reisen mit einem Kind unter 3 Jahren?",
      childrenNoteLink: "Schreiben Sie uns auf WhatsApp",
      childrenNoteSuffix: "und vielleicht haben wir eine Lösung für Ihre Familie.",
      childrenWa:
        "Hallo, ich möchte eine Ballonfahrt mit einem Kind unter 3 Jahren buchen.\n\nDestination: Agadir\nLanguage: German",
    },
    offerCard: {
      cityChip: "{city} | Souss-Tal",
      ratingLine: "{rating} auf Google bewertet",
    },
    whyUs: {
      badge: "Warum wir",
      title: "Warum unser Agadir-Erlebnis wählen",
      text: "Von den Ballons, die wir fliegen, bis zur Crew, die wir ausbilden: Jede Entscheidung dreht sich um Ihre Sicherheit und Ihren Morgen über dem Souss-Tal.",
    },
    experience: {
      slideBadgeTime: "04:00 bis 05:00",
      slideBadgeLabel: "Hotelabholung",
      badge: "Das Erlebnis",
      title: "So läuft Ihr Ballonmorgen in Agadir",
      text: "Vom ersten Klopfen an Ihrer Hoteltür vor Morgengrauen bis zum letzten Schluck Minzentee im Caïdal-Zelt: Das ist die vollständige Reise, die wir mit Ihnen über dem Souss-Tal teilen.",
      planCta: "Ihre Fahrt planen",
    },
    pickup: {
      title: "Hotelabholung und Transport in Agadir",
      text: "Der Hin- und Rücktransport von Ihrem Hotel ist bei jeder Agadir-Fahrt in der Stadt Agadir, in Taghazout und in Tamraght inklusive.",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Agadir und das Souss-Tal von oben",
      description:
        "Ein Vorgeschmack auf die Landschaften, Flüge und Morgen, die in den Lüften über Agadir auf Sie warten.",
    },
    cta: {
      badge: "Bereit für das Abenteuer?",
      title: "Buchen Sie noch heute Ihre Ballonfahrt in Agadir",
      text: "Verpassen Sie nicht das Erlebnis Ihres Lebens. Schicken Sie uns noch heute eine Nachricht und fliegen Sie morgen früh bei Sonnenaufgang über das Souss-Tal.",
      bookCta: "Ihre Agadir-Ballonfahrt buchen",
      exploreLink: "Marrakesch-Fahrten entdecken",
      followLabel: "Folgen Sie unseren Agadir-Abenteuern",
      imageAlt: "Heißluftballons über dem Souss-Tal nahe Agadir beim goldenen Sonnenaufgang",
    },
    faq: {
      title: "Häufige Fragen",
      subtitle:
        "Alles, was Sie vor Ihrer Ballonfahrt über dem Souss-Tal in Agadir wissen müssen.",
      wa: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Agadir.",
    },
    seo: {
      businessDescription:
        "Lizenzierte Heißluftballonfahrten bei Sonnenaufgang in Agadir, über dem Souss-Tal und dem Atlasgebirge.",
      productNameTemplate: "{name} in Agadir",
    },
  },

  marrakech: {
    hero: {
      badge: "Zweites Reiseziel | Betrieben von unserer Basis in Agadir",
      titleLead: "Ballonfahrten mit dem Heißluftballon in",
      titleHighlight: "Marrakesch",
      bookCta: "Ihre Marrakesch-Ballonfahrt buchen",
      discoverCta: "Unsere Agadir-Fahrten entdecken",
      imageAlt:
        "Bunte Heißluftballons bei Sonnenaufgang über der Wüste von Marrakesch, dahinter das Atlasgebirge",
      mobileImageAlt:
        "Bunte Heißluftballons bei Sonnenaufgang über der Wüste von Marrakesch, dahinter das Atlasgebirge",
    },
    packages: {
      badge: "Ballonfahrten in Marrakesch",
      note: "Kinder ab 3 Jahren dürfen in Begleitung eines Erwachsenen mitfliegen.",
      noteLink: "Fragen Sie uns auf WhatsApp",
      noteSuffix: "für Familientarife.",
      questionWa: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Marrakesch.",
      childrenNote: "Sie reisen mit einem Kind unter 3 Jahren?",
      childrenNoteLink: "Schreiben Sie uns auf WhatsApp",
      childrenNoteSuffix: "und vielleicht haben wir eine Lösung für Ihre Familie.",
      childrenWa:
        "Hallo, ich möchte eine Ballonfahrt mit einem Kind unter 3 Jahren buchen.\n\nDestination: Marrakesch\nLanguage: German",
      lookingFor: "Suchen Sie unser Hauptreiseziel?",
      discoverLink: "Entdecken Sie unsere Agadir-Ballonfahrten über dem Souss-Tal",
    },
    offerCard: {
      ratingLine: "Unternehmen mit {rating} auf Google bewertet",
    },
    experience: {
      badgeCity: "Marrakesch",
      badgeLabel: "Startplatz in der Wüste",
      badge: "Fahrttag",
      title: "So läuft Ihr Ballonmorgen in Marrakesch",
      text: "Dieselbe sorgfältige Routine, die unser Team in Agadir anwendet, angepasst an den Wüstenstartplatz vor Marrakesch: eine frühe Fahrt im Dunkeln, eine leuchtende Ballonbereitung, ein goldener Sonnenaufgang und ein berberisches Frühstück zum Abschluss.",
      planCta: "Ihre Marrakesch-Fahrt planen",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Marrakesch von oben",
      description:
        "Ein Vorgeschmack auf die Landschaften, Flüge und Morgen, die in den Lüften über Marrakesch auf Sie warten.",
    },
    cta: {
      badge: "Bereit für das Abenteuer?",
      title: "Buchen Sie Ihre Sonnenaufgangsfahrt in Marrakesch",
      text: "Schicken Sie uns noch heute eine Nachricht und fliegen Sie morgen früh über die Wüstenlandschaften rund um Marrakesch und das Atlasgebirge.",
      bookCta: "Ihre Marrakesch-Ballonfahrt buchen",
      discoverLink: "Agadir-Fahrten entdecken",
      imageAlt: "Heißluftballons über der Wüste von Marrakesch bei Sonnenaufgang",
    },
    faq: {
      title: "FAQ zu den Marrakesch-Fahrten",
      subtitle:
        "Alles, was Sie vor Ihrer Ballonfahrt über den Wüstenlandschaften von Marrakesch wissen müssen.",
      wa: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Marrakesch.",
    },
    seo: {
      breadcrumbHome: "Startseite",
      breadcrumbSelf: "Marrakesch-Fahrten",
      productNameTemplate: "{name} in Marrakesch",
    },
  },

  booking: {
    modalTitle: "Ihre Ballonfahrt buchen",
    modalDescription:
      "Wählen Sie unten Ihre Details aus, und unser Team bestätigt die Verfügbarkeit direkt mit Ihnen über WhatsApp.",
    modalNote: "WhatsApp öffnet sich mit Ihren Buchungsdaten, bereit zum Senden.",
    dateLabel: "Datum wählen",
    dateAria: "Flugdatum",
    dateError: "Bitte wählen Sie Ihr Wunschdatum für die Ballonfahrt.",
    packageLabel: "Paket",
    packageAria: "Ballonfahrt-Paket",
    minGuestsOption: " (min. {n} Gäste)",
    destinationLabel: "Reiseziel",
    destinationAria: "Reiseziel der Ballonfahrt",
    guestsLabel: "Anzahl der Gäste",
    decreaseAria: "Einen Gast entfernen",
    increaseAria: "Einen Gast hinzufügen",
    goToMarrakechButton: "Marrakesch-Fahrten",
    goToMarrakechNote:
      "Die Ballonfahrten in Marrakesch haben eine eigene Seite mit eigenen Paketen und Preisen.",
    exploreMarrakech: "Marrakesch-Fahrten entdecken",
    destinationAgadir: "Agadir (Hauptziel)",
    destinationMarrakech: "Marrakesch",
    trust: {
      googleReviews: "{rating} bei Google-Bewertungen",
      licensed: "Lizenzierte Piloten und Vollversicherung",
      whatsapp: "Sofortige Buchung über WhatsApp",
      ratedCompany: "Unternehmen mit {rating} auf Google bewertet",
      samePilots: "Dieselben lizenzierten Piloten wie in Agadir",
    },
    messages: {
      greeting: "Hallo, ich möchte die Verfügbarkeit für eine Ballonfahrt mit dem Heißluftballon prüfen.",
      destinationLabel: "Ziel:",
      packageLabel: "Paket:",
      dateLabel: "Datum:",
      guestsLabel: "Anzahl der Gäste:",
      priceLabel: "Preis:",
      perPerson: "pro Person",
      totalLabel: "Gesamt:",
      languageLabel: "Language:",
      confirm: "Könnten Sie bitte die Verfügbarkeit bestätigen?",
    },
  },

  contact: {
    title: "Kontakt",
    description:
      "Schicken Sie uns eine Nachricht, und unser Team antwortet direkt in Ihr E-Mail Postfach. Wir antworten rund um die Uhr.",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "Ihr vollständiger Name",
    emailLabel: "E-Mail Adresse",
    emailPlaceholder: "sie@beispiel.de",
    subjectLabel: "Betreff",
    subjectPlaceholder: "z. B. Sonnenaufgangsfahrt für zwei im März",
    messageLabel: "Nachricht",
    messagePlaceholder: "Erzählen Sie uns von Ihren Plänen, Fragen oder besonderen Wünschen...",
    errorName: "Bitte geben Sie Ihren vollständigen Namen ein.",
    errorEmailRequired: "Bitte geben Sie Ihre E-Mail Adresse ein.",
    errorEmailInvalid: "Bitte geben Sie eine gültige E-Mail Adresse ein.",
    errorSubject: "Bitte geben Sie einen Betreff ein.",
    errorMessage: "Bitte geben Sie Ihre Nachricht ein.",
    successTitle: "Nachricht erfolgreich gesendet!",
    successText:
      "Danke {name}, Ihre Nachricht ist unterwegs zu unserem Team. Wir antworten Ihnen so schnell wie möglich an {email}.",
    sendAnother: "Weitere Nachricht senden",
    close: "Schließen",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    deliveredTo: "Sicher zugestellt an {email}",
    fallbackText:
      "Ihre E-Mail konnte gerade nicht gesendet werden. Tippen Sie unten, um dieselbe Nachricht über WhatsApp zu senden. Wir antworten rund um die Uhr.",
    sendOnWhatsApp: "Auf WhatsApp senden",
    emailInstead: "Stattdessen per E-Mail schreiben",
    mailtoSubject: "Nachricht über die Website",
    messageLabels: {
      greeting: "Hallo, ich kontaktiere Sie über die Website.",
      name: "Name:",
      email: "E-Mail:",
      subject: "Betreff:",
      message: "Nachricht:",
      languageLabel: "Language:",
    },
  },

  reviews: {
    eyebrow: "Gästebewertungen",
    titleAgadir: "Was unsere Gäste sagen",
    titleMarrakech: "Was unsere Marrakesch-Gäste sagen",
    viewOnGoogle: "Auf Google ansehen",
    googleReviewsCount: "{n} Google-Bewertungen",
    onGoogleProfile: "auf dem Google Business Profil",
    writeReview: "Eine Google-Bewertung schreiben",
    ratingBadgeAria:
      "Lesen Sie unsere Google-Bewertungen, bewertet mit {rating} von 5, öffnet sich in einem neuen Tab",
    reviewCardAria: "Die Bewertung von {name} auf Google lesen",
    profileAria: "Unser Google Business Profil öffnen, um alle Bewertungen zu lesen",
    summaryLabel: "Bewertungsübersicht",
    basedOnCount: "Basierend auf {n} Google-Bewertungen",
    basedOnVerified: "Basierend auf verifizierten Google-Bewertungen",
    viewProfile: "Unser Google Business Profil ansehen",
    flownWithUs: "Waren Sie schon mit uns in der Luft?",
    reviewHelps: "Ihre Bewertung hilft anderen Reisenden bei der Wahl ihres Sonnenaufgangsabenteuers.",
    showMore: "Mehr Bewertungen anzeigen",
    showLess: "Weniger anzeigen",
    readAllOnGoogle: "Alle Bewertungen auf Google lesen",
    allOnGoogleTitle: "Alle unsere Gästebewertungen finden Sie auf Google",
    allOnGoogleText:
      "Jede Bewertung wird auf unserem offiziellen Google Business Profil veröffentlicht. Lesen Sie sie alle dort.",
    readOnGoogle: "Unsere Bewertungen auf Google lesen",
    bannerAlt: "Grüne und rote Heißluftballons, die in der marokkanischen Wüste in der Dämmerung mit heißer Luft gefüllt werden",
    dates: {
      today: "heute",
      yesterday: "gestern",
      daysAgo: "vor {n} Tagen",
      oneWeek: "vor 1 Woche",
      weeksAgo: "vor {n} Wochen",
      oneMonth: "vor 1 Monat",
      monthsAgo: "vor {n} Monaten",
      oneYear: "vor 1 Jahr",
      yearsAgo: "vor {n} Jahren",
    },
  },

  weather: {
    liveOutlook: "Live-Ausblick",
    title: "Ballonfahrten-Wahrscheinlichkeit für 7 Tage",
    areaAgadir: "Agadir, Startgebiet im Souss-Tal",
    areaMarrakech: "Marrakesch, Startgebiet in der Wüste",
    indicativeScores: "Indikative Werte, bitte bestätigen Sie immer am Morgen der Fahrt",
    estimateNote:
      "Nur eine indikative Schätzung, niemals eine Garantie für die Verfügbarkeit der Ballonfahrt. Die endgültige Freigabe liegt immer beim Piloten.",
    disclaimer:
      "Die Flugwahrscheinlichkeit ist eine indikative Wettereinschätzung, keine Fahrtgarantie. Die endgültige Freigabe hängt immer von der Sicherheitsbewertung des Piloten ab.",
    statusLikely: "Wahrscheinlich",
    statusUncertain: "Unsicher",
    statusHighRisk: "Hohes Risiko",
    conditionsLabel: "Flugbedingungen:",
    today: "Heute",
    windLabel: "Wind",
    tempLabel: "Temp.",
    humidityLabel: "Feuchte",
    gustsLabel: "Böen",
    rainLabel: "Regen",
    notAvailable: "k. A.",
    errorFetch: "Die Live-Wettervorhersage ist vorübergehend nicht verfügbar, bitte versuchen Sie es in Kürze erneut.",
    tryAgain: "Erneut versuchen",
    staleNotice: "Die Live-Aktualisierung ist gerade fehlgeschlagen; es wird die letzte erfolgreiche Aktualisierung von {time} angezeigt.",
    updatedNotice:
      "Aktualisiert um {time} · Live-Daten von {source} · Aktualisiert sich automatisch alle 15 Minuten",
    connecting: "Verbindung zum Live-Wetterservice",
    fullForecast: "Komplette Vorhersage & Verlauf",
    dialogTitle: "{city}: komplette Vorhersage & Verlauf",
    dialogDescription: "{city}, {area} · Live-Daten von {source}, aktualisiert um {time}.",
    next7Days: "Die nächsten 7 Tage",
    recentHistory: "Historie der letzten {n} Tage",
    howScoreTitle: "Wie der Score berechnet wird",
    howScoreBullets: [
      "Gemessen über das echte Zeitfenster jedes Vormittags, 05:00 bis 11:00 Ortszeit.",
      "Wind von höchstens 15 km/h und Böen von höchstens 28 km/h erhalten die volle Punktzahl.",
      "Regen, Stürme und Nebel senken den Score stark, genau so, wie sie die Ballons am Boden halten.",
      "Ab 55 ist der Morgen Wahrscheinlich, ab 35 Unsicher, unter 35 Hohes Risiko.",
    ],
    howScoreNote:
      "Die Flugwahrscheinlichkeit ist eine indikative Schätzung aus öffentlichen Vorhersagedaten, niemals eine Garantie für die Verfügbarkeit der Ballonfahrt. Das Wetter kann sich schnell ändern, und die endgültige Freigabe gehört immer Ihrem lizenzierten Piloten am Morgen der Fahrt.",
    tableHeaders: {
      day: "Tag",
      score: "Score",
      conditions: "Bedingungen",
      wind: "Wind",
      gusts: "Böen",
      temp: "Temp.",
      humidity: "Luftfeuchte",
      rain: "Regen",
      sunrise: "Sonnenaufgang",
    },
    captionNext: "Die nächsten sieben Tage",
    captionRecorded: "Aufgezeichnete vergangene Tage",
    captionSuffix: " mit Flugwahrscheinlichkeit, Wind, Böen, Temperatur, Luftfeuchte und Regen",
    recorded: "aufgezeichnet",
    probabilityAria: "Flugwahrscheinlichkeit {score} Prozent, {status}",
  },

  footer: {
    about:
      "Lizenzierte Heißluftballonfahrten bei Sonnenaufgang über dem Souss-Tal, ab Agadir. Dieselben Piloten, dieselbe Sicherheit und ein zweiter Startplatz in Marrakesch für unsere Reisenden.",
    whatsappUs: "Schreiben Sie uns jederzeit auf WhatsApp",
    followTitle: "Folgen Sie unseren Agadir-Abenteuern",
    followText: "Echte Sonnenaufgangsflüge, echte Morgen über dem Souss-Tal.",
    quickLinksTitle: "Schnellzugriffe",
    quickLinks: {
      home: "Startseite",
      agadirFlights: "Ballonfahrten Agadir",
      agadirExperience: "Das Agadir-Erlebnis",
      gallery: "Galerie",
      guestReviews: "Gästebewertungen",
      faq: "FAQ",
      marrakechFlights: "Ballonfahrten Marrakesch",
      flightDayExperience: "Der Fahrttag",
      agadirFlightsMain: "Ballonfahrten Agadir (Hauptreiseziel)",
    },
    offersHomeTitle: "Ballonfahrten Agadir | Hauptreiseziel",
    offersMarrakechSecondaryTitle: "Ballonfahrten Marrakesch | Ebenfalls verfügbar",
    offersMarrakechTitle: "Ballonfahrten Marrakesch",
    offerWaTemplate:
      "Hallo! Ich möchte das Paket {name} in {city} ({price} pro Person) buchen. Bitte senden Sie mir Verfügbarkeit und Abholdetails.",
    inCity: "in {city}",
    supportTitle: "Hilfe",
    guestReviews: "Gästebewertungen",
    faq: "FAQ",
    bookYourFlight: "Ihre Ballonfahrt buchen",
    googleBusinessProfile: "Google Business Profil",
    sunriseDaily: "Tägliche Ballonfahrten bei Sonnenaufgang",
    agadirLaunch: "Agadir: Startplatz im Souss-Tal, unsere Heimbasis.",
    marrakechLaunch: "Marrakesch: Startplatz in der Wüste.",
    copyright: "© {year} {brand}. Alle Rechte vorbehalten.",
    tagline: "Ballonfahrten bei Sonnenaufgang ab Agadir über dem Souss-Tal, Marokko.",
    hours: "Rund um die Uhr geöffnet",
  },

  floating: {
    bookAria: "Ihre Ballonfahrt buchen",
    callAria: "{phone} anrufen",
    call: "Anrufen",
    bookOnWhatsApp: "Auf WhatsApp buchen",
  },

  galleryGrid: {
    more: "Mehr anzeigen",
    less: "Weniger anzeigen",
    tileAria:
      "{caption}: weitere Fotos und Videos auf unserem Google Business Profil ansehen (öffnet in neuem Tab)",
    imageAlt: "Galeriefoto",
    videoAlt: "Galerievideoclip",
  },

  social: {
    followAria: "Folgen Sie uns auf {name}, öffnet sich in einem neuen Tab",
    followTitle: "{name}, öffnet sich in einem neuen Tab",
  },
};
