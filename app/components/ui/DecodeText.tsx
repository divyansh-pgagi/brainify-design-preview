"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*<>/\\=+-";

interface DecodeTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** total animation length in frames (~60fps); higher = slower decode */
  durationFrames?: number;
}

/**
 * Robotic "decode" reveal — characters scramble through random glyphs and
 * resolve left-to-right when the element scrolls into view, like a terminal
 * locking onto a signal.
 *
 * SSR-safe: renders the real text on the server and only scrambles after mount
 * inside an effect (no hydration mismatch). A hidden in-flow copy of the final
 * text reserves the layout so the proportional heading font never reflows /
 * jitters while decoding. The real text stays in the accessible tree for SR/SEO;
 * the scramble layer is aria-hidden. Disabled under prefers-reduced-motion.
 */
export default function DecodeText({
  text,
  as: Tag = "span",
  className,
  style,
  durationFrames = 26,
}: DecodeTextProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(text);
  const [animating, setAnimating] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = elRef.current;
    if (reduce || !el) return;

    let raf = 0;
    let frame = 0;
    let started = false;

    const scramble = () => {
      // Constant-duration reveal: characters lock left-to-right, finishing in
      // ~durationFrames regardless of text length.
      const revealed = (frame / durationFrames) * text.length;
      let out = "";
      let allDone = true;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") {
          out += ch;
          continue;
        }
        if (i < revealed) {
          out += ch;
        } else {
          allDone = false;
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      frame++;
      if (allDone) {
        setDisplay(text);
        setAnimating(false);
        done.current = true;
        return;
      }
      raf = requestAnimationFrame(scramble);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started && !done.current) {
          started = true;
          frame = 0;
          setAnimating(true);
          raf = requestAnimationFrame(scramble);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text, durationFrames]);

  return (
    <Tag ref={elRef} className={className} style={{ ...style, position: "relative" }}>
      {/* In-flow copy reserves final layout + carries the accessible text */}
      <span style={{ visibility: animating ? "hidden" : "visible" }}>{text}</span>
      {/* Scramble overlay — decorative only */}
      {animating && (
        <span aria-hidden style={{ position: "absolute", inset: 0 }}>
          {display}
        </span>
      )}
    </Tag>
  );
}
