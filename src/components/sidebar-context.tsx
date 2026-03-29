"use client";

import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  autoDjFocusEnabled: boolean;
  setAutoDjFocusEnabled: (enabled: boolean) => void;
  autoDjBreakEnabled: boolean;
  setAutoDjBreakEnabled: (enabled: boolean) => void;
  smartPausingEnabled: boolean;
  setSmartPausingEnabled: (enabled: boolean) => void;
  focusPlaylistId: string | null;
  setFocusPlaylistId: (id: string | null) => void;
  breakPlaylistId: string | null;
  setBreakPlaylistId: (id: string | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoDjFocusEnabled, setAutoDjFocusEnabled] = useState(false);
  const [autoDjBreakEnabled, setAutoDjBreakEnabled] = useState(false);
  const [smartPausingEnabled, setSmartPausingEnabled] = useState(false);
  const [focusPlaylistId, setFocusPlaylistId] = useState<string | null>(null);
  const [breakPlaylistId, setBreakPlaylistId] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        closeSidebar,
        autoDjFocusEnabled,
        setAutoDjFocusEnabled,
        autoDjBreakEnabled,
        setAutoDjBreakEnabled,
        smartPausingEnabled,
        setSmartPausingEnabled,
        focusPlaylistId,
        setFocusPlaylistId,
        breakPlaylistId,
        setBreakPlaylistId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
