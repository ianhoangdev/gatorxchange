"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/90 via-background/60 to-transparent">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <span className="text-xl font-semibold text-[#0021A5] drop-shadow-sm">Gator Exchange</span>
          <Button
            variant="secondary"
            className="bg-[#FA4616] text-white hover:bg-[#FA4616]/90"
            onClick={signInWithGoogle}
          >
            Sign in
          </Button>
        </div>
      </header>

      <main>
        <Hero onSignIn={signInWithGoogle} />
        <ScrollIndicator />
        <About />
      </main>
    </div>
  );
}
