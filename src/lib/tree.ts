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
        { type: "file", name: "settings.json", path: ".vscode/settings.json", lang: "json", content: EMPTY },
      ],
    },
    {
      type: "folder",
      name: "public",
      path: "public",
      children: [
        { type: "file", name: "favicon.ico", path: "public/favicon.ico", lang: "binary", content: EMPTY },
        { type: "file", name: "og.png",      path: "public/og.png",      lang: "binary", content: EMPTY },
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
              content: EMPTY
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
              content:EMPTY
            },
            {
              type: "folder",
              name: "whoami",
              path: "src/app/whoami",
              children: [
                {
                  type: "file",
                  name: "about.tsx",
                  path: "src/app/whoami/about.tsx",
                  lang: "tsx",
                  hasPreview: true,
                  content: `import { profile } from "@/data/profile";

export function About() {
  return (
    <article className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold">About</h2>
      <div className="space-y-4">
        {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <dl className="grid grid-cols-[120px_1fr] gap-y-2">
        <dt>Nom</dt><dd>{profile.name}</dd>
        <dt>Rôle</dt><dd>{profile.role}</dd>
        <dt>Basé à</dt><dd>{profile.location}</dd>
      </dl>
    </article>
  );
}`,
                },
                {
                  type: "file",
                  name: "missions.tsx",
                  path: "src/app/whoami/missions.tsx",
                  lang: "tsx",
                  hasPreview: true,
                  content: `import { MISSIONS } from "@/data/missions";

export function Missions() {
  const featured = MISSIONS.filter((m) => m.featured);
  const others   = MISSIONS.filter((m) => !m.featured);

  return (
    <article className="max-w-3xl space-y-8">
      <h2 className="text-xl font-semibold">Missions</h2>
      <section>
        <h3>Mises en avant</h3>
        {featured.map((m) => <MissionCard key={m.id} mission={m} />)}
      </section>
      <section>
        <h3>Autres missions</h3>
        {others.map((m) => <MissionCard key={m.id} mission={m} />)}
      </section>
    </article>
  );
}`,
                },
                {
                  type: "file",
                  name: "stack.tsx",
                  path: "src/app/whoami/stack.tsx",
                  lang: "tsx",
                  hasPreview: true,
                  content: `import { STACK } from "@/data/stack";

export function Stack() {
  return (
    <article className="max-w-3xl space-y-8">
      <h2 className="text-xl font-semibold">Stack</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {STACK.map((group) => (
          <div key={group.label}>
            <h3>{group.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}`,
                },
                {
                  type: "file",
                  name: "contact.tsx",
                  path: "src/app/whoami/contact.tsx",
                  lang: "tsx",
                  hasPreview: true,
                  content: `import { profile } from "@/data/profile";

export function Contact() {
  const { email, github, linkedin, whatsapp } = profile.contact;

  return (
    <article className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold">Contact</h2>
      <div className="grid gap-2">
        <a href={\`mailto:\${email}\`}>{email}</a>
        <a href={whatsapp}>WhatsApp</a>
        <a href={github}>GitHub</a>
        <a href={linkedin}>LinkedIn</a>
      </div>
    </article>
  );
}`,
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

export const getFile = (path: string) => ALL_FILES.find((f) => f.path === path);

// True si le fichier a du contenu à afficher
export const hasContent = (file: TreeFile) =>
  file.content !== "" || file.lang === "binary";