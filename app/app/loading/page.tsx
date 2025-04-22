'use client';

export default function LoadingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-4">✨ Generating Your Story...</h1>
        <p className="text-lg text-gray-600">This might take a few seconds. Sit tight!</p>
      </div>
    </main>
  );
}
