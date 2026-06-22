"use client";

import { useEffect, useRef, useState } from "react";
import DecodeText from "@/app/components/ui/DecodeText";

const PHASES = [
  {
    phase: "PHASE 01",
    title: "KHDA\nCERTIFICATION",
    desc: "Launch UAE accredited\ncertification attested by\nthe Dubai Government",
    active: false,
    rail: "top" as const,
  },
  {
    phase: "PHASE 02",
    title: "APPLICATION\nLAB",
    desc: "Expand on project-led\napplications",
    active: true,
    rail: "bottom" as const,
  },
  {
    phase: "PHASE 03",
    title: "MINI VIDEO\nLESSONS",
    desc: "Expand library of mini\nvideos for every\ncourse/path",
    active: false,
    rail: "top" as const,
  },
  {
    phase: "PHASE 04",
    title: "VIRTUAL\nWORKSHOPS",
    desc: "Introduce virtual\nworkshops for\ninteractivity and support",
    active: true,
    rail: "bottom" as const,
  },
  {
    phase: "PHASE 05",
    title: "EXPANDING\nPATHS",
    desc: "Create more paths and\ncourses to provide more\nvariety and options",
    active: false,
    rail: "top" as const,
  },
];

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

/*
  Fixed canvas layout (all px):

  Row 0 — top-note zone        (top-rail desc + active-node top note)
  Row 1 — top-rail nodes       (inactive circles, centered)
  Row 2 — phase labels row     (for BOTH top and bottom rail)
  Row 3 — bottom-rail nodes    (active circles, centered)
  Row 4 — bottom-note zone     (active-node bottom desc)

  We keep separate heights for each row so every element
  is pinned by simple arithmetic — no floating offsets.
*/
const R0_H  = 64;   // top note row
const R1_H  = 88;   // top-rail node row  (node dia = 80)
const R2_H  = 34;   // phase label row
const R3_H  = 108;  // bottom-rail node row (node dia = 100)
const R4_H  = 70;   // bottom note row

const CANVAS_H = R0_H + R1_H + R2_H + R3_H + R4_H;  // 364

// SVG viewBox Y-centres for the curve paths
const TOP_CY = R0_H + R1_H / 2;                            // centre of row1
const BOT_CY = R0_H + R1_H + R2_H + R3_H / 2;             // centre of row3

// Node diameters
const TOP_D = 80;
const BOT_D = 100;

// X positions (% of container width)
const X_PCTS = [10, 27.5, 50, 72.5, 90];

export default function Roadmap() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="roadmap" className="relative overflow-hidden" style={{ background: "#060f1e" }}>
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 400, top: "30%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,70,180,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <style>{`
        @keyframes rm-dash  { to { stroke-dashoffset: -22; } }
        @keyframes rm-pulse {
          0%,100% { box-shadow: 0 0 16px 3px rgba(0,185,220,0.32), 0 0 36px 7px rgba(0,125,185,0.16); }
          50%     { box-shadow: 0 0 24px 6px rgba(0,205,240,0.44), 0 0 50px 10px rgba(0,140,200,0.22); }
        }
        @keyframes rm-ring {
          0%   { transform: scale(1);    opacity: 0.32; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes rm-ring2 {
          0%   { transform: scale(1);    opacity: 0.16; }
          100% { transform: scale(1.72); opacity: 0; }
        }
      `}</style>

      <div ref={ref} className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-24 pb-10">

        {/* Header */}
        <div className="mb-12" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#4a9eff", marginBottom: 12 }}>
            What&apos;s next
          </p>
          <DecodeText
            as="h2"
            text="Product Roadmap"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 10, lineHeight: 1.15 }}
          />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "26px", color: "rgba(199,210,220,0.50)", maxWidth: 480 }}>
            Where brAInify is heading next — accreditation, deeper labs, more paths.
          </p>
        </div>

        {/* ── DESKTOP CARD ── */}
        <div
          className="hidden md:block relative rounded-2xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            background: "linear-gradient(160deg, rgba(5,16,48,0.95) 0%, rgba(2,8,26,0.98) 100%)",
            border: "1.5px solid rgba(0,195,235,0.22)",
            boxShadow: "0 0 60px rgba(0,120,190,0.07)",
            padding: "28px 24px 24px",
            overflow: "hidden",
          }}
        >
          <div aria-hidden className="absolute pointer-events-none inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,70,180,0.05) 0%, transparent 60%)" }} />

          {/* ── Canvas ── */}
          <div className="relative w-full" style={{ height: CANVAS_H }}>

            {/* SVG curves — behind everything */}
            <svg
              viewBox={`0 0 1000 ${CANVAS_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible", zIndex: 0 }}
              aria-hidden
            >
              <defs>
                <filter id="gl" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="2.2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(0,180,225,0.38)" />
                  <stop offset="50%"  stopColor="rgba(0,220,252,0.72)" />
                  <stop offset="100%" stopColor="rgba(0,180,225,0.38)" />
                </linearGradient>
              </defs>

              {PHASES.slice(0, -1).map((p, i) => {
                const next = PHASES[i + 1];
                const x1 = X_PCTS[i]     * 10;
                const x2 = X_PCTS[i + 1] * 10;
                const y1 = p.rail    === "top" ? TOP_CY : BOT_CY;
                const y2 = next.rail === "top" ? TOP_CY : BOT_CY;
                const mx = (x1 + x2) / 2;
                const d  = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
                return (
                  <g key={`c-${i}`}>
                    <path d={d} fill="none" stroke="rgba(0,160,205,0.13)" strokeWidth="1.5" strokeDasharray="6 5" />
                    <path
                      d={d} fill="none" stroke="url(#lg)" strokeWidth="1.8" strokeDasharray="6 5"
                      filter="url(#gl)"
                      style={{
                        opacity: inView ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 150 + 600}ms`,
                        animation: inView ? `rm-dash ${1.7 + i * 0.15}s linear infinite` : "none",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* ── Per-column elements ── */}
            {PHASES.map((p, i) => {
              const xPct  = X_PCTS[i];
              const isTop = p.rail === "top";
              const nodeD = isTop ? TOP_D : BOT_D;

              /* Vertical tops of each element in the column */
              // Node centre is at TOP_CY or BOT_CY, so node top = centre - radius
              const nodeCY   = isTop ? TOP_CY : BOT_CY;
              const nodeTopY = nodeCY - nodeD / 2;

              // Phase label: sits just below the node (8px gap)
              const labelY   = nodeTopY + nodeD + 8;

              // Desc text:
              //   top-rail  → inside R0, aligned to bottom (above node)
              //   bottom-rail → inside R4, aligned to top (below label)
              const noteY    = isTop
                ? 0                                       // start of R0
                : R0_H + R1_H + R2_H + R3_H + 8;         // start of R4 + small gap

              const noteH    = isTop ? R0_H - 6 : R4_H - 8;

              const delay = i * 120;

              return (
                <div key={`col-${i}`}>

                  {/* ── Desc / note text ── */}
                  <div
                    className="absolute text-center"
                    style={{
                      left: `${xPct}%`,
                      top: noteY,
                      height: noteH,
                      transform: "translateX(-50%)",
                      width: 140,
                      display: "flex",
                      alignItems: isTop ? "flex-end" : "flex-start",
                      justifyContent: "center",
                      paddingBottom: isTop ? 6 : 0,
                      paddingTop:    isTop ? 0  : 4,
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${delay + 680}ms`,
                      zIndex: 1,
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11.5,
                      fontWeight: 400,
                      color: "rgba(155,180,205,0.65)",
                      lineHeight: 1.62,
                      whiteSpace: "pre-line",
                      textAlign: "center",
                    }}>
                      {p.desc}
                    </p>
                  </div>

                  {/* ── Node circle ── */}
                  <div
                    className="absolute flex items-center justify-center rounded-full"
                    style={{
                      left: `${xPct}%`,
                      top: nodeTopY,
                      transform: inView ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.65)",
                      width: nodeD,
                      height: nodeD,
                      background: p.active
                        ? "radial-gradient(circle at 38% 30%, #45d8f2 0%, #12a4d3 18%, #0565ac 46%, #032e72 72%, #011644 100%)"
                        : "radial-gradient(circle at 38% 30%, #192d5c 0%, #0c1b3b 55%, #060d22 100%)",
                      border: p.active
                        ? "1.5px solid rgba(0,210,245,0.48)"
                        : "1.5px solid rgba(0,160,210,0.20)",
                      animation: p.active && inView ? "rm-pulse 3s ease-in-out infinite" : "none",
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${delay + 350}ms, transform 0.5s ease ${delay + 350}ms`,
                      zIndex: 3,
                    }}
                  >
                    {p.active && inView && (
                      <>
                        <div className="absolute rounded-full pointer-events-none" style={{ inset: -9,  border: "1px solid rgba(0,205,242,0.24)", animation: "rm-ring  2.6s ease-out infinite" }} />
                        <div className="absolute rounded-full pointer-events-none" style={{ inset: -17, border: "1px solid rgba(0,205,242,0.11)", animation: "rm-ring2 2.6s ease-out infinite 0.7s" }} />
                      </>
                    )}
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: p.active ? 10.5 : 9,
                      fontWeight: 800,
                      color: "#fff",
                      textAlign: "center",
                      letterSpacing: "0.4px",
                      whiteSpace: "pre-line",
                      lineHeight: 1.35,
                      padding: "0 6px",
                      userSelect: "none",
                    }}>
                      {p.title}
                    </p>
                  </div>

                  {/* ── Phase label ── */}
                  <div
                    className="absolute text-center"
                    style={{
                      left: `${xPct}%`,
                      top: labelY,
                      transform: "translateX(-50%)",
                      width: 110,
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${delay + 520}ms`,
                      zIndex: 1,
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: p.active ? "rgba(0,210,248,0.78)" : "rgba(74,158,255,0.78)",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {p.phase}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE vertical list ── */}
        <div
          className="md:hidden rounded-2xl overflow-hidden"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
            background: "linear-gradient(160deg, rgba(5,16,48,0.95) 0%, rgba(2,8,26,0.98) 100%)",
            border: "1.5px solid rgba(0,195,235,0.20)",
            padding: "28px 20px",
          }}
        >
          {PHASES.map((p, i) => (
            <div key={`mob-${i}`} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 60, height: 60,
                    background: p.active
                      ? "radial-gradient(circle at 38% 30%, #45d8f2, #0565ac, #011644)"
                      : "radial-gradient(circle at 38% 30%, #192d5c, #060d22)",
                    border: p.active ? "1.5px solid rgba(0,210,245,0.48)" : "1.5px solid rgba(0,160,210,0.20)",
                    boxShadow: p.active ? "0 0 14px rgba(0,190,225,0.28)" : "none",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 100 + 300}ms`,
                    flexShrink: 0,
                  }}
                >
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 8.5, fontWeight: 800, color: "#fff", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.35, padding: "0 5px" }}>
                    {p.title}
                  </p>
                </div>
                {i < PHASES.length - 1 && (
                  <div style={{ width: 1.5, height: 36, marginTop: 3, marginBottom: 3, background: "linear-gradient(to bottom, rgba(0,190,230,0.32), rgba(0,135,185,0.07))" }} />
                )}
              </div>
              <div className="pt-2 pb-4" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${i * 100 + 360}ms` }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: p.active ? "rgba(0,210,248,0.82)" : "rgba(74,158,255,0.82)", letterSpacing: "1.3px", textTransform: "uppercase", marginBottom: 4 }}>
                  {p.phase}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#c7d2dc", marginBottom: 5 }}>
                  {p.title.replace("\n", " ")}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(155,180,205,0.60)", lineHeight: 1.65 }}>
                  {p.desc.replace(/\n/g, " ")}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
