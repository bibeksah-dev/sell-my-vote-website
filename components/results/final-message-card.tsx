"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Share2, RotateCcw, BookOpen } from "lucide-react"
import Link from "next/link"

interface FinalMessageCardProps {
  totalCost: number
  onShare: () => void
  onCalculateAgain: () => void
}

export function FinalMessageCard({ totalCost, onShare, onCalculateAgain }: FinalMessageCardProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-6 md:p-8 space-y-6">
      <div className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
        <p className="text-pretty">
          {t(
            `If you still want to sell your vote, at least recover all the money you lost due to bad governance last year.`,
            `यदि तपाईं अझै पनि आफ्नो मत बेच्न चाहनुहुन्छ भने, कम्तिमा गत वर्ष खराब शासनका कारण हराएको सबै पैसा फिर्ता लिनुहोस्।`,
          )}
        </p>
        <p className="text-pretty font-medium">
          {t(
            "But ask yourself: If you sell your vote for Rs. 500 or Rs. 1,000, who's really profiting?",
            "तर आफैलाई सोध्नुहोस्: यदि तपाईंले आफ्नो मत रु. ५०० वा रु. १,००० मा बेच्नुभयो भने, वास्तवमा कसले लाभ लिइरहेको छ?",
          )}
        </p>
        <p className="text-pretty text-lg font-semibold text-forest-700">
          {t(
            "Your vote is worth more than money—it's your power to demand accountability, better services, and real change.",
            "तपाईंको मत पैसाभन्दा बढी मूल्यवान छ—यो जवाफदेहिता, राम्रो सेवा र वास्तविक परिवर्तनको माग गर्ने तपाईंको शक्ति हो।",
          )}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href="/evaluate" className="flex-1">
          <Button className="w-full h-12 text-base bg-forest-600 hover:bg-forest-700">
            <BookOpen className="mr-2 h-5 w-5" />
            {t("Learn How to Evaluate Candidates", "उम्मेदवारहरूको मूल्याङ्कन गर्न सिक्नुहोस्")}
          </Button>
        </Link>
        <Button variant="outline" onClick={onShare} className="flex-1 h-12 text-base bg-transparent">
          <Share2 className="mr-2 h-5 w-5" />
          {t("Share My Results", "मेरो नतिजा साझा गर्नुहोस्")}
        </Button>
        <Button variant="outline" onClick={onCalculateAgain} className="h-12 text-base bg-transparent">
          <RotateCcw className="mr-2 h-5 w-5" />
          {t("Calculate Again", "फेरि गणना गर्नुहोस्")}
        </Button>
      </div>
    </div>
  )
}
