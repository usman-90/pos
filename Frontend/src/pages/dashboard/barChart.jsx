import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Sales vs Expenses BarChart",
    },
  },
};

export const BarChart = ({ barChartData, MONTHS }) => {
  const [sales, cost, months] = barChartData ?? [];
  console.log(barChartData);
  let monthsArr = [];
  if (months) {
    monthsArr = MONTHS?.slice(months[0], months[0] + months.length);
  }

  const chartData = {
    labels: monthsArr,
    datasets: [
      {
        label: "Sales",
        data: sales ?? [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: cost ?? [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const data2 = {
  labels2,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [1, 2, 3, 53, 2, 43, 76, 23, 7],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Area() {
  return <Line options={options2} data={data2} />;
}
