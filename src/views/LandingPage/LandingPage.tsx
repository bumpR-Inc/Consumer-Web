import React, { useEffect } from "react";
import { Store } from "../../state/Store";
import DealCarousel from "./DealCarousel";
import AppFooter from "../../components/AppFooter";
import Process from "./Process";
import Hero from "./Hero";
import OrderCountdown from "../../components/OrderCountdown";

export default function LandingPage() {
  const { state } = React.useContext(Store);
  
  useEffect(() => {
    window.analytics.track('LANDING_PAGE_OPENED', {
      host: window.location.hostname,
      state: state
    });
  }, [state]);

  return (
  <div>
    <React.Fragment>
      <Hero/>
      <DealCarousel/> 
      <Process/> 
        {/* <Footer/>  */}
        <AppFooter invertColors={true} />
        <OrderCountdown/>
    </React.Fragment>
  </div>)
  ;
}
