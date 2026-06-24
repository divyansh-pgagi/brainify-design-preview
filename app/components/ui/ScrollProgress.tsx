"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin neon bar pinned to the top of the viewport that fills left-to-right as
 * the page is scrolled. Sits above the navbar; ignores pointer events.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        height: 3,
        background: "linear-gradient(90deg, #0047ff 0%, #00c2ff 50%, #4d8bff 100%)",
        boxShadow: "0 0 12px rgba(0,194,255,0.6)",
      }}
    />
  );
}
