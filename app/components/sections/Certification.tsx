import Image from "next/image";
import DecodeText from "@/app/components/ui/DecodeText";

const BULLETS = [
  "Project-validated, not quiz-validated",
  "Real systems shipped to your portfolio",
  "KHDA-accredited certification coming via Dubai Government",
] as const;

export default function Certification() {
  return (
    <section id="certification" className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] py-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(7,28,70,0.5) 0%, rgba(5,15,40,0.88) 100%)",
            border: "1.5px solid rgba(74,158,255,0.18)",
            padding: "48px 48px",
          }}
        >
          {/* ambient */}
          <div aria-hidden className="absolute pointer-events-none" style={{ width: 500, height: 500, bottom: -100, left: -100, background: "radial-gradient(ellipse, rgba(0,60,180,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">

            {/* LEFT — copy */}
            <div className="flex-1 max-w-[480px]">
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#ebfce4", marginBottom: 18 }}>
                brAInify Certification
              </p>

              <DecodeText
                as="h2"
                text="Proof of skill, not proof of attendance."
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.65px", color: "#c7d2dc", lineHeight: 1.15, marginBottom: 20 }}
              />

              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "rgba(199,210,220,0.65)", marginBottom: 24 }}>
                Graduates don&apos;t just leave with a certificate — they leave with{" "}
                <strong style={{ color: "#c7d2dc", fontWeight: 700 }}>proof of work.</strong>{" "}
                Each certification is awarded for completing a real system build and passing a practical validation, not for watching a video to the end.
              </p>

              <div className="flex flex-col gap-3">
                {BULLETS.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 12 10" style={{ width: 12, height: 10, flexShrink: 0, marginTop: 3 }} fill="none" aria-hidden>
                      <path d="M1 5l3.5 3.5L11 1" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(199,210,220,0.75)", lineHeight: 1.5 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — certificate image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1.5px solid rgba(74,158,255,0.25)",
                  boxShadow: "0 20px 60px rgba(0,40,150,0.4)",
                  maxWidth: 480,
                  width: "100%",
                }}
              >
                <Image
                  src="/images/cert/cert-image.png"
                  alt="AI Automation Professional Certificate"
                  width={480}
                  height={340}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* caption bar */}
                <div
                  className="flex items-center justify-center gap-2 py-3"
                  style={{ background: "rgba(5,15,40,0.9)", borderTop: "1px solid rgba(74,158,255,0.15)" }}
                >
                  <svg viewBox="0 0 12 10" style={{ width: 10, height: 8 }} fill="none" aria-hidden>
                    <path d="M1 5l3.5 3.5L11 1" stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(199,210,220,0.4)" }}>
                    Sample certificate · Issued on real project completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
