"use client";

import type { PropsWithChildren } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  Decimation,
  SubTitle,
} from "chart.js";

// Provider to ensure Chart.js components are registered once globally
export const ChartjsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Register all commonly used Chart.js components and plugins
  ChartJS.register(
    CategoryScale, // categorical X-axis
    LinearScale, // numeric Y-axis
    RadialLinearScale, // for radar charts
    TimeScale, // for time-based charts
    TimeSeriesScale, // for time series data
    BarElement, // for bar charts
    LineElement, // for line charts
    PointElement, // for points in line/scatter charts
    ArcElement, // for pie/doughnut charts
    Filler, // for area fills under line charts
    Title,
    Tooltip,
    Legend,
    Decimation, // improves performance with large datasets
    SubTitle,
  );

  return <>{children}</>;
};
