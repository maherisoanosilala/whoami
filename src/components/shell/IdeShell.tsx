"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { Tabs } from "./Tabs";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";
import { useIDE } from "@/lib/store";
import { getFile, slugToPath } from "@/lib/tree";

export function IdeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const openTab = useIDE((s) => s.openTab);

  useEffect(() => {
    const slug = pathname.replace(/^\//, "");
    const path = slugToPath(slug) ?? "README.md";
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