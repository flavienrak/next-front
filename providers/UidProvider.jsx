"use client";

import qs from "query-string";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import { notConnectedPaths, protectedPaths } from "@/lib/paths";
import { getUsersController } from "@/lib/controllers/user.controller";
import { getEquipementsController } from "@/lib/controllers/equipement.controller";
import { fetchEquipementsInfos } from "@/redux/slices/equipementsSlice";
import { fetchUsersInfos } from "@/redux/slices/usersSlice";
import { fetchDataInfos } from "@/redux/slices/dataSlice";
import { fetchNotificationsInfos } from "@/redux/slices/notificationsSlice";

export const UidContext = createContext();

export default function UidProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { user } = useSelector((state) => state.user);
  const [currentQuery, setCurrentQuery] = useState({});

  useEffect(() => {
    if (isEmpty(user) && protectedPaths.includes(path)) {
      push("/auth/login");
    } else if (!isEmpty(user) && notConnectedPaths.includes(path)) {
      push("/dashboard?active=general&stat=serveur");
    }

    (async () => {
      const res = await getUsersController();
      dispatch(fetchUsersInfos({ users: res.users }));
    })();
    (async () => {
      const res = await getEquipementsController();
      if (res?.equipements && res?.data && res?.notifications) {
        dispatch(fetchNotificationsInfos({ notifications: res.notifications }));
        dispatch(fetchDataInfos({ data: res.data }));
        dispatch(fetchEquipementsInfos({ equipements: res.equipements }));
      }
    })();
  }, []);

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  return (
    <UidContext.Provider value={{ currentQuery, path }}>
      {children}
    </UidContext.Provider>
  );
}
