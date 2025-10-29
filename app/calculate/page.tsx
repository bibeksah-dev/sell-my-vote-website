"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { MandalaLoader } from "@/components/loading/mandala-loader"
import { FunFactDisplay } from "@/components/loading/fun-fact-display"
import { GradientProgressBar } from "@/components/loading/gradient-progress-bar"
import type { FunFact, CalculationResult } from "@/types/survey"

export default function CalculatePage() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const [facts, setFacts] = useState<FunFact[]>([])
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string>("")
  const [loadingMessage, setLoadingMessage] = useState("")
  const [userName, setUserName] = useState<string>("")

  const hasStartedCalculation = useRef(false)

  const handleComplete = useCallback(() => {
    console.log("[v0] Progress complete, result:", result, "error:", error)
    if (result) {
      localStorage.setItem("calculationResult", JSON.stringify(result))
      router.push("/results")
    } else if (error) {
      console.error("[v0] Calculation incomplete with error:", error)
    }
  }, [result, error, router])

  useEffect(() => {
    if (hasStartedCalculation.current) {
      console.log("[v0] Calculation already started, skipping")
      return
    }

    const answers = localStorage.getItem("surveyAnswers")
    if (!answers) {
      router.push("/survey")
      return
    }

    hasStartedCalculation.current = true
    console.log("[v0] Starting calculation process")

    const parsedAnswers = JSON.parse(answers)

    if (parsedAnswers.name) {
      setUserName(parsedAnswers.name)
    }

    const messages =
      language === "np"
        ? [
            "तपाईंको डेटा विश्लेषण गर्दै...",
            "शासन प्रभाव गणना गर्दै...",
            "वास्तविक लागत निर्धारण गर्दै...",
            "तपाईंको प्रोफाइल मूल्याङ्कन गर्दै...",
          ]
        : [
            "Analyzing your data...",
            "Calculating governance impact...",
            "Determining real cost...",
            "Evaluating your profile...",
          ]

    let messageIndex = 0
    setLoadingMessage(messages[0])

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setLoadingMessage(messages[messageIndex])
    }, 5000)

    const fetchFacts = async () => {
      try {
        console.log("[v0] Fetching fun facts...")
        const response = await fetch("/api/calculate/fast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: parsedAnswers, language }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch fun facts")
        }

        const data = await response.json()
        console.log("[v0] Fun facts received:", data.facts?.length || 0)
        setFacts(data.facts || [])
      } catch (err) {
        console.error("[v0] Fast model error:", err)
        setFacts([
          {
            id: "fallback-1",
            text: t(
              "Your vote is more powerful than you think. It shapes policies that affect your daily life.",
              "तपाईंको मत तपाईंले सोचेभन्दा बढी शक्तिशाली छ। यसले तपाईंको दैनिक जीवनलाई असर गर्ने नीतिहरू आकार दिन्छ।",
            ),
          },
          {
            id: "fallback-2",
            text: t(
              "Good governance can save you thousands of rupees annually through better services and infrastructure.",
              "राम्रो शासनले राम्रो सेवा र पूर्वाधार मार्फत तपाईंलाई वार्षिक हजारौं रुपैयाँ बचत गर्न सक्छ।",
            ),
          },
        ])
      }
    }

    const fetchResult = async () => {
      try {
        console.log("[v0] Fetching cost calculation...")
        const response = await fetch("/api/calculate/reasoning", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: parsedAnswers, language }),
        })

        if (!response.ok) {
          throw new Error("Failed to calculate cost")
        }

        const data = await response.json()
        console.log("[v0] Cost calculation received:", data)
        setResult(data)
      } catch (err) {
        console.error("[v0] Reasoning model error:", err)
        setError(
          t(
            "Unable to calculate your governance cost. Please try again.",
            "तपाईंको शासन लागत गणना गर्न असमर्थ। कृपया फेरि प्रयास गर्नुहोस्।",
          ),
        )
      }
    }

    fetchFacts()
    fetchResult()

    return () => {
      clearInterval(messageInterval)
    }
  }, [router, language])

  useEffect(() => {
    if (result) {
      console.log("[v0] Result ready, will navigate after progress completes")
    }
  }, [result])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pattern-terraced">
      <div className="max-w-4xl w-full space-y-12">
        {/* Mandala Loader */}
        <div className="flex justify-center">
          <MandalaLoader />
        </div>

        {userName && (
          <div className="text-center space-y-3 animate-in fade-in duration-500">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">
              {language === "np" ? `नमस्ते, ${userName}` : `Hi, ${userName}`}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              {t(
                "This result will take about 60 seconds to be calculated. In the meanwhile, let's see some fun facts.",
                "यो नतिजा गणना गर्न करिब ६० सेकेन्ड लाग्नेछ। यस बीचमा, केही रोचक तथ्यहरू हेरौं।",
              )}
            </p>
          </div>
        )}

        {/* Loading Message */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-balance text-muted-foreground">{loadingMessage}</h2>
        </div>

        {/* Fun Facts */}
        {facts.length > 0 && (
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-8 shadow-lg">
            <FunFactDisplay facts={facts} displayDuration={8000} />
          </div>
        )}

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto">
          <GradientProgressBar duration={60000} onComplete={handleComplete} />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">{error}</p>
            <button
              onClick={() => router.push("/survey")}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
            >
              {t("Go back to survey", "सर्वेक्षणमा फर्कनुहोस्")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
