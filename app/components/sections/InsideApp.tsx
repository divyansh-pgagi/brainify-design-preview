"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { INSIDE_APP_CHAT } from "@/app/lib/constants";

const LEFT_FEATURES = [
  {
    title: "Track your progress",
    desc: "Units, chapters, and a clear 0–100% path.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#4a9eff" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Lessons + simulations",
    desc: "Learn the idea, then practice it live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#4a9eff" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 9l5 2.5-5 2.5V9z" fill="#4a9eff" />
      </svg>
    ),
  },
  {
    title: "XP & streaks",
    desc: "Daily wins that compound into real skill.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.15)" />
      </svg>
    ),
  },
] as const;

const RIGHT_FEATURES = [
  {
    title: "AI mentor",
    desc: "A 24/7 coach that adapts to your pace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <circle cx="12" cy="8" r="3" stroke="#4a9eff" strokeWidth="1.5" />
        <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="19" cy="6" r="3" fill="rgba(74,158,255,0.2)" stroke="#4a9eff" strokeWidth="1" />
        <path d="M18 6h2M19 5v2" stroke="#4a9eff" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Lab",
    desc: "Build deployable projects with real tools.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Certification",
    desc: "Proof of work, backed by real builds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="#4a9eff" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(74,158,255,0.1)" />
      </svg>
    ),
  },
] as const;

function FeatureItem({ title, desc, icon, align }: { title: string; desc: string; icon: React.ReactNode; align: "left" | "right" }) {
  return (
    <div className={`flex items-start gap-3 ${align === "right" ? "flex-row" : "flex-row-reverse md:flex-row"}`}>
      {/* icon bubble */}
      <div
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{ width: 44, height: 44, background: "rgba(74,158,255,0.08)", border: "1px solid rgba(74,158,255,0.2)" }}
      >
        {icon}
      </div>
      <div className={align === "left" ? "text-right md:text-left" : "text-left"}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#c7d2dc", lineHeight: 1.3 }}>{title}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 400, color: "rgba(199,210,220,0.5)", lineHeight: 1.5, marginTop: 2 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── Chat bubble ─────────────────────────────────────────────── */
function ChatBubble({ from, text }: { from: string; text: string }) {
  if (from === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="self-center flex items-center gap-1.5 rounded-full"
        style={{
          padding: "5px 14px",
          background: "rgba(251,191,36,0.1)",
          border: "1px solid rgba(251,191,36,0.35)",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 700,
          color: "#fbbf24",
          letterSpacing: "0.5px",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12 }} aria-hidden>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" fill="rgba(251,191,36,0.3)" />
        </svg>
        {text}
      </motion.div>
    );
  }

  const isUser = from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={`max-w-[85%] ${isUser ? "self-end" : "self-start"}`}
      style={{
        padding: "9px 13px",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        background: isUser
          ? "linear-gradient(135deg, #3b6fff 0%, #2a5ae0 100%)"
          : "rgba(255,255,255,0.07)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.09)",
        boxShadow: isUser ? "0 4px 16px rgba(59,111,255,0.35)" : "none",
        fontFamily: "var(--font-body)",
        fontSize: 12.5,
        lineHeight: 1.45,
        color: isUser ? "#fff" : "rgba(199,210,220,0.9)",
      }}
    >
      {text}
    </motion.div>
  );
}

/* ── Typing indicator ────────────────────────────────────────── */
function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="self-start flex items-center gap-1 rounded-2xl"
      style={{ padding: "10px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ width: 5, height: 5, background: "rgba(199,210,220,0.7)" }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

/* ── Phone with scroll-driven AI-mentor chat ─────────────────── */
function ChatPhone({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const total = INSIDE_APP_CHAT.length;

  // progress through the section drives how many messages are visible
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.85"],
  });
  const [visible, setVisible] = useState(reduce ? total : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    // messages appear one by one across the first 90% of the section
    setVisible(Math.min(total, Math.floor(v * (total + 1) * 1.1)));
  });

  const next = INSIDE_APP_CHAT[visible];
  const showTyping = !reduce && visible < total && next?.from === "mentor";

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        width: 264,
        height: 540,
        borderRadius: 36,
        background: "linear-gradient(160deg, #0a1830 0%, #060f20 100%)",
        border: "1.5px solid rgba(74,158,255,0.35)",
        boxShadow: "0 40px 80px rgba(0,50,180,0.5), inset 0 0 40px rgba(0,50,150,0.12)",
      }}
    >
      {/* notch */}
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-2.5 rounded-full" style={{ width: 84, height: 18, background: "#03060e" }} />

      {/* header */}
      <div className="flex items-center gap-2.5 px-4 pb-3" style={{ paddingTop: 38, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="relative shrink-0">
          <Image src="/images/ai-robot.png" alt="" width={34} height={34} className="w-[34px] h-auto object-contain" loading="lazy" aria-hidden />
          <span className="absolute -bottom-0.5 -right-0.5 rounded-full" style={{ width: 9, height: 9, background: "#1bd79d", border: "2px solid #060f20" }} />
        </div>
        <div className="leading-tight">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, color: "#c7d2dc" }}>AI Mentor</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#1bd79d" }}>online</p>
        </div>
        <svg viewBox="0 0 24 24" fill="none" className="ml-auto w-4 h-4" style={{ opacity: 0.4 }} aria-hidden>
          <circle cx="5" cy="12" r="1.6" fill="#c7d2dc" /><circle cx="12" cy="12" r="1.6" fill="#c7d2dc" /><circle cx="19" cy="12" r="1.6" fill="#c7d2dc" />
        </svg>
      </div>

      {/* messages */}
      <div className="flex-1 flex flex-col justify-end gap-2.5 px-3.5 py-4 overflow-hidden">
        <AnimatePresence initial={false}>
          {INSIDE_APP_CHAT.slice(0, visible).map((m, i) => (
            <ChatBubble key={i} from={m.from} text={m.text} />
          ))}
          {showTyping && <TypingDots key="typing" />}
        </AnimatePresence>
      </div>

      {/* input bar */}
      <div className="px-3.5 pb-4">
        <div
          className="flex items-center gap-2 rounded-full px-4"
          style={{ height: 40, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(199,210,220,0.4)" }}>Ask anything…</span>
          <span
            className="ml-auto flex items-center justify-center rounded-full shrink-0"
            style={{ width: 26, height: 26, background: "linear-gradient(135deg, #3b6fff, #00c2ff)" }}
          >
            <svg viewBox="0 0 14 14" style={{ width: 11, height: 11 }} fill="none" aria-hidden>
              <path d="M7 11V3M3.5 6.5L7 3l3.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InsideApp() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="inside-app" className="relative overflow-hidden" style={{ background: "transparent" }}>
      {/* ambient glow */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,80,200,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-24">

        {/* Header */}
        <div className="mb-16">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
            Inside the app
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 12, lineHeight: 1.15 }}>
            A learning ecosystem
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "rgba(199,210,220,0.65)", maxWidth: 460 }}>
            Project-led lessons, gamified progress, XP, and a mentor —{" "}
            <br className="hidden md:block" />
            built in so you actually finish.
          </p>
        </div>

        {/* Three-column: features | phone | features */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-6 lg:gap-12">

          {/* LEFT features */}
          <div className="flex flex-col gap-8 flex-1">
            {LEFT_FEATURES.map((f) => (
              <FeatureItem key={f.title} title={f.title} desc={f.desc} icon={f.icon} align="left" />
            ))}
          </div>

          {/* CENTER — live AI-mentor chat phone */}
          <div className="flex justify-center shrink-0" style={{ width: 280 }}>
            <ChatPhone sectionRef={sectionRef} />
          </div>

          {/* RIGHT features */}
          <div className="flex flex-col gap-8 flex-1">
            {RIGHT_FEATURES.map((f) => (
              <FeatureItem key={f.title} title={f.title} desc={f.desc} icon={f.icon} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
