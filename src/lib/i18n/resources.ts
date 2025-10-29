import en from "./locales/en.json";
import id from "./locales/id.json";

export const defaultNS = "translation";
export const supportedLngs = ["en", "id"] as const;

export const resources = {
  en: { translation: en },
  id: { translation: id },
} as const;
