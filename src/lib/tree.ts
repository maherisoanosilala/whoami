export type TreeFile = {
  type: "file";
  name: string;
  path: string;
  slug?: string; // ← AJOUT : URL courte (ex: "about" → /about)
  lang: string;
  content: string;
  hasPreview?: boolean;
};

export type TreeFolder = {
  type: "folder";
  name: string;
  path: string;
  children: TreeNode[];
};

export type TreeNode = TreeFile | TreeFolder;

const EMPTY = ""; // fichiers "juste affichage" → désactivés

export const TREE: TreeFolder = {
  type: "folder",
  name: "whoami",
  path: "",
  children: [
    {
      type: "folder",
      name: ".vscode",
      path: ".vscode",
      children: [
        {
          type: "file",
          name: "settings.json",
          path: ".vscode/settings.json",
          lang: "json",
          content: EMPTY,
        },
      ],
    },
    {
      type: "folder",
      name: ".next",
      path: ".next",
      children: [
        {
          type: "file",
          name: "BUILD_ID",
          path: ".next/BUILD_ID",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "app-build-manifest.json",
          path: ".next/app-build-manifest.json",
          lang: "json",
          content: EMPTY,
        },
        {
          type: "file",
          name: "build-manifest.json",
          path: ".next/build-manifest.json",
          lang: "json",
          content: EMPTY,
        },
        {
          type: "file",
          name: "package.json",
          path: ".next/package.json",
          lang: "json",
          content: EMPTY,
        },
        {
          type: "file",
          name: "trace",
          path: ".next/trace",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "server",
          path: ".next/server",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "static",
          path: ".next/static",
          lang: "text",
          content: EMPTY,
        },
      ],
    },
    {
      type: "folder",
      name: "node_modules",
      path: "node_modules",
      children: [
        {
          type: "file",
          name: "next",
          path: "node_modules/next",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "react",
          path: "node_modules/react",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "react-dom",
          path: "node_modules/react-dom",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "typescript",
          path: "node_modules/typescript",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "tailwindcss",
          path: "node_modules/tailwindcss",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "zustand",
          path: "node_modules/zustand",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: "lucide-react",
          path: "node_modules/lucide-react",
          lang: "text",
          content: EMPTY,
        },
        {
          type: "file",
          name: ".bin",
          path: "node_modules/.bin",
          lang: "text",
          content: EMPTY,
        },
      ],
    },
    {
      type: "folder",
      name: "public",
      path: "public",
      children: [
        {
          type: "file",
          name: "favicon.ico",
          path: "public/favicon.ico",
          lang: "binary",
          content: EMPTY,
        },
        {
          type: "file",
          name: "og.png",
          path: "public/og.png",
          lang: "binary",
          content: EMPTY,
        },
      ],
    },
    {
      type: "folder",
      name: "src",
      path: "src",
      children: [
        {
          type: "folder",
          name: "app",
          path: "src/app",
          children: [
            {
              type: "file",
              name: "layout.tsx",
              path: "src/app/layout.tsx",
              lang: "tsx",
              content: EMPTY,
            },
            {
              type: "file",
              name: "page.tsx",
              path: "src/app/page.tsx",
              lang: "tsx",
              content: EMPTY,
            },
            {
              type: "file",
              name: "globals.css",
              path: "src/app/globals.css",
              lang: "css",
              content: EMPTY,
            },
            {
              type: "folder",
              name: "whoami",
              path: "src/app/whoami",
              children: [
                {
                  type: "folder",
                  name: "about",
                  path: "src/app/whoami/about",
                  children: [
                    {
                      type: "file",
                      name: "page.tsx",
                      path: "src/app/whoami/about/page.tsx",
                      slug: "about", // ← AJOUT
                      lang: "tsx",
                      hasPreview: true,
                      content: `import { About } from "@/components/content/About";

export default function Page() {
  return <About />;
}`,
                    },
                  ],
                },
                {
                  type: "folder",
                  name: "missions",
                  path: "src/app/whoami/missions",
                  children: [
                    {
                      type: "file",
                      name: "page.tsx",
                      path: "src/app/whoami/missions/page.tsx",
                      slug: "missions", // ← AJOUT
                      lang: "tsx",
                      hasPreview: true,
                      content: `import { Missions } from "@/components/content/Missions";

export default function Page() {
  return <Missions />;
}`,
                    },
                  ],
                },
                {
                  type: "folder",
                  name: "stack",
                  path: "src/app/whoami/stack",
                  children: [
                    {
                      type: "file",
                      name: "page.tsx",
                      path: "src/app/whoami/stack/page.tsx",
                      slug: "stack", // ← AJOUT
                      lang: "tsx",
                      hasPreview: true,
                      content: `import { Stack } from "@/components/content/Stack";

export default function Page() {
  return <Stack />;
}`,
                    },
                  ],
                },
                {
                  type: "folder",
                  name: "contact",
                  path: "src/app/whoami/contact",
                  children: [
                    {
                      type: "file",
                      name: "page.tsx",
                      path: "src/app/whoami/contact/page.tsx",
                      slug: "contact", // ← AJOUT
                      lang: "tsx",
                      hasPreview: true,
                      content: `import { Contact } from "@/components/content/Contact";

export default function Page() {
  return <Contact />;
}`,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "file",
      name: ".gitignore",
      path: ".gitignore",
      lang: "text",
      content: EMPTY,
    },
    {
      type: "file",
      name: "AGENTS.md",
      path: "AGENTS.md",
      lang: "markdown",
      content: EMPTY,
    },
    {
      type: "file",
      name: "CLAUDE.md",
      path: "CLAUDE.md",
      lang: "markdown",
      content: EMPTY,
    },
    {
      type: "file",
      name: "README.md",
      path: "README.md",
      slug: "", // ← AJOUT : racine /
      lang: "markdown",
      hasPreview: true,
      content: `# whoami

Portfolio-éditeur de **Lala Arthur RAZAFIARINOSY**.

Freelance Fullstack Next.js basé à Madagascar.
Je conçois et livre des produits web de bout en bout.

## Sommaire

- about/     Qui je suis
- missions/  Mes études de cas
- stack/     Mes outils
- contact/   Me joindre

## Stack

Next.js · React · TypeScript · Tailwind
Node.js · NestJS · MongoDB · Firebase
`,
    },
    {
      type: "file",
      name: "eslint.config.mjs",
      path: "eslint.config.mjs",
      lang: "js",
      content: EMPTY,
    },
    {
      type: "file",
      name: "next.config.ts",
      path: "next.config.ts",
      lang: "ts",
      content: EMPTY,
    },
    {
      type: "file",
      name: "package.json",
      path: "package.json",
      lang: "json",
      content: EMPTY,
    },
    {
      type: "file",
      name: "postcss.config.mjs",
      path: "postcss.config.mjs",
      lang: "js",
      content: EMPTY,
    },
    {
      type: "file",
      name: "tsconfig.json",
      path: "tsconfig.json",
      lang: "json",
      content: EMPTY,
    },
    {
      type: "file",
      name: "yarn.lock",
      path: "yarn.lock",
      lang: "text",
      content: EMPTY,
    },
  ],
};

// --- Utilitaires ---

export function flattenTree(node: TreeNode): TreeFile[] {
  if (node.type === "file") return [node];
  return node.children.flatMap(flattenTree);
}

export const ALL_FILES = flattenTree(TREE);

export const getFile = (path: string) => ALL_FILES.find((f) => f.path === path);

export const hasContent = (file: TreeFile) => file.content.trim() !== "";

// --- Résolution slug ↔ path (URLs propres) ---

export const SLUG_TO_PATH: Record<string, string> = {};
export const PATH_TO_SLUG: Record<string, string> = {};

for (const file of ALL_FILES) {
  if (file.slug !== undefined) {
    SLUG_TO_PATH[file.slug] = file.path;
    PATH_TO_SLUG[file.path] = file.slug;
  }
  // Backward compat : les anciens chemins restent accessibles
  SLUG_TO_PATH[file.path] = file.path;
}

/** Path interne → slug pour l'URL. Ex: "src/app/whoami/about/page.tsx" → "about" */
export function pathToSlug(path: string): string {
  return PATH_TO_SLUG[path] ?? path;
}

/** Slug d'URL → path interne. Ex: "about" → "src/app/whoami/about/page.tsx" */
export function slugToPath(slug: string): string | undefined {
  return SLUG_TO_PATH[slug];
}

/** Slug d'URL → fichier complet */
export function getFileBySlug(slug: string): TreeFile | undefined {
  const p = slugToPath(slug);
  return p ? getFile(p) : undefined;
}
