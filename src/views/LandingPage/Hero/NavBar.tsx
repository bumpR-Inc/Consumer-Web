import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { theme } from "../../../components/Theme";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles({
  navContainer: {
    width: '95vw',
    // flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  navBuffer: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flex: 0,
    },
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
    fontFamily: 'Playfair Display',
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
      textAlign: 'left',
    },
  },
  signInContainer: {
    zIndex: 1,
    width: '100%',
    top: 0,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
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


export default function Navbar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className={classes.navContainer}>
      <div className={classes.navBuffer}></div>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Good Neighbor.</h1>
      </div>
        <div className={classes.signInContainer}>
          {(window.innerWidth >= theme.breakpoints.values.sm)
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
          }
      </div>
    </div>
  )
}