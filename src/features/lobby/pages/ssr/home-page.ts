import { getSSRTranslator } from "@/lib/ssr-helpers";
import type { GetServerSideProps } from "next";

export const HomePageSSR: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const { t } = await getSSRTranslator(context);

  console.log({ fromHomePage: t("home.title", { highlight: "World" }) });

  return {
    props: { sidebarDefaultOpen },
  };
};
