"use client";

import ClientOnly from "../ClientOnly";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

import { FaCircleUser } from "react-icons/fa6";
import { useEffect } from "react";
import { getUsersController } from "@/lib/controllers/user.controller";
import { fetchUsersInfos } from "@/redux/slices/usersSlice";

export default function DashboardUser() {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getUsersController();
      dispatch(fetchUsersInfos({ users: res.users }));
    })();
  }, []);

  return (
    <ClientOnly>
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="py-2 flex justify-between w-full">
          <h1 className="text-2xl text-white font-semibold">
            <span className="bgText text-2xl font-semibold">Tous </span>
            les utilisateurs
          </h1>
        </div>
        <div className="flex gap-4 flex-1 relative w-full">
          <section className="w-full flex flex-col bg-white h-full rounded-md">
            <div className="w-full flex justify-between h-12 font-semibold buttonGradient items-center rounded-t-md">
              <label className="text-slate-50 px-5 text-sm w-1/5">Nom</label>
              <label className="text-slate-50 px-5 text-sm w-1/5">Prenom</label>
              <label className="text-slate-50 px-5 text-sm w-1/5">
                Adresse email
              </label>
              <label className="text-slate-50 px-5 text-sm w-1/5">Statut</label>
            </div>
            {users?.map((usr) => (
              <div
                key={usr.id}
                className="w-full flex justify-between h-12 items-center border-b border-slate-200"
              >
                <label className="text-slate-950 px-5 text-xs w-1/5 uppercase flex items-center gap-2">
                  <i className="text-slate-600 cursor-pointer rounded-full">
                    <FaCircleUser size={"1.5rem"} />
                  </i>
                  <span className="font-semibold">{usr.nom}</span>
                </label>
                <label className="text-slate-950 px-5 text-xs w-1/5 font-semibold">
                  {usr.prenom}
                </label>
                <label className="text-slate-950 px-5 text-xs w-1/5">
                  {usr.email}
                </label>
                <label className="text-slate-950 px-5 text-xs w-1/5">
                  {usr.id === user.id ? (
                    <span className="bg-green-400 rounded-2xl text-white px-4 py-1 text-xs">
                      en ligne
                    </span>
                  ) : (
                    <span className="bg-red-400 rounded-2xl text-white px-4 py-1 text-xs">
                      deconnecté
                    </span>
                  )}
                </label>
              </div>
            ))}{" "}
          </section>
        </div>
      </div>
    </ClientOnly>
  );
}
