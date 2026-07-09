import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Timer, PartyPopper, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const offers = [
  {
    title: "Weekend Family Pass",
    desc: "20% off total entry when booking for 4+ people on Saturdays or Sundays.",
    icon: Users,
    color: "bg-primary",
    tag: "Popular"
  },
  {
    title: "Birthday Month Special",
    desc: "Show your ID on your birthday month and get your entry absolutely free!",
    icon: PartyPopper,
    color: "bg-secondary",
    tag: "Special"
  },
  {
    title: "School Group Discount",
    desc: "30% off for school groups of 10 or more. Perfect for field trips.",
    icon: Timer,
    color: "bg-accent text-accent-foreground",
    tag: "Groups"
  }
];

export function OffersDeals() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
                Offers
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Exclusive offers.
              </h2>
              <p className="text-xl text-muted-foreground">
                Maximize your fun without stretching your wallet.
              </p>
            </div>
            <Link href="/offers">
              <Button variant="outline" className="rounded-full px-6 font-bold">
                View All Deals
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="group relative bg-card border border-border p-8 rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${offer.color}`} />
                
                <div className="flex justify-between items-start mb-6 relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${offer.color.includes('bg-accent') ? 'bg-accent text-black' : offer.color}`}>
                    <offer.icon size={22} />
                  </div>
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-bold rounded-full">
                    {offer.tag}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 relative">{offer.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative">
                  {offer.desc}
                </p>

                <div className="text-primary font-bold text-sm cursor-pointer hover:underline relative">
                  Claim Offer →
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
