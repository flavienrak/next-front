"use client";

import ClientOnly from "@/components/ClientOnly";
import DashboardGeneral from "./DashboardGeneral";
import NouveauEquipementContainer from "./nouveau/NouveauEquipementContainer";
import AllEquipementsContainer from "./all-equipements/AllEquipementsContainer";
import EquipementView from "./view/EquipementView";
import DashboardUser from "./DashboardUser";
import EditEquipement from "./equipement/EditEquipement";
import EquipementInfos from "./equipement/EquipementInfos";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import { updateDataController } from "@/lib/controllers/equipement.controller";
import { setActualData, updateDataInfos } from "@/redux/slices/dataSlice";
import { updateNotifications } from "@/redux/slices/notificationsSlice";
import NotificationsContainer from "./notifications/NotificationsContainer";

export default function DashboardContainer() {
  const { currentQuery } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const res = await updateDataController();
        if (res?.data && res?.notifications) {
          dispatch(updateNotifications({ notifications: res.notifications }));
          dispatch(updateDataInfos({ data: res.data }));
          dispatch(
            setActualData({
              actualData: res.data[Number(currentQuery.equipement)],
            })
          );
        }
      })();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isEmpty(user)) {
      redirect("/auth/login");
    }
  }, [user?.id]);

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

  // const handleUpdateInitialData = () => {
  //   const newData = {
  //     1: { debit: { 30: 3 }, erreur: { 30: 3 } },
  //     2: { debit: { 31: 3 }, erreur: { 31: 3 } },
  //   };
  //   // setInitialData((prev) => {
  //   //   let newState = { ...prev };

  //   //   Object.keys(newData).forEach((key) => {
  //   //     if (newState[key]) {
  //   //       // 1
  //   //       Object.keys(newState[key]).forEach((type, indexType) => {
  //   //         // debit
  //   //         newState[key][type] = {
  //   //           ...newState[key][type],
  //   //           ...newData[key][type],
  //   //         };

  //   //         console.log(Object.keys(newState[key][type])[0]);

  //   //         delete Object.keys(newState[key][type])[0];
  //   //       });
  //   //     }
  //   //   });

  //   //   return newState;
  //   // });

  //   setInitialData((prev) => {
  //     let newState = { ...prev };

  //     Object.keys(newData).forEach((idKey) => {
  //       if (newState[idKey]) {
  //         // id
  //         Object.keys(newState[idKey]).forEach((typeKey) => {
  //           if (newState[idKey][typeKey]) {
  //             // type
  //             const keys = Object.keys(newState[idKey][typeKey]);
  //             if (keys.length > 0) {
  //               delete newState[idKey][typeKey][keys[0]];
  //             }
  //             // Fusionner les nouvelles données avec les données mises à jour
  //             newState[idKey][typeKey] = {
  //               ...newState[idKey][typeKey],
  //               ...newData[idKey][typeKey],
  //             };
  //           }
  //         });
  //       }
  //     });

  //     return newState;
  //   });
  // };

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

              {currentQuery.active === "notifications" && (
                <div className="flex w-full h-full flex-1">
                  <NotificationsContainer />
                </div>
              )}
            </section>
          </div>
        </div>
      </ClientOnly>
    );
}
