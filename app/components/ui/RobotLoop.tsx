"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Looping transparent robot animation.
 * VP9 webm with alpha (Chrome/Firefox/Edge) → animated WebP (Safari)
 * → static poster (reduced motion). Seamless ping-pong loop.
 */
export default function RobotLoop({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    // Safari doesn't composite VP9 alpha — fall back to animated WebP
    const ua = navigator.userAgent;
    setSafari(/^((?!chrome|android|crios|fxios).)*safari/i.test(ua));
  }, []);

  if (reduce) {
    return (
      <Image
        src="/images/robot/robot-poster.webp"
        alt=""
        width={460}
        height={533}
        className={className}
        priority
      />
    );
  }

  if (safari) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/robot/robot-loop.webp"
        alt=""
        width={460}
        height={533}
        className={className}
        fetchPriority="high"
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/images/robot/robot-poster.webp"
      width={460}
      height={533}
      className={className}
      aria-hidden
    >
      <source src="/images/robot/robot-loop.webm" type="video/webm" />
    </video>
  );
}
