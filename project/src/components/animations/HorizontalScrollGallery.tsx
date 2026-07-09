import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
}

interface HorizontalScrollGalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Pins the section in place while the user scrolls vertically, and pans
 * a horizontal strip of photos across the screen in response — a
 * "walk through the venue" sensation instead of a static grid.
 */
export function HorizontalScrollGallery({ images, eyebrow, title, subtitle }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setDistance(Math.max(trackWidth - viewportWidth, 0));
    };

    measure();
    window.addEventListener("resize", measure);

    // Re-measure once images finish loading (their natural size affects layout).
    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => img.addEventListener("load", measure));

    return () => {
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => img.removeEventListener("load", measure));
    };
  }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Scroll runway length scales with how far the strip needs to travel,
  // so the pan speed feels consistent regardless of image count/viewport.
  // Kept short/punchy on purpose — a long runway reads as "slow" scrolling.
  const runwayVh = Math.min(Math.max(images.length * 28, 160), 320);

  return (
    <section className="bg-foreground text-background">
      {(eyebrow || title || subtitle) && (
        <div className="container mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-12">
          {eyebrow && (
            <span className="text-sm font-bold text-accent tracking-wide uppercase mb-3 block">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight max-w-2xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-xl text-zinc-400 max-w-xl">{subtitle}</p>}
        </div>
      )}

      <div ref={containerRef} style={{ height: `${runwayVh}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-5 md:gap-8 px-6 md:px-10 will-change-transform">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 h-[55vh] md:h-[65vh] w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] rounded-[24px] overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
