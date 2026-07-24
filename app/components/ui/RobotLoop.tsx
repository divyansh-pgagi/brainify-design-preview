"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Looping transparent robot animation.
 * VP9 webm with alpha (Chrome/Firefox/Edge) → animated WebP (Safari)
 * → static poster (reduced motion). Seamless ping-pong loop.
 *
 * `glow` renders a soft radial halo behind the robot instead of a CSS
 * `filter: drop-shadow`, which Safari mis-renders as a rectangular box
 * around animated WebP frames.
 */
export default function RobotLoop({ className = "", glow }: { className?: string; glow?: string }) {
  const reduce = useReducedMotion();
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    // Safari doesn't composite VP9 alpha — fall back to animated WebP
    const ua = navigator.userAgent;
    setSafari(/^((?!chrome|android|crios|fxios).)*safari/i.test(ua));
  }, []);

  let media: React.ReactNode;
  if (reduce) {
    media = (
      <Image src="/images/robot/robot-poster.webp" alt="" width={460} height={533} className={className} priority />
    );
  } else if (safari) {
    media = (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/robot/robot-loop.webp" alt="" width={460} height={533} className={className} fetchPriority="high" />
    );
  } else {
    media = (
      <video autoPlay muted loop playsInline poster="/images/robot/robot-poster.webp" width={460} height={533} className={className} aria-hidden>
        <source src="/images/robot/robot-loop.webm" type="video/webm" />
      </video>
    );
  }

  if (!glow) return <>{media}</>;

  return (
    <span className="relative block w-full h-full">
      {/* soft halo — cross-browser safe (no drop-shadow rectangle in Safari) */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: "8%",
          background: `radial-gradient(circle, ${glow}, transparent 68%)`,
          filter: "blur(26px)",
        }}
      />
      <span className="relative block w-full h-full">{media}</span>
    </span>
  );
}
