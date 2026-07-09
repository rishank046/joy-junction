import { Hero } from "./sections/Hero";
import { QuickInfo } from "./sections/QuickInfo";
import { FeaturedAttractions } from "./sections/FeaturedAttractions";
import { WhyJoyJunction } from "./sections/WhyJoyJunction";
import { BirthdayEvents } from "./sections/BirthdayEvents";
import { FoodCourt } from "./sections/FoodCourt";
import { OffersDeals } from "./sections/OffersDeals";
import { GalleryPreview } from "./sections/GalleryPreview";
import { Testimonials } from "./sections/Testimonials";
import { PlanVisit } from "./sections/PlanVisit";
import { SectionSeam } from "@/components/animations/SectionSeam";

// Flat color reference matching each section's actual background,
// used purely to paint the gradient bleed between them.
const c = {
  black: "#0a0a0a",
  blue: "#0066FF",
  white: "#ffffff",
  lightGray: "#f6f7f8",
  cream: "#FFF9F2",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SectionSeam from={c.black} to={c.blue} height={64} />
      <QuickInfo />
      <SectionSeam from={c.blue} to={c.white} height={64} />
      <FeaturedAttractions />
      <SectionSeam from={c.white} to={c.lightGray} />
      <WhyJoyJunction />
      <SectionSeam from={c.lightGray} to={c.white} />
      <BirthdayEvents />
      <SectionSeam from={c.white} to={c.cream} />
      <FoodCourt />
      <SectionSeam from={c.cream} to={c.white} />
      <OffersDeals />
      <SectionSeam from={c.white} to={c.black} height={64} />
      <GalleryPreview />
      <SectionSeam from={c.black} to={c.lightGray} height={64} />
      <Testimonials />
      <SectionSeam from={c.lightGray} to={c.white} />
      <PlanVisit />
    </div>
  );
}
