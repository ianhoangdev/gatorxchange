"use client";

import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HeroProps = {
  onSignIn: () => void;
};

const TITLE_WORDS = ["Welcome", "to", "the", "GatorXchange!"];

export function Hero({ onSignIn }: HeroProps) {
  const [animatedWords, setAnimatedWords] = useState<number[]>([]);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    timersRef.current = TITLE_WORDS.map((_, index) =>
      window.setTimeout(() => {
        setAnimatedWords((prev) => (prev.includes(index) ? prev : [...prev, index]));
      }, index * 150),
    );

    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/uf-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
          <span style={{ perspective: "1000px", display: "inline-block" }}>
            {TITLE_WORDS.map((word, index) => (
              <span
                key={word}
                className={`inline-block mx-2 ${
                  index === 3 || index === 4
                    ? "text-[#FA4616] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                }`}
                style={{
                  opacity: animatedWords.includes(index) ? 1 : 0,
                  transform: animatedWords.includes(index)
                    ? "translateZ(0) scale(1)"
                    : "translateZ(-100px) scale(0.8)",
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transformStyle: "preserve-3d",
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-lg">
          Buy, sell, and trade items within your campus community. Safe, easy, and exclusively for students.
        </p>

        <div className="pt-4">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-[#FA4616] hover:bg-[#FA4616]/90 text-white shadow-lg hover:shadow-xl transition-all"
            onClick={onSignIn}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div>

        <p className="text-sm text-white/80 pt-4 drop-shadow">Trusted by thousands of UF students</p>
      </div>
    </section>
  );
}
