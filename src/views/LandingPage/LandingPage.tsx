import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import DealCarousel from "./DealCarousel";
import Footer from "./Footer";
import AppFooter from "../../components/AppFooter";
import Process from "./Process";
import Hero from "./Hero";
// import AppFooter from "../../components/AppFooter";

const useStyles = makeStyles({
  
});

export default function LandingPage() {
  const { state, dispatch } = React.useContext(Store);
  var classes = useStyles();
  
  const addressOnConfirm = (address: string, geocode: any) => {
    goToMenu(dispatch, address, geocode);
  }

  return (
  <div>
    <React.Fragment>
      <Hero/>
      <DealCarousel/> 
      <Process/> 
        {/* <Footer/>  */}
      <AppFooter invertColors={true}/>
    </React.Fragment>
  </div>)
  ;
}
