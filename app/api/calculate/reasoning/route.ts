import { type NextRequest, NextResponse } from "next/server"
import { AzureAssistantService } from "@/lib/azure-assistant"
import type { CalculationResult } from "@/types/survey"

export const runtime = "nodejs"
export const maxDuration = 60 // Allow up to 60 seconds for reasoning assistant

function getReasoningAssistantService() {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_KEY
  const assistantId = process.env.AZURE_ASSISTANT_ID

  if (!endpoint || !apiKey || !assistantId) {
    throw new Error(
      "Missing required environment variables: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, and AZURE_ASSISTANT_ID",
    )
  }

  return new AzureAssistantService(endpoint, apiKey, assistantId)
}

function extractJSON(text: string): any {
  // Try to find JSON in markdown code blocks first
  const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
  if (codeBlockMatch) {
    return JSON.parse(codeBlockMatch[1])
  }

  // Try to find raw JSON object
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0])
  }

  throw new Error("No valid JSON found in response")
}

export async function POST(request: NextRequest) {
  try {
    const { answers, language = "en" } = await request.json()

    if (!answers) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 })
    }

    const service = getReasoningAssistantService()

    // Create a new thread for this request
    const threadId = await service.createThread()

    const userMessage = `User Profile:\n${JSON.stringify(answers, null, 2)}\n\nLanguage: ${language}`

    console.log("[v0] Sending message to reasoning assistant...")

    // Send message and get response
    await service.sendMessage(threadId, userMessage)
    const response = await service.getLatestResponse(threadId)

    console.log("[v0] Raw assistant response:", response.substring(0, 500)) // Log first 500 chars

    let rawResult: any
    try {
      rawResult = extractJSON(response)
    } catch (parseError) {
      console.error("[v0] Failed to parse JSON from response:", response)
      throw new Error(
        `Invalid response format from AI assistant: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
      )
    }

    const breakdownData = rawResult.breakdown || rawResult.costBreakdown

    if (!breakdownData || typeof breakdownData !== "object") {
      throw new Error("Response missing breakdown data")
    }

    const categories = Object.entries(breakdownData).map(([name, amount]) => ({
      name,
      amount: typeof amount === "number" ? amount : 0,
    }))

    const totalCost = rawResult.totalCost || categories.reduce((sum, cat) => sum + cat.amount, 0)

    const result: CalculationResult = {
      costBreakdown: breakdownData,
      categories,
      summary: rawResult.summary || "No summary provided",
      totalCost,
    }

    console.log("[v0] Successfully parsed result with", categories.length, "categories, total:", totalCost)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Reasoning assistant error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to calculate governance cost"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
