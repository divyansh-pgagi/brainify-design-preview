"use client";

import { motion } from "framer-motion";
import {
  AI_EXPERTS_BADGE,
  AI_EXPERTS_HEADING_PRE,
  AI_EXPERTS_HEADING_HIGHLIGHT,
  AI_EXPERTS_SUBHEADING,
  AI_EXPERTS_CTA,
  AI_EXPERT_FEATURED,
  AI_EXPERTS_ORBIT,
} from "@/app/lib/constants";

type Expert = {
  name: string;
  specialty: string;
  color: string;
  blurb: string;
  image: string;
};

/* ── Category icons (top-right of each card) ──────────────────── */
function CategoryIcon({ name, color }: { name: string; color: string }) {
  const common = { width: 15, height: 15, fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    Sarah: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />,
    Adam: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /><circle cx="12" cy="12" r="0.6" fill={color} /></>,
    Steve: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    Carol: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8 6.2 21l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.1-2.1 2.6-2.5z" />,
    Luke: <path d="M12 3l2.6 5.6L21 9.3l-4.5 4.3 1.1 6.4L12 17l-5.6 3 1.1-6.4L3 9.3l6.4-.7L12 3z" />,
    Daniel: <><path d="M12 3v18M16 7.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 2.6 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3" /></>,
  };
  return (
    <span
      className="shrink-0 rounded-lg flex items-center justify-center"
      style={{ width: 28, height: 28, background: `${color}1a`, border: `1px solid ${color}44` }}
    >
      <svg viewBox="0 0 24 24" {...common}>{paths[name] ?? paths.Adam}</svg>
    </span>
  );
}

/* ── Glowing circular avatar ──────────────────────────────────── */
function Avatar({ src, name, color, size = 52 }: { src: string; name: string; color: string; size?: number }) {
  return (
    <span
      className="relative shrink-0 rounded-full overflow-hidden block"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 50% 35%, #1a3b74, #0a1730)",
        boxShadow: `0 0 0 1.5px ${color}66, 0 0 16px ${color}55`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        loading="lazy"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
      />
    </span>
  );
}

/* ── Orbiting expert card ─────────────────────────────────────── */
function OrbitCard({ expert }: { expert: Expert }) {
  return (
    <div
      className="rounded-2xl"
      style={{
        width: 210,
        padding: "14px 16px",
        background: "linear-gradient(155deg, rgba(20,26,64,0.82) 0%, rgba(10,14,38,0.9) 100%)",
        border: "1px solid rgba(120,150,255,0.28)",
        boxShadow: `0 12px 34px rgba(0,0,0,0.45), 0 0 22px ${expert.color}18`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-start gap-3">
        <Avatar src={expert.image} name={expert.name} color={expert.color} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, fontWeight: 700, color: "#eef3fb", lineHeight: 1.15 }}>
              {expert.name}
            </p>
            <CategoryIcon name={expert.name} color={expert.color} />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: expert.color, letterSpacing: "0.3px", lineHeight: 1.4, marginTop: 2 }}>
            {expert.specialty}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 400, color: "rgba(199,210,220,0.6)", lineHeight: 1.4, marginTop: 5 }}>
            {expert.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Featured (Ryan) centre card ──────────────────────────────── */
function FeaturedCard() {
  const f = AI_EXPERT_FEATURED;
  return (
    <div
      className="relative flex flex-col items-center text-center rounded-[26px]"
      style={{
        width: 264,
        padding: "20px 22px 22px",
        background: "linear-gradient(160deg, rgba(22,34,86,0.95) 0%, rgba(8,14,40,0.98) 100%)",
        border: "1.5px solid rgba(120,150,255,0.5)",
        boxShadow: "0 0 60px rgba(60,110,255,0.35), inset 0 0 46px rgba(30,70,180,0.2)",
      }}
    >
      <span
        className="inline-flex items-center gap-1.5 rounded-full mb-4"
        style={{ padding: "5px 14px", background: "rgba(120,150,255,0.16)", border: "1px solid rgba(120,150,255,0.45)", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "#a9c4ff" }}
      >
        <span aria-hidden style={{ color: "#8fb0ff" }}>★</span> Featured Expert
      </span>

      {/* robot portrait in a glowing ring */}
      <div className="relative mb-4" style={{ width: 150, height: 150 }}>
        <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(120,160,255,0.45)", boxShadow: "0 0 34px rgba(60,120,255,0.5), inset 0 0 30px rgba(40,90,200,0.35)" }} />
        <div aria-hidden className="absolute rounded-full" style={{ inset: 10, border: "1px solid rgba(120,160,255,0.2)" }} />
        <div className="absolute overflow-hidden rounded-full" style={{ inset: 14, background: "radial-gradient(circle at 50% 32%, #1c47a0, #0a1730)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.image}
            alt={f.name}
            className="object-cover w-full h-full"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-heading)", fontSize: 30, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>
        {f.name}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: f.color, marginTop: 3 }}>
        {f.specialty}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 400, color: "rgba(199,210,220,0.7)", lineHeight: 1.45, marginTop: 10 }}>
        {f.blurb}
      </p>

      <div className="flex flex-wrap justify-center gap-1.5 mt-4 pt-4 w-full" style={{ borderTop: "1px solid rgba(120,150,255,0.15)" }}>
        {f.tags.map((t) => (
          <span
            key={t}
            style={{ padding: "5px 10px", borderRadius: 8, background: "rgba(120,150,255,0.1)", border: "1px solid rgba(120,150,255,0.25)", fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(210,220,235,0.85)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Glowing platform base under the centre ───────────────────── */
function PlatformBase() {
  return (
    <div aria-hidden className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ bottom: 28, width: 360, height: 150 }}>
      {/* concentric rings */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: 10 + i * 12,
            width: 340 - i * 74,
            height: 74 - i * 15,
            border: "1px solid rgba(90,140,255,0.28)",
            boxShadow: "0 0 18px rgba(40,110,255,0.15)",
          }}
        />
      ))}
      {/* bright core */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full animate-pulse-glow"
        style={{ bottom: 22, width: 120, height: 40, background: "radial-gradient(ellipse, rgba(90,170,255,0.85), rgba(40,90,220,0.25) 55%, transparent 75%)", filter: "blur(6px)" }}
      />
      {/* vertical light column */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 30, width: 60, height: 130, background: "linear-gradient(to top, rgba(90,170,255,0.4), transparent)", filter: "blur(10px)", borderRadius: "50%" }}
      />
    </div>
  );
}

export default function AIExperts() {
  const RADIUS = 250;
  const SPIN = 46; // seconds per revolution

  return (
    <section id="features" className="relative overflow-hidden" style={{ background: "transparent" }}>
      <style>{`
        @keyframes aiOrbitSpin { to { transform: rotate(360deg); } }
        @keyframes aiOrbitSpinRev { to { transform: rotate(-360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .ai-orbit-rotator, .ai-orbit-counter { animation: none !important; }
        }
      `}</style>

      <div aria-hidden className="absolute pointer-events-none" style={{ width: 800, height: 620, top: "48%", right: "-6%", transform: "translateY(-50%)", background: "radial-gradient(ellipse, rgba(0,120,255,0.14) 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ── LEFT: copy ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[520px]">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full glass neon-border"
              style={{ padding: "6px 16px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#9ec8f5" }}
            >
              {AI_EXPERTS_BADGE}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.1rem, 4.5vw, 3.1rem)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, color: "#e8eef6", marginTop: 20 }}
            >
              {AI_EXPERTS_HEADING_PRE}
              <span className="gradient-text text-glow-blue">{AI_EXPERTS_HEADING_HIGHLIGHT}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "27px", color: "rgba(199,210,220,0.65)", marginTop: 18 }}
            >
              {AI_EXPERTS_SUBHEADING}
            </motion.p>

            <motion.a
              href="#paths"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-xl mt-8 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{ padding: "13px 26px", background: "linear-gradient(135deg, #3b6fff 0%, #00c2ff 100%)", boxShadow: "0 0 26px rgba(59,111,255,0.4)", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, color: "#fff" }}
            >
              {AI_EXPERTS_CTA}
              <span aria-hidden>→</span>
            </motion.a>
          </div>

          {/* ── RIGHT: orbit stage (desktop / tablet) ── */}
          <div className="relative hidden md:block flex-shrink-0" style={{ width: 660, height: 660, maxWidth: "100%" }}>
            {/* faint orbit rings */}
            <div aria-hidden className="absolute rounded-full" style={{ inset: "6%", border: "1px dashed rgba(120,150,255,0.13)" }} />
            <div aria-hidden className="absolute rounded-full" style={{ inset: "20%", border: "1px solid rgba(120,150,255,0.07)" }} />

            {/* glowing platform base */}
            <PlatformBase />

            {/* rotating orbit layer */}
            <div className="ai-orbit-rotator absolute inset-0" style={{ animation: `aiOrbitSpin ${SPIN}s linear infinite` }}>
              {AI_EXPERTS_ORBIT.map((expert, i) => {
                const angle = (360 / AI_EXPERTS_ORBIT.length) * i;
                return (
                  <div
                    key={expert.name}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle}deg)` }}
                  >
                    <div className="ai-orbit-counter" style={{ animation: `aiOrbitSpinRev ${SPIN}s linear infinite` }}>
                      <OrbitCard expert={expert} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ryan pinned in the centre */}
            <div className="absolute top-1/2 left-1/2 z-10" style={{ transform: "translate(-50%, -55%)" }}>
              <FeaturedCard />
            </div>

            {/* "Learn Anytime" chip */}
            <div
              className="absolute z-10 flex items-center gap-2.5 rounded-xl"
              style={{ left: 0, bottom: 40, padding: "10px 14px", background: "linear-gradient(150deg, rgba(20,26,64,0.9), rgba(10,14,38,0.94))", border: "1px solid rgba(120,150,255,0.28)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
            >
              <span className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "rgba(120,150,255,0.14)" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8fb0ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" />
                </svg>
              </span>
              <div className="leading-tight">
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 700, color: "#eef3fb" }}>Learn Anytime</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10.5, color: "rgba(199,210,220,0.55)" }}>On any device</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: mobile fallback ── */}
          <div className="md:hidden w-full flex flex-col items-center gap-6">
            <FeaturedCard />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[440px]">
              {AI_EXPERTS_ORBIT.map((expert) => (
                <OrbitCard key={expert.name} expert={expert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
