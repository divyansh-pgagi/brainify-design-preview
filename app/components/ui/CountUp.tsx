"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** the final numeric value to count up to */
  to: number;
  /** text appended after the number, e.g. "+" or "%" */
  suffix?: string;
  /** animation length in ms */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts from 0 up to `to` once the element scrolls into view. Uses
 * requestAnimationFrame with an ease-out curve. Respects prefers-reduced-motion
 * (renders the final value immediately).
 */
export default function CountUp({
  to,
  suffix = "",
  duration = 1600,
  className = "",
  style,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        let startTs: number | null = null;
        const tick = (ts: number) => {
          if (startTs === null) startTs = ts;
          const progress = Math.min((ts - startTs) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, reduce]);

  return (
    <span ref={ref} className={className} style={style}>
      {reduce ? to : value}
      {suffix}
    </span>
  );
}
