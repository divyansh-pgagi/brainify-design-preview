"use client";

import Image from "next/image";
import { EDUCATORS } from "@/app/lib/constants";

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
    <div
      className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-[1.04]"
      style={{
        background: "linear-gradient(145deg, #0d1f40 0%, #091428 100%)",
        border: "1.5px solid rgba(74,158,255,0.22)",
        borderRadius: 16,
        padding: "20px 16px 16px",
        width: 148,
        gap: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
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
    </div>
  );
}

export default function Educators() {
  return (
    <section
      id="features"
      className="relative overflow-hidden"
      style={{ background: "#0b1424" }}
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

      <div
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pb-24"
        style={{ paddingTop: 0 }}
      >

        {/* ── Info banner — exact Figma gradient + fonts ── */}
        <div
          className="mb-20 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(4,76,143,0.6) 0%, rgba(15,34,65,0.96) 64%)",
            border: "1px solid rgba(74,158,255,0.12)",
            padding: "40px 48px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.65px",
              lineHeight: "35.75px",
              color: "#c7d2dc",
              marginBottom: 12,
            }}
          >
            YouTube videos. Saved posts. Half-finished courses.{" "}
            <span style={{ color: "#4a9eff" }}>
              Information isn&apos;t your problem. Structure is.
            </span>
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "29.25px",
              color: "rgba(199,210,220,0.7)",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            brAInify was built to fix the one thing the rest of the internet can&apos;t: a system that actually finishes you.
          </p>
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

        {/* ── Cards ── */}
        <div className="flex flex-wrap justify-center gap-4">
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
