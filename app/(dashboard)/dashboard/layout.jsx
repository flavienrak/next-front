"use client";

import Link from "next/link";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";

import { useSelector, useDispatch } from "react-redux";

import { IoLogOutOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { UidContext } from "@/providers/UidProvider";
import { FaCircleUser } from "react-icons/fa6";
import { CgMenu } from "react-icons/cg";
import { removeUserInfos } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { fetchUsersInfos } from "@/redux/slices/usersSlice";
import { getUsersController } from "@/lib/controllers/user.controller";
import { getEquipementsController } from "@/lib/controllers/equipement.controller";
import { fetchEquipementsInfos } from "@/redux/slices/equipementsSlice";
import { fetchDataInfos } from "@/redux/slices/dataSlice";

const menu = [
  {
    label: "Général",
    query: {
      active: "general",
      stat: "serveur",
    },
  },
  {
    label: "Equipements",
    query: {
      active: "equipements",
      view: "grid",
      filter: "all",
    },
  },
  {
    label: "Nouveau",
    query: {
      active: "nouveau",
      categorie: "serveur",
    },
  },
  {
    label: "Utilisateurs",
    query: {
      active: "user",
    },
  },
  {
    label: "Notifications",
    query: {
      active: "notifications",
    },
  },
];

export default function DashboardLayout({ children }) {
  const { currentQuery } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notifications);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getUsersController();
      dispatch(fetchUsersInfos({ users: res.users }));
    })();
    (async () => {
      const res = await getEquipementsController();
      if (res?.equipements && res?.data) {
        dispatch(fetchDataInfos({ data: res.data }));
        dispatch(fetchEquipementsInfos({ equipements: res.equipements }));
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

  const handleLogout = async () => {
    dispatch(removeUserInfos());
    push("/auth/login");
  };

  return (
    <ClientOnly>
      <div className="container w-full relative bg-white bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col py-2 min-h-[100vh] w-full gap-2">
          {/* top */}
          <section className="h-max px-8">
            <div className="flex flex-1 py-2 justify-between w-full">
              <div className="flex items-center w-max gap-2">
                <p className="uppercase text-white text-xl font-bold">
                  Equipements.
                </p>
              </div>

              <div className="flex items-center gap-4 justify-between">
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
                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      active: "notifications",
                    },
                  }}
                  className="w-max"
                >
                  <i className="w-[2rem] h-[2rem] relative text-white bg-primary rounded-full  flex items-center justify-center">
                    <VscBell size={"1.15rem"} />
                    {notifications.length > 0 && (
                      <span className="absolute h-3 w-3 rounded-full bg-red-400 border-2 border-white -bottom-0.5 -right-0.5"></span>
                    )}
                  </i>
                </Link>
                <div className="flex gap-2 group">
                  <div className="relative w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem] rounded-full">
                    <i className="text-white cursor-pointer rounded-full">
                      <FaCircleUser size={"2rem"} />
                    </i>
                    <div className="absolute hidden z-10 group-hover:flex top-10 gap-1 flex-col bg-white right-0 py-2 px-4 rounded-md transition-all duration-1000 boxShadow">
                      <div className="flex flex-col">
                        <label className="max-w-max text-primaryColor font-semibold uppercase">
                          {user.nom}{" "}
                          <span className="capitalize">{user.prenom}</span>
                        </label>
                        <p className="text-slate-500 leading-3 text-[0.65rem] max-w-max text-nowrap">
                          {user.email}
                        </p>
                      </div>
                      <div className="h-[0.5px] w-3/4 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* menu */}
          <section className="h-max px-8">
            <div className="py-3 bg-white flex justify-between items-center px-4 w-full rounded-md">
              <div className="flex gap-3.5 items-center">
                <i className="text-slate-900">
                  <CgMenu size={"1rem"} />
                </i>
                <div className="flex gap-6">
                  {menu.map((m) => (
                    <Link
                      key={m.query.active}
                      href={{
                        pathname: "/dashboard",
                        query: { ...m.query },
                      }}
                      className={`relative text-sm w-max border-b-2 cursor-pointer transition-all duration-150 hover:text-primaryColor ${
                        currentQuery.active === m.query.active
                          ? "text-primaryColor font-medium  border-primaryColor"
                          : " text-slate-950  border-transparent"
                      }`}
                    >
                      {m.label}
                      {m.query.active === "notifications" &&
                        notifications.length > 0 && (
                          <span className="absolute -top-3 -right-3 bg-red-400 px-2 py-1 text-white font-bold text-xs flex items-center justify-center rounded-full">
                            {notifications.length}
                          </span>
                        )}
                    </Link>
                  ))}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-max flex items-center gap-2 border-b border-transparent hover:border-red-400 text-red-400 py-1 text-sm transition-all duration-150"
              >
                Logout
                <i className="flex justify-center items-center">
                  <IoLogOutOutline size={"1.15rem"} />
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
