// src/components/modifyButton/modifyButton.jsx

import { component$, useStyles$, $, Signal } from "@builder.io/qwik";

import styles from "./modifyButton.css?inline";

interface ModifyButtonProps {
  modifyButtonClass?: string; // Classe CSS personnalisée pour le bouton "Modifier"
  modifyLabel?: string; // Texte du bouton "Modifier"
  showBanner: Signal<boolean>; // Signal pour afficher la bannière
}

export const ModifyButton = component$((props: ModifyButtonProps) => {
  useStyles$(styles);

  const modifyConsent = $(() => {
    props.showBanner.value = true;
  });

  return (
    <button
      class={`${props.modifyButtonClass || "modify-consent-button"}`}
      onClick$={modifyConsent}
      aria-label="Modifier le consentement des cookies"
    >
      {props.modifyLabel || "Modifier les cookies"}
    </button>
  );
});
