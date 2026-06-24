"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** max tilt in degrees */
  max?: number;
  /** lift scale applied while hovering */
  scale?: number;
  /** color of the cursor-tracking glare */
  glareColor?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Holographic tilt card — tracks the cursor to rotate the element in 3D and
 * paints a cyan glare that follows the pointer. Driven by the element's own
 * onMouseMove (no rAF loop). Disabled under prefers-reduced-motion or on
 * coarse/touch pointers, where it renders as a plain card.
 */
export default function TiltCard({
  children,
  className = "",
  style,
  max = 12,
  scale = 1.04,
  glareColor = "rgba(0,194,255,0.22)",
  onMouseEnter,
  onMouseLeave,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const enabled = useRef(true);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabled.current = fine && !reduce;
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled.current) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
    const g = glareRef.current;
    if (g) {
      g.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, ${glareColor}, transparent 55%)`;
      g.style.opacity = "1";
    }
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
    onMouseLeave?.(e);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
        transition: "transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          opacity: 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
