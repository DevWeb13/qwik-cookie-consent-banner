import { component$, useSignal } from "@builder.io/qwik";
import { CookieBanner } from "../cookieBanner/cookieBanner";
import { ModifyButton } from "../modifyButton/modifyButton";

export const Container = component$(() => {
  const showBanner = useSignal(false);

  return (
    <div>
      <CookieBanner
        id="G-XXXXXXXXXX"
        showBanner={showBanner}
        // message="Nous utilisons des cookies pour personnaliser votre expérience."
        privacyPolicyLink="/privacy"
        acceptLabel="Accept"
        declineLabel="Denied"
        modifyLabel="Modify"
        // bannerClass="bg-green-500 text-white"
        // buttonClass="bg-yellow-500 text-black hover:bg-yellow-600"
        // modifyButtonClass="bg-purple-500 text-white hover:bg-purple-600"
        // linkClass="underline text-yellow-400"
      />
      {!showBanner.value && <ModifyButton showBanner={showBanner} />}
    </div>
  );
});
