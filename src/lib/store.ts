"use client";

import { create } from "zustand";
import type { ThemeMode } from "./theme";
import { TREE} from "./tree";
import { TreeFolder } from "@/types/whoami.type";

function findFolderByPath(
  node: TreeFolder,
  path: string
): TreeFolder | undefined {
  if (node.path === path) return node;
  for (const child of node.children) {
    if (child.type === "folder") {
      const found = findFolderByPath(child, path);
      if (found) return found;
    }
  }
  return undefined;
}

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
  openTabs: ["README.md"],
  openFolders: {},
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
    const cur = get().isFolderOpen(path);
    set({ openFolders: { ...get().openFolders, [path]: !cur } });
  },

  isFolderOpen: (path) => {
    const explicit = get().openFolders[path];
    if (explicit !== undefined) return explicit;
    // Sinon, on lit defaultCollapsed dans le tree
    const folder = findFolderByPath(TREE, path);
    return !(folder?.defaultCollapsed ?? false);
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
    }
    set({ theme: next });
  },
}));