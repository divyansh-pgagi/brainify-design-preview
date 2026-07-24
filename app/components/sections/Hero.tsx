"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useAnimationControls } from "framer-motion";
import RobotLoop from "../ui/RobotLoop";
import {
  HERO_BADGE_TEXT,
  HERO_SUBHEADING,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_TRUST_BADGES,
  DEMO_VIDEO_URL,
} from "@/app/lib/constants";

/* ── Robot centerpiece + phones cluster with mouse parallax ──── */
function PhoneCluster({ onIntroDone }: { onIntroDone: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  // parallax depth
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

  // Robot fly-in: from the top-left corner, arc through the page center, then settle
  const robotRef = useRef<HTMLDivElement>(null);
  const robotControls = useAnimationControls();

  useEffect(() => {
    if (reduce) {
      robotControls.set({ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 });
      onIntroDone();
      return;
    }
    const robotEl = robotRef.current;
    if (!robotEl) {
      robotControls
        .start({ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } })
        .then(onIntroDone);
      return;
    }
    const r = robotEl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const startX = -60 - cx;
    const startY = -60 - cy;
    const midX = window.innerWidth / 2 - cx;
    const midY = window.innerHeight / 2 - cy;

    robotControls.set({ x: startX, y: startY, opacity: 0, scale: 0.2, rotate: -35 });
    robotControls
      .start({
        x: [startX, midX, 0],
        y: [startY, midY, 0],
        opacity: [0, 1, 1],
        scale: [0.2, 1.12, 1],
        rotate: [-35, -8, 0],
        transition: {
          duration: 2.2,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.55, 1],
        },
      })
      .then(onIntroDone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, robotControls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative scale-[0.78] md:scale-100 origin-top mx-auto"
      style={{ width: 420, height: 600, maxWidth: "100vw" }}
    >
      {/* Reactor glow behind robot */}
      <div
        aria-hidden
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 400, height: 400, left: 10, top: 110,
          background: "radial-gradient(circle, rgba(0,120,255,0.4), transparent 65%)",
          filter: "blur(34px)",
        }}
      />
      {/* Orbiting conic rings */}
      <div aria-hidden className="absolute" style={{ width: 420, height: 420, left: 0, top: 100 }}>
        <div className="absolute inset-0 rounded-full reactor-ring opacity-50" style={{ maskImage: "radial-gradient(circle, transparent 62%, #000 64%, #000 66%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, transparent 62%, #000 64%, #000 66%, transparent 68%)" }} />
        <div className="absolute inset-6 rounded-full animate-spin-reverse" style={{ border: "1px dashed rgba(0,194,255,0.25)" }} />
        <div className="absolute inset-16 rounded-full animate-spin-slow" style={{ border: "1px solid rgba(77,139,255,0.18)" }} />
      </div>

      {/* AI Robot centerpiece — flies in, then loops its float animation */}
      <motion.div
        id="hero-robot-visual"
        ref={robotRef}
        className="absolute z-30 pointer-events-none"
        style={{ top: 90, left: 30, width: 360, height: 417 }}
        initial={{ opacity: 0 }}
        animate={robotControls}
        aria-hidden
      >
        {/* mouse parallax layer */}
        <motion.div className="w-full h-full" style={{ x: robotX, y: robotY }}>
          <RobotLoop className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(74,158,255,0.65)]" />
        </motion.div>
      </motion.div>

    </motion.div>
  );
}

/* ── Animated headline (word-by-word reveal) ─────────────────── */
/* ── Typewriter headline ─────────────────────────────────────── */
const HEADLINE_FULL = "Learn Smarter.\nBuild Your Future.";
const HEADLINE_HIGHLIGHT = "Future.";

function TypewriterHeadline({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion();
  const hlStart = HEADLINE_FULL.length - HEADLINE_HIGHLIGHT.length;
  const [count, setCount] = useState(reduce ? HEADLINE_FULL.length : 0);

  useEffect(() => {
    if (reduce || !start) return;
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
  }, [reduce, start]);

  const plain = HEADLINE_FULL.slice(0, Math.min(count, hlStart));
  const highlight = count > hlStart ? HEADLINE_FULL.slice(hlStart, count) : "";

  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)",
    fontWeight: 800,
    lineHeight: 1.04,
    letterSpacing: "-1.8px",
    color: "#eef2f8",
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
      </span>
    </h1>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  // Intro sequence: robot flies in and settles → then content reveals
  const [introDone, setIntroDone] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden scanlines"
      style={{ background: "transparent", minHeight: "100vh" }}
    >
      {/* Atmosphere (aurora, grid, blobs, particles) is provided site-wide by
          <SiteBackground /> in the root layout. */}

      {/* top scanning beam */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px z-[2] overflow-hidden">
        <div className="h-full w-1/3 animate-beam" style={{ background: "linear-gradient(90deg, transparent, #00c2ff, transparent)" }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pt-[96px] pb-12 md:pt-[120px]">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 w-full">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left max-w-[600px] mx-auto md:mx-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="hidden md:flex justify-center md:justify-start"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full glass neon-border"
                style={{ padding: "7px 18px", fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 600, color: "#9ec8f5" }}
              >
                <span aria-hidden style={{ fontSize: 13 }}>✦</span>
                {HERO_BADGE_TEXT}
              </span>
            </motion.div>

            {/* Typewriter H1 — starts typing after the robot settles */}
            <TypewriterHeadline start={introDone} />

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(199,210,220,0.7)",
                maxWidth: 500,
              }}
              className="hidden md:block mx-auto md:mx-0"
            >
              {HERO_SUBHEADING}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-1"
            >
              <a
                href="#paths"
                className="inline-flex items-center justify-center gap-2 rounded-xl transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ padding: "14px 26px", background: "linear-gradient(135deg, #3b6fff 0%, #00c2ff 100%)", boxShadow: "0 0 28px rgba(59,111,255,0.4)", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, color: "#fff" }}
              >
                {HERO_PRIMARY_CTA}
                <span aria-hidden>→</span>
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 hover:bg-white/[0.06]"
                style={{ padding: "14px 24px", border: "1.5px solid rgba(120,150,255,0.35)", background: "rgba(255,255,255,0.02)", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#c7d2dc" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M10 8.5l5 3.5-5 3.5V8.5z" fill="currentColor" stroke="none" />
                </svg>
                {HERO_SECONDARY_CTA}
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="hidden md:flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-2"
            >
              {HERO_TRUST_BADGES.map((badge, i) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2"
                  style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "rgba(199,210,220,0.75)" }}
                >
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {i === 0 && <><circle cx="10" cy="10" r="7.5" /><path d="M2.5 10h15M10 2.5c2.2 2.2 2.2 12.8 0 15M10 2.5c-2.2 2.2-2.2 12.8 0 15" /></>}
                    {i === 1 && <><path d="M10 2l1.8 4.7L16.5 8l-4.7 1.8L10 14.5 8.2 9.8 3.5 8l4.7-1.3L10 2z" /></>}
                    {i === 2 && <><path d="M6 3h8a1 1 0 0 1 1 1v11l-5-2.5L5 15V4a1 1 0 0 1 1-1z" /></>}
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — phone + robot cluster */}
          <div className="flex-shrink-0 flex justify-center md:justify-end pt-2 pb-6 md:pt-20 md:pb-0">
            <PhoneCluster onIntroDone={() => setIntroDone(true)} />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : { opacity: 0 }}
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

      {/* "See How It Works" demo video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(3,8,20,0.88)", backdropFilter: "blur(8px)" }}
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full flex flex-col" style={{ maxWidth: 900 }} onClick={(e) => e.stopPropagation()}>
            <div
              className="flex items-center justify-between px-5 py-3 rounded-t-2xl"
              style={{ background: "rgba(7,28,70,0.98)", border: "1.5px solid rgba(74,158,255,0.3)", borderBottom: "none" }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc" }}>
                brAInify App Demo
              </p>
              <button
                onClick={() => setVideoOpen(false)}
                className="flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
                style={{ width: 32, height: 32, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                aria-label="Close video"
              >
                <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            </div>
            <div
              className="relative w-full rounded-b-2xl overflow-hidden"
              style={{ aspectRatio: "16/9", border: "1.5px solid rgba(74,158,255,0.3)", borderTop: "none", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}
            >
              <iframe
                src={DEMO_VIDEO_URL}
                title="brAInify App Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
