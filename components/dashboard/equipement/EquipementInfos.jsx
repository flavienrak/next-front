"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import qs from "query-string";
import Image from "next/image";

import { useDispatch } from "react-redux";

import { isEmpty } from "@/lib/utils/isEmpty";
import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/providers/ToastProvider";
import { PiWarningCircleFill } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
import {
  deleteEquipementController,
  getEquipementController,
  updateEquipementController,
} from "@/lib/controllers/equipement.controller";
import {
  deleteEquipementInfos,
  setActualEquipement,
  updateEquipementsInfos,
} from "@/redux/slices/equipementsSlice";
import { BiMessageSquareEdit } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineQueryStats } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

function isNumber(chaine) {
  return !isNaN(parseFloat(chaine)) && isFinite(chaine);
}

export default function EquipementInfos() {
  const { user } = useSelector((state) => state.user);
  const { currentQuery } = useContext(UidContext);
  const { handleShowToast } = useContext(ToastContext);
  const { push } = useRouter();
  const { actualEquipement } = useSelector((state) => state.equipements);

  const bottom = useRef(null);
  const form = useRef(null);
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);

  const [nom, setNom] = useState({
    value: actualEquipement?.nom,
    error: "Nom requis",
    valid: false,
  });
  const [adresseIP, setAdresseIP] = useState({
    value: actualEquipement?.adresseIP,
    error: "Adresse IP requis",
    valid: false,
  });
  const [sysExploitation, setSysExploitation] = useState({
    value: actualEquipement?.sysExploitation,
    error: "Systeme d'exploitation requis",
    valid: false,
  });
  const [description, setDescription] = useState({
    value: actualEquipement?.description,
    error: "",
    valid: false,
  });
  const [capRAM, setCapRAM] = useState({
    value: actualEquipement?.capRAM,
    error: "RAM requis",
    valid: false,
  });
  const [capStockage, setCapStockage] = useState({
    value: actualEquipement?.capStockage,
    error: "Stockage requis",
    valid: false,
  });
  const [debit, setDebit] = useState({
    value: actualEquipement?.debit,
    error: "",
    valid: false,
  });
  const [tempsConnexion, setConTime] = useState({
    value: actualEquipement?.tempsConnexion,
    error: "",
    valid: false,
  });
  const [tauxErreur, setTauxErreur] = useState({
    value: actualEquipement?.tauxErreur,
    error: "",
    valid: false,
  });
  const [tempsReponse, setResTime] = useState({
    value: actualEquipement?.tempsReponse,
    error: "",
    valid: false,
  });

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isNumber(currentQuery?.equipement)) {
      (async () => {
        const res = await getEquipementController(currentQuery.equipement);

        if (res?.id) {
          dispatch(setActualEquipement({ equipement: res }));

          setNom({
            value: res.nom,
            error: "",
            valid: true,
          });
          setAdresseIP({
            value: res.adresseIP,
            error: "",
            valid: true,
          });
          setSysExploitation({
            value: res.sysExploitation,
            error: "",
            valid: true,
          });
          setDescription({
            value: res.description,
            error: "",
            valid: true,
          });
          setCapRAM({
            value: res.capRAM,
            error: "",
            valid: true,
          });
          setCapStockage({
            value: res.capStockage,
            error: "",
            valid: true,
          });
          setDebit({
            value: res.debit,
            error: "",
            valid: true,
          });
          setConTime({
            value: res.tempsConnexion,
            error: "",
            valid: true,
          });
          setTauxErreur({
            value: res.tauxErreur,
            error: "",
            valid: true,
          });
          setResTime({
            value: res.tempsReponse,
            error: "",
            valid: true,
          });
        }
      })();
    }
  }, [currentQuery?.edit]);

  useEffect(() => {
    if (form?.current) {
      form?.current?.reset();
    }

    if (nom.value?.trim().length > 2) {
      // nom
      setNom((prev) => ({ ...prev, valid: true, error: "" }));
    } else if (nom.value?.trim().length < 3) {
      setNom((prev) => ({
        ...prev,
        valid: false,
        error: isEmpty(nom.value.trim())
          ? "Nom requis"
          : "Au moins 3 caracteres",
      }));
    }

    // adresseIP
    if (adresseIP.value?.trim().length > 2) {
      setAdresseIP((prev) => ({ ...prev, valid: true, error: "" }));
    } else if (adresseIP.value?.trim().length < 3) {
      setAdresseIP((prev) => ({
        ...prev,
        valid: false,
        error: isEmpty(adresseIP.value.trim())
          ? "Adresse IP requis"
          : "Adresse IP invalide",
      }));
    }

    // systeme d'exploitation
    if (sysExploitation.value?.trim().length > 2) {
      setSysExploitation((prev) => ({ ...prev, valid: true, error: "" }));
    } else if (sysExploitation.value?.trim().length < 3) {
      setSysExploitation((prev) => ({
        ...prev,
        valid: false,
        error: isEmpty(sysExploitation.value.trim())
          ? "Systeme d'exploitation requis"
          : "Au moins 3 caracteres",
      }));
    }

    // description
    if (description.value?.trim().length > 2) {
      setDescription((prev) => ({ ...prev, valid: true, error: "" }));
    } else if (description.value?.trim().length < 6) {
      setDescription((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(description.value.trim())
          ? "Au moins 6 caracteres"
          : "",
      }));
    }
  }, [nom.value, adresseIP.value, sysExploitation.value, description.value]);

  useEffect(() => {
    if (form?.current) {
      form?.current?.reset();
    }

    // capRAM
    if (isNumber(capRAM.value)) {
      setCapRAM((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setCapRAM((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(capRAM.value) ? "RAM invalide" : "RAM requis",
      }));
    }

    // capStockage
    if (isNumber(capStockage.value)) {
      setCapStockage((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setCapStockage((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(capStockage.value)
          ? "Stockage invalide"
          : "Stockage requis",
      }));
    }

    // debit
    if (isNumber(debit.value)) {
      setDebit((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setDebit((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(debit.value) ? "Debits invalide" : "",
      }));
    }

    // taux d'erreurs
    if (isNumber(tauxErreur.value)) {
      setTauxErreur((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setTauxErreur((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(tauxErreur.value) ? "Taux d'erreurs invalide" : "",
      }));
    }

    // temps d'etablissements de la connexion
    if (isNumber(tempsConnexion.value)) {
      setConTime((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setConTime((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(tempsConnexion.value)
          ? "Temps d'etablissements de la connexion invalide"
          : "",
      }));
    }

    //  temps de reponse
    if (isNumber(tempsReponse.value)) {
      setResTime((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setResTime((prev) => ({
        ...prev,
        valid: false,
        error: !isEmpty(tempsReponse.value) ? "Temps de reponse invalide" : "",
      }));
    }
  }, [
    capRAM.value,
    capStockage.value,
    debit.value,
    tauxErreur.value,
    tempsConnexion.value,
    tempsReponse.value,
  ]);

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

  useEffect(() => {
    if (isSubmit) {
      bottom.current.scrollIntoView();
    }
  }, [isSubmit]);

  const handleDeleteEquipement = async (id) => {
    const res = await deleteEquipementController(id);

    if (res?.id) {
      dispatch(deleteEquipementInfos({ equipement: res }));
      handleShowToast({
        value: "Equipement supprimé avec ",
        strong: "succès.",
        type: "success",
      });
    }
  };

  if (!isEmpty(currentQuery?.equipement) && !isEmpty(actualEquipement))
    return (
      <ClientOnly>
        <div className="container flex flex-col gap-4">
          {/* top */}
          <section>
            <div className="py-1 flex w-full h-11 gap-4">
              <h1 className="text-2xl text-white pl-1 font-semibold w-max whitespace-nowrap">
                <span className="bgText text-2xl">Informations </span>à jour
              </h1>
            </div>
          </section>

          <dif className="w-full">
            {true && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  className={`rounded-md flex flex-col justify-center items-center w-full ${
                    actualEquipement.categorie === "routeur"
                      ? "bg-green-400"
                      : actualEquipement.categorie === "serveur"
                      ? "bg-indigo-400"
                      : "bg-blue-400"
                  }`}
                >
                  <label className="whitespace-nowrap w-full uppercase text-center font-bold flex items-center justify-center text-white px-4 rounded-3xl">
                    {actualEquipement.nom}
                  </label>
                  <div className="relative w-3/4 h-1/2">
                    {actualEquipement.categorie === "routeur" && (
                      <Image
                        src={"/routeur.png"}
                        alt=""
                        fill
                        objectFit="cover"
                      />
                    )}
                    {actualEquipement.categorie === "commutateur" && (
                      <Image
                        src={"/switch.png"}
                        alt=""
                        fill
                        objectFit="cover"
                      />
                    )}
                    {actualEquipement.categorie === "serveur" && (
                      <Image
                        src={"/serveur.png"}
                        alt=""
                        fill
                        objectFit="cover"
                      />
                    )}{" "}
                  </div>
                  <p className="w-full text-center text-white text-xs font-bold">
                    <span className="text-xs font-normal">IP</span> :{" "}
                    {actualEquipement.adresseIP}
                  </p>
                </div>

                <div className="flex flex-col col-span-2 rounded-md bg-white relative">
                  {/* middle */}
                  <Link
                    href={{
                      pathname: "/dashboard",
                      query: {
                        active: "equipements",
                        view: "grid",
                        filter: "all",
                      },
                    }}
                  >
                    <i className="text-slate-500 absolute w-max right-5 top-5">
                      <GrClose size={"1rem"} />
                    </i>
                  </Link>

                  <div className="p-8 w-full">
                    <div className="grid grid-cols-1 gap-y-2 gap-x-4 w-full">
                      {/* sysExploitation */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Systeme d{"'"}exploitation :{" "}
                          <span className="text-slate-950 font-semibold">
                            {" "}
                            {actualEquipement.sysExploitation}
                          </span>
                        </label>
                      </div>

                      {/* capRAM */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          RAM :{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.capRAM} Go
                          </span>
                        </label>
                      </div>

                      {/* stockage */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Stockage:{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.capStockage} Go
                          </span>
                        </label>
                      </div>

                      {/* debits */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Debits :{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.debit} b/s
                          </span>
                        </label>
                      </div>

                      {/* taux d'erreurs */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Taux d{"'"} erreurs :{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.tauxErreur} /ms
                          </span>
                        </label>
                      </div>

                      {/* taux d'etablissement conn */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Temps d{"'"}etablissements de la connexion :{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.tempsConnexion} ms
                          </span>
                        </label>
                      </div>

                      {/* temps de rep */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-500 w-full text-sm"
                        >
                          Temps de reponse :{" "}
                          <span className="text-slate-950 font-semibold">
                            {actualEquipement.tempsReponse} ms
                          </span>
                        </label>
                      </div>

                      {/* description */}
                      <div className="w-full flex flex-col gap-1 row-span-2">
                        <label
                          htmlFor="desc"
                          className="text-slate-500 w-full text-sm"
                        >
                          Description :{" "}
                          <span className="text-sm text-slate-950 font-semibold">
                            {actualEquipement.description}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "view",
                      equipement: actualEquipement.id,
                      option: "debit",
                    },
                  }}
                  className={`flex gap-4 items-center h-9 cursor-pointer rounded-md ${
                    actualEquipement.categorie === "routeur"
                      ? "bg-green-400"
                      : actualEquipement.categorie === "serveur"
                      ? "bg-indigo-400"
                      : "bg-blue-400"
                  }`}
                >
                  <label className="whitespace-nowrap flex gap-2 h-full items-center justify-center text-slate-50 px-4 rounded-md cursor-pointer w-full">
                    <i className="text-xhite">
                      <MdOutlineQueryStats size={"1.25rem"} />
                    </i>
                    Graphe
                  </label>
                </Link>

                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "edit",
                      edit: actualEquipement.id,
                    },
                  }}
                  className="flex gap-4 items-center h-9 cursor-pointe"
                >
                  <label className="whitespace-nowrap flex gap-2 h-full items-center justify-center text-slate-50 buttonGradient px-4 rounded-md cursor-pointer w-full">
                    <i className="text-xhite">
                      <BiMessageSquareEdit size={"1.25rem"} />
                    </i>
                    Editer
                  </label>
                </Link>

                <div
                  onClick={handleDeleteEquipement}
                  className="flex gap-4 items-center h-9 cursor-pointer w-full"
                >
                  <label className="whitespace-nowrap flex gap-2 h-full items-center justify-center text-slate-50 bg-red-400 px-4 rounded-md cursor-pointer w-full">
                    <i className="text-xhite">
                      <FiTrash2 size={"1.25rem"} />
                    </i>
                    Supprimer
                  </label>
                </div>
              </div>
            )}
            <div ref={bottom}></div>
          </dif>
        </div>
      </ClientOnly>
    );
}
