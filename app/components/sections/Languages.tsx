import { LANGUAGES } from "@/app/lib/constants";

export default function Languages() {
  // Duplicate for seamless loop
  const items = [...LANGUAGES, ...LANGUAGES, ...LANGUAGES];

  return (
    <section className="relative overflow-hidden" style={{ background: "transparent", padding: "0 0 0 0" }}>
      <div
        className="relative mx-auto w-full max-w-[1280px] px-6 md:px-[80px] py-4"
      >
        <div
          className="relative rounded-2xl overflow-hidden py-10 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(7,28,70,0.6) 0%, rgba(5,18,50,0.8) 100%)",
            border: "1.5px solid rgba(74,158,255,0.2)",
            boxShadow: "0 0 40px rgba(74,158,255,0.05), inset 0 0 60px rgba(0,40,120,0.1)",
          }}
        >
          {/* Section label */}
          <p
            className="text-center mb-5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2.16px",
              textTransform: "uppercase",
              color: "#ebfce4",
            }}
          >
            Multilingual by design
          </p>

          {/* Heading */}
          <h2
            className="text-center mb-8"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "#c7d2dc",
              lineHeight: 1.2,
            }}
          >
            Available in{" "}
            <span style={{ color: "#4a9eff" }}>11 languages</span>
            , live in 175 countries.
          </h2>

          <style>{`
            .lang-pill {
              padding: 9px 22px;
              border-radius: 999px;
              border: 1px solid rgba(74,158,255,0.3);
              background: rgba(74,158,255,0.05);
              font-family: var(--font-body);
              font-size: 14px;
              font-weight: 500;
              color: #c7d2dc;
              white-space: nowrap;
              flex-shrink: 0;
              transition: transform .25s ease, border-color .25s ease,
                background-color .25s ease, box-shadow .25s ease, color .25s ease;
            }
            .lang-pill:hover {
              transform: translateY(-3px) scale(1.05);
              border-color: rgba(0,194,255,0.7);
              background: rgba(0,194,255,0.12);
              box-shadow: 0 0 18px rgba(0,194,255,0.35);
              color: #ffffff;
            }
          `}</style>

          {/* Marquee — pauses on hover (see .animate-marquee in globals.css) */}
          <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
            <div
              className="flex gap-3 animate-marquee"
              style={{ width: "max-content" }}
            >
              {items.map((lang, i) => (
                <span key={`${lang}-${i}`} className="lang-pill">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
