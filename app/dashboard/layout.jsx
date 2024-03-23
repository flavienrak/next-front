"use client";

import styles from "@/styles/dashboard/DashboardContainer.module.css";
import Link from "next/link";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";

import { IoLogOutOutline } from "react-icons/io5";
import { RiSettings4Line, RiUser4Line } from "react-icons/ri";
import { VscBell } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { UidContext } from "@/providers/UidProvider";
import { BiFoodMenu } from "react-icons/bi";

const menu = [
  {
    label: "Général",
    active: "general",
  },
  {
    label: "Equipements",
    active: "equipements",
    query: {
      view: "grid",
      filter: "all",
    },
  },
  {
    label: "Nouveau",
    active: "nouveau",
  },
  {
    label: "Utilisateurs",
    active: "user",
  },
  {
    label: "Statistiques",
    active: "stat",
  },
];

const profilMenu = [
  {
    label: "Profil",
    href: "/profil",
    icon: <RiUser4Line size={"1rem"} />,
  },
  {
    label: "Parametres",
    href: "/settings",
    icon: <RiSettings4Line size={"1rem"} />,
  },
];

export default function DashboardLayout({ children }) {
  const { currentQuery, path } = useContext(UidContext);
  const [showFilter, setShowFilter] = useState(false);

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
    <ClientOnly>
      <div className="container w-full relative bg-[#151221]">
        <div className="flex flex-col py-2 min-h-[100vh] w-full gap-2">
          {/* top */}
          <section className="h-max px-8">
            <div className="flex flex-1 py-2 justify-between w-full">
              <div className="flex items-center w-max gap-2">
                <div className="relative w-[3rem] h-[2rem] ">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    className=""
                    objectFit="cover"
                  />
                </div>
                <p className="uppercase text-white text-sm">
                  <span className="bgText font-semibold text-xl">E</span>
                  quipements
                </p>
              </div>

              <div className="flex items-center gap-2 justify-between w-48">
                <Link
                  href={"https://github.com/flavienrak/next-front"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full w-max"
                >
                  <label className="h-full flex items-center justify-center border border-primaryColor text-xs px-4 rounded-3xl cursor-pointer transition-all duration-100 text-primaryColor">
                    Code source
                  </label>
                </Link>
                <div className="w-max">
                  <i className="w-[2rem] h-[2rem] text-primaryColor bg-[#241e38] rounded-full  flex items-center justify-center">
                    <VscBell size={"1.15rem"} />
                  </i>
                </div>
                <div className="flex gap-2 group">
                  <div className="relative w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem] rounded-full">
                    <Image
                      src={"/profil.jpg"}
                      alt={""}
                      fill
                      objectFit="cover"
                      className="rounded-full cursor-pointer"
                    />

                    <div className="absolute hidden z-10 group-hover:flex top-12 gap-1 flex-col bg-slate-950 right-0 py-2 px-4 rounded-md transition-all duration-1000">
                      <div className="flex flex-col">
                        <label className="leading-3 text-xs max-w-max text-white">
                          RAK <span className="text-xs">Flavien</span>
                        </label>
                        <p className="text-slate-500 leading-3 text-[0.65rem] max-w-max text-nowrap">
                          flavien.andrisoarak@gmail.com
                        </p>
                      </div>
                      <div className="h-[0.5px] w-3/4 bg-slate-600"></div>
                      <div className="flex flex-col w-full">
                        {profilMenu.map((prf) => (
                          <Link
                            key={prf.label}
                            href={prf.href}
                            className={`w-full ${styles.link}`}
                          >
                            <label className="flex items-center transition-all duration-150 cursor-pointer gap-2 w-full py-2 rounded-sm">
                              <i className="w-max text-white transition-all duration-150">
                                {prf.icon}
                              </i>
                              <span className="text-slate-50 text-xs transition-all duration-150">
                                {prf.label}
                              </span>
                            </label>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* menu */}
          <section className="h-max px-8">
            <div className="py-3 bg-[#241e38] flex justify-between items-center px-4 w-full rounded-md">
              <div className="flex gap-3.5">
                <i className="text-white ">
                  <BiFoodMenu size={"1rem"} />
                </i>
                <div className="flex gap-6">
                  {menu.map((m) => (
                    <Link
                      key={m.active}
                      href={{
                        pathname: "/dashboard",
                        query: { active: m.active, ...m.query },
                      }}
                      className={`text-xs w-max border-b-2 cursor-pointer transition-all duration-150 hover:text-primaryColor ${
                        currentQuery.active === m.active
                          ? "text-primaryColor font-medium  border-primaryColor"
                          : " text-white  border-transparent"
                      }`}
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
              <button className="w-max flex items-center gap-2 border-b border-transparent hover:border-red-400 text-red-400 py-1 text-xs transition-all duration-150">
                Logout
                <i className="flex justify-center items-center">
                  <IoLogOutOutline size={"1rem"} />
                </i>
              </button>
            </div>
          </section>
          {children}
        </div>
      </div>
    </ClientOnly>
  );
}
