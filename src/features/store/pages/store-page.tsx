import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { env } from "@/configs/env";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, renderElements } from "@/utils";
import { AddStoreCard, StoreCard, StoreCardSkeleton } from "../components";
import { useTranslation } from "react-i18next";

type StorePageProps = {
  sidebarDefaultOpen: boolean;
};

export const StorePage = () => {
  const { t } = useTranslation();
  const defaultImage = String(env.NEXT_PUBLIC_STORE_IMAGE);

  const { data: stores, isLoading: isStoresLoading } =
    api.store.getAll.useQuery({
      params: {},
    });

  return (
    <PageContainer title={t("pages.store.title")}>
      <SectionContainer padded>
        <DashboardLayout title={t("pages.store.title")} className="space-y-10">
          <main className="flex flex-col flex-wrap items-stretch gap-5 lg:flex-row">
            {isStoresLoading &&
              [...new Array<undefined>(2)].map((_, i) => (
                <StoreCardSkeleton key={i} />
              ))}
            {renderElements({
              of: stores?.data,
              keyExtractor: (store) => store.id,
              isLoading: isStoresLoading,
              render: (store) => {
                return (
                  <StoreCard
                    id={store.id}
                    name={store.name}
                    description={store.address}
                    imageUrl={store.image ?? defaultImage}
                  />
                );
              },
            })}
            <AddStoreCard />
          </main>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

StorePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as StorePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
