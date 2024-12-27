// src/utils/googleAnalytics.ts

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Injecte dynamiquement Google Analytics après consentement.
 * @param id - L'ID de suivi Google Analytics.
 */
export function initializeGoogleAnalytics(id: string) {
  if (!id) {
    console.error("Google Analytics ID is missing.");
    return;
  }

  // Vérifie si le script est déjà injecté
  const existingScript = document.querySelector(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${id}"]`
  );

  if (existingScript) {
    console.warn("Google Analytics script already injected.");
    return;
  }

  // Initialise `window.dataLayer`
  window.dataLayer = window.dataLayer || [];
  console.log("Initialized window.dataLayer:", window.dataLayer);

  // Injecte le script Google Analytics
  const script = document.createElement("script");
  script.type = "text/partytown"; // Utilise Partytown
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;

  console.log("Injecting Google Analytics script via Partytown.");
  document.head.appendChild(script);

  // Notifie Partytown de l'ajout du script
  console.log("Dispatching ptupdate event for Partytown.");
  window.dispatchEvent(new CustomEvent("ptupdate"));

  // Configure Google Analytics
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };
  console.log("Setting up Google Analytics tracking.");
  window.gtag("js", new Date());
  window.gtag("config", id);
}

/**
 * Supprime dynamiquement Google Analytics après retrait du consentement.
 */
/** 
 * Safely removes Google Analytics properties and scripts after user revokes consent. 
 */
export function removeGoogleAnalytics() {
  // Remove the Google Analytics scripts
  const gaScripts = document.querySelectorAll(
    'script[src^="https://www.googletagmanager.com/gtag/js"]'
  );

  if (gaScripts.length > 0) {
    gaScripts.forEach((script) => {
      console.log("Removing Google Analytics script:", script);
      script.remove();
    });
  } else {
    console.warn("No Google Analytics script found to remove.");
  }

  // Clear and safely delete gtag
  if (typeof window.gtag === "function") {
    console.log("Removing gtag function.");
    (window as any).gtag = undefined; // Using `undefined` instead of delete
  }

  // Clear dataLayer
  if (window.dataLayer) {
    console.log("Clearing dataLayer array.");
    window.dataLayer.length = 0; // Reset the array
  }

  // Notify Partytown
  console.log("Dispatching ptupdate event to notify Partytown.");
  window.dispatchEvent(new CustomEvent("ptupdate"));

  console.log("Google Analytics has been removed.");
}
