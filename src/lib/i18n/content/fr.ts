import type { SiteContent } from "../types";
import { waLink, type Offer, type OfferFeature } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import { agadirOffers, marrakechOffers } from "@/lib/site";

/**
 * French site content.
 *
 * Only the localized strings live here. The NUMERIC and structural fields
 * (priceMad, minGuests, images, ids, city keys) are pulled from site.ts by
 * offer id, so the prices can never drift from the single source of truth.
 * The frozen English seoDescription fields are dropped on purpose: the
 * French JSON-LD uses the French description instead.
 */

const allOffers = [...agadirOffers, ...marrakechOffers];

function localizeOffer(
  id: string,
  localized: {
    cityName: string;
    name: string;
    description: string;
    duration: string;
    groupSize: string;
    imageAlt: string;
    features: OfferFeature[];
    badge?: string;
  },
): Offer {
  const base = allOffers.find((offer) => offer.id === id);
  if (!base) {
    throw new Error(`Unknown offer id: ${id}`);
  }
  return { ...base, ...localized, seoDescription: undefined };
}

const agadirPickupNote = "Prise en charge aller-retour à l’hôtel incluse";

const agadirGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-kasbah-takeoff.webp",
    alt: "Montgolfière rouge et verte s’élevant derrière une kasbah marocaine traditionnelle à l’aube",
    caption: "Décollage près de la kasbah",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-berber-breakfast.webp",
    alt: "Voyageurs partageant un petit-déjeuner berbère traditionnel autour d’une table basse après leur vol",
    caption: "Petit-déjeuner berbère",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-tagine-ceramics.webp",
    alt: "Tajines marocains peints à la main avec des motifs bleus et blancs sur la table du petit-déjeuner",
    caption: "Tajines marocains",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.webp",
    alt: "Montgolfière dorée et rouge à carreaux flottant au-dessus des arganiers au lever du soleil",
    caption: "Au-dessus des arganiers",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-palm-camp-view.webp",
    alt: "Montgolfière flottant derrière des palmes au-dessus du campement berbère au lever du soleil",
    caption: "Derrière les palmiers",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-basket-aerial-view.webp",
    alt: "Vue depuis la nacelle de la montgolfière survolant la campagne de la vallée du Souss à l’aube",
    caption: "Vue depuis la nacelle",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-argan-camp-arrival.jpg",
    alt: "Arganier ombrageant le campement berbère avec un 4x4 garé le long du mur dans la brume matinale",
    caption: "Arrivée au camp",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.webp",
    alt: "Montgolfières rouge et verte vues depuis la terrasse ombragée entre des poutres sombres",
    caption: "Vue depuis la terrasse",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-campfire-night.jpg",
    alt: "Voyageurs partageant du thé à la menthe autour de lanternes et d’un feu de camp crépitant sous les arganiers la nuit",
    caption: "Soirée autour du feu",
    width: 1086,
    height: 1448,
  },
  {
    type: "image",
    src: "/images/gallery-guests-launch-morning.webp",
    alt: "Voyageurs réunis sur le site de décollage de la montgolfière tôt le matin",
    caption: "Voyageurs avant le vol",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.webp",
    alt: "Montgolfières rouge et verte avec une bande dorée à motifs vues à travers une fenêtre ouverte à l’aube",
    caption: "À travers la fenêtre",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.webp",
    alt: "Gros plan sur une montgolfière dorée et rouge à carreaux s’élevant dans le ciel du matin",
    caption: "Envol au lever du soleil",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-inflation-dawn-fire.jpg",
    alt: "Équipage tenant la nacelle d’une immense montgolfière rouge à l’aube, à côté d’un brasero flamboyant",
    caption: "Gonflage à l’aube",
    width: 896,
    height: 1600,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-camp-frame.webp",
    alt: "Montgolfière dorée et rouge à carreaux encadrée par la silhouette sombre du campement à l’aube",
    caption: "La montgolfière depuis le camp",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-flight.webp",
    alt: "Montgolfières rouge et verte survolant la vallée du Souss près d’Agadir tôt le matin",
    caption: "Vol matinal",
    width: 1080,
    height: 1350,
  },
];

const marrakechGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/marrakech-sunrise-village.webp",
    alt: "Montgolfières colorées flottant au lever du soleil au-dessus d’un village en terre traditionnel du désert de Marrakech, montagnes à l’horizon",
    caption: "Lever du soleil sur le village",
    width: 1928,
    height: 2560,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-breakfast.jpg",
    alt: "Petit-déjeuner servi à l’intérieur d’une nacelle de montgolfière au lever du soleil avec de nombreuses montgolfières à l’extérieur",
    caption: "Petit-déjeuner dans les airs",
    width: 500,
    height: 400,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-sunset.webp",
    alt: "Montgolfière jaune s’élevant dans un ciel doré au crépuscule, entourée d’autres montgolfières au-dessus du désert",
    caption: "Vol à l’heure dorée",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-morocco-balloon-atlas.webp",
    alt: "Montgolfière rouge, blanche et verte aux couleurs du Maroc filant vers le lever du soleil avec le massif de l’Atlas derrière",
    caption: "Montgolfière du Maroc au lever du soleil",
    width: 554,
    height: 554,
  },
  {
    type: "image",
    src: "/images/marrakech-red-star-balloon.jpg",
    alt: "Grande montgolfière rouge décorée de l’étoile verte marocaine flottant au-dessus de la plaine au lever du soleil doré",
    caption: "Montgolfière à l’étoile marocaine",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-atlas.jpg",
    alt: "Montgolfière verte et rouge à rayures flottant au-dessus d’une colline rocheuse du désert avec le Haut Atlas enneigé à l’horizon sous un ciel bleu dégagé",
    caption: "Montgolfière verte face à l’Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-red-balloon-hazy-sunset.jpg",
    alt: "Montgolfière rouge volant haut au-dessus d’une plaine désertique brumeuse au crépuscule, montagnes lointaines et montgolfières plus petites autour",
    caption: "Montgolfière rouge au crépuscule",
    width: 547,
    height: 365,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-green-plains.jpg",
    alt: "De nombreuses montgolfières colorées dérivant au-dessus de champs verts et d’un village traditionnel avec des montagnes à l’horizon sous un ciel bleu dégagé",
    caption: "Montgolfières au-dessus des plaines",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-green-fields.webp",
    alt: "Montgolfière jaune resplendissante au lever du soleil doré, entourée de nombreuses montgolfières colorées et de champs verts à perte de vue",
    caption: "Montgolfières à l’heure dorée",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-launch-site-dawn.jpg",
    alt: "Montgolfières posées sur le terrain de décollage du désert à l’aube, avec une grande montgolfière rouge à l’étoile verte marocaine au premier plan et des ciels roses",
    caption: "Aube sur le site de décollage",
    width: 452,
    height: 678,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-palms.jpg",
    alt: "Montgolfière verte et rouge à rayures atterrissant parmi les palmiers avec les montagnes enneigées de l’Atlas derrière, sous un ciel bleu",
    caption: "Montgolfière verte et l’Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-passengers-burner.jpg",
    alt: "Passagers ravis debout dans une grande nacelle en osier pendant que le brûleur chauffe l’enveloppe orange au-dessus d’eux, ciel dégagé",
    caption: "Passagers et brûleur",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-morning-fields.jpg",
    alt: "Des dizaines de montgolfières colorées dispersées dans un ciel bleu matinal au-dessus de champs verts et dorés, collines à l’horizon",
    caption: "Flotte du matin",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-checkered-balloon-descent.jpg",
    alt: "Montgolfière à carreaux descendant vers le désert avec une montgolfière blanche et orange derrière et le véhicule d’assistance qui attend en contrebas",
    caption: "Atterrissage en douceur",
    width: 494,
    height: 619,
  },
  {
    type: "image",
    src: "/images/marrakech-star-balloon-inflight.jpg",
    alt: "Montgolfière rouge à l’étoile verte marocaine flottant au-dessus du village du désert au lever du soleil, vue depuis une montgolfière voisine",
    caption: "L’étoile marocaine en vol",
    width: 486,
    height: 411,
  },
];

export const fr: SiteContent = {
  locale: "fr",
  destinations: {
    agadir: {
      cityName: "Agadir",
      bookingDestination: "Agadir",
      headline: "Vols en montgolfière à Agadir",
      intro:
        "Notre base et le cœur de tout ce que nous faisons. Chaque matin, nous décollons de la vallée du Souss et planons au-dessus de champs verts, d’arganiers et de villages berbères, avec les montagnes de l’Atlas qui resplendissent à l’horizon.",
      launchSite: "Site de décollage dans la vallée du Souss, à environ 50 minutes à 1 heure du centre d’Agadir",
      offers: [
        localizeOffer("agadir-classic", {
          cityName: "Agadir",
          name: "Classic Flight",
          description:
            "Notre lever de soleil signature à Agadir. Partagez une montgolfière avec un petit groupe, planez au-dessus de la magnifique vallée du Souss avec des vues panoramiques sur les montagnes de l’Atlas, puis atterrissez pour un petit-déjeuner berbère traditionnel sous une tente caïdale.",
          duration: "Environ 60 minutes dans les airs",
          groupSize: "Nacelle partagée",
          imageAlt:
            "Passagers dans la nacelle en osier d’une montgolfière avec le brûleur qui rugit au lever du soleil au-dessus de la vallée du Souss près d’Agadir",
          features: [
            { icon: "bus", label: "Transport aller-retour depuis Agadir" },
            { icon: "coffee", label: "Café de bienvenue et thé marocain" },
            { icon: "mountain", label: "Vues sur la vallée du Souss et l’Atlas" },
            { icon: "tent", label: "Petit-déjeuner berbère sous une tente caïdale" },
            { icon: "award", label: "Certificat de vol officiel" },
          ],
          badge: "Le plus populaire",
        }),
        localizeOffer("agadir-private", {
          cityName: "Agadir",
          name: "Private Flight",
          description:
            "L’expérience exclusive par excellence. Votre propre montgolfière, votre propre pilote et une matinée personnalisée au-dessus de la vallée du Souss, conçue pour les couples, les familles, les demandes en mariage et les occasions spéciales.",
          duration: "Environ 60 minutes dans les airs",
          groupSize: "Nacelle privée, minimum 2 personnes",
          imageAlt:
            "Un couple et le pilote en vol dans une nacelle de montgolfière privée au-dessus des paysages de la vallée du Souss au lever du soleil",
          features: [
            { icon: "bus", label: "Transport privé" },
            { icon: "heart", label: "Montgolfière entièrement privée" },
            { icon: "sparkles", label: "Expérience personnalisée" },
            { icon: "award", label: "Certificat de vol" },
            { icon: "tent", label: "Petit-déjeuner berbère privé traditionnel sous un arganier" },
          ],
          badge: "Luxe et exclusivité",
        }),
      ],
      experienceSteps: [
        {
          time: "De 04:00 à 05:00",
          title: "Prise en charge à votre hôtel à Agadir",
          text: "Votre chauffeur vient vous chercher à votre hôtel pendant que la ville dort encore. L’heure exacte dépend de la saison et de l’emplacement de votre hôtel.",
        },
        {
          time: "À l’arrivée",
          title: "Café de bienvenue et thé",
          text: "Arrivez sur le site de décollage de la vallée du Souss et profitez d’un accueil marocain chaleureux avec du café et du thé à la menthe traditionnel.",
        },
        {
          time: "Avant l’aube",
          title: "Gonflage de la montgolfière",
          text: "Regardez la montgolfière prendre vie pendant que l’équipage gonfle l’enveloppe, puis faites connaissance avec votre pilote breveté lors du briefing de sécurité.",
        },
        {
          time: "Lever du soleil",
          title: "Décollage aux premières lueurs",
          text: "Le brûleur rugit, le sol s’éloigne et vous vous envolez tandis que le soleil se lève sur les montagnes de l’Atlas.",
        },
        {
          time: "Dans les airs",
          title: "60 minutes au-dessus de la vallée du Souss",
          text: "Profitez d’environ une heure de vol paisible au-dessus de champs verts, d’arganiers et de villages berbères.",
        },
        {
          time: "Dans les airs",
          title: "Paysages panoramiques",
          text: "Admirez les paysages à couper le souffle de la vallée du Souss et des montagnes de l’Atlas illuminés par la lumière du matin.",
        },
        {
          time: "Après l’atterrissage",
          title: "Petit-déjeuner berbère traditionnel",
          text: "Installez-vous pour un petit-déjeuner berbère marocain traditionnel servi sous une tente caïdale, avec du thé à la menthe et des msemen frais.",
        },
        {
          time: "Cérémonie",
          title: "Votre certificat de vol",
          text: "Recevez votre certificat de vol officiel, un souvenir personnel de votre matinée dans le ciel au-dessus d’Agadir.",
        },
        {
          time: "Vers 10h00",
          title: "Retour à votre hôtel",
          text: "Détendez-vous pendant le trajet de retour vers votre hôtel, l’appareil photo rempli de souvenirs. L’expérience se termine généralement vers 10h00.",
        },
      ],
      faqs: [
        {
          q: "À quelle heure a lieu la prise en charge à l’hôtel à Agadir ?",
          a: "La prise en charge à votre hôtel d’Agadir a lieu tôt le matin, entre 04:00 et 05:00, selon la saison et l’emplacement de votre hôtel. Toute l’expérience se termine vers 10h00 avec le retour à votre hôtel.",
        },
        {
          q: "D’où décollent les vols en montgolfière ?",
          a: "Nos sites de décollage se trouvent dans la vallée du Souss, à environ 50 minutes à 1 heure du centre d’Agadir.",
        },
        {
          q: "Le transport depuis mon hôtel est-il inclus ?",
          a: "Oui ! La prise en charge aller-retour à l’hôtel est incluse pour les voyageurs séjournant dans la ville d’Agadir, à Taghazout et à Tamraght. Notre équipe coordonne avec vous l’heure et le lieu exacts de la prise en charge via WhatsApp.",
        },
        {
          q: "Que comprend le prix ?",
          a: "Le Classic Flight coûte 2 199 MAD par personne et comprend le transport aller-retour depuis Agadir, le café de bienvenue et le thé marocain, le vol en montgolfière au-dessus de la vallée du Souss, un petit-déjeuner berbère traditionnel sous une tente caïdale et le certificat de vol officiel. Le Private Flight coûte 6 999 MAD par personne avec un minimum de 2 personnes et comprend un transport privé, une montgolfière exclusive et un petit-déjeuner berbère privé traditionnel sous un arganier.",
        },
        {
          q: "Que se passe-t-il si le temps est mauvais ?",
          a: "Le vol en montgolfière dépend de conditions météorologiques et de vent favorables. Si votre vol est annulé pour des raisons météorologiques ou de sécurité, vous choisissez entre une nouvelle date ou un remboursement intégral, sans frais.",
        },
        {
          q: "Combien de temps restons-nous dans les airs ?",
          a: "La montgolfière vole pendant environ 60 minutes. Prévoyez toute la matinée, de la prise en charge entre 04:00 et 05:00 jusqu’au retour à votre hôtel vers 10h00.",
        },
        {
          q: "Que dois-je porter et apporter ?",
          a: "Prévoyez des vêtements chauds en couches et des chaussures fermées, car il fait frais avant le lever du soleil. Apportez un chapeau, des lunettes de soleil et votre appareil photo. Nous fournissons le reste.",
        },
        {
          q: "Y a-t-il des limites d’âge ou de poids ?",
          a: "Les enfants à partir de 3 ans peuvent voler accompagnés d’un adulte. Jusqu’à 140 kg, vous réservez normalement. Au-delà de 140 kg, vous restez les bienvenus : envoyez-nous simplement un message sur WhatsApp avant de réserver et nous organisons tout pour vous.",
          link: {
            href: waLink(
              "Bonjour ! Je pèse plus de 140 kg et je souhaite réserver un vol en montgolfière à Agadir. Pouvons-nous organiser cela ensemble ?",
            ),
            label: "Contactez-nous sur WhatsApp",
          },
        },
        {
          q: "Volez-vous aussi à Marrakech ?",
          a: "Oui. Marrakech est notre seconde destination, opérée par la même équipe d’Agadir, avec son propre site de décollage dans le désert aux portes de la ville ainsi que ses propres formules et tarifs.",
          link: { href: "/fr/montgolfiere-marrakech", label: "Découvrir nos vols à Marrakech" },
        },
        /* FAQ SEO Phase E (approbation du propriétaire 2026-11-21) : ajoutées
         * à la FIN de la liste, traduites depuis les FAQ anglaises. */
        {
          q: "Puis-je réserver un vol en montgolfière privé à Agadir ?",
          a: "Oui. Le Private Flight vous offre la montgolfière entièrement réservée à votre groupe : 6 999 MAD par personne avec un minimum de 2 personnes, transport privé, votre propre pilote et un petit-déjeuner berbère privé traditionnel sous un arganier.",
        },
        {
          q: "Quand les vols en montgolfière décollent-ils à Agadir ?",
          a: "Chaque vol est un vol au lever du soleil : la montgolfière s’envole aux premières lueurs, tandis que le soleil se lève sur les montagnes de l’Atlas, et toute la matinée se termine vers 10h00 avec le retour à votre hôtel.",
        },
        {
          q: "Les bébés peuvent-ils participer au vol en montgolfière à Agadir ?",
          a: "Les enfants à partir de 3 ans sont les bienvenus et peuvent voler accompagnés d’un adulte. Vous voyagez avec un enfant de moins de 3 ans ? Écrivez-nous sur WhatsApp, nous avons peut-être une solution pour votre famille.",
        },
        /* FAQ règles d’âge des enfants (décision du propriétaire 2026-11-21) :
         * ajoutée à la FIN de la liste. */
        {
          q: "À partir de quel âge les enfants peuvent-ils voler à Agadir ?",
          a: "Les enfants à partir de 3 ans peuvent voler accompagnés d’un adulte. Si vous voyagez avec un enfant de moins de 3 ans, écrivez-nous sur WhatsApp avant de réserver et nous ferons tout notre possible pour trouver une solution pour votre famille.",
        },
      ],
      waMessage:
        "Bonjour ! Je souhaite réserver mon vol en montgolfière à Agadir. Merci de m’envoyer la disponibilité et les tarifs.",
      faqWaMessage: "Bonjour ! J’ai une question sur les vols en montgolfière à Agadir.",
      stats: [
        { value: "5,0", label: "Note Google", icon: "star" },
        { value: "60 min", label: "Au-dessus de la vallée du Souss", icon: "sun" },
        { value: "100%", label: "Bilan de sécurité", icon: "shield" },
        { value: "24/7", label: "Réservation sur WhatsApp", icon: "users" },
      ],
      whyUs: [
        {
          icon: "badge",
          title: "Notre base à Agadir",
          text: "Nous sommes une entreprise d’Agadir avant tout. Nos pilotes marocains brevetés survolent la vallée du Souss chaque matin, toute l’année.",
        },
        {
          icon: "shield",
          title: "La sécurité d’abord",
          text: "Vérifications quotidiennes du matériel, assurance complète des passagers et strict respect des règles de l’aviation civile marocaine à chaque vol.",
        },
        {
          icon: "bus",
          title: "Prise en charge à l’hôtel à Agadir",
          text: "Profitez du transport aller-retour gratuit depuis votre hôtel à Agadir ville, à Taghazout et à Tamraght.",
        },
        {
          icon: "sparkles",
          title: "Une matinée tout compris",
          text: "Café de bienvenue et thé marocain, environ 60 minutes au-dessus de la vallée du Souss, un petit-déjeuner berbère sous une tente caïdale et votre certificat de vol officiel.",
        },
      ],
      pickupAreas: [
        { name: "Agadir ville", note: agadirPickupNote, included: true },
        { name: "Taghazout", note: agadirPickupNote, included: true },
        { name: "Tamraght", note: agadirPickupNote, included: true },
      ],
    },
    marrakech: {
      cityName: "Marrakech",
      bookingDestination: "Marrakech",
      headline: "Vols en montgolfière à Marrakech",
      intro:
        "Notre seconde destination, opérée par la même équipe basée à Agadir. Décollez du désert aux portes de la ville ocre et regardez les montagnes de l’Atlas se teinter d’or au lever du soleil.",
      launchSite: "Zone de décollage dans le désert, à environ 30 minutes du centre de Marrakech",
      offers: [
        localizeOffer("mk-classic", {
          cityName: "Marrakech",
          name: "Classic Low Cost",
          description:
            "Notre façon la plus abordable de survoler les paysages désertiques autour de Marrakech. Rejoignez un groupe convivial, profitez d’un vol en montgolfière partagé d’environ 40 minutes et terminez la matinée par un petit-déjeuner berbère traditionnel dans une kasbah. Le lever du soleil et le premier vol de la matinée ne sont pas garantis.",
          duration: "Environ 40 minutes dans les airs",
          groupSize: "Montgolfière partagée, 19 personnes maximum",
          imageAlt:
            "Montgolfière flottant au-dessus du désert de Marrakech avec les montagnes enneigées de l’Atlas en arrière-plan",
          features: [
            { icon: "bus", label: "Minibus partagé avec plusieurs points de prise en charge" },
            { icon: "coffee", label: "Café et thé marocain à l’arrivée" },
            { icon: "clock", label: "Vol en montgolfière partagé d’environ 40 minutes" },
            { icon: "users", label: "Montgolfière partagée, 19 personnes maximum" },
            { icon: "coffee", label: "Petit-déjeuner berbère traditionnel dans une kasbah" },
          ],
          badge: "Le plus populaire",
        }),
        localizeOffer("mk-comfort", {
          cityName: "Marrakech",
          name: "Classic Flight",
          description:
            "Notre matinée signature en montgolfière à Marrakech. Traversez le désert en 4x4, volez pendant environ 60 minutes avec les montagnes de l’Atlas à l’horizon et atterrissez pour un petit-déjeuner berbère traditionnel dans une kasbah dominant les montagnes.",
          duration: "Environ 60 minutes dans les airs",
          groupSize: "Montgolfière partagée",
          imageAlt:
            "Montgolfière survolant un village de kasbah marocain avec les montagnes de l’Atlas au lever du soleil",
          features: [
            { icon: "bus", label: "Transport en véhicule 4x4" },
            { icon: "coffee", label: "Café et thé marocain à l’arrivée" },
            { icon: "clock", label: "Vol en montgolfière d’environ 60 minutes" },
            { icon: "award", label: "Certificat de vol officiel" },
            { icon: "coffee", label: "Petit-déjeuner berbère dans une kasbah dominant les montagnes de l’Atlas" },
          ],
        }),
        localizeOffer("mk-private", {
          cityName: "Marrakech",
          name: "Private Flight",
          description:
            "La montgolfière entièrement réservée à votre groupe. Voyagez en 4x4 privé, volez pendant environ 60 minutes au-dessus des paysages désertiques de Marrakech et savourez un petit-déjeuner berbère traditionnel sous une tente privée face aux montagnes de l’Atlas. Idéal pour les couples, les familles et les occasions spéciales.",
          duration: "Environ 60 minutes dans les airs",
          groupSize: "Montgolfière privée",
          imageAlt:
            "Un couple debout dans la nacelle d’une montgolfière au-dessus de Marrakech au lever du soleil",
          features: [
            { icon: "heart", label: "Transport privé en 4x4" },
            { icon: "coffee", label: "Café et thé marocain à l’arrivée" },
            { icon: "clock", label: "Vol en montgolfière privé d’environ 60 minutes" },
            { icon: "award", label: "Certificat de vol officiel" },
            { icon: "coffee", label: "Petit-déjeuner berbère sous une tente privée face aux montagnes de l’Atlas" },
          ],
        }),
        localizeOffer("mk-royal", {
          cityName: "Marrakech",
          name: "Royal Flight",
          description:
            "La montgolfière rien que pour vous, pour vivre la matinée la plus exclusive de Marrakech. Voyagez en 4x4 privé, volez pendant environ 60 minutes au-dessus des paysages désertiques de Marrakech et savourez votre petit-déjeuner berbère servi à bord de la montgolfière, dans les airs, avec les montagnes de l’Atlas à l’horizon.",
          duration: "Environ 60 minutes dans les airs",
          groupSize: "Montgolfière privée",
          imageAlt:
            "Un couple profitant d’un petit-déjeuner dans les airs à bord d’une montgolfière privée au-dessus de Marrakech au lever du soleil",
          features: [
            { icon: "heart", label: "Transport privé en 4x4" },
            { icon: "coffee", label: "Café et thé marocain à l’arrivée" },
            { icon: "clock", label: "Vol en montgolfière privé d’environ 60 minutes" },
            { icon: "coffee", label: "Petit-déjeuner servi dans les airs à bord de la montgolfière" },
            { icon: "award", label: "Certificat de vol officiel" },
          ],
          badge: "Expérience royale",
        }),
      ],
      timeline: [
        {
          time: "04:45",
          title: "Prise en charge à l’hôtel",
          text: "Votre chauffeur vient vous chercher à votre hôtel ou riad de Marrakech pendant que le ciel est encore sombre.",
        },
        {
          title: "Gonflage et briefing",
          text: "Regardez la montgolfière prendre vie dans le désert aux portes de Marrakech et faites connaissance avec votre pilote lors du briefing de sécurité.",
        },
        {
          title: "Décollage au lever du soleil",
          text: "Le brûleur rugit, le sol s’éloigne et le soleil se lève avec vous au-dessus du désert.",
        },
        {
          title: "45 à 60 minutes dans les airs",
          text: "Planez au-dessus des plaines désertiques de Marrakech avec les montagnes de l’Atlas à l’horizon.",
        },
        {
          title: "Cérémonie d’atterrissage",
          text: "Un atterrissage en douceur suivi du traditionnel toast du pilote avec l’équipage.",
        },
        {
          title: "Petit-déjeuner berbère",
          text: "Msemen frais, dattes, œufs, thé à la menthe et café servis sur le site d’atterrissage.",
        },
        {
          title: "Certificat de vol",
          text: "Vous recevez votre certificat personnalisé avant le trajet de retour.",
        },
        {
          time: "Vers 10h00",
          title: "Retour à votre hôtel",
          text: "Retour à Marrakech avec l’appareil photo rempli de souvenirs et d’histoires à raconter.",
        },
      ],
      faqs: [
        {
          q: "D’où décollent les vols en montgolfière à Marrakech ?",
          a: "Les vols à Marrakech décollent de notre zone de décollage dans le désert, à environ 30 minutes du centre de Marrakech.",
        },
        {
          q: "À quelle heure a lieu la prise en charge à l’hôtel à Marrakech ?",
          a: "Nous venons vous chercher à votre hôtel ou riad environ une heure avant le décollage, tôt le matin avant le lever du soleil. Votre heure exacte de prise en charge est confirmée sur WhatsApp la veille du vol.",
        },
        {
          q: "Le transfert depuis l’hôtel est-il inclus à Marrakech ?",
          a: "Oui, la prise en charge et le retour depuis tous les hôtels et riads du secteur de Marrakech ville sont inclus dans chaque vol à Marrakech.",
        },
        {
          q: "Que se passe-t-il si le temps est mauvais ?",
          a: "Les vols dépendent de conditions météorologiques et de vent favorables. Si votre vol est annulé pour des raisons météorologiques ou de sécurité, vous choisissez entre une nouvelle date ou un remboursement intégral, sans frais.",
        },
        {
          q: "Que comprennent les vols à Marrakech ?",
          a: "Chaque vol à Marrakech comprend le transport, le café et le thé marocain à l’arrivée, le vol en montgolfière, le petit-déjeuner et le certificat de vol. Le Classic Low Cost coûte 999 MAD par personne, le Classic Flight 1 399 MAD par personne, le Private Flight 5 299 MAD par personne avec un minimum de 2 personnes et le Royal Flight 6 299 MAD par personne avec un minimum de 2 personnes et le petit-déjeuner servi dans les airs à bord de la montgolfière.",
        },
        {
          q: "Où est basée votre entreprise ?",
          a: "Notre base se trouve à Agadir, où nous survolons la vallée du Souss chaque matin. Marrakech est notre seconde destination, opérée par la même équipe de pilotes brevetés.",
          link: { href: "/fr", label: "Découvrir nos vols à Agadir" },
        },
        /* FAQ SEO Phase E : ajoutées à la FIN de la liste. */
        {
          q: "Combien coûte un vol en montgolfière à Marrakech ?",
          a: "Le Classic Low Cost coûte 999 MAD par personne, le Classic Flight 1 399 MAD par personne, le Private Flight 5 299 MAD par personne avec un minimum de 2 personnes et le Royal Flight 6 299 MAD par personne avec un minimum de 2 personnes.",
        },
        {
          q: "Combien de temps dure le vol en montgolfière à Marrakech ?",
          a: "Le Classic Low Cost vole pendant environ 40 minutes. Le Classic Flight, le Private Flight et le Royal Flight volent pendant environ 60 minutes, au-dessus des plaines désertiques aux portes de Marrakech.",
        },
        {
          q: "Puis-je réserver un vol en montgolfière privé à Marrakech ?",
          a: "Oui. Le Private Flight coûte 5 299 MAD par personne avec un minimum de 2 personnes, et le Royal Flight 6 299 MAD par personne avec un minimum de 2 personnes et votre petit-déjeuner berbère servi dans les airs à bord de la montgolfière.",
        },
        {
          q: "Le vol en montgolfière à Marrakech a-t-il lieu au lever du soleil ?",
          a: "Oui, chaque vol à Marrakech est une expérience du petit matin au lever du soleil : prise en charge à l’hôtel à 04:45, décollage au lever du soleil et retour à votre hôtel vers 10h00.",
        },
        /* FAQ règles d’âge des enfants (décision du propriétaire 2026-11-21) :
         * ajoutée à la FIN de la liste. */
        {
          q: "À partir de quel âge les enfants peuvent-ils voler à Marrakech ?",
          a: "Les enfants à partir de 3 ans peuvent voler accompagnés d’un adulte. Si vous voyagez avec un enfant de moins de 3 ans, écrivez-nous sur WhatsApp avant de réserver et nous ferons tout notre possible pour trouver une solution pour votre famille.",
        },
      ],
      waMessage:
        "Bonjour ! Je souhaite réserver un vol en montgolfière à Marrakech. Merci de m’envoyer la disponibilité et les tarifs.",
      faqWaMessage: "Bonjour ! J’ai une question sur les vols en montgolfière à Marrakech.",
    },
  },
  weatherNote:
    "Les vols sont soumis à des conditions météorologiques et de vent favorables. Si nous devons annuler pour des raisons de sécurité, vous choisissez entre une nouvelle date ou un remboursement intégral.",
  reviewHighlights: [
    "Pilote professionnel breveté",
    "Vol au lever du soleil sûr et tout en douceur",
    "Excellent petit-déjeuner après l’atterrissage",
  ],
  gallery: {
    agadir: agadirGallery,
    marrakech: marrakechGallery,
  },
};
