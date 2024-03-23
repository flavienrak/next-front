"use client";

import Link from "next/link";

import { isEmpty } from "@/lib/utils/isEmpty";
import { useEffect, useRef, useState } from "react";
import { createServerController } from "@/lib/controllers/equipement.controller";

import { BsBookmarkPlus } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { RiArrowDownSLine } from "react-icons/ri";
import { PiWarningCircleFill } from "react-icons/pi";
import { BiCalendar } from "react-icons/bi";

const options = [
  {
    label: "Serveur",
  },
  {
    label: "Routeur",
  },
  {
    label: "Commutateur",
  },
];

function isNumber(chaine) {
  return !isNaN(parseFloat(chaine)) && isFinite(chaine);
}

export default function NouveauEquipementContainer() {
  const bottom = useRef(null);
  const form = useRef(null);

  const [category, setCategory] = useState("Serveur");
  const [showFilter, setShowFilter] = useState(false);

  const [nom, setNom] = useState({
    value: "",
    error: "Nom requis",
    valid: false,
  });
  const [adresseIP, setAdresseIP] = useState({
    value: "",
    error: "Adresse IP requis",
    valid: false,
  });
  const [dateInstallation, setDateInstallation] = useState({
    value: "",
    error: "Date d'installation requis",
    valid: false,
  });
  const [sysExploitation, setSysExploitation] = useState({
    value: "",
    error: "Systeme d'exploitation requis",
    valid: false,
  });
  const [description, setDescription] = useState({
    value: "",
    error: "",
    valid: false,
  });
  const [capRAM, setCapRAM] = useState({
    value: null,
    error: "RAM requis",
    valid: false,
  });
  const [capStockage, setCapStockage] = useState({
    value: null,
    error: "Stockage requis",
    valid: false,
  });
  const [debit, setDebit] = useState({
    value: null,
    error: "",
    valid: false,
  });
  const [tempsConnexion, setConTime] = useState({
    value: null,
    error: "",
    valid: false,
  });
  const [tauxErreur, setTauxErreur] = useState({
    value: null,
    error: "",
    valid: false,
  });
  const [tempsReponse, setResTime] = useState({
    value: null,
    error: "",
    valid: false,
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (form?.current) {
      form?.current?.reset();
    }

    // date
    if (dateInstallation.value) {
      setDateInstallation((prev) => ({ ...prev, valid: true, error: "" }));
    } else {
      setDateInstallation((prev) => ({
        ...prev,
        valid: false,
        error: isEmpty(dateInstallation.value)
          ? "Date d'installation requis"
          : "Date invalide",
      }));
    }
  }, [dateInstallation.value]);

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

  const handleReset = () => {
    setNom({
      value: "",
      error: "Nom requis",
      valid: false,
    });
    setAdresseIP({
      value: "",
      error: "Adresse IP requis",
      valid: false,
    });
    setDateInstallation({
      value: "",
      error: "Date d'installation requis",
      valid: false,
    });
    setSysExploitation({
      value: "",
      error: "Systeme d'exploitation requis",
      valid: false,
    });
    setDescription({
      value: "",
      error: "",
      valid: false,
    });
    setDebit({
      value: 0,
      error: "",
      valid: false,
    });
    setConTime({
      value: 0,
      error: "",
      valid: false,
    });
    setTauxErreur({
      value: 0,
      error: "",
      valid: false,
    });
    setResTime({
      value: 0,
      error: "",
      valid: false,
    });
    setIsSubmit(false);
    setIsLoading(false);
  };

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
      tempsReponse.valid &&
      dateInstallation.valid
    ) {
      setIsLoading(true);
      const res = await createServerController({
        nom: nom.value,
        adresseIP: adresseIP.value,
        dateInstallation: dateInstallation.value,
        description: description.value,
        sysExploitation: sysExploitation.value,
        capRAM: capRAM.value,
        capStockage: capStockage.value,
        debit: debit.value,
        tempsConnexion: tempsConnexion.value,
        tempsReponse: tempsReponse.value,
        tauxErreur: tauxErreur.value,
      });
      console.log("res:", res);
    } else {
      setIsSubmit(true);
    }
  };

  return (
    <div className="px-8 w-full flex-1 flex py-2">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 flex-1"
      >
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex gap-4 h-full">
            <h1 className="text-2xl text-white w-max pl-1 flex items-center">
              Nouvel equipement
            </h1>
            <label className="text-green-500 text-xs bg-green-950 min-w-28 px-4 rounded-3xl h-full flex items-center justify-center">
              {category}
            </label>
          </div>

          {/* category */}
          <div className="flex gap-4 w-1/3">
            <label
              htmlFor="category"
              className="w-28 whitespace-nowrap bg-primary rounded-md text-slate-50 text-xs flex justify-center items-center"
            >
              Categorie :
            </label>
            <div
              className="relative flex-1 flex items-center"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <input
                id="filter"
                type="text"
                readOnly
                value={category}
                className={`peer cursor-default text-xs border text-slate-200 bg-[#241e38] h-9 ${
                  showFilter ? "border-primaryColor" : "border-transparent"
                }`}
              />
              <i
                className={`cursor-pointer transition-all duration-150 absolute right-2 w-max ${
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
                  className="absolute top-[2.75rem] z-10 p-1 left-0 w-full bg-[#151221] border border-slate-600 rounded-md"
                >
                  {options.map((option) => (
                    <div className={"h-full w-full"} key={option.label}>
                      <label
                        onClick={() => setCategory(option.label)}
                        className={`w-full flex items-center gap-2 px-2 rounded-md py-2 ${
                          category === option.label
                            ? "bg-[#241e38]"
                            : "group cursor-pointer"
                        }`}
                      >
                        <span className="text-slate-50 select-none text-xs w-max group-hover:text-primaryColor whitespace-nowrap">
                          {option.label}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {true && (
          <>
            <div className="flex w-full flex-col rounded-md bg-[#241e38] relative">
              {/* middle */}
              <Link href={"/dashboard"}>
                <i className="text-slate-50 absolute w-max right-5 top-5">
                  <GrClose size={"1rem"} />
                </i>
              </Link>
              <div className="p-8 w-full">
                <div className="grid grid-cols-3 gap-y-2 gap-x-4 w-full">
                  {/* nom */}
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="debit"
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(nom.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(nom.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(adresseIP.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(adresseIP.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(sysExploitation.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(sysExploitation.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(capRAM.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(capRAM.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(capStockage.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(capStockage.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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

                  {/* date d'installation */}
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="debit"
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
                    >
                      Date d{"'"}installation
                      <div className="flex items-center gap-1 h-full justify-center text-slate-400 text-xs">
                        jj/mm/aa
                      </div>
                    </label>
                    <div className="pl-1 w-full flex flex-col gap-1">
                      <div className="flex h-full relative items-center gap-4 justify-between w-full">
                        <input
                          id="debit"
                          type="text"
                          value={dateInstallation.value || ""}
                          placeholder="10/05/21"
                          onChange={(e) => {
                            setDateInstallation((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }));
                          }}
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(dateInstallation.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                        <i className="text-slate-500 peer-focus:text-primaryColor cursor-pointer absolute right-2">
                          <BiCalendar size={"1rem"} />
                        </i>
                      </div>
                      {!isEmpty(dateInstallation.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
                          <i>
                            <PiWarningCircleFill size="1rem" />
                          </i>
                          <p className=" text-red-400 text-[0.6rem]">
                            {dateInstallation.error}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* debits */}
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="debit"
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(debit.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(debit.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tauxErreur.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(tauxErreur.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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

                  {/* description */}
                  <div className="w-full flex flex-col gap-1 row-span-2">
                    <label
                      htmlFor="desc"
                      className="text-slate-50 w-full text-sm"
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
                          className={`peer px-3 h-full caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent focus:border-primaryColor
                          ${
                            !isEmpty(description.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(description.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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

                  {/* taux d'etablissement conn */}
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="debit"
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tempsConnexion.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(tempsConnexion.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                      className="text-slate-50 flex items-center w-full justify-between text-sm"
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
                          className={`peer px-3 caret-slate-300 border text-xs text-slate-50 placeholder-slate-500  bg-transparent h-10 focus:border-primaryColor
                          ${
                            !isEmpty(tempsReponse.error) && isSubmit
                              ? "border-red-400"
                              : "border-slate-600"
                          }`}
                        />
                      </div>
                      {!isEmpty(tempsReponse.error) && isSubmit && (
                        <div className={"flex gap-2 items-center text-red-400"}>
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
                <button
                  type="reset"
                  onClick={handleReset}
                  className="border border-red-400 h-9 rounded-md text-sm text-red-400 hover:bg-red-950"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-primary flex justify-center items-center gap-2 h-9 rounded-md text-sm text-white"
                >
                  <i>
                    <BsBookmarkPlus size={"1rem"} />
                  </i>
                  Ajouter
                </button>
              </div>
            </div>
          </>
        )}
        <div ref={bottom}></div>
      </form>
    </div>
  );
}
