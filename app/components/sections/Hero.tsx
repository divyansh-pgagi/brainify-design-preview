"use client";

import Image from "next/image";
import {
  HERO_BADGE_TEXT,
  HERO_SUBHEADING,
  HERO_DOWNLOAD_LABEL,
  HERO_CTA_LINK,
  HERO_TRUST_BADGES,
} from "@/app/lib/constants";

/* ── App Store Badge ─────────────────────────────────────────── */
function AppStoreBadge({ store }: { store: "apple" | "google" }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:brightness-110"
      style={{
        background: "rgba(246,243,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        minWidth: 148,
      }}
    >
      {store === "apple" ? (
        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#c7d2dc" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden>
          <path fill="#00C4FF" d="M3.5 2.3 13.7 12 3.5 21.7a1.5 1.5 0 0 1-.5-1.1V3.4c0-.43.18-.82.5-1.1z" />
          <path fill="#00F076" d="m13.7 12 3.1-3.1 3.5 2a1 1 0 0 1 0 2.2l-3.5 2L13.7 12z" />
          <path fill="#FF3D44" d="m13.7 12-3.1 3.1L3.5 21.7l10.2-9.7z" />
          <path fill="#FFBC00" d="M3.5 2.3 10.6 9 13.7 12 3.5 2.3z" />
        </svg>
      )}
      <div className="flex flex-col leading-tight">
        <span style={{ fontSize: 10, color: "rgba(199,210,220,0.5)", fontFamily: "var(--font-body)" }}>
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span style={{ fontSize: 13, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </div>
    </a>
  );
}

/* ── Phone Mockup ────────────────────────────────────────────── */
function PhoneMockup() {
  const paths = [
    {
      title: "The AI Path",
      desc: "Learn the fundamentals of AI and learn to build a multi-agent AI business step by step.",
      color: "#4a8fff",
    },
    {
      title: "The Creator Path",
      desc: "Learn the fundamentals of AI and how to use it to solve real-world problems.",
      color: "#6a9fff",
    },
  ];

  return (
    <div className="relative flex justify-center" style={{ width: 340 }}>

      {/* Phone shell */}
      <div
        className="relative z-10 rounded-[44px] overflow-hidden"
        style={{
          width: 300,
          height: 620,
          background: "linear-gradient(160deg,#162645 0%,#0a1628 60%,#07122a 100%)",
          border: "1.5px solid rgba(255,255,255,0.13)",
          boxShadow: "0 40px 80px rgba(0,50,180,0.45), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
          style={{ top: 12, width: 96, height: 28 }}
        />

        {/* Screen */}
        <div
          className="absolute inset-0 rounded-[44px]"
          style={{ background: "linear-gradient(180deg,#0d1f45 0%,#080e28 100%)" }}
        />

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col pt-[52px] px-4 pb-4 gap-3 overflow-hidden">

          {/* Status bar */}
          <div className="flex justify-between items-center px-1" style={{ fontSize: 11, color: "rgba(199,210,220,0.6)", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <svg viewBox="0 0 17 12" className="w-4 h-3" fill="rgba(199,210,220,0.7)" aria-hidden>
                <rect x="0" y="6" width="3" height="6" rx="0.5"/>
                <rect x="4.5" y="4" width="3" height="8" rx="0.5"/>
                <rect x="9" y="2" width="3" height="10" rx="0.5"/>
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
              </svg>
              {/* WiFi */}
              <svg viewBox="0 0 16 12" className="w-3.5 h-3" fill="rgba(199,210,220,0.7)" aria-hidden>
                <path d="M8 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-3.5c1.7 0 3.2.7 4.3 1.8L14 5.5C12.5 4 10.4 3 8 3S3.5 4 2 5.5l1.7 1.8C4.8 6.2 6.3 5.5 8 5.5zm0-4C10.8 1.5 13.3 2.6 15 4.4L16.5 2.8C14.4.9 11.3 0 8 0S1.6.9-.5 2.8L1 4.4C2.7 2.6 5.2 1.5 8 1.5z"/>
              </svg>
              {/* Battery */}
              <svg viewBox="0 0 25 12" className="w-6 h-3" aria-hidden>
                <rect x="0" y="1" width="21" height="10" rx="2.5" fill="none" stroke="rgba(199,210,220,0.5)" strokeWidth="1"/>
                <rect x="22" y="4" width="2.5" height="4" rx="1" fill="rgba(199,210,220,0.4)"/>
                <rect x="1.5" y="2.5" width="15" height="7" rx="1.5" fill="rgba(199,210,220,0.85)"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center gap-2.5 px-0.5">
            <button
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-label="Back"
            >
              <svg viewBox="0 0 8 14" className="w-2 h-3" fill="none" stroke="rgba(199,210,220,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 1L1 7l6 6"/>
              </svg>
            </button>
            <div>
              <p style={{ fontSize: 13, color: "#c7d2dc", fontWeight: 700, fontFamily: "var(--font-body)", lineHeight: 1.2 }}>Learning Paths</p>
              <p style={{ fontSize: 10, color: "rgba(199,210,220,0.4)", fontFamily: "var(--font-body)", lineHeight: 1.3 }}>A structured journey from fundamentals to mastery.</p>
            </div>
          </div>

          {/* Path cards */}
          {paths.map((p, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                height: i === 0 ? 182 : 138,
                background: `linear-gradient(135deg, #0a2050 0%, #071535 100%)`,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Glow */}
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 75% 35%, ${p.color}25 0%, transparent 65%)` }} />
              {/* Dot grid */}
              <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, ${p.color}40 1px, transparent 1px)`, backgroundSize: "16px 16px", opacity: 0.25 }} />
              {/* Robot icon */}
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center"
                style={{ width: 52, height: 52, background: `${p.color}18`, border: `1px solid ${p.color}35` }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden>
                  <circle cx="12" cy="7.5" r="3" stroke={p.color} strokeWidth="1.5"/>
                  <rect x="5" y="13" width="14" height="8" rx="2" stroke={p.color} strokeWidth="1.5"/>
                  <circle cx="9" cy="17" r="1" fill={p.color}/>
                  <circle cx="15" cy="17" r="1" fill={p.color}/>
                </svg>
              </div>
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-14 p-3">
                <p style={{ fontSize: 12, color: "#c7d2dc", fontWeight: 700, fontFamily: "var(--font-body)", lineHeight: 1.3, marginBottom: 3 }}>{p.title}</p>
                <p style={{ fontSize: 10, color: "rgba(199,210,220,0.45)", fontFamily: "var(--font-body)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
              </div>
            </div>
          ))}

          {/* Peek of third card */}
          <div className="rounded-2xl flex-shrink-0" style={{ height: 52, background: "linear-gradient(135deg,#0f1e3c 0%,#0a1530 100%)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.55 }} />
        </div>

        {/* Side buttons */}
        <div className="absolute rounded-l-full" style={{ right: -2, top: 130, width: 3, height: 48, background: "rgba(255,255,255,0.1)" }} />
        <div className="absolute rounded-r-full" style={{ left: -2, top: 108, width: 3, height: 32, background: "rgba(255,255,255,0.1)" }} />
        <div className="absolute rounded-r-full" style={{ left: -2, top: 152, width: 3, height: 32, background: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* AI Robot — from Figma export */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ bottom: -40, left: -50, width: 200, height: 240 }}
        aria-hidden
      >
        <Image
          src="/images/ai-robot.png"
          alt=""
          width={200}
          height={240}
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(74,158,255,0.5)]"
          priority
        />
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#0b1424", minHeight: "100vh" }}
    >
      {/* Background blobs — match Figma gradient positions */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* top-right blob — node 5277:78 */}
        <div className="absolute rounded-full" style={{ width: 700, height: 750, top: -200, right: -160, background: "radial-gradient(ellipse, rgba(20,70,220,0.32) 0%, rgba(8,35,130,0.18) 45%, transparent 70%)", filter: "blur(70px)" }} />
        {/* center-right blob — node 5253:62 */}
        <div className="absolute rounded-full" style={{ width: 580, height: 760, top: "5%", right: "-5%", background: "radial-gradient(ellipse, rgba(0,90,220,0.18) 0%, transparent 70%)", filter: "blur(80px)" }} />
        {/* left blob — node 5276:71 */}
        <div className="absolute rounded-full" style={{ width: 480, height: 580, top: "12%", left: -120, background: "radial-gradient(ellipse, rgba(0,70,180,0.14) 0%, transparent 70%)", filter: "blur(70px)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 1 }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pt-[96px] pb-12 md:pt-[120px]">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 w-full">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left max-w-[580px] mx-auto md:mx-0">

            {/* Badge — exact Figma: white/5 bg, green dot, uppercase, letter-spacing 1px */}
            <div className="flex justify-center md:justify-start">
              <span
                className="inline-flex items-center gap-2 rounded-full"
                style={{
                  background: "rgba(246,243,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "6px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#c7d2dc",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1bd79d", flexShrink: 0 }} />
                {HERO_BADGE_TEXT}
              </span>
            </div>

            {/* H1 — Space Grotesk Bold, 60px, -1.5px tracking, 102% line-height */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-1.5px",
                color: "#c7d2dc",
              }}
            >
              The way you learn is{" "}
              <br className="hidden sm:block" />
              about to{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #4a9eff 0%, #00d4ff 60%, #4a9eff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                change.
              </span>
            </h1>

            {/* Subheading — Plus Jakarta Sans Regular, 18px */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                fontWeight: 400,
                lineHeight: "29.25px",
                color: "#c7d2dc",
                maxWidth: 520,
                margin: "0 auto",
              }}
              className="md:mx-0"
            >
              {HERO_SUBHEADING}
            </p>

            {/* Download label + app buttons */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "1.98px",
                  textTransform: "uppercase",
                  color: "#c7d2dc",
                  lineHeight: "16.5px",
                }}
              >
                {HERO_DOWNLOAD_LABEL}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <AppStoreBadge store="apple" />
                <AppStoreBadge store="google" />
              </div>
            </div>

            {/* CTA link */}
            <div className="flex justify-center md:justify-start">
              <a
                href="#features"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4a9eff", textDecoration: "none" }}
                className="hover:opacity-80 transition-opacity"
              >
                {HERO_CTA_LINK}
              </a>
            </div>

            {/* Trust badges — Plus Jakarta Sans Regular 12px, color #c7d2dc */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2">
              {HERO_TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400, color: "rgba(199,210,220,0.7)" }}
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3 shrink-0" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — phone + robot */}
          <div className="flex-shrink-0 flex justify-center md:justify-end pb-10 md:pb-0">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
