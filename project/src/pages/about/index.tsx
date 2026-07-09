import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUp } from "@/components/animations/CountUp";
import { ShieldCheck, Heart, Sparkles, Smile } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      
      {/* Story Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Our <span className="text-secondary">Story.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Joy Junction was born out of a simple observation: Dhanbad needed a world-class space where families could truly play together. Not just sit and watch, but actively engage, laugh, and create memories in a premium, safe environment.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-24">
          <ScrollReveal direction="right">
            <div className="bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-3xl font-bold mb-4 relative z-10">Our Mission</h3>
               <p className="text-lg text-primary-foreground/90 leading-relaxed relative z-10">
                 To provide an unparalleled entertainment experience that bridges the generational gap, bringing cutting-edge amusement to the heart of Jharkhand.
               </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Uncompromising Safety</h4>
                  <p className="text-muted-foreground">International standard equipment, continuous maintenance, and certified staff ensure peace of mind.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Premium Experience</h4>
                  <p className="text-muted-foreground">From the ambiance to the air conditioning and hygiene, everything is designed to feel world-class.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Community First</h4>
                  <p className="text-muted-foreground">We aren't just a business; we are a hub for joy in Dhanbad. We listen, adapt, and grow with you.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="bg-muted rounded-[3rem] p-12 max-w-6xl mx-auto">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             <ScrollReveal delay={0.1}>
               <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                 <CountUp to={10} suffix="k+" />
               </div>
               <div className="text-muted-foreground font-medium">Happy Families</div>
             </ScrollReveal>
             <ScrollReveal delay={0.2}>
               <div className="text-4xl md:text-5xl font-black text-secondary mb-2">
                 <CountUp to={6} />
               </div>
               <div className="text-muted-foreground font-medium">Core Attractions</div>
             </ScrollReveal>
             <ScrollReveal delay={0.3}>
               <div className="text-4xl md:text-5xl font-black text-accent mb-2">
                 <CountUp to={500} suffix="+" />
               </div>
               <div className="text-muted-foreground font-medium">Parties Hosted</div>
             </ScrollReveal>
             <ScrollReveal delay={0.4}>
               <div className="text-4xl md:text-5xl font-black text-purple-500 mb-2">
                 <CountUp to={100} suffix="%" />
               </div>
               <div className="text-muted-foreground font-medium">Commitment to Fun</div>
             </ScrollReveal>
           </div>
        </div>

      </div>
    </div>
  );
}
