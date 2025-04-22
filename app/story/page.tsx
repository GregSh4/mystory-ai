'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();
  const [story, setStory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const storedStory = localStorage.getItem('generatedStory');
    const rawPrompt = localStorage.getItem('storyPrompt');

    if (!storedStory || !rawPrompt) {
  console.warn("No story or prompt found in localStorage.");
  return;
}


    setStory(storedStory);

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

  const speakStory = async () => {
    if (!story) return;

    setIsSpeaking(true);

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/exAV9GRbXWB0kD2ECr4B/stream', {
        method: 'POST',
        headers: {
          'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: story,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        setIsSpeaking(false);
      };

    } catch (err) {
      console.error("Narration failed", err);
      setIsSpeaking(false);
      alert("Narration failed.");
    }
  };

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

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => router.push('/')}
            className="kid-button bg-primary hover:bg-primary-dark"
          >
            Create Another Story
          </button>
          <button
            onClick={speakStory}
            disabled={isSpeaking}
            className="kid-button bg-green-500 hover:bg-green-600"
          >
            {isSpeaking ? "Narrating..." : "🔊 Play Narration"}
          </button>
        </div>
      </div>
    </main>
  );
}
