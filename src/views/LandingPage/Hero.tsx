import { makeStyles } from "@material-ui/core/styles";
import React, { useState, MouseEvent } from "react";
import backgroundPreload from "../../assets/img/landing/background/landing-background-preload.jpg";
import background from "../../assets/img/landing/background/landing-background.jpg";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import AddressSelect from "../../components/Input/AddressSelect";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "@material-ui/icons";
import { SwipeableDrawer } from "@material-ui/core";

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
    // paddingTop: '10%',
    // paddingBottom: '10%',
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

    // filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
  },
  heroBackground: {
    zIndex: -1,
    position: 'absolute',
    height: "100%",
    width: "100%",
    objectFit: 'cover',
    objectPosition: '18% 0%',
    filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
  },
  navContainer: {
    flexGrow: 0,
    // backgroundColor: 'red',
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
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'blue',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      // flex: 0,
    },
  },
  titleContainer: {
    // display: 'flex',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    width: '100%',
    // paddingLeft: '2%',
    flex: 2,
    [theme.breakpoints.down('sm')]: {
      flex: 6,
      paddingTop: '2%'
    },
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    margin: '0px !important',
    textAlign: 'center',
    // fontSize: '5em',
    color: theme.palette.secondary.main,
    
    [theme.breakpoints.up('xs')]: {
      fontSize: '8.5vw',
    },
    
    [theme.breakpoints.up('sm')]: {
      fontSize: '5.5em',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '7em',
    },

    [theme.breakpoints.down('sm')]: {
      textAlign: 'left'
    },
  },
  signInContainer: {
    // backgroundColor: 'green',
    // zIndex: 1,
    // width: '100%',
    // top: 0,
    flex: 1,
    // display: 'flex',
    // justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      // alignItems: 'center',
      flex: 0
    },
  },
  signIn: {
    fontFamily: 'Playfair Display',
    textAlign: 'right',
    fontSize: '3em',
    color: theme.palette.secondary.main,
    margin: '6%',
    "&:hover": {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  menuIcon: {
    color: theme.palette.secondary.main,
    fontSize: '3em',
    [theme.breakpoints.up('xs')]: {
      fontSize: '8.5vw',
    },
    
    [theme.breakpoints.up('sm')]: {
      fontSize: '3em',
    },

    // [theme.breakpoints.up('lg')]: {
    //   fontSize: '7em',
    // },
  },
  menuButton: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    // fontSize: '5em',
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }
  },
  sideBar: {
    width: '20vw',
    minWidth: '250px',
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,

    display: 'flex',
    flexDirection: 'column',
    gap: '2%',
  },
  sideBarItem: {
    padding: '5%',
  },
  sideBarItemText: {
    fontSize: '3em',
    fontFamily: 'Playfair',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default function Hero() {
  const { state, dispatch } = React.useContext(Store);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  var classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleMenuButtonClick = () => {
    window.analytics.track('HAMBURGER_MENU_BUTTON_CLICKED', {
      host: window.location.hostname,
      state: state,
      to_address_select: !state.geocode,
      landing: true
    });
    setDrawerOpen(true);
  }
  
  const addressOnConfirm = (address: string, geocode: any) => {
    window.analytics.track('CONFIRM_ADDRESS_FROM_LANDING', {
      host: window.location.hostname,
      state: state,
      address: address,
      geocode: geocode,
    });
    goToMenu(dispatch, address, geocode);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.hero}>
          <div className={classes.navContainer}>
            <div className={classes.navSubContainer}>
              <div className={classes.navBuffer}>
                <button className={classes.menuButton} onClick={handleMenuButtonClick}><Menu className={classes.menuIcon}/></button>
              </div>
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
                    // (
                    //   <Menu className={classes.menuIcon}></Menu>
                    // )
                  } */}
              </div>
            </div>
          </div>
          <div className={classes.addressContainer}>
            <AddressSelect landing={true} miniButton={false} onConfirm={addressOnConfirm} onSkipAddresPickerConfirm={() => {addressOnConfirm(state.address, state.geocode)}}/>
          </div>
          <div className={classes.bufferContainer}>

          </div>
        </div>
        <LazyLoadImage src={background} alt={backgroundPreload} className={classes.heroBackground}/>
      </div>
      {
        drawerOpen && <SwipeableDrawer
          anchor={'left'}
          open={drawerOpen}
          onClose={() => {setDrawerOpen(false)}}
          onOpen={() => {setDrawerOpen(true)}}
        >
          <div className={classes.sideBar}>
            {isAuthenticated ? 
              (<>
                {/* <div className={classes.sideBarItem}>
                  <a className={classes.sideBarItemText} href="/orders">Orders</a>
                </div> */}
                <div className={classes.sideBarItem}>
                  <a className={classes.sideBarItemText} onClick={() => {
                    window.analytics.track('HAMBURGER_MENU_LOG_OUT', {
                      host: window.location.hostname,
                      state: state,
                      landing: state.landing
                    });
                    logout({ returnTo: window.location.origin });
                  }}>Log Out</a>
                </div>
              </>) :
              (<>
                <div className={classes.sideBarItem}>
                  <a className={classes.sideBarItemText} onClick={() => {
                    window.analytics.track('HAMBURGER_MENU_LOG_IN', {
                      host: window.location.hostname,
                      state: state,
                      landing: state.landing
                    });
                    loginWithRedirect();
                  }}>Sign In</a>
                </div>
              </>)
            }
          </div>
        </SwipeableDrawer>
      }
    </React.Fragment>
  );
}
