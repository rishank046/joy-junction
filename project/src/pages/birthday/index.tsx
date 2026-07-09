import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Check, PartyPopper } from "lucide-react";
import bday1 from "@/assets/real/insider14-real.jpg";
import bday2 from "@/assets/real/insider16-real.jpg";
import bday3 from "@/assets/real/insider20-real.jpg";

const packages = [
  {
    name: "Silver",
    price: "₹3,999",
    guests: "Up to 10 Kids",
    color: "bg-zinc-100 text-zinc-800",
    btnColor: "bg-zinc-800 hover:bg-zinc-900 text-white",
    features: [
      "90 Mins Play Area / Trampoline",
      "Dedicated Party Host",
      "Standard Decorations",
      "Kids Meal Box (Burger/Fries/Juice)",
      "Digital Invitations"
    ]
  },
  {
    name: "Gold",
    price: "₹6,999",
    guests: "Up to 15 Kids",
    color: "bg-primary/10 text-primary",
    btnColor: "bg-primary hover:bg-primary/90 text-white",
    popular: true,
    features: [
      "2 Hours All Access Pass",
      "Dedicated Party Host",
      "Premium Theme Decorations",
      "Premium Food Buffet",
      "Return Gifts for Kids",
      "Arcade Card (₹500 value) for Birthday Child"
    ]
  },
  {
    name: "Platinum",
    price: "₹11,999",
    guests: "Up to 25 Kids",
    color: "bg-gradient-to-br from-accent to-secondary text-white",
    btnColor: "bg-white text-black hover:bg-zinc-100",
    features: [
      "3 Hours Unlimited Access",
      "2 Dedicated Party Hosts",
      "Luxury Theme Setup & Cake Cutting",
      "Extensive Food Buffet (Kids & Parents)",
      "Premium Return Gifts",
      "Photography & Video Coverage",
      "Private Party Room"
    ]
  }
];

export default function BirthdayEvents() {
  return (
    <div className="min-h-screen bg-background pt-24">
      
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <PartyPopper size={48} className="mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              The Ultimate Birthday Destination.
            </h1>
            <p className="text-xl text-primary-foreground/80 font-medium">
              We handle the planning, the mess, and the entertainment. You just bring the guests and the smiles.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Packages */}
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className={`relative rounded-3xl p-8 border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-primary scale-105 md:scale-110 z-10' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className={`w-fit px-4 py-1.5 rounded-full font-bold text-sm mb-6 ${pkg.color}`}>
                  {pkg.name} Package
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-foreground">{pkg.price}</span>
                </div>
                <p className="text-muted-foreground font-medium mb-8">{pkg.guests}</p>

                <ul className="space-y-4 mb-8 min-h-[300px]">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-primary mt-1 shrink-0" />
                      <span className="text-foreground/80 font-medium text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href="/contact" className="block">
                  <Button className={`w-full rounded-full h-14 font-bold text-lg ${pkg.btnColor}`}>
                    Book {pkg.name}
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Gallery Strip */}
      <div className="py-12 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-10 text-center">
          <h2 className="text-3xl font-bold">A Glimpse of the Fun</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-8 px-4 md:px-6 snap-x hide-scrollbar">
          {[bday1, bday2, bday3].map((img, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] h-72 rounded-3xl overflow-hidden snap-center shrink-0">
              <img src={img} alt="Birthday Fun" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ / Contact */}
      <div className="container mx-auto px-4 md:px-6 py-24 text-center max-w-2xl">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-6">Need a custom package?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Whether it's a corporate event, a school trip, or a customized birthday party, our events team can craft the perfect experience.
          </p>
          <a href="/contact">
            <Button size="lg" variant="outline" className="rounded-full px-8 font-bold h-14">
              Contact Events Team
            </Button>
          </a>
        </ScrollReveal>
      </div>

    </div>
  );
}
