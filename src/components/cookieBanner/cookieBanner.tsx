// src/components/cookieBanner/cookieBanner.tsx

import { component$, useSignal, $, useOnWindow } from "@builder.io/qwik";
import { GoogleAnalytics } from "../googleAnalytics/googleAnalytics";
import "./cookieBanner.css";

interface CookieBannerProps {
  id?: string; // ID pour Google Analytics
  message?: string; // Texte principal de la bannière
  privacyPolicyLink?: string; // Lien vers la politique de confidentialité
  acceptLabel?: string; // Texte du bouton "Accepter"
  declineLabel?: string; // Texte du bouton "Refuser"
  modifyLabel?: string; // Texte du bouton pour modifier le consentement
  bannerClass?: string; // Classe CSS personnalisée pour la bannière
  buttonClass?: string; // Classe CSS personnalisée pour les boutons
  modifyButtonClass?: string; // Classe CSS personnalisée pour le bouton "Modifier"
  linkClass?: string; // Classe CSS personnalisée pour le lien
}

export const CookieBanner = component$((props: CookieBannerProps) => {
  const showBanner = useSignal(false);
  const consentGiven = useSignal(false);

  const setConsent = $((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Erreur lors de l'écriture dans localStorage", e);
    }
  });

  useOnWindow(
    "load",
    $(() => {
      if (typeof localStorage !== "undefined") {
        try {
          const consent = localStorage.getItem("cookie-consent");
          if (consent === "accepted") {
            consentGiven.value = true;
          } else if (!consent) {
            showBanner.value = true;
          }
        } catch (e) {
          console.error("Erreur lors de la lecture depuis localStorage", e);
        }
      }
    }),
  );

  const acceptCookies = $(() => {
    setConsent("cookie-consent", "accepted");
    showBanner.value = false;
    consentGiven.value = true;
  });

  const declineCookies = $(() => {
    setConsent("cookie-consent", "declined");
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
        <div class={`cookie-banner ${props.bannerClass || ""}`}>
          <p>
            {props.message ||
              "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre "}
            <a
              href={props.privacyPolicyLink || "/privacy-policy"}
              class={`${props.linkClass || ""}`}
              aria-label="Politique de confidentialité"
            >
              politique de confidentialité
            </a>
            .
          </p>
          <button
            class={`accept-button ${props.buttonClass || ""}`}
            onClick$={acceptCookies}
            aria-label="Accepter les cookies"
          >
            {props.acceptLabel || "Accepter"}
          </button>
          <button
            class={`decline-button ${props.buttonClass || ""}`}
            onClick$={declineCookies}
            aria-label="Refuser les cookies"
          >
            {props.declineLabel || "Refuser"}
          </button>
        </div>
      ) : (
        <button
          class={`modify-consent-button ${props.modifyButtonClass || ""}`}
          onClick$={modifyConsent}
          aria-label="Modifier le consentement des cookies"
        >
          {props.modifyLabel || "Modifier les cookies"}
        </button>
      )}
    </>
  );
});
