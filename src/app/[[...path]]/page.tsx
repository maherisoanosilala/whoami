import { notFound } from "next/navigation";
import { getFileBySlug } from "@/lib/tree";
import { PreviewRenderer } from "@/components/content/PreviewRenderer";

export default async function FilePage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const slug = path?.join("/") ?? "";
  const file = getFileBySlug(slug);

  if (!file) notFound();

  return (
    <div className="font-mono">
      <PreviewRenderer file={file} />
    </div>
  );
}