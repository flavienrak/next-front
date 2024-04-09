"use client";

import ClientOnly from "@/components/ClientOnly";
import ReactApexCharts from "react-apexcharts";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { UidContext } from "@/providers/UidProvider";

const maxVariation = 25;
const bias = 0.7;
const standardDeviation = maxVariation / 2;

function randomNormalDistribution(mean, standardDeviation) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  return z * standardDeviation + mean;
}

function generateRandom(previousValue) {
  let variation = Math.round(randomNormalDistribution(0, standardDeviation));
  if (Math.random() >= bias) {
    variation *= -1;
  }
  previousValue += variation;
  previousValue = Math.min(Math.max(previousValue, 0), 100);

  return previousValue;
}

export default function DashboardGeneral() {
  const { currentQuery, path } = useContext(UidContext);

  const chartServeur = useRef(null);
  const chatRouteur = useRef(null);
  const chatCommutateur = useRef(null);

  const dispatch = useDispatch();

  const equipements = [
    {
      name: "serveur",
      number: 3,
      percentage: -2,
    },
    {
      name: "routeur",
      number: 7,
      percentage: 6,
    },
    {
      name: "commutateur",
      number: 12,
      percentage: 8,
    },
  ];

  const [categories, setCategories] = useState(() => [
    "2024-09-19T00:00:00",
    "2024-09-19T00:00:01",
    "2024-09-19T00:00:02",
    "2024-09-19T00:00:03",
    "2024-09-19T00:00:04",
    "2024-09-19T00:00:05",
    "2024-09-19T00:00:06",
    "2024-09-19T00:00:07",
    "2024-09-19T00:00:08",
    "2024-09-19T00:00:09",
  ]);

  const [dataServer, setDataServer] = useState(() => [
    79, 81, 80, 85, 74, 73, 83, 76, 90, 91,
  ]);
  const [dataRouter, setDataRouter] = useState(() => [
    75, 70, 75, 85, 76, 73, 83, 76, 90, 91,
  ]);
  const [dataCommutateur, setDataCommutateur] = useState(() => [
    70, 72, 80, 81, 74, 83, 90, 91, 85, 86,
  ]);

  const initialData = {
    series: [
      {
        name: "Serveur",
        data: dataServer,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          // enabled: false,
        },
      },
      title: {
        text: "Performances",
        align: "left",
      },
      legend: {
        show: true,
        position: "top",
      },
      zoom: {
        enabled: false,
        autoScale: false,
      },
      markers: {
        size: 1,
      },
      colors: [
        currentQuery.stat === "serveur"
          ? "#6363ee"
          : currentQuery.stat === "routeur"
          ? "#2eca6a"
          : "#4cade6",
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        width: 2,
      },
      yaxis: {
        max: 100,
        min: 0,
        labels: {
          style: {
            colors: "#475569",
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories,
        labels: {
          format: "ss",
          style: {
            colors: "#475569",
          },
        },
        // tickAmount: 10,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss",
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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const lastDate = new Date(categories[categories.length - 1]);
      const newDate = new Date(lastDate.getTime() + 1000);
      const newDateString = newDate.toISOString();
      const serverRandomValue = generateRandom(dataServer[9]);
      const routeurRandom = generateRandom(dataRouter[9]);
      const commutateurRandom = generateRandom(dataCommutateur[9]);

      setCategories((prevCategories) => [
        ...prevCategories.slice(1),
        newDateString,
      ]);

      setDataServer((prev) => [...prev.slice(1), serverRandomValue]);
      setDataRouter((prev) => [...prev.slice(1), routeurRandom]);
      setDataCommutateur((prev) => [...prev.slice(1), commutateurRandom]);
    }, 3000);

    if (chartServeur?.current) {
      const updatedSeries = initialData.series.map((series, index) => {
        return {
          ...series,
          data: dataServer,
        };
      });

      chartServeur.current.chart.updateOptions({
        xaxis: {
          categories,
        },
      });
      chartServeur.current.chart.updateSeries(updatedSeries);
    }

    if (chatRouteur?.current) {
      const updatedSeries = initialData.series.map((series, index) => {
        return {
          ...series,
          data: dataServer,
        };
      });

      chatRouteur.current.chart.updateOptions({
        xaxis: {
          categories,
        },
      });
      chatRouteur.current.chart.updateSeries(updatedSeries);
    }

    if (chatCommutateur?.current) {
      const updatedSeries = initialData.series.map((series, index) => {
        return {
          ...series,
          data: dataServer,
        };
      });

      chatCommutateur.current.chart.updateOptions({
        xaxis: {
          categories,
        },
      });
      chatCommutateur.current.chart.updateSeries(updatedSeries);
    }

    return () => {
      clearInterval(interval);
    };
  }, [categories, dataServer, dataRouter, dataCommutateur]);

  useEffect(() => {}, []);

  // const date = new Date().toISOString();

  return (
    <ClientOnly>
      <div className="flex gap-4 flex-1 relative">
        <div className="flex relative gap-6 w-full">
          <div className="flex flex-col gap-6 w-max">
            {equipements.map((equipement) => (
              <Link
                key={equipement.name}
                href={{
                  pathname: path,
                  query: {
                    active: "general",
                    stat: equipement.name,
                  },
                }}
                className={`flex group flex-col flex-1 justify-center items-center gap-2 p-4 rounded-md w-[12rem] transition-all duration-150 hover:bg-inherit hover:backdrop-blur-md cursor-default ${
                  equipement.name === currentQuery.stat
                    ? currentQuery.stat === "serveur"
                      ? "bg-gradient-to-l from-[#6363ee] to-transparent"
                      : currentQuery.stat === "routeur"
                      ? "bg-gradient-to-l from-[#2eca6a] to-transparent"
                      : "bg-gradient-to-l from-[#4cade6] to-transparent"
                    : "bg-white"
                }`}
              >
                <div
                  className={`flex justify-end items-center text-xs w-full ${
                    equipement.percentage >= 0
                      ? "text-textGreen"
                      : "text-textRed"
                  }`}
                >
                  {equipement.percentage > 0 && "+"}
                  {equipement.percentage}%
                  {equipement.percentage > 0 ? (
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
                  <label
                    htmlFor=""
                    className={`w-max text-3xl text-slate-950 transition-all duration-150 ${
                      equipement.name === currentQuery.stat
                        ? "text-white"
                        : "text-slate-950"
                    }`}
                  >
                    {equipement.number}
                  </label>
                  <p
                    className={`leading-4 capitalize text-sm w-max text-slate-950 transition-all duration-150 cursor-pointer ${
                      equipement.name === currentQuery.stat
                        ? "text-white"
                        : "text-slate-950"
                    }`}
                  >
                    {equipement.name}
                    {equipement.number > 1 && "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col relative flex-1 rounded-md bg-white pt-6 gap-2 px-4">
            <div className="absolute w-full left-9 flex gap-2 items-center justify-end pr-16">
              <p
                className={`rounded-xl text-xs w-max px-4 text-white py-1 ${
                  currentQuery.stat === "serveur"
                    ? "bg-gradient-to-l from-[#6363ee] to-transparent"
                    : currentQuery.stat === "routeur"
                    ? "bg-gradient-to-l from-[#2eca6a] to-transparent"
                    : "bg-gradient-to-l from-[#4cade6] to-transparent"
                }`}
              >
                %
              </p>
            </div>
            <div className="w-full">
              <div className="" style={{ height: "425px" }}>
                {currentQuery.stat === "serveur" && (
                  <ReactApexCharts
                    ref={chartServeur}
                    options={initialData.options}
                    series={initialData.series}
                    type={"area"}
                    height={425}
                    width={1160}
                  />
                )}

                {currentQuery.stat === "routeur" && (
                  <ReactApexCharts
                    ref={chatRouteur}
                    options={initialData.options}
                    series={initialData.series}
                    type={"area"}
                    height={425}
                    width={1160}
                  />
                )}

                {currentQuery.stat === "commutateur" && (
                  <ReactApexCharts
                    ref={chatCommutateur}
                    options={initialData.options}
                    series={initialData.series}
                    type={"area"}
                    height={425}
                    width={1160}
                  />
                )}
                {/* <TimeSeriesChart /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
