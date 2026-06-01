import Image from "next/image";

const SOCIAL_LINKS = [
  { label: "@brainifyapp", icon: "twitter" },
  { label: "@brAInify.app", icon: "instagram" },
  { label: "@brAInifyApp", icon: "youtube" },
  { label: "brAInify", icon: "linkedin" },
  { label: "@brainify", icon: "tiktok" },
  { label: "@brainify_app", icon: "github" },
] as const;

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    twitter: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L2.25 2.25h6.918l4.25 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}

export default function Footer() {
  return (
    <>
      {/* ── CTA Section ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0b1424" }}
      >
        {/* Ambient glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 800, height: 500, bottom: 0, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,80,220,0.2) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-4 pb-16 text-center">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 20 }}>
            Get started
          </p>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: 16,
              color: "#c7d2dc",
            }}
          >
            Stop watching.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4a9eff 0%, #00d4ff 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Start shipping.
            </span>
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400, color: "rgba(199,210,220,0.55)", lineHeight: 1.6, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            The only AI platform that makes you finish what you start — and walk out with something to show for it.
          </p>

          {/* App store buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            {(["apple", "google"] as const).map((store) => (
              <a
                key={store}
                href="#"
                className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 hover:brightness-110"
                style={{
                  background: "rgba(246,243,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
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
                <div className="flex flex-col leading-tight text-left">
                  <span style={{ fontSize: 10, color: "rgba(199,210,220,0.5)", fontFamily: "var(--font-body)" }}>
                    {store === "apple" ? "Download on the" : "Get it on"}
                  </span>
                  <span style={{ fontSize: 14, color: "#c7d2dc", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                    {store === "apple" ? "App Store" : "Google Play"}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(199,210,220,0.3)" }}>
            Free to start · Available in 9 languages
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#070f1e",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-full max-w-[1192px] mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Social links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex items-center gap-2 transition-opacity duration-150 hover:opacity-100"
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(199,210,220,0.5)",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    opacity: 0.8,
                    textDecoration: "none",
                  }}
                >
                  <SocialIcon type={s.icon} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            {/* Logo + copyright */}
            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <Image
                src="/logo-with-txt.svg"
                alt="brAInify"
                width={120}
                height={34}
                className="h-8 w-auto opacity-70"
                loading="lazy"
              />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(199,210,220,0.3)" }}>
                © 2026 brAInify. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
