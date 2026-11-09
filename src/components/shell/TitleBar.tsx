// components/ide/TitleBar.tsx
"use client";

import { useIDE } from "@/lib/store";

export function TitleBar() {
  // Adapte le nom de l'action selon ton store (togglePalette / setPaletteOpen / openPalette…)
  const openPalette = useIDE(
    (s) =>
      (s as any).togglePalette ??
      (s as any).setPaletteOpen ??
      (s as any).openPalette,
  ) as (() => void) | undefined;

  return (
    <header className="h-9 shrink-0 flex items-center justify-between gap-4 px-3 bg-nosy-bg border-b border-nosy-border text-xs select-none">
      {/* Marque + menus */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-sm bg-nosy-fg" />
          <span className="font-semibold text-nosy-fg tracking-tight">
            Nosy
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-3 text-nosy-fg/60">
          {["Fichier", "Édition", "Affichage", "Aller", "Terminal", "Aide"].map(
            (m) => (
              <button key={m} className="hover:text-nosy-fg transition-colors">
                {m}
              </button>
            ),
          )}
        </nav>
      </div>

      {/* Command center */}
      <button
        onClick={() => openPalette?.()}
        className="hidden sm:flex items-center gap-2 px-3 py-0.5 rounded-md bg-nosy-fg/5 border border-nosy-border text-nosy-fg/60 hover:text-nosy-fg hover:bg-nosy-fg/10 transition-colors text-[11px]"
      >
        <span>Rechercher…</span>
        <kbd className="px-1 rounded bg-nosy-fg/10 text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Contrôles de fenêtre (décoratifs, style macOS) */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
      </div>
    </header>
  );
}
