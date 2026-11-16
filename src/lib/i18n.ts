import type { Lang } from "./types";

export interface UiStrings {
  langName: string;
  nav: { home: string; marrakech: string; agadir: string; prices: string; guides: string; faq: string; book: string };
  btn: {
    bookWhatsapp: string; bookNow: string; seePrices: string; readGuide: string;
    viewAll: string; callUs: string; ask: string; openWhatsapp: string; discover: string; readMore: string;
  };
  sec: {
    flights: string; flightsSub: string; howItWorks: string; howItWorksSub: string;
    whyUs: string; whyUsSub: string; gallery: string; gallerySub: string;
    reviews: string; reviewsSub: string; prices: string; pricesSub: string;
    meeting: string; meetingSub: string; faq: string; faqSub: string;
    guides: string; guidesSub: string; included: string; notIncluded: string;
    keyFacts: string; itinerary: string; bring: string; cancellation: string;
    compare: string; compareSub: string; toc: string; author: string;
    whatYouSee: string; whatYouSeeSub: string; chooseFlight: string;
  };
  facts: { duration: string; pickup: string; back: string; group: string; minAge: string; price: string; adult: string; child: string; perPerson: string; flightTime: string };
  howItWorks: { time: string; title: string; text: string }[];
  whyUs: { title: string; text: string }[];
  bring: string[];
  cancellation: string;
  products: Record<string, { name: string; tagline: string }>;
  includedBase: string[];
  includedExtra: Record<string, string[]>;
  notIncluded: string[];
  footer: {
    blurb: string; flights: string; company: string; guides: string; legal: string;
    contactCol: string; address: string; hours: string; rights: string; languages: string;
    licensed: string; follow: string;
  };
  cookie: { title: string; text: string; accept: string; decline: string };
  booking: {
    formNote: string; date: string; adults: string; children: string; hotel: string; flight: string;
    submit: string; payNote: string; howTitle: string; howSteps: { title: string; text: string }[];
    contactTitle: string; meetingTitle: string; weatherNote: string; responseTime: string; chooseFlight: string;
  };
  sticky: { book: string; call: string };
  notFound: { title: string; text: string; home: string; flights: string; prices: string; book: string };
  misc: {
    from: string; minutes: string; freeCancellation: string; licensedBadge: string; insuranceBadge: string;
    smallGroups: string; weatherTitle: string; weatherText: string; pricesTableTitle: string;
    marrakech: string; agadir: string; giftIdea: string; home: string; guidesHub: string;
  };
}

const en: UiStrings = {
  langName: "English",
  nav: { home: "Home", marrakech: "Marrakech flights", agadir: "Agadir", prices: "Prices", guides: "Guides", faq: "FAQ", book: "Book" },
  btn: {
    bookWhatsapp: "Book on WhatsApp", bookNow: "Book now", seePrices: "See all prices", readGuide: "Read the guide",
    viewAll: "View all flights", callUs: "Call us", ask: "Ask a question", openWhatsapp: "Open WhatsApp", discover: "Discover", readMore: "Read more",
  },
  sec: {
    flights: "Choose your sunrise flight", flightsSub: "Every flight includes hotel pickup, a 1-hour flight, Berber breakfast and your flight certificate.",
    howItWorks: "How your morning works", howItWorksSub: "From 5:00 pickup to 10:30 back at your hotel - here is the whole story.",
    whyUs: "Why fly with us", whyUsSub: "Licensed Moroccan pilots, small baskets and honest prices.",
    gallery: "The view from the basket", gallerySub: "Palm groves, the Agafay stone desert and the snow-capped Atlas at first light.",
    reviews: "What our guests say", reviewsSub: "Real travellers, real mornings above Morocco.",
    prices: "Transparent prices", pricesSub: "One price per person, no hidden fees, free cancellation for weather.",
    meeting: "Meeting point", meetingSub: "We pick you up anywhere in Marrakech or Agadir - or meet us at the launch field.",
    faq: "Frequently asked questions", faqSub: "Pickup times, kids, weather, safety and booking - answered.",
    guides: "Latest guides", guidesSub: "Tips from our pilots before you fly.",
    included: "What's included", notIncluded: "Not included", keyFacts: "Key facts",
    itinerary: "Your morning, minute by minute", bring: "What to bring", cancellation: "Cancellation & weather policy",
    compare: "Compare other flights", compareSub: "Not sure which flight fits your morning? These are the alternatives.",
    toc: "On this page", author: "Written by", whatYouSee: "What you will see", whatYouSeeSub: "Marrakech from above: palm groves, desert and the Atlas.",
    chooseFlight: "Choose your flight",
  },
  facts: { duration: "Duration", pickup: "Pickup", back: "Back at hotel", group: "Group size", minAge: "Minimum age", price: "Price", adult: "Adult", child: "Child (5-11)", perPerson: "per person", flightTime: "Flight time" },
  howItWorks: [
    { time: "05:00", title: "Hotel pickup", text: "Your driver collects you from your hotel or riad anywhere in Marrakech in an air-conditioned minivan. Still dark, coffee in hand." },
    { time: "05:45", title: "Inflation", text: "Watch the crew inflate the envelope with the burner. You can help unpack - or take photos of the balloon coming alive." },
    { time: "06:15", title: "Take-off at sunrise", text: "You lift off just as the first light hits the Atlas. The city wakes up beneath you." },
    { time: "06:30", title: "1 hour in the air", text: "Float between 200 and 800 metres: palm groves, desert plateau, villages and mountains. Your pilot explains everything." },
    { time: "07:30", title: "Landing & certificate", text: "A gentle touchdown in a field, the traditional pilot's toast and your personalised flight certificate." },
    { time: "08:00", title: "Berber breakfast", text: "Fresh msemen, amlou, olives, dates and endless mint tea under a caidal tent." },
    { time: "10:30", title: "Back at your hotel", text: "Return transfer with a camera roll full of sunrise photos - and the whole day still ahead of you." },
  ],
  whyUs: [
    { title: "Licensed pilots", text: "Every pilot holds a commercial balloon licence issued by the Moroccan Civil Aviation Authority, with thousands of flight hours over Marrakech and Agadir." },
    { title: "Fully insured", text: "Each flight is covered by full passenger liability insurance - the same standards required in Europe." },
    { title: "Small baskets", text: "Maximum 16 passengers per balloon, with private and VIP baskets from 2 to 8 people. You always have a rail-side spot." },
    { title: "Honest pricing", text: "The price on this page is the price you pay on the day of the flight. No online payment, no hidden fees, free cancellation if the weather says no." },
  ],
  bring: [
    "Closed shoes (trainers are perfect - the launch field can be damp before sunrise)",
    "A warm layer: it is cold before take-off, even in summer",
    "Sunglasses and a cap for after sunrise",
    "Your passport or ID for the passenger manifest",
    "A fully charged phone or camera - this is the photo morning of your trip",
    "Cash or card for the balance, payable after the flight",
  ],
  cancellation: "Flights depend on wind and weather, and your safety comes first. If the meteorological conditions are not safe, we cancel free of charge - no deposit is taken, so there is nothing to refund. You can reschedule to another morning or cancel up to 24 hours before pickup at no cost. Cancellations by the passenger within 24 hours, or no-shows at pickup, are billed at 50% of the flight price.",
  products: {
    classic: { name: "Classic Sunrise Flight", tagline: "Shared basket, the original 1-hour sunrise over the palm grove" },
    private: { name: "Private Basket Flight", tagline: "Your own basket - couples, families and proposals" },
    vip: { name: "VIP Royal Flight", tagline: "Small group, 4x4 transfer, champagne-style toast" },
    camel: { name: "Balloon + Camel Ride", tagline: "Sunrise flight plus a camel ride in the palm grove" },
    agafay: { name: "Agafay Desert Flight", tagline: "Fly over the stone desert facing the Atlas" },
    agadir: { name: "Agadir Sunrise Flight", tagline: "Over the Souss Valley and argan forests" },
  },
  includedBase: [
    "Hotel pickup and return transfer (air-conditioned minivan)",
    "Approx. 1 hour hot air balloon flight with a licensed pilot",
    "Traditional Berber breakfast after landing",
    "Personalised flight certificate signed by your pilot",
    "Full passenger insurance",
    "Bottled water on board",
  ],
  includedExtra: {
    vip: ["4x4 transfer from Marrakech", "Small group - maximum 8 passengers", "Champagne-style toast at altitude"],
    private: ["Private basket reserved for your group only"],
    camel: ["45-minute camel ride in the palm grove after breakfast"],
  },
  notIncluded: ["Personal expenses and tips", "Professional photos and videos (available as an option)", "Anything not listed as included"],
  footer: {
    blurb: "Sunrise hot air balloon flights over Marrakech and Agadir. Licensed Moroccan pilots, hotel pickup, Berber breakfast and flight certificate - book in one click on WhatsApp.",
    flights: "Flights", company: "Company", guides: "Guides", legal: "Legal", contactCol: "Contact",
    address: "Palmeraie, route de Fes, Marrakech, Morocco", hours: "Office 09:00 - 19:00, flights at sunrise",
    rights: "All rights reserved.", languages: "Language", licensed: "Licensed by the Moroccan Civil Aviation Authority",
    follow: "Follow us",
  },
  cookie: {
    title: "Cookies", text: "We use cookies for anonymous traffic statistics (Google Analytics 4). Nothing is loaded until you accept. Booking happens on WhatsApp - no trackers needed.",
    accept: "Accept", decline: "Decline",
  },
  booking: {
    formNote: "Fill in your details and tap the button - it opens WhatsApp with everything pre-filled. No account, no prepayment.",
    date: "Preferred date", adults: "Adults", children: "Children (5-11)", hotel: "Hotel or riad name", flight: "Flight",
    submit: "Book on WhatsApp", payNote: "You pay on the day of the flight - cash or card. Free cancellation if the weather does not cooperate.",
    howTitle: "How booking works",
    howSteps: [
      { title: "Message us on WhatsApp", text: "Tap the button, tell us your date and how many people. We answer in minutes, in your language." },
      { title: "We confirm the weather window", text: "The evening before, we confirm your pickup time by WhatsApp. If the wind is not right, you reschedule or cancel free." },
      { title: "Fly, breakfast, pay", text: "Enjoy the flight and breakfast, pay after landing. You only pay if you fly." },
    ],
    contactTitle: "Contact", meetingTitle: "Where do we meet?", weatherNote: "Weather policy: if we cancel for wind or visibility, you pay nothing - or you fly another morning.",
    responseTime: "We usually answer within 10 minutes between 07:00 and 21:00 (GMT+1).",
    chooseFlight: "Which flight?",
  },
  sticky: { book: "Book now", call: "Call" },
  notFound: {
    title: "Page not found", text: "This page took a wrong turn over the desert. Try one of these instead:",
    home: "Home", flights: "All flights", prices: "Prices", book: "Book",
  },
  misc: {
    from: "from", minutes: "min", freeCancellation: "Free cancellation for weather", licensedBadge: "Licensed pilots",
    insuranceBadge: "Fully insured", smallGroups: "Small baskets", weatherTitle: "Weather guarantee",
    weatherText: "If the wind or visibility is not safe, we cancel free of charge and you reschedule or get every dirham back.",
    pricesTableTitle: "All flights and prices", marrakech: "Marrakech", agadir: "Agadir", giftIdea: "Gift voucher available",
    home: "Home", guidesHub: "All guides",
  },
};

const fr: UiStrings = {
  langName: "Français",
  nav: { home: "Accueil", marrakech: "Vols Marrakech", agadir: "Agadir", prices: "Prix", guides: "Guides", faq: "FAQ", book: "Réserver" },
  btn: {
    bookWhatsapp: "Réserver sur WhatsApp", bookNow: "Réserver", seePrices: "Voir tous les prix", readGuide: "Lire le guide",
    viewAll: "Voir tous les vols", callUs: "Nous appeler", ask: "Poser une question", openWhatsapp: "Ouvrir WhatsApp", discover: "Découvrir", readMore: "En savoir plus",
  },
  sec: {
    flights: "Choisissez votre vol au lever du soleil", flightsSub: "Chaque vol comprend le transfert hôtel, 1 h de vol, le petit-déjeuner berbère et votre certificat de vol.",
    howItWorks: "Comment se passe votre matinée", howItWorksSub: "De la prise en charge à 5 h au retour à 10 h 30 - voici tout le déroulé.",
    whyUs: "Pourquoi voler avec nous", whyUsSub: "Pilotes marocains certifiés, petites nacelles et prix honnêtes.",
    gallery: "La vue depuis la nacelle", gallerySub: "Palmeraie, désert d'Agafay et Atlas enneigé aux premières lueurs.",
    reviews: "Ce que disent nos passagers", reviewsSub: "De vrais voyageurs, de vraies matinées au-dessus du Maroc.",
    prices: "Prix transparents", pricesSub: "Un prix par personne, sans frais cachés, annulation gratuite en cas de météo.",
    meeting: "Point de rendez-vous", meetingSub: "Nous venons vous chercher partout à Marrakech ou Agadir - ou retrouvez-nous au terrain.",
    faq: "Questions fréquentes", faqSub: "Horaires, enfants, météo, sécurité et réservation : tout est répondu.",
    guides: "Derniers guides", guidesSub: "Les conseils de nos pilotes avant de voler.",
    included: "Ce qui est inclus", notIncluded: "Non inclus", keyFacts: "Points clés",
    itinerary: "Votre matinée, minute par minute", bring: "Que porter / apporter", cancellation: "Conditions d'annulation & météo",
    compare: "Comparer les autres vols", compareSub: "Vous hésitez ? Voici les autres options pour votre matinée.",
    toc: "Sur cette page", author: "Écrit par", whatYouSee: "Ce que vous verrez", whatYouSeeSub: "Marrakech vue du ciel : palmeraie, désert et Atlas.",
    chooseFlight: "Choisissez votre vol",
  },
  facts: { duration: "Durée", pickup: "Prise en charge", back: "Retour à l'hôtel", group: "Taille du groupe", minAge: "Âge minimum", price: "Prix", adult: "Adulte", child: "Enfant (5-11)", perPerson: "par personne", flightTime: "Temps de vol" },
  howItWorks: [
    { time: "05:00", title: "Transfert depuis votre hôtel", text: "Votre chauffeur vous récupère à votre hôtel ou riad partout à Marrakech en minivan climatisé. Il fait encore nuit, café en main." },
    { time: "05:45", title: "Gonflage", text: "Regardez l'équipe gonfler l'enveloppe au brûleur. Aidez au dépliage ou photographiez le ballon qui prend vie." },
    { time: "06:15", title: "Décollage au lever du soleil", text: "Vous vous envolez au moment où les premières lueurs touchent l'Atlas. La ville s'éveille sous vos pieds." },
    { time: "06:30", title: "1 heure de vol", text: "Flottez entre 200 et 800 m : palmeraie, plateau désertique, villages et montagnes. Votre pilote raconte tout." },
    { time: "07:30", title: "Atterrissage & certificat", text: "Un posé en douceur dans un champ, la traditionnelle cri du pilote et votre certificat de vol personnalisé." },
    { time: "08:00", title: "Petit-déjeuner berbère", text: "Msemen frais, amlou, olives, dattes et thé à la menthe à volonté sous une tente caïdale." },
    { time: "10:30", title: "Retour à votre hôtel", text: "Transfert retour avec la carte mémoire pleine de photos au lever du soleil - et toute la journée devant vous." },
  ],
  whyUs: [
    { title: "Pilotes certifiés", text: "Chaque pilote détient une licence de pilote professionnel délivrée par l'aviation civile marocaine, avec des milliers d'heures de vol au-dessus de Marrakech et d'Agadir." },
    { title: "Assurance complète", text: "Chaque vol est couvert par une assurance responsabilité civile passagers - les mêmes standards qu'en Europe." },
    { title: "Petites nacelles", text: "16 passagers maximum par ballon, avec des nacelles privées et VIP de 2 à 8 personnes. Vous avez toujours une place au bord." },
    { title: "Prix honnêtes", text: "Le prix affiché sur cette page est celui que vous payez le jour du vol. Pas de paiement en ligne, pas de frais cachés, annulation gratuite si la météo dit non." },
  ],
  bring: [
    "Chaussures fermées (des baskets suffisent - le terrain peut être humide avant le lever du soleil)",
    "Une couche chaude : il fait froid avant le décollage, même en été",
    "Lunettes de soleil et casquette pour après le lever du soleil",
    "Votre passeport ou carte d'identité pour la liste des passagers",
    "Un téléphone ou appareil photo chargé - c'est la matinée photo de votre voyage",
    "Espèces ou carte pour le solde, à régler après le vol",
  ],
  cancellation: "Les vols dépendent du vent et de la météo, et votre sécurité passe avant tout. Si les conditions ne sont pas sûres, nous annulons gratuitement - aucun acompte n'est encaissé, donc rien à rembourser. Vous pouvez replanifier un autre matin ou annuler jusqu'à 24 h avant la prise en charge sans frais. Les annulations passager moins de 24 h avant, ou les absences au rendez-vous, sont facturées à 50 % du prix du vol.",
  products: {
    classic: { name: "Vol Classique au Lever du Soleil", tagline: "Nacelle partagée, le vol historique d'1 h au-dessus de la palmeraie" },
    private: { name: "Vol Privé en Nacelle", tagline: "Une nacelle rien que pour vous - couples, familles et demandes en mariage" },
    vip: { name: "Vol VIP Royal", tagline: "Petit groupe, transfert 4x4, toast pétillant en l'air" },
    camel: { name: "Montgolfière + Dromadaire", tagline: "Vol au lever du soleil puis balade à dromadaire dans la palmeraie" },
    agafay: { name: "Vol au-dessus de l'Agafay", tagline: "Survolez le désert de pierre face à l'Atlas" },
    agadir: { name: "Vol Montgolfière Agadir", tagline: "Au-dessus de la vallée du Souss et des arganiers" },
  },
  includedBase: [
    "Transfert aller-retour depuis votre hôtel (minivan climatisé)",
    "Environ 1 heure de vol en montgolfière avec un pilote certifié",
    "Petit-déjeuner berbère traditionnel après l'atterrissage",
    "Certificat de vol personnalisé signé par votre pilote",
    "Assurance passagers complète",
    "Eau en bouteille à bord",
  ],
  includedExtra: {
    vip: ["Transfert 4x4 depuis Marrakech", "Petit groupe - 8 passagers maximum", "Toast pétillant en altitude"],
    private: ["Nacelle privée réservée exclusivement à votre groupe"],
    camel: ["Balade à dromadaire de 45 minutes dans la palmeraie après le petit-déjeuner"],
  },
  notIncluded: ["Dépenses personnelles et pourboires", "Photos et vidéos professionnelles (en option)", "Tout ce qui n'est pas listé comme inclus"],
  footer: {
    blurb: "Vols en montgolfière au lever du soleil au-dessus de Marrakech et d'Agadir. Pilotes marocains certifiés, transfert hôtel, petit-déjeuner berbère et certificat de vol - réservez en un clic sur WhatsApp.",
    flights: "Vols", company: "Société", guides: "Guides", legal: "Légal", contactCol: "Contact",
    address: "Palmeraie, route de Fès, Marrakech, Maroc", hours: "Bureau 9 h - 19 h, vols au lever du soleil",
    rights: "Tous droits réservés.", languages: "Langue", licensed: "Agréé par l'aviation civile marocaine",
    follow: "Suivez-nous",
  },
  cookie: {
    title: "Cookies", text: "Nous utilisons des cookies pour des statistiques anonymes de fréquentation (Google Analytics 4). Rien n'est chargé avant votre accord. La réservation se fait sur WhatsApp - sans traceur.",
    accept: "Accepter", decline: "Refuser",
  },
  booking: {
    formNote: "Remplissez vos informations et appuyez sur le bouton - WhatsApp s'ouvre avec tout pré-rempli. Sans compte, sans prépaiement.",
    date: "Date souhaitée", adults: "Adultes", children: "Enfants (5-11)", hotel: "Nom de l'hôtel ou riad", flight: "Vol",
    submit: "Réserver sur WhatsApp", payNote: "Vous payez le jour du vol - espèces ou carte. Annulation gratuite si la météo ne suit pas.",
    howTitle: "Comment réserver",
    howSteps: [
      { title: "Écrivez-nous sur WhatsApp", text: "Appuyez sur le bouton, indiquez votre date et le nombre de personnes. Nous répondons en quelques minutes, dans votre langue." },
      { title: "Nous confirmons la fenêtre météo", text: "La veille, nous confirmons votre heure de prise en charge par WhatsApp. Si le vent ne suit pas, vous replanifiez ou annulez gratuitement." },
      { title: "Volez, petit-déjeunez, payez", text: "Profitez du vol et du petit-déjeuner, payez après l'atterrissage. Vous ne payez que si vous volez." },
    ],
    contactTitle: "Contact", meetingTitle: "Où nous retrouver ?", weatherNote: "Politique météo : si nous annulons pour vent ou visibilité, vous ne payez rien - ou vous volez un autre matin.",
    responseTime: "Nous répondons généralement en moins de 10 minutes entre 7 h et 21 h (GMT+1).",
    chooseFlight: "Quel vol ?",
  },
  sticky: { book: "Réserver", call: "Appeler" },
  notFound: {
    title: "Page introuvable", text: "Cette page a dérivé au-dessus du désert. Essayez plutôt l'une de ces pages :",
    home: "Accueil", flights: "Tous les vols", prices: "Prix", book: "Réserver",
  },
  misc: {
    from: "dès", minutes: "min", freeCancellation: "Annulation gratuite en cas de météo", licensedBadge: "Pilotes certifiés",
    insuranceBadge: "Assurance complète", smallGroups: "Petites nacelles", weatherTitle: "Garantie météo",
    weatherText: "Si le vent ou la visibilité n'est pas sûr, nous annulons gratuitement et vous replanifiez ou récupérez chaque dirham.",
    pricesTableTitle: "Tous les vols et les prix", marrakech: "Marrakech", agadir: "Agadir", giftIdea: "Bon cadeau disponible",
    home: "Accueil", guidesHub: "Tous les guides",
  },
};

const de: UiStrings = {
  langName: "Deutsch",
  nav: { home: "Startseite", marrakech: "Ballonflüge Marrakesch", agadir: "Agadir", prices: "Preise", guides: "Ratgeber", faq: "FAQ", book: "Buchen" },
  btn: {
    bookWhatsapp: "Per WhatsApp buchen", bookNow: "Jetzt buchen", seePrices: "Alle Preise ansehen", readGuide: "Ratgeber lesen",
    viewAll: "Alle Flüge ansehen", callUs: "Anrufen", ask: "Frage stellen", openWhatsapp: "WhatsApp öffnen", discover: "Entdecken", readMore: "Mehr lesen",
  },
  sec: {
    flights: "Wählen Sie Ihren Sonnenaufgangsflug", flightsSub: "Jeder Flug enthält Hotelabholung, 1 Stunde Flug, berberisches Frühstück und Ihr Flugzertifikat.",
    howItWorks: "So läuft Ihr Morgen", howItWorksSub: "Von der Abholung um 5:00 Uhr bis zur Rückkehr um 10:30 Uhr - die ganze Geschichte.",
    whyUs: "Warum mit uns fliegen", whyUsSub: "Lizenzierte marokkanische Piloten, kleine Körbe und ehrliche Preise.",
    gallery: "Der Blick aus dem Korb", gallerySub: "Palmenhaine, die Agafay-Steinwüste und der schneebedeckte Atlas im ersten Licht.",
    reviews: "Was unsere Gäste sagen", reviewsSub: "Echte Reisende, echte Morgen über Marokko.",
    prices: "Transparente Preise", pricesSub: "Ein Preis pro Person, keine versteckten Kosten, kostenlose Stornierung bei Schlechtwetter.",
    meeting: "Treffpunkt", meetingSub: "Wir holen Sie überall in Marrakesch oder Agadir ab - oder treffen Sie uns am Startfeld.",
    faq: "Häufige Fragen", faqSub: "Abholzeiten, Kinder, Wetter, Sicherheit und Buchung - alles beantwortet.",
    guides: "Neueste Ratgeber", guidesSub: "Tipps unserer Piloten vor dem Flug.",
    included: "Inbegriffen", notIncluded: "Nicht inbegriffen", keyFacts: "Die wichtigsten Fakten",
    itinerary: "Ihr Morgen, Minute für Minute", bring: "Was Sie mitbringen", cancellation: "Stornierung & Wetterpolitik",
    compare: "Andere Flüge vergleichen", compareSub: "Unsicher, welcher Flug zu Ihrem Morgen passt? Hier die Alternativen.",
    toc: "Auf dieser Seite", author: "Geschrieben von", whatYouSee: "Was Sie sehen werden", whatYouSeeSub: "Marrakesch von oben: Palmenhaine, Wüste und Atlas.",
    chooseFlight: "Flug wählen",
  },
  facts: { duration: "Dauer", pickup: "Abholung", back: "Zurück im Hotel", group: "Gruppengröße", minAge: "Mindestalter", price: "Preis", adult: "Erwachsener", child: "Kind (5-11)", perPerson: "pro Person", flightTime: "Flugzeit" },
  howItWorks: [
    { time: "05:00", title: "Hotelabholung", text: "Ihr Fahrer holt Sie mit einem klimatisierten Minibus überall in Marrakesch ab. Es ist noch dunkel, Kaffee in der Hand." },
    { time: "05:45", title: "Aufblasen", text: "Sehen Sie zu, wie die Crew die Hülle mit dem Brenner aufbläst. Sie können mithelfen - oder den erwachenden Ballon fotografieren." },
    { time: "06:15", title: "Start bei Sonnenaufgang", text: "Sie steigen auf, sobald das erste Licht den Atlas berührt. Die Stadt erwacht unter Ihnen." },
    { time: "06:30", title: "1 Stunde in der Luft", text: "Schweben Sie zwischen 200 und 800 Metern: Palmenhaine, Wüstenplateau, Dörfer und Berge. Ihr Pilot erklärt alles." },
    { time: "07:30", title: "Landung & Zertifikat", text: "Eine sanfte Landung auf einem Feld, der traditionelle Pilotentoast und Ihr personalisiertes Flugzertifikat." },
    { time: "08:00", title: "Berber-Frühstück", text: "Frisches Msemen, Amlou, Oliven, Datteln und unbegrenzter Pfefferminztee unter einem Caidal-Zelt." },
    { time: "10:30", title: "Zurück im Hotel", text: "Rückfahrt mit einer Speicherkarte voller Sonnenaufgangsfotos - und der ganze Tag liegt noch vor Ihnen." },
  ],
  whyUs: [
    { title: "Lizenzierte Piloten", text: "Jeder Pilot hat eine gewerbliche Ballonlizenz der marokkanischen Luftfahrtbehörde mit tausenden Flugstunden über Marrakesch und Agadir." },
    { title: "Voll versichert", text: "Jeder Flug ist durch eine vollständige Passagier-Haftpflichtversicherung abgedeckt - nach europäischen Standards." },
    { title: "Kleine Körbe", text: "Höchstens 16 Passagiere pro Ballon, mit privaten und VIP-Körben für 2 bis 8 Personen. Sie stehen immer am Rand." },
    { title: "Ehrliche Preise", text: "Der Preis auf dieser Seite ist der Preis, den Sie am Flugtag zahlen. Keine Online-Zahlung, keine versteckten Kosten, kostenlose Stornierung bei schlechtem Wetter." },
  ],
  bring: [
    "Geschlossene Schuhe (Turnschuhe reichen - das Startfeld kann vor Sonnenaufgang feucht sein)",
    "Eine warme Schicht: vor dem Start ist es kalt, selbst im Sommer",
    "Sonnenbrille und Kappe für nach dem Sonnenaufgang",
    "Reisepass oder Ausweis für die Passagierliste",
    "Voll aufgeladenes Handy oder Kamera - das Foto-Morgen Ihrer Reise",
    "Bargeld oder Karte für den Restbetrag, zahlbar nach dem Flug",
  ],
  cancellation: "Flüge hängen von Wind und Wetter ab, und Ihre Sicherheit hat Vorrang. Wenn die Bedingungen nicht sicher sind, stornieren wir kostenlos - es wird keine Anzahlung genommen, also gibt es nichts zu erstatten. Sie können auf einen anderen Morgen umbuchen oder bis 24 Stunden vor der Abholung kostenlos stornieren. Stornierungen durch den Gast innerhalb von 24 Stunden oder Nichterscheinen werden mit 50 % des Flugpreises berechnet.",
  products: {
    classic: { name: "Klassischer Sonnenaufgangsflug", tagline: "Gemeinsamer Korb, der originale 1-Stunden-Flug über die Palmenhaine" },
    private: { name: "Privater Korb", tagline: "Ihr eigener Korb - für Paare, Familien und Anträge" },
    vip: { name: "VIP Königlicher Flug", tagline: "Kleine Gruppe, 4x4-Transfer, Sekt-Touch in der Luft" },
    camel: { name: "Ballon + Kamelritt", tagline: "Sonnenaufgangsflug plus Kamelritt in den Palmenhainen" },
    agafay: { name: "Agafay-Wüstenflug", tagline: "Fliegen Sie über die Steinwüste mit Blick auf den Atlas" },
    agadir: { name: "Agadir Sonnenaufgangsflug", tagline: "Über das Souss-Tal und Arganwälder" },
  },
  includedBase: [
    "Hotelabholung und Rücktransfer (klimatisierter Minibus)",
    "Ca. 1 Stunde Heißluftballonflug mit lizenziertem Piloten",
    "Traditionelles berberisches Frühstück nach der Landung",
    "Personalisiertes Flugzertifikat, signiert von Ihrem Piloten",
    "Vollständige Passagier-Versicherung",
    "Flaschenwasser an Bord",
  ],
  includedExtra: {
    vip: ["4x4-Transfer ab Marrakesch", "Kleine Gruppe - maximal 8 Passagiere", "Sekt-Touch in der Luft"],
    private: ["Privater Korb nur für Ihre Gruppe"],
    camel: ["45-minütiges Kamelritt in den Palmenhainen nach dem Frühstück"],
  },
  notIncluded: ["Persönliche Ausgaben und Trinkgelder", "Professionelle Fotos und Videos (als Option erhältlich)", "Alles, was nicht als inbegriffen aufgeführt ist"],
  footer: {
    blurb: "Heißluftballonflüge bei Sonnenaufgang über Marrakesch und Agadir. Lizenzierte marokkanische Piloten, Hotelabholung, berberisches Frühstück und Flugzertifikat - buchen Sie mit einem Klick per WhatsApp.",
    flights: "Flüge", company: "Unternehmen", guides: "Ratgeber", legal: "Rechtliches", contactCol: "Kontakt",
    address: "Palmeraie, route de Fes, Marrakesch, Marokko", hours: "Büro 9:00 - 19:00 Uhr, Flüge bei Sonnenaufgang",
    rights: "Alle Rechte vorbehalten.", languages: "Sprache", licensed: "Lizenziert von der marokkanischen Luftfahrtbehörde",
    follow: "Folgen Sie uns",
  },
  cookie: {
    title: "Cookies", text: "Wir nutzen Cookies für anonyme Besucherstatistiken (Google Analytics 4). Nichts wird geladen, bevor Sie zustimmen. Die Buchung läuft über WhatsApp - ohne Tracker.",
    accept: "Akzeptieren", decline: "Ablehnen",
  },
  booking: {
    formNote: "Daten eingeben und auf die Schaltfläche tippen - WhatsApp öffnet sich mit allem vorausgefüllt. Kein Konto, keine Vorauszahlung.",
    date: "Wunschdatum", adults: "Erwachsene", children: "Kinder (5-11)", hotel: "Hotel- oder Riadname", flight: "Flug",
    submit: "Per WhatsApp buchen", payNote: "Sie zahlen am Flugtag - bar oder mit Karte. Kostenlose Stornierung, wenn das Wetter nicht mitspielt.",
    howTitle: "So funktioniert die Buchung",
    howSteps: [
      { title: "Schreiben Sie uns auf WhatsApp", text: "Tippen Sie auf die Schaltfläche, nennen Sie Datum und Personenzahl. Wir antworten in Minuten, in Ihrer Sprache." },
      { title: "Wir bestätigen das Wetterfenster", text: "Am Vorabend bestätigen wir Ihre Abholzeit per WhatsApp. Passt der Wind nicht, buchen Sie um oder stornieren kostenlos." },
      { title: "Fliegen, frühstücken, zahlen", text: "Genießen Sie Flug und Frühstück, zahlen Sie nach der Landung. Sie zahlen nur, wenn Sie fliegen." },
    ],
    contactTitle: "Kontakt", meetingTitle: "Wo treffen wir uns?", weatherNote: "Wetterpolitik: Stornieren wir wegen Wind oder Sicht, zahlen Sie nichts - oder Sie fliegen an einem anderen Morgen.",
    responseTime: "Wir antworten meist innerhalb von 10 Minuten, zwischen 7:00 und 21:00 Uhr (GMT+1).",
    chooseFlight: "Welcher Flug?",
  },
  sticky: { book: "Buchen", call: "Anrufen" },
  notFound: {
    title: "Seite nicht gefunden", text: "Diese Seite ist über der Wüste vom Kurs abgekommen. Versuchen Sie es stattdessen hier:",
    home: "Startseite", flights: "Alle Flüge", prices: "Preise", book: "Buchen",
  },
  misc: {
    from: "ab", minutes: "Min.", freeCancellation: "Kostenlose Stornierung bei Schlechtwetter", licensedBadge: "Lizenzierte Piloten",
    insuranceBadge: "Voll versichert", smallGroups: "Kleine Körbe", weatherTitle: "Wettergarantie",
    weatherText: "Ist Wind oder Sicht nicht sicher, stornieren wir kostenlos - Sie buchen um oder bekommen jeden Dirham zurück.",
    pricesTableTitle: "Alle Flüge und Preise", marrakech: "Marrakesch", agadir: "Agadir", giftIdea: "Gutschein erhältlich",
    home: "Startseite", guidesHub: "Alle Ratgeber",
  },
};

const es: UiStrings = {
  langName: "Español",
  nav: { home: "Inicio", marrakech: "Vuelos Marrakech", agadir: "Agadir", prices: "Precios", guides: "Guías", faq: "FAQ", book: "Reservar" },
  btn: {
    bookWhatsapp: "Reservar por WhatsApp", bookNow: "Reservar", seePrices: "Ver todos los precios", readGuide: "Leer la guía",
    viewAll: "Ver todos los vuelos", callUs: "Llámanos", ask: "Hacer una pregunta", openWhatsapp: "Abrir WhatsApp", discover: "Descubrir", readMore: "Leer más",
  },
  sec: {
    flights: "Elige tu vuelo al amanecer", flightsSub: "Cada vuelo incluye recogida en el hotel, 1 hora de vuelo, desayuno bereber y tu certificado de vuelo.",
    howItWorks: "Cómo es tu mañana", howItWorksSub: "De la recogida a las 5:00 a la vuelta a las 10:30 - aquí está todo el plan.",
    whyUs: "Por qué volar con nosotros", whyUsSub: "Pilotos marroquíes con licencia, cestas pequeñas y precios honestos.",
    gallery: "Las vistas desde la cesta", gallerySub: "Palmerales, el desierto de piedra de Agafay y el Atlas nevado a primera luz.",
    reviews: "Lo que dicen nuestros clientes", reviewsSub: "Viajeros reales, mañanas reales sobre Marruecos.",
    prices: "Precios transparentes", pricesSub: "Un precio por persona, sin costes ocultos, cancelación gratuita por mal tiempo.",
    meeting: "Punto de encuentro", meetingSub: "Te recogemos en cualquier hotel de Marrakech o Agadir - o reúnete con nosotros en el campo de despegue.",
    faq: "Preguntas frecuentes", faqSub: "Horarios, niños, tiempo, seguridad y reservas - todo respondido.",
    guides: "Últimas guías", guidesSub: "Consejos de nuestros pilotos antes de volar.",
    included: "Qué incluye", notIncluded: "No incluido", keyFacts: "Datos clave",
    itinerary: "Tu mañana, minuto a minuto", bring: "Qué llevar", cancellation: "Política de cancelación y meteorología",
    compare: "Comparar otros vuelos", compareSub: "¿Dudas sobre cuál encaja con tu mañana? Estas son las alternativas.",
    toc: "En esta página", author: "Escrito por", whatYouSee: "Qué verás", whatYouSeeSub: "Marrakech desde el cielo: palmerales, desierto y Atlas.",
    chooseFlight: "Elige tu vuelo",
  },
  facts: { duration: "Duración", pickup: "Recogida", back: "De vuelta al hotel", group: "Tamaño del grupo", minAge: "Edad mínima", price: "Precio", adult: "Adulto", child: "Niño (5-11)", perPerson: "por persona", flightTime: "Tiempo de vuelo" },
  howItWorks: [
    { time: "05:00", title: "Recogida en el hotel", text: "Tu conductor te recoge en tu hotel o riad de Marrakech en una minivan con aire acondicionado. Todavía es de noche, café en mano." },
    { time: "05:45", title: "Hinchado del globo", text: "Observa cómo el equipo infla la envolvente con el quemador. Puedes ayudar a desplegar - o hacer fotos del globo cobrando vida." },
    { time: "06:15", title: "Despegue al amanecer", text: "Despegas justo cuando la primera luz toca el Atlas. La ciudad despierta bajo tus pies." },
    { time: "06:30", title: "1 hora en el aire", text: "Flota entre 200 y 800 metros: palmerales, meseta desértica, pueblos y montañas. Tu piloto lo explica todo." },
    { time: "07:30", title: "Aterrizaje y certificado", text: "Un toque suave en un campo, el brindis tradicional del piloto y tu certificado de vuelo personalizado." },
    { time: "08:00", title: "Desayuno bereber", text: "Msemen recién hecho, amlou, aceitunas, dátiles y té de menta sin fin bajo una jaima caidal." },
    { time: "10:30", title: "De vuelta al hotel", text: "Traslado de vuelta con la cámara llena de fotos al amanecer - y todo el día aún por delante." },
  ],
  whyUs: [
    { title: "Pilotos con licencia", text: "Cada piloto tiene una licencia comercial de la autoridad de aviación civil marroquí, con miles de horas de vuelo sobre Marrakech y Agadir." },
    { title: "Seguro completo", text: "Cada vuelo está cubierto por un seguro de responsabilidad civil de pasajeros - los mismos estándares que en Europa." },
    { title: "Cestas pequeñas", text: "Máximo 16 pasajeros por globo, con cestas privadas y VIP de 2 a 8 personas. Siempre tienes sitio en el borde." },
    { title: "Precios honestos", text: "El precio de esta página es el que pagas el día del vuelo. Sin pago online, sin costes ocultos, cancelación gratuita si el tiempo lo decide." },
  ],
  bring: [
    "Calzado cerrado (las zapatillas valen - el campo puede estar húmedo antes del amanecer)",
    "Una capa de abrigo: hace frío antes del despegue, incluso en verano",
    "Gafas de sol y gorra para después del amanecer",
    "Pasaporte o DNI para la lista de pasajeros",
    "Móvil o cámara con la batería llena - es la mañana de fotos de tu viaje",
    "Efectivo o tarjeta para el resto, se paga después del vuelo",
  ],
  cancellation: "Los vuelos dependen del viento y del tiempo, y tu seguridad va primero. Si las condiciones no son seguras, cancelamos gratis - no se toma ningún depósito, así que no hay nada que reembolsar. Puedes cambiar a otra mañana o cancelar hasta 24 horas antes de la recogida sin coste. Las cancelaciones del pasajero con menos de 24 horas, o no presentarse a la recogida, se facturan al 50 % del precio del vuelo.",
  products: {
    classic: { name: "Vuelo Clásico al Amanecer", tagline: "Cesta compartida, el vuelo original de 1 hora sobre el palmeral" },
    private: { name: "Vuelo en Cesta Privada", tagline: "Una cesta solo para ti - parejas, familias y propuestas" },
    vip: { name: "Vuelo VIP Real", tagline: "Grupo pequeño, traslado 4x4, brindis con cava a bordo" },
    camel: { name: "Globo + Paseo en Camello", tagline: "Vuelo al amanecer más paseo en camello por el palmeral" },
    agafay: { name: "Vuelo sobre el Agafay", tagline: "Vuela sobre el desierto de piedra frente al Atlas" },
    agadir: { name: "Vuelo en Globo Agadir", tagline: "Sobre el valle del Souss y los bosques de argán" },
  },
  includedBase: [
    "Recogida y traslado de vuelta desde tu hotel (minivan con aire acondicionado)",
    "Aprox. 1 hora de vuelo en globo con piloto con licencia",
    "Desayuno bereber tradicional tras el aterrizaje",
    "Certificado de vuelo personalizado firmado por tu piloto",
    "Seguro completo de pasajeros",
    "Agua embotellada a bordo",
  ],
  includedExtra: {
    vip: ["Traslado 4x4 desde Marrakech", "Grupo pequeño - máximo 8 pasajeros", "Brindis con cava en altura"],
    private: ["Cesta privada reservada solo para tu grupo"],
    camel: ["Paseo en camello de 45 minutos por el palmeral tras el desayuno"],
  },
  notIncluded: ["Gastos personales y propinas", "Fotos y vídeos profesionales (disponibles como opción)", "Todo lo que no esté listado como incluido"],
  footer: {
    blurb: "Vuelos en globo al amanecer sobre Marrakech y Agadir. Pilotos marroquíes con licencia, recogida en el hotel, desayuno bereber y certificado de vuelo - reserva con un clic por WhatsApp.",
    flights: "Vuelos", company: "Empresa", guides: "Guías", legal: "Legal", contactCol: "Contacto",
    address: "Palmeraie, route de Fes, Marrakech, Marruecos", hours: "Oficina 9:00 - 19:00, vuelos al amanecer",
    rights: "Todos los derechos reservados.", languages: "Idioma", licensed: "Con licencia de la aviación civil marroquí",
    follow: "Síguenos",
  },
  cookie: {
    title: "Cookies", text: "Usamos cookies para estadísticas anónimas de tráfico (Google Analytics 4). No se carga nada hasta que aceptas. La reserva se hace por WhatsApp - sin rastreadores.",
    accept: "Aceptar", decline: "Rechazar",
  },
  booking: {
    formNote: "Rellena tus datos y pulsa el botón - se abre WhatsApp con todo rellenado. Sin cuenta, sin pago por adelantado.",
    date: "Fecha preferida", adults: "Adultos", children: "Niños (5-11)", hotel: "Nombre del hotel o riad", flight: "Vuelo",
    submit: "Reservar por WhatsApp", payNote: "Pagas el día del vuelo - efectivo o tarjeta. Cancelación gratuita si el tiempo no acompaña.",
    howTitle: "Cómo reservar",
    howSteps: [
      { title: "Escríbenos por WhatsApp", text: "Pulsa el botón, dinos tu fecha y cuántos sois. Respondemos en minutos, en tu idioma." },
      { title: "Confirmamos la ventana meteorológica", text: "La noche anterior confirmamos tu hora de recogida por WhatsApp. Si el viento no acompaña, cambias el día o cancelas gratis." },
      { title: "Vuela, desayuna, paga", text: "Disfruta del vuelo y del desayuno, paga tras el aterrizaje. Solo pagas si vuelas." },
    ],
    contactTitle: "Contacto", meetingTitle: "¿Dónde nos vemos?", weatherNote: "Política meteorológica: si cancelamos por viento o visibilidad, no pagas nada - o vuelas otra mañana.",
    responseTime: "Solemos responder en menos de 10 minutos entre las 7:00 y las 21:00 (GMT+1).",
    chooseFlight: "¿Qué vuelo?",
  },
  sticky: { book: "Reservar", call: "Llamar" },
  notFound: {
    title: "Página no encontrada", text: "Esta página se desvió sobre el desierto. Prueba una de estas:",
    home: "Inicio", flights: "Todos los vuelos", prices: "Precios", book: "Reservar",
  },
  misc: {
    from: "desde", minutes: "min", freeCancellation: "Cancelación gratuita por mal tiempo", licensedBadge: "Pilotos con licencia",
    insuranceBadge: "Seguro completo", smallGroups: "Cestas pequeñas", weatherTitle: "Garantía meteorológica",
    weatherText: "Si el viento o la visibilidad no son seguros, cancelamos gratis y cambias el día o recuperas cada dírham.",
    pricesTableTitle: "Todos los vuelos y precios", marrakech: "Marrakech", agadir: "Agadir", giftIdea: "Bono regalo disponible",
    home: "Inicio", guidesHub: "Todas las guías",
  },
};

const nl: UiStrings = {
  langName: "Nederlands",
  nav: { home: "Home", marrakech: "Ballonvaarten Marrakech", agadir: "Agadir", prices: "Prijzen", guides: "Gidsen", faq: "FAQ", book: "Boeken" },
  btn: {
    bookWhatsapp: "Boeken via WhatsApp", bookNow: "Nu boeken", seePrices: "Alle prijzen bekijken", readGuide: "Gids lezen",
    viewAll: "Alle vaarten bekijken", callUs: "Bel ons", ask: "Stel een vraag", openWhatsapp: "WhatsApp openen", discover: "Ontdekken", readMore: "Meer lezen",
  },
  sec: {
    flights: "Kies je zonsopgangsvaart", flightsSub: "Elke vaart inclusief hotelophalen, 1 uur vliegen, Berbers ontbijt en je vluchtcertificaat.",
    howItWorks: "Zo verloopt je ochtend", howItWorksSub: "Van ophalen om 5:00 tot terug om 10:30 - het hele verhaal.",
    whyUs: "Waarom met ons vliegen", whyUsSub: "Gelicentieerde Marokkaanse piloten, kleine manden en eerlijke prijzen.",
    gallery: "Het uitzicht vanuit de mand", gallerySub: "Palmentuinen, de Agafay-steenwoestijn en de besneeuwde Atlas bij het eerste licht.",
    reviews: "Wat onze gasten zeggen", reviewsSub: "Echte reizigers, echte ochtenden boven Marokko.",
    prices: "Transparante prijzen", pricesSub: "Eén prijs per persoon, geen verborgen kosten, gratis annuleren bij slecht weer.",
    meeting: "Ontmoetingspunt", meetingSub: "We halen je overal in Marrakech of Agadir op - of ontmoet ons op het startveld.",
    faq: "Veelgestelde vragen", faqSub: "Ophaaltijden, kinderen, weer, veiligheid en boeken - alles beantwoord.",
    guides: "Nieuwste gidsen", guidesSub: "Tips van onze piloten voor je vaart.",
    included: "Inbegrepen", notIncluded: "Niet inbegrepen", keyFacts: "Belangrijkste feiten",
    itinerary: "Je ochtend, minuut voor minuut", bring: "Wat je meeneemt", cancellation: "Annulering & weersbeleid",
    compare: "Andere vaarten vergelijken", compareSub: "Niet zeker welke vaart bij je ochtend past? Dit zijn de alternatieven.",
    toc: "Op deze pagina", author: "Geschreven door", whatYouSee: "Wat je zult zien", whatYouSeeSub: "Marrakech van boven: palmentuinen, woestijn en de Atlas.",
    chooseFlight: "Kies je vaart",
  },
  facts: { duration: "Duur", pickup: "Ophalen", back: "Terug in het hotel", group: "Groepsgrootte", minAge: "Minimumleeftijd", price: "Prijs", adult: "Volwassene", child: "Kind (5-11)", perPerson: "per persoon", flightTime: "Vluchttijd" },
  howItWorks: [
    { time: "05:00", title: "Hotelophalen", text: "Je chauffeur haalt je met een airconditioned busje overal in Marrakech op. Het is nog donker, koffie in de hand." },
    { time: "05:45", title: "Opblazen", text: "Kijk hoe de crew de ballon met de brander opblaast. Help met uitpakken - of fotografeer de ballon die tot leven komt." },
    { time: "06:15", title: "Vertrek bij zonsopgang", text: "Je stijgt op zodra het eerste licht de Atlas raakt. De stad ontwaakt onder je voeten." },
    { time: "06:30", title: "1 uur in de lucht", text: "Zweef tussen 200 en 800 meter: palmentuinen, woestijnplateau, dorpen en bergen. Je piloot legt alles uit." },
    { time: "07:30", title: "Landing & certificaat", text: "Een zachte landing op een veld, de traditionele pilotentoost en je persoonlijke vluchtcertificaat." },
    { time: "08:00", title: "Berbers ontbijt", text: "Verse msemen, amlou, olijven, dadels en onbeperkt muntthee onder een caidal-tent." },
    { time: "10:30", title: "Terug in je hotel", text: "Terugtransfer met een geheugenkaart vol zonsopgangfoto's - en de hele dag nog voor je." },
  ],
  whyUs: [
    { title: "Gelicentieerde piloten", text: "Elke piloot heeft een commerciële ballonlicentie van de Marokkaanse luchtvaartautoriteit, met duizenden vlieguren boven Marrakech en Agadir." },
    { title: "Volledig verzekerd", text: "Elke vaart is gedekt door een volledige passagiersaansprakelijkheidsverzekering - dezelfde standaarden als in Europa." },
    { title: "Kleine manden", text: "Maximaal 16 passagiers per ballon, met privé- en VIP-manden voor 2 tot 8 personen. Je staat altijd aan de rand." },
    { title: "Eerlijke prijzen", text: "De prijs op deze pagina is de prijs die je op de dag van de vaart betaalt. Geen online betaling, geen verborgen kosten, gratis annuleren als het weer nee zegt." },
  ],
  bring: [
    "Gesloten schoenen (sneakers zijn prima - het startveld kan nat zijn voor zonsopgang)",
    "Een warme laag: het is koud voor het opstijgen, zelfs in de zomer",
    "Zonnebril en pet voor na zonsopgang",
    "Je paspoort of ID voor de passagierslijst",
    "Een volledig opgeladen telefoon of camera - dit is de foto-ochtend van je reis",
    "Contant geld of kaart voor het restant, te betalen na de vaart",
  ],
  cancellation: "Vaarten zijn afhankelijk van wind en weer, en jouw veiligheid komt eerst. Als de omstandigheden niet veilig zijn, annuleren we gratis - er wordt geen aanbetaling gevraagd, dus er is niets terug te betalen. Je kunt naar een andere ochtend verplaatsen of tot 24 uur voor het ophalen kosteloos annuleren. Annuleringen door de gast binnen 24 uur, of niet verschijnen bij het ophalen, worden met 50% van de vaartprijs gerekend.",
  products: {
    classic: { name: "Klassieke zonsopgangsvaart", tagline: "Gedeelde mand, de originele vaart van 1 uur boven de palmentuin" },
    private: { name: "Privé-mand vaart", tagline: "Een mand alleen voor jullie - koppels, gezinnen en aanzoeken" },
    vip: { name: "VIP Koninklijke vaart", tagline: "Kleine groep, 4x4-transfer, bubbels in de lucht" },
    camel: { name: "Ballon + kameelrit", tagline: "Zonsopgangsvaart plus een kameelrit door de palmentuin" },
    agafay: { name: "Vaart boven de Agafay", tagline: "Zweef boven de steenwoestijn met de Atlas als decor" },
    agadir: { name: "Ballonvaart Agadir", tagline: "Boven de Souss-vallei en arganbossen" },
  },
  includedBase: [
    "Ophalen en terugtransfer vanaf je hotel (airconditioned busje)",
    "Ca. 1 uur ballonvaart met een gelicentieerde piloot",
    "Traditioneel Berbers ontbijt na de landing",
    "Persoonlijk vluchtcertificaat ondertekend door je piloot",
    "Volledige passagiersverzekering",
    "Flesjeswater aan boord",
  ],
  includedExtra: {
    vip: ["4x4-transfer vanaf Marrakech", "Kleine groep - maximaal 8 passagiers", "Bubbeltoast op hoogte"],
    private: ["Privé-mand alleen voor jouw gezelschap"],
    camel: ["Kameelrit van 45 minuten door de palmentuin na het ontbijt"],
  },
  notIncluded: ["Persoonlijke uitgaven en fooien", "Professionele foto's en video's (als optie verkrijgbaar)", "Alles wat niet als inbegrepen staat vermeld"],
  footer: {
    blurb: "Ballonvaarten bij zonsopgang boven Marrakech en Agadir. Gelicentieerde Marokkaanse piloten, hotelophalen, Berbers ontbijt en vluchtcertificaat - boek met één klik via WhatsApp.",
    flights: "Vaarten", company: "Bedrijf", guides: "Gidsen", legal: "Legaal", contactCol: "Contact",
    address: "Palmeraie, route de Fes, Marrakech, Marokko", hours: "Kantoor 9:00 - 19:00, vaarten bij zonsopgang",
    rights: "Alle rechten voorbehouden.", languages: "Taal", licensed: "Gelicentieerd door de Marokkaanse luchtvaartautoriteit",
    follow: "Volg ons",
  },
  cookie: {
    title: "Cookies", text: "We gebruiken cookies voor anonieme verkeersstatistieken (Google Analytics 4). Er wordt niets geladen totdat je akkoord gaat. Boeken gebeurt via WhatsApp - zonder trackers.",
    accept: "Accepteren", decline: "Afwijzen",
  },
  booking: {
    formNote: "Vul je gegevens in en tik op de knop - WhatsApp opent met alles ingevuld. Geen account, geen vooruitbetaling.",
    date: "Gewenste datum", adults: "Volwassenen", children: "Kinderen (5-11)", hotel: "Naam van hotel of riad", flight: "Vaart",
    submit: "Boeken via WhatsApp", payNote: "Je betaalt op de dag van de vaart - contant of met kaart. Gratis annuleren als het weer niet meewerkt.",
    howTitle: "Hoe werkt het boeken",
    howSteps: [
      { title: "Bericht ons via WhatsApp", text: "Tik op de knop, noem je datum en aantal personen. We antwoorden binnen enkele minuten, in jouw taal." },
      { title: "We bevestigen het weersvenster", text: "De avond ervoor bevestigen we je ophaaltijd via WhatsApp. Past de wind niet, dan verplaats je of annuleer je gratis." },
      { title: "Vliegen, ontbijten, betalen", text: "Geniet van de vaart en het ontbijt, betaal na de landing. Je betaalt alleen als je vliegt." },
    ],
    contactTitle: "Contact", meetingTitle: "Waar ontmoeten we?", weatherNote: "Weersbeleid: annuleren wij vanwege wind of zicht, dan betaal je niets - of je vliegt een andere ochtend.",
    responseTime: "We antwoorden meestal binnen 10 minuten tussen 7:00 en 21:00 (GMT+1).",
    chooseFlight: "Welke vaart?",
  },
  sticky: { book: "Boeken", call: "Bellen" },
  notFound: {
    title: "Pagina niet gevonden", text: "Deze pagina is boven de woestijn van koers veranderd. Probeer in plaats daarvan:",
    home: "Home", flights: "Alle vaarten", prices: "Prijzen", book: "Boeken",
  },
  misc: {
    from: "vanaf", minutes: "min", freeCancellation: "Gratis annuleren bij slecht weer", licensedBadge: "Gelicentieerde piloten",
    insuranceBadge: "Volledig verzekerd", smallGroups: "Kleine manden", weatherTitle: "Weergarantie",
    weatherText: "Is wind of zicht niet veilig, dan annuleren we gratis - je verplaatst of krijgt elke dirham terug.",
    pricesTableTitle: "Alle vaarten en prijzen", marrakech: "Marrakech", agadir: "Agadir", giftIdea: "Cadeaubon beschikbaar",
    home: "Home", guidesHub: "Alle gidsen",
  },
};

export const UI: Record<Lang, UiStrings> = { en, fr, de, es, nl };

export function ui(lang: Lang): UiStrings {
  return UI[lang] || UI.en;
}

/** Localized country name for hero badges. */
export function countryName(lang: Lang): string {
  return { en: "Morocco", fr: "Maroc", de: "Marokko", es: "Marruecos", nl: "Marokko" }[lang];
}

/** Localized city name. */
export function cityName(lang: Lang, city: "marrakech" | "agadir"): string {
  const t = ui(lang);
  return city === "agadir" ? t.misc.agadir : t.misc.marrakech;
}

/** Price formatting per language. */
export function priceFmt(lang: Lang, n: number, currency: "MAD" | "EUR" = "MAD"): string {
  const localeMap: Record<Lang, string> = { en: "en-GB", fr: "fr-FR", de: "de-DE", es: "es-ES", nl: "nl-NL" };
  const suffix = currency === "MAD" ? "MAD" : "EUR";
  return `${n.toLocaleString(localeMap[lang])} ${suffix}`;
}

/** Replace {{PRICE_X}} / {{YEAR}} / {{BRAND}} tokens in content strings. */
export function renderTokens(text: string, lang: Lang): string {
  return text
    .replace(/\{\{PRICE_CLASSIC_CHILD\}\}/g, priceFmt(lang, 900))
    .replace(/\{\{PRICE_CLASSIC\}\}/g, priceFmt(lang, 1500))
    .replace(/\{\{PRICE_PRIVATE\}\}/g, priceFmt(lang, 2200))
    .replace(/\{\{PRICE_VIP\}\}/g, priceFmt(lang, 3500))
    .replace(/\{\{PRICE_CAMEL\}\}/g, priceFmt(lang, 1900))
    .replace(/\{\{PRICE_AGAFAY\}\}/g, priceFmt(lang, 1700))
    .replace(/\{\{PRICE_AGADIR\}\}/g, priceFmt(lang, 1500))
    .replace(/\{\{YEAR\}\}/g, "2026")
    .replace(/\{\{BRAND\}\}/g, "Hot Air Balloon Experience Agadir");
}
