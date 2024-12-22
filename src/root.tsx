import { CookieBanner } from "./components/cookieBanner/cookieBanner";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <CookieBanner
          id="UA-XXXXXX-X"
          message="Nous utilisons des cookies pour personnaliser votre expérience."
          privacyPolicyLink="/privacy"
          acceptLabel="Accepter"
          declineLabel="Refuser"
          modifyLabel="Changer mes choix"
          bannerClass="bg-green-500 text-white"
          buttonClass="bg-yellow-500 text-black hover:bg-yellow-600"
          modifyButtonClass="bg-purple-500 text-white hover:bg-purple-600"
          linkClass="underline text-yellow-400"
        />
      </body>
    </>
  );
};
