import type { GetServerSideProps } from "next";

export const CreateWarehousePageSSR: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};
