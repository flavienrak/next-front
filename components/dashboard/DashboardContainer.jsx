"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import DashboardUser from "./DashboardUser";
import DashboardGeneral from "./DashboardGeneral";
import NouveauEquipementContainer from "./nouveau/NouveauEquipementContainer";
import AllEquipementsContainer from "./all-equipements/AllEquipementsContainer";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { BsGrid } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

export default function DashboardContainer() {
  const { currentQuery } = useContext(UidContext);
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
      <div className="container w-full relative bg-[#151221] flex-1 flex">
        <div className="flex flex-col py-2 w-full gap-2 flex-1">
          {/* contenu */}
          <section className="px-8 flex-1 flex flex-col gap-4 h-full">
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

            {currentQuery.active === "equipements" && (
              <div className="flex w-full h-full flex-1">
                <AllEquipementsContainer />
              </div>
            )}

            {currentQuery.active === "nouveau" && (
              <div className="flex w-full h-full">
                <NouveauEquipementContainer />
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
          </section>
        </div>
      </div>
    </ClientOnly>
  );
}
