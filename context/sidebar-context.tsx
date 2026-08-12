"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface SidebarContextValue {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const syncLayout = () => {
      const saved = window.localStorage.getItem("kindervale-sidebar-open");
      const nextIsMobile = mediaQuery.matches;
      setIsMobile(nextIsMobile);
      setIsOpen(nextIsMobile ? false : saved ? saved === "true" : true);
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);
    return () => mediaQuery.removeEventListener("change", syncLayout);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.localStorage.setItem("kindervale-sidebar-open", String(isOpen));
    }
  }, [isMobile, isOpen]);

  const toggleSidebar = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, isMobile, toggleSidebar, closeSidebar }),
    [closeSidebar, isMobile, isOpen, toggleSidebar]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}
