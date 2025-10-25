"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight

        // Hide indicator when user scrolls past the home section
        setIsVisible(scrollPosition < homeSectionBottom + 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={scrollToAbout}
        className="flex flex-row items-center gap-3 group cursor-pointer bg-white/90 backdrop-blur-sm px-8 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-[#FA4616]"
        aria-label="Scroll to about section"
      >
        <span className="text-sm font-medium text-[#0021A5]">Learn More</span>
        <ChevronDown className="h-4 w-4 text-[#FA4616] animate-bounce-slow" />
      </button>
    </div>
  )
}
