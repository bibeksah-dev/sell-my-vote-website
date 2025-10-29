# Sell My Vote - Political Awareness Platform

A mobile-first political awareness tool that helps Nepali citizens understand the real cost of governance and make informed voting decisions.

## Features

- **10-Question Survey**: Comprehensive questionnaire to assess governance impact
- **AI-Powered Analysis**: Uses Azure OpenAI (GPT-4o + O1) to calculate personalized governance costs
- **Bilingual Support**: Full English and Nepali (Devanagari) translations
- **Gamification**: Badges, achievements, and social challenges to encourage engagement
- **Candidate Evaluation**: Interactive checklist to help voters assess political candidates
- **Social Sharing**: Generate shareable cards and download PDF reports
- **Nepali Cultural Design**: Subtle patriotic theme inspired by temples, stupas, and Himalayan landscapes

## Tech Stack

- **Framework**: Next.js 16 with React 19.2
- **Styling**: Tailwind CSS v4 with custom Nepali-inspired design tokens
- **AI**: Azure OpenAI API (GPT-4o for fast responses, O1 for detailed reasoning)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Image Generation**: html2canvas

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Azure OpenAI account with GPT-4o and O1 model deployments

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/sell-my-vote.git
cd sell-my-vote
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your Azure OpenAI credentials in `.env.local`:
   - Get your API key from Azure Portal → Your OpenAI Resource → Keys and Endpoint
   - Set your deployment names (must match your Azure deployments)
   - Update API versions if using different versions

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AZURE_OPENAI_API_KEY` | Your Azure OpenAI API key | Yes |
| `AZURE_OPENAI_ENDPOINT` | Your Azure OpenAI endpoint URL | Yes |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | GPT-4o deployment name | Yes |
| `AZURE_OPENAI_API_VERSION` | Azure OpenAI API version | Yes |
| `AZURE_OPENAI_O1_DEPLOYMENT_NAME` | O1 model deployment name | Yes |
| `AZURE_OPENAI_O1_API_VERSION` | O1 API version | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for social sharing) | No |

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── calculate/          # AI calculation endpoints
│   ├── survey/                 # 10-question survey page
│   ├── calculate/              # Loading screen with fun facts
│   ├── results/                # Results page with cost breakdown
│   └── evaluate/               # Candidate evaluation page
├── components/
│   ├── survey/                 # Survey form components
│   ├── loading/                # Loading screen components
│   ├── results/                # Results display components
│   ├── evaluate/               # Candidate evaluation components
│   └── gamification/           # Badges, stats, challenges
├── config/
│   └── questions.ts            # Survey questions configuration
├── lib/
│   ├── azure-openai.ts         # Azure OpenAI client
│   └── language-context.tsx    # Bilingual support
└── types/
    └── survey.ts               # TypeScript types
\`\`\`

## Configuration

### Customizing Survey Questions

Edit `config/questions.ts` to modify:
- Question text (English and Nepali)
- Input types and options
- Which answers are sent to each AI model

\`\`\`typescript
// Example: Add a new question
{
  id: 'new_question',
  question: {
    en: 'Your question in English?',
    ne: 'तपाईंको प्रश्न नेपालीमा?'
  },
  type: 'dropdown',
  options: [...],
  sendToFastModel: true,
  sendToReasoningModel: true
}
\`\`\`

### Customizing Design

The design system uses Nepali-inspired colors defined in `app/globals.css`:
- Terracotta: `#D4826C` (temples)
- Ochre: `#E89F3C` (stupas, marigolds)
- Forest Green: `#2C5530` (hills)
- Himalayan Grey: `#7D8491` (mountains)
- Warm Cream: `#F5EFE7` (prayer flags)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@nepalreforms.com

## Acknowledgments

- Design inspired by Nepali cultural elements
- Built with support from Nepal Reforms initiative
- AI powered by Azure OpenAI
