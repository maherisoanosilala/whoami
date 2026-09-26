"use client";

import { Files, Search, GitBranch, Settings, Sun, Moon } from "lucide-react";
import { useIDE } from "@/lib/store";

export function ActivityBar() {
  const { theme, toggleTheme } = useIDE();

  return (
    <aside className="w-12 shrink-0 flex flex-col items-center py-3 gap-1 border-r border-nosy-border bg-nosy-deep">
      <button className="p-2 rounded-md text-nosy-fg hover:bg-nosy-hover transition-colors">
        <Files size={18} strokeWidth={1.75} />
      </button>
      <button className="p-2 rounded-md text-nosy-dim hover:text-nosy-fg hover:bg-nosy-hover transition-colors">
        <Search size={18} strokeWidth={1.75} />
      </button>
      <button className="p-2 rounded-md text-nosy-dim hover:text-nosy-fg hover:bg-nosy-hover transition-colors">
        <GitBranch size={18} strokeWidth={1.75} />
      </button>

      <div className="mt-auto flex flex-col items-center gap-1">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-nosy-dim hover:text-nosy-fg hover:bg-nosy-hover transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} strokeWidth={1.75} />
          ) : (
            <Moon size={18} strokeWidth={1.75} />
          )}
        </button>
        <button className="p-2 rounded-md text-nosy-dim hover:text-nosy-fg hover:bg-nosy-hover transition-colors">
          <Settings size={18} strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}