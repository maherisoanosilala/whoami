import type { FileId } from "@/lib/fileSystem";
import { Readme } from "./Readme";
import { About } from "./About";
import { Missions } from "./Missions";
import { Stack } from "./Stack";
import { Contact } from "./Contact";

export const fileRegistry: Record<FileId, () => React.ReactElement> = {
  "README.md":    Readme,
  "about.tsx":    About,
  "missions.tsx": Missions,
  "stack.tsx":    Stack,
  "contact.tsx":  Contact,
};