import { IdeShell } from "@/components/shell/IdeShell";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IdeShell>{children}</IdeShell>;
}