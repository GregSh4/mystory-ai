'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    const storedStory = localStorage.getItem('generatedStory');
    if (!storedStory) {
      router.push('/');
    } else {
      setStory(storedStory);
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">📖 Your Story</h1>

        {!story ? (
          <p className="text-lg">Loading...</p>
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
