# MyStory AI Technical Documentation

This document provides technical details about the MyStory AI application architecture, components, and implementation.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [API Integrations](#api-integrations)
5. [PWA Implementation](#pwa-implementation)
6. [Mobile Compatibility](#mobile-compatibility)
7. [Responsive Design](#responsive-design)
8. [Deployment](#deployment)
9. [Environment Variables](#environment-variables)
10. [Future Enhancements](#future-enhancements)

## Architecture Overview

MyStory AI is built using Next.js, a React framework that enables server-side rendering and static site generation. The application follows a component-based architecture with a focus on:

- **Progressive Web App (PWA)** capabilities for mobile compatibility
- **Responsive design** for all device sizes
- **Offline functionality** through service workers
- **API integrations** for AI-powered content generation

The app uses a combination of client-side and server-side rendering to optimize performance and user experience.

## Project Structure

```
mystory-ai/
├── public/                 # Static assets
│   ├── icons/              # App icons for PWA
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── sw-register.js      # Service worker registration
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout with PWA setup
│   │   ├── create/         # Story creation page
│   │   ├── loading/        # Loading screen
│   │   └── story/          # Story viewer
│   ├── components/         # Reusable UI components
│   │   ├── AppWrapper.tsx  # PWA wrapper component
│   │   ├── PWAInstallPrompt.tsx # Installation prompt
│   │   └── StoryEditor.tsx # Story editing component
│   ├── lib/                # Utility functions and API integrations
│   │   └── api/            # AI API integrations
│   │       ├── openai.ts   # OpenAI for story generation
│   │       ├── image.ts    # DALL-E/Stability.ai for images
│   │       └── narration.ts # ElevenLabs for voice
│   └── globals.css         # Global styles and responsive design
├── .env.local              # Environment variables
└── package.json            # Dependencies and scripts
```

## Key Components

### AppWrapper Component

The `AppWrapper` component serves as a container for the entire application and handles:
- Service worker registration
- PWA installation prompt display
- Offline capability management

```typescript
// src/components/AppWrapper.tsx
import React from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function AppWrapper({ children }) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
    
    // Register service worker
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          console.log('ServiceWorker registration successful');
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);
  
  return (
    <>
      {children}
      {isClient && <PWAInstallPrompt />}
    </>
  );
}
```

### StoryEditor Component

The `StoryEditor` component provides a user interface for editing generated stories:
- Edit story title
- Modify scene titles and text
- Update image prompts
- Save changes to localStorage

```typescript
// src/components/StoryEditor.tsx
import React from 'react';

export default function StoryEditor({ story, onSave, onCancel }) {
  const [editedStory, setEditedStory] = React.useState(story);

  // Handlers for editing story content
  const handleTitleChange = (e) => {
    setEditedStory({
      ...editedStory,
      title: e.target.value
    });
  };

  const handleSceneChange = (index, field, value) => {
    const updatedScenes = [...editedStory.scenes];
    updatedScenes[index] = {
      ...updatedScenes[index],
      [field]: value
    };
    
    setEditedStory({
      ...editedStory,
      scenes: updatedScenes
    });
  };

  // UI for editing story content
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {/* Story title editing */}
      {/* Scene editing */}
      {/* Save/Cancel buttons */}
    </div>
  );
}
```

## API Integrations

### OpenAI Integration

The application integrates with OpenAI's GPT models for story generation:

```typescript
// src/lib/api/openai.ts
export async function generateStory(prompt: StoryPrompt): Promise<GeneratedStory> {
  // Check if mock API is enabled
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true') {
    return generateMockStory(prompt);
  }

  // Real API implementation
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a playful and creative storyteller for children aged 4 to 8.'
          },
          {
            role: 'user',
            content: `Create a children's story about ${prompt.character} with a theme of ${prompt.theme} set in ${prompt.setting}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating story:', error);
    return generateMockStory(prompt); // Fallback to mock story
  }
}
```

### Image Generation

The application integrates with DALL-E or Stability.ai for image generation:

```typescript
// src/lib/api/image.ts
export async function generateImage(prompt: string): Promise<string> {
  // Check if mock API is enabled
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true') {
    return generateMockImage(prompt);
  }

  // Real API implementation
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DALLE_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `Create a child-friendly, colorful illustration for a children's story: ${prompt}`,
        n: 1,
        size: '1024x1024',
        response_format: 'url'
      })
    });

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    return generateMockImage(prompt); // Fallback to mock image
  }
}
```

### Voice Narration

The application integrates with ElevenLabs for voice narration:

```typescript
// src/lib/api/narration.ts
export async function generateNarration(text: string): Promise<string> {
  // Check if mock API is enabled
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true') {
    return generateMockNarration(text);
  }

  // Real API implementation
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/voice-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      })
    });

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating narration:', error);
    return generateMockNarration(text); // Fallback to mock narration
  }
}
```

## PWA Implementation

### Manifest File

The `manifest.json` file defines the application's appearance when installed:

```json
{
  "name": "MyStory AI",
  "short_name": "MyStory",
  "description": "AI-powered story creator for kids aged 4-8",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f4ff",
  "theme_color": "#7c3aed",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Service Worker

The service worker (`sw.js`) provides offline functionality:

```javascript
// Service worker for caching and offline functionality
const CACHE_NAME = 'mystory-ai-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

## Mobile Compatibility

The application is designed to work on both iOS and Android devices through its PWA implementation:

### iOS Compatibility

- Uses `apple-touch-icon` for home screen icon
- Sets `apple-mobile-web-app-capable` for full-screen experience
- Configures `apple-mobile-web-app-status-bar-style` for status bar appearance

### Android Compatibility

- Uses standard PWA manifest for installation
- Provides maskable icons for adaptive icon support
- Implements service worker for offline functionality

## Responsive Design

The application uses a mobile-first approach with responsive design principles:

### CSS Media Queries

```css
/* Mobile-first base styles */
.card {
  width: 100%;
  padding: 1rem;
}

/* Tablet styles */
@media (min-width: 640px) {
  .card {
    width: 50%;
    padding: 1.5rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .card {
    width: 33.333%;
    padding: 2rem;
  }
}
```

### Touch-Friendly UI

- Minimum touch target size of 44x44 pixels
- Adequate spacing between interactive elements
- Visual feedback for touch interactions

## Deployment

The application is configured for easy deployment to Vercel:

### Vercel Deployment

1. Connect to GitHub repository
2. Configure environment variables
3. Deploy with automatic CI/CD

### Environment Variables

The application uses the following environment variables:

```
OPENAI_API_KEY=your_openai_api_key
DALLE_API_KEY=your_dalle_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
NEXT_PUBLIC_ENABLE_MOCK_API=true|false
```

## Future Enhancements

The application architecture supports future enhancements:

1. **User Authentication**: Add user accounts for story management
2. **Multiple Languages**: Support for additional languages
3. **Enhanced Customization**: More options for story themes and settings
4. **Improved Illustrations**: Higher quality image generation
5. **Voice Customization**: Options for different narration voices
6. **Analytics**: Usage tracking and insights

---

This technical documentation provides a comprehensive overview of the MyStory AI application architecture and implementation. For deployment instructions, please refer to the deployment guide.
