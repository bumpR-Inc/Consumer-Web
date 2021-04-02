import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { fetchGroupAPI } from "./state/api/GroupAPI";
import { groupState } from "./state/Atoms";
import history from "./utils/history";
import HomePage from "./views/HomePage";
import PrivacyPolicy from "./views/Misc/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";

// initFontAwesome();

const App = () => {
  const { user, isAuthenticated, error, getAccessTokenSilently } = useAuth0();
  const [_, setGroupState] = useRecoilState(groupState);

  if (isAuthenticated) {
    window.analytics.identify(user.sub, {
      name: user.name,
      email: user.email,
    });
  }

  useEffect(() => {
    (async () => {
      const data: any = await fetchGroupAPI(await getAccessTokenSilently());
      setGroupState(data);
    })();
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  } else {
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
  }
};

export default App;
