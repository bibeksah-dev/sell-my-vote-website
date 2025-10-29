"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { CostBreakdownCard } from "@/components/results/cost-breakdown-card"
import { SummaryCard } from "@/components/results/summary-card"
import { TotalCostCard } from "@/components/results/total-cost-card"
import { FinalMessageCard } from "@/components/results/final-message-card"
import { BadgeDisplay, getBadges } from "@/components/gamification/badge-display"
import { ComparisonStats } from "@/components/gamification/comparison-stats"
import { ImpactVisualization } from "@/components/gamification/impact-visualization"
import { SocialChallenge } from "@/components/gamification/social-challenge"
import { ShareCardGenerator } from "@/components/results/share-card-generator"
import type { CalculationResult } from "@/types/survey"

export default function ResultsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [hasShared, setHasShared] = useState(false)
  const [hasVisitedEvaluate, setHasVisitedEvaluate] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [friendsReferred, setFriendsReferred] = useState(0)

  useEffect(() => {
    const storedResult = localStorage.getItem("calculationResult")
    if (!storedResult) {
      router.push("/survey")
      return
    }

    setResult(JSON.parse(storedResult))

    const storedAnswers = localStorage.getItem("surveyAnswers")
    if (storedAnswers) {
      const answers = JSON.parse(storedAnswers)
      if (answers.name) {
        setUserName(answers.name)
      }
    }

    setHasShared(localStorage.getItem("hasShared") === "true")
    setHasVisitedEvaluate(localStorage.getItem("hasVisitedEvaluate") === "true")

    // Generate or retrieve referral code
    let code = localStorage.getItem("referralCode")
    if (!code) {
      code = Math.random().toString(36).substring(2, 8).toUpperCase()
      localStorage.setItem("referralCode", code)
    }
    setReferralCode(code)

    // Get friends referred count
    const referred = localStorage.getItem("friendsReferred")
    setFriendsReferred(referred ? Number.parseInt(referred) : 0)
  }, [router])

  const handleShare = async () => {
    if (!result) return

    const shareText = t(
      `Bad governance cost me Rs. ${result.totalCost.toLocaleString()} last year. Calculate yours at sellmyvote.nepalreforms.com #KnowYourVoteWorth`,
      `खराब शासनले मलाई गत वर्ष रु. ${result.totalCost.toLocaleString()} खर्च गर्यो। sellmyvote.nepalreforms.com मा आफ्नो गणना गर्नुहोस् #KnowYourVoteWorth`,
    )

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("Know Your Vote's Worth", "आफ्नो मतको मूल्य जान्नुहोस्"),
          text: shareText,
          url: window.location.origin,
        })
        localStorage.setItem("hasShared", "true")
        setHasShared(true)
      } catch (err) {
        console.log("[v0] Share cancelled or failed:", err)
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert(t("Link copied to clipboard!", "लिङ्क क्लिपबोर्डमा प्रतिलिपि गरियो!"))
      localStorage.setItem("hasShared", "true")
      setHasShared(true)
    }
  }

  const handleCalculateAgain = () => {
    localStorage.removeItem("surveyAnswers")
    localStorage.removeItem("calculationResult")
    router.push("/survey")
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-500 mx-auto mb-4" />
          <p className="text-muted-foreground">{t("Loading results...", "नतिजा लोड गर्दै...")}</p>
        </div>
      </div>
    )
  }

  const mockAverageCost = result.totalCost * 0.85
  const mockPercentile = 40
  const mockProvinceRank = 3
  const mockTotalUsers = 12847
  const mockTotalLosses = 24000000

  const badges = getBadges(true, hasShared, hasVisitedEvaluate)

  return (
    <div className="min-h-screen pattern-terraced py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-2 animate-bloom">
          <h1 className="text-3xl md:text-5xl font-bold text-balance bg-gradient-to-r from-terracotta-600 via-ochre-600 to-forest-700 bg-clip-text text-transparent">
            {t("Your Governance Cost Report", "तपाईंको शासन लागत रिपोर्ट")}
          </h1>
          <p className="text-muted-foreground">
            {t("Based on your profile and last year's data", "तपाईंको प्रोफाइल र गत वर्षको डेटामा आधारित")}
          </p>
        </div>

        {/* Cost Breakdown */}
        <CostBreakdownCard categories={result.categories} />

        {/* Summary */}
        <SummaryCard summary={result.summary} />

        {/* Total Cost */}
        <TotalCostCard totalCost={result.totalCost} />

        {/* Badges */}
        <BadgeDisplay badges={badges} />

        {/* Comparison Stats */}
        <ComparisonStats
          userCost={result.totalCost}
          averageCost={mockAverageCost}
          percentile={mockPercentile}
          provinceRank={mockProvinceRank}
        />

        {/* Impact Visualization */}
        <ImpactVisualization userCost={result.totalCost} totalUsers={mockTotalUsers} totalLosses={mockTotalLosses} />

        {/* Social Challenge */}
        <SocialChallenge referralCode={referralCode} friendsReferred={friendsReferred} />

        {/* Share Your Results */}
        <div className="card-newari">
          <h2 className="text-2xl font-bold text-center text-forest-700">
            {t("Share Your Results", "आफ्नो नतिजा साझा गर्नुहोस्")}
          </h2>
          <ShareCardGenerator
            totalCost={result.totalCost}
            breakdown={{ categories: result.categories, summary: result.summary }}
            userName={userName}
          />
        </div>

        {/* Final Message */}
        <FinalMessageCard totalCost={result.totalCost} onShare={handleShare} onCalculateAgain={handleCalculateAgain} />

        {/* Back to Home */}
        <div className="text-center pt-8">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            {t("Back to Home", "गृहपृष्ठमा फर्कनुहोस्")}
          </button>
        </div>
      </div>
    </div>
  )
}
