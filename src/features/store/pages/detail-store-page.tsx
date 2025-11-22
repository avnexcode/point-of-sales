import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { env } from "@/configs/env";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useAuth } from "@/hooks";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  StorePageHeader,
  StorePageHeaderSkeleton,
  StoreView,
  StoreViewSkeleton,
} from "../components";

type DetailStorePageProps = {
  sidebarDefaultOpen: boolean;
};

export const DetailStorePage = () => {
  const { id } = useParams<{ id: string }>();
  const { settings } = useAuth();
  const { t } = useTranslation();

  const defaultImage = env.NEXT_PUBLIC_STORE_IMAGE;

  const { data: store, isLoading: isStoreLoading } = api.store.getById.useQuery(
    { id },
    { enabled: !!id },
  );

  return (
    <PageContainer title={t("pages.store.title")}>
      <SectionContainer padded>
        <DashboardLayout title={t("pages.store.title")} className="space-y-10">
          {isStoreLoading ? (
            <StorePageHeaderSkeleton withAction />
          ) : (
            <StorePageHeader
              title={store?.name ?? ""}
              storeId={store?.id ?? ""}
              withAction
            />
          )}
          <main>
            {isStoreLoading ? (
              <StoreViewSkeleton />
            ) : store ? (
              <StoreView
                store={{ ...store, image: store.image ?? defaultImage }}
                settings={settings}
              />
            ) : null}
          </main>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DetailStorePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailStorePageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
