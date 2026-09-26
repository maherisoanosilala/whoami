import { profile } from "@/lib/data";
import { Download } from "lucide-react";

export function About() {
  return (
    <article className="max-w-2xl space-y-6 text-[14px] leading-relaxed">
      <h2 className="text-xl font-semibold tracking-tight text-nosy-fg">
        About
      </h2>

      <div className="space-y-4 text-nosy-soft">
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-[13px]">
        <dt className="text-nosy-dim">Nom</dt>
        <dd className="text-nosy-fg">{profile.name}</dd>

        <dt className="text-nosy-dim">Rôle</dt>
        <dd className="text-nosy-fg">{profile.role}</dd>

        <dt className="text-nosy-dim">Basé à</dt>
        <dd className="text-nosy-fg">{profile.location}</dd>

        <dt className="text-nosy-dim">Handle</dt>
        <dd className="text-nosy-fg font-mono">{profile.handle}</dd>

        <dt className="text-nosy-dim">Contextes</dt>
        <dd className="text-nosy-fg">
          Administration publique · Industrie · Agritech · E-commerce
        </dd>
      </dl>

      {/* Télécharger mon CV */}
      <div className="pt-2">
        <a
          href="/cv.pdf"
          download
          className="group inline-flex items-center gap-2 py-2 px-3.5 border border-nosy-border rounded-md text-[13px] text-nosy-soft transition-all duration-200 hover:border-nosy-choc-up hover:text-nosy-fg hover:bg-nosy-surface/60"
        >
          <Download
            size={14}
            strokeWidth={1.75}
            className="text-nosy-dim group-hover:text-nosy-choc-up transition-colors"
          />
          Télécharger mon CV
          <span className="text-nosy-dim font-mono text-[11px]">.pdf</span>
        </a>
      </div>
    </article>
  );
}