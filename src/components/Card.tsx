import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import '../index.css'
import addImg from "../assets/img/add.png";
import { colors } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 330,
    height: 365,
  },
  media: {
    height: 220,
  },
  cardContent: {
    height: 40,
    // backgroundColor: "#FFFBF5",
  },
});

export default function MediaCard(props: any) {
  const classes = useStyles();
  const MAX_SUMMARY_LENGTH = 120;
  
  var limitedSummary = props.meal.dietaryRestrictions;//prevents overflow, limits description length of the meal. TODO 1/8: ADD DESCRIPTION TO BACKEND!
  if (limitedSummary != null && limitedSummary.length >= MAX_SUMMARY_LENGTH) {//if there's an empty string the first condition prevents error
    limitedSummary = limitedSummary.substring(0, MAX_SUMMARY_LENGTH);
    limitedSummary += "...";
  }

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
          <div className="cardText">{limitedSummary}</div>
        </CardContent>
      </div>
      <div className="card-bottom-flex-container">
        <Button onClick={props.addOnClick}>
          <img src={addImg} className="cardAddBtn" />
        </Button>
        <div className="cardPrice">
          <p>${props.meal.price}</p>
        </div>
      </div>
    </Card>
  );
}
