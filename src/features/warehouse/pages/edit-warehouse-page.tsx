import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditWarehouseForm } from "../forms";

export type EditWarehousePageProps = {
  sidebarDefaultOpen: boolean;
};

export const EditWarehousePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: warehouse, isLoading: isWarehouseLoading } =
    api.warehouse.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer title={t("pages.warehouse.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("pages.warehouse.title")}
          className="space-y-10"
        >
          <EditWarehouseForm
            warehouse={warehouse}
            isWarehouseLoading={isWarehouseLoading}
          />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

EditWarehousePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditWarehousePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
