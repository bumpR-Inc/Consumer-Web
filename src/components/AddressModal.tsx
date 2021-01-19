import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { BorderBottom, BorderColor, GpsNotFixed } from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React, { useState, PointerEvent } from "react";
import { theme } from "./Theme";
import { Store } from "../state/Store";
import AddressSelect from "../views/LandingPage/AddressSelect";
import { updateAddress } from "../state/Actions";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important'
  }
});


interface AddressModalProps {
  anchor: any,
  handleClose: () => void
}

export default function AddressModal({anchor, handleClose}: AddressModalProps) {
  const { state, dispatch } = React.useContext(Store);
  var classes = useStyles();
  
  const addressOnConfirm = (address: string, geocode: any) => {
    handleClose();
    updateAddress(dispatch, address, geocode);
  }
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="down" ref={ref} {...props} />;
  // });

  console.log(anchor);

  return (
    <div>
      <React.Fragment>
        <Popover
          className={classes.popover}
          open={Boolean(anchor)}
          // TransitionComponent={Transition}
          // keepMounted
          onClose={handleClose}
          anchorEl={anchor}
          // aria-labelledby="alert-dialog-slide-title"
          // aria-describedby="alert-dialog-slide-description"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <AddressSelect landing={false} onConfirm={addressOnConfirm}/>
          {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
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
          </DialogActions> */}
        </Popover>
      </React.Fragment>
    </div>
  );
}
