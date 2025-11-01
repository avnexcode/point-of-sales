import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "../components/layouts";
import { Heading } from "@/components/ui/heading";
import { Line } from "react-chartjs-2";
import { ChartjsProvider } from "@/components/layouts/providers";

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Penjualan",
        data: [120, 190, 150, 220, 300, 250],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Grafik Penjualan Bulanan",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
      },
    },
  };

  return (
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardLayout title="Dashboard">
          <Heading className="font-bold" size={"h4"}>
            Statistik Judol
          </Heading>
          <ChartjsProvider>
            <Line
              data={data}
              options={options}
              className="max-h-[50vh] max-w-full"
            />
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
