import type { GetServerSideProps } from "next";
import type { EditWarehousePageProps } from "../edit-warehouse-page";

export const EditWarehousePageSSR: GetServerSideProps<
  EditWarehousePageProps
> = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: {
      sidebarDefaultOpen,
    },
  };
};
