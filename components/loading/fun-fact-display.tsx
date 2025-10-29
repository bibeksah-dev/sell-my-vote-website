"use client"

import { useEffect, useState } from "react"
import type { FunFact } from "@/types/survey"

interface FunFactDisplayProps {
  facts: FunFact[]
  displayDuration?: number // milliseconds per fact
}

export function FunFactDisplay({ facts, displayDuration = 8000 }: FunFactDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (facts.length === 0) return

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)

      // Wait for fade out, then change fact and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % facts.length)
        setIsVisible(true)
      }, 500)
    }, displayDuration)

    return () => clearInterval(interval)
  }, [facts.length, displayDuration])

  if (facts.length === 0) return null

  const currentFact = facts[currentIndex]

  return (
    <div className="min-h-[120px] flex items-center justify-center px-4">
      <div
        className={`max-w-2xl text-center transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-balance">{currentFact.text}</p>
      </div>
    </div>
  )
}
