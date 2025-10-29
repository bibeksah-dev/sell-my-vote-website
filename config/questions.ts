// Survey questions configuration
// ADMIN NOTE: Edit the 'sentToFastModel' and 'sentToReasoningModel' arrays to control which answers are sent to each AI model

export interface QuestionOption {
  value: string
  label: string
  labelNp?: string // Nepali translation
}

export interface Question {
  id: keyof import("../types/survey").SurveyAnswers
  type: "number" | "dropdown" | "multiselect" | "scale" | "nested" | "text"
  question: string
  questionNp: string // Nepali translation
  placeholder?: string
  placeholderNp?: string
  options?: QuestionOption[]
  min?: number
  max?: number
  validation?: {
    required: boolean
    min?: number
    max?: number
  }
  sentToFastModel: boolean // ADMIN: Set to true to send this answer to GPT-4o for fun facts
  sentToReasoningModel: boolean // ADMIN: Set to true to send this answer to o1 for cost calculation
  hasOtherOption?: boolean // ADMIN: Set to true to show text input when "other" is selected
  otherOptionValue?: string // ADMIN: Value of the "other" option
}

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: "name",
    type: "text",
    question: "What is your name?",
    questionNp: "तपाईंको नाम के हो?",
    placeholder: "Enter your name",
    placeholderNp: "आफ्नो नाम प्रविष्ट गर्नुहोस्",
    validation: { required: true },
    sentToFastModel: false,
    sentToReasoningModel: false,
  },
  {
    id: "age",
    type: "number",
    question: "How old are you?",
    questionNp: "तपाईंको उमेर कति हो?",
    placeholder: "Enter your age",
    placeholderNp: "आफ्नो उमेर प्रविष्ट गर्नुहोस्",
    min: 18,
    max: 100,
    validation: { required: true, min: 18, max: 100 },
    sentToFastModel: true, // ADMIN: Sent to fast model
    sentToReasoningModel: true, // ADMIN: Sent to reasoning model
  },
  {
    id: "householdSize",
    type: "number",
    question: "How many people depend on you financially?",
    questionNp: "तपाईंमा आर्थिक रूपमा कति जना निर्भर छन्?",
    placeholder: "Number of dependents",
    placeholderNp: "आश्रितहरूको संख्या",
    min: 0,
    max: 20,
    validation: { required: true, min: 0, max: 20 },
    sentToFastModel: false,
    sentToReasoningModel: true,
  },
  {
    id: "region",
    type: "nested",
    question: "Where do you live?",
    questionNp: "तपाईं कहाँ बस्नुहुन्छ?",
    options: [
      { value: "province-1", label: "Koshi Province", labelNp: "कोशी प्रदेश" },
      { value: "madhesh", label: "Madhesh Province", labelNp: "मधेश प्रदेश" },
      { value: "bagmati", label: "Bagmati Province", labelNp: "बागमती प्रदेश" },
      { value: "gandaki", label: "Gandaki Province", labelNp: "गण्डकी प्रदेश" },
      { value: "lumbini", label: "Lumbini Province", labelNp: "लुम्बिनी प्रदेश" },
      { value: "karnali", label: "Karnali Province", labelNp: "कर्णाली प्रदेश" },
      { value: "sudurpashchim", label: "Sudurpashchim Province", labelNp: "सुदूरपश्चिम प्रदेश" },
    ],
    validation: { required: true },
    sentToFastModel: true,
    sentToReasoningModel: true,
  },
  {
    id: "occupation",
    type: "dropdown",
    question: "What is your primary occupation?",
    questionNp: "तपाईंको मुख्य पेशा के हो?",
    options: [
      { value: "student", label: "Student", labelNp: "विद्यार्थी" },
      { value: "farmer", label: "Farmer", labelNp: "किसान" },
      { value: "business", label: "Business Owner", labelNp: "व्यवसायी" },
      { value: "government", label: "Government Employee", labelNp: "सरकारी कर्मचारी" },
      { value: "private", label: "Private Sector", labelNp: "निजी क्षेत्र" },
      { value: "daily-wage", label: "Daily Wage Worker", labelNp: "दैनिक ज्यालादारी" },
      { value: "professional", label: "Professional (Doctor, Engineer, etc.)", labelNp: "पेशेवर" },
      { value: "unemployed", label: "Unemployed", labelNp: "बेरोजगार" },
      { value: "retired", label: "Retired", labelNp: "सेवानिवृत्त" },
      { value: "other", label: "Other", labelNp: "अन्य" },
    ],
    validation: { required: true },
    hasOtherOption: true,
    otherOptionValue: "other",
    sentToFastModel: true,
    sentToReasoningModel: true,
  },
  {
    id: "incomeRange",
    type: "dropdown",
    question: "What is your approximate monthly income?",
    questionNp: "तपाईंको अनुमानित मासिक आय कति हो?",
    options: [
      { value: "0-15000", label: "Rs. 0 - 15,000", labelNp: "रु. ०-१५,०००" },
      { value: "15000-30000", label: "Rs. 15,000 - 30,000", labelNp: "रु. १५,०००-३०,०००" },
      { value: "30000-50000", label: "Rs. 30,000 - 50,000", labelNp: "रु. ३०,०००-५०,०००" },
      { value: "50000-75000", label: "Rs. 50,000 - 75,000", labelNp: "रु. ५०,०००-७५,०००" },
      { value: "75000-100000", label: "Rs. 75,000 - 1,00,000", labelNp: "रु. ७५,०००-१,००,०००" },
      { value: "100000+", label: "Rs. 1,00,000+", labelNp: "रु. १,००,०००+" },
    ],
    validation: { required: true },
    sentToFastModel: true,
    sentToReasoningModel: true,
  },
  {
    id: "recentIssues",
    type: "multiselect",
    question: "Have you faced any of these issues last year due to government inefficiency?",
    questionNp: "के तपाईंले गत वर्ष सरकारी अकुशलताका कारण यी समस्याहरू सामना गर्नुभयो?",
    options: [
      { value: "accident", label: "Accident/Injury", labelNp: "दुर्घटना/चोटपटक" },
      { value: "company-registration", label: "Delayed company registration", labelNp: "कम्पनी दर्ता ढिलाइ" },
      { value: "subsidy", label: "Subsidy not received", labelNp: "अनुदान प्राप्त भएन" },
      { value: "road-damage", label: "Road damage/Poor infrastructure", labelNp: "सडक क्षति/खराब पूर्वाधार" },
      { value: "hospital", label: "Hospital/Medicine shortage", labelNp: "अस्पताल/औषधि अभाव" },
      { value: "water", label: "Water shortage", labelNp: "पानीको अभाव" },
      { value: "power-cuts", label: "Frequent power cuts", labelNp: "बारम्बार बिजुली कटौती" },
      { value: "passport", label: "Passport delay", labelNp: "राहदानी ढिलाइ" },
      { value: "other", label: "Other", labelNp: "अन्य" },
    ],
    validation: { required: true },
    hasOtherOption: true,
    otherOptionValue: "other",
    sentToFastModel: false,
    sentToReasoningModel: true,
  },
  {
    id: "educationDependents",
    type: "number",
    question: "How many children or dependents are in school?",
    questionNp: "कति बालबालिका वा आश्रितहरू विद्यालयमा छन्?",
    placeholder: "Number of students",
    placeholderNp: "विद्यार्थीहरूको संख्या",
    min: 0,
    max: 10,
    validation: { required: true, min: 0, max: 10 },
    sentToFastModel: false,
    sentToReasoningModel: true,
  },
  {
    id: "healthcareExpenses",
    type: "nested",
    question: "Did you incur any major medical expenses last year?",
    questionNp: "के तपाईंले गत वर्ष कुनै ठूलो चिकित्सा खर्च गर्नुभयो?",
    validation: { required: true },
    sentToFastModel: false,
    sentToReasoningModel: true,
  },
  {
    id: "dailySpendingImpact",
    type: "scale",
    question: "Did you face higher costs for fuel, electricity, or essentials due to poor governance?",
    questionNp: "के तपाईंले खराब शासनका कारण इन्धन, बिजुली वा आवश्यक वस्तुहरूको उच्च लागत सामना गर्नुभयो?",
    min: 1,
    max: 5,
    validation: { required: true, min: 1, max: 5 },
    sentToFastModel: false,
    sentToReasoningModel: true,
  },
  {
    id: "votingHistory",
    type: "dropdown",
    question: "Are you a first-time voter or have you voted before?",
    questionNp: "के तपाईं पहिलो पटक मतदाता हुनुहुन्छ वा पहिले मतदान गर्नुभएको छ?",
    options: [
      { value: "first-time", label: "First-time voter", labelNp: "पहिलो पटक मतदाता" },
      { value: "voted-once", label: "Voted once before", labelNp: "एक पटक मतदान गरेको" },
      { value: "regular", label: "Regular voter (2+ times)", labelNp: "नियमित मतदाता (२+ पटक)" },
      { value: "never", label: "Never voted", labelNp: "कहिल्यै मतदान गरेको छैन" },
    ],
    validation: { required: true },
    sentToFastModel: true,
    sentToReasoningModel: true,
  },
]

// Helper function to get answers for fast model (GPT-4o)
export function getAnswersForFastModel(answers: Partial<import("../types/survey").SurveyAnswers>) {
  const fastModelQuestions = SURVEY_QUESTIONS.filter((q) => q.sentToFastModel)
  const selectedAnswers: Record<string, any> = {}

  fastModelQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      selectedAnswers[q.id] = answers[q.id]
    }
  })

  return selectedAnswers
}

// Helper function to get all answers for reasoning model (o1)
export function getAnswersForReasoningModel(answers: import("../types/survey").SurveyAnswers) {
  return answers // Send all answers to reasoning model
}
