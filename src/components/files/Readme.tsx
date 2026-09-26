import { profile } from "@/lib/data";


export function Readme() {
  return (
    <article className="max-w-2xl space-y-8 text-[14px] leading-relaxed text-nosy-soft">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-nosy-fg mb-1">
          # {profile.name}
        </h1>
        <p className="text-nosy-dim">{profile.tagline}</p>
      </div>

      <div className="space-y-3">
        {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="rounded-md border border-nosy-border bg-nosy-surface p-4 font-mono text-[13px]">
        <div className="text-nosy-dim">$ whoami</div>
        <div className="text-nosy-fg mt-1">{profile.name}</div>
        <div className="text-nosy-soft">{profile.role} · {profile.location}</div>
      </div>

      <p className="text-nosy-dim text-[13px]">
        → Ouvre <span className="text-nosy-choc-up">about.tsx</span>,{" "}
        <span className="text-nosy-choc-up">missions.tsx</span>,{" "}
        <span className="text-nosy-choc-up">stack.tsx</span> ou{" "}
        <span className="text-nosy-choc-up">contact.tsx</span>.
      </p>
    </article>
  );
}