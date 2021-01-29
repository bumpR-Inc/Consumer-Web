import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../index.css";
import addImg from "../assets/img/add.png";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 300,
  },
  media: {
    height: 210,
  },
  cardContent: {
    height: 55,
  },
});

export default function CartCard(props: any) {
  const classes = useStyles();

  return (
    <div className="cart-card-container">
      <div className="cart-card-second-container">
        <img className="cart-card-img" src={props.meal.picture_url}></img>
        <div className="cart-card-content">
          <div className="cart-card-title">{props.meal.foodName}</div>
          <div className="cart-card-price">
            ${props.meal.price} | {props.meal.restaurant_info.name}
          </div>
          <div className="cart-card-buttons-container">
            <div className="cart-card-buttons">
              <div onClick={props.subtractOnClick}>-</div>
              {props.numInCart}
              <div onClick={props.addOnClick}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Card className={classes.root}>
    //   <div>
    //     <CardMedia
    //       className={classes.media}
    //       image={props.episode.image.medium}
    //       title={props.episode.name}
    //     />
    //     <CardContent className={classes.cardContent}>
    //       <div className="cardTitle">{props.episode.name}</div>
    //       <div className="cardText">{limitedSummary}</div>
    //     </CardContent>
    //   </div>
    //   <div className="card-bottom-flex-container">
    //     <Button onClick={props.addOnClick}>
    //       <img src={addImg} className="cardAddBtn" />
    //     </Button>
    //     <div className="cardPrice">
    //       <p>${props.episode.number}</p>
    //     </div>
    //   </div>
    // </Card>
  );
}
