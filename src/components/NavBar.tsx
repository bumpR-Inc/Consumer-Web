import { makeStyles } from "@material-ui/core/styles";
import { BorderBottom, BorderColor, GpsNotFixed } from "@material-ui/icons";
import React, { useState, MouseEvent } from "react";
import { theme } from "./Theme";
import { Store } from "../state/Store";
import AddressModal from "./AddressModal";

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
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    borderBottom: `solid 2px ${theme.palette.primary.main}`,

    [theme.breakpoints.down('md')]: {
      fontSize: '2em'
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
    borderBottom: 'none'
  }
});

export default function NavBar() {
  let classes = useStyles();
  const { state, dispatch } = React.useContext(Store);

  const [ addressAnchor, setAddressAnchor ] = useState<any>(null);

  const handleAddressClick = (event: MouseEvent) => {
    setAddressAnchor(event.currentTarget);
  };
  const handleAddressClose = () => setAddressAnchor(null);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <h1 className={classes.logo}>{theme.breakpoints.values.sm >= window.innerWidth ? 'GN.' : 'Good Neighbor.'}</h1>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsWrap}>
            <button className={classes.details}>Monday, January 18</button>
            <h1 className={`${classes.details} + ${classes.detailsTo}`}> to </h1>
            <button onClick={handleAddressClick} className={classes.details}>{state.address.split(',')[0]}</button>          </div>
        </div>
      </div>

      <AddressModal anchor={addressAnchor} handleClose={handleAddressClose}/>
    </React.Fragment>
  )
  ;
}
