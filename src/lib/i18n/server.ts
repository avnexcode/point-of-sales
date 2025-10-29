import i18next from "i18next";
import { resources, defaultNS, supportedLngs } from "./resources";

const serverI18n = i18next.createInstance();

void serverI18n.init({
  resources,
  defaultNS,
  lng: "en",
  fallbackLng: "en",
  supportedLngs,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["cookie", "navigator"],
    caches: ["cookie"],
    lookupCookie: "language",
    cookieOptions: {
      path: "/",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60,
    },
  },
});

export default serverI18n;
