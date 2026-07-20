"use client";

/**
 * InfoNav — shared top bar for the light-theme info pages
 * (/privacy, /terms, /support, /deleteAccount).
 *
 * Plain <a> tags on purpose: marketing (dark) ↔ info (light) transitions
 * must be hard loads so the theme CSS never bleeds across client-side
 * navigation. Uses the .info-theme CSS variables for styling.
 */

const PAGES = [
  { id: "privacy", label: "Privacy", href: "/privacy" },
  { id: "terms", label: "Terms", href: "/terms" },
  { id: "support", label: "Support", href: "/support" },
  { id: "deleteAccount", label: "Delete Account", href: "/deleteAccount" },
] as const;

export type InfoPageId = (typeof PAGES)[number]["id"];

export default function InfoNav({ current }: { current: InfoPageId }) {
  return (
    <nav
      aria-label="Info pages"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        padding: "12px clamp(16px, 4vw, 40px)",
        background: "var(--card, #ffffff)",
        borderBottom: "1px solid var(--line, #d8d2c4)",
        boxShadow: "0 4px 18px rgba(14, 28, 38, 0.06)",
      }}
    >
      {/* back to landing page */}
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "var(--ink, #0f2438)",
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: "-0.3px",
        }}
      >
        <span aria-hidden style={{ fontSize: 17, lineHeight: 1 }}>←</span>
        br<span style={{ color: "var(--accent, #d95f43)" }}>AI</span>nify
        <span
          style={{
            fontWeight: 600,
            fontSize: 11,
            color: "var(--ink-soft, #3a5063)",
            marginLeft: 2,
          }}
        >
          Home
        </span>
      </a>

      {/* page tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {PAGES.map((p) => {
          const active = p.id === current;
          return (
            <a
              key={p.id}
              href={p.href}
              aria-current={active ? "page" : undefined}
              style={{
                textDecoration: "none",
                padding: "7px 13px",
                borderRadius: 999,
                fontSize: 12.5,
                fontWeight: active ? 800 : 600,
                color: active ? "#ffffff" : "var(--ink-soft, #3a5063)",
                background: active ? "var(--accent, #d95f43)" : "transparent",
                border: active
                  ? "1px solid var(--accent, #d95f43)"
                  : "1px solid var(--line, #d8d2c4)",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {p.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
