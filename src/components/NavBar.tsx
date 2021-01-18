import { makeStyles } from "@material-ui/core/styles";
import { BorderBottom, BorderColor, GpsNotFixed } from "@material-ui/icons";
import React from "react";
import { theme } from "./Theme";
import { Store } from "../state/Store";

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
    fontFamily: 'Playfair Display',
    color: theme.palette.info.main,
    margin: '4%',
    fontSize: '4em',

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
    borderBottom: `solid 2px ${theme.palette.primary.main}`,

    [theme.breakpoints.down('md')]: {
      fontSize: '2em'
    }
  },
  detailsTo: {
    color: theme.palette.secondary.main,
    borderBottom: 'none'
  }
});

export default function NavBar() {
  var classes = useStyles();
  const { state, dispatch } = React.useContext(Store);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <h1 className={classes.logo}>{theme.breakpoints.values.sm >= window.innerWidth ? 'GN.' : 'Good Neighbor.'}</h1>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsWrap}>
            <h1 className={classes.details}>Monday, January 18</h1>
            <h1 className={`${classes.details} + ${classes.detailsTo}`}> to </h1>
            <h1 className={classes.details}>{state.address.split(',')[0]}</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
  ;
}
