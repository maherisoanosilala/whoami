"use client";

import { create } from "zustand";
import type { ThemeMode } from "./theme";

type Store = {
  openTabs: string[];
  openFolders: Record<string, boolean>;
  theme: ThemeMode;
  openTab: (path: string) => void;
  closeTab: (path: string) => void;
  toggleFolder: (path: string) => void;
  isFolderOpen: (path: string) => boolean;
  toggleTheme: () => void;
};

export const useIDE = create<Store>((set, get) => ({
  openTabs: ["src/app/whoami/about.tsx"],
  openFolders: {}, // tous ouverts par défaut (voir isFolderOpen)
  theme: "dark",

  openTab: (path) => {
    const { openTabs } = get();
    if (!openTabs.includes(path)) {
      set({ openTabs: [...openTabs, path] });
    }
  },

  closeTab: (path) => {
    set({ openTabs: get().openTabs.filter((p) => p !== path) });
  },

  toggleFolder: (path) => {
    const cur = get().openFolders[path] ?? true;
    set({ openFolders: { ...get().openFolders, [path]: !cur } });
  },

  isFolderOpen: (path) => get().openFolders[path] ?? true,

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
    }
    set({ theme: next });
  },
}));