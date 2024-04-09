"use client";

import ClientOnly from "@/components/ClientOnly";
import Image from "next/image";
import Link from "next/link";

import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import NotificationDebit from "./NotificationDebit";

const types = [
  {
    link: "debit",
    label: "Debits",
    src: "/debits.png",
  },
  {
    link: "tauxErreur",
    label: "Taux d'erreurs",
    src: "/errors.png",
  },
  {
    link: "tempsReponse",
    label: "Temps de reponse",
    src: "/response.png",
  },
  {
    link: "tempsConnexion",
    label: "Temps d'etablissement de la connexion",
    src: "/connexion.png",
  },
];

export default function NotificationsContainer() {
  const { currentQuery } = useContext(UidContext);
  const { actualEquipement } = useSelector((state) => state.equipements);
  const { notifications } = useSelector((state) => state.notifications);

  const [debitNotif, setDebitNotif] = useState(0);
  const [tauxErreurNotif, setTauxErreurNotif] = useState(0);
  const [tempsConnexionNotif, setTempsConnexionNotif] = useState(0);
  const [tempsReponseNotif, setTempsReponseNotif] = useState(0);

  useEffect(() => {
    setDebitNotif(0);
    setTauxErreurNotif(0);
    setTempsConnexionNotif(0);
    setTempsReponseNotif(0);

    notifications.forEach((notif) => {
      if (notif.type === "debit") {
        setDebitNotif((prev) => prev + 1);
      } else if (notif.type === "tauxErreur") {
        setTauxErreurNotif((prev) => prev + 1);
      } else if (notif.type === "tempsConnexion") {
        setTempsConnexionNotif((prev) => prev + 1);
      } else if (notif.type === "tempsReponse") {
        setTempsReponseNotif((prev) => prev + 1);
      }
    });
  }, [notifications]);

  return (
    <ClientOnly>
      <div className="flex w-full flex-col gap-4">
        {isEmpty(currentQuery?.equipement) && (
          <>
            <section>
              <div className="py-1 flex justify-between w-full h-11">
                <h1 className="text-2xl text-white pl-1 font-semibold">
                  <span className="bgText text-2xl">Toutes </span>
                  les notifications
                </h1>
              </div>
            </section>
            <div className="relative flex gap-8">
              {types.map((type) => (
                <div
                  key={type.link}
                  className={`relative flex flex-col justify-center items-center w-52 h-52 gap-2 py-2 bg-white px-3 rounded-md 
                       ${
                         type.link === "debit"
                           ? "bg-gradient-to-t from-[#2eca6a] to-transparent"
                           : type.link === "tauxErreur"
                           ? "bg-gradient-to-t from-[#d06060] to-transparent"
                           : type.link === "tempsReponse"
                           ? "bg-gradient-to-t from-[#4cade6] to-transparent"
                           : "bg-gradient-to-t from-[#6363ee] to-transparent"
                       }`}
                >
                  <Link
                    href={{
                      pathname: "/dashboard",
                      query: {
                        active: "notifications",
                        equipement: actualEquipement.id,
                        type: type.link,
                      },
                    }}
                    className={`relative flex-1 flex flex-col w-full justify-center gap-4`}
                  >
                    <span className="absolute right-0 top-0 bg-gradient-to-t to-transparent text-white px-4 rounded-md">
                      {type.link === "debit"
                        ? debitNotif
                        : type.link === "tauxErreur"
                        ? tauxErreurNotif
                        : type.link === "tempsConnextion"
                        ? tempsConnexionNotif
                        : tempsReponseNotif}{" "}
                    </span>
                    <div className="relative w-full h-24 rounded-sm ">
                      <Image
                        src={type.src}
                        fill
                        alt=""
                        objectFit="cover"
                        className="rounded-sm"
                      />
                    </div>
                    <label
                      className={`text-slate-950 w-full group text-center text-sm max-w-full overflow-hidden font-semibold ${
                        type.link === currentQuery.type
                          ? "cursor-default"
                          : "cursor-pointer"
                      }`}
                    >
                      {type.label}
                    </label>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {!isEmpty(currentQuery?.equipement) && (
          <>
            <section>
              <div className="py-1 flex justify-between w-full h-11">
                <h1 className="text-2xl text-white pl-1 font-semibold">
                  <span className="bgText text-2xl">Debits </span>
                  critiques
                </h1>
              </div>
            </section>
            <div className="w-full h-full">
              <NotificationDebit />
            </div>
          </>
        )}
      </div>
    </ClientOnly>
  );
}
