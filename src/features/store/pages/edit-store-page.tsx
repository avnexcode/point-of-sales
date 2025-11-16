import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import { EditStoreForm } from "../forms";
import type { StoreResponse } from "../types";

export type EditStorePageProps = {
  sidebarDefaultOpen: boolean;
  store: StoreResponse;
};

export const EditStorePage = ({ store }: EditStorePageProps) => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.store.title")}>
      <SectionContainer padded>
        <DashboardLayout title={t("pages.store.title")}>
          <EditStoreForm store={store} />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

EditStorePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditStorePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
