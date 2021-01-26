import { makeStyles } from "@material-ui/core/styles";
import { title } from "process";
import React from "react";
import texture from "../../assets/img/texture.png";
import { theme } from "../../components/Theme";
import step1image from "../../assets/img/process/step1.png";
import step2image from "../../assets/img/process/step2.png";
import step3image from "../../assets/img/process/step3.png";


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '50vh',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    // gap: '5vw',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: 'auto',
      // gap: '2vh',
      padding: '6%',
    }
  },
  card: {
    height: '80%',
    minWidth: '300px',
    width: '20vw',
    backgroundColor: theme.palette.info.main,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    mozBoxSizing: 'border-box',
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    margin: '2vh',
    [theme.breakpoints.down('md')]: {
      width: '90vw',
      maxWidth: '350px',
      padding: '4%'
    }
  },
  cardImageContainer: {
    // height: '40%'
  },
  cardImage: {
    objectFit: 'contain',
  },
  cardHeaderContainer: {
    width: '100%',
  },
  cardNumber: {
    display: 'inline',
    fontFamily: 'Rustico',
    fontSize: '4em',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  cardTitle: {
    display: 'inline',
    fontFamily: 'Brush',
    fontSize: '3em',
    lineHeight: '1em',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  cardDescription: {
    fontSize: '2em',
    fontFamily: 'Playfair',
    color: theme.palette.secondary.main,
  }
});

interface CardProps {
  number: number,
  image: string,
  title: string,
  description: string,
}

function Card({ number, image, title, description }: CardProps) {
  var classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.cardImageContainer}>
        <img className={classes.cardImage} src={image} />
      </div>
      <div className={classes.cardHeaderContainer}>
        <h1 className={classes.cardNumber}>{number.toString() + '. '}</h1>
        <h1 className={classes.cardTitle}>{title}</h1>
      </div>
      <p className={classes.cardDescription}>{description}</p>
    </div>
  );
}

export default function Process() {
  var classes = useStyles();

  return (
    <div className={classes.container}>
      <Card image={step1image} number={1} title={'you schedule your lunch'} description={'Use our website to schedule a delicous lunch in advance, all without extra fees.'}/>
      <Card image={step2image} number={2} title={'local restaurant prepares food'} description={'We provide a simplified preperation process for local restaurants, and negotiate large-order discounts to save you money.'}/>
      <Card image={step3image} number={1} title={'we deliver!'} description={'We plan super efficient routes so you don’t pay for delivery. Then our associates follow the route to bring the meal to you.'}/>
    </div>
  );
}
