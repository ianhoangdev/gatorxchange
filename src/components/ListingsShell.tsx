'use client';

import type { ReactNode } from 'react';

export function ListingsShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#00153D]/95 via-[#011E57]/95 to-[#000814]/95 overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-64 w-64 rounded-full bg-[#FA4616]/45 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-72 w-72 rounded-full bg-[#0021A5]/60 blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
