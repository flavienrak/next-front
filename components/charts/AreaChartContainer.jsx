"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AreaChartContainer() {
  const data = [
    {
      name: "Page A",
      routeur: 400,
      serveur: 240,
      commutateur: 240,
    },
    {
      name: "Page B",
      routeur: 300,
      serveur: 139,
      commutateur: 221,
    },
    {
      name: "Page C",
      routeur: 200,
      serveur: 980,
      commutateur: 229,
    },
    {
      name: "Page D",
      routeur: 278,
      serveur: 390,
      commutateur: 200,
    },
    {
      name: "Page E",
      routeur: 189,
      serveur: 480,
      commutateur: 218,
    },
    {
      name: "Page F",
      routeur: 239,
      serveur: 380,
      commutateur: 250,
    },
    {
      name: "Page G",
      routeur: 349,
      serveur: 430,
      commutateur: 210,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="routeur"
          stackId="1"
          stroke="#ff5757"
          fill="#ff5757"
        />
        <Area
          type="monotone"
          dataKey="serveur"
          stackId="1"
          stroke="#ffd64a"
          fill="#ffd64a"
        />
        <Area
          type="monotone"
          dataKey="commutateur"
          stackId="1"
          stroke="#4bb543"
          fill="#4bb543"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
