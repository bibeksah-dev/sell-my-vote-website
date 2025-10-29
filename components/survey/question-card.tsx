"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import type { Question } from "@/config/questions"

interface QuestionCardProps {
  question: Question
  value: any
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
  canGoBack: boolean
  isLast: boolean
}

export function QuestionCard({ question, value, onChange, onNext, onBack, canGoBack, isLast }: QuestionCardProps) {
  const { language, t } = useLanguage()
  const [error, setError] = useState<string>("")
  const [localValue, setLocalValue] = useState(value)
  const [otherText, setOtherText] = useState("")

  useEffect(() => {
    setLocalValue(value)
    setOtherText("")
    setError("")
  }, [value, question.id])

  const questionText = language === "np" ? question.questionNp : question.question
  const placeholderText = language === "np" ? question.placeholderNp || question.placeholder : question.placeholder

  const validate = () => {
    if (question.validation?.required) {
      if (question.type === "text") {
        if (!localValue || localValue.trim() === "") {
          setError(t("This field is required", "यो क्षेत्र आवश्यक छ"))
          return false
        }
      } else if (question.type === "multiselect") {
        if (!localValue || localValue.length === 0) {
          setError(t("Please select at least one option", "कृपया कम्तिमा एउटा विकल्प चयन गर्नुहोस्"))
          return false
        }
        if (question.hasOtherOption && Array.isArray(localValue) && localValue.includes(question.otherOptionValue)) {
          if (!otherText || otherText.trim() === "") {
            setError(t("Please specify 'Other'", "कृपया 'अन्य' निर्दिष्ट गर्नुहोस्"))
            return false
          }
        }
      } else if (question.type === "nested") {
        if (question.id === "region") {
          if (!localValue?.province || !localValue?.municipality) {
            setError(t("Please complete all fields", "कृपया सबै क्षेत्रहरू पूरा गर्नुहोस्"))
            return false
          }
        } else if (question.id === "healthcareExpenses") {
          if (localValue?.hadExpenses === undefined) {
            setError(t("Please answer the question", "कृपया प्रश्नको जवाफ दिनुहोस्"))
            return false
          }
        }
      } else if (!localValue && localValue !== 0) {
        setError(t("This field is required", "यो क्षेत्र आवश्यक छ"))
        return false
      }

      if (question.type === "dropdown" && question.hasOtherOption && localValue === question.otherOptionValue) {
        if (!otherText || otherText.trim() === "") {
          setError(t("Please specify 'Other'", "कृपया 'अन्य' निर्दिष्ट गर्नुहोस्"))
          return false
        }
      }
    }

    if (question.type === "number" && localValue) {
      const num = Number(localValue)
      if (question.validation?.min !== undefined && num < question.validation.min) {
        setError(t(`Minimum value is ${question.validation.min}`, `न्यूनतम मान ${question.validation.min} हो`))
        return false
      }
      if (question.validation?.max !== undefined && num > question.validation.max) {
        setError(t(`Maximum value is ${question.validation.max}`, `अधिकतम मान ${question.validation.max} हो`))
        return false
      }
    }

    setError("")
    return true
  }

  const handleNext = () => {
    if (validate()) {
      if (question.hasOtherOption) {
        if (question.type === "dropdown" && localValue === question.otherOptionValue) {
          onChange({ value: localValue, otherText })
        } else if (
          question.type === "multiselect" &&
          Array.isArray(localValue) &&
          localValue.includes(question.otherOptionValue || "other")
        ) {
          onChange({ value: localValue, otherText })
        } else {
          onChange(localValue)
        }
      } else {
        onChange(localValue)
      }
      onNext()
    }
  }

  const renderInput = () => {
    switch (question.type) {
      case "text":
        return (
          <Input
            type="text"
            value={localValue || ""}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholderText}
            className="text-lg h-14"
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={localValue || ""}
            onChange={(e) => setLocalValue(e.target.value ? Number(e.target.value) : "")}
            placeholder={placeholderText}
            min={question.min}
            max={question.max}
            className="text-lg h-14"
          />
        )

      case "dropdown":
        return (
          <div className="space-y-4">
            <Select value={localValue || undefined} onValueChange={setLocalValue}>
              <SelectTrigger className="text-lg h-14">
                <SelectValue placeholder={t("Select one", "एउटा चयन गर्नुहोस्")} />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-base">
                    {language === "np" ? option.labelNp || option.label : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {question.hasOtherOption && localValue === question.otherOptionValue && (
              <div className="animate-bloom">
                <Input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder={t("Please specify", "कृपया निर्दिष्ट गर्नुहोस्")}
                  className="text-lg h-14"
                />
              </div>
            )}
          </div>
        )

      case "multiselect":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isChecked = Array.isArray(localValue) && localValue.includes(option.value)
              return (
                <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={option.value}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const current = Array.isArray(localValue) ? localValue : []
                      if (checked) {
                        setLocalValue([...current, option.value])
                      } else {
                        setLocalValue(current.filter((v) => v !== option.value))
                      }
                    }}
                  />
                  <Label htmlFor={option.value} className="text-base cursor-pointer flex-1 leading-relaxed">
                    {language === "np" ? option.labelNp || option.label : option.label}
                  </Label>
                </div>
              )
            })}
            {question.hasOtherOption &&
              Array.isArray(localValue) &&
              localValue.includes(question.otherOptionValue || "other") && (
                <div className="animate-bloom pl-9">
                  <Input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder={t("Please specify", "कृपया निर्दिष्ट गर्नुहोस्")}
                    className="text-lg h-14"
                  />
                </div>
              )}
          </div>
        )

      case "scale":
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{t("Not at all", "बिल्कुल होइन")}</span>
              <span>{t("Severely", "गम्भीर रूपमा")}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setLocalValue(num)}
                  className={`flex-1 h-14 rounded-lg border-2 font-semibold text-lg transition-all ${
                    localValue === num
                      ? "border-terracotta-500 bg-terracotta-500 text-white shadow-lg scale-105"
                      : "border-border hover:border-terracotta-300 hover:bg-muted"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )

      case "nested":
        if (question.id === "region") {
          return (
            <div className="space-y-4">
              <div>
                <Label className="text-base mb-2 block">{t("Province", "प्रदेश")}</Label>
                <Select
                  value={localValue?.province || undefined}
                  onValueChange={(val) => setLocalValue({ ...localValue, province: val, municipality: "" })}
                >
                  <SelectTrigger className="text-lg h-14">
                    <SelectValue placeholder={t("Select one", "एउटा चयन गर्नुहोस्")} />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-base">
                        {language === "np" ? option.labelNp || option.label : option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base mb-2 block">{t("Municipality", "नगरपालिका")}</Label>
                <Input
                  type="text"
                  value={localValue?.municipality || ""}
                  onChange={(e) => setLocalValue({ ...localValue, municipality: e.target.value })}
                  placeholder={t("Enter municipality name", "नगरपालिकाको नाम प्रविष्ट गर्नुहोस्")}
                  className="text-lg h-14"
                />
              </div>
            </div>
          )
        } else if (question.id === "healthcareExpenses") {
          return (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={localValue?.hadExpenses === true ? "default" : "outline"}
                  className="flex-1 h-14 text-base"
                  onClick={() => setLocalValue({ hadExpenses: true, amount: localValue?.amount || 0 })}
                >
                  {t("Yes", "हो")}
                </Button>
                <Button
                  type="button"
                  variant={localValue?.hadExpenses === false ? "default" : "outline"}
                  className="flex-1 h-14 text-base"
                  onClick={() => setLocalValue({ hadExpenses: false, amount: 0 })}
                >
                  {t("No", "होइन")}
                </Button>
              </div>
              {localValue?.hadExpenses && (
                <div className="animate-bloom">
                  <Label className="text-base mb-2 block">{t("Approximate amount (Rs.)", "अनुमानित रकम (रु.)")}</Label>
                  <Input
                    type="number"
                    value={localValue?.amount || ""}
                    onChange={(e) =>
                      setLocalValue({ ...localValue, amount: e.target.value ? Number(e.target.value) : 0 })
                    }
                    placeholder={t("Enter amount", "रकम प्रविष्ट गर्नुहोस्")}
                    className="text-lg h-14"
                    min={0}
                  />
                </div>
              )}
            </div>
          )
        }
        return null

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-bloom">
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-balance leading-tight mb-2">{questionText}</h2>
          {question.type === "number" && question.min !== undefined && question.max !== undefined && (
            <p className="text-sm text-muted-foreground devanagari-numerals">
              {t(`(${question.min} - ${question.max})`, `(${question.min} - ${question.max})`)}
            </p>
          )}
        </div>

        <div>{renderInput()}</div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {canGoBack && (
            <Button type="button" variant="outline" onClick={onBack} className="h-12 px-6 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("Back", "पछाडि")}
            </Button>
          )}
          <Button type="button" onClick={handleNext} className="flex-1 h-12 text-base">
            {isLast ? t("Calculate", "गणना गर्नुहोस्") : t("Next", "अर्को")}
            {!isLast && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
