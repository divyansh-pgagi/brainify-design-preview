"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "@/app/components/ui/CountUp";
import {
  GLOBAL_REACH_BADGE,
  GLOBAL_REACH_HEADING_PRE,
  GLOBAL_REACH_HEADING_HIGHLIGHT,
  GLOBAL_REACH_HEADING_POST,
  GLOBAL_REACH_STATS,
} from "@/app/lib/constants";

/**
 * GlobalReach — full-bleed world map with glowing connection arcs,
 * headline on top and four count-up stats along the bottom.
 * Replaces the old Languages + Stats sections.
 */
export default function GlobalReach() {
  return (
    <section id="global-reach" className="relative overflow-hidden">
      {/* world map backdrop */}
      <div className="relative w-full" style={{ minHeight: "min(92vh, 780px)" }}>
        <Image
          src="/images/world-map.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          aria-hidden
        />
        {/* blend edges into the page background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #050d1a 0%, transparent 18%, transparent 82%, #050d1a 100%)",
          }}
        />

        {/* heading */}
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center gap-4 pt-10 md:pt-14 px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full glass neon-border"
            style={{
              padding: "5px 16px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              color: "#9ec8f5",
            }}
          >
            {GLOBAL_REACH_BADGE}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              color: "#e8eef6",
            }}
          >
            {GLOBAL_REACH_HEADING_PRE}
            <span className="gradient-text text-glow-blue">{GLOBAL_REACH_HEADING_HIGHLIGHT}</span>
            <br />
            {GLOBAL_REACH_HEADING_POST}
          </motion.h2>
        </div>

        {/* stats row */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-14 px-6 md:px-[80px]">
          <div className="w-full max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {GLOBAL_REACH_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col gap-1"
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#8fb8ff",
                    textShadow: "0 0 30px rgba(74,158,255,0.45)",
                  }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
                    fontWeight: 500,
                    color: "#e8eef6",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
