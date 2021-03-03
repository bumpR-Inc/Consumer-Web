import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import { title } from "process";
import React from "react";
import texture from "../../assets/img/texture.png";
import { theme } from "./Theme";
// import instagramLogo from "../assets/img/branding/instagram-logo.png";
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles({
  igIcon: {
    height: "2.3rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",

    // cursor: "pointer",
    // backgroundColor: "blue"
  },
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100vw",
    minHeight: "26vh",
    backgroundColor: theme.palette.primary.main,
    // justifyContent: "center",
    // alignItems: "center",
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
  },
  copyrightAlign: {
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    // direction: "rtl",
    flexDirection: "row",
    paddingTop: "5vh",
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
    // textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: "4vw",
    },
  },
  titleText: {
    color: "#fff",
    fontSize: "2em",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    paddingTop: ".1rem",
    paddingBottom: ".1rem",
    fontWeight: "bold",
    fontFamily: "Playfair",
    margin: "0px",
    // textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
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
  link: {
    color: 'white',
  },
  inverted: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main
  },
});

interface AppFooterProps {
  invertColors?: boolean
}

export default function AppFooter({ invertColors }: AppFooterProps) {
  var classes = useStyles();

  return (
    <div>
      <div className={classes.container + (invertColors ? ' ' + classes.inverted : '')}>
        <div className={classes.textWrap + (invertColors ? ' ' + classes.inverted : '')}>
          <div className={classes.infoCol + (invertColors ? ' ' + classes.inverted : '')}>
            <p className={classes.titleText + (invertColors ? ' ' + classes.inverted : '')}>Delivery</p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}>Delivering Mondays 12-2pm, PT</p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}>Servicing Berkeley, CA</p>
          </div>
          <div className={classes.infoCol + (invertColors ? ' ' + classes.inverted : '')}>
            <p className={classes.titleText + (invertColors ? ' ' + classes.inverted : '')}>Resources</p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}>
              <a
                className={classes.link + (invertColors ? ' ' + classes.inverted : '')}  
                href={"https://www.goodneighbor.delivery/terms"}
                // style={{ color: "#fff" }}
              >
                Terms of Service
              </a>
            </p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}>
              <a
                className={classes.link + (invertColors ? ' ' + classes.inverted : '')}
                href={"https://www.goodneighbor.delivery/privacy"}
                // style={{ color: "#fff" }}
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <div className={classes.infoCol + (invertColors ? ' ' + classes.inverted : '')}>
            <p className={classes.titleText + (invertColors ? ' ' + classes.inverted : '')}>Contact</p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}> (858) 705-5429</p>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}> goodneighborsubs@gmail.com</p>
          </div>
        </div>
        <div className={classes.copyrightAlign + (invertColors ? ' ' + classes.inverted : '')}>
          <div>
            <a
              className={classes.link + (invertColors ? ' ' + classes.inverted : '')}
              href={"https://www.instagram.com/eatgoodneighbor/"}
              target="_blank"
            >
              <InstagramIcon className={classes.igIcon + (invertColors ? ' ' + classes.inverted : '')}/>
              {/* <img className={classes.igIcon + (invertColors ? ' ' + classes.inverted : '')} src={instagramLogo}></img> */}
            </a>
          </div>
          <div>
            <p className={classes.text + (invertColors ? ' ' + classes.inverted : '')}> ©2021 Good Neighbor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
