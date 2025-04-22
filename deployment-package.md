# MyStory AI Deployment Package

This package contains everything you need to deploy the MyStory AI application with minimal configuration.

## Contents

1. **Web Application**: A fully responsive Next.js application with PWA capabilities
2. **Mobile Compatibility**: PWA features for iOS and Android installation
3. **Demo API Keys**: Pre-configured environment for immediate testing
4. **Deployment Scripts**: One-click deployment to Vercel

## Deployment Instructions

### Option 1: One-Click Vercel Deployment

1. Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmystory-ai&env=OPENAI_API_KEY,DALLE_API_KEY,ELEVENLABS_API_KEY&envDescription=API%20keys%20needed%20for%20MyStory%20AI&envLink=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmystory-ai%2Fblob%2Fmain%2F.env.example&project-name=mystory-ai&repository-name=mystory-ai)

2. Follow the prompts to connect your GitHub account
3. Enter your API keys when prompted (or use the demo keys for testing)
4. Click Deploy

### Option 2: Manual Deployment

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mystory-ai.git
cd mystory-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API keys:
```
OPENAI_API_KEY=your_openai_api_key
DALLE_API_KEY=your_dalle_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

4. Build the application:
```bash
npm run build
```

5. Deploy to your preferred hosting provider:
```bash
# For Vercel
vercel --prod

# For Netlify
netlify deploy --prod
```

## API Keys

For production use, you'll need to obtain API keys from:

1. [OpenAI](https://platform.openai.com) for story generation
2. [DALL-E](https://platform.openai.com) or [Stability.ai](https://stability.ai) for image generation
3. [ElevenLabs](https://elevenlabs.io) for voice narration (optional)

For testing, you can use the demo mode by setting:
```
NEXT_PUBLIC_ENABLE_MOCK_API=true
```

## Mobile Installation

The app can be installed on mobile devices directly from the browser:

### iOS:
1. Open the deployed app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Android:
1. Open the deployed app in Chrome
2. Tap the menu button
3. Select "Install App" or "Add to Home Screen"

## Support

For any issues or questions, please contact support@mystoryai.example.com
