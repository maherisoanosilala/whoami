"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, House, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { MISSIONS } from "@/data/missions";
import { STACK } from "@/data/stack";
import type { Mission } from "@/types/whoami.type";

import { EASE, container, item, slideInLeft, cascade } from "@/lib/motion";

const EMAIL = profile.contact.email.trim();

export default function CVContent() {
  return (
    <div className="min-h-screen bg-nosy-bg text-nosy-fg">
      {/* ============ HEADER ============ */}
      <motion.header
        variants={slideInLeft}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-40 backdrop-blur bg-nosy-bg/80 border-b border-nosy-border"
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight text-nosy-soft">
            CV · {profile.shortName}
          </span>
          <Link
            href="/"
            className="text-xs px-3 py-1.5  flex items-center gap-2 rounded border border-nosy-border text-nosy-soft hover:text-nosy-fg hover:bg-nosy-hover transition-colors"
          >
            <House size={14} /> Mode IDE →
          </Link> 
        </div>
      </motion.header>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto px-6 pb-16"
      >
        {/* ---------- Hero ---------- */}
        <motion.section
          variants={cascade(0.08, 0.1)}
          className="pt-16 pb-12 border-b border-nosy-border"
        >
          <motion.p variants={item} className="text-xs uppercase tracking-widest text-nosy-dim mb-3">
            {profile.location} · {profile.role}
          </motion.p>
          <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="text-lg text-nosy-soft mb-8 max-w-xl">
            {profile.tagline}
          </motion.p>

          <motion.div variants={cascade(0.05, 0.15)} className="flex flex-wrap gap-2">
            <motion.a
              variants={item}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-nosy-choc text-white text-sm font-medium hover:bg-nosy-choc-up transition-colors"
            >
              < Mail size={14}/>   Me contacter
            </motion.a>
            <motion.a
              variants={item}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-nosy-border text-sm text-nosy-soft hover:text-nosy-fg hover:bg-nosy-hover transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              variants={item}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-nosy-border text-sm text-nosy-soft hover:text-nosy-fg hover:bg-nosy-hover transition-colors"
            >
              GitHub
            </motion.a>
          </motion.div>

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
        </motion.section>

        {/* ---------- Bio ---------- */}
        <motion.section variants={cascade(0.06, 0.1)} className="py-12 border-b border-nosy-border">
          <motion.h2 variants={item} className="text-xs uppercase tracking-widest text-nosy-dim mb-6">
            À propos
          </motion.h2>
          <div className="space-y-3 text-nosy-soft leading-relaxed">
            {profile.bio.map((line, i) => (
              <motion.p key={i} variants={item}>
                {line}
              </motion.p>
            ))}
          </div>
        </motion.section>

        {/* ---------- TIMELINE ---------- */}
        <motion.section variants={item} className="py-12 border-b border-nosy-border">
          <motion.h2 variants={item} className="text-xs uppercase tracking-widest text-nosy-dim mb-8">
            Parcours & Missions
          </motion.h2>

          <div className="relative">
            {/* Ligne verticale — se dessine du haut vers le bas */}
            <motion.div
              className="absolute left-[11px] top-3 bottom-3 w-px origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, var(--nosy-choc) 0%, var(--nosy-choc) 15%, var(--nosy-border) 70%, transparent 100%)",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
            />

            {/* Points + contenus */}
            {MISSIONS.map((m, i) => (
              <MissionTimelineItem key={m.id} mission={m} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ---------- Stack ---------- */}
        <motion.section variants={cascade(0.06, 0.1)} className="py-12 border-b border-nosy-border">
          <motion.h2 variants={item} className="text-xs uppercase tracking-widest text-nosy-dim mb-6">
            Stack technique
          </motion.h2>
          <motion.div variants={cascade(0.04, 0.15)} className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {STACK.map((g) => (
              <motion.div key={g.label} variants={item}>
                <h3 className="text-xs uppercase tracking-wider text-nosy-dim mb-2">{g.label}</h3>
                <motion.div variants={cascade(0.02, 0)} className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <motion.span
                      key={s}
                      variants={item}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.15, ease: EASE }}
                      className="text-[11px] px-2 py-0.5 rounded bg-nosy-surface border border-nosy-border text-nosy-soft cursor-default"
                    >
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---------- Contact ---------- */}
        <motion.section variants={cascade(0.06, 0.1)} className="py-12">
          <motion.h2 variants={item} className="text-xs uppercase tracking-widest text-nosy-dim mb-6">
            Contact
          </motion.h2>
          <motion.div variants={cascade(0.05, 0.15)} className="space-y-4">
            <motion.a
              variants={item}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2, ease: EASE }}
              href={`mailto:${EMAIL}`}
              className="block text-2xl font-semibold hover:text-nosy-choc-up transition-colors break-all"
            >
              {EMAIL} →
            </motion.a>
            <motion.div variants={cascade(0.04, 0.1)} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-nosy-soft">
              {[
                { href: profile.contact.whatsappUrl, label: `WhatsApp · ${profile.contact.whatsapp}` },
                { href: profile.contact.github, label: `GitHub · ${profile.contact.githubLabel}` },
                { href: profile.contact.linkedin, label: `LinkedIn · ${profile.contact.linkedinLabel}` },
                { href: profile.contact.twitter, label: `Twitter · ${profile.contact.twitterLabel}` },
              ].map(({ href, label }) => (
                <motion.a
                  key={href}
                  variants={item}
                  whileHover={{ x: 2 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-nosy-fg transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.main>

      <motion.footer
        variants={slideInLeft}
        initial="hidden"
        animate="show"
        className="border-t border-nosy-border"
      >
        <div className="max-w-3xl mx-auto px-6 py-6 text-xs text-nosy-dim flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} {profile.shortName}</span>
          <Link href="/" className="hover:text-nosy-fg transition-colors">
            Explorer le portfolio en mode IDE →
          </Link>
        </div>
      </motion.footer>
    </div>
  );
}

/* ====================================================
   TIMELINE ITEM — ligne + rond + contenu
   ==================================================== */

function MissionTimelineItem({ mission, index }: { mission: Mission; index: number }) {
  const baseDelay = index * 0.12;

  return (
    <div className="relative pl-10 pb-10 last:pb-0 group">
      {/* ============ LE ROND ============ */}
      <motion.div
        className="absolute left-0 top-1 w-6 h-6 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: baseDelay,
        }}
      >
        {mission.featured ? (
          <>
            {/* Halo pulsé permanent (featured uniquement) */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-nosy-choc pointer-events-none"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.4],
                opacity: [0.65, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.9,
                delay: 1 + baseDelay,
                ease: "easeOut",
              }}
            />
            {/* Rond plein accentué + ring bg pour "couper" la ligne */}
            <span className="relative w-6 h-6 rounded-full bg-nosy-choc ring-4 ring-nosy-bg flex items-center justify-center shadow-[0_0_0_1px_var(--nosy-choc-up)]">
              <motion.span
                className="w-2 h-2 rounded-full bg-nosy-bg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: baseDelay + 0.35, duration: 0.3, ease: EASE }}
              />
            </span>
          </>
        ) : (
          // Rond simple — hover : passe en chocolate
          <span className="relative w-4 h-4 rounded-full border-2 border-nosy-border bg-nosy-bg ring-4 ring-nosy-bg flex items-center justify-center transition-colors duration-300 group-hover:border-nosy-choc">
            <span className="w-1 h-1 rounded-full bg-nosy-dim transition-colors duration-300 group-hover:bg-nosy-choc" />
          </span>
        )}
      </motion.div>

      {/* ============ CONTENU ============ */}
      <motion.div
        initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE, delay: baseDelay + 0.15 }}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        {mission.featured ? (
          <FeaturedMissionContent mission={mission} />
        ) : (
          <CompactMissionContent mission={mission} />
        )}
      </motion.div>
    </div>
  );
}

function FeaturedMissionContent({ mission }: { mission: Mission }) {
  return (
    <>
      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
        <h3 className="font-semibold text-lg">{mission.title}</h3>
        <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-nosy-choc/15 border border-nosy-choc/40 text-nosy-choc-up font-medium">
          Phare
        </span>
      </div>
      <p className="text-xs text-nosy-dim mb-1">{mission.context}</p>
      <p className="text-xs text-nosy-soft mb-4">{mission.role}</p>

      <ul className="space-y-1.5 mb-4 text-sm text-nosy-soft">
        {mission.decisions.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-nosy-choc shrink-0">→</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-nosy-fg pl-3 border-l-2 border-nosy-choc mb-4">
        {mission.result}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {mission.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] px-2 py-0.5 rounded bg-nosy-surface border border-nosy-border text-nosy-soft"
          >
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

function CompactMissionContent({ mission }: { mission: Mission }) {
  return (
    <>
      <h3 className="font-medium text-sm mb-1">{mission.title}</h3>
      <p className="text-[11px] text-nosy-dim mb-2">{mission.context}</p>
      <p className="text-xs text-nosy-soft mb-3">{mission.result}</p>
      <div className="flex flex-wrap gap-1">
        {mission.stack.map((s) => (
          <span
            key={s}
            className="text-[9px] px-1.5 py-0.5 rounded bg-nosy-surface/60 border border-nosy-border/60 text-nosy-dim"
          >
            {s}
          </span>
        ))}
      </div>
    </>
  );
}