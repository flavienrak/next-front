"use client";

import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

import { useContext } from "react";

import { VscBell } from "react-icons/vsc";
import { UidContext } from "@/providers/UidProvider";

const menu = [
  {
    label: "General",
    active: "general",
  },
  {
    label: "Utilisateurs",
    active: "users",
  },
  {
    label: "Equipements",
    active: "equipements",
  },
  {
    label: "Statistiques",
    active: "stat",
  },
];

export default function DashboardContainer() {
  const { currentQuery } = useContext(UidContext);

  return (
    <ClientOnly>
      <div className="container w-full relative bg-white">
        <div className="flex flex-col  min-h-[100vh]">
          <section className="flex justify-between h-max py-2 px-10 border-b ">
            <div className="flex items-center w-max">
              <p>
                <span className="bgText">E</span>q
              </p>
            </div>
            <div className="flex items-center w-max gap-6">
              <div className="w-max ">
                <span className="border border-primaryColor text-xs py-2 px-4 rounded-md cursor-pointer transition-all duration-100 text-primaryColor">
                  Code source
                </span>
              </div>
              <div className="w-max">
                <i className="p-2.5 bg-slate-100 text-primary rounded-full  flex items-center justify-center">
                  <VscBell size={"1rem"} />
                </i>
              </div>
              <div className="flex gap-2 max-w-[12rem] overflow-hidden">
                <div className="relative w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem] rounded-full">
                  <Image
                    src={"/profil.jpg"}
                    alt={""}
                    fill
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-3 text-sm max-w-max">
                    RAK <span className="text-sm">Flavien</span>
                  </label>
                  <p className="text-slate-400 leading-3 text-[0.65rem] max-w-max text-nowrap">
                    flavien.andrisoarak@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex justify-between items-center h-max py-2 px-10 border-b ">
            <div className="flex gap-6">
              {menu.map((m) => (
                <Link
                  key={m.active}
                  href={`/dashboard?active=${m.active}`}
                  className={`text-sm py-1 w-max cursor-pointer border-primaryColor transition-all duration-100 hover:text-primaryColor ${
                    currentQuery.active === m.active
                      ? "text-primaryColor border-b-2 font-medium"
                      : " text-slate-700"
                  }`}
                >
                  {m.label}
                </Link>
              ))}
            </div>
            <button className="w-max bg-bgRed py-1.5 px-3 text-xs rounded-sm min-w-[4rem] text-textWhite">
              Logout
            </button>
          </section>
          <section className="bg-slate-100 flex-1 "></section>
        </div>
      </div>
    </ClientOnly>
  );
}
