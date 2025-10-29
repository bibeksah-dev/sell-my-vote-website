"use client"

import { useLanguage } from "@/lib/language-context"

interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const { t } = useLanguage()
  const percentage = (current / total) * 100

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="devanagari-numerals">
          {t(`Question ${current} of ${total}`, `प्रश्न ${current} को ${total}`)}
        </span>
        <span className="devanagari-numerals">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-terracotta-500 via-ochre-500 to-forest-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
