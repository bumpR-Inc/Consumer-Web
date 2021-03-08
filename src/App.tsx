import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import "./App.css";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage/LandingPage";
import PrivacyPolicy from "./views/Misc/PrivacyPolicy";
// import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";

// initFontAwesome();

const App = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();  
  if (isAuthenticated) {
    window.analytics.identify(user.sub, {
      name: user.name,
      email: user.email,
    });
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    // <Home/>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/landing" exact component={LandingPage} /> */}
        {/* <Route path="/orders" component={OrdersPage} /> */}
        {/* <Route path="/orders" component={OrderHistory} /> */}
        <Route path="/privacy" component={PrivacyPolicy} />
        {/* <Route path="/address" component={AddressUpdate} /> */}
        <Route path="/terms" component={TermsOfService} />
      </Switch>
    </Router>
  );
};

export default App;
