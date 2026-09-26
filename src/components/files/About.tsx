import { profile } from "@/lib/data";


export function About() {
  return (
    <article className="max-w-2xl space-y-6 text-[14px] leading-relaxed">
      <h2 className="text-xl font-semibold tracking-tight text-nosy-fg">About</h2>

      <div className="space-y-4 text-nosy-soft">
        {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
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
    </article>
  );
}