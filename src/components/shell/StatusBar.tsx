"use client";

import { usePathname } from "next/navigation";
import { GitBranch, Circle } from "lucide-react";
import { getFile, slugToPath } from "@/lib/tree";
import { whoami } from "@/lib/whoami";

export function StatusBar() {
  const pathname = usePathname();
  const slug = pathname.replace(/^\//, "");
  const path = slugToPath(slug) ?? "README.md";
  const file = getFile(path);

  return (
    <footer className="h-6 shrink-0 flex items-center gap-4 px-3 text-[11px] font-mono border-t border-nosy-border bg-nosy-deep text-nosy-dim">
      <span className="flex items-center gap-1.5">
        <GitBranch size={11} /> main
      </span>
      <span className="flex items-center gap-1.5">
        <Circle size={8} className="fill-nosy-choc-up text-nosy-choc-up" />
        {whoami.name} v{whoami.version}
      </span>
      <span className="ml-auto flex items-center gap-2">
        <kbd className="text-[10px] font-mono text-nosy-dim border border-nosy-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
        <span>Palette</span>
      </span>
      <span>{file?.lang ?? "—"}</span>
      <span>UTF-8</span>
      <span className="text-nosy-choc-up">◆ {whoami.theme}</span>
    </footer>
  );
}