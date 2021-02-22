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

interface CartProps {
  mealsCost: number,
  tax: number,
  tipAmt: number,
  totalCost: number,
}

export default function CartPriceBreakdown({mealsCost, tax, tipAmt, totalCost}: CartProps) {
  // const classes = useStyles();

  return (
    <>
      <div className="cart-line"></div>
      <div className="cost-row">
          <p className="cart-text">Subtotal:</p>
          <p className="cart-text">${mealsCost}</p>
      </div>
      <div className="cost-row">
          <p className="cart-text">Tax:</p>
          <p className="cart-text">${tax}</p>
      </div>
      <div className="cost-row">
          <p className="cart-text">Optional Tip:</p>
          <p className="cart-text">${tipAmt}</p>
      </div>
      <div className="cost-row">
          <p className="cart-text bolded">Total:</p>
          <p className="cart-text bolded">${totalCost}</p>
      </div>
      <div className="cart-line"></div>
    </>
  );
}