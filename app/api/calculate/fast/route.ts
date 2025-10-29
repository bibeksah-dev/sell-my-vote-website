import { type NextRequest, NextResponse } from "next/server"
import { AzureAssistantService } from "@/lib/azure-assistant"
import { getAnswersForFastModel } from "@/config/questions"

export const runtime = "nodejs"

function getFastAssistantService() {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_KEY
  const assistantId = process.env.AZURE_FAST_ASSISTANT_ID

  if (!endpoint || !apiKey || !assistantId) {
    throw new Error(
      "Missing required environment variables: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, and AZURE_FAST_ASSISTANT_ID",
    )
  }

  return new AzureAssistantService(endpoint, apiKey, assistantId)
}

export async function POST(request: NextRequest) {
  try {
    const { answers, language = "en" } = await request.json()

    if (!answers) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 })
    }

    // Get only the answers configured to be sent to fast model
    const selectedAnswers = getAnswersForFastModel(answers)

    const service = getFastAssistantService()

    // Create a new thread for this request
    const threadId = await service.createThread()

    const userMessage = `User Profile:\n${JSON.stringify(selectedAnswers, null, 2)}\n\nLanguage: ${language}`

    // Send message and get response
    await service.sendMessage(threadId, userMessage)
    const response = await service.getLatestResponse(threadId)

    // Parse markdown bullet points into array
    const facts = response
      .split("\n")
      .filter((line) => line.trim().startsWith("-") || line.trim().startsWith("*"))
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .filter((fact) => fact.length > 0)
      .map((text, index) => ({
        id: `fact-${index}`,
        text,
      }))

    return NextResponse.json({ facts })
  } catch (error) {
    console.error("[v0] Fast assistant error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate fun facts"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
