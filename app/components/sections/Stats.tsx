import Image from "next/image";

const STAT_IMAGES = [
  { src: "/images/tools/tool-card-1.png", alt: "175 Countries live" },
  { src: "/images/tools/tool-card-2.png", alt: "9 Languages" },
  { src: "/images/tools/tool-card-3.png", alt: "6 Career paths" },
  { src: "/images/tools/tool-card-4.png", alt: "6 Ecosystem features" },
] as const;

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0b1424" }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[80px] pb-24 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_IMAGES.map((s) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={289}
              height={138}
              className="w-full h-auto rounded-2xl"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
