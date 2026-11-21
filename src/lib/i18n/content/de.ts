import type { SiteContent } from "../types";
import { waLink, type Offer, type OfferFeature } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import { agadirOffers, marrakechOffers } from "@/lib/site";

/**
 * German site content («Marrakesch» spelling per owner decision).
 *
 * Only the localized strings live here. The NUMERIC and structural fields
 * (priceMad, minGuests, images, ids, city keys) are pulled from site.ts by
 * offer id, so the prices can never drift from the single source of truth.
 * The frozen English seoDescription fields are dropped on purpose: the
 * German JSON-LD uses the German description instead.
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

const agadirPickupNote = "Hin- und Rückabholung vom Hotel inklusive";

const agadirGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery-kasbah-takeoff.webp",
    alt: "Rot grüner Heißluftballon steigt hinter einer traditionellen marokkanischen Kasbah in der Dämmerung auf",
    caption: "Start an der Kasbah",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-berber-breakfast.webp",
    alt: "Gäste teilen ein traditionelles berberisches Frühstück an einem niedrigen Tisch nach ihrer Fahrt",
    caption: "Berberisches Frühstück",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-tagine-ceramics.webp",
    alt: "Handbemalte marokkanische Tajine Töpfe mit blauen und weißen Mustern auf dem Frühstückstisch",
    caption: "Marokkanische Tajines",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-golden-balloon-argan-trees.webp",
    alt: "Goldener rot kariierter Heißluftballon schwebt bei Sonnenaufgang über den Arganbäumen",
    caption: "Über den Arganbäumen",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-palm-camp-view.webp",
    alt: "Heißluftballon hinter Palmenwedeln über dem berberischen Camp bei Sonnenaufgang",
    caption: "Hinter den Palmen",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-basket-aerial-view.webp",
    alt: "Blick aus dem Ballonkorb über die Landschaft des Souss-Tals in der Dämmerung",
    caption: "Aus dem Korb",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-argan-camp-arrival.jpg",
    alt: "Arganbaum beschattet das berberische Camp, ein 4x4 parkt an der Mauer im dunstigen Morgen",
    caption: "Ankunft im Camp",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-terrace-view.webp",
    alt: "Rot grüner Heißluftballon von der schattigen Terrasse zwischen dunklen Holzbalken aus gesehen",
    caption: "Blick von der Terrasse",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-campfire-night.jpg",
    alt: "Gäste teilen Minzentee rund um Laternen und ein knisterndes Lagerfeuer unter den Arganbäumen bei Nacht",
    caption: "Abend am Feuer",
    width: 1086,
    height: 1448,
  },
  {
    type: "image",
    src: "/images/gallery-guests-launch-morning.webp",
    alt: "Gäste versammeln sich am frühen Morgen auf dem Ballonstartplatz",
    caption: "Gäste vor der Fahrt",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-window-view.webp",
    alt: "Rot grüner Heißluftballon mit goldenem gemusterten Band, gesehen durch ein offenes Fenster in der Dämmerung",
    caption: "Durch das Fenster",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-checkered-balloon-closeup.webp",
    alt: "Nahaufnahme eines goldenen rot kariierten Heißluftballons, der in den Morgenhimmel steigt",
    caption: "Aufstieg bei Sonnenaufgang",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/images/gallery-inflation-dawn-fire.jpg",
    alt: "Crew hält den Korb eines riesigen roten Heißluftballons in der Dämmerung neben einem lodernden Feuer",
    caption: "Aufrüsten in der Dämmerung",
    width: 896,
    height: 1600,
  },
  {
    type: "image",
    src: "/images/gallery-balloon-camp-frame.webp",
    alt: "Goldener rot kariierter Heißluftballon eingerahmt von der dunklen Silhouette des Camps in der Dämmerung",
    caption: "Ballon vom Camp aus",
    width: 918,
    height: 1224,
  },
  {
    type: "image",
    src: "/images/gallery-red-balloon-flight.webp",
    alt: "Rot grüner Heißluftballon fliegt früh am Morgen über das Souss-Tal nahe Agadir",
    caption: "Morgenfahrt",
    width: 1080,
    height: 1350,
  },
];

const marrakechGallery: GalleryItem[] = [
  {
    type: "image",
    src: "/images/marrakech-sunrise-village.webp",
    alt: "Bunte Heißluftballons schweben bei Sonnenaufgang über einem traditionellen Lehmdorf in der Wüste von Marrakesch, Berge am Horizont",
    caption: "Sonnenaufgang über dem Dorf",
    width: 1928,
    height: 2560,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-breakfast.jpg",
    alt: "Frühstück serviert im Inneren eines Ballonkorbs bei Sonnenaufgang, draußen viele fliegende Ballons",
    caption: "Frühstück in der Luft",
    width: 500,
    height: 400,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-sunset.webp",
    alt: "Gelber Heißluftballon steigt in einen goldenen Abendhimmel auf, umgeben von anderen Ballons über der Wüste",
    caption: "Fahrt zur goldenen Stunde",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-morocco-balloon-atlas.webp",
    alt: "Rot weiß grüner Marokko Heißluftballon fliegt dem Sonnenaufgang entgegen, dahinter das Atlasgebirge",
    caption: "Marokko Ballon bei Sonnenaufgang",
    width: 554,
    height: 554,
  },
  {
    type: "image",
    src: "/images/marrakech-red-star-balloon.jpg",
    alt: "Großer roter Heißluftballon mit dem grünen marokkanischen Stern über der Ebene beim goldenen Sonnenaufgang",
    caption: "Marokkanischer Sternballon",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-atlas.jpg",
    alt: "Grün roter gestreifter Heißluftballon über einem felsigen Wüstenhügel mit dem schneebedeckten Hohen Atlas am Horizont unter klarem blauem Himmel",
    caption: "Grüner Ballon vor dem Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-red-balloon-hazy-sunset.jpg",
    alt: "Roter Heißluftballon hoch über einer dunstigen Wüstenebene bei Sonnenuntergang, entfernte Berge und kleinere Ballons ringsum",
    caption: "Roter Ballon bei Sonnenuntergang",
    width: 547,
    height: 365,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-green-plains.jpg",
    alt: "Viele bunte Heißluftballons ziehen über grüne Felder und ein traditionelles Dorf, Berge am Horizont unter klarem blauem Himmel",
    caption: "Ballons über den Ebenen",
    width: 738,
    height: 414,
  },
  {
    type: "image",
    src: "/images/marrakech-yellow-balloon-green-fields.webp",
    alt: "Gelber Heißluftballon leuchtet bei goldenem Sonnenaufgang, viele bunte Ballons ringsum und grüne Felder unten",
    caption: "Ballons zur goldenen Stunde",
    width: 447,
    height: 447,
  },
  {
    type: "image",
    src: "/images/marrakech-launch-site-dawn.jpg",
    alt: "Heißluftballons stehen in der Dämmerung auf dem Wüstenstartplatz, vorne ein großer roter Ballon mit dem grünen marokkanischen Stern, rosa Himmel",
    caption: "Dämmerung am Startplatz",
    width: 452,
    height: 678,
  },
  {
    type: "image",
    src: "/images/marrakech-green-balloon-palms.jpg",
    alt: "Grün roter gestreifter Heißluftballon landet zwischen Palmen, dahinter die schneebedeckten Atlasberge unter blauem Himmel",
    caption: "Grüner Ballon und der Atlas",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-basket-passengers-burner.jpg",
    alt: "Glückliche Passagiere stehen in einem großen Weidenkorb, während der Brenner die orange Hülle über ihnen erhitzt, klarer Himmel",
    caption: "Passagiere und der Brenner",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-balloons-morning-fields.jpg",
    alt: "Dutzende bunte Heißluftballons verteilen sich über einen blauen Morgenhimmel über grünen und goldenen Feldern, Hügel am Horizont",
    caption: "Die Morgenflotte",
    width: 678,
    height: 452,
  },
  {
    type: "image",
    src: "/images/marrakech-checkered-balloon-descent.jpg",
    alt: "Kariierter Heißluftballon sinkt zur Wüste hinab, dahinter ein weißer und ein oranger Ballon und unten das Verfolgungsfahrzeug",
    caption: "Sanfte Landung",
    width: 494,
    height: 619,
  },
  {
    type: "image",
    src: "/images/marrakech-star-balloon-inflight.jpg",
    alt: "Roter Heißluftballon mit dem grünen marokkanischen Stern über dem Wüstendorf bei Sonnenaufgang, gesehen aus einem Nachbarballon",
    caption: "Der marokkanische Stern im Flug",
    width: 486,
    height: 411,
  },
];

export const de: SiteContent = {
  locale: "de",
  destinations: {
    agadir: {
      cityName: "Agadir",
      bookingDestination: "Agadir",
      headline: "Ballonfahrten in Agadir",
      intro:
        "Unsere Heimbasis und das Herz von allem, was wir tun. Jeden Morgen heben wir vom Souss-Tal ab und schweben über grüne Felder, Arganbäume und berberische Dörfer, während das Atlasgebirge am Horizont leuchtet.",
      launchSite: "Startplatz im Souss-Tal, ca. 50 Minuten bis 1 Stunde von der Agadir Innenstadt entfernt",
      offers: [
        localizeOffer("agadir-classic", {
          cityName: "Agadir",
          name: "Classic Flight",
          description:
            "Unser Agadir Sonnenaufgang der Extraklasse. Teilen Sie sich einen Ballon mit einer kleinen Gruppe, schweben Sie über das wunderschöne Souss-Tal mit Panoramablick auf das Atlasgebirge und landen Sie zu einem traditionellen berberischen Frühstück in einem Caïdal-Zelt.",
          duration: "Rund 60 Minuten in der Luft",
          groupSize: "Gemeinsamer Korb",
          imageAlt:
            "Passagiere im Weidenkorb eines Heißluftballons mit dröhnendem Brenner bei Sonnenaufgang über dem Souss-Tal nahe Agadir",
          features: [
            { icon: "bus", label: "Hin- und Rücktransport ab Agadir" },
            { icon: "coffee", label: "Willkommenskaffee und marokkanischer Tee" },
            { icon: "mountain", label: "Blick auf das Souss-Tal und den Atlas" },
            { icon: "tent", label: "Berberisches Frühstück in einem Caïdal-Zelt" },
            { icon: "award", label: "Offizielles Flugzertifikat" },
          ],
          badge: "Am beliebtesten",
        }),
        localizeOffer("agadir-private", {
          cityName: "Agadir",
          name: "Private Flight",
          description:
            "Das ultimative exklusive Erlebnis. Ihr eigener Ballon, Ihr eigener Pilot und ein persönlicher Morgen über dem Souss-Tal, gemacht für Paare, Familien, Heiratsanträge und besondere Anlässe.",
          duration: "Rund 60 Minuten in der Luft",
          groupSize: "Privater Korb, mindestens 2 Gäste",
          imageAlt:
            "Paar und Pilot fliegen in einem privaten Heißluftballonkorb über der Landschaft des Souss-Tals bei Sonnenaufgang",
          features: [
            { icon: "bus", label: "Privater Transport" },
            { icon: "heart", label: "Exklusiver privater Ballon" },
            { icon: "sparkles", label: "Persönliches Erlebnis" },
            { icon: "award", label: "Flugzertifikat" },
            { icon: "tent", label: "Traditionelles privates berberisches Frühstück unter einem Arganbaum" },
          ],
          badge: "Luxus und Exklusivität",
        }),
      ],
      experienceSteps: [
        {
          time: "04:00 bis 05:00",
          title: "Abholung im Hotel in Agadir",
          text: "Ihr Fahrer holt Sie von Ihrem Hotel ab, während die Stadt noch schläft. Die genaue Uhrzeit hängt von der Saison und der Lage Ihres Hotels ab.",
        },
        {
          time: "Bei Ankunft",
          title: "Willkommenskaffee und Tee",
          text: "Kommen Sie am Startplatz im Souss-Tal an und genießen Sie eine herzliche marokkanische Begrüßung mit Kaffee und traditionellem Minzentee.",
        },
        {
          time: "Vor Morgengrauen",
          title: "Aufrüsten des Ballons",
          text: "Sehen Sie zu, wie der Ballon zum Leben erwacht, während die Crew die Hülle füllt, und lernen Sie Ihren lizenzierten Piloten beim Sicherheitsbriefing kennen.",
        },
        {
          time: "Sonnenaufgang",
          title: "Start beim ersten Licht",
          text: "Der Brenner dröhnt, der Boden schwindet und Sie steigen auf, während die Sonne über dem Atlasgebirge aufgeht.",
        },
        {
          time: "In der Luft",
          title: "60 Minuten über dem Souss-Tal",
          text: "Genießen Sie rund eine Stunde friedliches Fliegen über grüne Felder, Arganbäume und berberische Dörfer.",
        },
        {
          time: "In der Luft",
          title: "Panoramalandschaften",
          text: "Bewundern Sie die atemberaubende Landschaft des Souss-Tals und das Atlasgebirge im Morgenlicht.",
        },
        {
          time: "Nach der Landung",
          title: "Traditionelles berberisches Frühstück",
          text: "Lassen Sie sich ein traditionelles marokkanisches berberisches Frühstück in einem traditionellen Caïdal-Zelt servieren, mit Minzentee und frischen Msemen.",
        },
        {
          time: "Zeremonie",
          title: "Ihr Flugzertifikat",
          text: "Erhalten Sie Ihr offizielles Flugzertifikat, ein persönliches Andenken an Ihren Morgen im Himmel über Agadir.",
        },
        {
          time: "Gegen 10:00 Uhr",
          title: "Rückkehr zu Ihrem Hotel",
          text: "Entspannen Sie auf der Fahrt zurück zu Ihrem Hotel, mit einer Kamerakarte voller Erinnerungen. Das Erlebnis endet normalerweise gegen 10:00 Uhr.",
        },
      ],
      faqs: [
        {
          q: "Wann findet die Hotelabholung in Agadir statt?",
          a: "Die Abholung von Ihrem Agadir Hotel findet früh am Morgen statt, zwischen 04:00 und 05:00 Uhr, je nach Saison und Lage Ihres Hotels. Das gesamte Erlebnis endet gegen 10:00 Uhr mit der Rückgabe an Ihrem Hotel.",
        },
        {
          q: "Von wo starten die Ballonfahrten?",
          a: "Unsere Startplätze liegen im Souss-Tal, ca. 50 Minuten bis 1 Stunde von der Agadir Innenstadt entfernt.",
        },
        {
          q: "Ist der Transport von meinem Hotel inklusive?",
          a: "Ja! Die Hin- und Rückabholung vom Hotel ist für Gäste in der Stadt Agadir, in Taghazout und in Tamraght inklusive. Unser Team stimmt Ihren genauen Abholort und Ihre Abholzeit über WhatsApp mit Ihnen ab.",
        },
        {
          q: "Was ist im Preis enthalten?",
          a: "Der Classic Flight kostet 2.199 MAD pro Person und beinhaltet den Hin- und Rücktransport ab Agadir, Willkommenskaffee und marokkanischen Tee, die Ballonfahrt über dem Souss-Tal, ein traditionelles berberisches Frühstück in einem Caïdal-Zelt und das offizielle Flugzertifikat. Der Private Flight kostet 6.999 MAD pro Person mit mindestens 2 Gästen und beinhaltet einen privaten Transport, einen exklusiven Ballon und ein traditionelles privates berberisches Frühstück unter einem Arganbaum.",
        },
        {
          q: "Was passiert bei schlechtem Wetter?",
          a: "Ballonfahren hängt von geeignetem Wetter und Wind ab. Wenn Ihre Fahrt aus Wetter- oder Sicherheitsgründen abgesagt wird, wählen Sie zwischen einem neuen Datum oder einer vollständigen Rückerstattung ohne Gebühren.",
        },
        {
          q: "Wie lange sind wir in der Luft?",
          a: "Der Ballon fliegt ungefähr 60 Minuten. Planen Sie den ganzen Vormittag ein, von der Abholung zwischen 04:00 und 05:00 Uhr bis zur Rückgabe gegen 10:00 Uhr.",
        },
        {
          q: "Was soll ich anziehen und mitbringen?",
          a: "Tragen Sie warme Schichten und geschlossene Schuhe, denn vor Sonnenaufgang ist es kühl. Bringen Sie eine Mütze, eine Sonnenbrille und Ihre Kamera mit. Den Rest stellen wir.",
        },
        {
          q: "Gibt es Alters- oder Gewichtsbeschränkungen?",
          a: "Kinder ab 3 Jahren dürfen mit einem Erwachsenen mitfliegen. Für Gäste mit 140 kg oder mehr kontaktieren Sie uns bitte auf WhatsApp, damit wir prüfen können, ob wir Sie sicher mitnehmen können.",
          link: {
            href: waLink(
              "Hallo! Ich wiege 140 kg oder mehr und habe eine Frage zu den Ballonfahrten in Agadir. Könnten Sie bitte prüfen, ob es möglich ist, mich sicher mitzunehmen?",
            ),
            label: "Kontaktieren Sie uns auf WhatsApp",
          },
        },
        {
          q: "Fliegen Sie auch in Marrakesch?",
          a: "Ja. Marrakesch ist unser zweites Reiseziel, betrieben vom selben Team aus Agadir, mit eigenem Startplatz in der Wüste vor der Stadt und eigenen Paketen und Preisen.",
          link: { href: "/de/ballonfahrt-marrakesch", label: "Entdecken Sie unsere Marrakesch Fahrten" },
        },
      ],
      waMessage:
        "Hallo! Ich möchte meine Ballonfahrt in Agadir buchen. Bitte senden Sie mir Verfügbarkeit und Preise.",
      faqWaMessage: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Agadir.",
      stats: [
        { value: "5,0", label: "Google Bewertung", icon: "star" },
        { value: "60 Min.", label: "Über dem Souss-Tal", icon: "sun" },
        { value: "100%", label: "Sicherheitsbilanz", icon: "shield" },
        { value: "24/7", label: "Buchung über WhatsApp", icon: "users" },
      ],
      whyUs: [
        {
          icon: "badge",
          title: "Agadir Heimbasis",
          text: "Wir sind mit Herz und Seele ein Agadir Unternehmen. Unsere lizenzierten marokkanischen Piloten fliegen jeden einzelnen Morgen, das ganze Jahr über, das Souss-Tal.",
        },
        {
          icon: "shield",
          title: "Sicherheit zuerst",
          text: "Tägliche Ausrüstungsprüfungen, Vollversicherung für alle Passagiere und strenge Einhaltung der marokkanischen Luftfahrtvorschriften bei jeder Fahrt.",
        },
        {
          icon: "bus",
          title: "Hotelabholung in Agadir",
          text: "Genießen Sie den kostenlosen Hin- und Rücktransport von der Agadir Stadt, Taghazout und Tamraght.",
        },
        {
          icon: "sparkles",
          title: "Morgen inklusive allem",
          text: "Willkommenskaffee und marokkanischer Tee, rund 60 Minuten über dem Souss-Tal, ein berberisches Frühstück in einem Caïdal-Zelt und Ihr offizielles Flugzertifikat.",
        },
      ],
      pickupAreas: [
        { name: "Agadir Stadt", note: agadirPickupNote, included: true },
        { name: "Taghazout", note: agadirPickupNote, included: true },
        { name: "Tamraght", note: agadirPickupNote, included: true },
      ],
    },
    marrakech: {
      cityName: "Marrakesch",
      bookingDestination: "Marrakech",
      headline: "Ballonfahrten in Marrakesch",
      intro:
        "Unser zweites Reiseziel, betrieben vom selben Team aus Agadir. Heben Sie am Rand der roten Stadt aus der Wüste ab und sehen Sie zu, wie das Atlasgebirge bei Sonnenaufgang golden wird.",
      launchSite: "Wüstenstartgebiet, ca. 30 Minuten vom Zentrum von Marrakesch entfernt",
      offers: [
        localizeOffer("mk-classic", {
          cityName: "Marrakesch",
          name: "Classic Low Cost",
          description:
            "Unser günstigster Weg, über die Wüstenlandschaften rund um Marrakesch zu fliegen. Schließen Sie sich einer freundlichen Gruppe an, genießen Sie eine gemeinsame Ballonfahrt von rund 40 Minuten und beenden Sie den Morgen mit einem traditionellen berberischen Frühstück in einer Kasbah. Sonnenaufgang und der erste Flug des Morgens sind nicht garantiert.",
          duration: "Rund 40 Minuten in der Luft",
          groupSize: "Gemeinsamer Ballon, maximal 19 Personen",
          imageAlt:
            "Heißluftballon schwebt über der Wüste von Marrakesch, dahinter die schneebedeckten Berge des Atlas",
          features: [
            { icon: "bus", label: "Gemeinsamer Minibus mit mehreren Abholpunkten" },
            { icon: "coffee", label: "Kaffee und marokkanischer Tee bei Ankunft" },
            { icon: "clock", label: "Gemeinsame Ballonfahrt von rund 40 Minuten" },
            { icon: "users", label: "Gemeinsamer Ballon, maximal 19 Personen" },
            { icon: "coffee", label: "Traditionelles berberisches Frühstück in einer Kasbah" },
          ],
          badge: "Am beliebtesten",
        }),
        localizeOffer("mk-comfort", {
          cityName: "Marrakesch",
          name: "Classic Flight",
          description:
            "Unser klassischer Ballonmorgen in Marrakesch. Fahren Sie mit einem 4x4 durch die Wüste, fliegen Sie rund 60 Minuten mit dem Atlasgebirge am Horizont und landen Sie zu einem traditionellen berberischen Frühstück in einer Kasbah mit Blick auf die Berge.",
          duration: "Rund 60 Minuten in der Luft",
          groupSize: "Gemeinsamer Ballon",
          imageAlt:
            "Heißluftballon über einem marokkanischen Kasbah Dorf mit dem Atlasgebirge bei Sonnenaufgang",
          features: [
            { icon: "bus", label: "Transport im 4x4 Fahrzeug" },
            { icon: "coffee", label: "Kaffee und marokkanischer Tee bei Ankunft" },
            { icon: "clock", label: "Ballonfahrt von rund 60 Minuten" },
            { icon: "award", label: "Offizielles Flugzertifikat" },
            { icon: "coffee", label: "Berberisches Frühstück in einer Kasbah mit Blick auf das Atlasgebirge" },
          ],
        }),
        localizeOffer("mk-private", {
          cityName: "Marrakesch",
          name: "Private Flight",
          description:
            "Der ganze Ballon nur für Ihre Gruppe. Fahren Sie in einem privaten 4x4, fliegen Sie rund 60 Minuten über die Wüstenlandschaften von Marrakesch und genießen Sie ein traditionelles berberisches Frühstück in einem privaten Zelt mit Blick auf das Atlasgebirge. Ideal für Paare, Familien und besondere Anlässe.",
          duration: "Rund 60 Minuten in der Luft",
          groupSize: "Privater Ballon",
          imageAlt:
            "Paar steht im Heißluftballonkorb über Marrakesch bei Sonnenaufgang",
          features: [
            { icon: "heart", label: "Privater 4x4 Transport" },
            { icon: "coffee", label: "Kaffee und marokkanischer Tee bei Ankunft" },
            { icon: "clock", label: "Private Ballonfahrt von rund 60 Minuten" },
            { icon: "award", label: "Offizielles Flugzertifikat" },
            { icon: "coffee", label: "Berberisches Frühstück in einem privaten Zelt mit Blick auf das Atlasgebirge" },
          ],
        }),
        localizeOffer("mk-royal", {
          cityName: "Marrakesch",
          name: "Royal Flight",
          description:
            "Der ganze Ballon nur für Ihre Gruppe, erhoben zum exklusivsten Ballonmorgen in Marrakesch. Fahren Sie in einem privaten 4x4, fliegen Sie rund 60 Minuten über die Wüstenlandschaften von Marrakesch und genießen Sie Ihr berberisches Frühstück, das in der Luft an Bord des Ballons serviert wird, mit dem Atlasgebirge am Horizont.",
          duration: "Rund 60 Minuten in der Luft",
          groupSize: "Privater Ballon",
          imageAlt:
            "Paar genießt das Frühstück in der Luft an Bord eines privaten Heißluftballons über Marrakesch bei Sonnenaufgang",
          features: [
            { icon: "heart", label: "Privater 4x4 Transport" },
            { icon: "coffee", label: "Kaffee und marokkanischer Tee bei Ankunft" },
            { icon: "clock", label: "Private Ballonfahrt von rund 60 Minuten" },
            { icon: "coffee", label: "Frühstück serviert in der Luft an Bord des Ballons" },
            { icon: "award", label: "Offizielles Flugzertifikat" },
          ],
          badge: "Königliches Erlebnis",
        }),
      ],
      timeline: [
        {
          time: "04:45",
          title: "Abholung im Hotel",
          text: "Ihr Fahrer holt Sie von Ihrem Hotel oder Riad in Marrakesch ab, während der Himmel noch dunkel ist.",
        },
        {
          title: "Aufrüsten und Briefing",
          text: "Sehen Sie zu, wie der Ballon in der Wüste vor Marrakesch zum Leben erwacht, und treffen Sie Ihren Piloten zum Sicherheitsbriefing.",
        },
        {
          title: "Start bei Sonnenaufgang",
          text: "Der Brenner dröhnt, der Boden schwindet und die Sonne geht mit Ihnen über der Wüste auf.",
        },
        {
          title: "45 bis 60 Minuten in der Luft",
          text: "Schweben Sie über die Wüstenebenen von Marrakesch mit dem Atlasgebirge am Horizont.",
        },
        {
          title: "Zeremonie nach der Landung",
          text: "Eine sanfte Landung, gefolgt vom traditionellen Pilotentoast mit der Crew.",
        },
        {
          title: "Berberisches Frühstück",
          text: "Frische Msemen, Datteln, Eier, Minzentee und Kaffee, serviert am Landeplatz.",
        },
        {
          title: "Flugzertifikat",
          text: "Sie erhalten Ihr persönliches Zertifikat vor der Rückfahrt.",
        },
        {
          time: "Gegen 10:00",
          title: "Zurück an Ihrem Hotel",
          text: "Rückgabe in Marrakesch mit einer Kamerakarte voller Erinnerungen und Geschichten zum Erzählen.",
        },
      ],
      faqs: [
        {
          q: "Von wo starten die Ballonfahrten in Marrakesch?",
          a: "Die Marrakesch Fahrten starten von unserem Wüstenstartgebiet, ca. 30 Minuten vom Zentrum von Marrakesch entfernt.",
        },
        {
          q: "Wann findet die Hotelabholung in Marrakesch statt?",
          a: "Wir holen Sie rund eine Stunde vor dem Start von Ihrem Hotel oder Riad ab, früh am Morgen vor Sonnenaufgang. Ihre genaue Abholzeit wird einen Tag vor der Fahrt über WhatsApp bestätigt.",
        },
        {
          q: "Ist der Hoteltransfer in Marrakesch inklusive?",
          a: "Ja, Abholung und Rückgabe von allen Hotels und Riads im Bereich der Stadt Marrakesch sind bei jeder Marrakesch Fahrt inklusive.",
        },
        {
          q: "Was passiert bei schlechtem Wetter?",
          a: "Die Fahrten hängen von geeignetem Wetter und Wind ab. Wenn Ihre Fahrt aus Wetter- oder Sicherheitsgründen abgesagt wird, wählen Sie zwischen einem neuen Datum oder einer vollständigen Rückerstattung ohne Gebühren.",
        },
        {
          q: "Was ist in den Marrakesch Fahrten enthalten?",
          a: "Jede Marrakesch Fahrt beinhaltet den Transport, Kaffee und marokkanischen Tee bei Ankunft, die Ballonfahrt, das Frühstück und das Flugzertifikat. Der Classic Low Cost kostet 999 MAD pro Person, der Classic Flight 1.399 MAD pro Person, der Private Flight 5.299 MAD pro Person mit mindestens 2 Gästen und der Royal Flight 6.299 MAD pro Person mit mindestens 2 Gästen und Frühstück, das in der Luft an Bord des Ballons serviert wird.",
        },
        {
          q: "Wo hat Ihr Unternehmen seinen Sitz?",
          a: "Unsere Heimbasis ist Agadir, wo wir jeden Morgen über das Souss-Tal fliegen. Marrakesch ist unser zweites Reiseziel, geflogen vom selben lizenzierten Team.",
          link: { href: "/de", label: "Entdecken Sie unsere Agadir Fahrten" },
        },
      ],
      waMessage:
        "Hallo! Ich möchte eine Ballonfahrt in Marrakesch buchen. Bitte senden Sie mir Verfügbarkeit und Preise.",
      faqWaMessage: "Hallo! Ich habe eine Frage zu den Ballonfahrten in Marrakesch.",
    },
  },
  weatherNote:
    "Die Fahrten sind von geeignetem Wetter und Wind abhängig. Wenn wir aus Sicherheitsgründen absagen müssen, wählen Sie zwischen einem neuen Datum oder einer vollständigen Rückerstattung.",
  reviewHighlights: [
    "Professioneller lizenzierter Pilot",
    "Sichere und sanfte Sonnenaufgangsfahrt",
    "Tolles Frühstück nach der Landung",
  ],
  gallery: {
    agadir: agadirGallery,
    marrakech: marrakechGallery,
  },
};
