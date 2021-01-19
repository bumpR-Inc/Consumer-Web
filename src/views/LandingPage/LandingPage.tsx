import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import background from "../../assets/img/landing-background.jpg";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import AddressSelect from "./AddressSelect";
import DealCarousel from "./DealCarousel";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Process from "./Process";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  hero: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    margin: "0px !important",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3%",

    filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",

    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
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
      <div className={classes.container}>
        <div className={classes.hero}>
          <NavBar/>
            <AddressSelect landing={true} onConfirm={addressOnConfirm}/>
        </div>
      </div>
      <DealCarousel/> 
      <Process/> 
      <Footer/> 
    </React.Fragment>
  </div>)
  ;
}
