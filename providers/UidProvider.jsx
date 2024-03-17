"use client";

import qs from "query-string";

import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const UidContext = createContext();

export default function UidProvider({ children }) {
  const params = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState({});

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  return (
    <UidContext.Provider value={{ currentQuery }}>
      {children}
    </UidContext.Provider>
  );
}