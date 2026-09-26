"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X, Code2, Eye } from "lucide-react";
import { useState } from "react";
import {
  VscFile,
  VscFileCode,
  VscFileMedia,
  VscJson,
  VscMarkdown,
  VscSettingsGear,
  VscSymbolColor,
} from "react-icons/vsc";
import { getFile } from "@/lib/tree";
import { useIDE } from "@/lib/store";
import clsx from "clsx";

function fileIcon(name: string, lang: string) {
  if (lang === "tsx" || lang === "ts")
    return { Icon: VscFileCode, color: "text-nosy-fg" };
  if (lang === "json")
    return { Icon: VscJson, color: "text-nosy-soft" };
  if (lang === "css")
    return { Icon: VscSymbolColor, color: "text-nosy-soft" };
  if (lang === "markdown")
    return { Icon: VscMarkdown, color: "text-nosy-soft" };
  if (lang === "binary")
    return { Icon: VscFileMedia, color: "text-nosy-dim" };
  if (name.includes("config") || name.startsWith("."))
    return { Icon: VscSettingsGear, color: "text-nosy-dim" };
  return { Icon: VscFile, color: "text-nosy-soft" };
}

export function Tabs() {
  const { openTabs, closeTab } = useIDE();
  const pathname = usePathname();
  const router = useRouter();

  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const activePath = pathname.replace(/^\//, "") || "src/app/whoami/about.tsx";

  const onClose = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeTab(path);
    if (activePath === path) router.push("/");
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

            <Link href={`/${path}`} className="flex items-center gap-2">
              <Icon size={14} className={clsx(color, "shrink-0")} />
              <span>{file.name}</span>
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