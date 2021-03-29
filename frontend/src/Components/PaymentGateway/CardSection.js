import React, { Component } from "react";
import {
    CardElement,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";
import "../../style/CardSection.css";

class CardSection extends Component {
    render() {
        const CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                    color: "blue",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    fontSmoothing: "antialiased",
                    "::placeholder": {
                        color: "#CFD7DF",
                    },
                },
                invalid: {
                    color: "red",
                    ":focus": {
                        color: "red",
                    },
                },
            },
        };
        return (
            <div>
                <div className="cardTitle">Fill the Card details</div>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
        );
    }
}

export default CardSection;
