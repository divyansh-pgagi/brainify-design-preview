"use client";

import ParticleField from "@/app/components/ui/ParticleField";

/**
 * Site-wide atmosphere — the hero's background lifted into a single fixed,
 * full-viewport layer that sits behind all content (negative z-index). The
 * root `body` colour (#0b1424) is the base; this paints the aurora, cyber
 * grid, dot matrix, gradient blobs and the neural particle field on top of
 * it, while every section above stays transparent so it shows through.
 *
 * Rendered once in the root layout. pointer-events-none so it never
 * intercepts clicks; aria-hidden as it is purely decorative.
 */
export default function SiteBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden">
      <div className="aurora" />
      <div className="cyber-grid" />
      <div className="dot-matrix opacity-60" />

      {/* gradient blobs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700, height: 750, top: -200, right: -160,
          background: "radial-gradient(ellipse, rgba(20,70,220,0.30) 0%, rgba(8,35,130,0.16) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 480, height: 580, top: "12%", left: -120,
          background: "radial-gradient(ellipse, rgba(0,70,180,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* neural particle network */}
      <div className="absolute inset-0">
        <ParticleField density={68} linkDistance={132} />
      </div>
    </div>
  );
}
