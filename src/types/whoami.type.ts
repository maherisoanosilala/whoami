export interface Mission {
  id: string;
  title: string;
  context: string;
  role: string;
  decisions: string[];
  result: string;
  stack: string[];
  featured: boolean;
}
export interface StackGroup {
  label: string;
  icon: string;
  items: string[];
}

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