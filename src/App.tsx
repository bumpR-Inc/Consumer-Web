import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import "./App.css";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage/LandingPage";
import OrdersPage from "./views/Ordering/OrdersPage";
import PrivacyPolicy from "./views/Misc/PrivacyPolicy";
import AddressUpdate from "./views/Ordering/AddressUpdate";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    // <Home/>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/landing" exact component={LandingPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/address" component={AddressUpdate} />
      </Switch>
    </Router>
  );
};

export default App;
