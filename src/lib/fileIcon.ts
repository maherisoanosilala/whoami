import { BiLogoTypescript } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import {
  VscFile,
  VscFileMedia,
  VscJson,
  VscMarkdown,
  VscSettingsGear,
  VscSymbolColor,
} from "react-icons/vsc";

export function fileIcon(name: string, lang: string) {
  if (lang === "tsx" )
    return { Icon: FaReact, color: "text-nosy-fg" };
   if (lang === "ts")
    return { Icon: BiLogoTypescript, color: "text-nosy-fg" };
  if (lang === "json") return { Icon: VscJson, color: "text-nosy-soft" };
  if (lang === "css") return { Icon: VscSymbolColor, color: "text-nosy-soft" };
  if (lang === "markdown")
    return { Icon: VscMarkdown, color: "text-nosy-soft" };
  if (lang === "binary") return { Icon: VscFileMedia, color: "text-nosy-dim" };
  if (name.includes("config") || name.startsWith("."))
    return { Icon: VscSettingsGear, color: "text-nosy-dim" };
  return { Icon: VscFile, color: "text-nosy-soft" };
}
