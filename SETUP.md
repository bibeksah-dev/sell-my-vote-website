# Setup Guide for Sell My Vote

This guide will help you set up the project with Azure OpenAI integration.

## Step 1: Azure OpenAI Setup

### Create Azure OpenAI Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Azure OpenAI"
4. Click "Create" and fill in:
   - Subscription: Your Azure subscription
   - Resource group: Create new or use existing
   - Region: Choose a region (e.g., East US, West Europe)
   - Name: Your resource name (e.g., `sellmyvote-openai`)
   - Pricing tier: Standard S0

5. Click "Review + create" then "Create"

### Deploy Models

After your resource is created:

1. Go to your Azure OpenAI resource
2. Click "Model deployments" in the left menu
3. Click "Create new deployment"

**Deploy GPT-4o (Fast Model):**
- Model: `gpt-4o`
- Deployment name: `gpt-4o` (or your preferred name)
- Click "Create"

**Deploy O1 (Reasoning Model):**
- Model: `o1-preview` or `o1`
- Deployment name: `o1-preview` (or your preferred name)
- Click "Create"

### Get API Credentials

1. In your Azure OpenAI resource, click "Keys and Endpoint"
2. Copy:
   - **KEY 1** (this is your API key)
   - **Endpoint** (e.g., `https://your-resource.openai.azure.com/`)

## Step 2: Configure Environment Variables

1. Copy the example environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Edit `.env.local` with your credentials:

\`\`\`env
# Replace with your actual values
AZURE_OPENAI_API_KEY=abc123def456...
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
AZURE_OPENAI_API_VERSION=2024-08-01-preview

AZURE_OPENAI_O1_DEPLOYMENT_NAME=o1-preview
AZURE_OPENAI_O1_API_VERSION=2024-08-01-preview

NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

**Important Notes:**
- `AZURE_OPENAI_DEPLOYMENT_NAME` must match your GPT-4o deployment name in Azure
- `AZURE_OPENAI_O1_DEPLOYMENT_NAME` must match your O1 deployment name in Azure
- Keep your API key secret - never commit it to version control

## Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 4: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Step 5: Test the Integration

1. Navigate to the homepage
2. Click "Calculate Your Real Cost"
3. Complete the 10-question survey
4. Wait for the AI to calculate your governance cost
5. View your results

If you see errors:
- Check that your environment variables are correct
- Verify your Azure OpenAI deployments are active
- Check the browser console and terminal for error messages

## Troubleshooting

### "API key not found" Error
- Make sure `.env.local` exists in your project root
- Restart your development server after adding environment variables
- Check that variable names match exactly (case-sensitive)

### "Deployment not found" Error
- Verify deployment names in Azure match your `.env.local`
- Check that models are fully deployed (not in "Creating" state)

### "Rate limit exceeded" Error
- Azure OpenAI has rate limits based on your pricing tier
- Wait a few minutes and try again
- Consider upgrading your Azure OpenAI tier

### API Version Issues
- If you get API version errors, check Azure OpenAI documentation for the latest supported versions
- Update `AZURE_OPENAI_API_VERSION` in your `.env.local`

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add all environment variables in your hosting platform's dashboard
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. Ensure your Azure OpenAI resource has sufficient quota for production traffic
4. Consider setting up monitoring and alerts in Azure

## Security Best Practices

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Monitor API usage in Azure Portal
- Set up spending alerts in Azure

## Need Help?

- Check [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- Review [Next.js Environment Variables Guide](https://nextjs.org/docs/basic-features/environment-variables)
- Open an issue on GitHub
