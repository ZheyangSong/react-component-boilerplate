import "./index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./app";

const rootContainerId = "example";

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById(rootContainerId)
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default;

    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById(rootContainerId)
    );
  });
}
