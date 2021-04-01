import React from "react";
import { Store } from "../../state/Store";
import OrderHistory from "./OrderHistory/OrderHistory";
import AddressUpdate from "./Menu/AddressUpdate";
import MenuPage from "./Menu/MenuPage";
import ReferralModal from "../../components/OrderingUI/ReferralModal";
import { setReferralModal } from "../../state/Actions";

export default function OrderingHomePage() {
  const { state, dispatch } = React.useContext(Store);

  return <>
    {state.mobileUpdateAddressPage ?
      <AddressUpdate /> :
      (state.orderHistory ? <OrderHistory /> : <MenuPage />)
    }
    {
      state.referralModal && <ReferralModal handleClose={() => { setReferralModal(dispatch, false) }}/>
    }
  </>;
}
