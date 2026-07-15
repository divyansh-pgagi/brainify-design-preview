"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

type Path = (typeof PATHS)[number];

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

/* ── Single path card (shared between pinned + stacked layouts) ── */
function PathCard({
  path,
  index,
  onExplore,
}: {
  path: Path;
  index: number;
  onExplore: () => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl flex flex-col gap-5 shrink-0"
      style={{
        width: "min(85vw, 620px)",
        minHeight: 420,
        padding: "36px 36px 28px",
        background: "linear-gradient(135deg, rgba(7,28,70,0.95) 0%, rgba(5,18,45,0.98) 100%)",
        border: "1.5px solid rgba(74,158,255,0.3)",
        boxShadow: "0 0 40px rgba(74,158,255,0.08), inset 0 0 60px rgba(0,50,150,0.1)",
      }}
    >
      {/* teal glow inside panel */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 400, height: 400, top: -100, right: -100, background: "radial-gradient(ellipse, rgba(0,180,200,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Falling data-stream backdrop */}
      <DataStream columns={10} color="rgba(74,158,255,0.18)" />

      <div className="relative z-10 flex flex-col h-full gap-5">
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
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.5px", color: "#c7d2dc", lineHeight: 1.2 }}>
          {path.name}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, lineHeight: "25px", color: "rgba(199,210,220,0.65)" }}>
          {path.description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2.5">
          {path.bullets.map((b) => (
            <span
              key={b}
              className="flex items-center gap-2"
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                border: "1px solid rgba(74,158,255,0.25)",
                background: "rgba(74,158,255,0.06)",
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
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
              {String(index + 1).padStart(2, "0")}
            </span>
            {" / 06"}
          </p>

          <button
            onClick={onExplore}
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
      </div>
    </div>
  );
}

/* ── Section header (shared) ─────────────────────────────────── */
function PathsHeader() {
  return (
    <div>
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
  );
}

export default function LearningPaths() {
  const reduce = useReducedMotion();
  const [videoPath, setVideoPath] = useState<Path | null>(null);

  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  // measure how far the track must translate to show the last card
  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    setMaxShift(Math.max(0, track.scrollWidth - viewport.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const progressScale = scrollYProgress;

  /* Reduced motion → simple vertical stack, no pinning */
  if (reduce) {
    return (
      <>
        <section id="paths" className="relative overflow-hidden" style={{ background: "transparent" }}>
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-24 flex flex-col gap-10">
            <PathsHeader />
            <div className="flex flex-col items-center gap-6">
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

  return (
    <>
      {/* Tall scroll zone — vertical scroll drives horizontal card travel */}
      <section
        id="paths"
        ref={outerRef}
        className="relative"
        style={{ height: `${PATHS.length * 55}vh`, background: "transparent" }}
      >
        <div
          ref={viewportRef}
          className="sticky top-0 h-screen flex flex-col justify-center gap-8 overflow-hidden"
        >
          {/* ambient glow */}
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 500, top: "20%", right: -100, background: "radial-gradient(ellipse, rgba(0,80,200,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px]"
          >
            <PathsHeader />
          </motion.div>

          {/* Horizontal track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="relative z-10 flex gap-6 items-stretch px-6 md:px-[80px] w-max"
          >
            {PATHS.map((p, i) => (
              <PathCard key={p.id} path={p} index={i} onExplore={() => setVideoPath(p)} />
            ))}
          </motion.div>

          {/* Scroll progress rail */}
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px]">
            <div className="h-[3px] w-full max-w-[360px] rounded-full overflow-hidden" style={{ background: "rgba(74,158,255,0.15)" }}>
              <motion.div
                className="h-full rounded-full origin-left"
                style={{
                  scaleX: progressScale,
                  background: "linear-gradient(90deg, #3b6fff, #00c2ff)",
                  boxShadow: "0 0 10px rgba(0,194,255,0.6)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {videoPath && (
        <VideoModal url={videoPath.videoUrl} name={videoPath.name} onClose={() => setVideoPath(null)} />
      )}
    </>
  );
}
