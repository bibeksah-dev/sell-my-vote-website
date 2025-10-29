"use client"

import type React from "react"

import { Award, Share2, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Badge {
  id: string
  name: string
  nameNp: string
  description: string
  descriptionNp: string
  icon: React.ReactNode
  earned: boolean
}

interface BadgeDisplayProps {
  badges: Badge[]
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const { language, t } = useLanguage()

  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Award className="w-5 h-5 text-ochre-600" />
        {t("Your Achievements", "तपाईंको उपलब्धिहरू")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const displayName = language === "np" ? badge.nameNp : badge.name
          const displayDescription = language === "np" ? badge.descriptionNp : badge.description

          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center p-4 rounded-lg border-2 transition-all ${
                badge.earned
                  ? "border-ochre-500 bg-ochre-50 shadow-sm"
                  : "border-border bg-muted/30 opacity-50 grayscale"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                  badge.earned
                    ? "bg-gradient-to-br from-ochre-500 to-terracotta-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {badge.icon}
              </div>
              <h4 className="font-semibold text-sm mb-1">{displayName}</h4>
              <p className="text-xs text-muted-foreground">{displayDescription}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function getBadges(hasCalculated: boolean, hasShared: boolean, hasVisitedEvaluate: boolean): Badge[] {
  return [
    {
      id: "informed-voter",
      name: "Informed Voter",
      nameNp: "सूचित मतदाता",
      description: "Completed governance cost calculation",
      descriptionNp: "शासन लागत गणना पूरा गर्नुभयो",
      icon: <Award className="w-8 h-8" />,
      earned: hasCalculated,
    },
    {
      id: "change-maker",
      name: "Change Maker",
      nameNp: "परिवर्तन निर्माता",
      description: "Shared results with others",
      descriptionNp: "अरूसँग नतिजा साझा गर्नुभयो",
      icon: <Share2 className="w-8 h-8" />,
      earned: hasShared,
    },
    {
      id: "wise-citizen",
      name: "Wise Citizen",
      nameNp: "बुद्धिमान नागरिक",
      description: "Learned to evaluate candidates",
      descriptionNp: "उम्मेदवारहरूको मूल्याङ्कन गर्न सिक्नुभयो",
      icon: <BookOpen className="w-8 h-8" />,
      earned: hasVisitedEvaluate,
    },
  ]
}
