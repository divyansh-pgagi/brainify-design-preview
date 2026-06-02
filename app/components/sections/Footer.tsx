"use client";

import Image from "next/image";

function InstagramIcon({ size = 14 }: { size?: number }) {
  const s = { width: size, height: size, display: "block" } as const;
  return (
    <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      {/* ── CTA Section ── */}
      <section className="relative overflow-hidden" style={{ background: "#060f1e" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,100,220,0.18) 0%, transparent 65%)", filter: "blur(40px)" }} />

        <div className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-4 pb-20">
          <div
            className="relative rounded-2xl p-[1.5px]"
            style={{
              background: "linear-gradient(135deg, rgba(0,210,255,0.55) 0%, rgba(0,100,220,0.25) 40%, rgba(0,210,255,0.45) 100%)",
              boxShadow: "0 0 60px rgba(0,180,255,0.18), 0 0 120px rgba(0,100,220,0.10)",
            }}
          >
          <div
            className="relative rounded-2xl overflow-hidden text-center"
            style={{
              background: "linear-gradient(160deg, rgba(3,14,44,0.97) 0%, rgba(2,8,28,0.99) 100%)",
              padding: "52px 32px 44px",
            }}
          >
            <div aria-hidden className="absolute pointer-events-none inset-0" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(0,120,255,0.18) 0%, transparent 60%)" }} />
            <div aria-hidden className="absolute pointer-events-none" style={{ top: -60, left: "50%", transform: "translateX(-50%)", width: 500, height: 200, background: "radial-gradient(ellipse, rgba(0,200,255,0.10) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="relative z-10">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(160,210,255,0.70)", marginBottom: 18 }}>
                GET BRAINIFIED
              </p>

              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.12, marginBottom: 18, color: "#d0dce8" }}>
                {" "}
                <span style={{ color: "#ffffff", fontWeight: 800 }}>
                  OWN YOUR FUTURE
                </span>{" "}
              </h2>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, color: "rgba(185,205,225,0.55)", lineHeight: 1.65, marginBottom: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                Pick your path. Meet your AI mentor. Ship your first project this week — and own the future before it owns you.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-5">
                <a href="https://apps.apple.com/ca/app/brainify-app/id6759913473" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 20px", textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, flexShrink: 0 }} fill="#c7d2dc" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col leading-tight text-left">
                    <span style={{ fontSize: 9, color: "rgba(199,210,220,0.50)", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>DOWNLOAD ON THE</span>
                    <span style={{ fontSize: 14, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>App Store</span>
                  </div>
                </a>

                <a href="https://play.google.com/store/apps/details?id=com.brainify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 20px", textDecoration: "none" }}>
                  <img src="/playstore.png" alt="Google Play" style={{ width: 22, height: 22, flexShrink: 0, objectFit: "contain" }} aria-hidden />
                  <div className="flex flex-col leading-tight text-left">
                    <span style={{ fontSize: 9, color: "rgba(199,210,220,0.50)", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>GET IT ON</span>
                    <span style={{ fontSize: 14, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>Google Play</span>
                  </div>
                </a>
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(185,205,225,0.38)", letterSpacing: "0.2px" }}>
                iOS · Android · Live in 175 countries · 11 languages
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#04090f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-full max-w-[1192px] mx-auto px-6 md:px-10 py-6 flex flex-row items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Image src="/logo-with-txt.svg" alt="brAInify" width={100} height={28} className="h-7 w-auto opacity-60" loading="lazy" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(160,200,240,0.45)" }}>
              Follow Brainify
            </p>
          <a
            href="https://www.instagram.com/brainifybyignite?igsh=MXV1dWVudTVlM3k0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              padding: "9px 20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              textDecoration: "none",
              color: "rgba(190,210,230,0.70)",
            }}
          >
            <span
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 26, height: 26, background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", color: "#fff", flexShrink: 0 }}
            >
              <InstagramIcon size={14} />
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400 }}>
              @brainifybyignite
            </span>
          </a>
          </div>

          <div className="flex-1 flex justify-end">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(160,200,230,0.38)" }}>
              © 2026 brAInify · Ignite Social Enterprise
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
