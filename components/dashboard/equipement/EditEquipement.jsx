"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import qs from "query-string";

import { useDispatch } from "react-redux";

import { isEmpty } from "@/lib/utils/isEmpty";
import { UidContext } from "@/providers/UidProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/providers/ToastProvider";
import { BsSave } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
import {
  getEquipementController,
  updateEquipementController,
} from "@/lib/controllers/equipement.controller";
import {
  setActualEquipement,
  updateEquipementsInfos,
} from "@/redux/slices/equipementsSlice";

function isNumber(chaine) {
  return !isNaN(parseFloat(chaine)) && isFinite(chaine);
}

export default function EditEquipement() {
  const { user } = useSelector((state) => state.user);
  const { currentQuery } = useContext(UidContext);
  const { handleShowToast } = useContext(ToastContext);
  const { push } = useRouter();
  const { actualEquipement } = useSelector((state) => state.equipements);

  const bottom = useRef(null);
  const form = useRef(null);
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);
  const [categorie, setCategorie] = useState("serveur");

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
    if (isNumber(currentQuery?.edit)) {
      (async () => {
        const res = await getEquipementController(currentQuery.edit);

        if (res) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nom.valid &&
      adresseIP.valid &&
      sysExploitation.valid &&
      debit.valid &&
      tauxErreur.valid &&
      description.valid &&
      tempsConnexion.valid &&
      tempsReponse.valid
    ) {
      const res = await updateEquipementController({
        id: currentQuery.edit,
        nom: nom.value,
        adresseIP: adresseIP.value,
        description: description.value,
        sysExploitation: sysExploitation.value,
        capRAM: capRAM.value,
        capStockage: capStockage.value,
        debit: debit.value,
        tempsConnexion: tempsConnexion.value,
        tempsReponse: tempsReponse.value,
        tauxErreur: tauxErreur.value,
      });

      if (res.id) {
        handleShowToast({
          value: "Equipement mise à jour avec.",
          strong: "succès.",
          type: "success",
        });
        dispatch(updateEquipementsInfos({ equipement: res }));
        dispatch(setActualEquipement({ equipement: res }));

        const url = qs.stringifyUrl(
          {
            url: "/dashboard",
            query: {
              active: "equipements",
              view: "grid",
              filter: "all",
            },
          },
          { skipNull: true }
        );
        push(url);
      }
    } else {
      setIsSubmit(true);
    }
  };

  if (!isEmpty(currentQuery?.edit) && !isEmpty(actualEquipement))
    return (
      <ClientOnly>
        <div className="container flex flex-col gap-4">
          {/* top */}
          <section>
            <div className="py-1 flex justify-between w-full h-11 gap-4">
              <h1 className="text-2xl text-white pl-1 font-semibold w-max whitespace-nowrap">
                <span className="bgText text-2xl">Mettre </span>à jour
              </h1>
              <div className="flex gap-4 w-full justify-between items-center">
                <div className="flex gap-4 items-center h-full">
                  {/* <Link
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
                  </Link> */}
                  <label className="whitespace-nowrap flex h-full items-center justify-center text-slate-50 bg-green-400 px-4 rounded-3xl font-semibold">
                    Serveur Web 1
                  </label>
                </div>
              </div>
            </div>
          </section>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 flex-1"
          >
            {true && (
              <>
                <div className="flex w-full flex-col rounded-md bg-white relative">
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
                    <div className="grid grid-cols-3 gap-y-2 gap-x-4 w-full">
                      {/* nom */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Nom d{"'"}hote
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              value={nom.value}
                              placeholder="Serveur web 1"
                              onChange={(e) => {
                                setNom((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(nom.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(nom.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {nom.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* adresse IP */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Adresse IP
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              value={adresseIP.value}
                              placeholder="192.168.0.0"
                              onChange={(e) => {
                                setAdresseIP((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(adresseIP.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(adresseIP.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {adresseIP.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* sysExploitation */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Systeme d{"'"}exploitation
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              value={sysExploitation.value}
                              placeholder="Windows server"
                              onChange={(e) => {
                                setSysExploitation((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(sysExploitation.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(sysExploitation.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {sysExploitation.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* capRAM */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          RAM
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            Go
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              placeholder="0"
                              value={capRAM.value || ""}
                              onChange={(e) => {
                                setCapRAM((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(capRAM.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(capRAM.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {capRAM.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* stockage */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Stockage
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            Go
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              placeholder="0"
                              value={capStockage.value || ""}
                              onChange={(e) => {
                                setCapStockage((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(capStockage.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(capStockage.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {capStockage.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* description */}
                      <div className="w-full flex flex-col gap-1 row-span-2">
                        <label
                          htmlFor="desc"
                          className="text-slate-950 w-full text-sm"
                        >
                          Description
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1 h-full">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <textarea
                              id="desc"
                              type="text"
                              placeholder="Description du serveur"
                              value={description.value || ""}
                              onChange={(e) => {
                                setDescription((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 h-full caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent focus:border-primaryColor
                          ${
                            !isEmpty(description.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(description.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {description.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* debits */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Debits
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            b/s
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              placeholder="0"
                              value={debit.value || ""}
                              onChange={(e) => {
                                setDebit((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(debit.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(debit.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {debit.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* taux d'erreurs */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Taux d{"'"} erreurs
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            ms
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              placeholder="0"
                              value={tauxErreur.value || ""}
                              onChange={(e) => {
                                setTauxErreur((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tauxErreur.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(tauxErreur.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {tauxErreur.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* taux d'etablissement conn */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Temps d{"'"}etablissements de la connexion
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            ms
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              placeholder="0"
                              value={tempsConnexion.value || ""}
                              onChange={(e) => {
                                setConTime((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tempsConnexion.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(tempsConnexion.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {tempsConnexion.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* temps de rep */}
                      <div className="w-full flex flex-col gap-1">
                        <label
                          htmlFor="debit"
                          className="text-slate-950 flex items-center w-full justify-between text-sm"
                        >
                          Temps de reponse
                          <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                            ms
                          </div>
                        </label>
                        <div className="pl-1 w-full flex flex-col gap-1">
                          <div className="flex h-full relative items-center gap-4 justify-between w-full">
                            <input
                              id="debit"
                              type="text"
                              value={tempsReponse.value || ""}
                              placeholder="0"
                              onChange={(e) => {
                                setResTime((prev) => ({
                                  ...prev,
                                  value: e.target.value,
                                }));
                              }}
                              className={`peer px-3 caret-slate-950 border text-xs text-slate-950 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tempsReponse.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                            />
                          </div>
                          {!isEmpty(tempsReponse.error) && isSubmit && (
                            <div
                              className={"flex gap-2 items-center text-red-400"}
                            >
                              <i>
                                <PiWarningCircleFill size="1rem" />
                              </i>
                              <p className=" text-red-400 text-[0.6rem]">
                                {tempsReponse.error}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* butttons */}
                <div className="w-full flex justify-end">
                  <div className="flex gap-4 w-1/3">
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: {
                          active: "equipements",
                          view: "grid",
                          filter: "all",
                        },
                      }}
                      type="reset"
                      className="bg-red-400 h-9 flex items-center justify-center rounded-md text-sm text-white hover:bg-red-500"
                    >
                      Annuler
                    </Link>
                    <button
                      type="submit"
                      className="bg-primary flex justify-center items-center gap-2 h-9 rounded-md text-sm text-white"
                    >
                      <i>
                        <BsSave size={"1rem"} />
                      </i>
                      Enregistrer
                    </button>
                  </div>
                </div>
              </>
            )}
            <div ref={bottom}></div>
          </form>
        </div>
      </ClientOnly>
    );
}
