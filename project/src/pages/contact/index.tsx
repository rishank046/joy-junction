import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto py-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Get in <span className="text-primary">Touch.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question, want to book a party, or just want to say hi? We're all ears.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          <ScrollReveal direction="right">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">First Name</label>
                    <Input placeholder="John" className="h-12 bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Last Name</label>
                    <Input placeholder="Doe" className="h-12 bg-muted/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email</label>
                    <Input type="email" placeholder="john@example.com" className="h-12 bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Phone</label>
                    <Input type="tel" placeholder="+91 98765 43210" className="h-12 bg-muted/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Subject</label>
                  <Select>
                    <SelectTrigger className="h-12 bg-muted/50">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="birthday">Birthday Booking</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[120px] bg-muted/50 resize-none" />
                </div>

                <Button className="w-full h-12 text-lg font-bold rounded-xl">
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="space-y-8">
              
              <div className="w-full h-64 rounded-3xl overflow-hidden border border-border mb-8">
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

              <div className="grid grid-cols-2 gap-4 mb-8">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full h-12 rounded-xl font-bold bg-[#25D366] hover:bg-[#1fb958] text-white">
                    <MessageCircle size={18} className="mr-2" /> WhatsApp Us
                  </Button>
                </a>
                <a href="tel:+919876543210">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                    <Phone size={18} className="mr-2" /> Call Now
                  </Button>
                </a>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <h4 className="text-xl font-bold mb-6 text-foreground">Contact Information</h4>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-medium">City Centre, Bartand</p>
                      <p className="text-muted-foreground text-sm">Dhanbad, Jharkhand 826001</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="font-medium">+91 98765 43210</p>
                      <p className="text-muted-foreground text-sm">Mon-Sun, 10am to 10pm</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-medium">hello@joyjunction.in</p>
                      <p className="text-muted-foreground text-sm">We reply within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
