'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();
  const [story, setStory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedStory = localStorage.getItem('generatedStory');
    const rawPrompt = localStorage.getItem('storyPrompt');

    if (!storedStory || !rawPrompt) {
      router.push('/');
      return;
    }

    setStory(storedStory);

    // Generate image
    const { character, theme, setting } = JSON.parse(rawPrompt);
    const imagePrompt = `An illustration of a children's story featuring a character named ${character} in a ${setting}. Theme: ${theme}. Fantasy, colorful, storybook style.`;

    fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        n: 1,
        size: '512x512'
      })
    })
      .then(res => res.json())
      .then(data => {
        const url = data?.data?.[0]?.url;
        if (url) setImageUrl(url);
      })
      .catch(err => {
        console.error("Image generation failed", err);
      });
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">📖 Your Story</h1>

        {imageUrl && (
          <div className="flex justify-center mb-6">
            <img src={imageUrl} alt="Story illustration" className="rounded-xl shadow-md w-full max-w-sm" />
          </div>
        )}

        {!story ? (
          <p className="text-lg">Loading story...</p>
        ) : (
          <div className="whitespace-pre-line text-lg leading-relaxed bg-white p-6 rounded-xl shadow-md">
            {story}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="kid-button bg-primary hover:bg-primary-dark"
          >
            Create Another Story
          </button>
        </div>
      </div>
    </main>
  );
}
