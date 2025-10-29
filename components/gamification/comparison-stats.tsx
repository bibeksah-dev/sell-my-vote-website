"use client"

import { useLanguage } from "@/lib/language-context"
import { TrendingUp, Users, MapPin } from "lucide-react"

interface ComparisonStatsProps {
  userCost: number
  averageCost: number
  percentile: number
  provinceRank: number
}

export function ComparisonStats({ userCost, averageCost, percentile, provinceRank }: ComparisonStatsProps) {
  const { t } = useLanguage()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("NPR", "Rs.")
  }

  return (
    <div className="bg-gradient-to-br from-forest-50 to-cream-100 rounded-xl border border-forest-200 shadow-md p-6 space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-forest-600" />
        {t("How You Compare", "तपाईं कसरी तुलना गर्नुहुन्छ")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Percentile */}
        <div className="bg-white/80 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-forest-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-forest-700 devanagari-numerals">
            {t(`Top ${percentile}%`, `शीर्ष ${percentile}%`)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t("Governance awareness", "शासन जागरूकता")}</p>
        </div>

        {/* Average Comparison */}
        <div className="bg-white/80 rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">
            {t("Average for your demographic", "तपाईंको जनसांख्यिकीको औसत")}
          </div>
          <div className="text-xl font-bold text-foreground devanagari-numerals">{formatCurrency(averageCost)}</div>
          <div className="text-xs mt-1">
            {userCost > averageCost ? (
              <span className="text-terracotta-600">
                {t(
                  `${Math.round(((userCost - averageCost) / averageCost) * 100)}% above average`,
                  `औसतभन्दा ${Math.round(((userCost - averageCost) / averageCost) * 100)}% माथि`,
                )}
              </span>
            ) : (
              <span className="text-forest-600">
                {t(
                  `${Math.round(((averageCost - userCost) / averageCost) * 100)}% below average`,
                  `औसतभन्दा ${Math.round(((averageCost - userCost) / averageCost) * 100)}% तल`,
                )}
              </span>
            )}
          </div>
        </div>

        {/* Province Rank */}
        <div className="bg-white/80 rounded-lg p-4 text-center">
          <MapPin className="w-6 h-6 text-ochre-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ochre-700 devanagari-numerals">#{provinceRank}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("Province governance impact rank", "प्रदेश शासन प्रभाव श्रेणी")}
          </p>
        </div>
      </div>
    </div>
  )
}
