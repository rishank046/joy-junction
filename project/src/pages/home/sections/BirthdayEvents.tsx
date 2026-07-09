import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUp } from "@/components/animations/CountUp";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";
import bday1 from "@/assets/real/insider14-real.jpg";
import bday2 from "@/assets/real/insider16-real.jpg";
import bday3 from "@/assets/real/insider20-real.jpg";

export function BirthdayEvents() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          <ScrollReveal direction="right">
            <div>
              <span className="text-sm font-bold text-secondary tracking-wide uppercase mb-3 block">
                Birthday Packages
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-[1.05] tracking-tight">
                Celebrate like <br/>
                <span className="text-primary">never before.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Host the ultimate party without lifting a finger. From decorations and food to unlimited gaming, we handle everything so you can make memories.
              </p>

              <div className="space-y-4 mb-10">
                {["Dedicated party host", "Customized decor & themes", "Unlimited game time included", "Premium food packages"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/birthday">
                <Button size="lg" className="rounded-full px-8 font-bold text-lg h-14 bg-secondary hover:bg-secondary/90 text-white">
                  Plan My Birthday →
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src={bday1} alt="Birthday celebration at Joy Junction" loading="lazy" className="rounded-[24px] object-cover w-full h-64 shadow-xl" />
                <img src={bday3} alt="Kids enjoying a party" loading="lazy" className="rounded-[24px] object-cover w-full h-48 shadow-lg" />
              </div>
              <div className="space-y-4">
                <img src={bday2} alt="Party guests celebrating" loading="lazy" className="rounded-[24px] object-cover w-full h-80 shadow-xl" />
                <div className="bg-primary text-primary-foreground p-6 rounded-[24px] shadow-lg flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-black mb-1">
                    <CountUp to={500} suffix="+" />
                  </div>
                  <div className="text-sm font-semibold opacity-90">Parties Hosted</div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
