import React, { RefObject, useContext } from "react";
import { IMenuItem, IRestaurant } from "../../state/interfaces";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../../state/Store";
import { theme } from "../Theme";

const useStyles = makeStyles({
  container: {
    minWidth: '150px',
    width: '45%',
    maxWidth: '375px',
    height: '30vh',
    maxHeight: '40vw',
    margin: '1vw',
    // marginLeft: '0.25%',
    // marginRight: '0.25%',
    // backgroundColor: 'red',
    borderRadius: '10px',
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',

    '&:hover': {
      boxShadow: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      margin: '1.2vw',
      minWidth: '125px',

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
  refs: Array<RefObject<HTMLElement>>,
  index: number,
}

export default function RestaurantCard({restaurant, refs, index}: IRestaurantCard) {
  var classes = useStyles();
  const { state } = useContext(Store);

  return (
    <div onClick={() => {
      refs[index]?.current?.scrollIntoView();
    }}
      className={classes.container} style={{
      backgroundImage:
        `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${restaurant.picture_url})`
    }}>
        <h1 className={classes.title}>{restaurant.name.toUpperCase()}</h1>
      </div>
    );
}
