import type { Variants } from "framer-motion";
import { motion as tokens } from "./tokens";

const ease = tokens.easingPrimary;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: tokens.durationEntrance, ease },
  },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: tokens.staggerChildren,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3, ease },
  },
};

export const hoverLift = {
  whileHover: { y: tokens.hoverLift, transition: { duration: 0.2, ease: "easeOut" } },
  whileTap: { scale: tokens.activePress },
};

export const crossfadeSlide: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.5, ease } },
};
