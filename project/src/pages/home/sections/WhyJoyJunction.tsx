import { ShieldCheck, Snowflake, Trophy, Users, Pizza, Gamepad2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const features = [
  { icon: Users, title: "Family Friendly", desc: "Designed for every age to enjoy together." },
  { icon: Snowflake, title: "Indoor Comfort", desc: "Fully air-conditioned environments year-round." },
  { icon: Trophy, title: "Premium Experience", desc: "World-class equipment and modern aesthetics." },
  { icon: ShieldCheck, title: "100% Safe", desc: "Certified, padded, and constantly supervised." },
  { icon: Pizza, title: "Food Court", desc: "Fresh meals, snacks, and refreshing drinks." },
  { icon: Gamepad2, title: "Modern Tech", desc: "The latest games and scoring systems." },
];

export function WhyJoyJunction() {
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="container mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="max-w-2xl mb-16 md:mb-20">
            <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
              Why Joy Junction
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              More than just a game zone.
            </h2>
            <p className="text-lg text-muted-foreground">
              Every detail engineered for your comfort and excitement.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.07}>
              <div className="bg-card border border-border p-8 rounded-[24px] hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feat.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
