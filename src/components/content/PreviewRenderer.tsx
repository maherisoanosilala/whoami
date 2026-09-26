"use client";

import { useEffect, useState } from "react";
import type { TreeFile } from "@/lib/tree";
import { CodeViewer } from "./CodeViewer";
import { About } from "../files/About";
import { Missions } from "../files/Missions";
import { Stack } from "../files/Stack";
import { Contact } from "../files/Contact";
import { Readme } from "../files/Readme";


const PREVIEWS: Record<string, () => React.ReactElement> = {
  "src/app/whoami/about.tsx": About,
  "src/app/whoami/missions.tsx": Missions,
  "src/app/whoami/stack.tsx": Stack,
  "src/app/whoami/contact.tsx": Contact,
  "README.md": Readme,
};

export function PreviewRenderer({ file }: { file: TreeFile }) {
  const Preview = PREVIEWS[file.path];
  const hasPreview = !!Preview;

  // ⚡ Par défaut : mode "rendu" pour les fichiers qui ont un aperçu
  const [showCode, setShowCode] = useState(!hasPreview);

  useEffect(() => {
    setShowCode(!hasPreview);
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.path === file.path) setShowCode(detail.showCode);
    };
    window.addEventListener("whoami:preview", handler);
    return () => window.removeEventListener("whoami:preview", handler);
  }, [file.path, hasPreview]);

  // Mode code (sur demande)
  if (showCode) {
    if (file.lang === "binary") {
      return (
        <div className="text-nosy-dim text-[13px] py-10 text-center">
          Fichier binaire — pas d&apos;aperçu disponible.
        </div>
      );
    }
    return <CodeViewer code={file.content} lang={file.lang} />;
  }

  // Mode rendu (par défaut pour les fichiers avec preview)
  if (!Preview) {
    return <CodeViewer code={file.content} lang={file.lang} />;
  }

  return (
    <div className="font-[family-name:var(--font-inter)] text-[14px] leading-relaxed">
      <Preview />
    </div>
  );
}