"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { AdditionalInfo } from "@/components/additional-info";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <span className="text-xl font-semibold tracking-tight text-white drop-shadow-sm">
          <span className="text-[#FA4616]">Gator</span>Xchange
        </span>

        <Button
          variant="secondary"
          className="px-4 py-1.5 rounded-full bg-[#FA4616] text-white font-medium shadow-md shadow-black/40 hover:bg-[#FA4616]/90 transition"
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
        <AdditionalInfo />
      </main>
    </div>
  );
}
