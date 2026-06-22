"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import DecodeText from "@/app/components/ui/DecodeText";
import DataStream from "@/app/components/ui/DataStream";

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
    pathImage: "/learning-path/ai-path.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/af584818-a9ec-4d1c-890d-4462e9d93aca?language=en",
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
    pathImage: "/learning-path/content-creator.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/b96ca1ea-a854-4255-bc96-1a5a2e192029?language=en",
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
    pathImage: "/learning-path/digital-marketing.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/f1c4f685-5f92-4124-abe5-1884e44f87bd?language=en",
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
    pathImage: "/learning-path/financial-literacy.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/eefad282-400b-4c2b-aa27-6e96fc5f6b00?language=en",
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
    pathImage: "/learning-path/digital-currency.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/9929b3b5-d6e6-4cb9-8faf-39ef531a3099?language=en",
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
    pathImage: "/learning-path/youth.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/83152098-b1fe-4359-bdc9-275f76f38f8f?language=en",
  },
] as const;

function VideoModal({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(3,8,20,0.88)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col"
        style={{ maxWidth: 900 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-5 py-3 rounded-t-2xl"
          style={{ background: "rgba(7,28,70,0.98)", border: "1.5px solid rgba(74,158,255,0.3)", borderBottom: "none" }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc" }}>
            {name}
          </p>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-colors hover:bg-white/20"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}
            aria-label="Close video"
          >
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Video iframe */}
        <div
          className="relative w-full rounded-b-2xl overflow-hidden"
          style={{ aspectRatio: "16/9", border: "1.5px solid rgba(74,158,255,0.3)", borderTop: "none", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}
        >
          <iframe
            src={url}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none", display: "block" }}
          />
        </div>

        {/* Dismiss hint */}
        <p className="text-center mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(199,210,220,0.3)" }}>
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}

export default function LearningPaths() {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const path = PATHS[active];

  return (
    <>
      <section id="paths" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
        {/* ambient glow */}
        <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 500, top: "20%", right: -100, background: "radial-gradient(ellipse, rgba(0,80,200,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
              Courses &amp; Paths
            </p>
            <DecodeText
              as="h2"
              text="Six learning paths. Which one is yours?"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 12, lineHeight: 1.15 }}
            />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "rgba(199,210,220,0.65)", maxWidth: 500 }}>
              Each path is a complete career arc — designed to take you from beginner to a real, monetizable skill, with project-led learning at every step.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-4">

            {/* LEFT — path selector list */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex flex-col gap-2 lg:w-[340px] shrink-0"
            >
              {PATHS.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => { setActive(i); setVideoOpen(false); }}
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
                  {/* Thumbnail */}
                  <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 36, height: 36 }}>
                    <Image
                      src={p.pathImage}
                      alt={p.name}
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
                </motion.button>
              ))}
            </motion.div>

            {/* RIGHT — detail panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
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

              {/* Falling data-stream backdrop */}
              <DataStream columns={12} color="rgba(74,158,255,0.22)" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col h-full gap-6"
                >
                  {/* educator + audience tag */}
                <div className="flex items-center gap-3">
                  <div className="relative rounded-xl overflow-hidden shrink-0" style={{ width: 52, height: 52, border: "1.5px solid rgba(74,158,255,0.3)" }}>
                    <Image
                      src={path.pathImage}
                      alt={path.name}
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

                {/* Footer row: counter + explore button */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "rgba(199,210,220,0.35)", letterSpacing: "1px" }}>
                    PATH ·{" "}
                    <span style={{ color: "#4a9eff", fontWeight: 700 }}>
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    {" / 06"}
                  </p>

                  {/* Explore button */}
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="flex items-center gap-2 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      padding: "10px 20px",
                      background: "linear-gradient(135deg, #3b6fff 0%, #00c2ff 100%)",
                      boxShadow: "0 0 20px rgba(59,111,255,0.35)",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.3px",
                    }}
                  >
                    <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, flexShrink: 0 }} fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
                      <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="white" />
                    </svg>
                    Explore Path
                  </button>
                </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <VideoModal
          url={path.videoUrl}
          name={path.name}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </>
  );
}
