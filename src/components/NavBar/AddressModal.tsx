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
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import AddressSelect from "../Input/AddressSelect";
import { updateAddress } from "../../state/Actions";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important',

    height: '100%',
  },
  dialog: {
    margin: '0px',
    width: '100vw',
    maxWidth: '100vw',
    minWidth: '100vw',
  },
  dialogCard: {
    background: theme.palette.info.main,
    padding: '7vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  dialogTitle: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '27px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '5.5vw'
    }
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

  return (
    <div>
      <React.Fragment>
        {window.innerWidth >= theme.breakpoints.values.md ? <Popover
          className={classes.popover}
          open={Boolean(anchor)}
          onClose={handleClose}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <AddressSelect landing={false} miniButton={true} onConfirm={addressOnConfirm} onSkipAddresPickerConfirm={()=>{}} />
        </Popover>
        :<Dialog
        open={Boolean(anchor)}
        onClose={handleClose}
        className={classes.dialog}
        fullWidth={true}
            maxWidth={"xl"}
            style={{'margin': '0px', width: '100%'}}
      >
        <div className={classes.dialogCard}>
              <AddressSelect landing={false} miniButton={true} onConfirm={addressOnConfirm} onSkipAddresPickerConfirm={()=>{}} />
        </div>
      </Dialog>
        }
      </React.Fragment>
    </div>
  );
}
