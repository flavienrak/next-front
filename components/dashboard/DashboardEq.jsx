"use client";

import ClientOnly from "../ClientOnly";
import qs from "query-string";
import Link from "next/link";
import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import { UidContext } from "@/providers/UidProvider";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsBookmarkPlus } from "react-icons/bs";

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

export default function DashboardEq() {
  const { currentQuery, path } = useContext(UidContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState("Serveur");
  const [effectif, setEffectif] = useState(1);
  const [debit, setDebit] = useState(100);
  const [backUrl, setBackUrl] = useState(path);

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
    delete currentQuery.new;

    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          ...currentQuery,
        },
      },
      { skipNull: true }
    );

    setBackUrl(url);
  }, []);

  return (
    <ClientOnly>
      <div className="w-full container">
        <div className="w-full h-full flex items-center justify-center">
          {currentQuery?.new === "equipement" ? (
            <form className="w-full flex flex-col gap-4">
              <div className="flex w-full h-full flex-col rounded-md bg-[#241e38] relative">
                {/* middle */}
                <Link href={backUrl}>
                  <i className="text-slate-50 absolute w-max right-5 top-5">
                    <GrClose size={"1rem"} />
                  </i>
                </Link>
                <div className="flex h-full flex-col gap-6 p-8 pb-10 w-full">
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 w-full">
                    {/* nom */}
                    <div className="w-full flex flex-col gap-1">
                      <label
                        htmlFor="debit"
                        className="text-slate-50 flex items-center w-full justify-between text-sm"
                      >
                        Nom
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* category */}
                    <div className="w-full flex flex-col gap-1">
                      <label
                        htmlFor="category"
                        className="text-slate-50 text-sm"
                      >
                        Categorie
                      </label>
                      <div className="w-full pl-1">
                        <div
                          className="relative flex items-center w-full"
                          onClick={() => setShowFilter((prev) => !prev)}
                        >
                          <input
                            id="filter"
                            type="text"
                            readOnly
                            value={category}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 ${
                              showFilter
                                ? "border-primaryColor"
                                : "border-slate-600 "
                            }`}
                          />
                          <i
                            className={`cursor-pointer transition-all duration-150 absolute right-2 w-max ${
                              showFilter
                                ? "text-primaryColor"
                                : "hover:text-primaryColor text-slate-600"
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
                                <div
                                  className={"h-full w-full"}
                                  key={option.label}
                                >
                                  <label
                                    onClick={() => setCategory(option.label)}
                                    className={`w-full flex items-center gap-2 px-2 rounded-[0.25rem] py-2 ${
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

                    {/* marque */}
                    <div className="w-full flex flex-col gap-1">
                      <label
                        htmlFor="debit"
                        className="text-slate-50 flex items-center w-full justify-between text-sm"
                      >
                        Marque
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600 `}
                          />
                        </div>
                      </div>
                    </div>

                    {/* date d'installation */}
                    <div className="w-full flex flex-col gap-1">
                      <label
                        htmlFor="debit"
                        className="text-slate-50 flex items-center w-full justify-between text-sm"
                      >
                        Date d{"'"}installation
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* fiabilite */}
                    <div className="w-full flex flex-col gap-1">
                      <label
                        htmlFor="debit"
                        className="text-slate-50 flex items-center w-full justify-between text-sm"
                      >
                        Fiabilite
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <div className="w-full flex flex-col gap-1 row-span-3">
                      <label
                        htmlFor="desc"
                        className="text-slate-50 w-full text-sm"
                      >
                        Description
                      </label>
                      <div className="pl-1 w-full h-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <textarea
                            id="desc"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`px-3 cursor-default border text-xs text-slate-500 bg-transparent focus:border-primaryColor border-slate-600`}
                          />
                        </div>
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
                          Mb/s
                        </div>
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
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
                          /s
                        </div>
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
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
                          /s
                        </div>
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
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
                          /s
                        </div>
                      </label>
                      <div className="pl-1 w-full">
                        <div className="flex h-full relative items-center gap-4 justify-between w-full">
                          <input
                            id="debit"
                            type="text"
                            value={debit}
                            onChange={(e) => {}}
                            className={`peer px-3 cursor-default border text-xs text-slate-500 bg-transparent h-10 focus:border-primaryColor border-slate-600`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* butttons */}
              <div className="w-full flex justify-end">
                <div className="w-1/3 flex gap-4">
                  <button className="border border-red-400 h-10 rounded-md text-sm text-red-400 hover:bg-red-950">
                    Annuler
                  </button>
                  <button className="bg-primary flex justify-center items-center gap-2 h-10 rounded-md text-sm text-white">
                    <i>
                      <BsBookmarkPlus size={"1rem"} />
                    </i>
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <section className="w-ull h-full flex">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex flex-col justify-between items-center w-40 h-44 gap-2 py-2 bg-[#241e38] px-3 rounded-md">
                  <div className="flex justify-between items-center w-full">
                    <label className="text-green-500 text-xs flex items-center gap-2">
                      Serveur
                      <span className="text-[0.5rem] text-slate-300 w-max flex items-center bg-slate-800 rounded-lg px-1">
                        serveur web
                      </span>
                    </label>
                    <i className="text-slate-50 w-max cursor-pointer">
                      <HiOutlineDotsHorizontal size={"1rem"} />
                    </i>
                  </div>
                  <div className="flex items-center w-full justify-center">
                    <div className="relative w-full h-20 rounded-sm ">
                      <Image
                        src="/serveur.png"
                        fill
                        alt=""
                        objectFit="cover"
                        className="rounded-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center flex-col w-full">
                    <label className="text-slate-50 w-full text-sm whitespace-nowrap max-w-full overflow-hidden">
                      WebServer1
                    </label>
                    <p className="text-[0.65rem] text-slate-500 leading-3 w-full max-w-full overflow-hidden">
                      Installe le: 10/03/25
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
