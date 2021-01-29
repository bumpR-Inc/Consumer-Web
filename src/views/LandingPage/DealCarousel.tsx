import { makeStyles } from "@material-ui/core/styles";
import { title } from "process";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import texture from "../../assets/img/landing/decoration/pattern-big.png";
import { theme } from "../../components/Theme";
import deal1 from "../../assets/img/deals/deal1.png";
import deal2 from "../../assets/img/deals/deal2.png";
import deal3 from "../../assets/img/deals/deal3.png";
import deal4 from "../../assets/img/deals/deal4.png";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
  },
  titlePre: {
    height: '10vh',
    backgroundImage: `url(${texture})`,
  },
  titleContainer: {
    marginLeft: '2%',
  },
  title: {
    display: 'inline',
    fontFamily: 'Playfair Display',
    fontWeight: "normal",
    fontSize: '10em',
    margin: '0px',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      fontSize: '8em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12vw',
    },
  },
  titleBold: {
    fontWeight: "bold",
  },
  titlePost: {
    height: '50vh',
    backgroundImage: `url(${texture})`,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '75vh'
    }
  },
  dealContainer: {
    // height: "90%",
    // backgroundColor: 'green',
    // position: 'absolute',
    // display: 'flex',
    // flexDirection: 'row',
    // gap: '4vw',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  deal: {
    maxWidth: '350px',
    width: '90vw',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    // padding: '10%',
    // backgroundColor: 'blue'
  },
  dealImage: {
    objectFit: 'contain',
    width: '90%',
    // position: 'absolute'
  }
});

export default function DealCarousel() {
  let classes = useStyles();
  const [speedChange, setSpeedChange] = useState<number>(0);

  let deals: string[] = [deal1, deal2, deal3, deal4, deal1, deal2, deal3, deal4];

  return (
    <div className={classes.container}>
      <div className={classes.titlePre}/>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Body your </h1>
        <h1 className={`${classes.title} ${classes.titleBold}`}>classes,</h1>
        <br/>
        <h1 className={classes.title}>not your </h1>
        <h1 className={`${classes.title} ${classes.titleBold}`}>wallet.</h1>
      </div>
      <div className={classes.titlePost}>
        <div className={classes.dealContainer}>
          <Marquee direction="ltr" velocity={window.innerWidth <= theme.breakpoints.values.md ? 5 : 40} resetAfterTries={0} scatterRandomly={false} onInit={() => {}} onFinish={() => {}}>
            {
              deals.map((value: string, index: number) => {
                return (
                  <div className={classes.deal}>
                    {index % 2 == 0
                      ? <img src={value} className={classes.dealImage} style={{ marginTop: '40%' }} />
                      : <img src={value} className={classes.dealImage} style={{ marginBottom: '40%' }} />}
                  </div>
                );
              })
            }
          </Marquee>
        </div>
      </div>
    </div>
  );
}
