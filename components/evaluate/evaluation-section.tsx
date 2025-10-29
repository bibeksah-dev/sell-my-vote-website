"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2, Circle } from "lucide-react"

interface EvaluationItem {
  id: string
  text: string
  textNp: string
}

interface EvaluationSectionProps {
  title: string
  titleNp: string
  description: string
  descriptionNp: string
  items: EvaluationItem[]
  icon: React.ReactNode
  language: "en" | "np"
}

export function EvaluationSection({
  title,
  titleNp,
  description,
  descriptionNp,
  items,
  icon,
  language,
}: EvaluationSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const displayTitle = language === "np" ? titleNp : title
  const displayDescription = language === "np" ? descriptionNp : description

  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 space-y-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-terracotta-500 to-ochre-500 flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-balance mb-2">{displayTitle}</h3>
          <p className="text-muted-foreground leading-relaxed">{displayDescription}</p>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3 pl-16">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id)
          const displayText = language === "np" ? item.textNp : item.text

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
            >
              {isChecked ? (
                <CheckCircle2 className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-terracotta-400" />
              )}
              <span className={`text-base leading-relaxed ${isChecked ? "text-foreground" : "text-foreground/80"}`}>
                {displayText}
              </span>
            </button>
          )
        })}
      </div>

      {/* Progress */}
      <div className="pl-16">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            {language === "np" ? "प्रगति" : "Progress"}: {checkedItems.size}/{items.length}
          </span>
          <span>{Math.round((checkedItems.size / items.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-terracotta-500 to-forest-600 transition-all duration-300"
            style={{ width: `${(checkedItems.size / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
