"use client"

import { useLanguage } from "@/lib/language-context"

interface TotalCostCardProps {
  totalCost: number
}

export function TotalCostCard({ totalCost }: TotalCostCardProps) {
  const { t } = useLanguage()

  const formatAmount = (amount: number) => {
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
    <div className="bg-gradient-to-br from-terracotta-500 via-ochre-500 to-forest-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white animate-bloom">
      <h2 className="text-xl md:text-2xl font-bold mb-4 opacity-90">
        {t("YOUR ACTUAL COST LAST YEAR", "गत वर्ष तपाईंको वास्तविक लागत")}
      </h2>
      <div className="text-5xl md:text-7xl font-bold devanagari-numerals mb-2">{formatAmount(totalCost)}</div>
      <p className="text-sm md:text-base opacity-80 mt-4">
        {t("Lost due to poor governance", "खराब शासनका कारण हराएको")}
      </p>
    </div>
  )
}
