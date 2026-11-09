import type { Metadata } from "next";
import CVContent from "./CVContent";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `${profile.shortName} — ${profile.role}`,
  description: `${profile.tagline} Basé à ${profile.location}.`,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "profile",
  },
};

export default function CVPage() {
  return <CVContent />;
}