import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import history from "./utils/history";
import { Router, RouteComponentProps } from "@reach/router";
import { StoreProvider } from "./state/Store";
import HomePage from "./views/MenuPage";
import LandingPage from "./views/LandingPage/LandingPage";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    audience={config.audience}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <StoreProvider>
      <App/>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();