import Image from "next/image";
import DecodeText from "@/app/components/ui/DecodeText";

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

export default function InsideApp() {
  return (
    <section id="inside-app" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      {/* ambient glow */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,80,200,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-24">

        {/* Header */}
        <div className="mb-16">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 14 }}>
            Inside the app
          </p>
          <DecodeText
            as="h2"
            text="A learning ecosystem"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", marginBottom: 12, lineHeight: 1.15 }}
          />
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

          {/* CENTER — phone screenshot */}
          <div className="flex justify-center shrink-0" style={{ width: 280 }}>
            <div className="relative">
              <Image
                src="/phone-app-img/chapterCircles.png"
                alt="brAInify app — chapter view"
                width={260}
                height={540}
                className="w-[260px] h-auto object-contain"
                style={{ filter: "drop-shadow(0 40px 80px rgba(0,50,180,0.5))" }}
                loading="lazy"
              />
            </div>
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
