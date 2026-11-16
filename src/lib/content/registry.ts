import type { Lang, LangContent, PageContent } from "@/lib/types";

import { content as enCore } from "./en";
import { content as frCore } from "./fr";
import { content as de } from "./de";
import { content as es } from "./es";
import { content as nl } from "./nl";
import { content as enGuidesA } from "./en/guides-a";
import { content as enGuidesB } from "./en/guides-b";
import { content as frGuides } from "./fr/guides";

const REGISTRY: Record<Lang, LangContent[]> = {
  en: [enCore, enGuidesA, enGuidesB],
  fr: [frCore, frGuides],
  de: [de],
  es: [es],
  nl: [nl],
};

export function getContent(lang: Lang, pageId: string): PageContent | undefined {
  for (const mod of REGISTRY[lang] || []) {
    const c = mod[pageId];
    if (c) return c;
  }
  return undefined;
}
