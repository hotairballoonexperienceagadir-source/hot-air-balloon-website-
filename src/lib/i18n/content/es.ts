import type { SiteContent } from "../types";
import { waLink, type Offer, type OfferFeature } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import { agadirOffers, marrakechOffers } from "@/lib/site";

/**
 * Spanish site content.
 *
 * Only the localized strings live here. The NUMERIC and structural fields
 * (priceMad, minGuests, images, ids, city keys) are pulled from site.ts by
 * offer id, so the prices can never drift from the single source of truth.
 * The frozen English seoDescription fields are dropped on purpose: the
 * Spanish JSON-LD uses the Spanish description instead.
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

const agadirPickupNote = "Recogida de ida y vuelta en el hotel incluida";

const agadirGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-kasbah-takeoff.webp",
    alt: "Globo aerostático rojo y verde elevándose detrás de una kasbah marroquí tradicional al alba",
    caption: "Despegue junto a la kasbah",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-berber-breakfast.webp",
    alt: "Viajeros compartiendo un desayuno bereber tradicional alrededor de una mesa baja tras su vuelo",
    caption: "Desayuno bereber",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-tagine-ceramics.webp",
    alt: "Tajines marroquíes pintados a mano con motivos azules y blancos sobre la mesa del desayuno",
    caption: "Tajines marroquíes",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.webp",
    alt: "Globo aerostático dorado y rojo a cuadros flotando sobre los arganes al amanecer",
    caption: "Sobre los arganes",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-palm-camp-view.webp",
    alt: "Globo aerostático flotando tras las palmeras sobre el campamento bereber al amanecer",
    caption: "Tras las palmeras",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-basket-aerial-view.webp",
    alt: "Vista desde la cesta del globo sobrevolando el campo del valle del Souss al alba",
    caption: "Desde la cesta",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-argan-camp-arrival.jpg",
    alt: "Argán dando sombra al campamento bereber con un 4x4 aparcado junto al muro en la mañana brumosa",
    caption: "Llegada al campamento",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.webp",
    alt: "Globos aerostáticos rojo y verde vistos desde la terraza sombreada entre vigas oscuras",
    caption: "Vista desde la terraza",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-campfire-night.jpg",
    alt: "Viajeros compartiendo té a la menta alrededor de farolillos y una hoguera crepitante bajo los arganes de noche",
    caption: "Noche junto al fuego",
    width: 1086,
    height: 1448,
  },
  {
    type: "image",
    src: "/images/gallery-guests-launch-morning.webp",
    alt: "Viajeros reunidos en la zona de despegue del globo a primera hora de la mañana",
    caption: "Viajeros antes del vuelo",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.webp",
    alt: "Globos aerostáticos rojo y verde con una banda dorada de motivos vistos a través de una ventana abierta al alba",
    caption: "A través de la ventana",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.webp",
    alt: "Primer plano de un globo dorado y rojo a cuadros elevándose en el cielo de la mañana",
    caption: "Despegue al amanecer",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-inflation-dawn-fire.jpg",
    alt: "La tripulación sujeta la cesta de un enorme globo rojo al alba junto a un fuego resplandeciente",
    caption: "Inflado al alba",
    width: 896,
    height: 1600,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-camp-frame.webp",
    alt: "Globo dorado y rojo a cuadros enmarcado por la silueta oscura del campamento al alba",
    caption: "El globo desde el campamento",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-flight.webp",
    alt: "Globos aerostáticos rojo y verde volando sobre el valle del Souss cerca de Agadir a primera hora de la mañana",
    caption: "Vuelo matinal",
    width: 1080,
    height: 1350,
  },
];

const marrakechGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/marrakech-sunrise-village.webp",
    alt: "Globos aerostáticos de colores flotando al amanecer sobre un pueblo de adobe tradicional del desierto de Marrakech, con montañas en el horizonte",
    caption: "Amanecer sobre el pueblo",
    width: 1928,
    height: 2560,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-breakfast.jpg",
    alt: "Desayuno servido dentro de la cesta de un globo al amanecer con muchos globos volando fuera",
    caption: "Desayuno en el aire",
    width: 500,
    height: 400,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-sunset.webp",
    alt: "Globo aerostático amarillo elevándose en un cielo dorado al atardecer rodeado de otros globos sobre el desierto",
    caption: "Vuelo a la hora dorada",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-morocco-balloon-atlas.webp",
    alt: "Globo aerostático rojo, blanco y verde de Marruecos volando hacia el amanecer con el Atlas detrás",
    caption: "Globo de Marruecos al amanecer",
    width: 554,
    height: 554,
  },
  {
    type: "image",
    src: "/images/marrakech-red-star-balloon.jpg",
    alt: "Gran globo aerostático rojo decorado con la estrella verde marroquí flotando sobre la llanura al amanecer dorado",
    caption: "Globo de la estrella marroquí",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-atlas.jpg",
    alt: "Globo verde y rojo a rayas flotando sobre una colina rocosa del desierto con el Alto Atlas nevado en el horizonte bajo un cielo azul despejado",
    caption: "Globo verde ante el Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-red-balloon-hazy-sunset.jpg",
    alt: "Globo aerostático rojo volando alto sobre una llanura desértica brumosa al atardecer, con montañas lejanas y globos más pequeños alrededor",
    caption: "Globo rojo al atardecer",
    width: 547,
    height: 365,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-green-plains.jpg",
    alt: "Muchos globos aerostáticos de colores sobrevolando campos verdes y un pueblo tradicional con montañas en el horizonte bajo un cielo azul despejado",
    caption: "Globos sobre las llanuras",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-green-fields.webp",
    alt: "Globo amarillo resplandeciente al amanecer dorado, rodeado de muchos globos de colores y campos verdes que se extienden abajo",
    caption: "Globos a la hora dorada",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-launch-site-dawn.jpg",
    alt: "Globos aerostáticos en la zona de despegue del desierto al alba, con un gran globo rojo con la estrella verde marroquí al frente y cielos rosas",
    caption: "Alba en la zona de despegue",
    width: 452,
    height: 678,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-palms.jpg",
    alt: "Globo verde y rojo a rayas aterrizando entre palmeras con las montañas nevadas del Atlas al fondo bajo un cielo azul",
    caption: "Globo verde y el Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-passengers-burner.jpg",
    alt: "Pasajeros felices de pie en una gran cesta de mimbre mientras el quemador calienta la envolvente naranja sobre ellos, con cielo despejado",
    caption: "Pasajeros y el quemador",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-morning-fields.jpg",
    alt: "Decenas de globos de colores repartidos por un cielo azul matinal sobre campos verdes y dorados, con colinas en el horizonte",
    caption: "La flota de la mañana",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-checkered-balloon-descent.jpg",
    alt: "Globo a cuadros descendiendo hacia el desierto con un globo blanco y naranja detrás y el vehículo de asistencia esperando abajo",
    caption: "Aterrizaje suave",
    width: 494,
    height: 619,
  },
  {
    type: "image",
    src: "/images/marrakech-star-balloon-inflight.jpg",
    alt: "Globo rojo con la estrella verde marroquí flotando sobre el pueblo del desierto al amanecer, visto desde un globo cercano",
    caption: "La estrella marroquí en vuelo",
    width: 486,
    height: 411,
  },
];

export const es: SiteContent = {
  locale: "es",
  destinations: {
    agadir: {
      cityName: "Agadir",
      bookingDestination: "Agadir",
      headline: "Vuelos en globo aerostático en Agadir",
      intro:
        "Nuestra base y el corazón de todo lo que hacemos. Cada mañana despegamos del valle del Souss y volamos sobre campos verdes, arganes y pueblos bereberes, con las montañas del Atlas brillando en el horizonte.",
      launchSite: "Zona de despegue en el valle del Souss, a unos 50 minutos a 1 hora del centro de Agadir",
      offers: [
        localizeOffer("agadir-classic", {
          cityName: "Agadir",
          name: "Classic Flight",
          description:
            "Nuestro amanecer estrella en Agadir. Comparte un globo con un grupo pequeño, sobrevuela el precioso valle del Souss con vistas panorámicas de las montañas del Atlas y aterriza para disfrutar de un desayuno bereber tradicional en una jaima caïdal.",
          duration: "Aproximadamente 60 minutos en el aire",
          groupSize: "Cesta compartida",
          imageAlt:
            "Pasajeros en la cesta de mimbre de un globo aerostático con el quemador encendido al amanecer sobre el valle del Souss cerca de Agadir",
          features: [
            { icon: "bus", label: "Transporte de ida y vuelta desde Agadir" },
            { icon: "coffee", label: "Café de bienvenida y té marroquí" },
            { icon: "mountain", label: "Vistas del valle del Souss y del Atlas" },
            { icon: "tent", label: "Desayuno bereber en una jaima caïdal" },
            { icon: "award", label: "Certificado de vuelo oficial" },
          ],
          badge: "El más popular",
        }),
        localizeOffer("agadir-private", {
          cityName: "Agadir",
          name: "Private Flight",
          description:
            "La experiencia exclusiva por excelencia. Tu propio globo, tu propio piloto y una mañana personalizada sobre el valle del Souss, pensada para parejas, familias, propuestas de matrimonio y ocasiones especiales.",
          duration: "Aproximadamente 60 minutos en el aire",
          groupSize: "Cesta privada, mínimo 2 personas",
          imageAlt:
            "Una pareja y el piloto volando en la cesta de un globo aerostático privado sobre el paisaje del valle del Souss al amanecer",
          features: [
            { icon: "bus", label: "Transporte privado" },
            { icon: "heart", label: "Globo totalmente privado" },
            { icon: "sparkles", label: "Experiencia personalizada" },
            { icon: "award", label: "Certificado de vuelo" },
            { icon: "tent", label: "Desayuno bereber privado tradicional bajo un argán" },
          ],
          badge: "Lujo y exclusividad",
        }),
      ],
      experienceSteps: [
        {
          time: "De 04:00 a 05:00",
          title: "Recogida en tu hotel de Agadir",
          text: "Tu conductor te recoge en tu hotel mientras la ciudad todavía duerme. La hora exacta depende de la temporada y de la ubicación de tu hotel.",
        },
        {
          time: "A la llegada",
          title: "Café de bienvenida y té",
          text: "Llega a la zona de despegue del valle del Souss y disfruta de una cálida bienvenida marroquí con café y té a la menta tradicional.",
        },
        {
          time: "Antes del amanecer",
          title: "Inflado del globo",
          text: "Mira cómo el globo cobra vida mientras la tripulación infla la envolvente y conoce a tu piloto con licencia durante la charla de seguridad.",
        },
        {
          time: "Amanecer",
          title: "Despegue a primera luz",
          text: "El quemador ruge, el suelo se aleja y despegas justo cuando el sol sale sobre las montañas del Atlas.",
        },
        {
          time: "En el aire",
          title: "60 minutos sobre el valle del Souss",
          text: "Disfruta de aproximadamente una hora de vuelo tranquilo sobre campos verdes, arganes y pueblos bereberes.",
        },
        {
          time: "En el aire",
          title: "Paisajes panorámicos",
          text: "Admira el paisaje espectacular del valle del Souss y las montañas del Atlas iluminadas por la luz de la mañana.",
        },
        {
          time: "Tras el aterrizaje",
          title: "Desayuno bereber tradicional",
          text: "Siéntate a un desayuno bereber marroquí tradicional servido en una jaima caïdal, con té a la menta y msemen frescos.",
        },
        {
          time: "Ceremonia",
          title: "Tu certificado de vuelo",
          text: "Recibe tu certificado de vuelo oficial, un recuerdo personal de tu mañana en el cielo sobre Agadir.",
        },
        {
          time: "Sobre las 10:00",
          title: "Regreso a tu hotel",
          text: "Relájate en el trayecto de vuelta a tu hotel, con la cámara llena de recuerdos. La experiencia suele terminar sobre las 10:00.",
        },
      ],
      faqs: [
        {
          q: "¿A qué hora es la recogida en el hotel en Agadir?",
          a: "La recogida en tu hotel de Agadir tiene lugar a primera hora de la mañana, entre las 04:00 y las 05:00, según la temporada y la ubicación de tu hotel. Toda la experiencia termina alrededor de las 10:00 con la devolución en tu hotel.",
        },
        {
          q: "¿Desde dónde despegan los vuelos en globo?",
          a: "Nuestras zonas de despegue están en el valle del Souss, a unos 50 minutos a 1 hora del centro de Agadir.",
        },
        {
          q: "¿Está incluido el transporte desde mi hotel?",
          a: "¡Sí! La recogida de ida y vuelta en el hotel está incluida para los viajeros alojados en la ciudad de Agadir, Taghazout y Tamraght. Nuestro equipo coordinará contigo el punto y la hora exactos de la recogida por WhatsApp.",
        },
        {
          q: "¿Qué incluye el precio?",
          a: "El Classic Flight cuesta 2.199 MAD por persona e incluye el transporte de ida y vuelta desde Agadir, el café de bienvenida y el té marroquí, el vuelo en globo sobre el valle del Souss, un desayuno bereber tradicional en una jaima caïdal y el certificado de vuelo oficial. El Private Flight cuesta 6.999 MAD por persona con un mínimo de 2 personas e incluye transporte privado, un globo exclusivo y un desayuno bereber privado tradicional bajo un argán.",
        },
        {
          q: "¿Qué pasa si hace mal tiempo?",
          a: "Volar en globo depende de unas condiciones meteorológicas y de viento adecuadas. Si tu vuelo se cancela por motivos meteorológicos o de seguridad, eliges entre una nueva fecha o un reembolso completo sin cargos.",
        },
        {
          q: "¿Cuánto tiempo estamos en el aire?",
          a: "El globo vuela aproximadamente 60 minutos. Planifica toda la mañana, desde la recogida entre las 04:00 y las 05:00 hasta la devolución alrededor de las 10:00.",
        },
        {
          q: "¿Qué debo llevar y ponerme?",
          a: "Lleva ropa de abrigo por capas y calzado cerrado, porque hace fresco antes del amanecer. Trae un sombrero, gafas de sol y tu cámara. Del resto nos encargamos nosotros.",
        },
        {
          q: "¿Hay límites de edad o de peso?",
          a: "Los niños a partir de 3 años pueden volar acompañados de un adulto. Para los viajeros que pesen 140 kg o más, contáctanos por WhatsApp para comprobar si es posible acomodarte con seguridad.",
          link: {
            href: waLink(
              "¡Hola! Peso 140 kg o más y tengo una duda sobre los vuelos en globo en Agadir. ¿Podéis comprobar si es posible acomodarme con seguridad?",
            ),
            label: "Contáctanos por WhatsApp",
          },
        },
        {
          q: "¿También voláis en Marrakech?",
          a: "Sí. Marrakech es nuestro segundo destino, operado por el mismo equipo de Agadir, con su propia zona de despegue en el desierto a las afueras de la ciudad y sus propios paquetes y precios.",
          link: { href: "/es/globo-aerostatico-marrakech", label: "Descubre nuestros vuelos a Marrakech" },
        },
        /* FAQ de SEO Fase E (aprobación del propietario 2026-11-21): añadidas
         * al FINAL de la lista, traducidas de las FAQ inglesas. */
        {
          q: "¿Puedo reservar un vuelo en globo privado en Agadir?",
          a: "Sí. El Private Flight te ofrece el globo entero solo para tu grupo: 6.999 MAD por persona con un mínimo de 2 personas, transporte privado, tu propio piloto y un desayuno bereber privado tradicional bajo un argán.",
        },
        {
          q: "¿Cuándo despegan los vuelos en globo en Agadir?",
          a: "Cada vuelo es un vuelo al amanecer: el globo despega a primera luz, justo cuando el sol sale sobre las montañas del Atlas, y toda la mañana termina alrededor de las 10:00 con la devolución en tu hotel.",
        },
        {
          q: "¿Pueden ir bebés en el vuelo en globo en Agadir?",
          a: "Por motivos de seguridad, los bebés no están permitidos en los vuelos en globo. Los niños a partir de 3 años son bienvenidos y pueden volar acompañados de un adulto.",
        },
      ],
      waMessage:
        "¡Hola! Me gustaría reservar mi vuelo en globo en Agadir. Enviadme la disponibilidad y los precios, por favor.",
      faqWaMessage: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Agadir.",
      stats: [
        { value: "5,0", label: "Nota en Google", icon: "star" },
        { value: "60 min", label: "Sobre el valle del Souss", icon: "sun" },
        { value: "100%", label: "Seguridad", icon: "shield" },
        { value: "24/7", label: "Reserva por WhatsApp", icon: "users" },
      ],
      whyUs: [
        {
          icon: "badge",
          title: "Base en Agadir",
          text: "Somos una empresa de Agadir de pies a cabeza. Nuestros pilotos marroquíes con licencia vuelan sobre el valle del Souss cada mañana, todo el año.",
        },
        {
          icon: "shield",
          title: "La seguridad primero",
          text: "Comprobaciones diarias del equipo, seguro completo para los pasajeros y estricto cumplimiento de las normas de la aviación civil marroquí en cada vuelo.",
        },
        {
          icon: "bus",
          title: "Recogida en el hotel en Agadir",
          text: "Disfruta del transporte de ida y vuelta gratuito desde la ciudad de Agadir, Taghazout y Tamraght.",
        },
        {
          icon: "sparkles",
          title: "Mañana todo incluido",
          text: "Café de bienvenida y té marroquí, unos 60 minutos sobre el valle del Souss, un desayuno bereber en una jaima caïdal y tu certificado de vuelo oficial.",
        },
      ],
      pickupAreas: [
        { name: "Ciudad de Agadir", note: agadirPickupNote, included: true },
        { name: "Taghazout", note: agadirPickupNote, included: true },
        { name: "Tamraght", note: agadirPickupNote, included: true },
      ],
    },
    marrakech: {
      cityName: "Marrakech",
      bookingDestination: "Marrakech",
      headline: "Vuelos en globo aerostático en Marrakech",
      intro:
        "Nuestro segundo destino, operado por el mismo equipo con base en Agadir. Despega del desierto a las afueras de la ciudad roja y mira cómo las montañas del Atlas se tiñen de oro al amanecer.",
      launchSite: "Zona de despegue en el desierto, a unos 30 minutos del centro de Marrakech",
      offers: [
        localizeOffer("mk-classic", {
          cityName: "Marrakech",
          name: "Classic Low Cost",
          description:
            "Nuestra forma más económica de sobrevolar los paisajes desérticos de los alrededores de Marrakech. Únete a un grupo amable, disfruta de un vuelo en globo compartido de unos 40 minutos y termina la mañana con un desayuno bereber tradicional en una kasbah. El amanecer y el primer vuelo de la mañana no están garantizados.",
          duration: "Aproximadamente 40 minutos en el aire",
          groupSize: "Globo compartido, máximo 19 personas",
          imageAlt:
            "Globo aerostático flotando sobre el desierto de Marrakech con las montañas nevadas del Atlas al fondo",
          features: [
            { icon: "bus", label: "Minibús compartido con varios puntos de recogida" },
            { icon: "coffee", label: "Café y té marroquí a la llegada" },
            { icon: "clock", label: "Vuelo en globo compartido de unos 40 minutos" },
            { icon: "users", label: "Globo compartido, máximo 19 personas" },
            { icon: "coffee", label: "Desayuno bereber tradicional en una kasbah" },
          ],
          badge: "El más popular",
        }),
        localizeOffer("mk-comfort", {
          cityName: "Marrakech",
          name: "Classic Flight",
          description:
            "Nuestra mañana estrella en globo en Marrakech. Recorre el desierto en un 4x4, vuela unos 60 minutos con las montañas del Atlas en el horizonte y aterriza para un desayuno bereber tradicional en una kasbah con vistas a las montañas.",
          duration: "Aproximadamente 60 minutos en el aire",
          groupSize: "Globo compartido",
          imageAlt:
            "Globo aerostático volando sobre un pueblo de kasbah marroquí con las montañas del Atlas al amanecer",
          features: [
            { icon: "bus", label: "Transporte en vehículo 4x4" },
            { icon: "coffee", label: "Café y té marroquí a la llegada" },
            { icon: "clock", label: "Vuelo en globo de unos 60 minutos" },
            { icon: "award", label: "Certificado de vuelo oficial" },
            { icon: "coffee", label: "Desayuno bereber en una kasbah con vistas a las montañas del Atlas" },
          ],
        }),
        localizeOffer("mk-private", {
          cityName: "Marrakech",
          name: "Private Flight",
          description:
            "El globo entero solo para tu grupo. Viaja en un 4x4 privado, vuela unos 60 minutos sobre los paisajes desérticos de Marrakech y disfruta de un desayuno bereber tradicional en una jaima privada con vistas a las montañas del Atlas. Ideal para parejas, familias y ocasiones especiales.",
          duration: "Aproximadamente 60 minutos en el aire",
          groupSize: "Globo privado",
          imageAlt:
            "Una pareja de pie en la cesta de un globo aerostático sobre Marrakech al amanecer",
          features: [
            { icon: "heart", label: "Transporte privado en 4x4" },
            { icon: "coffee", label: "Café y té marroquí a la llegada" },
            { icon: "clock", label: "Vuelo en globo privado de unos 60 minutos" },
            { icon: "award", label: "Certificado de vuelo oficial" },
            { icon: "coffee", label: "Desayuno bereber en una jaima privada con vistas a las montañas del Atlas" },
          ],
        }),
        localizeOffer("mk-royal", {
          cityName: "Marrakech",
          name: "Royal Flight",
          description:
            "El globo entero solo para tu grupo, elevado a la mañana más exclusiva de Marrakech. Viaja en un 4x4 privado, vuela unos 60 minutos sobre los paisajes desérticos de Marrakech y disfruta de tu desayuno bereber servido en el aire a bordo del globo, con las montañas del Atlas en el horizonte.",
          duration: "Aproximadamente 60 minutos en el aire",
          groupSize: "Globo privado",
          imageAlt:
            "Una pareja disfrutando del desayuno en el aire a bordo de un globo aerostático privado sobre Marrakech al amanecer",
          features: [
            { icon: "heart", label: "Transporte privado en 4x4" },
            { icon: "coffee", label: "Café y té marroquí a la llegada" },
            { icon: "clock", label: "Vuelo en globo privado de unos 60 minutos" },
            { icon: "coffee", label: "Desayuno servido en el aire a bordo del globo" },
            { icon: "award", label: "Certificado de vuelo oficial" },
          ],
          badge: "Experiencia real",
        }),
      ],
      timeline: [
        {
          time: "04:45",
          title: "Recogida en el hotel",
          text: "Tu conductor te recoge en tu hotel o riad de Marrakech mientras el cielo todavía está oscuro.",
        },
        {
          title: "Inflado y charla de seguridad",
          text: "Mira cómo el globo cobra vida en el desierto a las afueras de Marrakech y conoce a tu piloto durante la charla de seguridad.",
        },
        {
          title: "Despegue al amanecer",
          text: "El quemador ruge, el suelo se aleja y el sol sale contigo sobre el desierto.",
        },
        {
          title: "45 a 60 minutos en el aire",
          text: "Flota sobre las llanuras desérticas de Marrakech con las montañas del Atlas en el horizonte.",
        },
        {
          title: "Ceremonia de aterrizaje",
          text: "Un aterrizaje suave seguido del tradicional brindis del piloto con la tripulación.",
        },
        {
          title: "Desayuno bereber",
          text: "Msemen frescos, dátiles, huevos, té a la menta y café servidos en la zona de aterrizaje.",
        },
        {
          title: "Certificado de vuelo",
          text: "Recibes tu certificado personalizado antes del trayecto de vuelta.",
        },
        {
          time: "Sobre las 10:00",
          title: "De vuelta en tu hotel",
          text: "Devolución en Marrakech con la cámara llena de recuerdos e historias que contar.",
        },
      ],
      faqs: [
        {
          q: "¿Desde dónde despegan los vuelos en globo en Marrakech?",
          a: "Los vuelos a Marrakech despegan de nuestra zona de despegue en el desierto, a unos 30 minutos del centro de Marrakech.",
        },
        {
          q: "¿A qué hora es la recogida en el hotel en Marrakech?",
          a: "Te recogemos en tu hotel o riad aproximadamente una hora antes del despegue, a primera hora de la mañana antes del amanecer. Tu hora exacta de recogida se confirma por WhatsApp el día anterior al vuelo.",
        },
        {
          q: "¿Está incluido el traslado desde el hotel en Marrakech?",
          a: "Sí, la recogida y la devolución desde todos los hoteles y riads de la zona de la ciudad de Marrakech están incluidas en cada vuelo a Marrakech.",
        },
        {
          q: "¿Qué pasa si hace mal tiempo?",
          a: "Los vuelos dependen de unas condiciones meteorológicas y de viento adecuadas. Si tu vuelo se cancela por motivos meteorológicos o de seguridad, eliges entre una nueva fecha o un reembolso completo sin cargos.",
        },
        {
          q: "¿Qué incluyen los vuelos a Marrakech?",
          a: "Cada vuelo a Marrakech incluye el transporte, el café y el té marroquí a la llegada, el vuelo en globo, el desayuno y el certificado de vuelo. El Classic Low Cost cuesta 999 MAD por persona, el Classic Flight 1.399 MAD por persona, el Private Flight 5.299 MAD por persona con un mínimo de 2 personas y el Royal Flight 6.299 MAD por persona con un mínimo de 2 personas y el desayuno servido en el aire a bordo del globo.",
        },
        {
          q: "¿Dónde tiene la sede vuestra empresa?",
          a: "Nuestra base está en Agadir, donde volamos sobre el valle del Souss cada mañana. Marrakech es nuestro segundo destino, volado por el mismo equipo con licencia.",
          link: { href: "/es", label: "Descubre nuestros vuelos a Agadir" },
        },
        /* FAQ de SEO Fase E: añadidas al FINAL de la lista. */
        {
          q: "¿Cuánto cuesta un vuelo en globo en Marrakech?",
          a: "El Classic Low Cost cuesta 999 MAD por persona, el Classic Flight 1.399 MAD por persona, el Private Flight 5.299 MAD por persona con un mínimo de 2 personas y el Royal Flight 6.299 MAD por persona con un mínimo de 2 personas.",
        },
        {
          q: "¿Cuánto dura el vuelo en globo en Marrakech?",
          a: "El Classic Low Cost vuela unos 40 minutos. El Classic Flight, el Private Flight y el Royal Flight vuelan unos 60 minutos, flotando sobre las llanuras desérticas a las afueras de Marrakech.",
        },
        {
          q: "¿Puedo reservar un vuelo en globo privado en Marrakech?",
          a: "Sí. El Private Flight cuesta 5.299 MAD por persona con un mínimo de 2 personas y el Royal Flight 6.299 MAD por persona con un mínimo de 2 personas y tu desayuno bereber servido en el aire a bordo del globo.",
        },
        {
          q: "¿El vuelo en globo en Marrakech es al amanecer?",
          a: "Sí, cada vuelo a Marrakech es una experiencia de primera hora de la mañana al amanecer: recogida en el hotel a las 04:45, despegue al amanecer y devolución en tu hotel alrededor de las 10:00.",
        },
      ],
      waMessage:
        "¡Hola! Me gustaría reservar un vuelo en globo en Marrakech. Enviadme la disponibilidad y los precios, por favor.",
      faqWaMessage: "¡Hola! Tengo una pregunta sobre los vuelos en globo en Marrakech.",
    },
  },
  weatherNote:
    "Los vuelos están sujetos a unas condiciones meteorológicas y de viento adecuadas. Si tenemos que cancelar por motivos de seguridad, eliges entre una nueva fecha o un reembolso completo.",
  reviewHighlights: [
    "Piloto con licencia profesional",
    "Vuelo al amanecer seguro y suave",
    "Desayuno estupendo tras el aterrizaje",
  ],
  gallery: {
    agadir: agadirGallery,
    marrakech: marrakechGallery,
  },
};
