"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "I'm a complete beginner. Is this for me?",
    a: "Absolutely. Every path starts from zero — no prior knowledge needed. The AI-powered mentor adapts to your pace, and the project-led structure means you learn by doing from day one.",
  },
  {
    q: "How is this different from the 100 AI courses online?",
    a: "Most courses teach you to watch. brAInify teaches you to ship. Every path is a structured career arc ending in a certified, portfolio-ready project — not a completion certificate for watching videos.",
  },
  {
    q: "Will I actually finish?",
    a: "That's exactly what we built for. Gamified progress, daily XP streaks, a built-in AI mentor, and a clear 0–100% path make sure you don't just start — you finish.",
  },
  {
    q: "Is the AI Mentor really useful or a gimmick?",
    a: "It's a 24/7 coach trained on the curriculum. It answers questions, explains concepts in your language, catches when you're stuck, and adapts explanations to your learning style. Not a chatbot.",
  },
  {
    q: "What language can I learn in?",
    a: "brAInify is live in 9 languages: English, Arabic, Hindi, French, Russian, Farsi, Tamil, Spanish, and Sinhala. More being added continuously.",
  },
  {
    q: "Is the certification recognised?",
    a: "We're launching KHDA-accredited certification attested by the Dubai Government. In the meantime, every certificate comes with proof of a real project build — which speaks louder than a quiz score.",
  },
  {
    q: "Can teens use it?",
    a: "Yes — the AI Youth Path is built specifically for teens aged 13–18, with age-appropriate content, fun project-based learning, and parental visibility built in.",
  },
] as const;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AccordionItem({ faq, index, isOpen, onToggle, inView }: {
  faq: typeof FAQS[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!answerRef.current) return;
    if (isOpen) {
      setHeight(answerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 60 + 200}ms, transform 0.5s ease ${index * 60 + 200}ms`,
        background: isOpen
          ? "linear-gradient(135deg, rgba(8,24,65,0.95) 0%, rgba(5,14,42,0.98) 100%)"
          : "linear-gradient(135deg, rgba(8,18,48,0.7) 0%, rgba(5,11,32,0.8) 100%)",
        border: isOpen ? "1px solid rgba(74,158,255,0.30)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isOpen ? "0 4px 32px rgba(74,158,255,0.08)" : "none",
      }}
      onClick={onToggle}
    >
      {/* Question row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 select-none">
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          fontWeight: 500,
          color: isOpen ? "#d6e4f7" : "#a8bdd4",
          lineHeight: 1.45,
          textAlign: "left",
          transition: "color 0.2s ease",
        }}>
          {faq.q}
        </p>

        {/* +/- button */}
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{
            width: 34,
            height: 34,
            background: isOpen
              ? "linear-gradient(135deg, #1a4fff 0%, #00c2ff 100%)"
              : "rgba(74,158,255,0.10)",
            border: isOpen ? "1px solid rgba(74,158,255,0.5)" : "1px solid rgba(74,158,255,0.25)",
            boxShadow: isOpen ? "0 0 14px rgba(74,158,255,0.35)" : "none",
            transition: "all 0.25s ease",
          }}
        >
          <svg
            viewBox="0 0 14 14"
            style={{ width: 13, height: 13, transition: "transform 0.25s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            fill="none"
            aria-hidden
          >
            <line x1="7" y1="2" x2="7" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="2" y1="7" x2="12" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Animated answer */}
      <div
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={answerRef} className="px-6 pb-5">
          <div style={{ width: "100%", height: 1, background: "rgba(74,158,255,0.12)", marginBottom: 16 }} />
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(199,210,220,0.65)",
            lineHeight: 1.75,
            textAlign: "left",
          }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "#060f1e" }}>
      {/* ambient glow */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, bottom: 0, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,60,180,0.09) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div ref={ref} className="relative z-10 w-full max-w-[1192px] mx-auto px-6 md:px-10 pt-8 pb-24">

        {/* Header */}
        <div
          className="mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "2.16px", textTransform: "uppercase", color: "#4a9eff", marginBottom: 12 }}>
            Honest answers
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.85px", color: "#c7d2dc", lineHeight: 1.15 }}>
            Questions you&apos;re about to ask.
          </h2>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
