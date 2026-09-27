import type { Variants } from "framer-motion";

/* Easing signature whoami — expo-out.
   Utilisé partout. C'est CE qui donne la cohérence à l'ensemble. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* Conteneur racine : orchestre le stagger entre blocs principaux */
export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* Entrée standard d'un bloc : fade + slide + déblur */
export const item: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

/* Ligne qui vient de la gauche (sidebar-style) */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

/* Carte qui se pose avec un léger scale */
export const card: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* Badge qui pop */
export const badge: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE, delay: 0.15 },
  },
};

/* Conteneur secondaire pour cascade interne (listes, tags…) */
export const cascade = (stagger = 0.05, delay = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});