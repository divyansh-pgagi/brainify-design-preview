"use client";

import Image from "next/image";
import { EDUCATORS } from "@/app/lib/constants";
import TiltCard from "@/app/components/ui/TiltCard";

function EducatorCard({
  name,
  specialty,
  image,
}: {
  name: string;
  specialty: string;
  image: string;
}) {
  return (
    <TiltCard
      className="flex flex-col items-center cursor-pointer group transition-opacity duration-300 group-hover/cards:opacity-40 hover:!opacity-100"
      style={{
        background: "linear-gradient(145deg, #0d1f40 0%, #091428 100%)",
        border: "1.5px solid rgba(74,158,255,0.22)",
        borderRadius: 16,
        padding: "20px 14px 16px",
        width: 140,
        gap: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(74,158,255,0.55)";
        el.style.boxShadow = "0 0 22px rgba(74,158,255,0.18), 0 4px 24px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(74,158,255,0.22)";
        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
      }}
    >
      {/* Avatar */}
      <div
        className="relative rounded-full overflow-hidden shrink-0"
        style={{
          width: 80,
          height: 80,
          boxShadow: "0 0 0 2px rgba(74,158,255,0.3)",
        }}
      >
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          color: "#c7d2dc",
          textAlign: "center",
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {name}
      </p>

      {/* Specialty */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 400,
          color: "rgba(199,210,220,0.45)",
          textAlign: "center",
          lineHeight: 1.3,
          margin: 0,
          marginTop: -4,
        }}
      >
        {specialty}
      </p>
    </TiltCard>
  );
}

export default function Educators() {
  return (
    <section
      id="features"
      className="relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 400,
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(20,70,200,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pt-4 md:pt-24 pb-24">

        {/* ── Info banner — navy/glass card to match the rest of the page ── */}
        <div
          className="mb-16 rounded-2xl text-center relative overflow-hidden neon-border"
          style={{
            background: "linear-gradient(160deg, rgba(5,16,48,0.95) 0%, rgba(2,8,26,0.98) 100%)",
            boxShadow: "0 0 60px rgba(0,120,190,0.07)",
            padding: "32px 40px",
          }}
        >
          {/* soft inner glow + top accent line */}
          <div aria-hidden className="absolute pointer-events-none inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,90,220,0.12) 0%, transparent 58%)" }} />
          <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 h-px" style={{ width: "60%", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.55), transparent)" }} />

          <div className="relative z-10">
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.55px",
                lineHeight: "30px",
                color: "#c7d2dc",
                marginBottom: 8,
              }}
            >
              YouTube videos. Saved posts. Half-finished courses.
              <br />
              <span className="gradient-text">
                Information isn&apos;t your problem. Structure is.
              </span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "23px",
                color: "rgba(199,210,220,0.7)",
                maxWidth: 900,
                margin: "0 auto",
              }}
            >
              brAInify was built to fix the one thing the rest of the internet can&apos;t: a system that actually finishes you.
            </p>
          </div>
        </div>

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          {/* Label — Plus Jakarta Sans Bold 12px, letter-spacing 2.16px, color #ebfce4 */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2.16px",
              textTransform: "uppercase",
              color: "#ebfce4",
              marginBottom: 16,
            }}
          >
            Meet your educators
          </p>

          {/* H2 — Space Grotesk Bold 34px, -0.85px tracking */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.85px",
              lineHeight: "51px",
              color: "#c7d2dc",
              marginBottom: 12,
            }}
          >
            AI experts. Real specialties.
          </h2>

          {/* Subtext — Plus Jakarta Sans Regular 16px */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "26px",
              color: "rgba(199,210,220,0.7)",
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            Seven educators, each leading the path they&apos;ve actually lived.
          </p>
        </div>

        {/* ── Cards (hovering one dims the rest) ── */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 group/cards">
          {EDUCATORS.map((educator) => (
            <EducatorCard
              key={educator.name}
              name={educator.name}
              specialty={educator.specialty}
              image={educator.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
