import type { Dictionary } from "../types";

/**
 * French dictionary (FR, France / Maroc francophone).
 * Ton : « vous », chaleureux et touristique. Apostrophes U+2019.
 * Les noms des formules restent en anglais (décision du propriétaire).
 */
export const fr: Dictionary = {
  locale: "fr",

  common: {
    book: "Réserver",
    bookNow: "Réserver",
    from: "À partir de",
    perPerson: "/ personne",
    minBooking: "Réservation minimum : {n} personnes",
    checkAvailability: "Vérifier la disponibilité",
    stillQuestion: "Une autre question ?",
    askUs: "Posez-nous vos questions sur WhatsApp",
  },

  header: {
    logoAlt: "Logo Hot Air Balloon Experience Agadir",
    logoAria: "Hot Air Balloon Experience Agadir, accueil",
    ratingOnGoogle: "{rating} sur Google",
    stripHome: "Vols en montgolfière au lever du soleil sur la vallée du Souss, Agadir",
    stripMarrakech: "Vols à Marrakech assurés par notre base d’Agadir",
    open24: "Ouvert 24 heures sur 24",
    nav: {
      home: "Accueil",
      agadirFlights: "Vols Agadir",
      marrakechFlights: "Vols Marrakech",
      experience: "L’expérience",
      gallery: "Galerie",
      reviews: "Avis",
      faq: "FAQ",
    },
    openMenu: "Ouvrir le menu",
    menuTitle: "Menu",
    menuDescription: "Accéder aux principales sections du site",
  },

  switcher: {
    triggerLabel: "Changer de langue, langue actuelle : {name}",
  },

  home: {
    hero: {
      badge: "Agadir | Vallée du Souss | Maroc",
      titleLead: "Vivez la magie d’un vol en montgolfière à",
      titleHighlight: "Agadir",
      text: "Découvrez la beauté à couper le souffle de la vallée du Souss vue du ciel. Profitez d’un vol magique au lever du soleil, d’un petit-déjeuner berbère traditionnel et de vues inoubliables sur les montagnes de l’Atlas.",
      bookCta: "Réserver votre vol à Agadir",
      exploreCta: "Découvrir l’expérience",
      imageAlt:
        "Montgolfière rouge flottant au lever du soleil au-dessus de la vallée du Souss près d’Agadir, avec les montagnes de l’Atlas à l’horizon et un salon berbère au premier plan",
      mobileImageAlt:
        "Montgolfière rouge flottant au lever du soleil au-dessus de la vallée du Souss près d’Agadir, avec un salon berbère au premier plan",
    },
    packages: {
      badge: "Formules de vol en montgolfière à Agadir",
      title: "Nos formules et tarifs de vol à Agadir",
      text: "Deux façons de vivre le lever du soleil sur la vallée du Souss : notre Classic Flight en groupe restreint ou l’expérience entièrement privée. Chaque vol comprend la prise en charge à votre hôtel à Agadir, le thé de bienvenue, le vol et le petit-déjeuner berbère.",
      launchSite: "Site de décollage dans la vallée du Souss, à environ 50 minutes à 1 heure du centre d’Agadir",
      note: "Le lever du soleil sur la vallée du Souss et les panoramas sur les montagnes de l’Atlas sont inclus dans chaque vol. Les enfants à partir de 3 ans peuvent voler accompagnés d’un adulte.",
      noteLink: "Demandez-nous sur WhatsApp",
      noteSuffix: "pour les tarifs famille.",
      questionWa: "Bonjour ! J’ai une question sur les vols en montgolfière à Agadir.",
    },
    offerCard: {
      cityChip: "{city} | Vallée du Souss",
      ratingLine: "{rating} sur Google",
    },
    whyUs: {
      badge: "Pourquoi nous choisir",
      title: "Pourquoi choisir notre expérience à Agadir",
      text: "Des montgolfières que nous pilotons à l’équipage que nous formons, chaque décision est pensée pour votre sécurité et pour votre matinée au-dessus de la vallée du Souss.",
    },
    experience: {
      slideBadgeTime: "De 04:00 à 05:00",
      slideBadgeLabel: "Prise en charge à l’hôtel",
      badge: "L’expérience",
      title: "Comment se déroule votre matinée en montgolfière à Agadir",
      text: "Du premier coup de sonnette à votre hôtel avant l’aube à la dernière gorgée de thé à la menthe sous la tente caïdale, voici le parcours complet que nous partageons avec vous au-dessus de la vallée du Souss.",
      planCta: "Préparer votre vol",
    },
    pickup: {
      title: "Prise en charge et transport à Agadir",
      text: "Le transport aller-retour depuis votre hôtel est inclus dans chaque vol à Agadir, dans la ville d’Agadir, à Taghazout et à Tamraght.",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Agadir et la vallée du Souss vus du ciel",
      description:
        "Un aperçu des paysages, des vols et des matinées qui vous attendent dans les airs au-dessus d’Agadir.",
    },
    cta: {
      badge: "Prêt pour l’aventure ?",
      title: "Réservez votre vol en montgolfière à Agadir dès aujourd’hui",
      text: "Ne manquez pas l’expérience d’une vie. Envoyez-nous un message dès aujourd’hui et survolez la vallée du Souss au lever du soleil demain matin.",
      bookCta: "Réserver votre vol à Agadir",
      exploreLink: "Découvrir les vols à Marrakech",
      followLabel: "Suivez nos aventures à Agadir",
      imageAlt: "Montgolfières survolant la vallée du Souss près d’Agadir au lever du soleil doré",
    },
    faq: {
      title: "Questions fréquentes",
      subtitle:
        "Tout ce qu’il faut savoir avant votre vol en montgolfière au-dessus de la vallée du Souss à Agadir.",
      wa: "Bonjour ! J’ai une question sur les vols en montgolfière à Agadir.",
    },
    seo: {
      businessDescription:
        "Vols en montgolfière au lever du soleil à Agadir, avec licence, au-dessus de la vallée du Souss et des montagnes de l’Atlas.",
      productNameTemplate: "{name} à Agadir",
    },
  },

  marrakech: {
    hero: {
      badge: "Seconde destination | Opérée depuis notre base d’Agadir",
      titleLead: "Vols en montgolfière à",
      titleHighlight: "Marrakech",
      bookCta: "Réserver votre vol à Marrakech",
      discoverCta: "Découvrir nos vols à Agadir",
      imageAlt:
        "Montgolfières colorées survolant le désert de Marrakech au lever du soleil avec les montagnes de l’Atlas en arrière-plan",
      mobileImageAlt:
        "Montgolfières colorées survolant le désert de Marrakech au lever du soleil avec les montagnes de l’Atlas en arrière-plan",
    },
    packages: {
      badge: "Vols en montgolfière à Marrakech",
      note: "Les enfants à partir de 3 ans peuvent voler accompagnés d’un adulte.",
      noteLink: "Demandez-nous sur WhatsApp",
      noteSuffix: "pour les tarifs famille.",
      questionWa: "Bonjour ! J’ai une question sur les vols en montgolfière à Marrakech.",
      lookingFor: "Vous cherchez notre destination principale ?",
      discoverLink: "Découvrez nos vols à Agadir au-dessus de la vallée du Souss",
    },
    offerCard: {
      ratingLine: "Compagnie notée {rating} sur Google",
    },
    experience: {
      badgeCity: "Marrakech",
      badgeLabel: "Site de décollage dans le désert",
      badge: "Jour de vol",
      title: "Comment se déroule votre matinée en montgolfière à Marrakech",
      text: "La même routine minutieuse que notre équipe applique à Agadir, adaptée au site de décollage du désert aux portes de Marrakech : un trajet matinal dans la nuit noire, un gonflage lumineux, un lever de soleil doré et un petit-déjeuner berbère pour terminer.",
      planCta: "Préparer votre vol à Marrakech",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Marrakech vue du ciel",
      description:
        "Un aperçu des paysages, des vols et des matinées qui vous attendent dans les airs au-dessus de Marrakech.",
    },
    cta: {
      badge: "Prêt pour l’aventure ?",
      title: "Réservez votre vol au lever du soleil à Marrakech",
      text: "Envoyez-nous un message dès aujourd’hui et survolez demain matin les paysages désertiques autour de Marrakech et les montagnes de l’Atlas.",
      bookCta: "Réserver votre vol à Marrakech",
      discoverLink: "Découvrir les vols à Agadir",
      imageAlt: "Montgolfières flottant au-dessus du désert de Marrakech au lever du soleil",
    },
    faq: {
      title: "FAQ des vols à Marrakech",
      subtitle:
        "Tout ce qu’il faut savoir avant votre vol en montgolfière au-dessus des paysages désertiques de Marrakech.",
      wa: "Bonjour ! J’ai une question sur les vols en montgolfière à Marrakech.",
    },
    seo: {
      breadcrumbHome: "Accueil",
      breadcrumbSelf: "Vols à Marrakech",
      productNameTemplate: "{name} à Marrakech",
    },
  },

  booking: {
    modalTitle: "Réservez votre vol en montgolfière",
    modalDescription:
      "Sélectionnez vos informations ci-dessous et notre équipe vous confirme la disponibilité directement sur WhatsApp.",
    modalNote: "WhatsApp s’ouvre avec les détails de votre réservation prêts à être envoyés.",
    dateLabel: "Choisir une date",
    dateAria: "Date du vol",
    dateError: "Veuillez choisir votre date de vol préférée.",
    packageLabel: "Formule",
    packageAria: "Formule de vol",
    minGuestsOption: " (min {n} pers.)",
    destinationLabel: "Destination",
    destinationAria: "Destination du vol",
    guestsLabel: "Nombre de personnes",
    decreaseAria: "Retirer une personne",
    increaseAria: "Ajouter une personne",
    goToMarrakechButton: "Vols à Marrakech",
    goToMarrakechNote:
      "Les vols à Marrakech ont leur propre page dédiée, avec des formules et des tarifs séparés.",
    exploreMarrakech: "Découvrir les vols à Marrakech",
    destinationAgadir: "Agadir (principale)",
    destinationMarrakech: "Marrakech",
    trust: {
      googleReviews: "{rating} sur les avis Google",
      licensed: "Pilotes licenciés et assurance complète",
      whatsapp: "Réservation instantanée sur WhatsApp",
      ratedCompany: "Compagnie notée {rating} sur Google",
      samePilots: "Les mêmes pilotes licenciés qu’à Agadir",
    },
    messages: {
      greeting: "Bonjour, je souhaite vérifier la disponibilité pour un vol en montgolfière.",
      destinationLabel: "Destination :",
      packageLabel: "Formule :",
      dateLabel: "Date :",
      guestsLabel: "Nombre de personnes :",
      priceLabel: "Prix :",
      perPerson: "par personne",
      totalLabel: "Total :",
      languageLabel: "Language:",
      confirm: "Pourriez-vous nous confirmer la disponibilité, s’il vous plaît ?",
    },
  },

  contact: {
    title: "Nous contacter",
    description:
      "Envoyez-nous un message et notre équipe vous répond directement dans votre boîte mail. Nous répondons 24 heures sur 24.",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom complet",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    subjectLabel: "Objet",
    subjectPlaceholder: "ex. Vol au lever du soleil pour deux en mars",
    messageLabel: "Message",
    messagePlaceholder: "Parlez-nous de vos projets, questions ou demandes particulières...",
    errorName: "Veuillez saisir votre nom complet.",
    errorEmailRequired: "Veuillez saisir votre adresse e-mail.",
    errorEmailInvalid: "Veuillez saisir une adresse e-mail valide.",
    errorSubject: "Veuillez saisir un objet.",
    errorMessage: "Veuillez saisir votre message.",
    successTitle: "Message envoyé avec succès !",
    successText:
      "Merci {name}, votre message est en route vers notre équipe. Nous vous répondrons à {email} dès que possible.",
    sendAnother: "Envoyer un autre message",
    close: "Fermer",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
    deliveredTo: "Livré en toute sécurité à {email}",
    fallbackText:
      "Nous n’avons pas pu envoyer votre e-mail pour le moment. Appuyez ci-dessous pour envoyer le même message sur WhatsApp. Nous répondons 24 heures sur 24.",
    sendOnWhatsApp: "Envoyer sur WhatsApp",
    emailInstead: "Nous écrire par e-mail plutôt",
    mailtoSubject: "Message du site web",
    messageLabels: {
      greeting: "Bonjour, je vous contacte depuis le site web.",
      name: "Nom :",
      email: "E-mail :",
      subject: "Objet :",
      message: "Message :",
      languageLabel: "Language:",
    },
  },

  reviews: {
    eyebrow: "Avis des voyageurs",
    titleAgadir: "Ce que disent nos voyageurs",
    titleMarrakech: "Ce que disent nos voyageurs à Marrakech",
    viewOnGoogle: "Voir sur Google",
    googleReviewsCount: "{n} avis Google",
    onGoogleProfile: "sur la fiche Google Business Profile",
    writeReview: "Écrire un avis sur Google",
    ratingBadgeAria: "Lisez nos avis Google, notés {rating} sur 5, s’ouvre dans un nouvel onglet",
    reviewCardAria: "Lire l’avis de {name} sur Google",
    profileAria: "Ouvrir notre fiche Google Business Profile pour lire tous les avis",
    summaryLabel: "Résumé des avis",
    basedOnCount: "Basé sur {n} avis Google",
    basedOnVerified: "Basé sur des avis Google vérifiés",
    viewProfile: "Voir notre fiche Google Business Profile",
    flownWithUs: "Avez-vous volé avec nous ?",
    reviewHelps: "Votre avis aide les autres voyageurs à choisir leur aventure au lever du soleil.",
    showMore: "Voir plus d’avis",
    showLess: "Voir moins",
    readAllOnGoogle: "Lire tous les avis sur Google",
    allOnGoogleTitle: "Tous les avis de nos voyageurs sont sur Google",
    allOnGoogleText:
      "Chaque avis est publié sur notre fiche officielle Google Business Profile. Lisez-les tous directement là-bas.",
    readOnGoogle: "Lire nos avis sur Google",
    bannerAlt: "Montgolfières verte et rouge en cours de gonflage dans le désert marocain à l’aube",
    dates: {
      today: "aujourd’hui",
      yesterday: "hier",
      daysAgo: "il y a {n} jours",
      oneWeek: "il y a 1 semaine",
      weeksAgo: "il y a {n} semaines",
      oneMonth: "il y a 1 mois",
      monthsAgo: "il y a {n} mois",
      oneYear: "il y a 1 an",
      yearsAgo: "il y a {n} ans",
    },
  },

  weather: {
    liveOutlook: "Météo en direct",
    title: "Probabilité de vol en montgolfière sur 7 jours",
    areaAgadir: "Agadir, zone de décollage de la vallée du Souss",
    areaMarrakech: "Marrakech, zone de décollage dans le désert",
    indicativeScores: "Scores indicatifs, à confirmer le matin du vol",
    estimateNote:
      "Une estimation indicative uniquement, jamais une garantie de vol. L’approbation finale appartient toujours au pilote.",
    disclaimer:
      "La probabilité de vol est une estimation météo indicative, pas une garantie de vol. L’approbation finale dépend toujours de l’évaluation de sécurité du pilote.",
    statusLikely: "Favorable",
    statusUncertain: "Incertain",
    statusHighRisk: "Risque élevé",
    conditionsLabel: "Conditions de vol :",
    today: "Aujourd’hui",
    windLabel: "Vent",
    tempLabel: "Temp.",
    humidityLabel: "Hum.",
    gustsLabel: "Rafales",
    rainLabel: "Pluie",
    notAvailable: "N/D",
    errorFetch: "Les prévisions météo en direct sont momentanément indisponibles, veuillez réessayer dans quelques instants.",
    tryAgain: "Réessayer",
    staleNotice: "Le rafraîchissement en direct vient d’échouer, affichage de la dernière mise à jour réussie de {time}.",
    updatedNotice:
      "Mis à jour à {time} · Données en direct de {source} · Actualisation automatique toutes les 15 minutes",
    connecting: "Connexion au service météo en direct",
    fullForecast: "Prévisions complètes et historique",
    dialogTitle: "Prévisions complètes et historique de {city}",
    dialogDescription: "{city}, {area} · Données en direct de {source}, mises à jour à {time}.",
    next7Days: "Les 7 prochains jours",
    recentHistory: "Historique récent, {n} derniers jours",
    howScoreTitle: "Comment le score est calculé",
    howScoreBullets: [
      "Mesuré sur la fenêtre réelle de vol de chaque matinée, de 05:00 à 11:00 heure locale.",
      "Un vent de 15 km/h ou moins et des rafales de 28 km/h ou moins obtiennent la note maximale.",
      "La pluie, les orages et le brouillard réduisent fortement le score, exactement comme ils clouent les montgolfières au sol.",
      "À partir de 55, la matinée est Favorable ; à partir de 35, elle est Incertaine ; en dessous de 35, le risque est élevé.",
    ],
    howScoreNote:
      "La probabilité de vol est une estimation indicative calculée à partir de données de prévisions publiques, jamais une garantie de vol. La météo peut changer vite et l’approbation finale du vol appartient toujours à votre pilote licencié le matin du vol.",
    tableHeaders: {
      day: "Jour",
      score: "Score",
      conditions: "Conditions",
      wind: "Vent",
      gusts: "Rafales",
      temp: "Temp.",
      humidity: "Humidité",
      rain: "Pluie",
      sunrise: "Lever du soleil",
    },
    captionNext: "Les sept prochains jours",
    captionRecorded: "Jours passés enregistrés",
    captionSuffix: " avec probabilité de vol, vent, rafales, température, humidité et pluie",
    recorded: "enregistré",
    probabilityAria: "Probabilité de vol {score} pour cent, {status}",
  },

  footer: {
    about:
      "Vols en montgolfière au lever du soleil au départ d’Agadir, avec licence, au-dessus de la vallée du Souss. Les mêmes pilotes, la même sécurité, et un second site de décollage à Marrakech pour nos voyageurs.",
    whatsappUs: "Écrivez-nous sur WhatsApp à tout moment",
    followTitle: "Suivez nos aventures à Agadir",
    followText: "De vrais vols au lever du soleil, de vraies matinées au-dessus de la vallée du Souss.",
    quickLinksTitle: "Liens rapides",
    quickLinks: {
      home: "Accueil",
      agadirFlights: "Vols Agadir",
      agadirExperience: "L’expérience Agadir",
      gallery: "Galerie",
      guestReviews: "Avis des voyageurs",
      faq: "FAQ",
      marrakechFlights: "Vols Marrakech",
      flightDayExperience: "Le jour du vol",
      agadirFlightsMain: "Vols Agadir (destination principale)",
    },
    offersHomeTitle: "Vols Agadir | Destination principale",
    offersMarrakechSecondaryTitle: "Vols Marrakech | Également disponibles",
    offersMarrakechTitle: "Vols Marrakech",
    offerWaTemplate:
      "Bonjour ! Je souhaite réserver le {name} à {city} ({price} par personne). Merci de m’envoyer la disponibilité et les détails de la prise en charge.",
    inCity: "à {city}",
    supportTitle: "Assistance",
    guestReviews: "Avis des voyageurs",
    faq: "FAQ",
    bookYourFlight: "Réserver votre vol",
    googleBusinessProfile: "Fiche Google Business Profile",
    sunriseDaily: "Vols au lever du soleil chaque jour",
    agadirLaunch: "Agadir : site de décollage de la vallée du Souss, notre base.",
    marrakechLaunch: "Marrakech : site de décollage dans le désert.",
    copyright: "© {year} {brand}. Tous droits réservés.",
    tagline: "Vols en montgolfière au lever du soleil à Agadir, au-dessus de la vallée du Souss, Maroc.",
    hours: "Ouvert 24 heures sur 24",
  },

  floating: {
    bookAria: "Réserver votre vol en montgolfière",
    callAria: "Appeler le {phone}",
    call: "Appeler",
    bookOnWhatsApp: "Réserver sur WhatsApp",
  },

  galleryGrid: {
    more: "Voir plus",
    less: "Voir moins",
    tileAria:
      "{caption} : voir plus de photos et de vidéos sur notre fiche Google Business Profile (nouvel onglet)",
    imageAlt: "Photo de la galerie",
    videoAlt: "Clip vidéo de la galerie",
  },

  social: {
    followAria: "Suivez-nous sur {name}, s’ouvre dans un nouvel onglet",
    followTitle: "{name}, s’ouvre dans un nouvel onglet",
  },
};
