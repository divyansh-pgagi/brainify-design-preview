"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useAnimationControls } from "framer-motion";
import RobotLoop from "../ui/RobotLoop";

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
  show = true,
}: {
  label: string;
  value: string;
  className?: string;
  delay?: number;
  float?: number;
  show?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={show ? { opacity: 1, scale: 1, y: [0, -float, 0] } : { opacity: 0, scale: 0.6 }}
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
const HEADLINE_FULL = "The way you learn is about to change.";
const HEADLINE_HIGHLIGHT = "change.";

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
  const done = count >= HEADLINE_FULL.length;

  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
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
  // Intro sequence: robot flies in and settles → then content reveals
  const [introDone, setIntroDone] = useState(false);

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
          <div className="flex-1 flex flex-col gap-8 text-center md:text-left max-w-[580px] mx-auto md:mx-0">

            {/* Typewriter H1 — starts typing after the robot settles */}
            <TypewriterHeadline start={introDone} />

            {/* App store buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap justify-center md:justify-start gap-3"
            >
              <AppStoreBadge store="apple" />
              <AppStoreBadge store="google" />
            </motion.div>
          </div>

          {/* RIGHT — phone + robot cluster */}
          <div className="flex-shrink-0 flex justify-center md:justify-end pt-16 pb-10 md:pt-20 md:pb-0">
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
    </section>
  );
}
