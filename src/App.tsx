import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
// import initFontAwes,ome from "./utils/initFontAwesome";
import HomePage from "./views/HomePage";
import LandingPage from "./views/LandingPage/LandingPage";
import OrdersPage from "./views/OrdersPage";
import PrivacyPolicy from "./views/PrivacyPolicy";

// initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    // <Home/>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/landing" exact component={LandingPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/privacy" component={PrivacyPolicy} />
      </Switch>
    </Router>
  );
};

export default App;
