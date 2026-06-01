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
  const href = store === "apple"
    ? "https://apps.apple.com/ca/app/brainify-app/id6759913473"
    : "https://play.google.com/store/apps/details?id=com.brainify.app";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:brightness-110"
      style={{
        background: "rgba(246,243,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        minWidth: 148,
      }}
    >
      {store === "apple" ? (
        /* Apple logo */
        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#c7d2dc" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <img src="/playstore.png" alt="Google Play" className="w-6 h-6 shrink-0 object-contain" aria-hidden />
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
  return (
    <>
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>

      {/* Outer container — wide enough for the stacked phones */}
      <div className="relative scale-[0.78] md:scale-100 origin-top -translate-x-6 md:translate-x-0" style={{ width: 420, height: 600 }}>

        {/* Back phone — slightly behind and offset right */}
        <div
          className="absolute z-10"
          style={{ right: -40, top: 40, width: 230 }}
        >
          <Image
            src="/phone-app-img/AiMentor2.png"
            alt="brAInify app screen 2"
            width={230}
            height={480}
            className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,40,160,0.5)]"
            priority
          />
        </div>

        {/* Front phone — main, slightly left */}
        <div
          className="absolute z-20"
          style={{ left: 90, top: 60, width: 250 }}
        >
          <Image
            src="/phone-app-img/AiMentor.png"
            alt="brAInify app screen"
            width={250}
            height={520}
            className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,50,200,0.55)]"
            priority
          />
        </div>

        {/* AI Robot — floating above the phones */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            top: -20,
            left: 75,
            width: 120,
            height: 145,
            animation: "hero-float 3.8s ease-in-out infinite",
          }}
          aria-hidden
        >
          <Image
            src="/images/ai-robot.png"
            alt=""
            width={120}
            height={145}
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(74,158,255,0.6)]"
            priority
          />
        </div>
      </div>
    </>
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
          <div className="flex-shrink-0 flex justify-center md:justify-end pt-16 pb-10 md:pt-20 md:pb-0">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
