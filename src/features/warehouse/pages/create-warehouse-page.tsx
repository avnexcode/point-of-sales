import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import { CreateWarehouseForm } from "../forms";

type CreateWarehousePageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateWarehousePage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("pages.warehouse.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("pages.warehouse.title")}
          className="space-y-10"
        >
          <CreateWarehouseForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

CreateWarehousePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateWarehousePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
