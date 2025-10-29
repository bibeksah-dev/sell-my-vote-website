"use client"

import { useEffect, useState, useRef } from "react"

interface GradientProgressBarProps {
  duration: number // milliseconds
  onComplete?: () => void
}

export function GradientProgressBar({ duration, onComplete }: GradientProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const hasCompleted = useRef(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    console.log("[v0] Progress bar starting...")
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100 && !hasCompleted.current) {
        console.log("[v0] Progress bar completed")
        hasCompleted.current = true
        clearInterval(interval)
        onCompleteRef.current?.()
      }
    }, 50) // Update every 50ms for smooth animation

    return () => {
      console.log("[v0] Progress bar cleanup")
      clearInterval(interval)
    }
  }, [duration])

  return (
    <div className="w-full space-y-3">
      <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-terracotta-500 via-ochre-500 to-forest-600 transition-all duration-100 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center text-sm text-muted-foreground devanagari-numerals">{Math.round(progress)}%</div>
    </div>
  )
}
