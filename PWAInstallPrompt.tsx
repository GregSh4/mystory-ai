import React from 'react';
import Head from 'next/head';

// PWA installation prompt component
const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [installEvent, setInstallEvent] = React.useState(null);
  
  React.useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (!isAppInstalled) {
      // Listen for beforeinstallprompt event
      const handleBeforeInstallPrompt = (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Store the event for later use
        setInstallEvent(e);
        // Show the install prompt
        setShowPrompt(true);
      };
      
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);
  
  const handleInstallClick = () => {
    if (!installEvent) return;
    
    // Show the install prompt
    installEvent.prompt();
    
    // Wait for the user to respond to the prompt
    installEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the saved prompt
      setInstallEvent(null);
      setShowPrompt(false);
    });
  };
  
  const dismissPrompt = () => {
    setShowPrompt(false);
  };
  
  if (!showPrompt) return null;
  
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 border-2 border-purple-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-3xl mr-3">📱</div>
          <div>
            <h3 className="font-bold text-purple-700">Install MyStory AI</h3>
            <p className="text-sm text-gray-600">Add to your home screen for the best experience</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={dismissPrompt}
            className="px-3 py-1 text-sm bg-gray-200 rounded-lg"
          >
            Not now
          </button>
          <button 
            onClick={handleInstallClick}
            className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
