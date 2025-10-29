"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function HeroSection() {
  const { t } = useLanguage()
  const [citizensCount, setCitizensCount] = useState(12800)
  const [lossesCount, setLossesCount] = useState(2.38)

  useEffect(() => {
    const citizensInterval = setInterval(() => {
      setCitizensCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3)
        return next > 12847 ? 12847 : next
      })
    }, 100)

    const lossesInterval = setInterval(() => {
      setLossesCount((prev) => {
        const next = prev + 0.01
        return next > 2.4 ? 2.4 : next
      })
    }, 100)

    return () => {
      clearInterval(citizensInterval)
      clearInterval(lossesInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 pattern-terraced overflow-hidden">
      {/* Subtle mountain silhouette background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="absolute bottom-0 w-full h-64"
          viewBox="0 0 1200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300L50 280C100 260 200 220 300 200C400 180 500 180 600 160C700 140 800 100 900 100C1000 100 1100 140 1150 160L1200 180V300H0Z"
            fill="currentColor"
            className="text-forest-600"
          />
          <path
            d="M0 300L40 270C80 240 160 180 240 160C320 140 400 160 480 170C560 180 640 180 720 160C800 140 880 100 960 90C1040 80 1120 100 1160 110L1200 120V300H0Z"
            fill="currentColor"
            className="text-terracotta-400"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-bloom">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/nrlogo12.png"
            alt="Nepal Reforms"
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
          <span className="bg-gradient-to-r from-terracotta-600 via-ochre-600 to-forest-700 bg-clip-text text-transparent">
            {t("Know Your Vote's Worth", "आफ्नो मतको मूल्य जान्नुहोस्")}
          </span>
        </h1>

        {/* Copy */}
        <div className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
          <p className="text-pretty">
            {t(
              "We won't tell you that by selling your vote you're selling your country or anything like that. We won't be giving you hollow provado. After all, people are what makes the nation, not the other way around.",
              "हामी तपाईंलाई भन्दैनौं कि आफ्नो मत बेचेर तपाईं आफ्नो देश बेच्दै हुनुहुन्छ। हामी तपाईंलाई खोक्रो प्रवचन दिने छैनौं। आखिर, राष्ट्र बनाउने मानिसहरू हुन्, उल्टो होइन।",
            )}
          </p>
          <p className="text-pretty">
            {t(
              "So if you want to sell your vote, go ahead—it's your choice. We're here to help you do that. If you want to sell your vote, why not do it for the right price?",
              "त्यसैले यदि तपाईं आफ्नो मत बेच्न चाहनुहुन्छ भने, अगाडि बढ्नुहोस्—यो तपाईंको छनौट हो। हामी तपाईंलाई त्यसो गर्न मद्दत गर्न यहाँ छौं। यदि तपाईं आफ्नो मत बेच्न चाहनुहुन्छ भने, किन सही मूल्यमा नबेच्ने?",
            )}
          </p>
          <p className="font-medium text-lg text-foreground">
            {t(
              "Enter your details and estimate the cost of your vote.",
              "आफ्नो विवरण प्रविष्ट गर्नुहोस् र आफ्नो मतको लागत अनुमान गर्नुहोस्।",
            )}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Link href="/survey">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {t("Calculate Your Real Cost", "आफ्नो वास्तविक लागत गणना गर्नुहोस्")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats counter preview */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold text-terracotta-600 devanagari-numerals">
              {t(citizensCount.toLocaleString(), citizensCount.toLocaleString())}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{t("Citizens Aware", "जागरूक नागरिकहरू")}</div>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold text-ochre-600 devanagari-numerals">
              {t(`Rs. ${lossesCount.toFixed(1)} Cr`, `रु. ${lossesCount.toFixed(1)} करोड`)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{t("Total Losses Calculated", "कुल हानि गणना")}</div>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold text-forest-600 devanagari-numerals">{t("7 Provinces", "७ प्रदेश")}</div>
            <div className="text-sm text-muted-foreground mt-1">{t("Nationwide Impact", "राष्ट्रव्यापी प्रभाव")}</div>
          </div>
        </div>
      </div>

      {/* Decorative Newari window pattern */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-5 hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="2" className="text-ochre-600" />
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" className="text-ochre-600" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-ochre-600" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" className="text-ochre-600" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" className="text-ochre-600" />
        </svg>
      </div>

      <div className="absolute bottom-8 left-8 w-24 h-24 opacity-5 hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            stroke="currentColor"
            strokeWidth="2"
            className="text-forest-600"
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            stroke="currentColor"
            strokeWidth="2"
            className="text-forest-600"
          />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-forest-600" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" className="text-forest-600" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" className="text-forest-600" />
        </svg>
      </div>
    </section>
  )
}
