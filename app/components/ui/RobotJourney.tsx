"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import RobotLoop from "./RobotLoop";
import { ROBOT_JOURNEY_MESSAGES } from "@/app/lib/constants";

/* ── Typewriter speech bubble ───────────────────────────────────── */
function SpeechBubble({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  // Reset and replay typewriter on each new message
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    // small initial delay so the bubble pop-in finishes first
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, 38);
      return () => clearInterval(id);
    }, 180);
    return () => clearTimeout(start);
  }, [text]);

  return (
    <span>
      {displayed}
      {/* animated speaking dots while typing */}
      {!done && (
        <span
          aria-hidden
          style={{ display: "inline-flex", gap: 2, marginLeft: 3, verticalAlign: "middle" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                display: "inline-block",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#00c2ff",
              }}
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

/**
 * RobotJourney — one continuous robot character across the whole page.
 *
 * Handoff: while the hero is on screen, this fixed traveler sits exactly
 * on top of the hero robot (same asset, same size) but stays hidden.
 * The moment you scroll past the detach point, the hero robot hides and
 * the traveler takes over from the identical position — so the hero robot
 * appears to detach and start travelling. Scrolling back up reverses it:
 * the traveler flies back to the hero spot and "becomes" the hero robot.
 *
 * Journey: after detaching it shrinks and dives into the brand-story
 * canvas (where the video robot takes over), re-emerges at Educators,
 * rides the paths carousel floor, hovers beside the AI-mentor phone,
 * passes tools + certification, crosses to the FAQ, and docks at the
 * footer CTA with a power-up glow.
 *
 * All positions are piecewise-linear keyframes over scroll progress,
 * smoothed with a spring. Desktop only, reduced-motion disabled.
 */

const BASE_W = 110; // traveler's unscaled width (px)

type MessageRange = { text: string; start: number; end: number };

type Keyframes = {
  p: number[];
  x: number[];
  y: number[];
  s: number[];
  o: number[];
  detachP: number; // progress where hero robot ↔ traveler swap happens
  messages: MessageRange[];
};

const EMPTY: Keyframes = { p: [0, 1], x: [0, 0], y: [0, 0], s: [1, 1], o: [0, 0], detachP: 0, messages: [] };

function interp(v: number, stops: number[], values: number[]): number {
  if (v <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i]) {
      const t = (v - stops[i - 1]) / (stops[i] - stops[i - 1] || 1);
      return values[i - 1] + t * (values[i] - values[i - 1]);
    }
  }
  return values[values.length - 1];
}

export default function RobotJourney() {
  const reduce = useReducedMotion();
  const framesRef = useRef<Keyframes>(EMPTY);

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const total = doc.scrollHeight - vh;
    if (total <= 0) return;

    const at = (el: Element | null, fraction = 0) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const target = top + r.height * fraction - vh * 0.5;
      return Math.min(1, Math.max(0, target / total));
    };
    // progress at an absolute scrollY value
    const atY = (scrollTarget: number) =>
      Math.min(1, Math.max(0, scrollTarget / total));

    // hero robot's resting spot in document coords (measured post-intro)
    const heroEl = document.getElementById("hero-robot-visual");
    let heroX = vw * 0.72;
    let heroDocY = vh * 0.55;
    let heroScale = 3.2;
    if (heroEl) {
      const r = heroEl.getBoundingClientRect();
      heroX = r.left + r.width / 2;
      heroDocY = r.top + window.scrollY + r.height / 2;
      heroScale = r.width / BASE_W || 3.2;
    }

    const story = document.getElementById("story");

    // Where the robot lives inside the full-screen brand video, as fractions
    // of the 1280x720 frame (measured from the footage): first vs last frame.
    // The video uses object-cover, so map frame coords through the crop.
    const videoEl = document.getElementById("story-video");
    let scrubStartP: number | null = null;
    let scrubEndP: number | null = null;
    let startBot = { x: vw * 0.5, y: vh * 0.5, s: 1 };
    let endBot = { x: vw * 0.6, y: vh * 0.55, s: 0.8 };
    if (story && videoEl) {
      const sr = story.getBoundingClientRect();
      const storyTop = sr.top + window.scrollY;
      scrubStartP = atY(storyTop);                  // video pins full-screen
      scrubEndP = atY(storyTop + sr.height - vh);   // video unpins
      // frame → viewport mapping: object-contain below md, object-cover above
      const cover =
        vw < 768 ? Math.min(vw / 1280, vh / 720) : Math.max(vw / 1280, vh / 720);
      const dw = 1280 * cover;
      const dh = 720 * cover;
      const ox = (vw - dw) / 2;
      const oy = (vh - dh) / 2;
      // first frame: robot centered-ish (cx .528, cy .53, width .313 of frame)
      startBot = { x: ox + dw * 0.528, y: oy + dh * 0.53, s: (dw * 0.313) / BASE_W };
      // last frame: robot sits right of the logo lockup (cx .80, cy .57, width .22)
      endBot = { x: ox + dw * 0.80, y: oy + dh * 0.57, s: (dw * 0.22) / BASE_W };
    }
    const educators = document.getElementById("features");
    const paths = document.getElementById("paths");
    const insideApp = document.getElementById("inside-app");
    const tools = document.getElementById("tools");
    const certification = document.getElementById("certification");
    const faq = document.getElementById("faq");
    const footer = document.querySelector("footer");

    // swap point: hero robot detaches after ~35% of a viewport of scrolling
    const detachP = Math.min(0.99, (vh * 0.35) / total);

    type Stop = { p: number | null; x: number; y: number; s: number; o: number };
    const stops: Stop[] = [
      // glued on top of the hero robot (hidden — hero robot is showing)
      { p: 0,                       x: heroX, y: heroDocY, s: heroScale, o: 0 },
      { p: detachP - 0.0004,        x: heroX, y: heroDocY - (detachP * total), s: heroScale, o: 0 },
      // swap: traveler takes over from the identical spot
      { p: detachP,                 x: heroX, y: heroDocY - (detachP * total), s: heroScale, o: 1 },
      // shrink and glide to Educators, right side
      { p: at(educators, 0.35),     x: vw * 0.88, y: vh * 0.30, s: 1.0, o: 1 },
      // hover above the paths detail panel
      { p: at(paths, 0.30),         x: vw * 0.90, y: vh * 0.22, s: 0.9, o: 1 },
      // hover beside the AI-mentor phone
      { p: at(insideApp, 0.45),     x: vw * 0.26, y: vh * 0.42, s: 0.95, o: 1 },
      // glide right past tools
      { p: at(tools, 0.5),          x: vw * 0.88, y: vh * 0.55, s: 0.85, o: 1 },
      // inspect the certificate
      { p: at(certification, 0.45), x: vw * 0.86, y: vh * 0.32, s: 0.95, o: 1 },
      // cross to the FAQ side
      { p: at(faq, 0.35),           x: vw * 0.10, y: vh * 0.48, s: 0.9, o: 1 },
      // fly down and land exactly on the video robot as the story canvas pins
      { p: scrubStartP,             x: startBot.x, y: startBot.y, s: startBot.s, o: 1 },
      // melt into the canvas — the video robot underneath takes over seamlessly
      { p: scrubStartP === null ? null : Math.min(1, scrubStartP + 0.012),
                                    x: startBot.x, y: startBot.y, s: startBot.s, o: 0 },
      // stay hidden while the user scrubs the story...
      { p: scrubEndP === null ? null : Math.max(0, scrubEndP - 0.012),
                                    x: endBot.x, y: endBot.y, s: endBot.s, o: 0 },
      // ...then lift off from exactly where the video leaves the robot
      { p: scrubEndP,               x: endBot.x, y: endBot.y, s: endBot.s, o: 1 },
      // dock beside the footer CTA — arrival
      { p: at(footer, 0.35),        x: vw * 0.18, y: vh * 0.52, s: 1.15, o: 1 },
      { p: 1,                       x: vw * 0.18, y: vh * 0.55, s: 1.15, o: 1 },
    ];

    // speech-bubble ranges per section
    const messages: MessageRange[] = [];
    for (const m of ROBOT_JOURNEY_MESSAGES) {
      if (m.section === "story") {
        // while flying down to land on its video self
        const start = at(story, 0);
        if (start !== null && scrubStartP !== null) {
          messages.push({ text: m.text, start, end: scrubStartP });
        }
        continue;
      }
      if (m.section === "footer") {
        const start = at(footer, 0.15);
        if (start !== null) messages.push({ text: m.text, start, end: 1.01 });
        continue;
      }
      const el = document.getElementById(m.section);
      const start = at(el, 0.15);
      const end = at(el, 0.75);
      if (start !== null && end !== null && end > start) {
        messages.push({ text: m.text, start, end });
      }
    }

    const kept = stops.filter((st): st is Stop & { p: number } => st.p !== null);
    const frames: Keyframes = { p: [], x: [], y: [], s: [], o: [], detachP, messages };
    let last = -1;
    for (const k of kept) {
      const p = Math.max(k.p, last + 0.0001);
      frames.p.push(p);
      frames.x.push(k.x);
      frames.y.push(k.y);
      frames.s.push(k.s);
      frames.o.push(k.o);
      last = p;
    }
    framesRef.current = frames.p.length >= 2 ? frames : EMPTY;
  }, []);

  useEffect(() => {
    if (reduce) return;
    // measure after layout + the hero intro settle
    measure();
    const t1 = setTimeout(measure, 1000);
    const t2 = setTimeout(measure, 3200);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, [reduce, measure]);

  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 38, damping: 21, mass: 0.9 });

  const x = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.x));
  const y = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.y));
  const scale = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.s));
  const opacity = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.o));

  // Bubble position: fixed in viewport with clamped x so it never clips off either edge
  // compact bubble on small screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const BUBBLE_W = isMobile ? 150 : 200;
  const ROBOT_H = Math.round(BASE_W * 1.159);
  const bubbleX = useTransform(x, (rx) => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    // center the bubble on the robot, then clamp to keep it within viewport
    return Math.max(12, Math.min(vw - BUBBLE_W - 12, rx - BUBBLE_W / 2));
  });
  // Position bubble above the robot's visual top: center_y - scaled_half_height - gap
  const scaledHalfH = useTransform(scale, (s) => (ROBOT_H * s) / 2);
  const bubbleY = useTransform([y, scaledHalfH], ([ry, sh]) => (ry as number) - (sh as number) - 52);

  // hero robot ↔ traveler swap + active speech bubble
  const [message, setMessage] = useState<string | null>(null);
  useMotionValueEvent(spring, "change", (v) => {
    const heroEl = document.getElementById("hero-robot-visual");
    if (heroEl) {
      if (!heroEl.style.transition) heroEl.style.transition = "opacity 0.3s ease";
      const show = v < framesRef.current.detachP;
      const target = show ? "" : "0";
      if (heroEl.style.opacity !== target) heroEl.style.opacity = target;
    }
    // speech bubble: only while the robot itself is visible
    const f = framesRef.current;
    const visible = interp(v, f.p, f.o) > 0.5;
    const active = visible ? f.messages.find((m) => v >= m.start && v <= m.end) : undefined;
    const next = active ? active.text : null;
    setMessage((prev) => (prev === next ? prev : next));
  });

  // lean into the direction of travel
  const velocity = useVelocity(scrollYProgress);
  const rotate = useSpring(useTransform(velocity, [-0.8, 0, 0.8], [-10, 0, 10]), {
    stiffness: 90,
    damping: 20,
  });

  // mirror slowly to face the direction of horizontal travel
  const flipRef = useRef(1);
  const xVelocity = useVelocity(x);
  const flipTarget = useTransform(xVelocity, (v): number => {
    // only commit to a turn on decisive movement; hold facing otherwise
    if (v < -80) flipRef.current = -1;
    else if (v > 80) flipRef.current = 1;
    return flipRef.current;
  });
  // soft spring → the robot turns around slowly instead of snapping
  const flip = useSpring(flipTarget, { stiffness: 38, damping: 14 });

  // power-up glow as it docks at the footer
  const dockGlow = useTransform(spring, (v) => {
    const p = framesRef.current.p;
    if (p.length < 3) return 0;
    const dockStart = p[p.length - 2];
    return v <= dockStart ? 0 : Math.min(1, (v - dockStart) / (1 - dockStart || 1));
  });
  const glowOpacity = useTransform(dockGlow, [0, 1], [0, 0.9]);
  const glowScale = useTransform(dockGlow, [0, 1], [0.6, 1.6]);

  if (reduce) return null;

  return (
    <>
      {/* ── Robot body ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="fixed z-40 pointer-events-none"
        style={{
          left: 0,
          top: 0,
          x,
          y,
          scale,
          opacity,
          width: BASE_W,
          height: ROBOT_H,
          marginLeft: -BASE_W / 2,
          marginTop: -ROBOT_H / 2,
        }}
      >
        {/* power-up glow burst on footer dock */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: -30,
            opacity: glowOpacity,
            scale: glowScale,
            background: "radial-gradient(circle, rgba(0,194,255,0.5), rgba(59,111,255,0.2) 55%, transparent 75%)",
            filter: "blur(12px)",
          }}
        />
        <motion.div className="w-full h-full" style={{ rotate, scaleX: flip }}>
          <div className="w-full h-full animate-float">
            <RobotLoop className="w-full h-full object-contain drop-shadow-[0_0_28px_rgba(74,158,255,0.6)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Speech bubble — viewport-clamped on all screens ── */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            aria-hidden
            className="fixed z-50 pointer-events-none"
            style={{
              left: 0,
              top: 0,
              x: bubbleX,
              y: bubbleY,
              opacity,
              width: BUBBLE_W,
            }}
            initial={{ opacity: 0, scale: 0.55, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 6 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <div
              style={{
                position: "relative",
                width: "max-content",
                maxWidth: "100%",
                margin: "0 auto",
                padding: "8px 14px",
                borderRadius: 14,
                borderBottomLeftRadius: 3,
                background: "linear-gradient(135deg, rgba(5,14,32,0.97) 0%, rgba(10,22,50,0.97) 100%)",
                border: "1px solid rgba(0,194,255,0.55)",
                boxShadow:
                  "0 0 0 1px rgba(0,194,255,0.12), 0 6px 28px rgba(0,80,220,0.45), 0 0 18px rgba(0,194,255,0.20) inset",
                fontFamily: "var(--font-body)",
                fontSize: isMobile ? 11 : 12,
                fontWeight: 600,
                lineHeight: 1.45,
                color: "#dce8f5",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              {/* pulsing neon glow */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-[14px] pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(0,194,255,0.15)",
                    "0 0 20px rgba(0,194,255,0.45)",
                    "0 0 8px rgba(0,194,255,0.15)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* cyan shimmer bar */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 12,
                  right: 12,
                  height: 1.5,
                  borderRadius: 1,
                  background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.7), transparent)",
                }}
              />
              <SpeechBubble text={message} />
              {/* tail */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 14,
                  bottom: -6,
                  width: 10,
                  height: 10,
                  background: "rgba(8,18,42,0.97)",
                  borderLeft: "1px solid rgba(0,194,255,0.55)",
                  borderBottom: "1px solid rgba(0,194,255,0.55)",
                  transform: "skewX(30deg) rotate(-6deg)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
