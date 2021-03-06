import React, { useContext } from "react";
import { IMenuItem, IRestaurant } from "../../state/interfaces";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../../state/Store";
import { theme } from "../Theme";

const useStyles = makeStyles({
  container: {
    minWidth: '150px',
    width: '30%',
    height: '30vh',
    maxHeight: '40vw',
    marginTop: '3%',
    marginBottom: '3%',
    // backgroundColor: 'red',
    borderRadius: '10px',
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',

    '&:hover': {
      boxShadow: 'none',
    }
  },
  title: {
    // backgroundColor: theme.palette.primary.main,
    padding: '1%',
    // fontWeight: 'bolder',
    fontFamily: 'Rustico',
    letterSpacing: '1.5px',
    fontSize: '4em',
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em'
    }
  }
});

interface IRestaurantCard {
  restaurant: IRestaurant,
}

export default function RestaurantCard({restaurant}: IRestaurantCard) {
    var classes = useStyles();
    const { state } = useContext(Store);

  return (
    <div onClick={() => {

    }}
      className={classes.container} style={{
      backgroundImage:
        `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${restaurant.picture_url})`
    }}>
        <h1 className={classes.title}>{restaurant.name.toUpperCase()}</h1>
      </div>
    );
}
