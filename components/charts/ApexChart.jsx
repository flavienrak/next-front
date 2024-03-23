"use client";

import { useState } from "react";
import Chart from "react-apexcharts";

export default function ApexChart() {
  const [data, setData] = useState({
    series: [
      { name: "Sales", data: [31, 40, 28, 51, 42, 82, 56] },
      { name: "Revenue", data: [11, 32, 45, 32, 34, 52, 41] },
      { name: "Customers", data: [15, 11, 32, 18, 9, 24, 11] },
    ],
    options: {
      chart: {
        height: 450,
        width: 1160,
        type: "area",
        toolbar: {
          // show: false,
        },
      },

      grid: {
        show: false,
      },
      legend: {
        // show: false,
        position: "top",
      },
      markers: {
        size: 2,
      },
      colors: ["#4154f1", "#2eca6a", "#ff77d1"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
        // categories: [0, 1991, 1992, 1993, 1994, 1995, 1996],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      responsive: [
        {
          breakpoint: 1500,
          options: {
            chart: {
              width: 800,
            },
          },
        },
      ],
    },
  });
  return (
    <div className="flex w-full h-full items-end">
      <Chart
        options={data.options}
        series={data.series}
        type={data.options.chart.type}
        height={data.options.chart.height}
        width={data.options.chart.width}
      />
    </div>
  );
}
