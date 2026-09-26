import { MISSIONS } from "@/data/missions";
import clsx from "clsx";

export function Missions() {
  const featured = MISSIONS.filter((m) => m.featured);
  const others = MISSIONS.filter((m) => !m.featured);

  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-nosy-fg">
          Missions
        </h2>
        <p className="text-[13px] text-nosy-dim">
          {MISSIONS.length} études de cas · du cadrage au déploiement.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-[11px] uppercase tracking-wider text-nosy-dim">
          Mises en avant
        </h3>
        {featured.map((m) => (
          <MissionCard key={m.id} mission={m} featured />
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-[11px] uppercase tracking-wider text-nosy-dim">
          Autres missions
        </h3>
        <div className="grid gap-3">
          {others.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      </section>
    </article>
  );
}

function MissionCard({
  mission: m,
  featured = false,
}: {
  mission: (typeof import("@/data/missions"))["MISSIONS"][number];
  featured?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-md border bg-nosy-surface p-5 transition-colors",
        featured
          ? "border-nosy-border hover:border-nosy-choc-dn"
          : "border-nosy-border hover:border-nosy-choc-dn"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h4 className="text-[15px] font-medium text-nosy-fg leading-snug">
          {m.title}
        </h4>
        {featured && (
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-nosy-choc-up border border-nosy-choc-dn rounded px-1.5 py-0.5">
            ◆ Featured
          </span>
        )}
      </div>

      <p className="text-[12px] text-nosy-dim mb-3">{m.context}</p>

      <p className="text-[12px] text-nosy-soft mb-3 font-mono">{m.role}</p>

      <ul className="space-y-1.5 mb-4">
        {m.decisions.map((d, i) => (
          <li key={i} className="flex gap-2 text-[13px] text-nosy-soft">
            <span className="text-nosy-choc-up shrink-0 mt-[3px]">▸</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className="pt-3 border-t border-nosy-border space-y-3">
        <p className="text-[12.5px] text-nosy-fg">
          <span className="text-nosy-dim">Résultat · </span>
          {m.result}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {m.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] font-mono text-nosy-dim border border-nosy-border rounded px-1.5 py-0.5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}