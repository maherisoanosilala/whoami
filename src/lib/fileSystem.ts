import type { LucideIcon } from "lucide-react";
import { FileText, FileCode2, Braces } from "lucide-react";

export type FileId =
  | "README.md"
  | "about.tsx"
  | "missions.tsx"
  | "stack.tsx"
  | "contact.tsx";

export type FileNode = {
  id: FileId;
  name: string;
  lang: string;
  icon: LucideIcon;
  iconColor?: string;
};

export const files: FileNode[] = [
  { id: "README.md",    name: "README.md",    lang: "Markdown",   icon: FileText  },
  { id: "about.tsx",    name: "about.tsx",    lang: "TypeScript", icon: FileCode2, iconColor: "text-nosy-choc-up" },
  { id: "missions.tsx", name: "missions.tsx", lang: "TypeScript", icon: FileCode2, iconColor: "text-nosy-choc-up" },
  { id: "stack.tsx",    name: "stack.tsx",    lang: "TypeScript", icon: FileCode2, iconColor: "text-nosy-choc-up" },
  { id: "contact.tsx",  name: "contact.tsx",  lang: "TypeScript", icon: FileCode2, iconColor: "text-nosy-choc-up" },
];

export const folder = { name: "whoami", icon: Braces };

export const getFile = (id: FileId) => files.find((f) => f.id === id)!;