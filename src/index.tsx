import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreProvider} from './Store'
import reportWebVitals from './reportWebVitals';
import HomePage from './HomePage';
import OrdersPage from './OrdersPage';
import {Router, RouteComponentProps} from '@reach/router'

const RouterPage = (props: {pageComponent: JSX.Element} & RouteComponentProps) => props.pageComponent//covered at 3:03
ReactDOM.render(
  <StoreProvider>
    <Router>
      <App path="/">
        <RouterPage pageComponent={<HomePage />} path="/" />
        <RouterPage pageComponent={<OrdersPage />} path="/orders" />
      </App>
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

