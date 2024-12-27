// import { Container } from "postcss";
import { Container } from "./components/container/container";
import { QwikPartytown } from "./components/partytown/partytown";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
        <QwikPartytown forward={["gtag", "dataLayer.push"]} debug={true} />
      </head>
      <body>
        <Container />
      </body>
    </>
  );
};
