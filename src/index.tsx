import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreProvider} from './state/Store'
import reportWebVitals from './reportWebVitals';
import HomePage from './views/HomePage';
import OrdersPage from './views/OrdersPage';
import {Router, RouteComponentProps} from '@reach/router'
import AuthAPITest from "./views/AuthTestPage";
import config from "./auth_config.json";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState: any) => {
  // history.push(
  //   appState && appState.returnTo
  //     ? appState.returnTo
  //     : window.location.pathname
  // );
};

const RouterPage = (props: {pageComponent: JSX.Element} & RouteComponentProps) => props.pageComponent//covered at 3:03
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    audience={config.audience}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <StoreProvider>
      <Router>
        <RouterPage pageComponent={<HomePage />} path="/" />
        <RouterPage pageComponent={<OrdersPage />} path="/orders" />
        <RouterPage pageComponent={<AuthAPITest />} path="/testauth" />
      </Router>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById("root")
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

