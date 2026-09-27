"use client";

import { motion } from "framer-motion";
import { STACK } from "@/data/stack";
import { container, item, cascade, badge, EASE } from "@/lib/motion";

export function Stack() {
  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl space-y-8"
    >
      <motion.header variants={item} className="space-y-1">
        <h2 className="relative inline-block text-xl font-semibold tracking-tight text-nosy-fg">
          Stack
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-nosy-choc"
          />
        </h2>
        <p className="text-[13px] text-nosy-dim">
          Mes outils, du front au déploiement.
        </p>
      </motion.header>

      <motion.div
        variants={cascade(0.09, 0.15)}
        className="grid gap-6 sm:grid-cols-2"
      >
        {STACK.map((group) => (
          <motion.div
            key={group.label}
            variants={item}
            className="space-y-2.5"
          >
            <h3 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-nosy-dim">
              <motion.span
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                className="inline-block text-nosy-choc-up"
              >
                {group.icon}
              </motion.span>
              {group.label}
            </h3>

            <motion.div
              variants={cascade(0.035, 0.1)}
              className="flex flex-wrap gap-1.5"
            >
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  variants={badge}
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="cursor-default rounded border border-nosy-border bg-nosy-surface px-2 py-1 text-[12px] text-nosy-soft transition-colors hover:border-nosy-choc-dn hover:text-nosy-fg"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.article>
  );
}