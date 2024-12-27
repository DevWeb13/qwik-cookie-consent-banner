// src/components/cookieBanner/cookieBanner.tsx

import {
  component$,
  useSignal,
  $,
  useOnWindow,
  useStyles$,
  Signal,
} from "@builder.io/qwik";
import {
  initializeGoogleAnalytics,
  removeGoogleAnalytics,
} from "../../utils/googleAnalytics";
import styles from "./cookieBanner.css?inline";

interface CookieBannerProps {
  id?: string; // ID pour Google Analytics
  showBanner: Signal<boolean>; // Signal pour afficher la bannière
  message?: string; // Texte principal de la bannière
  privacyPolicyLink?: string; // Lien vers la politique de confidentialité
  acceptLabel?: string; // Texte du bouton "Accepter"
  declineLabel?: string; // Texte du bouton "Refuser"
  modifyLabel?: string; // Texte du bouton pour modifier le consentement
  bannerClass?: string; // Classe CSS personnalisée pour la bannière
  buttonClass?: string; // Classe CSS personnalisée pour les boutons

  linkClass?: string; // Classe CSS personnalisée pour le lien
}

export const CookieBanner = component$((props: CookieBannerProps) => {
  useStyles$(styles);

  const consentGiven = useSignal(false);

  const setConsent = $((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Erreur lors de l'écriture dans localStorage", e);
    }
  });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      if (typeof localStorage !== "undefined") {
        try {
          const consent = localStorage.getItem("cookie-consent");
          if (consent === "accepted") {
            consentGiven.value = true;
            if (props.id) {
              initializeGoogleAnalytics(props.id);
            }
          } else if (!consent) {
            props.showBanner.value = true;
          }
        } catch (e) {
          console.error("Erreur lors de la lecture depuis localStorage", e);
        }
      }
    }),
  );

  const acceptCookies = $(() => {
    setConsent("cookie-consent", "accepted");
    props.showBanner.value = false;
    consentGiven.value = true;
    if (props.id) {
      initializeGoogleAnalytics(props.id);
    }
  });

  const declineCookies = $(() => {
    setConsent("cookie-consent", "declined");
    props.showBanner.value = false;
    consentGiven.value = false;
    removeGoogleAnalytics();
  });

  return (
    <>
      {props.showBanner.value && (
        <div class={`${props.bannerClass || "cookie-banner"}`}>
          <p>
            {props.message ||
              "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre "}
            <a
              href={props.privacyPolicyLink || "/privacy-policy"}
              class={`${props.linkClass || "link-class"}`}
              aria-label="Politique de confidentialité"
            >
              politique de confidentialité
            </a>
            .
          </p>
          <button
            class={`${props.buttonClass || "accept-button"}`}
            onClick$={acceptCookies}
            aria-label="Accepter les cookies"
          >
            {props.acceptLabel || "Accepter"}
          </button>
          <button
            class={`${props.buttonClass || "decline-button"}`}
            onClick$={declineCookies}
            aria-label="Refuser les cookies"
          >
            {props.declineLabel || "Refuser"}
          </button>
        </div>
      )}
    </>
  );
});
