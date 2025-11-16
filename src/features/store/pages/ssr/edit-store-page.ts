import { createSSRCaller } from "@/server/api/root";
import type { GetServerSideProps } from "next";
import type { EditStorePageProps } from "../edit-store-page";
import type { StoreResponse } from "../../types";

export const EditStorePageSSR: GetServerSideProps<EditStorePageProps> = async (
  context,
) => {
  const { req, params } = context;
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const id = params?.id as string;

  const api = await createSSRCaller(context);

  const store = await api.store.getById({ id });

  return {
    props: {
      sidebarDefaultOpen,
      store: JSON.parse(JSON.stringify(store)) as StoreResponse,
    },
  };
};
