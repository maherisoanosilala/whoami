export type TreeFile = {
  type: "file";
  name: string;
  path: string;
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
    { type: "file", name: ".gitignore",         path: ".gitignore",         lang: "text",     content: EMPTY },
    { type: "file", name: "AGENTS.md",          path: "AGENTS.md",          lang: "markdown", content: EMPTY },
    { type: "file", name: "CLAUDE.md",          path: "CLAUDE.md",          lang: "markdown", content: EMPTY },
    { type: "file", name: "README.md",          path: "README.md",          lang: "markdown", content: EMPTY },
    { type: "file", name: "eslint.config.mjs",  path: "eslint.config.mjs",  lang: "js",       content: EMPTY },
    { type: "file", name: "next.config.ts",     path: "next.config.ts",     lang: "ts",       content: EMPTY },
    { type: "file", name: "package.json",       path: "package.json",       lang: "json",     content: EMPTY },
    { type: "file", name: "postcss.config.mjs", path: "postcss.config.mjs", lang: "js",       content: EMPTY },
    { type: "file", name: "tsconfig.json",      path: "tsconfig.json",      lang: "json",     content: EMPTY },
    { type: "file", name: "yarn.lock",          path: "yarn.lock",          lang: "text",     content: EMPTY },
  ],
};

// --- Utilitaires ---

export function flattenTree(node: TreeNode): TreeFile[] {
  if (node.type === "file") return [node];
  return node.children.flatMap(flattenTree);
}

export const ALL_FILES = flattenTree(TREE);

export const getFile = (path: string) =>
  ALL_FILES.find((f) => f.path === path);

export const hasContent = (file: TreeFile) => file.content.trim() !== "";