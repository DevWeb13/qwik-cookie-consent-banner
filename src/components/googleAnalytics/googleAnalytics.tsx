// src/components/googleAnalytics/googleAnalytics.tsx

import { component$, useOnWindow, $ } from '@builder.io/qwik';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  id: string; // ID de suivi Google Analytics
}

export const GoogleAnalytics = component$(({ id }: GoogleAnalyticsProps) => {
  useOnWindow(
    'load',
    $(() => {
      if (!id) {
        console.error('Google Analytics ID is missing.');
        return;
      }

      // Vérifie si le script est déjà injecté
      if (
        !document.querySelector(
          `script[src="https://www.googletagmanager.com/gtag/js?id=${id}"]`
        )
      ) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(...args);
          }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', id);
        };

        script.onerror = () => {
          console.error('Failed to load Google Analytics script.');
        };
      }
    })
  );

  return null; // Ce composant ne rend rien visuellement
});
