"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PATHS = [
  {
    id: 1,
    name: "AI Path",
    audience: "Builders & Operators",
    audienceColor: "#4a9eff",
    educator: "Ryan",
    description:
      "Understand, use, and build with AI. Automate your work, design smarter workflows, and turn AI fluency into real opportunity.",
    bullets: ["Ship real AI automations", "Turn fluency into income", "Design smarter workflows"],
    pathImage: "/learning-path/ai-path.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/af584818-a9ec-4d1c-890d-4462e9d93aca?language=en",
  },
  {
    id: 2,
    name: "Content Creator Path",
    audience: "Creators & Founders",
    audienceColor: "#f472b6",
    educator: "Sarah",
    description:
      "Master content strategy and creation. Build an audience, monetize your expertise, and grow a creator business from scratch.",
    bullets: ["Build a content engine", "Grow & monetize an audience", "Launch a creator business"],
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
    pathImage: "/learning-path/youth.png",
    videoUrl: "https://share.synthesia.io/embeds/videos/83152098-b1fe-4359-bdc9-275f76f38f8f?language=en",
  },
] as const;

type Path = (typeof PATHS)[number];

/* ── Video modal ──────────────────────────────────────────────── */
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8" style={{ background: "rgba(3,8,20,0.88)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="relative w-full flex flex-col" style={{ maxWidth: 900 }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 rounded-t-2xl" style={{ background: "rgba(7,28,70,0.98)", border: "1.5px solid rgba(74,158,255,0.3)", borderBottom: "none" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc" }}>{name}</p>
          <button onClick={onClose} className="flex items-center justify-center rounded-full transition-colors hover:bg-white/20" style={{ width: 32, height: 32, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }} aria-label="Close video">
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
        <div className="relative w-full rounded-b-2xl overflow-hidden" style={{ aspectRatio: "16/9", border: "1.5px solid rgba(74,158,255,0.3)", borderTop: "none", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}>
          <iframe src={url} title={name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen className="w-full h-full" style={{ border: "none", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Course card ──────────────────────────────────────────────── */
function PathCard({ path, index, onExplore }: { path: Path; index: number; onExplore: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden h-full"
      style={{
        border: "1px solid rgba(74,158,255,0.28)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
      }}
    >
      {/* orbital scene card background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/learning-path/paths-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 90vw, 380px"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* darken so text + thumbnail stay readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(8,18,46,0.82) 0%, rgba(5,12,32,0.9) 100%)" }} />
      </div>

      {/* thumbnail */}
      <div className="relative z-10 m-3 rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={path.pathImage}
          alt={path.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 90vw, 380px"
          loading="lazy"
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(6,15,40,0.55) 100%)" }} />
      </div>

      {/* body */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pb-6 pt-1">
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 21, fontWeight: 800, color: "#eef3fb", lineHeight: 1.2 }}>
          {path.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: path.audienceColor, marginTop: 4 }}>
          {path.audience}
        </p>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: "rgba(199,210,220,0.7)", marginTop: 12 }}>
          {path.description}
        </p>

        <ul className="flex flex-col gap-2.5 mt-5">
          {path.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(210,220,235,0.85)" }}>
              <svg viewBox="0 0 14 12" width="14" height="12" fill="none" aria-hidden className="shrink-0">
                <path d="M1.5 6.5l3.5 3.5L12.5 2" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        <button
          onClick={onExplore}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{ padding: "12px 20px", background: "linear-gradient(135deg, rgba(59,111,255,0.9) 0%, rgba(0,140,255,0.75) 100%)", border: "1px solid rgba(120,180,255,0.4)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#fff" }}
        >
          Explore Path <span aria-hidden>→</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function LearningPaths() {
  const [videoPath, setVideoPath] = useState<Path | null>(null);

  return (
    <>
      <section id="paths" className="relative overflow-hidden" style={{ background: "transparent" }}>
        <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 500, top: "10%", left: "-6%", background: "radial-gradient(ellipse, rgba(0,90,220,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-20 md:py-24">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="max-w-[560px]"
            >
              <span className="inline-flex items-center rounded-full glass neon-border" style={{ padding: "6px 16px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#9ec8f5" }}>
                Build For Different Goals
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.9rem, 4vw, 2.9rem)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.12, color: "#eef3fb", marginTop: 18 }}>
                Explore Courses That Move{" "}
                <span className="gradient-text text-glow-blue">You Forward</span>
              </h2>
            </motion.div>

            {/* header robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block shrink-0"
            >
              <div className="animate-float">
                <Image
                  src="/learning-path/robot.png"
                  alt=""
                  width={260}
                  height={200}
                  className="w-[240px] lg:w-[300px] h-auto object-contain drop-shadow-[0_0_40px_rgba(74,158,255,0.5)]"
                  aria-hidden
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Card grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATHS.map((p, i) => (
              <PathCard key={p.id} path={p} index={i} onExplore={() => setVideoPath(p)} />
            ))}
          </div>
        </div>
      </section>

      {videoPath && (
        <VideoModal url={videoPath.videoUrl} name={videoPath.name} onClose={() => setVideoPath(null)} />
      )}
    </>
  );
}
