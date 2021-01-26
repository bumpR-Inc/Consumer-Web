import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import backgroundPreload from "../../../assets/img/landing-background-preload.jpg";
import background from "../../../assets/img/landing-background.jpg";
import { theme } from "../../../components/Theme";
import { goToMenu } from "../../../state/Actions";
import { Store } from "../../../state/Store";
import NavBar from "./NavBar";
import AddressSelect from "./AddressSelect";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles({
  container: {
    display: "flex",
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: "100vh",
    width: "100vw",
  },
  hero: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    // backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    margin: "0px !important",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3%",
    zIndex: 1,

    filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
  },
  heroBackground: {
    zIndex: -1,
    position: 'absolute',
    height: "100%",
    width: "100%",
    objectFit: 'cover',
    objectPosition: '18% 0%',
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
        <LazyLoadImage src={background} alt={backgroundPreload} className={classes.heroBackground}/>
      </div>
    </React.Fragment>
  );
}
