"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-lg bg-card p-1 shadow-sm border border-border">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-xs font-medium px-3 py-1 h-auto"
      >
        EN
      </Button>
      <Button
        variant={language === "np" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("np")}
        className="text-xs font-medium px-3 py-1 h-auto"
      >
        नेपाली
      </Button>
    </div>
  )
}
