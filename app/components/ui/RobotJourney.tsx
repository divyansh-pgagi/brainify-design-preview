"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import RobotLoop from "./RobotLoop";

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

type Keyframes = {
  p: number[];
  x: number[];
  y: number[];
  s: number[];
  o: number[];
  detachP: number; // progress where hero robot ↔ traveler swap happens
};

const EMPTY: Keyframes = { p: [0, 1], x: [0, 0], y: [0, 0], s: [1, 1], o: [0, 0], detachP: 0 };

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

    // Where the robot lives inside the scrub video's canvas, as fractions of
    // the frame (measured from the actual footage): first frame vs last frame.
    // Used to land the traveler exactly on its video self, and lift off from
    // exactly where the video leaves it.
    const canvasEl = document.getElementById("story-canvas");
    let scrubStartP: number | null = null;
    let scrubEndP: number | null = null;
    let startBot = { x: vw * 0.5, y: vh * 0.5, s: 1 };
    let endBot = { x: vw * 0.6, y: vh * 0.55, s: 0.8 };
    if (story && canvasEl) {
      const sr = story.getBoundingClientRect();
      const storyTop = sr.top + window.scrollY;
      scrubStartP = atY(storyTop);                  // canvas pins
      scrubEndP = atY(storyTop + sr.height - vh);   // canvas unpins
      const cw = canvasEl.getBoundingClientRect().width;
      const ch = cw * (506 / 900);
      const cLeft = (vw - cw) / 2;
      const cTop = (vh - ch) / 2; // canvas is vertically centered while pinned
      // first frame: robot centered-ish (cx .528, cy .53, width .313 of frame)
      startBot = { x: cLeft + cw * 0.528, y: cTop + ch * 0.53, s: (cw * 0.313) / BASE_W };
      // last frame: robot sits right of the logo lockup (cx .80, cy .57, width .22)
      endBot = { x: cLeft + cw * 0.80, y: cTop + ch * 0.57, s: (cw * 0.22) / BASE_W };
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

    const kept = stops.filter((st): st is Stop & { p: number } => st.p !== null);
    const frames: Keyframes = { p: [], x: [], y: [], s: [], o: [], detachP };
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
  const spring = useSpring(scrollYProgress, { stiffness: 55, damping: 17, mass: 0.6 });

  const x = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.x));
  const y = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.y));
  const scale = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.s));
  const opacity = useTransform(spring, (v) => interp(v, framesRef.current.p, framesRef.current.o));

  // hero robot ↔ traveler swap: hide/show the hero robot around the detach point
  useMotionValueEvent(spring, "change", (v) => {
    const heroEl = document.getElementById("hero-robot-visual");
    if (!heroEl) return;
    if (!heroEl.style.transition) heroEl.style.transition = "opacity 0.3s ease";
    const show = v < framesRef.current.detachP;
    const target = show ? "" : "0";
    if (heroEl.style.opacity !== target) heroEl.style.opacity = target;
  });

  // lean into the direction of travel
  const velocity = useVelocity(scrollYProgress);
  const rotate = useSpring(useTransform(velocity, [-0.8, 0, 0.8], [-14, 0, 14]), {
    stiffness: 180,
    damping: 22,
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
    <motion.div
      aria-hidden
      className="hidden lg:block fixed z-40 pointer-events-none"
      style={{
        left: 0,
        top: 0,
        x,
        y,
        scale,
        opacity,
        width: BASE_W,
        height: Math.round(BASE_W * 1.159),
        marginLeft: -BASE_W / 2,
        marginTop: -Math.round(BASE_W * 1.159) / 2,
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
  );
}
