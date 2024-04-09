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
import { setActualData } from "@/redux/slices/dataSlice";
import { format, parseISO } from "date-fns";

function isNumber(chaine) {
  return !isNaN(parseFloat(chaine)) && isFinite(chaine);
}

const types = [
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

function getDate() {
  const now = new Date().getTime();
  return Math.floor(now / 1000) * 1000;
}

export default function EquipementView() {
  const { currentQuery } = useContext(UidContext);
  const { actualData } = useSelector((state) => state.data);
  const { actualEquipement } = useSelector((state) => state.equipements);

  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const [series, setSeries] = useState([{ name: "Serveur", data: [] }]);

  const [categories, setCategories] = useState(
    Array.from({ length: 11 }).map((_, i) => {
      const prevSecond = getDate() - i * 1000;
      return new Date(prevSecond).getTime();
    })
  );

  useEffect(() => {
    const updateDates = () => {
      setCategories((prevDates) => {
        return [...prevDates.slice(1), getDate()];
      });
    };

    const updateIntervalId = setInterval(updateDates, 1000);

    return () => clearInterval(updateIntervalId);
  }, []);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      text:
        currentQuery.type === "debit"
          ? "Debits"
          : currentQuery.type === "tauxErreur"
          ? "Taux d'erreurs"
          : currentQuery.type === "tempsReponse"
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
      currentQuery.type === "debit"
        ? "#2eca6a"
        : currentQuery.type === "tauxErreur"
        ? "#d06060"
        : currentQuery.type === "tempsReponse"
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
      max:
        currentQuery.type === "debit"
          ? 100
          : currentQuery.type === "tauxErreur"
          ? 100
          : 1000,
      min: 0,
      labels: {
        style: {
          colors: "#475569",
        },
      },
      tickAmount: 10,
    },
    xaxis: {
      type: "datetime",
      categories,
      labels: {
        formatter: function (timestamp) {
          const date = new Date(timestamp);
          return format(date, "ss");
        },
        style: {
          colors: "#475569",
        },
      },
      tickAmount: 10,
    },
    tooltip: {
      x: {
        formatter: function (timestamp) {
          const date = new Date(timestamp);
          return format(date, "dd/MM/yy HH:mm:ss");
        },
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
  };

  useEffect(() => {
    if (isNumber(currentQuery?.equipement)) {
      (async () => {
        const res = await getEquipementController(currentQuery.equipement);
        if (res?.equipement && res?.data) {
          dispatch(setActualData({ actualData: res.data }));
          dispatch(setActualEquipement({ equipement: res.equipement }));
        }
      })();
    }
  }, [currentQuery?.equipement]);

  useEffect(() => {
    if (!isEmpty(actualData)) {
      if (actualData[currentQuery.type]) {
        const data = Object.entries(actualData[currentQuery.type]).map(
          ([cle, valeur]) => {
            const date = parseISO(cle).getTime();
            return [date, Number(valeur)];
          }
        );

        setSeries((prev) => {
          let newState = [...prev];
          newState[0].data = data;
          return newState;
        });
      }
    }
  }, [actualData]);

  useEffect(() => {
    if (chartRef?.current) {
      const updatedSeries = series.map((serie) => {
        return { ...serie, data: series[0].data };
      });
      chartRef.current.chart.updateSeries(updatedSeries);
      chartRef.current.chart.updateOptions({
        xaxis: {
          categories,
        },
      });
    }
  }, [categories, series[0].data]);

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
            <div className="flex-1 flex justify-center items-center gap-5 w-full">
              <div className="relative bg-white h-full flex items-center justify-center px-4 rounded-md">
                <div className="absolute w-full flex gap-2 items-center self-start justify-end p-4">
                  <p
                    className={`rounded-xl text-xs w-max px-4 text-white py-1 ${
                      currentQuery.type === "debit"
                        ? "bg-gradient-to-l from-[#2eca6a] to-transparent"
                        : currentQuery.type === "tauxErreur"
                        ? "bg-gradient-to-l from-[#d06060] to-transparent"
                        : currentQuery.type === "tempsReponse"
                        ? "bg-gradient-to-l from-[#4cade6] to-transparent"
                        : "bg-gradient-to-l from-[#6363ee] to-transparent"
                    }`}
                  >
                    {currentQuery.type === "debit" && "Mb / s"}
                    {currentQuery.type === "tauxErreur" && "%"}
                    {currentQuery.type === "tempsReponse" && "ms"}
                    {currentQuery.type === "tempsConnexion" && "ms"}
                  </p>
                </div>
                <div className="">
                  <ReactApexCharts
                    ref={chartRef}
                    options={options}
                    series={series}
                    type={"area"}
                    height={425}
                    width={1100}
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-col h-full items-start flex-1">
                <label
                  htmlFor="categorie"
                  className="w-full whitespace-nowrap buttonGradient rounded-md text-slate-50 flex justify-center items-center h-10 font-semibold"
                >
                  Options :
                </label>
                <div className="relative grid grid-cols-2 gap-4 w-full">
                  {types.map((type) => (
                    <div
                      key={type.label}
                      className={`relative flex flex-col justify-between items-center w-28 h-22 gap-2 py-2 bg-white px-3 rounded-md 
                       ${
                         currentQuery.type === "debit" &&
                         type.label === currentQuery.type
                           ? "bg-gradient-to-t from-[#2eca6a] to-transparent"
                           : currentQuery.type === "tauxErreur" &&
                             type.label === currentQuery.type
                           ? "bg-gradient-to-t from-[#d06060] to-transparent"
                           : currentQuery.type === "tempsReponse" &&
                             type.label === currentQuery.type
                           ? "bg-gradient-to-t from-[#4cade6] to-transparent"
                           : type.label === currentQuery.type
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
                            type: type.label,
                          },
                        }}
                        className={`flex-1 flex flex-col w-full justify-between`}
                      >
                        <div className="relative w-full h-16 rounded-sm ">
                          <Image
                            src={type.src}
                            fill
                            alt=""
                            objectFit="cover"
                            className="rounded-sm"
                          />
                        </div>
                        <label
                          className={`text-slate-950 w-full capitalize text-center text-sm whitespace-nowrap max-w-full overflow-hidden font-semibold ${
                            type.label === currentQuery.type
                              ? "cursor-default"
                              : "hover:underline cursor-pointer"
                          }`}
                        >
                          {type.label}
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
