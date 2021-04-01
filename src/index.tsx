import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import { StoreProvider } from "./state/Store";
import HttpsRedirect from './HttpsRedirect';

declare global {
  interface Window { analytics: any; }
}

const onRedirectCallback = (appState: any) => {
  // const path: string = window.location.origin.split('/?')[0] + "/";
  // console.log(path)
  // history.push(path);
  // );
  console.log('redirect app state');
  console.log(appState);

  window.history.replaceState({}, document.title, window.location.pathname);
  // window.location.assign('/',)
};

// const RouterPage = (
//   props: { pageComponent: JSX.Element } & RouteComponentProps
// ) => props.pageComponent;
ReactDOM.render(
  <HttpsRedirect>
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
    </Auth0Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();