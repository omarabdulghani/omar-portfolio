import { useSyncExternalStore } from "react";
import { en } from "@/locales/en";
import { nl } from "@/locales/nl";
import { ar } from "@/locales/ar";
import type { Language, LocaleMessages } from "@/locales/types";

const LANGUAGE_STORAGE_KEY = "portfolio_language";
const DEFAULT_LANGUAGE: Language = "en";

const messages: Record<Language, LocaleMessages> = {
  en,
  nl,
  ar,
};

let currentLanguage: Language = DEFAULT_LANGUAGE;
const listeners = new Set<() => void>();

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "nl" || value === "ar";
}

function applyDocumentDirection(lang: Language) {
  if (typeof window !== "undefined") {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }
}

function readStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function initializeLanguage() {
  currentLanguage = readStoredLanguage();
  applyDocumentDirection(currentLanguage);
}

initializeLanguage();

export function getLanguage(): Language {
  if (typeof window === "undefined") {
    return currentLanguage;
  }

  return currentLanguage;
}

export function setLanguage(language: Language) {
  if (language === currentLanguage) {
    return;
  }

  currentLanguage = language;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    applyDocumentDirection(language);
  }

  emitChange();
}

export function subscribeToLanguage(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getMessages(language: Language = getLanguage()) {
  return messages[language];
}

export function useLanguage() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguage,
    () => DEFAULT_LANGUAGE
  );

  return {
    language,
    setLanguage,
    messages: getMessages(language),
  };
}

export { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, messages };
export type { Language, LocaleMessages };
