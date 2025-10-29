// Azure OpenAI Assistant Service
// Uses the Assistants API for more sophisticated AI interactions

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

export class AzureAssistantService {
  private endpoint: string
  private apiKey: string
  private assistantId: string
  private apiVersion = "2024-05-01-preview"

  constructor(endpoint: string, apiKey: string, assistantId: string) {
    this.endpoint = endpoint.replace(/\/$/, "") // Remove trailing slash
    this.apiKey = apiKey
    this.assistantId = assistantId
  }

  /**
   * Create a new conversation thread
   */
  async createThread(): Promise<string> {
    const url = `${this.endpoint}/openai/threads?api-version=${this.apiVersion}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to create thread: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.id
  }

  /**
   * Send a message to the assistant and wait for response
   */
  async sendMessage(threadId: string, message: string): Promise<Message[]> {
    // Add message to thread
    await this.addMessageToThread(threadId, message)

    // Run the assistant
    const runId = await this.runAssistant(threadId)

    // Wait for completion
    await this.waitForRunCompletion(threadId, runId)

    // Get all messages
    return this.getThreadMessages(threadId)
  }

  /**
   * Add a message to a thread
   */
  private async addMessageToThread(threadId: string, content: string): Promise<void> {
    const url = `${this.endpoint}/openai/threads/${threadId}/messages?api-version=${this.apiVersion}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        role: "user",
        content,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to add message: ${response.status} - ${error}`)
    }
  }

  /**
   * Run the assistant on a thread
   */
  private async runAssistant(threadId: string): Promise<string> {
    const url = `${this.endpoint}/openai/threads/${threadId}/runs?api-version=${this.apiVersion}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        assistant_id: this.assistantId,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to run assistant: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.id
  }

  /**
   * Wait for a run to complete
   */
  private async waitForRunCompletion(threadId: string, runId: string): Promise<void> {
    const maxAttempts = 60 // 60 seconds max
    let attempts = 0

    while (attempts < maxAttempts) {
      const url = `${this.endpoint}/openai/threads/${threadId}/runs/${runId}?api-version=${this.apiVersion}`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to check run status: ${response.status} - ${error}`)
      }

      const data = await response.json()

      if (data.status === "completed") {
        return
      }

      if (data.status === "failed" || data.status === "cancelled" || data.status === "expired") {
        throw new Error(`Run ${data.status}: ${data.last_error?.message || "Unknown error"}`)
      }

      // Wait 1 second before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000))
      attempts++
    }

    throw new Error("Run timed out after 60 seconds")
  }

  /**
   * Get all messages from a thread
   */
  async getThreadMessages(threadId: string): Promise<Message[]> {
    const url = `${this.endpoint}/openai/threads/${threadId}/messages?api-version=${this.apiVersion}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": this.apiKey,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to get messages: ${response.status} - ${error}`)
    }

    const data = await response.json()

    // Convert API response to our Message format
    return data.data
      .map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content[0]?.text?.value || "",
        createdAt: new Date(msg.created_at * 1000),
      }))
      .reverse() // Reverse to show oldest first
  }

  /**
   * Get just the latest assistant response from a thread
   */
  async getLatestResponse(threadId: string): Promise<string> {
    const messages = await this.getThreadMessages(threadId)
    const assistantMessages = messages.filter((m) => m.role === "assistant")
    return assistantMessages[assistantMessages.length - 1]?.content || ""
  }
}
