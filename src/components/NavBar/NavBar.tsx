import { makeStyles } from "@material-ui/core/styles";
import { BorderBottom, BorderColor, GpsNotFixed, Menu } from "@material-ui/icons";
import React, { useState, MouseEvent } from "react";
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import AddressModal from "./AddressModal";
import DateModal from "./DateModal";
import { fromMenu, toMobileUpdateAddressPage, toOrderHistory, updateAddress } from "../../state/Actions";
import { SwipeableDrawer } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const dateFormat = require("dateformat");

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '8vh',
    width: '100vw',
    backgroundColor: '#C9512B',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: '12vh'
    }
  },
  logoContainer: {
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '60%'
    }
  },
  logo: {
    cursor: 'pointer',
    fontFamily: 'Playfair',
    color: theme.palette.info.main,
    margin: '4%',
    fontSize: '4em',
    fontWeight: 'bold',

    [theme.breakpoints.down('md')]: {
      fontSize: '3em'
    }
  },
  detailsContainer: {
    width: '70%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.info.main,
    filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25))',
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '40%',
      justifyContent: 'center'
    }
  },
  detailsWrap: {
    margin: '4%',
  },
  details: {
    fontFamily: 'Playfair Display',
    color: theme.palette.primary.main,
    fontSize: '3em',
    display: 'inline',
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    borderBottom: `solid 2px ${theme.palette.primary.main}`,
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      fontSize: '2.7vw'
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '3.5vw'
    },

    '&:hover': {
      color: theme.palette.secondary.main,
      borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    }, 

    '&:focus': {
      outline: 'none',
    } 
  },
  detailsTo: {
    color: theme.palette.secondary.main,
    borderBottom: 'none',

    '&:hover': {
      color: theme.palette.secondary.main,
      borderBottom: `none`,
    }, 
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    // fontSize: '5em',
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  sideBar: {
    width: '20vw',
    minWidth: '250px',
    height: '100vh',
    backgroundColor: theme.palette.info.main,

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

export default function NavBar() {
  let classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [ addressAnchor, setAddressAnchor ] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleMenuButtonClick = () => {
    setDrawerOpen(true);
  }

  const handleAddressClick = (event: MouseEvent) => {
    window.analytics.track('ADDRESS_UPDATE_OPENED', {
      host: window.location.hostname,
      state: state,
      address: state.address,
      geocode: state.geocode,
    });
    if (window.innerWidth <= theme.breakpoints.values.md) {
      toMobileUpdateAddressPage(dispatch);
    } else {
      setAddressAnchor(event.currentTarget);
    }
  };


  const handleAddressClose = () => {
    window.analytics.track('ADDRESS_UPDATE_CLOSED', {
      host: window.location.hostname,
      state: state,
      address: state.address,
      geocode: state.geocode,
    });
    setAddressAnchor(null);
  };

  const [ dateAnchor, setDateAnchor ] = useState<any>(null);

  const handleDateClick = (event: MouseEvent) => {
    window.analytics.track('DATE_UPDATE_OPENED', {
      host: window.location.hostname,
      state: state,
      date: state.date
    });
    setDateAnchor(event.currentTarget);
  };
  const handleDateClose = () => {
    window.analytics.track('DATE_UPDATE_CLOSED', {
      host: window.location.hostname,
      state: state,
      date: state.date
    });
    setDateAnchor(null);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <button className={classes.menuButton} onClick={handleMenuButtonClick}><Menu/></button>
          <h1 className={classes.logo} onClick={() => {
            window.analytics.track('TO_LANDING_FROM_MENU', {
              host: window.location.hostname,
              state: state
            });
            fromMenu(dispatch)
          }}>{theme.breakpoints.values.sm >= window.innerWidth ? 'GN.' : 'Good Neighbor.'}</h1>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsWrap}>
            <h1 className={`${classes.details} + ${classes.detailsTo}`}> Lunch on </h1>
            <button onClick={handleDateClick} className={classes.details}>{dateFormat(state.date, "DDD, mmmm d")}</button>
            <h1 className={`${classes.details} + ${classes.detailsTo}`}> to </h1>
            <button onClick={handleAddressClick} className={classes.details}>{state.address?.split(',')[0]}</button>          </div>
        </div>
      </div>

      <AddressModal anchor={addressAnchor} handleClose={handleAddressClose}/>
      <DateModal anchor={dateAnchor} handleClose={handleDateClose} />
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
                <div className={classes.sideBarItem}>
                  <a className={classes.sideBarItemText} onClick={() => {
                    window.analytics.track('HAMBURGER_TO_ORDER_HISTORY', {
                      host: window.location.hostname,
                      state: state,
                      landing: state.landing
                    });
                    toOrderHistory(dispatch);
                  }}>Orders</a>
                </div>
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
  )
  ;
}
