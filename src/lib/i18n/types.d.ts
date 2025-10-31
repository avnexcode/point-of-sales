import type { resources } from "./resources";

export interface I18nTypeOptions {
  defaultNS: "translation";
  resources: (typeof resources)["en"];
  interpolation: {
    escapeValue: false;
  };
}

declare module "i18next" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CustomTypeOptions extends I18nTypeOptions {}
}
