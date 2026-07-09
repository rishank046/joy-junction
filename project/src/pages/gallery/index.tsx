import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HorizontalScrollGallery } from "@/components/animations/HorizontalScrollGallery";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import heroImg from "@/assets/real/hero-venue.jpg";
import b1 from "@/assets/real/bowling-real.jpg";
import b4 from "@/assets/real/bowling4-real.jpg";
import a1 from "@/assets/real/arcade-real.jpg";
import k1 from "@/assets/real/kids-real.jpg";
import ins9 from "@/assets/real/insider9-real.jpg";
import ins10 from "@/assets/real/insider10-real.jpg";
import ins11 from "@/assets/real/insider11-real.jpg";
import ins12 from "@/assets/real/insider12-real.jpg";
import ins14 from "@/assets/real/insider14-real.jpg";
import ins15 from "@/assets/real/insider15-real.jpg";
import ins16 from "@/assets/real/insider16-real.jpg";
import ins20 from "@/assets/real/insider20-real.jpg";

const categories = ["All", "Trampoline", "Bowling", "Arcade", "Birthday"];

const images = [
  { src: heroImg, category: "All", alt: "Inside Joy Junction's arena" },
  { src: ins20, category: "Trampoline", alt: "Trampoline zone" },
  { src: b1, category: "Bowling", alt: "Bowling lane in action" },
  { src: a1, category: "Arcade", alt: "Arcade floor" },
  { src: k1, category: "All", alt: "Kids play area" },
  { src: ins14, category: "Birthday", alt: "Birthday celebration" },
  { src: ins16, category: "Birthday", alt: "Party guests" },
  { src: ins15, category: "Birthday", alt: "Kids having fun" },
  { src: b4, category: "Bowling", alt: "Bowling alley" },
  { src: ins10, category: "Arcade", alt: "Arcade action" },
  { src: ins11, category: "All", alt: "Guests enjoying attractions" },
  { src: ins12, category: "All", alt: "Inside the venue" },
  { src: ins9, category: "All", alt: "Shooting range" },
];

// Curated strip for the horizontal "walk through" experience at the top of the page.
const walkthroughImages = [
  { src: heroImg, alt: "Inside Joy Junction's arena" },
  { src: ins20, alt: "Trampoline zone" },
  { src: b1, alt: "Bowling lane in action" },
  { src: a1, alt: "Arcade floor" },
  { src: k1, alt: "Kids play area" },
  { src: ins9, alt: "Shooting range" },
  { src: ins16, alt: "Party guests" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeTab === "All" 
    ? images 
    : images.filter(img => img.category === activeTab || img.category === "All");

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto py-12">
          <ScrollReveal>
            <span className="text-sm font-bold text-primary tracking-wide uppercase mb-3 block">
              Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Our <span className="text-primary">gallery.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Moments of joy, captured in frame.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Explore the Zone — pinned horizontal walkthrough */}
      <HorizontalScrollGallery
        images={walkthroughImages}
        eyebrow="Explore the Zone"
        title="Walk through the venue."
        subtitle="Keep scrolling — the space moves with you."
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto pt-24 pb-12">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Browse by category
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    activeTab === cat 
                      ? "bg-foreground text-background" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
          {filteredImages.map((img, idx) => (
            <ScrollReveal key={idx} delay={(idx % 6) * 0.1}>
              <div 
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">View</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedImage && (
            <img src={selectedImage} alt="Enlarged" className="w-full h-auto max-h-[90vh] object-contain rounded-xl" />
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
