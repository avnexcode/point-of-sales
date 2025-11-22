import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { env } from "@/configs/env";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  WarehousePageHeader,
  WarehousePageHeaderSkeleton,
  WarehouseView,
  WarehouseViewSkeleton,
} from "../components";

type DetailWarehousePageProps = {
  sidebarDefaultOpen: boolean;
};

export const DetailWarehousePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const defaultImage = env.NEXT_PUBLIC_WAREHOUSE_IMAGE;

  const { data: warehouse, isLoading: isWarehouseLoading } =
    api.warehouse.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer title={t("pages.warehouse.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("pages.warehouse.title")}
          className="space-y-10"
        >
          {isWarehouseLoading ? (
            <WarehousePageHeaderSkeleton withAction />
          ) : (
            <WarehousePageHeader
              title={warehouse?.name ?? ""}
              warehouseId={warehouse?.id ?? ""}
              withAction
            />
          )}
          <main>
            {isWarehouseLoading ? (
              <WarehouseViewSkeleton />
            ) : warehouse ? (
              <WarehouseView
                warehouse={{
                  ...warehouse,
                  image: warehouse.image ?? defaultImage,
                }}
                store={warehouse.store.name}
              />
            ) : null}
          </main>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DetailWarehousePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailWarehousePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
