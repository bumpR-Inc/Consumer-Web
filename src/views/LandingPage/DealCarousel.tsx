import { makeStyles } from "@material-ui/core/styles";
import { title } from "process";
import React, { useRef, useLayoutEffect, useState } from "react";
import texture from "../../assets/img/texture.png";
import { theme } from "../../components/Theme";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import deal1 from "../../assets/img/deals/deal1.png";
import deal2 from "../../assets/img/deals/deal2.png";
import deal3 from "../../assets/img/deals/deal3.png";
import deal4 from "../../assets/img/deals/deal4.png";


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
    [theme.breakpoints.down('sm')]: {
      height: '75vh'
    }
  },
  dealContainer: {
    height: "100%",
    // backgroundColor: 'green',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    gap: '1vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deal: {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // backgroundColor: 'blue'
  },
  dealOffset: {
    flexShrink: 0,
    height: '20%',
  },
  dealImage: {
    objectFit: 'contain',
    // position: 'absolute'
  }
});

export default function DealCarousel() {
  let classes = useStyles();
  const [scrollPush, setScrollPush] = useState<number>(0);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const offset: number = 0;
      const speed: number = 0.2;
      setScrollPush(offset + currPos.y*speed);
    },
    [scrollPush]
  )

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
        <div className={classes.dealContainer} style={{left: scrollPush}}>
          {
            deals.map((value: string, index: number) => {
              return (
                <div className={classes.deal}>
                  {index % 2 == 0 && (<div className={classes.dealOffset}/>)}
                  <img src={value} className={classes.dealImage} style={{ bottom: '25%' }} />
                  {index % 2 == 1 && (<div className={classes.dealOffset}/>)}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
