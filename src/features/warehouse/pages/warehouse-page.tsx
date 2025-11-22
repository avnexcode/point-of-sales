import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { env } from "@/configs/env";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, renderElements } from "@/utils";
import { useTranslation } from "react-i18next";
import {
  AddWarehouseCard,
  WarehouseCard,
  WarehouseCardSkeleton,
} from "../components";

type WarehousePageProps = {
  sidebarDefaultOpen: boolean;
};

export const WarehousePage = () => {
  const { t } = useTranslation();
  const defaultImage = env.NEXT_PUBLIC_WAREHOUSE_IMAGE;

  const { data: warehouses, isLoading: isWarehousesLoading } =
    api.warehouse.getAll.useQuery({
      params: {},
    });

  return (
    <PageContainer title={t("pages.warehouse.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("pages.warehouse.title")}
          className="space-y-10"
        >
          <main className="flex flex-col flex-wrap items-stretch gap-10 lg:flex-row">
            {isWarehousesLoading &&
              [...new Array<undefined>(2)].map((_, i) => (
                <WarehouseCardSkeleton key={i} />
              ))}
            {renderElements({
              of: warehouses?.data,
              keyExtractor: (warehouse) => warehouse.id,
              isLoading: isWarehousesLoading,
              render: (warehouse) => {
                return (
                  <WarehouseCard
                    id={warehouse.id}
                    name={warehouse.name}
                    description={warehouse.address}
                    imageUrl={warehouse.image ?? defaultImage}
                  />
                );
              },
            })}
            <AddWarehouseCard />
          </main>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

WarehousePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as WarehousePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
