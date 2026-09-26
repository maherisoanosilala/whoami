import { STACK } from "@/data/stack";

export function Stack() {
  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-nosy-fg">
          Stack
        </h2>
        <p className="text-[13px] text-nosy-dim">
          Mes outils, du front au déploiement.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-6">
        {STACK.map((group) => (
          <div key={group.label} className="space-y-2.5">
            <h3 className="text-[11px] uppercase tracking-wider text-nosy-dim flex items-center gap-1.5">
              <span className="text-nosy-choc-up">{group.icon}</span>
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 text-[12px] rounded border border-nosy-border bg-nosy-surface text-nosy-soft hover:text-nosy-fg hover:border-nosy-choc-dn transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}