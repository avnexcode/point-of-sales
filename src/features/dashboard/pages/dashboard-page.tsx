import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { ChartjsProvider } from "@/components/layouts/providers";

import { Heading } from "@/components/ui/heading";
import { DashboardBadge, DoughnutChart, LineChart } from "../components";
import { DashboardLayout } from "../components/layouts";

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  return (
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardLayout title="Dashboard" className="space-y-10">
          <div className="grid grid-cols-1 gap-5 py-10 xl:grid-cols-2 2xl:grid-cols-3">
            <DashboardBadge
              header={{ title: "Product", icon: "AppWindowMac" }}
              content="$127.98"
              footer="+12% from last month"
            />
          </div>
          <ChartjsProvider>
            <Heading className="font-bold" size={"h4"}>
              Statistik Judol
            </Heading>
            <div>
              <LineChart />
            </div>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-4">
              <div className="mx-auto w-full max-w-[350px]">
                <DoughnutChart />
              </div>
              <div className="mx-auto w-full max-w-[350px]">
                <DoughnutChart />
              </div>
              <div className="mx-auto w-full max-w-[350px]">
                <DoughnutChart />
              </div>
            </div>
          </ChartjsProvider>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
