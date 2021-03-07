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
  menuItemsCost: number;
  tax: number;
  tipAmt: number;
  deliveryFee: number;
  totalCost: number;
  discount: number;
}

export default function CartPriceBreakdown({menuItemsCost, tax, tipAmt, deliveryFee, totalCost, discount}: CartProps) {
  // const classes = useStyles();
  var roundedMealsCost = Math.round(menuItemsCost * 100) / 100;
  var roundedTax = Math.round(tax * 100) / 100;
  var roundedDeliveryFee = Math.round(deliveryFee * 100) / 100;
  var roundedTipAmt = Math.round(tipAmt * 100) / 100;
  var roundedTotalCost = Math.round(totalCost * 100) / 100;
  var roundedDiscount = Math.round(discount * 100) / 100;



  return (
    <>
      <div className="cart-line"></div>
      <div className="cost-row">
        <p className="cart-text">Subtotal:</p>
        <p className="cart-text">${roundedMealsCost}</p>
      </div>
      <div className="cost-row">
        <p className="cart-text">Tax:</p>
        <p className="cart-text">${roundedTax}</p>
      </div>
      <div className="cost-row">
        <p className="cart-text">Delivery Fee:</p>
        <p className="cart-text">${roundedDeliveryFee}</p>
      </div>
      <div className="cost-row">
        <p className="cart-text">Optional Tip:</p>
        <p className="cart-text">${roundedTipAmt}</p>
      </div>

      {(!isNaN(roundedDiscount) && roundedDiscount != 0) ? (
        <div className="cost-row">
          <p className="cart-text">Referral Discount</p>
          <p className="cart-text">${roundedDiscount * -1}</p>
        </div>
      ) : (
        <p></p>
      )
      }

      {console.log("meme")}
      {console.log(typeof (roundedDiscount))}
      <div className="cost-row">
        <p className="cart-text bolded">Total:</p>
        <p className="cart-text bolded">${roundedTotalCost}</p>
      </div>
      <div className="cart-line"></div>
    </>
  );
}