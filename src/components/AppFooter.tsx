import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import { title } from "process";
import React from "react";
import texture from "../../assets/img/texture.png";
import { theme } from "./Theme";


const useStyles = makeStyles({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100vw",
    minHeight: "28vh",
    backgroundColor: theme.palette.primary.main,
    // justifyContent: "center",
    // alignItems: "center",
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
  },
  copyrightAlign: {
    display: "flex",
    direction: "rtl",
    flexDirection: "row",
    paddingTop: "10vh",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      paddingBottom: "2vh",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      paddingBottom: "2vh",
    },
    // marginTop: "8vh",
    // alignSelf: "flex-end"
  },
  textWrap: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  text: {
    color: "#fff",
    fontSize: "1.6em",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    paddingTop: ".1rem",
    paddingBottom: ".1rem",
    fontWeight: "normal",
    fontFamily: "Playfair",
    margin: "0px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
    },
  },
  titleText: {
    color: "#fff",
    fontSize: "2em",
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    paddingTop: ".1rem",
    paddingBottom: ".1rem",
    fontWeight: "bold",
    fontFamily: "Playfair",
    margin: "0px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
    },
  },
  infoCol: {
    paddingBottom: "1vh",
    paddingTop: "4vh",
    [theme.breakpoints.down("md")]: {
      paddingTop: "2vh",
      paddingBottom: "2vh",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2vh",
      paddingBottom: "2vh",
    },
  },
});

export default function AppFooter() {
  var classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.textWrap}>
          <div className={classes.infoCol}>
            <p className={classes.titleText}>Delivery</p>
            <p className={classes.text}>Delivering Mondays 12-2pm, PT</p>
            <p className={classes.text}>Servicing Berkeley, CA</p>
          </div>
          <div className={classes.infoCol}>
            <p className={classes.titleText}>Resources</p>
            <p className={classes.text}>
              <a
                href={"https://www.goodneighbor.delivery/terms"}
                style={{ color: "#fff" }}
              >
                Terms of Service
              </a>
            </p>
            <p className={classes.text}>
              <a
                href={"https://www.goodneighbor.delivery/privacy"}
                style={{ color: "#fff" }}
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <div className={classes.infoCol}>
            <p className={classes.titleText}>Contact</p>
            <p className={classes.text}> (858) 705-5429</p>
            <p className={classes.text}> goodneighborsubs@gmail.com</p>
          </div>
        </div>
        <div className={classes.copyrightAlign}>
          <div>
            <p className={classes.text}> ©2021 Good Neighbor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
