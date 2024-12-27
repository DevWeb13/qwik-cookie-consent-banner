import { CookieBanner } from "./components/cookieBanner/cookieBanner";
import { QwikPartytown } from "./components/partytown/partytown";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
        <QwikPartytown forward={['gtag','dataLayer.push']}
        debug={true}
        />
      </head>
      <body>
        <CookieBanner
          id="G-XXXXXXXXXX"
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
      </body>
    </>
  );
};
