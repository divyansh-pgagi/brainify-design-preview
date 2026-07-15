"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { STORY_SCROLL_HINT } from "@/app/lib/constants";

/**
 * BrandStory — scroll-scrubbed video sequence.
 *
 * 120 JPG frames extracted from the brand video are drawn onto a
 * <canvas>; the frame index is bound to scroll progress through a
 * 300vh sticky section, so scrolling "plays" the video:
 * robot floats → neural brain forms → brAInify logo lockup.
 *
 * Frames are on black; `mix-blend-mode: screen` melts the black into
 * the site's dark navy background.
 */

const FRAME_COUNT = 120;
const FRAME_W = 900;
const FRAME_H = 506;

const framePath = (i: number) =>
  `/images/story/frame-${String(i + 1).padStart(3, "0")}.jpg`;

export default function BrandStory() {
  const reduce = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadStartedRef = useRef(false);
  const lastDrawnRef = useRef(-1);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const frameFloat = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // fall back to the nearest lower loaded frame while images stream in
    let i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
    while (i > 0 && !imagesRef.current[i]?.complete) i--;
    const img = imagesRef.current[i];
    if (!img?.complete || i === lastDrawnRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, FRAME_W, FRAME_H);
    ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
    lastDrawnRef.current = i;
  }, []);

  // lazy-load all frames once the section approaches the viewport
  useEffect(() => {
    if (reduce) return;
    const el = outerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || loadStartedRef.current) return;
        loadStartedRef.current = true;
        io.disconnect();
        for (let i = 0; i < FRAME_COUNT; i++) {
          const img = new Image();
          img.src = framePath(i);
          img.onload = () => {
            if (i === 0) {
              setFirstFrameReady(true);
              draw(frameFloat.get());
            }
          };
          imagesRef.current[i] = img;
        }
      },
      { rootMargin: "120% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, draw, frameFloat]);

  useMotionValueEvent(frameFloat, "change", (v) => {
    requestAnimationFrame(() => draw(v));
  });

  // Reduced motion: show the final logo frame as a static image
  if (reduce) {
    return (
      <section className="relative py-16 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={framePath(FRAME_COUNT - 1)}
          alt="brAInify — innovating learning with AI"
          width={FRAME_W}
          height={FRAME_H}
          className="w-full max-w-[1000px] h-auto"
          style={{ mixBlendMode: "screen" }}
          loading="lazy"
        />
      </section>
    );
  }

  return (
    <section ref={outerRef} className="relative" style={{ height: "300vh" }} aria-label="brAInify brand story">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={FRAME_W}
          height={FRAME_H}
          className="w-full max-w-[1100px] h-auto px-2 transition-opacity duration-700"
          style={{ mixBlendMode: "screen", opacity: firstFrameReady ? 1 : 0 }}
          aria-hidden
        />

        {/* scroll hint — fades once scrubbing starts */}
        <motion.div
          aria-hidden
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="hud-label" style={{ fontSize: 9 }}>{STORY_SCROLL_HINT}</span>
          <div className="w-5 h-8 rounded-full border border-[rgba(0,194,255,0.4)] flex justify-center pt-1.5">
            <motion.span
              className="w-1 h-1.5 rounded-full bg-[#00c2ff]"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
