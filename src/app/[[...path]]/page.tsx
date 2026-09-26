import { notFound } from "next/navigation";
import { getFile } from "@/lib/tree";
import { PreviewRenderer } from "@/components/content/PreviewRenderer";
import { IdeShell } from "@/components/shell/IdeShell";

export default async function FilePage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const filePath = path?.join("/") ?? "README.md";
  const file = getFile(filePath);

  if (!file) notFound();

  return (
    <IdeShell>
      <div className="font-[family-name:var(--font-mono)]">
        <PreviewRenderer file={file} />
      </div>
    </IdeShell>
  );
}