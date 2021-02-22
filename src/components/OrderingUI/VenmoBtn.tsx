import React from 'react'
import venmoImg from "../../assets/img/ui/venmo.png";
import { Link } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../Theme";


const useStyles = makeStyles({
  venmoBtn: {
    width: "25vw",
    maxWidth: "215px",
    margin: ".5rem",
    [theme.breakpoints.down("md")]: {
      width: "46vw",
      maxWidth: "165px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "46vw",
      maxWidth: "165px",
    },
  },
});

export default function VenmoBtn(props : any) {
    var classes = useStyles();

    return (
      <div>
        <a href={props.paymentLink}>
          <img className={classes.venmoBtn} src={venmoImg}></img>
        </a>
      </div>
    );
}
