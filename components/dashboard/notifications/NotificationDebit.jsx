"use client";

import ClientOnly from "@/components/ClientOnly";
import Image from "next/image";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function NotificationDebit() {
  const { equipements } = useSelector((state) => state.equipements);
  const { notifications } = useSelector((state) => state.notifications);

  return (
    <ClientOnly>
      <div className="relative w-full h-full">
        <section className="w-full flex flex-col bg-white h-full rounded-xl">
          <div className="w-full flex justify-between h-12 buttonGradient items-center rounded-t-xl">
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Categorie
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Nom
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Adresse IP
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Debits
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Date
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
              Actions
            </label>
          </div>
          <div className="flex flex-col w-full scr">
            {notifications.map((notif, index) => {
              const equipement = equipements.find(
                (equipement) => equipement.id === notif.equipementId
              );

              if (equipement && notif.type === "debit")
                return (
                  <div
                    key={notif.id}
                    className={`w-full flex justify-between h-12 items-center border-b border-slate-300 hover:bg-slate-200 cursor-default ${
                      index % 2 !== 0 ? "bg-slate-100" : "bg-transparent"
                    }`}
                  >
                    <label className="text-slate-950 font-semibold px-5 text-xs w-1/5 uppercase flex items-center gap-2">
                      <div className="relative w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem]">
                        <Image
                          src={
                            equipement.categorie === "routeur"
                              ? "/routeur.png"
                              : equipement.categorie === "commutateur"
                              ? "/switch.png"
                              : "/serveur.png"
                          }
                          alt=""
                          fill
                          objectFit="cover"
                        />
                      </div>
                      {equipement.categorie}
                    </label>
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: {
                          active: "view",
                          equipement: equipement.id,
                          type: "debit",
                        },
                      }}
                      className="text-slate-950 font-semibold px-5 text-xs w-1/5 hover:underline"
                    >
                      {equipement.nom}
                    </Link>
                    <label className="text-slate-950 px-5 text-xs w-1/5">
                      {equipement.adresseIP}
                    </label>
                    <label className="text-red-400 px-5 text-xs w-1/5">
                      {notif.value} Mb/s
                    </label>
                    <label className="text-slate-950 px-5 text-xs w-1/5">
                      {notif.date}
                    </label>
                    <label className="text-slate-950 px-5 text-xs w-1/5 flex items-center gap-4 h-full">
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: {
                            active: "infos",
                            equipement: equipement.id,
                          },
                        }}
                        onClick={() => {
                          dispatch(setActualEquipement({ equipement }));
                          dispatch(
                            setActualData({ data: data[equipement.id] })
                          );
                        }}
                        className="bg-green-400 w-max px-5 h-8 flex items-center text-sm text-white rounded-3xl cursor-pointer transition-all duration-15"
                      >
                        Voir
                      </Link>
                    </label>
                  </div>
                );
            })}
          </div>
        </section>
      </div>
    </ClientOnly>
  );
}
