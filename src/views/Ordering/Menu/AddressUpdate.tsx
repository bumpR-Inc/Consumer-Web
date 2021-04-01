import { makeStyles } from "@material-ui/core/styles";
import texture from "../../../assets/img/landing/decoration/pattern-big.png";
import AddressSelect from "../../../components/Input/AddressSelect";
import { theme } from "../../../components/Theme";
import { Store } from "../../../state/Store";
import React from "react";
import { fromMobileUpdateAddressPage } from "../../../state/Actions";
import { useRecoilState } from "recoil";
import { locationState } from "../../../state/Atoms";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${texture})`,
    // backgroundRepeat: 'repeat-y',
    // backgroundSize: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5vw',
    boxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
  },
  addressContainer: {
    height: '90%',
    width: '100%',
  },
  returnContainer: {
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  return: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: 'Playfair',
    textAlign: 'center',
    color: 'white',
    border: 'none',
    padding: '4%',
    fontSize: '6vw',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    width: '100%',

  }
});

export default function DealCarousel() {
  let classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  const [_locationState, setLocationState] = useRecoilState(locationState);

  const update = (address: string, geocode: any) => {
    // updateAddress(dispatch, address, geocode);
    setLocationState({address: address, geocode: geocode})
    fromMobileUpdateAddressPage(dispatch);
  }

  return (
    <div className={classes.container}>
      <div className={classes.addressContainer}>
        <AddressSelect landing={false} miniButton={false} onConfirm={update} onSkipAddresPickerConfirm={() => {}}/>
      </div>

      <div className={classes.returnContainer}>
        <button className={classes.return} onClick={() => {
          window.analytics.track('ADDRESS_UPDATE_CLOSED', {
            host: window.location.hostname,
            state: state,
            address: _locationState.address,
            geocode: state.geocode,
          });
          fromMobileUpdateAddressPage(dispatch);
        }}>Return To Orders</button>
      </div>
      {/* <div className={classes.policyContainer} dangerouslySetInnerHTML={{ __html: privacyPolicy}}>

      </div> */}
    </div>
  );
}
