export type ThemeMode = "dark" | "light";

export const whoamiTheme = {
  dark: {
    bgDeep: "var(--nosy-bg-deep)",
    bg: "var(--nosy-bg)",
    surface: "var(--nosy-surface)",
    hover: "var(--nosy-hover)",
    border: "var(--nosy-border)",
    fg: "var(--nosy-fg)",
    soft: "var(--nosy-fg-soft)",
    dim: "var(--nosy-fg-dim)",
    chocolate: "var(--nosy-chocolate)",
    chocolateUp: "var(--nosy-chocolate-up)",
    chocolateDn: "var(--nosy-chocolate-dn)",
  },
} as const;