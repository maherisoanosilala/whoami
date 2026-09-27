"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { MISSIONS } from "@/data/missions";
import { container, item, card, badge, cascade, slideInLeft, EASE } from "@/lib/motion";

export function Missions() {
  const featured = MISSIONS.filter((m) => m.featured);
  const others = MISSIONS.filter((m) => !m.featured);

  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl space-y-8"
    >
      <motion.header variants={item} className="space-y-1">
        <h2 className="relative inline-block text-xl font-semibold tracking-tight text-nosy-fg">
          Missions
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-nosy-choc"
          />
        </h2>
        <p className="text-[13px] text-nosy-dim">
          {MISSIONS.length} études de cas · du cadrage au déploiement.
        </p>
      </motion.header>

      <motion.section variants={item} className="space-y-4">
        <h3 className="text-[11px] uppercase tracking-wider text-nosy-dim">
          Mises en avant
        </h3>
        <motion.div variants={cascade(0.12, 0.15)} className="space-y-4">
          {featured.map((m) => (
            <MissionCard key={m.id} mission={m} featured />
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={item} className="space-y-3">
        <h3 className="text-[11px] uppercase tracking-wider text-nosy-dim">
          Autres missions
        </h3>
        <motion.div variants={cascade(0.08, 0.15)} className="grid gap-3">
          {others.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </motion.div>
      </motion.section>
    </motion.article>
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
    <motion.div
      variants={card}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={clsx(
        "rounded-md border border-nosy-border bg-nosy-surface p-5 transition-colors hover:border-nosy-choc-dn"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h4 className="text-[15px] font-medium text-nosy-fg leading-snug">
          {m.title}
        </h4>
        {featured && (
          <motion.span
            variants={badge}
            className="shrink-0 text-[10px] uppercase tracking-wider text-nosy-choc-up border border-nosy-choc-dn rounded px-1.5 py-0.5"
          >
            ◆ Featured
          </motion.span>
        )}
      </div>

      <p className="text-[12px] text-nosy-dim mb-3">{m.context}</p>
      <p className="text-[12px] text-nosy-soft mb-3 font-mono">{m.role}</p>

      <motion.ul variants={cascade(0.05, 0.1)} className="space-y-1.5 mb-4">
        {m.decisions.map((d, i) => (
          <motion.li
            key={i}
            variants={slideInLeft}
            className="flex gap-2 text-[13px] text-nosy-soft"
          >
            <span className="text-nosy-choc-up shrink-0 mt-[3px]">▸</span>
            <span>{d}</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="pt-3 border-t border-nosy-border space-y-3">
        <p className="text-[12.5px] text-nosy-fg">
          <span className="text-nosy-dim">Résultat · </span>
          {m.result}
        </p>
        <motion.div variants={cascade(0.03, 0.05)} className="flex flex-wrap gap-1.5">
          {m.stack.map((s) => (
            <motion.span
              key={s}
              variants={badge}
              className="text-[11px] font-mono text-nosy-dim border border-nosy-border rounded px-1.5 py-0.5"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}