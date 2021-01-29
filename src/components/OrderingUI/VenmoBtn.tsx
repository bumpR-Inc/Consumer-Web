import React from 'react'
import venmoImg from "../../assets/img/ui/venmo.png";
import { Link } from "@reach/router";



export default function VenmoBtn(props : any) {
    return (
      <div>
        <a href={props.paymentLink}>
          <img className="venmo-btn" src={venmoImg}></img>
        </a>
      </div>
    );
}
