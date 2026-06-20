"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import ParticleField from "@/app/components/ui/ParticleField";
import {
  HERO_BADGE_TEXT,
  HERO_SUBHEADING,
  HERO_DOWNLOAD_LABEL,
  HERO_CTA_LINK,
  HERO_TRUST_BADGES,
} from "@/app/lib/constants";

/* ── App Store Badge ─────────────────────────────────────────── */
function AppStoreBadge({ store }: { store: "apple" | "google" }) {
  const href =
    store === "apple"
      ? "https://apps.apple.com/ca/app/brainify-app/id6759913473"
      : "https://play.google.com/store/apps/details?id=com.brainify.app";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl overflow-hidden neon-border"
      style={{ background: "rgba(246,243,255,0.04)", minWidth: 148 }}
    >
      {/* sweeping beam */}
      <span
        aria-hidden
        className="absolute inset-y-0 w-1/3 -skew-x-12 animate-beam"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.18), transparent)" }}
      />
      {store === "apple" ? (
        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 relative z-10" fill="#c7d2dc" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <Image src="/playstore.png" alt="Google Play" width={24} height={24} className="w-6 h-6 shrink-0 object-contain relative z-10" aria-hidden />
      )}
      <div className="flex flex-col leading-tight relative z-10">
        <span style={{ fontSize: 10, color: "rgba(199,210,220,0.5)", fontFamily: "var(--font-body)" }}>
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span style={{ fontSize: 13, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </div>
    </motion.a>
  );
}

/* ── Floating HUD stat chip ──────────────────────────────────── */
function HudChip({
  label,
  value,
  className = "",
  delay = 0,
  float = 5,
}: {
  label: string;
  value: string;
  className?: string;
  delay?: number;
  float?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -float, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 4 + float, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`glass-strong rounded-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,40,160,0.35)] ${className}`}
    >
      <div className="hud-label" style={{ fontSize: 8.5 }}>{label}</div>
      <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>
        {value}
      </div>
    </motion.div>
  );
}

/* ── Phone + Robot cluster with mouse parallax ───────────────── */
function PhoneCluster() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  // depth layers move different amounts
  const backX = useTransform(sx, [-1, 1], [18, -18]);
  const backY = useTransform(sy, [-1, 1], [14, -14]);
  const frontX = useTransform(sx, [-1, 1], [30, -30]);
  const frontY = useTransform(sy, [-1, 1], [22, -22]);
  const robotX = useTransform(sx, [-1, 1], [46, -46]);
  const robotY = useTransform(sy, [-1, 1], [34, -34]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative scale-[0.78] md:scale-100 origin-top -translate-x-6 md:translate-x-0"
      style={{ width: 420, height: 600 }}
    >
      {/* Reactor glow behind cluster */}
      <div
        aria-hidden
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 360, height: 360, left: 40, top: 110,
          background: "radial-gradient(circle, rgba(0,120,255,0.35), transparent 65%)",
          filter: "blur(30px)",
        }}
      />
      {/* Orbiting conic rings */}
      <div aria-hidden className="absolute" style={{ width: 380, height: 380, left: 30, top: 100 }}>
        <div className="absolute inset-0 rounded-full reactor-ring opacity-50" style={{ maskImage: "radial-gradient(circle, transparent 62%, #000 64%, #000 66%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, transparent 62%, #000 64%, #000 66%, transparent 68%)" }} />
        <div className="absolute inset-6 rounded-full animate-spin-reverse" style={{ border: "1px dashed rgba(0,194,255,0.25)" }} />
        <div className="absolute inset-16 rounded-full animate-spin-slow" style={{ border: "1px solid rgba(77,139,255,0.18)" }} />
      </div>

      {/* Back phone */}
      <motion.div className="absolute z-10" style={{ right: -40, top: 40, width: 230, x: backX, y: backY }}>
        <Image
          src="/phone-app-img/AiMentor2.png"
          alt="brAInify app screen 2"
          width={230}
          height={480}
          className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,40,160,0.5)]"
          priority
        />
      </motion.div>

      {/* Front phone */}
      <motion.div className="absolute z-20" style={{ left: 90, top: 60, width: 250, x: frontX, y: frontY }}>
        <Image
          src="/phone-app-img/AiMentor.png"
          alt="brAInify app screen"
          width={250}
          height={520}
          className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,50,200,0.55)]"
          priority
        />
      </motion.div>

      {/* AI Robot floating */}
      <motion.div
        className="absolute z-30 pointer-events-none animate-float"
        style={{ top: -20, left: 75, width: 120, height: 145, x: robotX, y: robotY }}
        aria-hidden
      >
        <Image
          src="/images/ai-robot.png"
          alt=""
          width={120}
          height={145}
          className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(74,158,255,0.7)]"
          priority
        />
      </motion.div>

      {/* Floating HUD chips */}
      <HudChip label="Active learners" value="2.4M+" className="absolute z-40 left-[-8px] top-[180px]" delay={0.9} float={6} />
      <HudChip label="Countries" value="175" className="absolute z-40 right-[-6px] top-[120px]" delay={1.1} float={4} />
      <HudChip label="AI mentor" value="ONLINE" className="absolute z-40 right-[10px] bottom-[70px]" delay={1.3} float={7} />
    </motion.div>
  );
}

/* ── Animated headline (word-by-word reveal) ─────────────────── */
/* ── Typewriter headline ─────────────────────────────────────── */
const HEADLINE_FULL = "The way you learn is about to change.";
const HEADLINE_HIGHLIGHT = "change.";

function TypewriterHeadline() {
  const reduce = useReducedMotion();
  const hlStart = HEADLINE_FULL.length - HEADLINE_HIGHLIGHT.length;
  const [count, setCount] = useState(reduce ? HEADLINE_FULL.length : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= HEADLINE_FULL.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 62);
    return () => clearInterval(id);
  }, [reduce]);

  const plain = HEADLINE_FULL.slice(0, Math.min(count, hlStart));
  const highlight = count > hlStart ? HEADLINE_FULL.slice(hlStart, count) : "";
  const done = count >= HEADLINE_FULL.length;

  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.4rem, 5vw, 3.85rem)",
    fontWeight: 700,
    lineHeight: 1.06,
    letterSpacing: "-1.5px",
    color: "#c7d2dc",
  };

  return (
    <h1 className="relative" style={h1Style} aria-label={HEADLINE_FULL}>
      {/* invisible placeholder reserves the full box → no layout shift */}
      <span className="invisible" aria-hidden style={{ whiteSpace: "pre-wrap" }}>
        {HEADLINE_FULL}
      </span>
      {/* typed overlay */}
      <span className="absolute inset-0" aria-hidden style={{ whiteSpace: "pre-wrap" }}>
        {plain}
        <span className="gradient-text text-glow-blue">{highlight}</span>
        <span
          className={`inline-block align-middle ${done ? "animate-blink" : ""}`}
          style={{
            width: 3,
            height: "0.95em",
            marginLeft: 4,
            transform: "translateY(-0.06em)",
            background: "linear-gradient(180deg, #4a9eff, #00c2ff)",
            boxShadow: "0 0 10px rgba(0,194,255,0.9)",
            borderRadius: 1,
          }}
        />
      </span>
    </h1>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden scanlines"
      style={{ background: "#0b1424", minHeight: "100vh" }}
    >
      {/* ── Background atmosphere ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="aurora" />
        <div className="cyber-grid" />
        <div className="dot-matrix opacity-60" />
        {/* gradient blobs */}
        <div className="absolute rounded-full" style={{ width: 700, height: 750, top: -200, right: -160, background: "radial-gradient(ellipse, rgba(20,70,220,0.30) 0%, rgba(8,35,130,0.16) 45%, transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 480, height: 580, top: "12%", left: -120, background: "radial-gradient(ellipse, rgba(0,70,180,0.14) 0%, transparent 70%)", filter: "blur(70px)" }} />
      </div>

      {/* Particle network layer */}
      <div aria-hidden className="absolute inset-0 z-[1]">
        <ParticleField density={68} linkDistance={132} />
      </div>

      {/* top scanning beam */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px z-[2] overflow-hidden">
        <div className="h-full w-1/3 animate-beam" style={{ background: "linear-gradient(90deg, transparent, #00c2ff, transparent)" }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pt-[96px] pb-12 md:pt-[120px]">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 w-full">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left max-w-[580px] mx-auto md:mx-0">

            {/* HUD system-status badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass neon-border" style={{ padding: "6px 16px" }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#1bd79d] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1bd79d]" />
                </span>
                <span className="hud-label animate-flicker" style={{ fontSize: 10.5, color: "#c7d2dc" }}>
                  {HERO_BADGE_TEXT}
                </span>
              </span>
            </motion.div>

            {/* Typewriter H1 */}
            <TypewriterHeadline />

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                fontWeight: 400,
                lineHeight: "29.25px",
                color: "#c7d2dc",
                maxWidth: 520,
                margin: "0 auto",
              }}
              className="md:mx-0"
            >
              {HERO_SUBHEADING}
            </motion.p>

            {/* Download label + app buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="flex flex-col items-center md:items-start gap-3"
            >
              <p className="hud-label" style={{ fontSize: 11, letterSpacing: "1.98px", color: "rgba(0,194,255,0.8)" }}>
                {HERO_DOWNLOAD_LABEL}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <AppStoreBadge store="apple" />
                <AppStoreBadge store="google" />
              </div>
            </motion.div>

            {/* CTA link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex justify-center md:justify-start"
            >
              <a
                href="#inside-app"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4a9eff" }}
                className="group inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                {HERO_CTA_LINK}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2"
            >
              {HERO_TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400, color: "rgba(199,210,220,0.7)" }}
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3 shrink-0" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — phone + robot cluster */}
          <div className="flex-shrink-0 flex justify-center md:justify-end pt-16 pb-10 md:pt-20 md:pb-0">
            <PhoneCluster />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="hud-label" style={{ fontSize: 9 }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[rgba(0,194,255,0.4)] flex justify-center pt-1.5">
          <motion.span
            className="w-1 h-1.5 rounded-full bg-[#00c2ff]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
