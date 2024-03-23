"use client";

import ClientOnly from "../ClientOnly";
import Image from "next/image";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function DashboardUser() {
  return (
    <ClientOnly>
      <div className="w-full h-full">
        <section className="w-ull h-full">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex flex-col justify-between items-center w-40 h-44 gap-2 py-2 bg-[#241e38] px-3 rounded-md">
              <div className="flex justify-between items-center w-full">
                <label className="text-green-500 text-xs flex items-center gap-2">
                  Admin
                  <span className="text-[0.5rem] text-slate-300 w-max flex items-center bg-slate-800 rounded-lg px-1">
                    en ligne
                  </span>
                </label>
                <i className="text-slate-50 w-max cursor-pointer">
                  <HiOutlineDotsHorizontal size={"1rem"} />
                </i>
              </div>
              <div className="flex items-center w-full justify-center">
                <div className="relative w-full h-20 rounded-sm ">
                  <Image
                    src="/profil.jpg"
                    fill
                    alt=""
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </div>
              </div>
              <div className="flex items-center flex-col w-full">
                <label className="text-slate-50 w-full text-sm whitespace-nowrap max-w-full overflow-hidden">
                  RAK Flavien
                </label>
                <p className="text-[0.65rem] text-slate-500 leading-3 w-full max-w-full overflow-hidden">
                  flavien.andrisoarak@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientOnly>
  );
}
