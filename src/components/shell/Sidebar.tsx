"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import { TREE, hasContent, type TreeNode, type TreeFile } from "@/lib/tree";
import { useIDE } from "@/lib/store";
import clsx from "clsx";
import { fileIcon } from "@/lib/fileIcon";

export function Sidebar() {
  const pathname = usePathname();
  const idePath =
    pathname.replace(/^\//, "") || "src/app/whoami/about/page.tsx";

  return (
    <aside className="w-64 shrink-0 border-r border-nosy-border bg-nosy-surface flex flex-col overflow-y-auto">
      <div className="px-4 py-3 text-[11px] uppercase tracking-wider text-nosy-dim font-medium shrink-0">
        Explorateur
      </div>
      <div className="px-2 pb-4">
        <FolderRow folder={TREE} depth={0} activePath={idePath} />
      </div>
    </aside>
  );
}

function FolderRow({
  folder,
  depth,
  activePath,
}: {
  folder: TreeNode;
  depth: number;
  activePath: string;
}) {
  const { isFolderOpen, toggleFolder } = useIDE();

  if (folder.type === "file") return null;

  const open = isFolderOpen(folder.path);
  const isRoot = depth === 0;

  return (
    <div>
      <button
        onClick={() => toggleFolder(folder.path)}
        className="w-full flex items-center gap-1 px-2 py-0.5 text-[13px] text-nosy-soft hover:text-nosy-fg rounded transition-colors"
        style={{ paddingLeft: `${8 + depth * 10}px` }}
      >
        {open ? (
          <VscChevronDown size={14} className="text-nosy-dim shrink-0" />
        ) : (
          <VscChevronRight size={14} className="text-nosy-dim shrink-0" />
        )}
        {open ? (
          <VscFolderOpened size={14} className="text-nosy-choc-up shrink-0" />
        ) : (
          <VscFolder size={14} className="text-nosy-choc-up shrink-0" />
        )}
        <span
          className={clsx("truncate", isRoot && "font-medium text-nosy-fg")}
        >
          {folder.name}
        </span>
      </button>

      {open && (
        <div>
          {folder.children.map((child) => {
            if (child.type === "folder") {
              return (
                <FolderRow
                  key={child.path}
                  folder={child}
                  depth={depth + 1}
                  activePath={activePath}
                />
              );
            }
            return (
              <FileRow
                key={child.path}
                file={child}
                depth={depth + 1}
                activePath={activePath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function FileRow({
  file,
  depth,
  activePath,
}: {
  file: TreeFile;
  depth: number;
  activePath: string;
}) {
  const { Icon, color } = fileIcon(file.name, file.lang);
  const isActive = activePath === file.path;
  const enabled = hasContent(file);

  if (!enabled) {
    return (
      <div
        className="flex items-center gap-1.5 py-0.5 pr-2 rounded text-[13px] text-nosy-dim/50 cursor-not-allowed select-none"
        style={{ paddingLeft: `${8 + depth * 10}px` }}
        title="Fichier vide"
      >
        <Icon size={14} className="opacity-40 shrink-0" />
        <span className="truncate">{file.name}</span>
      </div>
    );
  }

  return (
    <Link
      href={`/${file.path}`}
      className={clsx(
        "flex items-center gap-1.5 py-0.5 pr-2 rounded text-[13px] transition-colors relative",
        isActive
          ? "bg-nosy-hover text-nosy-fg"
          : "text-nosy-soft hover:text-nosy-fg hover:bg-nosy-hover",
      )}
      style={{ paddingLeft: `${8 + depth * 10}px` }}
    >
      {isActive && (
        <span className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bg-nosy-choc" />
      )}
      <Icon size={14} className={clsx(color, "shrink-0")} />
      <span className="truncate">{file.name}</span>
    </Link>
  );
}
