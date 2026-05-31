const TOOLS = [
  {
    name: "Claude",
    category: "Reasoning & Writing",
    categoryColor: "#f97316",
    icon: (
      // Anthropic claude asterisk-style icon
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#1a1a1a"/>
        <path d="M20 8v24M8 20h24M11.5 11.5l17 17M28.5 11.5l-17 17" stroke="#e86c35" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#e86c35"/>
      </svg>
    ),
  },
  {
    name: "Descript",
    category: "Audio & Video",
    categoryColor: "#4a9eff",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#1a2a4a"/>
        <rect x="10" y="13" width="8" height="3" rx="1.5" fill="#4a9eff"/>
        <rect x="10" y="18.5" width="20" height="3" rx="1.5" fill="#4a9eff"/>
        <rect x="10" y="24" width="14" height="3" rx="1.5" fill="#4a9eff"/>
      </svg>
    ),
  },
  {
    name: "Perplexity",
    category: "Research",
    categoryColor: "#22d3ee",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#0a1f2e"/>
        <path d="M20 10l6 5v10l-6 5-6-5V15l6-5z" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(34,211,238,0.1)"/>
        <path d="M14 15l6 5 6-5M20 15v10" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Relevance AI",
    category: "Agents & Ops",
    categoryColor: "#a78bfa",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#1a1040"/>
        <circle cx="20" cy="20" r="7" stroke="#a78bfa" strokeWidth="1.8" fill="rgba(167,139,250,0.1)"/>
        <circle cx="20" cy="20" r="2.5" fill="#a78bfa"/>
        <path d="M20 10v3M20 27v3M10 20h3M27 20h3" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "n8n",
    category: "Workflow Automation",
    categoryColor: "#f87171",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#2a1010"/>
        <circle cx="12" cy="20" r="3.5" fill="#f87171"/>
        <circle cx="28" cy="20" r="3.5" fill="#f87171"/>
        <path d="M15.5 20h9" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
        <path d="M22 14l6 6-6 6" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

export default function RealTools() {
  return (
    <section id="tools" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(7,28,70,0.5) 0%, rgba(5,15,40,0.85) 100%)",
            border: "1.5px solid rgba(74,158,255,0.18)",
            padding: "40px 40px 32px",
          }}
        >
          {/* ambient glow */}
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 500, height: 400, top: -100, right: -100, background: "radial-gradient(ellipse, rgba(0,80,200,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10" style={{ borderBottom: "1px dashed rgba(74,158,255,0.2)", paddingBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
                Use real tools
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.65px", color: "#c7d2dc", marginBottom: 10, lineHeight: 1.15 }}>
                The same tools the pros are billing for.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "rgba(199,210,220,0.6)", maxWidth: 480 }}>
                Not toy projects. Production-quality walkthroughs of the AI tools you&apos;ll actually be hired to use — taught in the language you choose.
              </p>
            </div>

            {/* Tool cards row */}
            <div className="flex flex-wrap gap-3 justify-start">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-3 rounded-2xl transition-all duration-200 hover:scale-[1.03] cursor-default"
                  style={{
                    background: "linear-gradient(145deg, rgba(10,25,55,0.9) 0%, rgba(6,15,35,0.95) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "24px 20px 20px",
                    width: 168,
                    flexShrink: 0,
                  }}
                >
                  {tool.icon}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#c7d2dc", textAlign: "center" }}>
                    {tool.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: tool.categoryColor, textAlign: "center", lineHeight: 1.3 }}>
                    {tool.category}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p
              className="text-center mt-8"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(199,210,220,0.4)", borderTop: "1px dashed rgba(74,158,255,0.15)", paddingTop: 20 }}
            >
              + a growing library of tool walkthroughs in every path
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
