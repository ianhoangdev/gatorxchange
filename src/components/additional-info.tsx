"use client";

import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Gmail", icon: Mail, href: "mailto:gators@gatorexchange.edu" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function AdditionalInfo() {
  return (
    <section className="bg-gradient-to-b from-[#00153D] via-[#001a4a] to-[#000d26] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Contact Us</p>
          <h3 className="text-3xl md:text-4xl font-bold drop-shadow">Stay connected with the GatorXchange team</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Questions, partnerships, or feedback? Reach out anytime—we love hearing from fellow Gators.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="group h-14 w-14 rounded-full border border-white/25 bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-black/30 hover:-translate-y-1 hover:border-white/60 hover:bg-white/20 transition"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="h-6 w-6 text-white drop-shadow group-hover:scale-110 transition" />
            </a>
          ))}
        </div>

        <div className="text-sm text-white/60 space-y-1">
          <p>© {new Date().getFullYear()} GatorXchange. All rights reserved.</p>
          <p>Built by and for the University of Florida community. Content and listings remain property of their owners.</p>
        </div>
      </div>
    </section>
  );
}
