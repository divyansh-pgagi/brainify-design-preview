"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/**
 * ScrollBot — small companion robot that rides along the right edge
 * of the page as the user scrolls. Tilts with scroll velocity,
 * bobs gently while idle. Desktop only, purely decorative.
 */
export default function ScrollBot() {
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // travels down the right edge as you scroll
  const top = useTransform(progress, [0, 1], ["18vh", "72vh"]);
  // gentle horizontal sway on the way down
  const x = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, -14, 6, -10, 0]);

  // tilt with scroll velocity (leans into the direction of travel)
  const velocity = useVelocity(scrollYProgress);
  const rotate = useSpring(useTransform(velocity, [-1.2, 0, 1.2], [-16, 0, 16]), {
    stiffness: 200,
    damping: 24,
  });

  // fade out over the footer so it doesn't crowd the CTA
  const opacity = useTransform(progress, [0, 0.03, 0.92, 1], [0, 1, 1, 0]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="hidden lg:block fixed right-6 z-40 pointer-events-none"
      style={{ top, x, opacity, width: 64, height: 78 }}
    >
      <motion.div className="w-full h-full" style={{ rotate }}>
        <div className="w-full h-full animate-float">
          <Image
            src="/images/ai-robot.png"
            alt=""
            width={64}
            height={78}
            className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(74,158,255,0.55)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
