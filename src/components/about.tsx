"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Users, Shield, MessageCircle, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for real UF students with verified profiles and trust baked in.",
  },
  {
    icon: TrendingUp,
    title: "Local Momentum",
    description: "Only see listings that move on campus -- no clutter, just what you need.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Protected by secure auth, smart reporting, and fast support when you need it.",
  },
  {
    icon: MessageCircle,
    title: "Talk, Trade, Done",
    description: "Chat quickly, meet up safely, and close exchanges without friction.",
  },
  {
    icon: Sparkles,
    title: "UF Flavor",
    description: "Tailored to Gators -- gear, tickets, books, and everything orange & blue.",
  },
];

export function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });

  useEffect(() => {
    if (!emblaApi) return;

    const id = window.setInterval(() => {
      if (!emblaApi) return;
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
        return;
      }
      emblaApi.scrollNext();
    }, 4200);

    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-[#00153D] via-[#011E57] to-[#00153D] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
            <Sparkles className="h-5 w-5 text-[#FA4616]" />
            <span className="uppercase tracking-[0.2em] text-xs font-semibold text-white/80">Made For Gators</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
            Why Choose Gator Exchange?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mt-4">
            Liquid-glass cards spotlight what matters: safety, speed, and a marketplace that feels like it was designed
            for campus life.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-white/70 text-sm">Swipe through what makes us different</span>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous highlight"
                onClick={() => emblaApi?.scrollPrev()}
                className="h-11 w-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-lg flex items-center justify-center hover:border-white/70 hover:bg-white/20 transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next highlight"
                onClick={() => emblaApi?.scrollNext()}
                className="h-11 w-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-lg flex items-center justify-center hover:border-white/70 hover:bg-white/20 transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="min-w-[85%] sm:min-w-[60%] md:min-w-[48%] lg:min-w-[36%] px-3 pb-2"
                  aria-label={`Feature card ${index + 1}`}
                >
                  <div className="relative overflow-hidden rounded-3xl p-8 h-full border border-white/25 bg-white/10 backdrop-blur-2xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] group">
                    <div className="absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[#FA4616]/40 blur-3xl opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute right-[-18%] top-6 h-40 w-40 rounded-full bg-[#0021A5]/60 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 border border-white/10 rounded-3xl" />

                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6 shadow-inner shadow-white/10 group-hover:-translate-y-1 transition-transform">
                        <feature.icon className="h-7 w-7 text-white drop-shadow" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 drop-shadow">{feature.title}</h3>
                      <p className="text-white/75 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
