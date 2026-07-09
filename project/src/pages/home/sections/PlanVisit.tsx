import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlanVisit() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <ScrollReveal direction="right">
            <div className="w-full h-[500px] rounded-[28px] overflow-hidden border border-border shadow-sm">
              <iframe
                title="Joy Junction location map"
                src="https://www.google.com/maps?q=City+Centre+Bartand+Dhanbad+Jharkhand&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="lg:pl-6">
              <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
                Plan Your Visit
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight">
                Ready to play?
              </h2>

              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Operating Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 11:00 AM – 10:00 PM</p>
                    <p className="text-muted-foreground">Sat - Sun & Holidays: 10:00 AM – 11:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-muted-foreground">City Centre, Bartand</p>
                    <p className="text-muted-foreground">Dhanbad, Jharkhand 826001</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Contact</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-muted-foreground">hello@joyjunction.in</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Car size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Parking</h4>
                    <p className="text-muted-foreground">Ample free parking available for visitors.</p>
                  </div>
                </div>
              </div>

              <a href="https://maps.google.com/?q=City+Centre+Bartand+Dhanbad+Jharkhand" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full px-8 font-bold w-full sm:w-auto h-14 text-lg shadow-lg">
                  Get Directions →
                </Button>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
