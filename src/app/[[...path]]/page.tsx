
import { notFound } from "next/navigation";
import { getFile } from "@/lib/tree";
import { PreviewRenderer } from "@/components/content/PreviewRenderer";

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
    <div className="font-mono">
      <PreviewRenderer file={file} />
    </div>
  );
}