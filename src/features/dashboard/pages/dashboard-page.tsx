import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { ChartjsProvider } from "@/components/layouts/providers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { DoughnutChart, LineChart } from "../components";
import { DashboardLayout } from "../components/layouts";

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  return (
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardLayout title="Dashboard" className="space-y-10">
          <Heading className="font-bold" size={"h4"}>
            Statistik Judol
          </Heading>
          <div className="grid grid-cols-4 gap-x-5 py-10">
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle>Produk</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle>Produk</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle>Produk</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle>Produk</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <ChartjsProvider>
            <div>
              <LineChart />
            </div>
            <div className="grid grid-cols-3">
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
