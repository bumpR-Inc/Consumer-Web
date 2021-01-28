import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import backgroundPreload from "../../assets/img/landing-background-preload.jpg";
import background from "../../assets/img/landing-background.jpg";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import AddressSelect from "../../components/Input/AddressSelect";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuth0 } from "@auth0/auth0-react";

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
    flexGrow: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  bufferContainer: {
    flexGrow: 1,
    width: '100%',
  },
  navSubContainer: {
    width: '95vw',
    // flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  navBuffer: {
    // flex: 1,
    // [theme.breakpoints.down('sm')]: {
    //   flex: 0,
    // },
  },
  titleContainer: {
    width: '100%',
    // paddingLeft: '2%',
    flex: 2,
    [theme.breakpoints.down('sm')]: {
      flex: 4,
      paddingTop: '2%'
    },
  },
  title: {
    fontFamily: 'Playfair-Bold',
    margin: '0px !important',
    textAlign: 'center',
    // fontSize: '5em',
    color: theme.palette.info.main,
    
    [theme.breakpoints.up('xs')]: {
      fontSize: '11vw',
    },
    
    [theme.breakpoints.up('sm')]: {
      fontSize: '5.5em',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '7em',
    },

    [theme.breakpoints.down('sm')]: {
      // textAlign: 'left',
    },
  },
  signInContainer: {
    // zIndex: 1,
    // width: '100%',
    // top: 0,
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'flex-end',
    // [theme.breakpoints.down('sm')]: {
    //   alignItems: 'center',
    // },
  },
  signIn: {
    fontFamily: 'Playfair Display',
    textAlign: 'right',
    fontSize: '3em',
    color: theme.palette.info.main,
    margin: '6%',
    "&:hover": {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  menuIcon: {
    color: theme.palette.info.main,
    fontSize: '3em',
  },
});

export default function Hero() {
  const { state, dispatch } = React.useContext(Store);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  var classes = useStyles();
  
  const addressOnConfirm = (address: string, geocode: any) => {
    goToMenu(dispatch, address, geocode);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.hero}>
          <div className={classes.navContainer}>
            <div className={classes.navSubContainer}>
              <div className={classes.navBuffer}></div>
              <div className={classes.titleContainer}>
                <h1 className={classes.title}>Good Neighbor.</h1>
              </div>
                <div className={classes.signInContainer}>
                  {/* {(window.innerWidth >= theme.breakpoints.values.sm)
                    ? (
                      !isAuthenticated ?
                      (
                        <h1
                          className={classes.signIn}
                          onClick={() => loginWithRedirect()}
                        >
                          Sign In.
                        </h1>
                      )
                      : (
                        <h1
                          className={classes.signIn}
                          onClick={() => logout({returnTo: window.location.origin})}
                        >
                          Logout.
                        </h1>
                      )
                    ) :
                    (
                      <Menu className={classes.menuIcon}></Menu>
                    )
                  } */}
              </div>
            </div>
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
