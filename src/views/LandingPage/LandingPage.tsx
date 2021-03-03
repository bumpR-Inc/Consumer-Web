import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import DealCarousel from "./DealCarousel";
import Footer from "./Footer";
import AppFooter from "../../components/AppFooter";
import Process from "./Process";
import Hero from "./Hero";
import { Fade, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Schedule } from "@material-ui/icons";
import Countdown, { zeroPad } from 'react-countdown';
import OrderCountdown from "../../components/OrderCountdown";
// import AppFooter from "../../components/AppFooter";

const useStyles = makeStyles({
  
});

export default function LandingPage() {
  const { state, dispatch } = React.useContext(Store);
  var classes = useStyles();
  
  const addressOnConfirm = (address: string, geocode: any) => {
    goToMenu(dispatch, address, geocode);
  }

  
  useEffect(() => {
    window.analytics.track('LANDING_PAGE_OPENED', {
      host: window.location.hostname,
      state: state
    });
  }, []);

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
