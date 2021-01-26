import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import background from "../../../assets/img/landing-background.jpg";
import { theme } from "../../../components/Theme";
import { goToMenu } from "../../../state/Actions";
import { Store } from "../../../state/Store";
import NavBar from "./NavBar";
import AddressSelect from "./AddressSelect";

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
  },

  navContainer: {
    flexGrow: 0
  },
  addressContainer: {
    flexGrow: 4
  }, 
  bufferContainer: {
    flexGrow: 1,
    width: '100%',
  }
});

export default function Hero() {
  const { state, dispatch } = React.useContext(Store);
  var classes = useStyles();
  
  const addressOnConfirm = (address: string, geocode: any) => {
    goToMenu(dispatch, address, geocode);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.hero}>
          <div className={classes.navContainer}>
            <NavBar/>
          </div>
          <div className={classes.addressContainer}>
            <AddressSelect landing={true} onConfirm={addressOnConfirm} />
          </div>
          <div className={classes.bufferContainer}>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
