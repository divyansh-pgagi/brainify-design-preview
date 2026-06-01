"use client";

import Image from "next/image";

const SOCIALS = [
  {
    handle: "@brainifybylgnite",
    icon: "instagram",
    color: "#E1306C",
    bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
  },
  {
    handle: "@BrainifyIgnite",
    icon: "tiktok",
    color: "#ffffff",
    bg: "#010101",
  },
  {
    handle: "@brAInifylgnite",
    icon: "youtube",
    color: "#FF0000",
    bg: "#FF0000",
  },
  {
    handle: "brAInifybylgnite",
    icon: "facebook",
    color: "#1877F2",
    bg: "#1877F2",
  },
  {
    handle: "Brainify",
    icon: "snapchat",
    color: "#FFFC00",
    bg: "#FFFC00",
  },
  {
    handle: "@BrainifyIgnite",
    icon: "x",
    color: "#ffffff",
    bg: "#000000",
  },
] as const;

function SocialIcon({ type, size = 14 }: { type: string; size?: number }) {
  const s = { width: size, height: size, display: "block" } as const;
  if (type === "instagram") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
  if (type === "tiktok") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
  if (type === "youtube") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
  if (type === "facebook") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
  if (type === "snapchat") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.075-.046-.15-.046-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
  if (type === "x") return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L2.25 2.25h6.918l4.25 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
  return null;
}

export default function Footer() {
  return (
    <>
      {/* ── CTA Section ── */}
      <section className="relative overflow-hidden" style={{ background: "#060f1e" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,100,220,0.18) 0%, transparent 65%)", filter: "blur(40px)" }} />

        <div className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-4 pb-20">
          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden text-center"
            style={{
              background: "linear-gradient(160deg, rgba(4,18,55,0.92) 0%, rgba(2,10,32,0.97) 100%)",
              border: "1.5px solid rgba(0,195,235,0.22)",
              boxShadow: "0 0 80px rgba(0,120,210,0.12)",
              padding: "52px 32px 44px",
            }}
          >
            {/* card inner glow */}
            <div aria-hidden className="absolute pointer-events-none inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,100,220,0.14) 0%, transparent 60%)" }} />

            <div className="relative z-10">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(160,210,255,0.70)", marginBottom: 18 }}>
                Get brainified
              </p>

              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.12, marginBottom: 18, color: "#d0dce8" }}>
                Stop watching.{" "}
                <span style={{ background: "linear-gradient(90deg,#4a9eff 0%,#00d8ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Start shipping.
                </span>
              </h2>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, color: "rgba(185,205,225,0.55)", lineHeight: 1.65, marginBottom: 32, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
                Pick your path. Meet your AI mentor. Ship your first project this week — and own the future before it owns you.
              </p>

              {/* App store buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-5">
                {/* App Store */}
                <a href="#" className="flex items-center gap-3 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 20px", textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, flexShrink: 0 }} fill="#c7d2dc" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col leading-tight text-left">
                    <span style={{ fontSize: 9, color: "rgba(199,210,220,0.50)", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>DOWNLOAD ON THE</span>
                    <span style={{ fontSize: 14, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>App Store</span>
                  </div>
                </a>

                {/* Google Play */}
                <a href="#" className="flex items-center gap-3 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 20px", textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, flexShrink: 0 }} aria-hidden>
                    <path fill="#00C4FF" d="M3.5 2.3 13.7 12 3.5 21.7a1.5 1.5 0 0 1-.5-1.1V3.4c0-.43.18-.82.5-1.1z" />
                    <path fill="#00F076" d="m13.7 12 3.1-3.1 3.5 2a1 1 0 0 1 0 2.2l-3.5 2L13.7 12z" />
                    <path fill="#FF3D44" d="m13.7 12-3.1 3.1L3.5 21.7l10.2-9.7z" />
                    <path fill="#FFBC00" d="M3.5 2.3 10.6 9 13.7 12 3.5 2.3z" />
                  </svg>
                  <div className="flex flex-col leading-tight text-left">
                    <span style={{ fontSize: 9, color: "rgba(199,210,220,0.50)", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>GET IT ON</span>
                    <span style={{ fontSize: 14, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>Google Play</span>
                  </div>
                </a>
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(185,205,225,0.38)", letterSpacing: "0.2px" }}>
                iOS · Android · Live in 175 countries · 9 languages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social + bottom bar ── */}
      <footer style={{ background: "#04090f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

        {/* Social links row */}
        <div className="w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-10 pb-6">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(160,200,240,0.45)", textAlign: "center", marginBottom: 16 }}>
            Follow Brainify
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.handle + s.icon}
                href="#"
                className="flex items-center gap-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  padding: "7px 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  textDecoration: "none",
                  color: "rgba(190,210,230,0.70)",
                }}
              >
                {/* Platform icon — small colored circle */}
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 20,
                    height: 20,
                    background: s.bg,
                    color: s.icon === "snapchat" ? "#000" : s.icon === "instagram" ? "#fff" : "#fff",
                    flexShrink: 0,
                  }}
                >
                  <SocialIcon type={s.icon} size={11} />
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400, whiteSpace: "nowrap" }}>
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="w-full max-w-[1192px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Logo + tagline */}
            <div className="flex items-center gap-3">
              <Image src="/logo-with-txt.svg" alt="brAInify" width={100} height={28} className="h-7 w-auto opacity-60" loading="lazy" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(160,200,230,0.35)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Innovating learning with AI
              </span>
            </div>

            {/* Middle */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(160,200,230,0.38)" }}>
              Available on iOS &amp; Android
            </p>

            {/* Copyright */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(160,200,230,0.38)" }}>
              © 2026 brAInify · Ignite Social Enterprise
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
