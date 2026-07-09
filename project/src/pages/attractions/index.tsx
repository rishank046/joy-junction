import { attractionsData } from "@/data/attractions";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

export default function Attractions() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      
      <div className="container mx-auto px-6 md:px-10 py-12 text-center max-w-3xl">
        <ScrollReveal>
          <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
            Attractions
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Choose your <span className="text-primary">adventure.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            From high-flying trampolines to next-gen console gaming, Joy Junction offers world-class entertainment for every age group.
          </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-6 md:px-10 space-y-28 md:space-y-32 mb-20">
        {attractionsData.map((attr, idx) => (
          <div key={attr.id} id={attr.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            
            <ScrollReveal className="w-full lg:w-1/2" direction={idx % 2 !== 0 ? "left" : "right"}>
              <TiltCard maxTilt={6} liftPx={0}>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square md:aspect-[4/3]">
                  <img src={attr.imagePath} alt={attr.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]"></div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal className="w-full lg:w-1/2" direction={idx % 2 !== 0 ? "right" : "left"}>
              <div>
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full flex items-center gap-1">
                    <Users size={14} /> {attr.age}
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-bold rounded-full flex items-center gap-1">
                    <Clock size={14} /> {attr.duration}
                  </span>
                </div>
                
                <h2 className="text-4xl font-bold mb-4">{attr.title}</h2>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < attr.popularity ? "text-accent fill-accent" : "text-muted"} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground font-medium">Popularity</span>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {attr.description}
                </p>

                <div className="space-y-4 mb-10">
                  <h4 className="font-bold text-foreground">Safety Rules & Info</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Grip socks required for Trampoline/Play area.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Sanitized equipment after every session.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Constant supervision by trained staff.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact">
                    <Button size="lg" className="rounded-full px-8 text-lg font-bold h-14">
                      Book Session <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollReveal>

          </div>
        ))}
      </div>
    </div>
  );
}
