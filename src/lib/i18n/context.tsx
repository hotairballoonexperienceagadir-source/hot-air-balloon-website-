"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { I18nValue } from "./types";

/**
 * Client side i18n context. Each language root layout (one per route group)
 * renders ONE provider with its own dictionary and content objects, passed
 * from the server as plain serializable props. Client components read them
 * with useI18n(); server components receive dict and content as props from
 * the page instead (they cannot consume client context).
 */

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  value,
  children,
}: {
  value: I18nValue;
  children: ReactNode;
}) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside the I18nProvider of a language layout");
  }
  return value;
}
