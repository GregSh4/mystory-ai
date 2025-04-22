import React from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

// App wrapper component to include PWA functionality
export default function AppWrapper({ children }) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    // This will only run on the client side
    setIsClient(true);
    
    // Register service worker
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
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
