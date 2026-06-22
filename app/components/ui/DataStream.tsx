interface DataStreamProps {
  /** number of vertical streams */
  columns?: number;
  /** stream color */
  color?: string;
  className?: string;
}

/**
 * Decorative falling "data stream" background — faint vertical light segments
 * that drop through the parent, evoking a robotic data feed. Purely cosmetic
 * (aria-hidden, pointer-events: none).
 *
 * Deterministic per-column timing (no Math.random) so server and client render
 * identically — no hydration mismatch. Place inside a `position: relative;
 * overflow: hidden` container. Auto-hides under prefers-reduced-motion via the
 * global motion rule (the animation jumps to its faded-out end state).
 */
export default function DataStream({
  columns = 16,
  color = "rgba(0,194,255,0.5)",
  className = "",
}: DataStreamProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: columns }).map((_, i) => {
        const left = ((i + 0.5) / columns) * 100;
        const duration = 3.2 + (i % 5) * 0.8; // 3.2s – 6.4s
        const delay = (i % 7) * 0.55; // staggered starts
        const height = 70 + (i % 4) * 45; // 70px – 205px segments
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: 1,
              height,
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              animation: `data-stream-fall ${duration}s linear ${delay}s infinite`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}
