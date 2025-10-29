"use client"

import { useLanguage } from "@/lib/language-context"
import type { CostBreakdown } from "@/types/survey"
import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

interface ShareCardGeneratorProps {
  totalCost: number
  breakdown: CostBreakdown
  userName?: string
}

export function ShareCardGenerator({ totalCost, breakdown, userName }: ShareCardGeneratorProps) {
  const { language, t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const shareText =
    language === "en"
      ? `Last year I paid Rs. ${totalCost.toLocaleString("en-NP")} extra due to bad governance. Know yours now by visiting sellmyvote.nepalreforms.com. If we are still selling our vote for some chump change it's time to wake up. #KnowYourVoteWorth`
      : `गत वर्ष खराब शासनले मलाई रु. ${totalCost.toLocaleString("en-NP")} थप खर्च गर्यो। आफ्नो गणना गर्नुहोस् sellmyvote.nepalreforms.com मा। यदि हामी अझै पनि केही पैसाको लागि आफ्नो भोट बेच्दैछौं भने यो ब्यूँझने समय हो। #KnowYourVoteWorth`

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null

    try {
      setIsGenerating(true)
      const html2canvas = (await import("html2canvas-pro")).default

      const bgImage = new Image()
      bgImage.crossOrigin = "anonymous"
      bgImage.src = "/images/bancorruption.jpg"
      await new Promise((resolve) => {
        bgImage.onload = resolve
        bgImage.onerror = resolve
      })

      console.log("[v0] Starting image generation with html2canvas-pro...")

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#F5EFE7",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      console.log("[v0] Canvas generated successfully")

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, "image/png")
      })
    } catch (error) {
      console.error("[v0] Failed to generate image:", error)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadImage = async () => {
    const blob = await generateImageBlob()
    if (!blob) {
      alert(t("Failed to generate image. Please try again.", "छवि उत्पन्न गर्न असफल। कृपया पुन: प्रयास गर्नुहोस्।"))
      return
    }

    const link = document.createElement("a")
    link.download = `governance-cost-${userName || "report"}.png`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const handleShareImage = async () => {
    const blob = await generateImageBlob()
    if (!blob) {
      alert(t("Failed to generate image. Please try again.", "छवि उत्पन्न गर्न असफल। कृपया पुन: प्रयास गर्नुहोस्।"))
      return
    }

    // Check if Web Share API is supported and can share files
    if (navigator.share && navigator.canShare) {
      const file = new File([blob], `governance-cost-${userName || "report"}.png`, { type: "image/png" })

      const shareData = {
        files: [file],
        title: t("My Governance Cost Report", "मेरो शासन लागत रिपोर्ट"),
        text: shareText,
      }

      // Check if the browser can share this data
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
          console.log("[v0] Image shared successfully via Web Share API")
        } catch (error) {
          // User cancelled or error occurred
          if ((error as Error).name !== "AbortError") {
            console.error("[v0] Error sharing via Web Share API:", error)
            // Fallback to download
            handleDownloadImage()
          }
        }
      } else {
        // Browser doesn't support sharing files, fallback to download
        alert(
          t(
            "Your browser doesn't support direct image sharing. The image will be downloaded instead.",
            "तपाईंको ब्राउजरले प्रत्यक्ष छवि साझेदारी समर्थन गर्दैन। छवि डाउनलोड गरिनेछ।",
          ),
        )
        handleDownloadImage()
      }
    } else {
      // Web Share API not supported, fallback to download
      alert(
        t(
          "Your browser doesn't support direct sharing. The image will be downloaded instead.",
          "तपाईंको ब्राउजरले प्रत्यक्ष साझेदारी समर्थन गर्दैन। छवि डाउनलोड गरिनेछ।",
        ),
      )
      handleDownloadImage()
    }
  }

  const handleShare = async (platform: "facebook" | "twitter" | "whatsapp" | "instagram") => {
    const url = "https://sellmyvote.nepalreforms.com"
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(url)

    if (platform === "instagram") {
      await handleDownloadImage()
      alert(
        t(
          "Image downloaded! Now open Instagram and post it from your gallery.",
          "छवि डाउनलोड भयो! अब Instagram खोल्नुहोस् र आफ्नो ग्यालरीबाट पोस्ट गर्नुहोस्।",
        ),
      )
      return
    }

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
    }

    await handleDownloadImage()

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")

    setTimeout(() => {
      alert(
        t(
          "Image downloaded! After sharing the text, you can attach the downloaded image.",
          "छवि डाउनलोड भयो! पाठ साझा गरेपछि, तपाईं डाउनलोड गरिएको छवि संलग्न गर्न सक्नुहुन्छ।",
        ),
      )
    }, 500)
  }

  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.text(t("Your Governance Cost Report", "तपाईंको शासन लागत रिपोर्ट"), 20, 20)

      if (userName) {
        doc.setFontSize(14)
        doc.text(userName, 20, 35)
      }

      doc.setFontSize(12)
      let yPos = userName ? 50 : 40
      Object.entries(breakdown.categories).forEach(([category, amount]) => {
        doc.text(`${category}: Rs. ${amount.toLocaleString("en-NP")}`, 20, yPos)
        yPos += 10
      })

      doc.setFontSize(16)
      yPos += 10
      doc.text(`Total: Rs. ${totalCost.toLocaleString("en-NP")}`, 20, yPos)

      doc.setFontSize(10)
      yPos += 20
      const splitSummary = doc.splitTextToSize(breakdown.summary, 170)
      doc.text(splitSummary, 20, yPos)

      doc.save(`governance-cost-${userName || "report"}.pdf`)
    } catch (error) {
      console.error("[v0] Failed to generate PDF:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "90vmin",
          height: "90vmin",
          maxWidth: "600px",
          maxHeight: "600px",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "2.4vmin",
          padding: "0.4vmin",
          background: "linear-gradient(to bottom right, #D4826C, #E89F3C, #2C5530)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "2vmin",
            backgroundColor: "#F5EFE7",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url('/images/bancorruption.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.75,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(245, 239, 231, 0.4), rgba(245, 239, 231, 0.3), rgba(245, 239, 231, 0.4))",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              padding: "3.2vmin",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            {userName && (
              <div style={{ marginBottom: "2.4vmin" }}>
                <p
                  style={{
                    fontSize: "3vmin",
                    fontWeight: 500,
                    color: "#7D8491",
                    marginBottom: "0.4vmin",
                  }}
                >
                  {t("Governance Cost Report for", "शासन लागत रिपोर्ट")}
                </p>
                <h2
                  style={{
                    fontSize: "6vmin",
                    fontWeight: 700,
                    color: "#2C5530",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  {userName}
                </h2>
              </div>
            )}

            <div
              style={{
                padding: "2vmin 0",
                marginBottom: "2vmin",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "40vmin",
                  height: "40vmin",
                  borderRadius: "50%",
                  background: "linear-gradient(to bottom right, #D4826C, #E89F3C)",
                  filter: "blur(6vmin)",
                  opacity: 0.1,
                }}
              />
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    fontSize: "3vmin",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#7D8491",
                    marginBottom: "0.8vmin",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  {t("Total Cost Last Year", "गत वर्षको कुल लागत")}
                </p>
                <div
                  style={{
                    fontSize: "8vmin",
                    fontWeight: 700,
                    color: "#DC143C",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                >
                  Rs. {totalCost.toLocaleString("en-NP")}
                </div>
              </div>
            </div>

            <div style={{ maxWidth: "100vmin", margin: "0 auto 1vmin" }}>
              <p
                style={{
                  fontSize: "3vmin",
                  lineHeight: "1.6",
                  fontWeight: 500,
                  color: "#2C5530",
                  backgroundColor: "rgba(44, 85, 48, 0.1)",
                  padding: "0.8vmin 1.6vmin",
                  borderRadius: "0.8vmin",
                  marginBottom: "1.2vmin",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                }}
              >
                {t("This is what bad governance cost me last year.", "यो गत वर्ष खराब शासनले मलाई खर्च गरेको हो।")}
              </p>
              <p
                style={{
                  fontSize: "3vmin",
                  fontWeight: 600,
                  color: "#2C5530",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                }}
              >
                {t("Calculate yours at:", "आफ्नो गणना गर्नुहोस्:")}
              </p>
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "1.2vmin 2.4vmin",
                borderRadius: "999vmin",
                backgroundColor: "rgba(245, 239, 231, 0.9)",
                border: "0.2vmin solid rgba(212, 130, 108, 0.3)",
                boxShadow: "0 0.4vmin 0.6vmin rgba(0,0,0,0.1)",
                marginBottom: "2.4vmin",
              }}
            >
              <p
                style={{
                  fontSize: "3vmin",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#2C5530",
                }}
              >
                sellmyvote.nepalreforms.com
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.2vmin",
                paddingTop: "0.8vmin",
                marginBottom: "1.6vmin",
              }}
            >
              <div
                style={{
                  width: "5vmin",
                  height: "5vmin",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(to bottom right, #D4826C, #E89F3C)",
                  boxShadow: "0 0.2vmin 0.4vmin rgba(0,0,0,0.1)",
                }}
              >
                <svg width="2vmin" height="2vmin" fill="#F5EFE7" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "3vmin",
                  fontWeight: 700,
                  color: "#003893",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                }}
              >
                #KnowYourVoteWorth
              </span>
            </div>

            <div
              style={{
                paddingTop: "1.6vmin",
                borderTop: "0.1vmin solid rgba(125, 132, 145, 0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "2vmin",
                  fontWeight: 500,
                  color: "#003893",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                }}
              >
                {t("Powered by NepalReforms", "नेपाल-रिफर्म्स द्वारा संचालित")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mx-0 py-0.5 pt-4 pb-0">
        <Button
          onClick={handleDownloadImage}
          variant="outline"
          className="gap-2 bg-transparent"
          disabled={isGenerating}
        >
          <Download className="w-4 h-4" />
          {isGenerating ? t("Generating...", "उत्पन्न गर्दै...") : t("Download Image", "छवि डाउनलोड गर्नुहोस्")}
        </Button>

        <Button onClick={handleShareImage} variant="outline" className="gap-2 bg-transparent" disabled={isGenerating}>
          <Share2 className="w-4 h-4" />
          {t("Share Image", "छवि साझा गर्नुहोस्")}
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-center" style={{ color: "#7D8491" }}>
          {t("Share on social media:", "सामाजिक मिडियामा साझा गर्नुहोस्:")}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleShare("facebook")}
            className="gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90"
            disabled={isGenerating}
          >
            <Share2 className="w-4 h-4" />
            Facebook
          </Button>

          <Button
            onClick={() => handleShare("twitter")}
            className="gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
            disabled={isGenerating}
          >
            <Share2 className="w-4 h-4" />
            Twitter
          </Button>

          <Button
            onClick={() => handleShare("whatsapp")}
            className="gap-2 bg-[#25D366] hover:bg-[#25D366]/90"
            disabled={isGenerating}
          >
            <Share2 className="w-4 h-4" />
            WhatsApp
          </Button>

          <Button
            onClick={() => handleShare("instagram")}
            className="gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90"
            disabled={isGenerating}
          >
            <Share2 className="w-4 h-4" />
            Instagram
          </Button>
        </div>
      </div>

      <Button
        onClick={() => {
          navigator.clipboard.writeText(shareText)
          alert(t("Copied to clipboard!", "क्लिपबोर्डमा प्रतिलिपि गरियो!"))
        }}
        variant="outline"
        className="w-full gap-2 bg-transparent"
      >
        <Share2 className="w-4 h-4" />
        {t("Copy Share Text", "साझा पाठ प्रतिलिपि गर्नुहोस्")}
      </Button>
    </div>
  )
}
