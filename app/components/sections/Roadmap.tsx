"use client";

import { useEffect, useRef, useState } from "react";

const PHASES = [
  {
    phase: "PHASE 01",
    title: "KHDA\nCERTIFICATION",
    desc: "Launch UAE accredited certification attested by the Dubai Government",
    active: false,
    rail: "top",
  },
  {
    phase: "PHASE 02",
    title: "APPLICATION\nLAB",
    desc: "Expand on project-led applications",
    active: true,
    rail: "bottom",
  },
  {
    phase: "PHASE 03",
    title: "MINI VIDEO\nLESSSONS",
    desc: "Expand library of mini videos for every course/path",
    active: false,
    rail: "top",
  },
  {
    phase: "PHASE 04",
    title: "VIRTUAL\nWORKSHOPS",
    desc: "Introduce virtual workshops for interactivity and support",
    active: true,
    rail: "bottom",
  },
  {
    phase: "PHASE 05",
    title: "EXPANDING\nPATHS",
    desc: "Create more paths and courses to provide more variety and options",
    active: false,
    rail: "top",
  },
] as const;

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Roadmap() {
  const { ref, inView } = useInView(0.1);

  // Node centers for SVG connector paths (as % of container width)
  // 5 nodes equally spaced: 10%, 27.5%, 50%, 72.5%, 90%
  const nodeXPcts = [10, 27.5, 50, 72.5, 90];

  // Vertical positions in the SVG (total height = 220px)
  // top-rail node center Y = 80, bottom-rail node center Y = 140
  const topY = 80;
  const botY = 140;

  return (
    <section id="roadmap" className="relative overflow-hidden" style={{ background: "#060f1e" }}>
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 800, height: 500,
          top: "20%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(0,80,200,0.09) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <style>{`
        @keyframes rm-dash { to { stroke-dashoffset: -22; } }
        @keyframes rm-pulse {
          0%,100% { box-shadow: 0 0 24px 5px rgba(0,210,240,0.50), 0 0 55px 12px rgba(0,150,200,0.28); }
          50%      { box-shadow: 0 0 38px 9px rgba(0,235,255,0.70), 0 0 75px 18px rgba(0,165,225,0.40); }
        }
        @keyframes rm-ring {
          0%   { transform: scale(1);    opacity: 0.40; }
          100% { transform: scale(1.50); opacity: 0; }
        }
        @keyframes rm-ring2 {
          0%   { transform: scale(1);    opacity: 0.25; }
          100% { transform: scale(1.80); opacity: 0; }
        }
      `}</style>

      <div ref={ref} className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 py-24">

        {/* ── Header ── */}
        <div
          className="mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#4a9eff", marginBottom: 12 }}>
            What&apos;s next
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 10, lineHeight: 1.15 }}>
            Product Roadmap
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "rgba(199,210,220,0.55)", maxWidth: 480 }}>
            Where brAInify is heading next — accreditation, deeper labs, more paths.
          </p>
        </div>

        {/* ── DESKTOP CARD ── */}
        <div
          className="hidden md:block relative rounded-2xl overflow-visible"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            background: "linear-gradient(145deg, rgba(4,14,44,0.94) 0%, rgba(2,8,26,0.98) 100%)",
            border: "1.5px solid rgba(0,200,240,0.30)",
            boxShadow: "0 0 0 1px rgba(0,200,240,0.05), 0 0 80px rgba(0,130,200,0.10)",
            padding: "0",
          }}
        >
          <div aria-hidden className="absolute pointer-events-none inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(0,80,200,0.07) 0%, transparent 60%)" }} />

          {/* SVG connector layer — full width, positioned behind nodes */}
          <div className="relative w-full" style={{ height: 220 }}>
            <svg
              viewBox="0 0 1000 220"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
              aria-hidden
            >
              <defs>
                <filter id="rm-glow-f" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="rm-line-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(0,195,240,0.45)" />
                  <stop offset="50%"  stopColor="rgba(0,235,255,0.85)" />
                  <stop offset="100%" stopColor="rgba(0,195,240,0.45)" />
                </linearGradient>
              </defs>

              {PHASES.slice(0, -1).map((p, i) => {
                const next = PHASES[i + 1];
                const x1 = nodeXPcts[i] * 10;
                const x2 = nodeXPcts[i + 1] * 10;
                const y1 = p.rail === "top" ? topY : botY;
                const y2 = next.rail === "top" ? topY : botY;
                // Smooth S-curve: control points pull toward the midpoint
                const mx = (x1 + x2) / 2;
                const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
                return (
                  <g key={`c-${i}`}>
                    <path d={d} fill="none" stroke="rgba(0,175,215,0.16)" strokeWidth="1.5" strokeDasharray="6 5" />
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#rm-line-grad)"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                      filter="url(#rm-glow-f)"
                      style={{
                        opacity: inView ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 160 + 600}ms`,
                        animation: inView ? `rm-dash ${1.6 + i * 0.15}s linear infinite` : "none",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Node + label overlays */}
            {PHASES.map((p, i) => {
              const nodeD = p.active ? 104 : 82;
              const xPct = nodeXPcts[i];
              const yCenter = p.rail === "top" ? topY : botY;

              return (
                <div
                  key={`n-${i}`}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${xPct}%`,
                    top: yCenter,
                    transform: "translate(-50%, -50%)",
                    width: 140,
                  }}
                >
                  {/* Node circle */}
                  <div
                    className="relative flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: nodeD,
                      height: nodeD,
                      background: p.active
                        ? "radial-gradient(circle at 40% 32%, #55e8ff 0%, #1ab8e8 20%, #0577c2 50%, #033d88 76%, #011e50 100%)"
                        : "radial-gradient(circle at 40% 32%, #1c3468 0%, #0d1e45 55%, #060e26 100%)",
                      border: p.active
                        ? "2px solid rgba(0,228,255,0.60)"
                        : "1.5px solid rgba(0,175,220,0.24)",
                      animation: p.active && inView ? "rm-pulse 2.8s ease-in-out infinite" : "none",
                      transition: `opacity 0.5s ease ${i * 120 + 350}ms, transform 0.5s ease ${i * 120 + 350}ms`,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "scale(1)" : "scale(0.6)",
                      zIndex: 2,
                    }}
                  >
                    {p.active && inView && (
                      <>
                        <div className="absolute rounded-full pointer-events-none" style={{ inset: -10, border: "1.5px solid rgba(0,220,255,0.30)", animation: "rm-ring 2.4s ease-out infinite" }} />
                        <div className="absolute rounded-full pointer-events-none" style={{ inset: -18, border: "1px solid rgba(0,220,255,0.15)", animation: "rm-ring2 2.4s ease-out infinite 0.6s" }} />
                      </>
                    )}
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: p.active ? 11 : 9,
                      fontWeight: 800,
                      color: "#ffffff",
                      textAlign: "center",
                      letterSpacing: "0.5px",
                      whiteSpace: "pre-line",
                      lineHeight: 1.35,
                      textShadow: p.active ? "0 0 14px rgba(180,245,255,0.60)" : "none",
                      userSelect: "none",
                      padding: "0 8px",
                    }}>
                      {p.title}
                    </p>
                  </div>

                  {/* Phase label — always below node */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: p.active ? "rgba(0,228,255,0.90)" : "#4a9eff",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginTop: 10,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${i * 120 + 500}ms`,
                    }}
                  >
                    {p.phase}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Notes row — positioned below the SVG canvas */}
          {/* Top-rail notes go BELOW, bottom-rail (active) notes go ABOVE */}
          {/* We render them as absolutely positioned text relative to the card */}
          <div className="relative w-full" style={{ height: 80 }}>
            {PHASES.map((p, i) => {
              const xPct = nodeXPcts[i];
              return (
                <div
                  key={`desc-${i}`}
                  className="absolute text-center"
                  style={{
                    left: `${xPct}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                    width: 150,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 120 + 650}ms`,
                  }}
                >
                  {/* Only show desc for top-rail (inactive) nodes here — below the card timeline */}
                  {p.rail === "top" && (
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(199,210,220,0.55)",
                      lineHeight: 1.6,
                    }}>
                      {p.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active node top-notes: rendered above the SVG canvas */}
          <div className="absolute top-0 w-full" style={{ pointerEvents: "none" }}>
            {PHASES.map((p, i) => {
              if (!p.active) return null;
              const xPct = nodeXPcts[i];
              return (
                <div
                  key={`tnote-${i}`}
                  className="absolute text-center"
                  style={{
                    left: `${xPct}%`,
                    top: 12,
                    transform: "translateX(-50%)",
                    width: 160,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 120 + 650}ms`,
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(199,210,220,0.60)",
                    lineHeight: 1.6,
                  }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom padding */}
          <div style={{ height: 20 }} />
        </div>

        {/* ── MOBILE vertical list ── */}
        <div className="md:hidden flex flex-col gap-0">
          {PHASES.map((p, i) => (
            <div key={`mob-${i}`} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 60, height: 60,
                    background: p.active
                      ? "radial-gradient(circle at 40% 32%, #55e8ff, #0577c2, #011e50)"
                      : "radial-gradient(circle at 40% 32%, #1c3468, #060e26)",
                    border: p.active ? "2px solid rgba(0,228,255,0.55)" : "1.5px solid rgba(0,175,220,0.24)",
                    boxShadow: p.active ? "0 0 22px rgba(0,210,240,0.45)" : "none",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 100 + 300}ms`,
                    flexShrink: 0,
                  }}
                >
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 8.5, fontWeight: 800, color: "#fff", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.35, padding: "0 6px" }}>
                    {p.title}
                  </p>
                </div>
                {i < PHASES.length - 1 && (
                  <div style={{ width: 1.5, height: 40, marginTop: 4, marginBottom: 4, background: "linear-gradient(to bottom, rgba(0,210,240,0.45), rgba(0,150,200,0.10))" }} />
                )}
              </div>
              <div className="pt-2 pb-5" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${i * 100 + 350}ms` }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: p.active ? "rgba(0,228,255,0.9)" : "#4a9eff", letterSpacing: "1.3px", textTransform: "uppercase", marginBottom: 5 }}>
                  {p.phase}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, color: "#c7d2dc", marginBottom: 5 }}>
                  {p.title.replace("\n", " ")}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(199,210,220,0.55)", lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
