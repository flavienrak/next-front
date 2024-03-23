"use client";

import ClientOnly from "@/components/ClientOnly";
import AreaChartContainer from "@/components/charts/AreaChartContainer";

import { ResponsiveContainer } from "recharts";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import OthChart from "./OthChart";
import FillByValueChart from "../charts/FillByValueChart";
import Recharts from "./Recharts";
import ApexChart from "../charts/ApexChart";
import NegativeChart from "../charts/NegativeChart";
import DebitChart from "../charts/DebitChart";
import TimeSeriesChart from "../charts/TimeSeriesChart";

export default function DashboardGeneral() {
  const data = [
    {
      name: "Routeur",
      number: 7,
      percentage: 6,
    },
    {
      name: "Serveur",
      number: 3,
      percentage: -2,
    },
    {
      name: "Commutateur",
      number: 12,
      percentage: 8,
    },
  ];

  return (
    <ClientOnly>
      <div className="flex gap-4 flex-1 relative">
        <div className="flex relative gap-6 w-full">
          <div className="flex flex-col gap-6 w-max">
            {data.map((d) => (
              <div
                key={d.name}
                className="flex flex-col flex-1 justify-center items-center gap-2 p-4 rounded-md border border-slate-600 hover:bg-[#241e38] cursor-pointer w-[12rem]"
              >
                <div
                  className={`flex justify-end items-center text-xs w-full ${
                    d.percentage >= 0 ? "text-textGreen" : "text-textRed"
                  }`}
                >
                  {d.percentage > 0 && "+"}
                  {d.percentage}%
                  {d.percentage > 0 ? (
                    <i className="w-max text-textGreen">
                      <MdKeyboardArrowUp size={"1rem"} />
                    </i>
                  ) : (
                    <i className="w-max text-textRed">
                      <MdKeyboardArrowDown size={"1rem"} />
                    </i>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label htmlFor="" className="w-max text-3xl p-1 text-white">
                    {d.number}
                  </label>
                  <p className="leading-4 text-sm w-max text-slate-50">
                    {d.name}
                    {d.number > 1 && "s"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex relative flex-1 rounded-md border border-slate-600">
            <ResponsiveContainer width="100%" height="100%">
              {/* <AreaChartContainer /> */}
              {/* <OthChart /> */}
              {/* <FillByValueChart /> */}
              <ApexChart />
              {/* <NegativeChart /> */}
              {/* <DebitChart /> */}
              {/* <TimeSeriesChart /> */}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
