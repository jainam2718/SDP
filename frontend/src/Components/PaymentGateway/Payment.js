import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadUser } from "../../actions/auth";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import InjectedCheckout from "./InjectedCheckout";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../../style/CardSection.css";

export class Payment extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        payment: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.loadUser();
    }

    render() {
        const stripePromise = loadStripe(
            "pk_test_51IMTY6BVij55aMSVEs6opqQQKrX7dnbXSWX2J6JMW38U8SjdLttuYJWamDYTeHbjw2eu58YT3VF3zUpIkiK1G8Be00EWtqmz5h"
        );
        let id = this.props.match.params.id;
        console.log(id);
        console.log(this.props);
        if (!this.props.auth) {
            console.log("a");
            return <Redirect to="/" />;
        }

        if (this.props.auth.isLoading) {
            return <FontAwesomeIcon icon={faSpinner} />;
        }

        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.payment && this.props.payment.success) {
            return (
                <center>
                    <h1>Order Placed Successfully</h1>
                </center>
            );
        }
        if (this.props.payment && this.props.payment.inProcess) {
            return <FontAwesomeIcon icon={faSpinner} />;
        }
        return (
            <div>
                {
                    <Elements stripe={stripePromise} id={id}>
                        <InjectedCheckout id={id} />
                    </Elements>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    payment: state.payment,
});

export default connect(mapStateToProps, { loadUser })(Payment);
