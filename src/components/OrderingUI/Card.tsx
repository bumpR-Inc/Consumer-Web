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

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 330,
  },
  media: {
    height: 188,
  },
  cardContent: {
    height: 45,
    // backgroundColor: "#FFFBF5",
  },
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
          <div className="cardTitle">{props.menuItem.foodName}</div>
          <div className="cardTextContainer">
            <div className="cardText">{limitedSummary}</div>
          </div>
        </CardContent>
      </div>
      <div className="card-bottom-flex-container">
        <Button onClick={() => {
          window.analytics.track('ADDED_TO_CART_FROM_MENU', {
            host: window.location.hostname,
            state: state,
            menuItem: props.menuItem,
            cart: state.orders
          });
          props.addOnClick();
        }}>
          <img src={addImg} className="cardAddBtn" />
        </Button>
        <div>
          <p className="cardPrice">${props.menuItem.price}</p>

        </div>
        {props.menuItem.dietaryRestrictions == "Vegetarian" ? <MealPropertyTag text={props.menuItem.dietaryRestrictions}/> : <p></p>}
      </div>
    </Card>
  );
}
