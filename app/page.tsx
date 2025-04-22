'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateStory() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    character: '',
    theme: 'adventure',
    setting: 'forest'
  });
  
  const themes = [
    { value: 'adventure', label: 'Adventure', emoji: '🏕️' },
    { value: 'friendship', label: 'Friendship', emoji: '👫' },
    { value: 'magic', label: 'Magic', emoji: '✨' },
    { value: 'space', label: 'Space', emoji: '🚀' },
    { value: 'animals', label: 'Animals', emoji: '🐾' }
  ];
  
  const settings = [
    { value: 'forest', label: 'Magical Forest', emoji: '🌳' },
    { value: 'castle', label: 'Castle', emoji: '🏰' },
    { value: 'space', label: 'Outer Space', emoji: '🌌' },
    { value: 'ocean', label: 'Under the Sea', emoji: '🌊' },
    { value: 'city', label: 'Big City', emoji: '🏙️' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to the API
    // For now, we'll just navigate to the loading page
    localStorage.setItem('storyPrompt', JSON.stringify(formData));
    router.push('/loading');
  };
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          Create Your Story
        </h1>
        
        <form onSubmit={handleSubmit} className="kid-card space-y-8">
          <div>
            <label htmlFor="character" className="block text-xl font-bold mb-3 text-gray-700">
              Who is your main character? 🦸‍♀️
            </label>
            <input
              type="text"
              id="character"
              name="character"
              value={formData.character}
              onChange={handleChange}
              placeholder="Example: A brave bunny named Benny"
              required
              className="kid-input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="theme" className="block text-xl font-bold mb-3 text-gray-700">
              Choose a theme for your story 📚
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <label 
                  key={theme.value} 
                  className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.theme === theme.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    checked={formData.theme === theme.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{theme.emoji}</span>
                  <span className="font-medium">{theme.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="setting" className="block text-xl font-bold mb-3 text-gray-700">
              Where does your story take place? 🗺️
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.map((setting) => (
                <label 
                  key={setting.value} 
                  className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.setting === setting.value 
                      ? 'border-secondary bg-secondary/10' 
                      : 'border-gray-200 hover:border-secondary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="setting"
                    value={setting.value}
                    checked={formData.setting === setting.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{setting.emoji}</span>
                  <span className="font-medium">{setting.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Link href="/" className="kid-button bg-gray-400">
              Go Back
            </Link>
            <button 
              type="submit" 
              className="kid-button bg-secondary"
              disabled={!formData.character}
            >
              Create My Story! ✨
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
