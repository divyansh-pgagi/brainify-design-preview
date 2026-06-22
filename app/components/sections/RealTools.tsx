import DecodeText from "@/app/components/ui/DecodeText";
import TiltCard from "@/app/components/ui/TiltCard";
import DataStream from "@/app/components/ui/DataStream";

// Tool icons matched pixel-perfect from Figma screenshot
const TOOLS = [
  {
    name: "Claude",
    category: "Reasoning & Writing",
    categoryColor: "#f97316",
    bg: "#1a0a00",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#1c0e05"/>
        {/* Anthropic asterisk — 6 spokes */}
        {[0,30,60,90,120,150].map((deg, i) => (
          <line
            key={i}
            x1="24" y1="24"
            x2={24 + 13 * Math.cos((deg - 90) * Math.PI / 180)}
            y2={24 + 13 * Math.sin((deg - 90) * Math.PI / 180)}
            stroke="#e8632a" strokeWidth="2.8" strokeLinecap="round"
          />
        ))}
        <circle cx="24" cy="24" r="2.5" fill="#e8632a"/>
      </svg>
    ),
  },
  {
    name: "Descript",
    category: "Audio & Video",
    categoryColor: "#4a9eff",
    bg: "#00142e",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#041525"/>
        {/* Three horizontal lines like Descript logo */}
        <rect x="11" y="15" width="10" height="4" rx="2" fill="#4a9eff"/>
        <rect x="11" y="22" width="26" height="4" rx="2" fill="#4a9eff"/>
        <rect x="11" y="29" width="18" height="4" rx="2" fill="#4a9eff"/>
      </svg>
    ),
  },
  {
    name: "Perplexity",
    category: "Research",
    categoryColor: "#22d3ee",
    bg: "#001a20",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#021a20"/>
        {/* Perplexity diamond/asterisk shape */}
        <path d="M24 10L24 38M10 24L38 24M14.1 14.1L33.9 33.9M33.9 14.1L14.1 33.9" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round"/>
        <rect x="18" y="18" width="12" height="12" rx="2" fill="#22d3ee" opacity="0.15"/>
        <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#22d3ee" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Relevance AI",
    category: "Agents & Ops",
    categoryColor: "#818cf8",
    bg: "#0d0a2e",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#0c0a28"/>
        {/* Circular agent icon */}
        <circle cx="24" cy="24" r="12" stroke="#818cf8" strokeWidth="2" fill="rgba(129,140,248,0.08)"/>
        <circle cx="24" cy="24" r="5" fill="#818cf8" opacity="0.9"/>
        {/* orbit dots */}
        <circle cx="24" cy="10" r="2" fill="#818cf8" opacity="0.6"/>
        <circle cx="24" cy="38" r="2" fill="#818cf8" opacity="0.6"/>
        <circle cx="10" cy="24" r="2" fill="#818cf8" opacity="0.6"/>
        <circle cx="38" cy="24" r="2" fill="#818cf8" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "n8n",
    category: "Workflow Automation",
    categoryColor: "#f87171",
    bg: "#200808",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#1e0808"/>
        {/* n8n connected nodes */}
        <circle cx="13" cy="24" r="5" fill="#f87171" opacity="0.9"/>
        <circle cx="35" cy="24" r="5" fill="#f87171" opacity="0.9"/>
        <path d="M18 24h6M30 24h-6" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
        {/* arrow */}
        <path d="M27 19l5 5-5 5" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

export default function RealTools() {
  return (
    <section id="tools" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-20 py-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(7,28,70,0.5) 0%, rgba(5,15,40,0.85) 100%)",
            border: "1.5px solid rgba(74,158,255,0.18)",
            padding: "40px 40px 32px",
          }}
        >
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 500, height: 400, top: -100, right: -100, background: "radial-gradient(ellipse, rgba(0,80,200,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

          {/* Falling data-stream backdrop */}
          <DataStream columns={20} color="rgba(74,158,255,0.35)" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10" style={{ borderBottom: "1px dashed rgba(74,158,255,0.2)", paddingBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
                Use real tools
              </p>
              <DecodeText
                as="h2"
                text="The same tools the pros are billing for."
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.65px", color: "#c7d2dc", marginBottom: 10, lineHeight: 1.15 }}
              />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "rgba(199,210,220,0.6)", maxWidth: 480 }}>
                Not toy projects. Production-quality walkthroughs of the AI tools you&apos;ll actually be hired to use — taught in the language you choose.
              </p>
            </div>

            {/* Tool cards */}
            <div className="flex flex-wrap gap-3">
              {TOOLS.map((tool) => (
                <TiltCard
                  key={tool.name}
                  className="flex flex-col items-center gap-3 rounded-2xl hover:border-white/20 cursor-default"
                  max={10}
                  glareColor={`${tool.categoryColor}33`}
                  style={{
                    background: `linear-gradient(145deg, ${tool.bg} 0%, #040d1e 100%)`,
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
                </TiltCard>
              ))}
            </div>

            {/* Footer */}
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
