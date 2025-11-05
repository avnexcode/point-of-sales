import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = () => {
  const data = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Order Status",
        data: [10, 25, 65],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Order Distribution",
      },
    },
  };

  return <Doughnut data={data} options={options} className="w-full" />;
};
