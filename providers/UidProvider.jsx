"use client";

import qs from "query-string";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { isEmpty } from "@/lib/utils/isEmpty";
import { notConnectedPaths, protectedPaths } from "@/lib/paths";

export const UidContext = createContext();

export default function UidProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();
  const { push } = useRouter();
  const { user } = useSelector((state) => state.user);
  const [currentQuery, setCurrentQuery] = useState({});

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  useEffect(() => {
    if (isEmpty(user) && protectedPaths.includes(path)) {
      push("/auth/login");
    } else if (!isEmpty(user) && notConnectedPaths.includes(path)) {
      push("/dashboard?active=general&stat=serveur");
    }
  }, []);

  return (
    <UidContext.Provider value={{ currentQuery, path }}>
      {children}
    </UidContext.Provider>
  );
}
