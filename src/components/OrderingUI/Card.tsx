import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "../../index.css";
import addImg from "../../assets/img/ui/add.png";
import MealPropertyTag from "./MealPropertyTag";
import { Store } from "../../state/Store";
import { theme } from "../Theme";

const useStyles = makeStyles({
  root: {
    width: '40vw',
    maxWidth: '300px'
  },
  media: {
    height: 188,
    [theme.breakpoints.down('sm')]: {
      height: 135
    }
  },
  cardContent: {
    height: 100,
    // backgroundColor: "#FFFBF5",

    [theme.breakpoints.down('sm')]: {
      height: 170
    }
  },
  cardTitle: {
    fontSize: '2.5em',
    fontFamily: 'Playfair',
    color: '#c9512b',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em'
    },
  },
  cardTextContainer: {
    // maxHeight: '38px',
    // overflowY: 'scroll',
  },
  cartText: {
    fontSize: '1.5em',
    fontFamily: "Playfair",
    color: '#272727',
    letterSpacing: '.02em',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em'
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.17em'
    }
  },
  cardBottomFlexContainer: {
    display: 'flex',
    direction: 'rtl',
    alignItems: 'center'
  },
  cardAddButton: {
    height: '40px'
  }, 
  cardPrice: {
    fontSize: '18px',
    fontFamily: 'Playfair',
    color: '#c9512b'
  }
});

export default function MediaCard(props: any) {
  const classes = useStyles();
  const MAX_SUMMARY_LENGTH = 120;
  const { state } = React.useContext(Store);

  var limitedSummary = props.menuItem.description;

  return (
    <Card className={classes.root}>
      <div>
        <CardMedia
          className={classes.media}
          image={props.menuItem.picture_url}
          title={props.menuItem.name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.cardTitle}>{props.menuItem.foodName}</div>
          <div className={classes.cardTextContainer}>
            <div className={classes.cartText}>{limitedSummary}</div>
          </div>
        </CardContent>
      </div>
      <div className={classes.cardBottomFlexContainer}>
        <Button onClick={() => {
          window.analytics.track('ADDED_TO_CART_FROM_MENU', {
            host: window.location.hostname,
            state: state,
            menuItem: props.menuItem,
            cart: state.orders
          });
          props.addOnClick();
        }}>
          <img src={addImg} className={classes.cardAddButton} />
        </Button>
        <div>
          <p className={classes.cardPrice}>${props.menuItem.price}</p>

        </div>
        {props.menuItem.dietaryRestrictions == "Vegetarian" ? <MealPropertyTag text={"Veg"}/> : <p></p>}
      </div>
    </Card>
  );
}
