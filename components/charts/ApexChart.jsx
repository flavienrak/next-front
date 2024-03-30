"use client";

import Chart from "react-apexcharts";

export default function ApexChart({ data, chartRef }) {
  return (
    <div className="flex w-full h-full flex-col text-slate-600">
      <Chart
        ref={chartRef}
        options={data.options}
        series={data.series}
        type={"area"}
        height={425}
        width={1160}
      />
    </div>
  );
}
