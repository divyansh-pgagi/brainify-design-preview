"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  /** how far the element is allowed to drift toward the cursor, in px */
  strength?: number;
  /** how far outside the element the magnetic field reaches, in px */
  padding?: number;
  className?: string;
}

/**
 * Magnetic hover wrapper — the element is gently pulled toward the cursor while
 * the pointer is near, then springs back to rest on leave. Pairs with the neon
 * cursor ring. Respects prefers-reduced-motion (renders a plain wrapper).
 */
export default function Magnetic({
  children,
  strength = 18,
  padding = 24,
  className = "",
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // distance from center, normalised so the pull eases off toward the edge
    const dx = (e.clientX - cx) / (rect.width / 2 + padding);
    const dy = (e.clientY - cy) / (rect.height / 2 + padding);
    mx.set(Math.max(-1, Math.min(1, dx)) * strength);
    my.set(Math.max(-1, Math.min(1, dy)) * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
