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
import addImg from "../assets/add.png";

const useStyles = makeStyles({
  root: {
    width: 340,
    height: 355
  },
  media: {
    height: 210,
  },
  cardContent: {
    height: 55
  }
});

export default function MediaCard(props: any) {
  const classes = useStyles();
  const MAX_SUMMARY_LENGTH = 120;
  
  var limitedSummary = props.episode.summary;//prevents overflow, limits description length of the meal
  if (limitedSummary != null && limitedSummary.length >= MAX_SUMMARY_LENGTH) {//if there's an empty string the first condition prevents error
    limitedSummary = limitedSummary.substring(0, MAX_SUMMARY_LENGTH);
    limitedSummary += "...";
  }

  return (
    <Card className={classes.root}>
      <div>
        <CardMedia
          className={classes.media}
          image={props.episode.image.medium}
          title={props.episode.name}
        />
        <CardContent className={classes.cardContent}>
          <div className="cardTitle">{props.episode.name}</div>
          <div className="cardText">{limitedSummary}</div>
        </CardContent>
      </div>
      <div className="card-bottom-flex-container">
        <Button onClick={props.addOnClick}>
          <img src={addImg} className="cardAddBtn" />
        </Button>
        <div className="cardPrice">
          <p>${props.episode.number}</p>
        </div>
      </div>
    </Card>
  );
}