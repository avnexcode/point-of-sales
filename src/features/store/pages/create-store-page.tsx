import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import { CreateStoreForm } from "../forms";

type CreateStorePageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateStorePage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.store.title")}>
      <SectionContainer padded>
        <DashboardLayout title={t("pages.store.title")}>
          <CreateStoreForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

CreateStorePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateStorePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
