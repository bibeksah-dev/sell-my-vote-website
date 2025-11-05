"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { X } from "lucide-react"

type Offer = {
  id: string
  icon: string
  en: string
  ne: string
}

const OFFERS: Offer[] = [
  { id: "tee", icon: "👕", en: "A free t-shirt", ne: "फ्री टि-शर्ट" },
  { id: "liquor", icon: "🍾", en: "A bottle of liquor", ne: "रक्सीको बोतल" },
  { id: "cash", icon: "💸", en: "Rs. 500 cash", ne: "रु. ५०० नगद" },
  { id: "promises", icon: "🫥", en: "Empty promises", ne: "खाली वाचा" },
  { id: "meat", icon: "🍖", en: "A plate of meat and rice", ne: "मासु भातको प्लेट" },
  { id: "ride", icon: "🚗", en: "A ride in the leader’s rally", ne: "नेताको र्‍यालीमा सवारी" },
  { id: "sms", icon: "📩", en: "An SMS saying 'thank you'", ne: "'धन्यवाद' भन्ने एसएमएस" },
]

const SNARK: Record<string, { en: string; ne: string }> = {
  tee: {
    en: "A free t-shirt to hide the stains of corruption. Fresh cotton, same old lies.",
    ne: "फ्री टि-शर्ट त भयो, तर गफ पुरानै। कपडा धोइन्छ, नेतागिरी कहिले धुन्छस्?",
  },
  liquor: {
    en: "One bottle to forget five years of regret. Democracy pairs well with hangovers.",
    ne: "रक्सी पिएर नेताको भाषण मिठो लाग्छ रे। होस फर्केपछि देश नै कडा लाग्छ।",
  },
  cash: {
    en: "₹500 for your future—EMI of regret starts tomorrow.",
    ne: "रु.५०० लिएर भोट बेच, अनि पाँच वर्षको पश्चाताप किस्ता किस्तामा तिर्ने।",
  },
  promises: {
    en: "Promises so empty they echo louder than the mic feedback.",
    ne: "वाचा यत्रो खाली कि प्रतिध्वनि पनि रिसायो। नेताको मुख — कहिल्यै म्युट नहुने स्पीकर।",
  },
  meat: {
    en: "Free meat today, butchered hopes tomorrow. Bon appétit, voter saab!",
    ne: "आज मासु, भोलि मासु काट्नेहरू सत्तामा। खाऊ, रमाऊ, अनि फेरी गुनगुनाऊ — ‘देश कहाँ पुग्यो?’",
  },
  ride: {
    en: "Ride with the leader—free dust, loud slogans, and zero direction.",
    ne: "नेताको र्‍याली चढ्दा धुलो नि फ्री, direction त ‘vote counting’ पछि हराउँछ।",
  },
  sms: {
    en: "A thank-you SMS sent by bot—because even fake gratitude needs automation.",
    ne: "‘धन्यवाद’ पठाउने पनि बोट, अब भावनामा पनि automation आयो नि।",
  },
};

export default function SellMyVoteButton() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [snarkOpen, setSnarkOpen] = useState(false)

  const onDoNotSell = () => {
    setMessage(t("🎉 Congratulations, you still have integrity!", "🎉 बधाई छ, तपाईं अझै इमानदार हुनुहुन्छ!"))
    setOpen(false)
    setSnarkOpen(true)
  }

  const onConfirmSale = () => {
    if (!selectedId) return
    const snark = SNARK[selectedId]
    setMessage(t(snark.en, snark.ne))
    setOpen(false)
    setSnarkOpen(true)
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <Button
        variant="destructive"
        size="lg"
        className="text-lg font-bold animate-bounce rounded-full px-6 shadow-md hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        {t("Sell My Vote", "मेरो भोट बेच्ने")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-balance">
              {t("😂 The Marketplace of Democracy", "😂 लोकतन्त्रको बजार")}
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-pretty">
              {t(
                "Ever wondered what your vote is really worth to our beloved candidates? Pick your favorite 'deal' from the satirical menu below! (Just kidding: Your vote is priceless.)",
                "कहिल्यै सोचेको छ कि नेताहरूका लागि तपाईंको भोटको मूल्य कति होला? तलको व्यङ्ग्यात्मक मेनुबाट एउटा अफर छान्नुहोस्! (मात्र मजाक — तपाईंको भोट अमूल्य छ।)"
              )}
            </p>
          </DialogHeader>

          <Card className="mt-3 p-4">
            <div className="mb-2 text-sm text-muted-foreground">
              {t("Pick one offer", "एउटा अफर छान्नुहोस्")}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {OFFERS.map((offer) => {
                const isSelected = selectedId === offer.id
                const label = t(offer.en, offer.ne)
                return (
                  <label key={offer.id} className="cursor-pointer" aria-label={label}>
                    <input
                      type="radio"
                      name="sell-my-vote"
                      value={offer.id}
                      checked={isSelected}
                      onChange={() => setSelectedId(offer.id)}
                      className="peer sr-only"
                    />
                    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 transition-colors hover:bg-muted/50 peer-checked:border-forest-600 peer-checked:bg-forest-600/5">
                      <span className="text-xl" aria-hidden="true">
                        {offer.icon}
                      </span>
                      <span className="text-sm font-medium text-pretty">{label}</span>
                    </div>
                  </label>
                )
              })}
            </div>
          </Card>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between mt-4">
            <Button variant="outline" onClick={onDoNotSell} className="w-full sm:w-auto">
              {t("Do Not Sell", "मत बेच्नुहोस्")}
            </Button>
            <div className="flex flex-col items-stretch sm:items-end gap-1 w-full sm:w-auto">
              <Button
                variant="destructive"
                onClick={onConfirmSale}
                disabled={!selectedId}
                className="w-full sm:w-auto"
              >
                {t("Confirm Sale", "पक्का गर्नुहोस्")}
              </Button>
              {!selectedId && (
                <span className="text-[11px] text-muted-foreground">
                  {t("Select an offer to continue", "अगाडि बढ्न अफर छान्नुहोस्")}
                </span>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            {t("Satire. Never sell your vote.", "यो व्यङ्ग्य हो। कहिल्यै पनि आफ्नो भोट नबेच्नुहोस्।")}
          </p>
        </DialogContent>
      </Dialog>

      <Dialog
        open={snarkOpen}
        onOpenChange={(v) => {
          setSnarkOpen(v)
          if (!v) {
            setMessage("")
            setSelectedId("")
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <button
            type="button"
            onClick={() => setSnarkOpen(false)}
            className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={t("Close", "बन्द गर्नुहोस्")}
          >
            <X className="h-4 w-4" />
          </button>

          <DialogHeader>
            <DialogTitle className="text-center">
              {t("Your Choice, Your Consequence", "तपाईंको छनोट, तपाईंको परिणाम")}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2 text-center">
            <p className="text-lg md:text-xl font-extrabold leading-relaxed">
              {message}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
