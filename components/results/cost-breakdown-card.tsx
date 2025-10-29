"use client"

import { useLanguage } from "@/lib/language-context"

interface CostBreakdownCardProps {
  categories: Array<{
    name: string
    amount: number
  }>
}

const categoryLabels: Record<string, { en: string; np: string }> = {
  healthcare: { en: "Healthcare", np: "स्वास्थ्य सेवा" },
  education: { en: "Education", np: "शिक्षा" },
  infrastructure: { en: "Infrastructure", np: "पूर्वाधार" },
  utilities: { en: "Utilities", np: "उपयोगिताहरू" },
  timeWasted: { en: "Time Wasted", np: "समय बर्बाद" },
  opportunityCost: { en: "Opportunity Cost", np: "अवसर लागत" },
}

export function CostBreakdownCard({ categories }: CostBreakdownCardProps) {
  const { language, t } = useLanguage()

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
    <div className="bg-card rounded-xl border border-border shadow-lg p-6 md:p-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-balance">
        {t("Your Hidden Tax of Bad Governance", "खराब शासनको तपाईंको लुकेको कर")}
      </h2>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const label = categoryLabels[category.name]
          const displayName = label ? (language === "np" ? label.np : label.en) : category.name

          return (
            <div
              key={category.name}
              className="flex items-center justify-between py-4 border-b border-border last:border-0 animate-bloom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-base md:text-lg font-medium text-foreground/90">{displayName}:</span>
              <span className="text-lg md:text-xl font-bold text-terracotta-600 devanagari-numerals">
                {formatAmount(category.amount)} {t("only", "मात्र")}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
