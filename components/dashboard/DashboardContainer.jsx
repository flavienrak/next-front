"use client";

import ClientOnly from "@/components/ClientOnly";
import DashboardGeneral from "./DashboardGeneral";
import NouveauEquipementContainer from "./nouveau/NouveauEquipementContainer";
import AllEquipementsContainer from "./all-equipements/AllEquipementsContainer";
import EquipementView from "./view/EquipementView";
import Image from "next/image";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

import { isEmpty } from "@/lib/utils/isEmpty";
import DashboardUser from "./DashboardUser";
import EditEquipement from "./equipement/EditEquipement";
import EquipementInfos from "./equipement/EquipementInfos";

export default function DashboardContainer() {
  const { currentQuery } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (isEmpty(user)) {
      redirect("/auth/login");
    }
  }, []);

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

  if (!isEmpty(user))
    return (
      <ClientOnly>
        <div className="container w-full relative flex-1 flex overflow-x-hidden">
          <div className="flex flex-col py-2 w-full gap-2 flex-1">
            {/* contenu */}
            <section className="px-8 flex-1 flex flex-col gap-4">
              {currentQuery.active === "general" && (
                <div className="flex flex-col gap-2 flex-1 pb-4">
                  <div className="py-2">
                    <h1 className="text-2xl text-white font-semibold">
                      <span className="bgText text-2xl">Tableau </span>
                      de bord
                    </h1>
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

              {currentQuery.active === "edit" && (
                <div className="flex w-full h-full flex-1">
                  <EditEquipement />
                </div>
              )}

              {currentQuery.active === "view" && (
                <div className="flex w-full h-full flex-1">
                  <EquipementView />
                </div>
              )}

              {currentQuery.active === "infos" && (
                <div className="flex w-full h-full flex-1">
                  <EquipementInfos />
                </div>
              )}

              {currentQuery.active === "nouveau" && (
                <div className="flex w-full h-full">
                  <NouveauEquipementContainer />
                </div>
              )}

              {currentQuery.active === "user" && (
                <div className="flex w-full h-full">
                  <DashboardUser />
                </div>
              )}
            </section>
          </div>
        </div>
      </ClientOnly>
    );
}
