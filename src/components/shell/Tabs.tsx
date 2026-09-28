"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X, Code2, Eye } from "lucide-react";
import { useState } from "react";
import {
  getFile,
  pathToSlug,
  slugToPath,
} from "@/lib/tree";
import { useIDE } from "@/lib/store";
import clsx from "clsx";
import { fileIcon } from "@/lib/fileIcon";
import { TreeFile } from "@/types/whoami.type";


/**
 * Label d'un onglet :
 * - Fichier à la racine → "README.md"
 * - Fichier dans un dossier → "about/page.tsx"
 */
function getTabLabel(file: TreeFile): {
  parent: string | null;
  fileName: string;
} {
  const parts = file.path.split("/");
  const fileName = file.name;

  if (parts.length === 1) {
    return { parent: null, fileName };
  }

  return { parent: parts[parts.length - 2], fileName };
}

export function Tabs() {
  const { openTabs, closeTab } = useIDE();
  const pathname = usePathname();
  const router = useRouter();

  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const activeSlug = pathname.replace(/^\//, "");
  const activePath = slugToPath(activeSlug) ?? "README.md";

  const onClose = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const remaining = openTabs.filter((p) => p !== path);
    closeTab(path);
    if (activePath === path) {
      if (remaining.length > 0) {
        router.push(`/${pathToSlug(remaining[remaining.length - 1])}`);
      } else {
        router.push("/");
      }
    }
  };

  const togglePreview = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !showCode[path];
    setShowCode((p) => ({ ...p, [path]: next }));
    window.dispatchEvent(
      new CustomEvent("whoami:preview", { detail: { path, showCode: next } })
    );
  };

  return (
    <div className="h-10 flex items-stretch border-b border-nosy-border bg-nosy-bg overflow-x-auto">
      {openTabs.map((path) => {
        const file = getFile(path);
        if (!file) return null;

        const isActive = activePath === path;
        const isCode = showCode[path];
        const { Icon, color } = fileIcon(file.name, file.lang);
        const { parent, fileName } = getTabLabel(file);

        return (
          <div
            key={path}
            className={clsx(
              "group relative flex items-center gap-2 px-3 text-[13px] border-r border-nosy-border transition-colors whitespace-nowrap",
              isActive
                ? "bg-nosy-surface text-nosy-fg"
                : "text-nosy-dim hover:text-nosy-soft"
            )}
          >
            {isActive && (
              <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-nosy-choc" />
            )}

            <Link
              href={`/${pathToSlug(path)}`}
              className="flex items-center gap-2"
            >
              <Icon size={14} className={clsx(color, "shrink-0")} />
              <span className="truncate">
                {parent && (
                  <span className="text-nosy-dim text-[11px]">{parent}/</span>
                )}
                <span>{fileName}</span>
              </span>
            </Link>

            {isActive && file.hasPreview && (
              <button
                onClick={togglePreview(path)}
                className="p-0.5 rounded hover:bg-nosy-hover transition-colors text-nosy-dim hover:text-nosy-fg"
                title={isCode ? "Voir le rendu" : "Voir le code"}
              >
                {isCode ? <Eye size={12} /> : <Code2 size={12} />}
              </button>
            )}

            <button
              onClick={onClose(path)}
              className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-nosy-hover transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}