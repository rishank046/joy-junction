import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Timer, PartyPopper, Users, Gift, Ticket, Calendar } from "lucide-react";

const offers = [
  {
    title: "Weekend Family Pass",
    desc: "20% off total entry when booking for 4+ people on Saturdays or Sundays. Bring the whole family for an unforgettable weekend.",
    icon: Users,
    color: "bg-primary",
    valid: "Weekends Only",
    terms: "Minimum 4 persons. Valid on all attractions except food court."
  },
  {
    title: "Birthday Month Special",
    desc: "Show your ID on your birthday month and get your entry to any one attraction absolutely free!",
    icon: PartyPopper,
    color: "bg-secondary",
    valid: "Birthday Month",
    terms: "Government ID proof required. One time use only."
  },
  {
    title: "School Group Discount",
    desc: "30% off for school groups of 10 or more. Perfect for field trips and sports day out.",
    icon: Timer,
    color: "bg-accent text-accent-foreground",
    valid: "Mon-Fri (11am-4pm)",
    terms: "School ID required. Pre-booking mandatory."
  },
  {
    title: "Early Bird Strike",
    desc: "Book a bowling lane before 1 PM and get 50% off on your second game.",
    icon: Ticket,
    color: "bg-purple-500",
    valid: "Daily before 1 PM",
    terms: "Subject to lane availability."
  },
  {
    title: "Arcade Bonanza",
    desc: "Recharge your arcade card with ₹1000 and get ₹300 bonus value instantly.",
    icon: Gift,
    color: "bg-green-500",
    valid: "Always Valid",
    terms: "Bonus value non-refundable and valid for 30 days."
  },
  {
    title: "Student Thursdays",
    desc: "Flash your college ID every Thursday and grab a flat 25% discount on all VR and Console gaming.",
    icon: Calendar,
    color: "bg-blue-400",
    valid: "Thursdays",
    terms: "Valid college ID mandatory."
  }
];

export default function Offers() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto py-16">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
              Current Promotions
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              More Fun. <span className="text-primary">Less Spend.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Grab these limited-time deals and make your visit to Joy Junction even better.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {offers.map((offer, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-card border border-border rounded-3xl p-8 flex flex-col h-full relative overflow-hidden group hover:border-primary/50 transition-colors">
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${offer.color}`}>
                    <offer.icon size={28} />
                  </div>
                  <div className="bg-muted px-3 py-1 text-xs font-bold rounded-full text-muted-foreground">
                    {offer.valid}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1 text-[15px] leading-relaxed">
                  {offer.desc}
                </p>

                <div className="pt-6 border-t border-border mt-auto">
                  <p className="text-xs text-muted-foreground mb-4">
                    * {offer.terms}
                  </p>
                  <a href="/contact" className="block">
                    <Button className="w-full rounded-xl font-bold bg-zinc-900 text-white hover:bg-zinc-800">
                      Claim Offer
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
