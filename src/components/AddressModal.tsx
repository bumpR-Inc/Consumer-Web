import { makeStyles } from "@material-ui/core/styles";
import { BorderBottom, BorderColor, GpsNotFixed } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from "react";
import { theme } from "./Theme";
import { Store } from "../state/Store";

const useStyles = makeStyles({
  
});


interface AddressModalProps {
  open: boolean,
  handleClose: () => void
}

export default function AddressModal({open, handleClose}: AddressModalProps) {
  var classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="down" ref={ref} {...props} />;
  // });

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} color="primary">
              Disagree
            </button>
            <button onClick={handleClose} color="primary">
              Agree
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
