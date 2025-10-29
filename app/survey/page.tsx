"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProgressIndicator } from "@/components/survey/progress-indicator"
import { QuestionCard } from "@/components/survey/question-card"
import { SURVEY_QUESTIONS } from "@/config/questions"
import type { SurveyAnswers } from "@/types/survey"

export default function SurveyPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<SurveyAnswers>>({})

  const question = SURVEY_QUESTIONS[currentQuestion]
  const currentValue = answers[question.id]

  const handleChange = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < SURVEY_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Survey complete - navigate to loading screen
      localStorage.setItem("surveyAnswers", JSON.stringify(answers))
      router.push("/calculate")
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen pattern-dhaka py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <ProgressIndicator current={currentQuestion + 1} total={SURVEY_QUESTIONS.length} />

        <QuestionCard
          key={question.id}
          question={question}
          value={currentValue}
          onChange={handleChange}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentQuestion > 0}
          isLast={currentQuestion === SURVEY_QUESTIONS.length - 1}
        />
      </div>
    </div>
  )
}
