import { Line } from "react-chartjs-2";

export const LineChart = () => {
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
    <Line data={data} options={options} className="max-h-[50vh] max-w-full" />
  );
};
