import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    rating: 5,
    text: "Absolutely stunning place! The kids had a blast in the trampoline park and the food was surprisingly amazing. Highly recommended for families.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    rating: 5,
    text: "Hosted my son's 10th birthday here. The staff took care of everything from decorations to food. The unlimited arcade card was a huge hit!",
    color: "bg-orange-100 text-orange-700"
  },
  {
    name: "Anita Singh",
    initials: "AS",
    rating: 4,
    text: "A premium vibe that Dhanbad really needed. The bowling alley is world-class. Can get a bit crowded on weekends, but definitely worth the visit.",
    color: "bg-purple-100 text-purple-700"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
              Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Smiles don't lie.
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it. Hear from the families who made memories.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((test, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-card border border-border p-8 rounded-[24px] shadow-sm h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < test.rating ? "text-accent fill-accent" : "text-muted"}
                    />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-8 font-medium leading-relaxed italic flex-1">
                  "{test.text}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={`font-bold ${test.color}`}>{test.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground">{test.name}</h4>
                    <span className="text-sm text-muted-foreground">Local Guide</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
