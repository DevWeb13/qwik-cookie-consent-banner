// src/components/cookieBanner/cookieBanner.tsx

import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { GoogleAnalytics } from "../googleAnalytics/googleAnalytics";

interface CookieBannerProps {
  id?: string; // ID pour Google Analytics
  message?: string; // Texte principal de la bannière
  privacyPolicyLink?: string; // Lien vers la politique de confidentialité
  acceptLabel?: string; // Texte du bouton "Accepter"
  declineLabel?: string; // Texte du bouton "Refuser"
  modifyLabel?: string; // Texte du bouton pour modifier le consentement
  bannerClass?: string; // Classes Tailwind pour la bannière
  buttonClass?: string; // Classes Tailwind pour les boutons "Accepter" et "Refuser"
  modifyButtonClass?: string; // Classes Tailwind pour le bouton "Modifier"
  linkClass?: string; // Classes Tailwind pour le lien vers la politique de confidentialité
}

export const CookieBanner = component$((props: CookieBannerProps) => {
  const showBanner = useSignal(false);
  const consentGiven = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      consentGiven.value = true;
    } else if (!consent) {
      showBanner.value = true;
    }
  });

  const acceptCookies = $(() => {
    localStorage.setItem("cookie-consent", "accepted");
    showBanner.value = false;
    consentGiven.value = true;
  });

  const declineCookies = $(() => {
    localStorage.setItem("cookie-consent", "declined");
    showBanner.value = false;
    consentGiven.value = false;
  });

  const modifyConsent = $(() => {
    showBanner.value = true;
  });

  return (
    <>
      {consentGiven.value && props.id && <GoogleAnalytics id={props.id} />}
      {showBanner.value ? (
        <div
          class={`fixed bottom-0 left-0 right-0 p-4 text-center ${
            props.bannerClass || "bg-gray-800 text-white"
          }`}
        >
          <p class="mb-4">
            {props.message ||
              "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre "}
            <a
              href={props.privacyPolicyLink || "/privacy-policy"}
              class={props.linkClass || "text-blue-400 underline"}
            >
              politique de confidentialité
            </a>
            .
          </p>
          <button
            class={`mx-2 rounded px-4 py-2 ${
              props.buttonClass || "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick$={acceptCookies}
          >
            {props.acceptLabel || "Accepter"}
          </button>
          <button
            class={`mx-2 rounded px-4 py-2 ${
              props.buttonClass || "bg-red-500 text-white hover:bg-red-600"
            }`}
            onClick$={declineCookies}
          >
            {props.declineLabel || "Refuser"}
          </button>
        </div>
      ) : (
        <button
          class={`fixed bottom-4 right-4 rounded px-4 py-2 ${
            props.modifyButtonClass ||
            "bg-gray-700 text-white hover:bg-gray-800"
          }`}
          onClick$={modifyConsent}
        >
          {props.modifyLabel || "Modifier les cookies"}
        </button>
      )}
    </>
  );
});
