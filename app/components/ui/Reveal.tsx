"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** travel distance in px for directional reveals */
  distance?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case "up": return { y: d };
    case "down": return { y: -d };
    case "left": return { x: d };
    case "right": return { x: -d };
    default: return {};
  }
};

/**
 * Cinematic scroll-triggered reveal. Wrap any block to fade + slide/scale it
 * in when it enters the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  once = true,
  className = "",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...offset(direction, distance), ...(direction === "scale" ? { scale: 0.92 } : {}) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {children}
    </MotionTag>
  );
}
