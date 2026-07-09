import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/real/logo-transparent.png";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Joy Junction" className="h-10 w-auto object-contain" />
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Joy Junction
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              India's Premier Family Entertainment Destination. Where every moment becomes a memory, right here in Dhanbad.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Joy Junction on Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Joy Junction on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Joy Junction on Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about"><div className="text-zinc-400 hover:text-white transition-colors cursor-pointer">About Us</div></Link></li>
              <li><Link href="/attractions"><div className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Attractions</div></Link></li>
              <li><Link href="/birthday"><div className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Plan a Party</div></Link></li>
              <li><Link href="/offers"><div className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Special Offers</div></Link></li>
              <li><Link href="/gallery"><div className="text-zinc-400 hover:text-white transition-colors cursor-pointer">Gallery</div></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="text-primary mt-1" size={18} />
                <span>City Centre, Bartand<br/>Dhanbad, Jharkhand 826001</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="text-primary" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="text-primary" size={18} />
                <span>hello@joyjunction.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Monday - Friday</span>
                <span className="font-medium">11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Saturday - Sunday</span>
                <span className="font-medium text-secondary">10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Public Holidays</span>
                <span className="font-medium">10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Joy Junction. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Safety Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
