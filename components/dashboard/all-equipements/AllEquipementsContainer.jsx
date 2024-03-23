"use client";

import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoFilterSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiGrid2H } from "react-icons/ci";
import { BsBookmarkPlus, BsGrid } from "react-icons/bs";
import { UidContext } from "@/providers/UidProvider";
import { getEquipementsController } from "@/lib/controllers/equipement.controller";

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

export default function AllEquipementsContainer() {
  const { currentQuery } = useContext(UidContext);

  const [showFilter, setShowFilter] = useState(false);
  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getEquipementsController();
      if (res.equipements) {
        setEquipements(res.equipements);
      }
    })();
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

  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      {/* top */}
      <section>
        <div className="py-1 flex justify-between w-full h-11">
          <h1 className="text-2xl text-white pl-1">Tous les equipements</h1>
          <div className="flex gap-5 items-center">
            {/* nouveau */}
            <Link
              href={{
                pathname: "/dashboard",
                query: {
                  active: "nouveau",
                },
              }}
              className="flex items-center bg-green-700 rounded-md h-full justify-center group cursor-pointer"
            >
              <label className="px-2 w-28 flex items-center justify-center gap-2 cursor-pointer">
                <i className="text-slate-50">
                  <BsBookmarkPlus size={"1rem"} />
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
                    pathname: "/dashboard",
                    query: {
                      active: currentQuery.active,
                      filter: currentQuery.filter,
                      ...view.query,
                    },
                  }}
                  className="w-full cursor-default"
                  key={view.label}
                >
                  <label
                    className={`flex h-full w-24 px-2 relative items-center justify-center gap-2 ${
                      currentQuery.view === view.query.view
                        ? "bg-primary rounded-md cursor-default"
                        : "group cursor-pointer"
                    }`}
                  >
                    <i className="text-slate-50 group-hover:text-primaryColor">
                      {view.icon}
                    </i>
                    <span className="text-xs capitalize text-slate-50 group-hover:text-primaryColor">
                      {view.label}
                    </span>
                  </label>
                </Link>
              ))}
            </div>

            {/* filtre */}
            <div className="flex items-center gap-2 h-full w-48 min-w-48">
              <div
                className="relative flex items-center h-full w-full"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <input
                  id="filter"
                  type="text"
                  readOnly
                  value={
                    options.find(
                      (option) => option.query.filter === currentQuery.filter
                    ).label
                  }
                  className={`peer px-3 bg-[#241e38] cursor-default text-xs text-slate-400 h-full flex-1 ${
                    showFilter ? "border-primaryColor" : ""
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
                    className="absolute top-10 z-10 p-1 left-0 w-full bg-[#151221] border border-slate-600 rounded-md"
                  >
                    {options.map((option) => (
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: {
                            active: currentQuery.active,
                            view: currentQuery.view,
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
                              currentQuery.filter === option.query.filter
                            }
                            onChange={() => {}}
                          />
                          <span className="text-slate-50 select-none text-xs w-max h-full group-hover:text-primaryColor whitespace-nowrap">
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
                className="flex items-center h-full justify-center rounded-md bg-primary cursor-pointer w-9 min-w-9"
              >
                <i className="text-slate-50 px-2 rounded-md">
                  <IoFilterSharp size="1rem" />
                </i>
              </label>
            </div>

            {/* recherche */}
            <div className="flex items-center gap-2 h-full relative w-48 min-w-48">
              <input
                id="search"
                type="text"
                placeholder="Rechercher..."
                className="text-xs px-3 text-slate-50 h-full bg-[#241e38] caret-slate-50 focus:border-primaryColor flex-1"
              />
              <label
                htmlFor="search"
                className="flex items-center justify-center h-full rounded-md bg-primary cursor-pointer w-9 min-w-9"
              >
                <i className="text-slate-50 px-2 rounded-md">
                  <FiSearch size="1rem" />
                </i>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* grid view */}
      {currentQuery.view === "grid" && (
        <section className="w-ull h-full flex justify-center items-center">
          <div className="flex flex-wrap gap-4 w-full justify-center">
            {equipements.map((equipement) => (
              <div
                key={equipement.id}
                className="relative flex flex-col justify-between items-center w-40 h-44 gap-2 py-2 bg-[#241e38] px-3 rounded-md"
              >
                <div className="flex justify-between items-center w-full">
                  <label className="text-green-500 text-xs flex items-center gap-2 capitalize">
                    {equipement.categorie}
                    <span className="text-[0.5rem] text-slate-300 w-max flex items-center bg-slate-800 rounded-lg px-2">
                      {equipement.adresseIP}
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
                    {equipement.nom}
                  </label>
                  <p className="text-[0.65rem] text-slate-500 leading-3 w-full max-w-full overflow-hidden">
                    Installe le: {equipement.dateInstallation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* table view */}
      {currentQuery.view === "table" && (
        <section className="w-full flex flex-col bg-[#241e38] h-full rounded-md">
          <div className="w-full flex justify-between h-12 bg-primary items-center rounded-t-md">
            <label className="text-slate-50 px-5 text-sm w-1/5">
              Categorie
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5">Nom</label>
            <label className="text-slate-50 px-5 text-sm w-1/5">
              Systeme d{"'"}exploitation
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5">
              Adresse IP
            </label>
            <label className="text-slate-50 px-5 text-sm w-1/5">
              Date d{"'"}installation
            </label>
          </div>

          {equipements.map((equipement) => (
            <div
              key={equipement.id}
              className="w-full flex justify-between h-12 items-center border-b border-slate-600"
            >
              <label className="text-slate-50 px-5 text-xs w-1/5 capitalize flex items-center gap-2">
                <div className="relative w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem]">
                  <Image src={"/serveur.png"} alt="" fill objectFit="cover" />
                </div>
                {equipement.categorie}
              </label>
              <label className="text-slate-50 px-5 text-xs w-1/5">
                {equipement.nom}
              </label>
              <label className="text-slate-50 px-5 text-xs w-1/5">
                {equipement.sysExploitation}
              </label>
              <label className="text-slate-50 px-5 text-xs w-1/5">
                {equipement.adresseIP}
              </label>
              <label className="text-slate-50 px-5 text-xs w-1/5">
                {equipement.dateInstallation}
              </label>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
