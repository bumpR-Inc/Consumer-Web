import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import React, { useContext } from "react";
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import { FormControlLabel } from "@material-ui/core";
import { IAddIn, IOrderItem } from "../../state/interfaces";
import { addOrderItem } from "../../state/Actions";
import CustomCheckbox from "../Input/CustomCheckbox";
import { useRecoilState } from "recoil";
import { groupState } from "../../state/Atoms";
import { createGroupAPI, leaveGroupAPI } from "../../state/api/GroupAPI";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important',
    height: '100%',
  },
  dialog: {
  },
  dialogCard: {
    background: theme.palette.secondary.main,
    padding: '6%',
    paddingTop: '6%',
    paddingBottom: '6%',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogTitle: {
    color: theme.palette.primary.main,
    fontSize: '4em',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3em'
    }
  },
  dialogImage: {
    height: '30vh',
    objectFit: 'cover',
    marginTop: '1vw',
    borderRadius: '10px'
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
  button: {
    marginTop: '1vw',
    height: '5vh',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    color: theme.palette.secondary.main,
    fontFamily: 'Playfair',
    fontSize: '2em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    },
    cursor: "pointer",
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  joinButton: {
    backgroundColor: theme.palette.primary.main,
  },
  leaveButton: {
    backgroundColor: theme.palette.error.main,
  },
  addFriendButton: {
    backgroundColor: theme.palette.success.main,
  }
});


interface GroupOrderModalProps {
  handleClose: () => void
}

export default function GroupOrderModal({ handleClose }: GroupOrderModalProps) {
  const classes = useStyles();
  const [_groupState, setGroupState] = useRecoilState(groupState);
  const { getAccessTokenSilently } = useAuth0();

  const createGroup = async () => {
    const data: any = createGroupAPI(await getAccessTokenSilently());
    setGroupState(data);
  }

  const leaveGroup = async () => {
    const data: any = leaveGroupAPI(await getAccessTokenSilently());
    setGroupState(data);
  }

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
            <h1 className={classes.dialogTitle}>Group Order Discount</h1>
            {/* <img src={state.menuItemInModal.picture_url} className={classes.dialogImage} alt="menu item"/> */}
            {_groupState.members_info != undefined && _groupState.members_info.length != 0
              ? <>
                
                <div className={classes.buttonRow}>
                  <button className={classes.button + " " + classes.leaveButton} onClick={() => {
                    leaveGroup();
                  }}>Leave Group</button>
                  <button className={classes.button + " " + classes.addFriendButton} onClick={() => {
                    
                  }}>Invite Friend</button>
                </div>
              </>
              : <>
                  <p className={classes.dialogDescription}>Order to the same address with your friends and everyone gets cheaper delivery!</p>
                  <button className={classes.button + " " + classes.joinButton} onClick={() => {
                    createGroup();
                  }}>Start Group</button>
                </>
              }
            {/* <DayInput handleSelect={handleClose}/> */}
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
