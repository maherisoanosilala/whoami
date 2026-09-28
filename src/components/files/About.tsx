"use client";

import { motion, type Variants } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/lib/data";

/* Easing expo-out : rapide au début, très doux à la fin.
   C'est ce qui différencie une animation "pro" d'une animation "amateur". */
const EASE = [0.16, 1, 0.3, 1] as const;

/* Conteneur racine : orchestre le stagger entre les blocs principaux */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* Entrée d'un bloc : fade + slide + déblur.
   Le blur→net donne une impression de "mise au point", très premium. */
const item: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

/* Soulignement de "About" : se dessine de gauche à droite, légèrement après */
const underline: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.35 },
  },
};

/* Conteneur des lignes du <dl> : stagger plus serré que le parent */
const rowsWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

/* Chaque ligne du <dl> glisse depuis la gauche (comme un item de sidebar) */
const row: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const ROWS: [string, string, boolean?][] = [
  ["Nom", profile.name],
  ["Rôle", profile.role],
  ["Basé à", profile.location],
  ["Handle", profile.handle, true],
  ["Contextes", "Administration publique · Industrie · Agritech · E-commerce"],
];

export function About() {
  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl space-y-6 text-[14px] leading-relaxed"
    >
      {/* Titre avec soulignement animé */}
      <motion.h2
        variants={item}
        className="relative inline-block text-xl font-semibold tracking-tight text-nosy-fg"
      >
        About
        <motion.span
          variants={underline}
          className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left rounded-full bg-nosy-choc"
        />
      </motion.h2>

      {/* Bio */}
      <motion.div variants={item} className="space-y-4 text-nosy-soft">
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>

      {/* Tableau de faits : chaque ligne apparaît en cascade */}
      <motion.dl variants={rowsWrap} className="space-y-2 text-[13px]">
        {ROWS.map(([label, value, mono], i) => (
          <motion.div
            key={i}
            variants={row}
            className="grid grid-cols-[120px_1fr] gap-x-3"
          >
            <dt className="text-nosy-dim">{label}</dt>
            <dd className={mono ? "text-nosy-fg font-mono" : "text-nosy-fg"}>
              {value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Bouton CV : lift au survol, press au clic */}
      <motion.div variants={item} className="pt-2">
        <motion.a
          href="/Maherisoa.pdf"
          download
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="group inline-flex items-center gap-2 rounded-md border border-nosy-border px-3.5 py-2 text-[13px] text-nosy-soft transition-colors duration-200 hover:border-nosy-choc-up hover:bg-nosy-surface/60 hover:text-nosy-fg"
        >
          <Download
            size={14}
            strokeWidth={1.75}
            className="text-nosy-dim transition-colors group-hover:text-nosy-choc-up"
          />
          Télécharger mon CV
          <span className="font-mono text-[11px] text-nosy-dim">.pdf</span>
        </motion.a>
      </motion.div>
    </motion.article>
  );
}