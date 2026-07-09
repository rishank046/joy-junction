import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

import g1 from "@/assets/real/bowling4-real.jpg";
import g2 from "@/assets/real/arcade-real.jpg";
import g3 from "@/assets/real/insider10-real.jpg";
import g4 from "@/assets/real/insider12-real.jpg";

export function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-sm font-bold text-accent tracking-wide uppercase mb-3 block">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Captured moments.
              </h2>
              <p className="text-xl text-zinc-400">
                A glimpse into the joy we create every day.
              </p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="rounded-full px-6 font-bold border-zinc-700 text-white hover:bg-white hover:text-black transition-colors">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
          <ScrollReveal delay={0.1} className="md:col-span-2 md:row-span-2">
            <div className="w-full h-full min-h-[280px] rounded-[24px] overflow-hidden group">
              <img src={g1} alt="Bowling lanes at Joy Junction" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="w-full h-full min-h-[220px] rounded-[24px] overflow-hidden group">
              <img src={g2} alt="Arcade floor" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="md:col-span-1">
            <div className="w-full h-full min-h-[180px] rounded-[24px] overflow-hidden group">
              <img src={g3} alt="Guests enjoying attractions" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="md:col-span-1">
            <div className="w-full h-full min-h-[180px] rounded-[24px] overflow-hidden group">
              <img src={g4} alt="Inside Joy Junction" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
