import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources, defaultNS, supportedLngs } from "./resources";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    lng: "en",
    fallbackLng: "en",
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
      lookupLocalStorage: "language",
      lookupCookie: "language",
      cookieOptions: {
        path: "/",
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
