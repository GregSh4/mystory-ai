'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const generateStory = async () => {
      const raw = localStorage.getItem('storyPrompt');
      if (!raw) {
        alert("Missing story prompt. Please go back and try again.");
        router.push('/');
        return;
      }

      const { character, theme, setting } = JSON.parse(raw);

      const prompt = `Write a short children's story (for ages 4–8) about a character named ${character}. 
      The story should be based on the theme of ${theme}, and take place in a ${setting}. 
      Keep it fun, magical, and full of imagination.`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a friendly and imaginative story writer for young kids.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          })
        });

        const data = await response.json();
        const storyText = data.choices?.[0]?.message?.content;

        if (storyText) {
          localStorage.setItem('generatedStory', storyText);
          router.push('/story');
        } else {
          throw new Error("Story not generated.");
        }

      } catch (error) {
        console.error('Error generating story:', error);
        alert("Something went wrong generating your story.");
        router.push('/');
      }
    };

    generateStory();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-4">✨ Generating Your Story...</h1>
        <p className="text-lg text-gray-600">This might take a few seconds. Sit tight!</p>
      </div>
    </main>
  );
}
