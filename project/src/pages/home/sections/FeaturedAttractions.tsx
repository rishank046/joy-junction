import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { attractionsData } from "@/data/attractions";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const TOTAL = attractionsData.length;

interface SlideProps {
  attraction: (typeof attractionsData)[number];
  index: number;
  progress: MotionValue<number>;
}

function Slide({ attraction, index, progress }: SlideProps) {
  const segment = 1 / TOTAL;
  const start = index * segment;
  const end = start + segment;
  const overlap = segment * 0.25;

  const range = [Math.max(0, start - overlap), start, end - overlap, Math.min(1, end)];

  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [48, 0, 0, -48]);
  const scale = useTransform(progress, range, [1.06, 1, 1, 0.96]);

  return (
    <>
      {/* Background image layer, crossfading */}
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <img
          src={attraction.imagePath}
          alt={attraction.title}
          loading={index === 0 ? "eager" : "lazy"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Text layer, crossfades with a slight vertical drift */}
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-16 max-w-2xl"
      >
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < attraction.popularity ? "text-accent fill-accent" : "text-white/25"}
            />
          ))}
        </div>
        <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.05]">
          {attraction.title}
        </h3>
        <p className="text-lg text-white/80 mb-7 max-w-lg font-medium leading-relaxed">
          {attraction.shortDesc}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
            {attraction.age}
          </span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
            {attraction.duration}
          </span>
        </div>
        <Link href={`/attractions#${attraction.id}`}>
          <span className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-accent pb-1 hover:gap-3 transition-all cursor-pointer">
            Explore {attraction.title} <ArrowRight size={18} />
          </span>
        </Link>
      </motion.div>
    </>
  );
}

function ProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const segment = 1 / TOTAL;
  const start = index * segment;
  const end = start + segment;
  const buffer = segment * 0.3;

  const scale = useTransform(
    progress,
    [Math.max(0, start - buffer), start, end, Math.min(1, end + buffer)],
    [1, 1.7, 1.7, 1]
  );
  const opacity = useTransform(
    progress,
    [Math.max(0, start - buffer), start, end, Math.min(1, end + buffer)],
    [0.35, 1, 1, 0.35]
  );

  return <motion.div style={{ scale, opacity }} className="w-2 h-2 rounded-full bg-white" />;
}

function ActiveCounter({ progress }: { progress: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);

  useMotionValueEvent(progress, "change", (p) => {
    setIdx(Math.min(TOTAL - 1, Math.max(0, Math.floor(p * TOTAL))));
  });

  return (
    <span className="tabular-nums">
      {String(idx + 1).padStart(2, "0")} <span className="text-white/40">/ {String(TOTAL).padStart(2, "0")}</span>
    </span>
  );
}

export function FeaturedAttractions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-background">
      <div className="container mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-4">
        <ScrollReveal>
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
              Attractions
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-5 tracking-tight leading-[1.05]">
              Thrill needs no age limit.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Scroll to walk through six world-class attractions under one roof.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Pinned scrollytelling track: this section holds N x 100vh of scroll runway
          while a single fullscreen viewport stays pinned and crossfades between attractions. */}
      <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }} className="relative mt-12">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {attractionsData.map((attr, i) => (
            <Slide key={attr.id} attraction={attr} index={i} progress={scrollYProgress} />
          ))}

          {/* Progress dots */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {attractionsData.map((_, i) => (
              <ProgressDot key={i} index={i} progress={scrollYProgress} />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-8 left-8 md:left-16 z-20 text-white font-bold text-sm tracking-widest">
            <ActiveCounter progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
