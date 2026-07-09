import { ScrollReveal } from "@/components/animations/ScrollReveal";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";

export function FoodCourt() {
  return (
    <section className="py-24 md:py-32 bg-[#FFF9F2]">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          <ScrollReveal direction="right" className="order-2 lg:order-1 relative">
             <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src={food1} alt="Delicious Pizza" loading="lazy" className="rounded-[24px] object-cover w-full h-80 shadow-xl" />
                <img src={food2} alt="Refreshing Drinks" loading="lazy" className="rounded-[24px] object-cover w-full h-64 mt-16 shadow-xl border-4 border-white" />
             </div>
             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full -z-0 opacity-20"></div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="order-1 lg:order-2">
            <div>
              <span className="text-sm font-bold text-secondary tracking-wide uppercase mb-3 block">
                Food Court
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#3E2723] mb-6 leading-[1.05] tracking-tight">
                Fuel up. <br/>
                <span className="text-secondary">Game on.</span>
              </h2>
              <p className="text-lg text-[#5D4037] mb-10 max-w-lg font-medium leading-relaxed">
                Recharge after an intense gaming session at our premium food court. Serving fresh, hot, and hygienic meals that the whole family will love.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <h4 className="font-bold text-[#3E2723] text-lg mb-2">Fresh Pizzas</h4>
                  <p className="text-[#5D4037]/80 text-sm leading-relaxed">Wood-fired goodness with premium toppings.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#3E2723] text-lg mb-2">Quick Bites</h4>
                  <p className="text-[#5D4037]/80 text-sm leading-relaxed">Burgers, fries, and crunchy snacks to go.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#3E2723] text-lg mb-2">Mocktails</h4>
                  <p className="text-[#5D4037]/80 text-sm leading-relaxed">Refreshing signature drinks.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#3E2723] text-lg mb-2">Cozy Seating</h4>
                  <p className="text-[#5D4037]/80 text-sm leading-relaxed">Comfortable spaces to relax and chat.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
