"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

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
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-balance flex-1">
          {t("Your Hidden Tax of Bad Governance", "खराब शासनको तपाईंको लुकेको कर")}
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">{t("Information", "जानकारी")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {t("How We Calculate Your Costs", "हामी तपाईंको लागत कसरी गणना गर्छौं")}
              </DialogTitle>
              <DialogDescription className="text-base space-y-4 pt-4">
                <p>
                  {t(
                    "Your cost breakdown is calculated using advanced AI analysis based on your survey responses. We analyze multiple factors including your age, household size, region, occupation, income level, and recent experiences with government services.",
                    "तपाईंको लागत विवरण तपाईंको सर्वेक्षण प्रतिक्रियाहरूको आधारमा उन्नत AI विश्लेषण प्रयोग गरेर गणना गरिएको छ। हामी तपाईंको उमेर, घरपरिवारको आकार, क्षेत्र, पेशा, आय स्तर, र सरकारी सेवाहरूसँगको हालैका अनुभवहरू सहित धेरै कारकहरू विश्लेषण गर्छौं।",
                  )}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    {t("Cost Categories Include:", "लागत श्रेणीहरू समावेश छन्:")}
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>
                      <strong>{t("Healthcare", "स्वास्थ्य सेवा")}:</strong>{" "}
                      {t(
                        "Costs from delayed treatments, medicine shortages, and inadequate healthcare infrastructure",
                        "ढिलो उपचार, औषधि अभाव, र अपर्याप्त स्वास्थ्य पूर्वाधारबाट लागत",
                      )}
                    </li>
                    <li>
                      <strong>{t("Education", "शिक्षा")}:</strong>{" "}
                      {t(
                        "Extra expenses for private tutoring and materials due to poor public school quality",
                        "खराब सार्वजनिक विद्यालय गुणस्तरको कारण निजी ट्युसन र सामग्रीको लागि अतिरिक्त खर्च",
                      )}
                    </li>
                    <li>
                      <strong>{t("Infrastructure", "पूर्वाधार")}:</strong>{" "}
                      {t(
                        "Vehicle damage and increased fuel consumption from poor road conditions",
                        "खराब सडक अवस्थाबाट सवारी साधन क्षति र बढेको इन्धन खपत",
                      )}
                    </li>
                    <li>
                      <strong>{t("Utilities", "उपयोगिताहरू")}:</strong>{" "}
                      {t(
                        "Additional costs from power cuts, water shortages, and unreliable services",
                        "बिजुली कटौती, पानी अभाव, र अविश्वसनीय सेवाहरूबाट अतिरिक्त लागत",
                      )}
                    </li>
                    <li>
                      <strong>{t("Administrative Delays", "प्रशासनिक ढिलाइ")}:</strong>{" "}
                      {t(
                        "Time and money lost in bureaucratic processes like passport delays and business registration",
                        "राहदानी ढिलाइ र व्यवसाय दर्ता जस्ता नोकरशाही प्रक्रियाहरूमा समय र पैसा हानि",
                      )}
                    </li>
                    <li>
                      <strong>{t("Opportunity Cost", "अवसर लागत")}:</strong>{" "}
                      {t(
                        "Lost income from time wasted dealing with inefficiencies",
                        "अकुशलतासँग व्यवहार गर्दा समय बर्बादबाट हराएको आय",
                      )}
                    </li>
                  </ul>
                </div>

                <p className="text-sm italic">
                  {t(
                    "These calculations are estimates based on documented inefficiencies and your specific circumstances. Actual costs may vary.",
                    "यी गणनाहरू दस्तावेज गरिएका अकुशलताहरू र तपाईंको विशिष्ट परिस्थितिहरूमा आधारित अनुमानहरू हुन्। वास्तविक लागत फरक हुन सक्छ।",
                  )}
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

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
