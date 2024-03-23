"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import DashboardUser from "./DashboardUser";
import DashboardEq from "./DashboardEq";
import DashboardGeneral from "./DashboardGeneral";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { BsGrid } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const views = [
  {
    label: "Grid",
    query: {
      view: "grid",
    },
    icon: <BsGrid size={"1rem"} />,
  },
  {
    label: "Table",
    query: {
      view: "table",
    },
    icon: <CiGrid2H size={"1rem"} />,
  },
];

const options = [
  {
    label: "Serveurs",
    query: {
      filter: "serveur",
    },
  },
  {
    label: "Routeurs",
    query: {
      filter: "routeur",
    },
  },
  {
    label: "Commutateurs",
    query: {
      filter: "commutateur",
    },
  },
  {
    label: "Tous les resultats",
    query: {
      filter: "all",
    },
  },
];

export default function DashboardContainer() {
  const { currentQuery, path } = useContext(UidContext);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (showFilter) {
      const option = document.getElementById("filterOptions");
      const handleClickOutside = (e) => {
        if (e.target.id !== option) {
          setShowFilter(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showFilter]);

  return (
    <ClientOnly>
      <div className="container w-full relative bg-[#151221]">
        <div className="flex flex-col py-2 min-h-[100vh] w-full gap-2">
          {/* contenu */}
          <section className="px-10 bg-[#151221] flex-1 flex flex-col gap-4">
            {currentQuery.active === "general" && (
              <div className="flex flex-col gap-2">
                <div className="py-2">
                  <h1 className="text-2xl text-white">Tableau de bord</h1>
                </div>
                <div className="flex gap-4 flex-1 relative w-full">
                  <DashboardGeneral />
                </div>
              </div>
            )}

            {currentQuery.active === "user" && (
              <div className="flex flex-col gap-2 w-full h-full">
                <div className="py-2 flex justify-between w-full">
                  <h1 className="text-2xl text-white">Tous les utilisateurs</h1>
                  <div className="flex gap-8 items-center">
                    {/* nouveau */}
                    <div className="flex items-center bg-primary rounded-md h-full justify-center group cursor-pointer">
                      <label className="text-xs text-slate-50 px-3 flex items-center gap-1 cursor-pointer">
                        <i>
                          <HiOutlineSquaresPlus size={"1rem"} />
                        </i>
                        Nouveau
                      </label>
                    </div>
                    {/* filtre */}
                    <div className="flex items-center gap-2 h-full">
                      <div className="relative flex items-center">
                        <input
                          id="filter"
                          type="text"
                          readOnly
                          placeholder="Tous les resultats"
                          className="peer bg-transparent cursor-default text-xs text-slate-50 border border-slate-400 caret-slate-50 focus:border-primaryColor h-8 w-36"
                        />
                        <i className="text-slate-300 cursor-pointer hover:text-primaryColor transition-all duration-150 absolute right-2 w-max peer-focus:text-primaryColor">
                          <RiArrowDownSLine size="1rem" />
                        </i>
                        <div className="absolute top-[2.25rem] z-10 p-1 left-0 w-full bg-[#151221] border border-slate-600 rounded-md">
                          <label
                            htmlFor="client"
                            className={`w-full flex items-center gap-2 px-2 rounded-sm py-2 ${
                              true ? "bg-[#241e38]" : "group cursor-pointer"
                            }`}
                          >
                            <input
                              id="client"
                              type="radio"
                              name="select"
                              className="cursor-pointer"
                            />
                            <span className="text-slate-50 text-xs w-max group-hover:text-primaryColor">
                              Clients
                            </span>
                          </label>
                          <label
                            htmlFor="admin"
                            className={`w-full flex items-center gap-2 px-2 rounded-sm cursor-pointer py-2 ${
                              false ? "bg-[#241e38]" : "group"
                            }`}
                          >
                            <input
                              id="admin"
                              type="radio"
                              name="select"
                              className="cursor-pointer"
                            />
                            <span className="text-slate-50 text-xs w-max group-hover:text-primaryColor">
                              Administrateurs
                            </span>
                          </label>
                        </div>
                      </div>
                      <label
                        htmlFor="filter"
                        className="flex items-center justify-center h-full rounded-md bg-primary cursor-pointer"
                      >
                        <i className="text-slate-50 px-2 rounded-md">
                          <IoFilterSharp size="1rem" />
                        </i>
                      </label>
                    </div>

                    {/* recherche */}
                    <div className="flex items-center gap-2 h-full relative">
                      <input
                        id="search"
                        type="text"
                        placeholder="Rechercher..."
                        className="bg-transparent text-xs text-slate-50 border border-slate-400 caret-slate-50 focus:border-primaryColor h-8 w-36"
                      />
                      <label
                        htmlFor="search"
                        className="flex items-center justify-center h-full rounded-md bg-primary cursor-pointer"
                      >
                        <i className="text-slate-50 px-2 rounded-md">
                          <FiSearch size="1rem" />
                        </i>
                      </label>
                    </div>

                    {/* affichage */}
                    <div className="h-full flex bg-[#241e38] rounded-md border border-transparent">
                      <label
                        htmlFor=""
                        className={`h-full flex gap-1  px-2 relative items-center justify-center ${
                          false
                            ? "bg-primary rounded-md cursor-default"
                            : "group cursor-pointer"
                        }`}
                      >
                        <i className="text-slate-50 group-hover:text-primaryColor">
                          <CiGrid2H size={"1rem"} />
                        </i>
                        <span className="text-xs text-slate-50 group-hover:text-primaryColor">
                          Table
                        </span>
                      </label>
                      <label
                        htmlFor=""
                        className={`h-full flex gap-1  px-2 relative items-center justify-center cursor-pointer ${
                          true
                            ? "bg-primary rounded-md cursor-default"
                            : "group cursor-pointer"
                        }`}
                      >
                        <i className="text-slate-50 group-hover:text-primaryColor">
                          <BsGrid size={"1rem"} />
                        </i>
                        <span className="text-xs text-slate-50 group-hover:text-primaryColor">
                          Grid
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 flex-1 relative w-full">
                  <DashboardUser />
                </div>
              </div>
            )}

            {currentQuery.active === "equipement" && (
              <div className="flex flex-col gap-2 w-full h-full flex-1">
                <div className="py-2 flex justify-between w-full">
                  <h1 className="text-2xl text-white">Tous les equipements</h1>
                  <div className="flex gap-8 items-center">
                    {/* nouveau */}
                    <Link
                      href={"/dashboard/nouveau"}
                      className="flex items-center bg-green-700 rounded-md h-full justify-center group cursor-pointer"
                    >
                      <label className="px-3 flex items-center gap-1 cursor-pointer">
                        <i className="text-slate-50">
                          <HiOutlineSquaresPlus size={"1.25rem"} />
                        </i>
                        <span className="text-xs text-slate-50 whitespace-nowrap">
                          Nouveau
                        </span>
                      </label>
                    </Link>

                    {/* affichage */}
                    <div className="h-full flex bg-[#241e38] rounded-md border border-transparent">
                      {views.map((view) => (
                        <Link
                          href={{
                            pathname: path,
                            query: {
                              ...currentQuery,
                              ...view.query,
                            },
                          }}
                          className="w-full h-full cursor-default"
                          key={view.label}
                        >
                          <label
                            className={`h-full flex gap-1  px-2 relative items-center justify-center ${
                              currentQuery.view === view.query.view
                                ? "bg-primary rounded-md cursor-default"
                                : "group cursor-pointer"
                            }`}
                          >
                            <i className="text-slate-50 group-hover:text-primaryColor">
                              {view.icon}
                            </i>
                            <span className="text-xs text-slate-50 group-hover:text-primaryColor">
                              {view.label}
                            </span>
                          </label>
                        </Link>
                      ))}
                    </div>

                    {/* filtre */}
                    <div className="flex items-center gap-2 h-full">
                      <div
                        className="relative flex items-center"
                        onClick={() => setShowFilter((prev) => !prev)}
                      >
                        <input
                          id="filter"
                          type="text"
                          readOnly
                          value={
                            options.find(
                              (option) =>
                                option.query.filter === currentQuery.filter
                            ).label
                          }
                          className={`peer px-3 bg-[#241e38] cursor-default text-xs text-slate-400 h-8 w-36 ${
                            showFilter ? "border-primaryColor" : ""
                          }`}
                        />
                        <i
                          className={`cursor-pointer transition-all duration-150 absolute right-1.5 w-max ${
                            showFilter
                              ? "text-primaryColor"
                              : "hover:text-primaryColor text-slate-400"
                          }`}
                        >
                          <RiArrowDownSLine size="1rem" />
                        </i>
                        {showFilter && (
                          <div
                            id="filterOptions"
                            className="absolute top-[2.25rem] z-10 p-1 left-0 w-full bg-[#151221] border border-slate-600 rounded-md"
                          >
                            {options.map((option) => (
                              <Link
                                href={{
                                  pathname: path,
                                  query: {
                                    ...currentQuery,
                                    ...option.query,
                                  },
                                }}
                                className={"h-full w-full"}
                                key={option.filter}
                              >
                                <label
                                  htmlFor={option.filter}
                                  className={`w-full flex items-center gap-2 px-2 rounded-sm py-2 ${
                                    currentQuery.filter === option.query.filter
                                      ? "bg-[#241e38]"
                                      : "group cursor-pointer"
                                  }`}
                                >
                                  <input
                                    id={option.filter}
                                    type="radio"
                                    name="select"
                                    className="cursor-pointer"
                                    checked={
                                      currentQuery.filter ===
                                      option.query.filter
                                    }
                                    onChange={() => {}}
                                  />
                                  <span className="text-slate-50 select-none text-xs w-max group-hover:text-primaryColor whitespace-nowrap">
                                    {option.label}
                                  </span>
                                </label>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="filter"
                        className="flex items-center justify-center h-full rounded-md bg-primary cursor-pointer"
                      >
                        <i className="text-slate-50 px-2 rounded-md">
                          <IoFilterSharp size="1rem" />
                        </i>
                      </label>
                    </div>

                    {/* recherche */}
                    <div className="flex items-center gap-2 h-full relative">
                      <input
                        id="search"
                        type="text"
                        placeholder="Rechercher..."
                        className="text-xs px-3 text-slate-50 bg-[#241e38] caret-slate-50 focus:border-primaryColor h-8 w-36"
                      />
                      <label
                        htmlFor="search"
                        className="flex items-center justify-center h-full rounded-md bg-primary cursor-pointer"
                      >
                        <i className="text-slate-50 px-2 rounded-md">
                          <FiSearch size="1rem" />
                        </i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <DashboardEq />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </ClientOnly>
  );
}
