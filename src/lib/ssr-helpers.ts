import { type GetServerSidePropsContext } from "next";
import serverI18n from "./i18n/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const getSSRTranslator = async (
  context: CreateNextContextOptions | GetServerSidePropsContext,
) => {
  const { req } = context;

  const language =
    req.headers["accept-language"]?.split(",")[0]?.split("-")[0] ??
    req.cookies.i18next ??
    "en";

  await serverI18n.changeLanguage(language);

  return { language, t: serverI18n.t };
};
