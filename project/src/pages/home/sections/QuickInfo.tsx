import { MapPin, Clock, Ticket, Star, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/animations/CountUp";

const infoItems = [
  { icon: MapPin, text: "City Centre, Dhanbad" },
  { icon: Clock, text: "Open 11am – 10pm" },
  { icon: Ticket, text: "From ₹199/person" },
  { icon: PartyPopper, text: "Birthday Packages Available" },
];

export function QuickInfo() {
  return (
    <div className="bg-primary text-primary-foreground py-3.5 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-3 text-sm md:text-[0.9rem] font-semibold"
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Star className="w-4 h-4 text-accent shrink-0" strokeWidth={2.25} />
            <span>
              <CountUp to={4.8} decimals={1} />/5 · <CountUp to={2400} suffix="+" /> Reviews
            </span>
          </div>

          {infoItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
              <item.icon className="w-4 h-4 text-accent shrink-0" strokeWidth={2.25} />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
