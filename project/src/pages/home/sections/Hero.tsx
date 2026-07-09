import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImg from "@/assets/real/hero-venue.jpg";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Real parallax: image moves slower than scroll, fades out as you leave.
  // Values pushed up from their original 22%/12%/0.6 so the effect reads
  // as a quicker, more responsive reaction to scroll input.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full flex items-end overflow-hidden bg-foreground"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY, scale: 1.12 }}
      >
        <img
          src={heroImg}
          alt="Families and friends playing inside Joy Junction's arcade and play arena"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* Layered scrim for legible type without flattening the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 mx-auto px-6 md:px-10 pb-20 md:pb-28"
      >
        <div className="max-w-4xl">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 text-sm font-semibold text-white/90 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Dhanbad's Premium Indoor Entertainment Hub
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tight text-white mb-6">
              Play harder.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                Celebrate bigger.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-medium leading-relaxed">
              Trampolines, bowling, arcade, PS5 and a kids' world under one roof —
              built for families, friend groups, and birthdays worth remembering.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/attractions">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 rounded-full font-bold w-full sm:w-auto shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  Explore Attractions
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 rounded-full font-bold bg-white/5 hover:bg-white/15 text-white border-white/25 backdrop-blur-sm w-full sm:w-auto hover:-translate-y-0.5 transition-all"
                >
                  Book Your Visit
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-white/60"
        style={{ opacity: contentOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-medium tracking-wide">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
