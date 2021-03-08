import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import React, { useContext } from "react";
import DayInput from "../Input/DayInput";
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { IAddIn, IOrderItem } from "../../state/interfaces";
import { addOrderItem } from "../../state/Actions";
import history from "../../utils/history";

const useStyles = makeStyles({
  dialog: {
  },
  dialogCard: {
    background: theme.palette.secondary.main,
    padding: '6%',
    paddingTop: '6%',
    paddingBottom: '6%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogTitle: {
    textAlign: 'center',
    color: theme.palette.info.main,
    fontSize: '4em',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3em'
    }
  },
  code: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: '7em',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '6em'
    }
  },
  dialogDescription: {
    color: theme.palette.info.main,
    fontSize: '2em',
    fontFamily: 'Playfair',
    marginTop: '1vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    }
  },
  addIn: {
    fontFamily: 'Playfair !important',
  },
  addButton: {
    marginTop: '1vw',
    backgroundColor: theme.palette.primary.main,
    // height: '5vh',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    color: theme.palette.secondary.main,
    fontFamily: 'Playfair',
    fontSize: '3em',
    padding: '3%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    },
    cursor: "pointer"
  }
});


interface ReferralModal {
  handleClose: () => void
}

export default function MealModal({ handleClose }: ReferralModal) {
  const classes = useStyles();
  const { dispatch, state } = useContext(Store);
  var add_ins: Set<IAddIn> = new Set<IAddIn>();

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={true}
          onClose={handleClose}
          fullWidth={true}
          className={classes.dialog}
        >
          <div className={classes.dialogCard}>
            <h1 className={classes.dialogTitle}>Your Code:</h1>
            <h1 className={classes.code}>{state.referralCode}</h1>
            <p className={classes.dialogDescription}>Send this to your friends to recieve free delivery cashback every time someone submits an order with your code! Click below to send add your friends contact information, and we will let them know you are referring them. </p>
           
            
            <button className={classes.addButton} onClick={() => {
              window.analytics.track('OPENNED_REFERRAL_FORM', {
                host: window.location.hostname,
                state: state,
              });
              history.push("https://forms.gle/w55UZsFbG5FQKLEY9")
            }}>
              Refer Friends For $</button>
            {/* <DayInput handleSelect={handleClose}/> */}
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
