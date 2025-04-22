# MyStory AI Deployment Guide

This guide provides instructions for deploying the MyStory AI application to Vercel and setting up the necessary environment variables for the AI services.

## Prerequisites

Before deploying, make sure you have:

1. A [Vercel](https://vercel.com) account
2. API keys for the following services:
   - [OpenAI](https://platform.openai.com) for story generation
   - [DALL-E](https://platform.openai.com) or [Stability.ai](https://stability.ai) for image generation
   - [ElevenLabs](https://elevenlabs.io) for voice narration (optional)

## Deployment Steps

### 1. Prepare Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# OpenAI API for story generation
OPENAI_API_KEY=your_openai_api_key

# Image generation API (choose one)
DALLE_API_KEY=your_dalle_api_key
STABILITY_API_KEY=your_stability_api_key

# Voice narration API (optional)
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### 2. Update API Integration Files

Update the API integration files to use environment variables instead of hardcoded keys:

#### OpenAI Integration (`src/lib/api/openai.ts`)

```typescript
// Replace this line:
const OPENAI_API_KEY = 'sk-demo-key-replace-with-real-key';

// With this:
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
```

#### Image Generation (`src/lib/api/image.ts`)

```typescript
// Replace these lines:
const DALLE_API_KEY = 'sk-demo-key-replace-with-real-key';
const STABILITY_API_KEY = 'sk-demo-key-replace-with-real-key';

// With these:
const DALLE_API_KEY = process.env.DALLE_API_KEY;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
```

#### Voice Narration (`src/lib/api/narration.ts`)

```typescript
// Replace this line:
const ELEVENLABS_API_KEY = 'demo-key-replace-with-real-key';

// With this:
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
```

### 3. Uncomment API Calls

In each API integration file, uncomment the actual API calls and comment out the mock implementations:

- In `src/lib/api/openai.ts`, uncomment the OpenAI API call
- In `src/lib/api/image.ts`, uncomment the DALL-E or Stability.ai API call
- In `src/lib/api/narration.ts`, uncomment the ElevenLabs API call

### 4. Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to your Vercel account and click "New Project"

3. Import your Git repository

4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `mystory-ai` (if your project is in a subdirectory)
   - Build Command: `next build`
   - Output Directory: `.next`

5. Add Environment Variables:
   - Add all the environment variables from your `.env.local` file
   - Make sure to keep these values secret

6. Click "Deploy"

7. Wait for the deployment to complete

8. Your app will be available at the URL provided by Vercel (e.g., `https://mystory-ai.vercel.app`)

## Post-Deployment

After deployment, verify that:

1. The app loads correctly
2. Story generation works with real OpenAI API calls
3. Image generation works with real DALL-E or Stability.ai API calls
4. Voice narration works with real ElevenLabs API calls (if implemented)

## Troubleshooting

If you encounter issues:

1. Check Vercel deployment logs for errors
2. Verify that environment variables are correctly set
3. Ensure API keys are valid and have sufficient credits
4. Check browser console for JavaScript errors

## Scaling Considerations

For production use with many users:

1. Consider implementing rate limiting to manage API costs
2. Add caching for generated stories and images
3. Monitor API usage to avoid unexpected charges
4. Implement user authentication for the premium features

## Updating the App

To update the deployed app:

1. Make changes to your local code
2. Push changes to your Git repository
3. Vercel will automatically redeploy your app

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Stability.ai API Documentation](https://stability.ai/documentation)
- [ElevenLabs API Documentation](https://elevenlabs.io/docs)
