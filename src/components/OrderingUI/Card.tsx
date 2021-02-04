import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "../../index.css";
import addImg from "../../assets/img/ui/add.png";
import MealPropertyTag from "./MealPropertyTag";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 335,
  },
  media: {
    height: 200,
  },
  cardContent: {
    height: 45,
    // backgroundColor: "#FFFBF5",
  },
});

export default function MediaCard(props: any) {
  const classes = useStyles();
  const MAX_SUMMARY_LENGTH = 120;

  var limitedSummary = props.meal.description; //prevents overflow, limits description length of the meal. TODO 1/8: ADD DESCRIPTION TO BACKEND!
  //UNCOMMENT THE BOTTOM 4 LINES IF YOU WANT TO LIMIT MEAL DESCRIPTION/SUMMARY TO CERTAIN NUMBER OF CHARS INSTEAD OF HAVING POTENTIALLY INFINITE OVERFLOW
  // if (limitedSummary != null && limitedSummary.length >= MAX_SUMMARY_LENGTH) {//if there's an empty string the first condition prevents error
  //   limitedSummary = limitedSummary.substring(0, MAX_SUMMARY_LENGTH);
  //   limitedSummary += "...";
  // }

  return (
    <Card className={classes.root}>
      <div>
        <CardMedia
          className={classes.media}
          image={props.meal.picture_url}
          title={props.meal.name}
        />
        <CardContent className={classes.cardContent}>
          <div className="cardTitle">{props.meal.foodName}</div>
          <div className="cardTextContainer">
            <div className="cardText">{limitedSummary}</div>
          </div>
        </CardContent>
      </div>
      <div className="card-bottom-flex-container">
        <Button onClick={props.addOnClick}>
          <img src={addImg} className="cardAddBtn" />
        </Button>
        <div>
          <p className="cardPrice">${props.meal.price}</p>

        </div>
        {props.meal.dietaryRestrictions == "Vegetarian" ? <MealPropertyTag text={props.meal.dietaryRestrictions}/> : <p></p>}
      </div>
    </Card>
  );
}
