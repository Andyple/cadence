"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "./sidebar-context";
import { TimerProvider } from "./timer-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TimerProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </TimerProvider>
    </SessionProvider>
  );
}
