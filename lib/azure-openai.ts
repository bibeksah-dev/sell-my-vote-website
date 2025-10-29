// Azure OpenAI service for direct model calls (not Assistant API)

interface AzureOpenAIConfig {
  endpoint: string
  apiKey: string
  deploymentName: string
  apiVersion?: string
}

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class AzureOpenAIService {
  private config: AzureOpenAIConfig

  constructor(config: AzureOpenAIConfig) {
    this.config = {
      ...config,
      apiVersion: config.apiVersion || "2024-08-01-preview",
    }
  }

  async chat(
    messages: ChatMessage[],
    options?: {
      temperature?: number
      maxTokens?: number
    },
  ): Promise<string> {
    const url = `${this.config.endpoint}/openai/deployments/${this.config.deploymentName}/chat/completions?api-version=${this.config.apiVersion}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.config.apiKey,
      },
      body: JSON.stringify({
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Azure OpenAI API error: ${response.status} - ${error}`)
    }

    const data: ChatCompletionResponse = await response.json()
    return data.choices[0]?.message?.content || ""
  }
}

// Factory functions for different models
export function createFastModelService(): AzureOpenAIService {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_KEY
  const deploymentName = process.env.AZURE_OPENAI_GPT4O_DEPLOYMENT || "gpt-4o"

  if (!endpoint || !apiKey) {
    throw new Error("Missing Azure OpenAI credentials: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY required")
  }

  return new AzureOpenAIService({ endpoint, apiKey, deploymentName })
}

export function createReasoningModelService(): AzureOpenAIService {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_KEY
  const deploymentName = process.env.AZURE_OPENAI_O1_DEPLOYMENT || "o1"

  if (!endpoint || !apiKey) {
    throw new Error("Missing Azure OpenAI credentials: AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY required")
  }

  return new AzureOpenAIService({ endpoint, apiKey, deploymentName })
}
