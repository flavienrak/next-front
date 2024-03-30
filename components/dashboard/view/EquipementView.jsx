"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import Image from "next/image";
import ReactApexCharts from "react-apexcharts";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaArrowLeft } from "react-icons/fa6";
import { setActualEquipement } from "@/redux/slices/equipementsSlice";
import { getEquipementController } from "@/lib/controllers/equipement.controller";
import { isEmpty } from "@/lib/utils/isEmpty";

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

function isNumber(chaine) {
  return !isNaN(parseFloat(chaine)) && isFinite(chaine);
}

const options = [
  {
    label: "debit",
    src: "/debits.png",
  },
  {
    label: "tauxErreur",
    src: "/errors.png",
  },
  {
    label: "tempsReponse",
    src: "/response.png",
  },
  {
    label: "tempsConnexion",
    src: "/connexion.png",
  },
];

export default function EquipementView() {
  const { currentQuery } = useContext(UidContext);
  const { actualEquipement } = useSelector((state) => state.equipements);

  const chartRef = useRef(null);
  const dispatch = useDispatch();

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

  const [data, setData] = useState(() => [
    79, 81, 80, 85, 74, 73, 83, 76, 90, 91,
  ]);

  const initialData = {
    series: [
      {
        name: "Serveur",
        data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      title: {
        text:
          currentQuery.option === "debit"
            ? "Debits"
            : currentQuery.option === "tauxErreur"
            ? "Taux d'erreurs"
            : currentQuery.option === "tempsReponse"
            ? "Temps de reponse"
            : "Temps de connexion",
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
        currentQuery.option === "debit"
          ? "#2eca6a"
          : currentQuery.option === "tauxErreur"
          ? "#d06060"
          : currentQuery.option === "tempsReponse"
          ? "#4cade6"
          : "#6363ee",
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
        tickAmount: 10,
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
    if (isNumber(currentQuery?.equipement)) {
      (async () => {
        const res = await getEquipementController(currentQuery.equipement);
        if (res) {
          dispatch(setActualEquipement({ equipement: res }));
        }
      })();
    }
  }, [currentQuery?.equipement]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastDate = new Date(categories[categories.length - 1]);
      const newDate = new Date(lastDate.getTime() + 1000);
      const newDateString = newDate.toISOString();
      const serverRandomValue = generateRandom(data[9]);

      setCategories((prevCategories) => [
        ...prevCategories.slice(1),
        newDateString,
      ]);

      setData((prev) => [...prev.slice(1), serverRandomValue]);
    }, 1000);

    if (chartRef?.current) {
      const updatedSeries = initialData.series.map((series, index) => {
        return {
          ...series,
          data,
        };
      });

      chartRef.current.chart.updateOptions({
        xaxis: {
          categories,
        },
      });
      chartRef.current.chart.updateSeries(updatedSeries);
    }

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  if (!isEmpty(actualEquipement))
    return (
      <ClientOnly>
        <div className="container w-full h-full">
          <div className="w-full h-full flex flex-col gap-4">
            <div className="flex gap-4 w-full justify-between items-center">
              <div className="flex gap-4 items-center h-full">
                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "equipements",
                      filter: "all",
                      view: "grid",
                    },
                  }}
                >
                  <i className="text-white cursor-pointer flex p-2 rounded-full bg-gradient-to-r from-[#2eca6a] to-transparent">
                    <FaArrowLeft size={"1.15rem"} />
                  </i>
                </Link>
                <label className="whitespace-nowrap flex h-full items-center justify-center text-slate-50 bg-green-400 px-4 rounded-3xl font-semibold">
                  {actualEquipement.nom}
                </label>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center gap-4 w-full">
              <div className="bg-white h-full flex items-center justify-center px-4 rounded-md">
                <ReactApexCharts
                  ref={chartRef}
                  options={initialData.options}
                  series={initialData.series}
                  type={"area"}
                  height={425}
                  width={1100}
                />
              </div>
              <div className="flex gap-4 flex-col h-full items-start flex-1">
                <label
                  htmlFor="categorie"
                  className="w-full whitespace-nowrap buttonGradient rounded-md text-slate-50 flex justify-center items-center h-10 font-semibold"
                >
                  Options :
                </label>
                <div className="relative grid grid-cols-2 gap-4 w-full">
                  {options.map((option) => (
                    <div
                      key={option.label}
                      className={`relative flex flex-col justify-between items-center w-28 h-22 gap-2 py-2 bg-white px-3 rounded-md 
                       ${
                         currentQuery.option === "debit" &&
                         option.label === currentQuery.option
                           ? "bg-gradient-to-t from-[#2eca6a] to-transparent"
                           : currentQuery.option === "tauxErreur" &&
                             option.label === currentQuery.option
                           ? "bg-gradient-to-t from-[#d06060] to-transparent"
                           : currentQuery.option === "tempsReponse" &&
                             option.label === currentQuery.option
                           ? "bg-gradient-to-t from-[#4cade6] to-transparent"
                           : option.label === currentQuery.option
                           ? "bg-gradient-to-t from-[#6363ee] to-transparent"
                           : ""
                       }`}
                    >
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: {
                            active: "view",
                            equipement: actualEquipement.id,
                            option: option.label,
                          },
                        }}
                        className={`flex-1 flex flex-col w-full justify-between`}
                      >
                        <div className="relative w-full h-16 rounded-sm ">
                          <Image
                            src={option.src}
                            fill
                            alt=""
                            objectFit="cover"
                            className="rounded-sm"
                          />
                        </div>
                        <label
                          className={`text-slate-950 w-full capitalize text-center text-sm whitespace-nowrap max-w-full overflow-hidden font-semibold ${
                            option.label === currentQuery.option
                              ? "cursor-default"
                              : "hover:underline cursor-pointer"
                          }`}
                        >
                          {option.label}
                        </label>
                      </Link>
                    </div>
                  ))}
                </div>
                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "infos",
                      equipement: actualEquipement.id,
                    },
                  }}
                  className="flex gap-2 px-4 h-9 rounded-md text-sm justify-center text-white buttonGradient items-center"
                >
                  <span>Consulter les details</span>
                </Link>

                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "edit",
                      edit: actualEquipement.id,
                    },
                  }}
                  className="flex gap-2 px-4 h-9 rounded-md text-sm justify-center text-primaryColor bg-primary items-center"
                >
                  <span className="text-white">Editer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    );
}
