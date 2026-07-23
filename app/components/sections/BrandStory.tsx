"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

/**
 * BrandStory — full-screen brand video finale.
 *
 * The video (robot → neural brain → brAInify logo lockup) covers the whole
 * viewport, pinned for one extra screen of scroll. The travelling robot from
 * RobotJourney dissolves into the video's opening frame (position-matched),
 * and playback starts right after — so the robot appears to enter the film.
 * Scrolling away pauses it; scrolling back above the section rewinds it so
 * the entrance always replays cleanly.
 */
export default function BrandStory() {
  const reduce = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const vid = videoRef.current;
    if (!vid || reduce) return;
    if (v > 0.04 && v < 0.98) {
      // robot has dissolved in — roll the film
      if (vid.paused) vid.play().catch(() => {});
    } else {
      if (!vid.paused) vid.pause();
      // fully scrolled back above the section → rewind for a clean replay
      if (v <= 0.02 && vid.currentTime !== 0) vid.currentTime = 0;
    }
  });

  return (
    <section
      id="story"
      ref={outerRef}
      className="relative h-[130vh] md:h-[200vh]"
      aria-label="brAInify brand story"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <video
          id="story-video"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/brand-story.mp4"
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-center"
          style={{ mixBlendMode: "screen" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
