"use client";

import { useState } from "react";
import Image from "next/image";

const PATHS = [
  {
    id: 1,
    name: "AI Path",
    audience: "Builders & Operators",
    audienceColor: "#4a9eff",
    educator: "Ryan",
    description:
      "Understand, use, and build with AI. Automate your work, design smarter workflows, and turn AI fluency into real opportunity.",
    bullets: ["Ship real AI automations", "Design smarter workflows", "Turn fluency into income"],
    image: "/images/educators/ryan.png",
    pathImage: "/learning path/AI Path.png",
  },
  {
    id: 2,
    name: "Content Creator Path",
    audience: "Creators & Founders",
    audienceColor: "#c084fc",
    educator: "Sarah",
    description:
      "Master content strategy and creation. Build an audience, monetize your expertise, and grow a creator business from scratch.",
    bullets: ["Build a content engine", "Grow & monetize an audience", "Launch a creator business"],
    image: "/images/educators/sarah.png",
    pathImage: "/learning path/content creator.png",
  },
  {
    id: 3,
    name: "Digital Marketing Path",
    audience: "Marketers & Growth",
    audienceColor: "#34d399",
    educator: "Adam",
    description:
      "Learn modern digital marketing from paid ads to SEO. Drive real growth for businesses and build a marketable skill set.",
    bullets: ["Run paid ad campaigns", "Master SEO & content", "Measure & scale growth"],
    image: "/images/educators/adam.png",
    pathImage: "/learning path/digital marketing.png",
  },
  {
    id: 4,
    name: "Financial Intelligence Path",
    audience: "Wealth-Builders",
    audienceColor: "#fbbf24",
    educator: "Daniel",
    description:
      "Understand money, investing, and building wealth. Go from financial basics to advanced strategies with real-world application.",
    bullets: ["Understand investing basics", "Build a wealth strategy", "Make money work for you"],
    image: "/images/educators/daniel.png",
    pathImage: "/learning path/Financial literacy.png",
  },
  {
    id: 5,
    name: "Digital Economy Path",
    audience: "On-Chain Natives",
    audienceColor: "#f97316",
    educator: "Steve",
    description:
      "Navigate Web3, crypto, and the on-chain economy. Learn to build, invest, and operate in the decentralised digital world.",
    bullets: ["Understand Web3 & crypto", "Build on-chain businesses", "Navigate DeFi & NFTs"],
    image: "/images/educators/steve.png",
    pathImage: "/learning path/digital currency.png",
  },
  {
    id: 6,
    name: "AI Youth Path",
    audience: "Teens & Parents",
    audienceColor: "#22d3ee",
    educator: "Luke",
    description:
      "Designed for teens aged 13–18. Fun, project-based AI education that builds real skills and confidence for the future.",
    bullets: ["Learn AI without jargon", "Build first AI projects", "Future-proof your skills"],
    image: "/images/educators/luke.png",
    pathImage: "/learning path/youth.png",
  },
] as const;

export default function LearningPaths() {
  const [active, setActive] = useState(0);
  const path = PATHS[active];

  return (
    <section id="paths" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      {/* ambient glow */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 500, top: "20%", right: -100, background: "radial-gradient(ellipse, rgba(0,80,200,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-24">

        {/* Header */}
        <div className="mb-10">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
            Courses &amp; Paths
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 12, lineHeight: 1.15 }}>
            Six learning paths. Which one is yours?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "rgba(199,210,220,0.65)", maxWidth: 500 }}>
            Each path is a complete career arc — designed to take you from beginner to a real, monetizable skill, with project-led learning at every step.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT — path selector list */}
          <div className="flex flex-col gap-2 lg:w-[340px] shrink-0">
            {PATHS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="flex items-center gap-3 rounded-xl text-left transition-all duration-200 w-full"
                style={{
                  padding: "14px 16px",
                  background: active === i
                    ? "linear-gradient(135deg, rgba(10,40,90,0.95) 0%, rgba(7,25,60,0.95) 100%)"
                    : "linear-gradient(135deg, rgba(13,31,64,0.6) 0%, rgba(9,20,40,0.6) 100%)",
                  border: active === i
                    ? "1.5px solid rgba(74,158,255,0.5)"
                    : "1.5px solid rgba(255,255,255,0.07)",
                  boxShadow: active === i ? "0 0 20px rgba(74,158,255,0.12)" : "none",
                }}
              >
                {/* Avatar */}
                <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 36, height: 36 }}>
                  <Image
                    src={p.image}
                    alt={p.educator}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc", lineHeight: 1.3 }}>
                    {p.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: p.audienceColor, letterSpacing: "1.5px", textTransform: "uppercase", lineHeight: 1.4 }}>
                    {p.audience}
                  </p>
                </div>

                {/* Arrow */}
                <svg viewBox="0 0 8 14" className="shrink-0" style={{ width: 8, height: 14, opacity: active === i ? 1 : 0.35 }} fill="none" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M1 1l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>

          {/* RIGHT — detail panel */}
          <div
            className="flex-1 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(7,28,70,0.95) 0%, rgba(5,18,45,0.98) 100%)",
              border: "1.5px solid rgba(74,158,255,0.3)",
              boxShadow: "0 0 40px rgba(74,158,255,0.08), inset 0 0 60px rgba(0,50,150,0.1)",
              minHeight: 420,
              padding: "40px 40px 32px",
            }}
          >
            {/* teal glow inside panel */}
            <div aria-hidden className="absolute pointer-events-none" style={{ width: 400, height: 400, top: -100, right: -100, background: "radial-gradient(ellipse, rgba(0,180,200,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

            <div className="relative z-10 flex flex-col h-full gap-6">
              {/* educator + audience tag */}
              <div className="flex items-center gap-3">
                <div className="relative rounded-xl overflow-hidden shrink-0" style={{ width: 52, height: 52, border: "1.5px solid rgba(74,158,255,0.3)" }}>
                  <Image
                    src={path.image}
                    alt={path.educator}
                    width={52}
                    height={52}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: path.audienceColor }}>
                  {path.audience} · with {path.educator}
                </p>
              </div>

              {/* Path name */}
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.5px", color: "#c7d2dc", lineHeight: 1.2 }}>
                {path.name}
              </h3>

              {/* Description */}
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "rgba(199,210,220,0.65)", maxWidth: 520 }}>
                {path.description}
              </p>

              {/* Path image */}
              <div className="relative w-full rounded-xl overflow-hidden" style={{ border: "1px solid rgba(74,158,255,0.15)" }}>
                <Image
                  src={path.pathImage}
                  alt={`${path.name} preview`}
                  width={800}
                  height={420}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3">
                {path.bullets.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-2"
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      border: "1px solid rgba(74,158,255,0.25)",
                      background: "rgba(74,158,255,0.06)",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "rgba(199,210,220,0.8)",
                    }}
                  >
                    <svg viewBox="0 0 12 10" style={{ width: 12, height: 10, flexShrink: 0 }} fill="none" aria-hidden>
                      <path d="M1 5l3.5 3.5L11 1" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>

              {/* Path counter */}
              <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "rgba(199,210,220,0.35)", letterSpacing: "1px" }}>
                  PATH ·{" "}
                  <span style={{ color: "#4a9eff", fontWeight: 700 }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  {" / 06"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
