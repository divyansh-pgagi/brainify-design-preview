const STATS = [
  { number: "175", label: "Countries live" },
  { number: "9",   label: "Languages" },
  { number: "6",   label: "Career paths" },
  { number: "6",   label: "Ecosystem features" },
] as const;

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-10 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl"
              style={{
                background: "linear-gradient(145deg, rgba(10,25,55,0.7) 0%, rgba(6,15,35,0.8) 100%)",
                border: "1px solid rgba(74,158,255,0.12)",
                padding: "36px 20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  color: "#4a9eff",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(199,210,220,0.55)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
