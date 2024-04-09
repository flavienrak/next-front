"use client";

import Image from "next/image";
import Link from "next/link";
import qs from "query-string";

import { useContext, useEffect, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiGrid2H } from "react-icons/ci";
import { BsArrowRightShort, BsBookmarkPlus, BsGrid } from "react-icons/bs";
import { UidContext } from "@/providers/UidProvider";
import { deleteEquipementController } from "@/lib/controllers/equipement.controller";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquareEdit } from "react-icons/bi";
import {
  deleteEquipementInfos,
  setActualEquipement,
} from "@/redux/slices/equipementsSlice";
import { isEmpty } from "@/lib/utils/isEmpty";
import { ToastContext } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { setActualData } from "@/redux/slices/dataSlice";

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
  const { equipements } = useSelector((state) => state.equipements);
  const { data } = useSelector((state) => state.data);
  const { users } = useSelector((state) => state.users);
  const { handleShowToast } = useContext(ToastContext);
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = qs.stringifyUrl(
        {
          url: "/dashboard",
          query: {
            active: "equipements",
            view: currentQuery.view,
            filter: currentQuery.filter,
            searchKey: searchInput,
          },
        },
        { skipNull: true }
      );
      push(url);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

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

  const findUser = (userId) => {
    return users?.find((usr) => usr.id == userId);
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      {/* top */}
      <section>
        <div className="py-1 flex justify-between w-full h-11">
          <h1 className="text-2xl text-white pl-1 font-semibold">
            <span className="bgText text-2xl">Tous </span>
            les equipements
          </h1>

          {!isEmpty(equipements) && (
            <div className="flex gap-5 items-center">
              {/* nouveau */}
              <Link
                href={{
                  pathname: "/dashboard",
                  query: {
                    active: "nouveau",
                    categorie: "serveur",
                  },
                }}
                className="flex items-center bg-green-400 rounded-md h-full justify-center group cursor-pointer"
              >
                <label className="px-2 w-28 flex items-center justify-center gap-2 cursor-pointer">
                  <i className="text-white">
                    <BsBookmarkPlus size={"1rem"} />
                  </i>
                  <span className="text-xs text-white whitespace-nowrap">
                    Nouveau
                  </span>
                </label>
              </Link>

              {/* affichage */}
              <div className="h-full flex bg-white rounded-md">
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
                      <i
                        className={` group-hover:text-primaryColor ${
                          currentQuery.view === view.query.view
                            ? "text-white"
                            : "text-slate-950"
                        }`}
                      >
                        {view.icon}
                      </i>
                      <span
                        className={`text-xs capitalize group-hover:text-primaryColor ${
                          currentQuery.view === view.query.view
                            ? "text-white"
                            : "text-slate-950"
                        }`}
                      >
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
                    className={`peer px-3 bg-white cursor-default text-xs text-slate-950 h-full flex-1`}
                  />
                  <i
                    className={`cursor-pointer transition-all duration-150 absolute right-2 w-max ${
                      showFilter
                        ? "text-primaryColor"
                        : "hover:text-primaryColor text-slate-950"
                    }`}
                  >
                    <RiArrowDownSLine size="1rem" />
                  </i>

                  {showFilter && (
                    <div
                      id="filterOptions"
                      className="absolute boxShadow top-10 z-10 p-1 left-0 w-full bg-white rounded-md"
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
                            className={`w-full flex items-center gap-2 px-2 rounded-md py-2 ${
                              currentQuery.filter === option.query.filter
                                ? "bg-primary"
                                : "group cursor-pointer"
                            }`}
                          >
                            <input
                              id={option.filter}
                              type="radio"
                              name="select"
                              className={`cursor-pointer ${
                                currentQuery.filter === option.query.filter
                                  ? "border-white"
                                  : "border-slate-950"
                              }`}
                              checked={
                                currentQuery.filter === option.query.filter
                              }
                              onChange={() => {}}
                            />
                            <span
                              className={`select-none text-xs w-max h-full group-hover:text-primaryColor whitespace-nowrap ${
                                currentQuery.filter === option.query.filter
                                  ? "text-white"
                                  : "text-slate-950 "
                              }`}
                            >
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="text-xs px-3 text-slate-950 h-full bg-white caret-slate-950 flex-1"
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
          )}
        </div>
      </section>

      {!isEmpty(equipements) ? (
        <>
          {/* grid view */}
          {currentQuery.view === "grid" && (
            <section className="w-ull h-full flex justify-center items-center">
              <div className="flex flex-wrap gap-4 w-full justify-center">
                {equipements.map((equipement) => {
                  if (
                    currentQuery.filter === "all" ||
                    equipement.categorie === currentQuery.filter ||
                    currentQuery?.searchKey
                  )
                    return (
                      <div
                        key={equipement.id}
                        className="relative flex flex-col justify-between items-center w-44 h-44 gap-2 py-2 bg-white px-3 rounded-md"
                      >
                        <div className="flex justify-between items-center w-full">
                          <label
                            className={`text-xs flex items-center gap-2 capitalize w-full justify-between ${
                              equipement.categorie === "serveur"
                                ? "text-primaryColor"
                                : equipement.categorie === "routeur"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {equipement.categorie}
                            <span className="text-[0.5rem] text-white w-max flex items-center buttonGradient rounded-sm px-2">
                              {equipement.adresseIP}
                            </span>
                          </label>
                        </div>
                        <Link
                          href={{
                            pathname: "/dashboard",
                            query: {
                              active: "infos",
                              equipement: equipement.id,
                            },
                          }}
                          className="flex-1 flex flex-col w-full justify-between"
                          onClick={() => {
                            dispatch(setActualEquipement({ equipement }));
                            dispatch(
                              setActualData({ data: data[equipement.id] })
                            );
                          }}
                        >
                          <div className="flex items-center w-full justify-center flex-1">
                            <div className="relative w-full h-20 rounded-sm ">
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
                          </div>
                          <div className="flex items-center flex-col w-full">
                            <label className="text-slate-950 w-full text-sm whitespace-nowrap max-w-full overflow-hidden font-semibold">
                              {equipement.nom}
                            </label>
                            <p className="text-[0.6rem] text-slate-500 leading-3 w-full max-w-full overflow-hidden flex items-center justify-between gap-1">
                              <span className="text-[0.6rem]">
                                Ajouté par :{" "}
                                <span className="font-bold text-[0.6rem] w-max text-slate-800">
                                  {findUser(equipement.userId)?.nom}{" "}
                                  {findUser(equipement.userId)?.prenom}
                                </span>
                              </span>
                              <span className="text-slate-500">
                                <BsArrowRightShort size={"1rem"} />
                              </span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                })}
              </div>
            </section>
          )}

          {/* table view */}
          {currentQuery.view === "table" && (
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
                  Date d{"'"}installation
                </label>
                <label className="text-slate-50 px-5 text-sm w-1/5 font-semibold">
                  Actions
                </label>
              </div>
              <div className="flex flex-col w-full scr">
                {equipements.map((equipement, index) => (
                  <div
                    key={equipement.id}
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
                    <label className="text-slate-950 px-5 text-xs w-1/5">
                      {equipement.dateInstallation}
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
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: {
                            active: "edit",
                            edit: equipement.id,
                          },
                        }}
                        className="w-max"
                      >
                        <i
                          onClick={() => {
                            dispatch(setActualEquipement({ equipement }));
                            dispatch(
                              setActualData({ data: data[equipement.id] })
                            );
                          }}
                          className="bg-primary text-white w-8 h-8 rounded-full flex items-center cursor-pointer transition-all duration-150"
                        >
                          <BiMessageSquareEdit size={"1rem"} />{" "}
                        </i>
                      </Link>
                      <i
                        onClick={() => {
                          handleDeleteEquipement(equipement.id);
                        }}
                        className="bg-red-400 text-white w-8 h-8 rounded-full flex items-center cursor-pointer transition-all duration-150 hover:bg-red-500"
                      >
                        <FaRegTrashAlt size={"1rem"} />
                      </i>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className=" flex flex-col gap-4 items-center w-full justify-center h-full rounded-md">
          <div className="relative h-28 w-36">
            <Image src="/null.png" alt="" fill objectFit="cover" />
          </div>
          <label className="font-semibold text-3xl text-white">
            Aucun equipements enregistré pour le moment.
          </label>
        </div>
      )}
    </div>
  );
}
