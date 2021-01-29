import { makeStyles } from "@material-ui/core/styles";
import texture from "../../assets/img/landing/decoration/pattern-big.png";
import { privacyPolicy } from '../../assets/html/PrivacyPolicy';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${texture})`,
    justifyContent: 'center',
    alignItems: 'center'
  },
  policyContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    overflow: 'scroll',
    width: '90vw',
    height: '90vh',
    padding: '20px',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
  }
});

export default function DealCarousel() {
  let classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.policyContainer} dangerouslySetInnerHTML={{ __html: privacyPolicy}}>

      </div>
    </div>
  );
}
