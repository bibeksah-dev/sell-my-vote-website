"use client"

import { useLanguage } from "@/lib/language-context"
import { TrendingUp, UsersIcon } from "lucide-react"

interface ImpactVisualizationProps {
  userCost: number
  totalUsers: number
  totalLosses: number
}

export function ImpactVisualization({ userCost, totalUsers, totalLosses }: ImpactVisualizationProps) {
  const { t } = useLanguage()

  const fiveYearSavings = userCost * 5
  const collectiveImpact = Math.round(totalLosses / 10000000) // Convert to crores

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
    <div className="bg-card rounded-xl border border-border shadow-md p-6 space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-terracotta-600" />
        {t("Your Potential Impact", "तपाईंको सम्भावित प्रभाव")}
      </h3>

      <div className="space-y-4">
        {/* 5-Year Projection */}
        <div className="bg-gradient-to-r from-terracotta-50 to-ochre-50 rounded-lg p-6 border border-terracotta-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t("Vote wisely = save over 5 years", "बुद्धिमानीपूर्वक मतदान = ५ वर्षमा बचत")}
            </span>
          </div>
          <div className="text-3xl font-bold text-terracotta-700 devanagari-numerals">
            {formatCurrency(fiveYearSavings)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t("This is what better governance could save you", "यो राम्रो शासनले तपाईंलाई बचत गर्न सक्छ")}
          </p>
        </div>

        {/* Collective Impact */}
        <div className="bg-gradient-to-r from-forest-50 to-cream-100 rounded-lg p-6 border border-forest-200">
          <div className="flex items-center gap-3 mb-3">
            <UsersIcon className="w-8 h-8 text-forest-600" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">{t("Collective Impact", "सामूहिक प्रभाव")}</div>
              <div className="text-xs text-muted-foreground devanagari-numerals">
                {t(`${totalUsers.toLocaleString()} citizens aware`, `${totalUsers.toLocaleString()} नागरिकहरू जागरूक`)}
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-forest-700 devanagari-numerals">
            {t(`Rs. ${collectiveImpact} Crores`, `रु. ${collectiveImpact} करोड`)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t("Total governance cost calculated by our community", "हाम्रो समुदायद्वारा गणना गरिएको कुल शासन लागत")}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("Community Goal", "समुदाय लक्ष्य")}</span>
            <span className="font-medium devanagari-numerals">
              {totalUsers.toLocaleString()} / {t("50,000", "५०,०००")}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-terracotta-500 via-ochre-500 to-forest-600 transition-all duration-500"
              style={{ width: `${Math.min((totalUsers / 50000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {t("Help us reach 50,000 informed voters!", "हामीलाई ५०,००० सूचित मतदाताहरू पुग्न मद्दत गर्नुहोस्!")}
          </p>
        </div>
      </div>
    </div>
  )
}
