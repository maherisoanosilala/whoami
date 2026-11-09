"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useIDE } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1] as const;

export function TitleBar() {
  const openPalette = useIDE(
    (s) =>
      (s as any).togglePalette ??
      (s as any).setPaletteOpen ??
      (s as any).openPalette
  ) as (() => void) | undefined;

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <header className="h-9 shrink-0 flex items-center justify-between gap-4 px-3 bg-nosy-bg border-b border-nosy-border text-xs select-none">
      {/* Marque + menus */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-sm bg-nosy-fg" />
          <span className="font-semibold text-nosy-fg tracking-tight">Nosy</span>
        </div>
        <nav className="hidden md:flex items-center gap-3 text-nosy-fg/60">
          {["Fichier", "Édition", "Affichage", "Aller", "Terminal", "Aide"].map((m) => (
            <button key={m} className="hover:text-nosy-fg transition-colors">
              {m}
            </button>
          ))}
        </nav>
      </div>

      {/* Command center */}
      <button
        onClick={() => openPalette?.()}
        className="hidden sm:flex items-center gap-2 px-3 py-0.5 rounded-md bg-nosy-fg/5 border border-nosy-border text-nosy-fg/60 hover:text-nosy-fg hover:bg-nosy-fg/10 transition-colors text-[11px]"
      >
        <span>Rechercher…</span>
        <kbd className="px-1 rounded bg-nosy-fg/10 text-[10px] font-mono">⌘K</kbd>
      </button>

      {/* ============ CONTRÔLES DE FENÊTRE — FONCTIONNELS ============ */}
      <div className="flex items-center gap-0.5 shrink-0">
        {/* 🔴 FERMER L'IDE → /cv */}
        <Link
          href="/cv"
          aria-label="Fermer l'IDE et voir le CV classique"
          title="Fermer l'IDE — Voir le CV classique"
          className="group relative flex items-center justify-center w-[18px] h-[18px] rounded-full"
        >
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-red-500/70 flex items-center justify-center overflow-hidden"
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgb(239 68 68)",
              boxShadow: "0 0 8px rgba(239,68,68,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            {/* Symbole × au hover, comme macOS */}
            <span className="text-[7px] leading-none text-red-950 font-black opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              ×
            </span>
          </motion.span>
        </Link>

        {/* 🟡 THÈME (à brancher sur ton store) */}
        <button
          type="button"
          onClick={() => {
            // ⚠️ Remplace par ton action de thème existante
            // ex: useIDE.getState().toggleTheme?.()
            const root = document.documentElement;
            const isLight = root.getAttribute("data-theme") === "light";
            root.setAttribute("data-theme", isLight ? "" : "light");
            try {
              localStorage.setItem("theme", isLight ? "dark" : "light");
            } catch {}
          }}
          aria-label="Basculer le thème clair/sombre"
          title="Basculer le thème"
          className="group relative flex items-center justify-center w-[18px] h-[18px] rounded-full"
        >
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 flex items-center justify-center overflow-hidden"
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgb(234 179 8)",
              boxShadow: "0 0 8px rgba(234,179,8,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            <span className="text-[8px] leading-none text-yellow-950 font-black opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              −
            </span>
          </motion.span>
        </button>

        {/* 🟢 PLEIN ÉCRAN */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Passer en plein écran"
          title="Plein écran"
          className="group relative flex items-center justify-center w-[18px] h-[18px] rounded-full"
        >
          <motion.span
            className="w-2.5 h-2.5 rounded-full bg-green-500/70 flex items-center justify-center overflow-hidden"
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgb(34 197 94)",
              boxShadow: "0 0 8px rgba(34,197,94,0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            <span className="text-[7px] leading-none text-green-950 font-black opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              +
            </span>
          </motion.span>
        </button>
      </div>
    </header>
  );
}