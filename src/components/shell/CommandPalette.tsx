"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Sun, Moon, Home, Search } from "lucide-react";
import { ALL_FILES } from "@/lib/tree";
import { useIDE } from "@/lib/store";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { openTab, theme, toggleTheme } = useIDE();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    setTimeout(fn, 80);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-[2px]"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-4 rounded-lg border border-nosy-border bg-nosy-surface shadow-2xl overflow-hidden animate-in"
      >
        <Command
          label="Command Palette"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-nosy-dim"
        >
          <div className="flex items-center gap-2 px-4 border-b border-nosy-border">
            <Search size={14} className="text-nosy-dim shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Cherche un fichier…"
              className="w-full bg-transparent py-3 text-[13px] text-nosy-fg placeholder:text-nosy-dim outline-none"
            />
            <kbd className="text-[10px] font-mono text-nosy-dim border border-nosy-border rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[340px] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-[13px] text-nosy-dim">
              Aucun résultat.
            </Command.Empty>

            <Command.Group heading="Fichiers">
              {ALL_FILES.map((file) => (
                <Command.Item
                  key={file.path}
                  onSelect={() =>
                    run(() => {
                      openTab(file.path);
                      router.push(`/${file.path}`);
                    })
                  }
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-nosy-soft cursor-pointer data-[selected=true]:bg-nosy-hover data-[selected=true]:text-nosy-fg"
                >
                  <span>{file.name}</span>
                  <span className="ml-auto text-[11px] font-mono text-nosy-dim">
                    {file.path}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions">
              <Command.Item
                onSelect={() => run(() => toggleTheme())}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-nosy-soft cursor-pointer data-[selected=true]:bg-nosy-hover data-[selected=true]:text-nosy-fg"
              >
                {theme === "dark" ? (
                  <Sun size={14} className="text-nosy-choc-up" />
                ) : (
                  <Moon size={14} className="text-nosy-choc-up" />
                )}
                <span>
                  {theme === "dark"
                    ? "Passer en thème clair"
                    : "Passer en thème sombre"}
                </span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigation">
              <Command.Item
                onSelect={() => run(() => router.push("/"))}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-nosy-soft cursor-pointer data-[selected=true]:bg-nosy-hover data-[selected=true]:text-nosy-fg"
              >
                <Home size={14} className="text-nosy-choc-up" />
                <span>Accueil de l&apos;IDE</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}