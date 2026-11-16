import { config, waLink } from "./config";
import type { Lang } from "./types";

/** Server-safe booking link helpers (importable from both server and client code). */

export function telHref(): string {
  return `tel:${config.phoneIntl}`;
}

export function floatingWaHref(lang: Lang): string {
  const greetings: Record<Lang, string> = {
    en: "Hi! I would like to book a hot air balloon flight.",
    fr: "Bonjour ! Je souhaite réserver un vol en montgolfière.",
    de: "Hallo! Ich möchte eine Heißluftballonfahrt buchen.",
    es: "¡Hola! Quiero reservar un vuelo en globo.",
    nl: "Hallo! Ik wil een ballonvaart boeken.",
  };
  return waLink(greetings[lang]);
}

export function greetingFor(lang: Lang): string {
  const greetings: Record<Lang, string> = {
    en: "Hi! I would like to book a hot air balloon flight in Marrakech.",
    fr: "Bonjour ! Je souhaite réserver un vol en montgolfière à Marrakech.",
    de: "Hallo! Ich möchte eine Heißluftballonfahrt in Marrakesch buchen.",
    es: "¡Hola! Quiero reservar un vuelo en globo en Marrakech.",
    nl: "Hallo! Ik wil een ballonvaart in Marrakech boeken.",
  };
  return greetings[lang];
}
