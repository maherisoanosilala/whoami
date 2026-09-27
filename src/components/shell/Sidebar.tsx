"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import {
  TREE,
  hasContent,
  pathToSlug,
  slugToPath,
} from "@/lib/tree";
import clsx from "clsx";
import { fileIcon } from "@/lib/fileIcon";
import { TreeFile, TreeNode } from "@/lib/whoami";

// --- Store externe pour sessionStorage ---

const PREFIX = "whoami:folder:";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function readFolderState(path: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const v = sessionStorage.getItem(PREFIX + path);
    if (v === null) return fallback;
    return v === "1";
  } catch {
    return fallback;
  }
}

function writeFolderState(path: string, value: boolean) {
  try {
    sessionStorage.setItem(PREFIX + path, value ? "1" : "0");
    emit();
  } catch {}
}

function useFolderState(path: string, fallback: boolean) {
  const getSnapshot = useCallback(
    () => readFolderState(path, fallback),
    [path, fallback]
  );

  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: boolean) => writeFolderState(path, next),
    [path]
  );

  return [value, setValue] as const;
}

// --- Sidebar ---

export function Sidebar() {
  const pathname = usePathname();
  const slug = pathname.replace(/^\//, "");
  const idePath = slugToPath(slug) ?? "README.md";

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

// --- Dossier récursif ---

function FolderRow({
  folder,
  depth,
  activePath,
}: {
  folder: TreeNode;
  depth: number;
  activePath: string;
}) {
  if (folder.type === "file") return null;

  const isRoot = depth === 0;
  const defaultOpen = !(
    folder.path === ".vscode" ||
    folder.path === "public" ||
    folder.path === "node_modules"
  );

  const [open, setOpen] = useFolderState(folder.path, defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
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
        <span className={clsx("truncate", isRoot && "font-medium text-nosy-fg")}>
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

// --- Fichier ---

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
      href={`/${pathToSlug(file.path)}`}
      className={clsx(
        "flex items-center gap-1.5 py-0.5 pr-2 rounded text-[13px] transition-colors relative",
        isActive
          ? "bg-nosy-hover text-nosy-fg"
          : "text-nosy-soft hover:text-nosy-fg hover:bg-nosy-hover"
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