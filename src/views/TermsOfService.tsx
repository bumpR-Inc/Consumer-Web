import { makeStyles } from "@material-ui/core/styles";
import texture from "../assets/img/texture.png";
import { termsOfService } from '../assets/html/TermsOfService';

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

export default function TermsOfService() {
  let classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.policyContainer} dangerouslySetInnerHTML={{ __html: termsOfService}}>

      </div>
    </div>
  );
}
