"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { container, item, EASE } from "@/lib/motion";

export function Readme() {
  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl space-y-8 text-[14px] leading-relaxed text-nosy-soft"
    >
      <motion.div variants={item}>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-nosy-fg">
          # {profile.name}
        </h1>
        <p className="text-nosy-dim">{profile.tagline}</p>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>

      {/* Bloc terminal — signature whoami */}
      <motion.div
        variants={item}
        className="rounded-md border border-nosy-border bg-nosy-surface p-4 font-mono text-[13px]"
      >
        <TerminalLine prefix="$ " command="whoami" delay={0.6} />
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 1.3 }}
          className="mt-1 text-nosy-fg"
        >
          {profile.name}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 1.5 }}
          className="text-nosy-soft"
        >
          {profile.role} · {profile.location}
        </motion.div>
      </motion.div>

      <motion.p variants={item} className="text-nosy-dim text-[13px]">
        → Ouvre <span className="text-nosy-choc-up">about/page.tsx</span>,{" "}
        <span className="text-nosy-choc-up">missions/page.tsx</span>,{" "}
        <span className="text-nosy-choc-up">stack/page.tsx</span> ou{" "}
        <span className="text-nosy-choc-up">contact/page.tsx</span>.
      </motion.p>
    </motion.article>
  );
}

/* Effet "typing" sur une ligne de commande */
function TerminalLine({
  prefix,
  command,
  delay = 0,
}: {
  prefix: string;
  command: string;
  delay?: number;
}) {
  return (
    <div className="flex items-center">
      <span className="text-nosy-dim">{prefix}</span>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ duration: command.length * 0.06, ease: "linear", delay }}
        className="overflow-hidden whitespace-nowrap text-nosy-fg"
      >
        {command}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
        transition={{
          duration: 0.6,
          delay: delay + command.length * 0.06,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        className="ml-1 inline-block h-4 w-[7px] bg-nosy-choc-up"
      />
    </div>
  );
}