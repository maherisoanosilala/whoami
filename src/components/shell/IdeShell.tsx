"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { Tabs } from "./Tabs";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";
import { useIDE } from "@/lib/store";
import { getFile } from "@/lib/tree";

export function IdeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const openTab = useIDE((s) => s.openTab);

  // Sync URL → onglets : chaque navigation ajoute/active l'onglet
  useEffect(() => {
    const path = pathname.replace(/^\//, "");
    if (getFile(path)) openTab(path);
  }, [pathname, openTab]);

  return (
    <div className="h-screen flex flex-col bg-nosy-bg text-nosy-fg">
      <div className="flex-1 flex min-h-0">
        <ActivityBar />
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <Tabs />
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-10 py-10">{children}</div>
          </div>
        </main>
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}