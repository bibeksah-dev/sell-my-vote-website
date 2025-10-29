// Survey data types for the Sell My Vote application

export interface SurveyAnswers {
  name: string // Added name field as first question
  age: number
  householdSize: number
  region: {
    province: string
    municipality: string
  }
  occupation: string
  occupationOther?: string // Added occupationOther field for "other" option
  incomeRange: string
  recentIssues: string[]
  recentIssuesOther?: string // Added recentIssuesOther field for "other" option
  educationDependents: number
  healthcareExpenses: {
    hadExpenses: boolean
    amount?: number
  }
  dailySpendingImpact: number // 1-5 scale
  votingHistory: string
}

export interface CostBreakdown {
  healthcare: number
  education: number
  infrastructure: number
  utilities: number
  timeWasted: number
  opportunityCost: number
  [key: string]: number // Allow dynamic categories from AI
}

export interface CalculationResult {
  costBreakdown: CostBreakdown
  summary: string
  totalCost: number
  categories: Array<{
    name: string
    amount: number
  }>
}

export interface FunFact {
  text: string
  id: string
}

export interface UserProgress {
  currentQuestion: number
  answers: Partial<SurveyAnswers>
  completedAt?: Date
}
