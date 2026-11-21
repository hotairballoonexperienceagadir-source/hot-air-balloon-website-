import type { Dictionary } from "../types";

/**
 * Spanish dictionary (ES, turismo español).
 * Registro: «tú», cálido y turístico (convención habitual del turismo en
 * español; señalado para revisión humana). Los nombres de los paquetes se
 * mantienen en inglés (decisión del propietario).
 */
export const es: Dictionary = {
  locale: "es",

  common: {
    book: "Reservar",
    bookNow: "Reservar ahora",
    from: "Desde",
    perPerson: "/ persona",
    minBooking: "Reserva mínima: {n} personas",
    checkAvailability: "Comprobar disponibilidad",
    stillQuestion: "¿Todavía tienes una pregunta?",
    askUs: "Pregúntanos por WhatsApp",
  },

  header: {
    logoAlt: "Logotipo de Hot Air Balloon Experience Agadir",
    logoAria: "Hot Air Balloon Experience Agadir, inicio",
    ratingOnGoogle: "{rating} en Google",
    stripHome: "Vuelos en globo al amanecer sobre el valle del Souss, Agadir",
    stripMarrakech: "Vuelos a Marrakech operados por nuestra base de Agadir",
    open24: "Abierto 24 horas",
    nav: {
      home: "Inicio",
      agadirFlights: "Vuelos Agadir",
      marrakechFlights: "Vuelos Marrakech",
      experience: "La experiencia",
      gallery: "Galería",
      reviews: "Opiniones",
      faq: "Preguntas frecuentes",
    },
    openMenu: "Abrir menú",
    menuTitle: "Menú",
    menuDescription: "Ir a las secciones principales del sitio",
  },

  switcher: {
    triggerLabel: "Cambiar de idioma, idioma actual: {name}",
  },

  home: {
    hero: {
      badge: "Agadir | Valle del Souss | Marruecos",
      titleLead: "Vive la magia de un vuelo en globo en",
      titleHighlight: "Agadir",
      text: "Descubre la belleza impresionante del valle del Souss desde el aire. Disfruta de un vuelo mágico al amanecer, un desayuno bereber tradicional y vistas inolvidables de las montañas del Atlas.",
      bookCta: "Reserva tu vuelo en Agadir",
      exploreCta: "Descubre la experiencia",
      imageAlt:
        "Globo aerostático rojo flotando al amanecer sobre el valle del Souss cerca de Agadir, con las montañas del Atlas en el horizonte y un salón bereber en primer plano",
      mobileImageAlt:
        "Globo aerostático rojo flotando al amanecer sobre el valle del Souss cerca de Agadir, con un salón bereber en primer plano",
    },
    packages: {
      badge: "Vuelos en globo en Agadir",
      title: "Nuestros vuelos y precios en Agadir",
      text: "Dos formas de vivir el amanecer sobre el valle del Souss: nuestro Classic Flight compartido o la experiencia totalmente privada. Cada vuelo incluye la recogida en tu hotel en Agadir, el té de bienvenida, el vuelo y el desayuno bereber.",
      launchSite: "Zona de despegue en el valle del Souss, a unos 50 minutos a 1 hora del centro de Agadir",
      note: "El amanecer sobre el valle del Souss y las vistas panorámicas de las montañas del Atlas están incluidos en cada vuelo. Los niños a partir de 3 años pueden volar acompañados de un adulto.",
      noteLink: "Pregúntanos por WhatsApp",
      noteSuffix: "para precios familiares.",
      questionWa: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Agadir.",
      childrenNote: "¿Viajas con un niño menor de 3 años?",
      childrenNoteLink: "Escríbenos por WhatsApp",
      childrenNoteSuffix: "y quizá tengamos una solución para tu familia.",
      childrenWa:
        "Hola, me gustaría reservar un vuelo en globo aerostático con un niño menor de 3 años.\n\nDestination: Agadir\nLanguage: Spanish",
    },
    offerCard: {
      cityChip: "{city} | Valle del Souss",
      ratingLine: "{rating} en Google",
    },
    whyUs: {
      badge: "¿Por qué elegirnos?",
      title: "Por qué elegir nuestra experiencia en Agadir",
      text: "Desde los globos que volamos hasta la tripulación que formamos, cada decisión gira en torno a tu seguridad y a tu mañana sobre el valle del Souss.",
    },
    experience: {
      slideBadgeTime: "De 04:00 a 05:00",
      slideBadgeLabel: "Recogida en el hotel",
      badge: "La experiencia",
      title: "Cómo es tu mañana en globo en Agadir",
      text: "Desde el primer toque en la puerta de tu hotel antes del amanecer hasta el último sorbo de té a la menta en la jaima caïdal, este es el recorrido completo que compartimos contigo sobre el valle del Souss.",
      planCta: "Planifica tu vuelo",
    },
    pickup: {
      title: "Recogida en el hotel y transporte en Agadir",
      text: "El transporte de ida y vuelta desde tu hotel está incluido en todos los vuelos a Agadir desde la ciudad de Agadir, Taghazout y Tamraght.",
    },
    gallery: {
      eyebrow: "Galería",
      title: "Agadir y el valle del Souss desde el aire",
      description:
        "Un vistazo a los paisajes, vuelos y mañanas que te esperan en los cielos de Agadir.",
    },
    cta: {
      badge: "¿Listo para la aventura?",
      title: "Reserva hoy tu vuelo en globo en Agadir",
      text: "No te pierdas la experiencia de tu vida. Envíanos un mensaje hoy y vuela mañana al amanecer sobre el valle del Souss.",
      bookCta: "Reserva tu vuelo en Agadir",
      exploreLink: "Descubre los vuelos a Marrakech",
      followLabel: "Sigue nuestras aventuras en Agadir",
      imageAlt: "Globos aerostáticos volando sobre el valle del Souss cerca de Agadir al amanecer dorado",
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle:
        "Todo lo que necesitas saber antes de tu vuelo en globo sobre el valle del Souss en Agadir.",
      wa: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Agadir.",
    },
    seo: {
      businessDescription:
        "Vuelos en globo aerostático al amanecer en Agadir sobre el valle del Souss y las montañas del Atlas, con pilotos titulados.",
      productNameTemplate: "{name} en Agadir",
    },
  },

  marrakech: {
    hero: {
      badge: "Segundo destino | Operado desde nuestra base de Agadir",
      titleLead: "Vuelos en globo aerostático en",
      titleHighlight: "Marrakech",
      bookCta: "Reserva tu vuelo en Marrakech",
      discoverCta: "Descubre nuestros vuelos a Agadir",
      imageAlt:
        "Globos aerostáticos de colores sobrevolando el desierto de Marrakech al amanecer con las montañas del Atlas al fondo",
      mobileImageAlt:
        "Globos aerostáticos de colores sobrevolando el desierto de Marrakech al amanecer con las montañas del Atlas al fondo",
    },
    packages: {
      badge: "Vuelos en globo en Marrakech",
      note: "Los niños a partir de 3 años pueden volar acompañados de un adulto.",
      noteLink: "Pregúntanos por WhatsApp",
      noteSuffix: "para precios familiares.",
      questionWa: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Marrakech.",
      childrenNote: "¿Viajas con un niño menor de 3 años?",
      childrenNoteLink: "Escríbenos por WhatsApp",
      childrenNoteSuffix: "y quizá tengamos una solución para tu familia.",
      childrenWa:
        "Hola, me gustaría reservar un vuelo en globo aerostático con un niño menor de 3 años.\n\nDestination: Marrakech\nLanguage: Spanish",
      lookingFor: "¿Buscas nuestro destino principal?",
      discoverLink: "Descubre nuestros vuelos a Agadir sobre el valle del Souss",
    },
    offerCard: {
      ratingLine: "Compañía con {rating} en Google",
    },
    experience: {
      badgeCity: "Marrakech",
      badgeLabel: "Despegue en el desierto",
      badge: "Día de vuelo",
      title: "Cómo es tu mañana en globo en Marrakech",
      text: "La misma rutina cuidada que aplica nuestro equipo en Agadir, adaptada a la zona de despegue en el desierto a las afueras de Marrakech: un trayecto madrugador en plena oscuridad, un inflado luminoso, un amanecer dorado y un desayuno bereber para terminar.",
      planCta: "Planifica tu vuelo a Marrakech",
    },
    gallery: {
      eyebrow: "Galería",
      title: "Marrakech desde el aire",
      description:
        "Un vistazo a los paisajes, vuelos y mañanas que te esperan en los cielos de Marrakech.",
    },
    cta: {
      badge: "¿Listo para la aventura?",
      title: "Reserva tu vuelo al amanecer en Marrakech",
      text: "Envíanos un mensaje hoy y vuela mañana sobre los paisajes desérticos de los alrededores de Marrakech y las montañas del Atlas.",
      bookCta: "Reserva tu vuelo en Marrakech",
      discoverLink: "Descubre los vuelos a Agadir",
      imageAlt: "Globos aerostáticos flotando sobre el desierto de Marrakech al amanecer",
    },
    faq: {
      title: "Preguntas frecuentes sobre los vuelos a Marrakech",
      subtitle:
        "Todo lo que necesitas saber antes de tu vuelo en globo sobre los paisajes desérticos de Marrakech.",
      wa: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Marrakech.",
    },
    seo: {
      breadcrumbHome: "Inicio",
      breadcrumbSelf: "Vuelos a Marrakech",
      productNameTemplate: "{name} en Marrakech",
    },
  },

  booking: {
    modalTitle: "Reserva tu vuelo en globo",
    modalDescription:
      "Selecciona tus datos a continuación y nuestro equipo te confirma la disponibilidad directamente por WhatsApp.",
    modalNote: "WhatsApp se abre con los datos de tu reserva listos para enviar.",
    dateLabel: "Elige la fecha",
    dateAria: "Fecha del vuelo",
    dateError: "Elige tu fecha preferida para el vuelo en globo.",
    packageLabel: "Paquete",
    packageAria: "Paquete de vuelo",
    minGuestsOption: " (mín. {n} personas)",
    destinationLabel: "Destino",
    destinationAria: "Destino del vuelo",
    guestsLabel: "Número de personas",
    decreaseAria: "Quitar una persona",
    increaseAria: "Añadir una persona",
    goToMarrakechButton: "Vuelos a Marrakech",
    goToMarrakechNote:
      "Los vuelos a Marrakech tienen su propia página dedicada, con paquetes y precios separados.",
    exploreMarrakech: "Descubre los vuelos a Marrakech",
    destinationAgadir: "Agadir (principal)",
    destinationMarrakech: "Marrakech",
    trust: {
      googleReviews: "{rating} en las opiniones de Google",
      licensed: "Pilotos con licencia y seguro completo",
      whatsapp: "Reserva instantánea por WhatsApp",
      ratedCompany: "Compañía con {rating} en Google",
      samePilots: "Los mismos pilotos con licencia que en Agadir",
    },
    messages: {
      greeting: "Hola, me gustaría comprobar la disponibilidad para un vuelo en globo aerostático.",
      destinationLabel: "Destino:",
      packageLabel: "Paquete:",
      dateLabel: "Fecha:",
      guestsLabel: "Número de personas:",
      priceLabel: "Precio:",
      perPerson: "por persona",
      totalLabel: "Total:",
      languageLabel: "Language:",
      confirm: "¿Podrían confirmarme la disponibilidad, por favor?",
    },
  },

  contact: {
    title: "Contáctanos",
    description:
      "Envíanos un mensaje y nuestro equipo te responde directamente en tu correo electrónico. Respondemos 24 horas al día.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Tu nombre completo",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    subjectLabel: "Asunto",
    subjectPlaceholder: "p. ej. Vuelo al amanecer para dos en marzo",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos tus planes, dudas o peticiones especiales...",
    errorName: "Introduce tu nombre completo.",
    errorEmailRequired: "Introduce tu dirección de correo electrónico.",
    errorEmailInvalid: "Introduce una dirección de correo electrónico válida.",
    errorSubject: "Introduce un asunto.",
    errorMessage: "Introduce tu mensaje.",
    successTitle: "¡Mensaje enviado con éxito!",
    successText:
      "Gracias {name}, tu mensaje está en camino a nuestro equipo. Te responderemos a {email} lo antes posible.",
    sendAnother: "Enviar otro mensaje",
    close: "Cerrar",
    send: "Enviar mensaje",
    sending: "Enviando...",
    deliveredTo: "Entregado de forma segura a {email}",
    fallbackText:
      "No hemos podido enviar tu correo en este momento. Toca abajo para enviar el mismo mensaje por WhatsApp. Respondemos 24 horas al día.",
    sendOnWhatsApp: "Enviar por WhatsApp",
    emailInstead: "Escríbenos por correo electrónico",
    mailtoSubject: "Mensaje de la web",
    messageLabels: {
      greeting: "Hola, te contacto desde la web.",
      name: "Nombre:",
      email: "Correo:",
      subject: "Asunto:",
      message: "Mensaje:",
      languageLabel: "Language:",
    },
  },

  reviews: {
    eyebrow: "Opiniones de viajeros",
    titleAgadir: "Lo que dicen nuestros viajeros",
    titleMarrakech: "Lo que dicen nuestros viajeros en Marrakech",
    viewOnGoogle: "Ver en Google",
    googleReviewsCount: "{n} opiniones en Google",
    onGoogleProfile: "en la ficha de Google Business",
    writeReview: "Escribir una opinión en Google",
    ratingBadgeAria:
      "Lee nuestras opiniones en Google, con {rating} sobre 5, se abre en una pestaña nueva",
    reviewCardAria: "Leer la opinión de {name} en Google",
    profileAria: "Abrir nuestra ficha de Google Business para leer todas las opiniones",
    summaryLabel: "Resumen de opiniones",
    basedOnCount: "Basado en {n} opiniones en Google",
    basedOnVerified: "Basado en opiniones verificadas de Google",
    viewProfile: "Ver nuestra ficha de Google Business",
    flownWithUs: "¿Has volado con nosotros?",
    reviewHelps: "Tu opinión ayuda a otros viajeros a elegir su aventura al amanecer.",
    showMore: "Ver más opiniones",
    showLess: "Ver menos",
    readAllOnGoogle: "Leer todas las opiniones en Google",
    allOnGoogleTitle: "Todas las opiniones de nuestros viajeros están en Google",
    allOnGoogleText:
      "Cada opinión se publica en nuestra ficha oficial de Google Business. Léelas todas allí.",
    readOnGoogle: "Leer nuestras opiniones en Google",
    bannerAlt: "Globos aerostáticos verdes y rojos inflándose en el desierto marroquí al alba",
    dates: {
      today: "hoy",
      yesterday: "ayer",
      daysAgo: "hace {n} días",
      oneWeek: "hace 1 semana",
      weeksAgo: "hace {n} semanas",
      oneMonth: "hace 1 mes",
      monthsAgo: "hace {n} meses",
      oneYear: "hace 1 año",
      yearsAgo: "hace {n} años",
    },
  },

  weather: {
    liveOutlook: "Previsión en directo",
    title: "Probabilidad de vuelo en globo a 7 días",
    areaAgadir: "Agadir, zona de despegue en el valle del Souss",
    areaMarrakech: "Marrakech, zona de despegue en el desierto",
    indicativeScores: "Valores orientativos, confirma siempre la mañana del vuelo",
    estimateNote:
      "Solo una estimación orientativa, nunca una garantía de vuelo. La aprobación final siempre depende del piloto.",
    disclaimer:
      "La probabilidad de vuelo es una estimación meteorológica orientativa, no una garantía de vuelo. La aprobación final siempre depende de la valoración de seguridad del piloto.",
    statusLikely: "Probable",
    statusUncertain: "Dudoso",
    statusHighRisk: "Riesgo alto",
    conditionsLabel: "Condiciones de vuelo:",
    today: "Hoy",
    windLabel: "Viento",
    tempLabel: "Temp.",
    humidityLabel: "Hum.",
    gustsLabel: "Rachas",
    rainLabel: "Lluvia",
    notAvailable: "N/D",
    errorFetch: "La previsión meteorológica en directo no está disponible temporalmente, inténtalo de nuevo en unos minutos.",
    tryAgain: "Reintentar",
    staleNotice: "La actualización en directo acaba de fallar; se muestra la última actualización correcta de {time}.",
    updatedNotice:
      "Actualizado a las {time} · Datos en directo de {source} · Se actualiza automáticamente cada 15 minutos",
    connecting: "Conectando con el servicio meteorológico en directo",
    fullForecast: "Previsión completa e historial",
    dialogTitle: "{city}: previsión completa e historial",
    dialogDescription: "{city}, {area} · Datos en directo de {source}, actualizados a las {time}.",
    next7Days: "Los próximos 7 días",
    recentHistory: "Historial reciente, últimos {n} días",
    howScoreTitle: "Cómo se calcula la puntuación",
    howScoreBullets: [
      "Medido durante la franja horaria real de vuelo de cada mañana, de 05:00 a 11:00 hora local.",
      "Viento de 15 km/h o menos y rachas de 28 km/h o menos obtienen la máxima puntuación.",
      "La lluvia, las tormentas y la niebla reducen mucho la puntuación, igual que dejan los globos en tierra.",
      "A partir de 55 la mañana es Probable, a partir de 35 es Dudosa y por debajo de 35 es Riesgo alto.",
    ],
    howScoreNote:
      "La probabilidad de vuelo es una estimación orientativa calculada a partir de datos de previsión públicos, nunca una garantía de vuelo. El tiempo puede cambiar rápido y la aprobación final del vuelo siempre depende de tu piloto con licencia la mañana del vuelo.",
    tableHeaders: {
      day: "Día",
      score: "Puntos",
      conditions: "Condiciones",
      wind: "Viento",
      gusts: "Rachas",
      temp: "Temp.",
      humidity: "Humedad",
      rain: "Lluvia",
      sunrise: "Amanecer",
    },
    captionNext: "Los próximos siete días",
    captionRecorded: "Días pasados registrados",
    captionSuffix: " con probabilidad de vuelo, viento, rachas, temperatura, humedad y lluvia",
    recorded: "registrado",
    probabilityAria: "Probabilidad de vuelo del {score} por ciento, {status}",
  },

  footer: {
    about:
      "Vuelos en globo aerostático al amanecer desde Agadir sobre el valle del Souss, con pilotos titulados. Los mismos pilotos, la misma seguridad y una segunda zona de despegue en Marrakech para nuestros viajeros.",
    whatsappUs: "Escríbenos por WhatsApp a cualquier hora",
    followTitle: "Sigue nuestras aventuras en Agadir",
    followText: "Vuelos reales al amanecer, mañanas reales sobre el valle del Souss.",
    quickLinksTitle: "Enlaces rápidos",
    quickLinks: {
      home: "Inicio",
      agadirFlights: "Vuelos Agadir",
      agadirExperience: "La experiencia de Agadir",
      gallery: "Galería",
      guestReviews: "Opiniones de viajeros",
      faq: "Preguntas frecuentes",
      marrakechFlights: "Vuelos Marrakech",
      flightDayExperience: "El día de vuelo",
      agadirFlightsMain: "Vuelos Agadir (destino principal)",
    },
    offersHomeTitle: "Vuelos Agadir | Destino principal",
    offersMarrakechSecondaryTitle: "Vuelos Marrakech | También disponibles",
    offersMarrakechTitle: "Vuelos Marrakech",
    offerWaTemplate:
      "¡Hola! Me gustaría reservar el {name} en {city} ({price} por persona). Enviadme la disponibilidad y los detalles de la recogida, por favor.",
    inCity: "en {city}",
    supportTitle: "Ayuda",
    guestReviews: "Opiniones de viajeros",
    faq: "Preguntas frecuentes",
    bookYourFlight: "Reserva tu vuelo",
    googleBusinessProfile: "Ficha de Google Business",
    sunriseDaily: "Vuelos al amanecer cada día",
    agadirLaunch: "Agadir: zona de despegue en el valle del Souss, nuestra base.",
    marrakechLaunch: "Marrakech: zona de despegue en el desierto.",
    copyright: "© {year} {brand}. Todos los derechos reservados.",
    tagline: "Vuelos en globo al amanecer desde Agadir sobre el valle del Souss, Marruecos.",
    hours: "Abierto 24 horas",
  },

  floating: {
    bookAria: "Reserva tu vuelo en globo",
    callAria: "Llamar al {phone}",
    call: "Llamar",
    bookOnWhatsApp: "Reservar por WhatsApp",
  },

  galleryGrid: {
    more: "Ver más",
    less: "Ver menos",
    tileAria:
      "{caption}: ver más fotos y vídeos en nuestra ficha de Google Business (se abre en una pestaña nueva)",
    imageAlt: "Foto de la galería",
    videoAlt: "Vídeo de la galería",
  },

  social: {
    followAria: "Síguenos en {name}, se abre en una pestaña nueva",
    followTitle: "{name}, se abre en una pestaña nueva",
  },
};
