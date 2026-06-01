const STATS = [
  { value: "175", label: "Countries live" },
  { value: "11", label: "Languages" },
  { value: "6", label: "Career paths" },
  { value: "6", label: "Ecosystem features" },
] as const;

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pb-24 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl py-8 px-4"
              style={{
                background: "linear-gradient(145deg, #0e1c35 0%, #0a1628 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="text-[3rem] md:text-[3.5rem] font-extrabold leading-none tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #00c2ff 0%, #3b6fff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm font-medium text-white/50 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
