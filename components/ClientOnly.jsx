"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined") {
    return null;
  }
  if (!mounted) return null;

  return <>{children}</>;
}
