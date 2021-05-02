import React, { Component } from "react";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { PaymentCard } from "./PaymentCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pay } from "../../actions/payment";

class InjectedCheckout extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        payment: PropTypes.object.isRequired,
    };
    render() {
        return (
            <ElementsConsumer>
                {({ stripe, elements }) => (
                    <PaymentCard
                        stripe={stripe}
                        elements={elements}
                        auth={this.props.auth}
                        payment={this.props.payment}
                        pay={this.props.pay}
                        id={this.props.id}
                    />
                )}
            </ElementsConsumer>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    payment: state.payment,
});

export default connect(mapStateToProps, { pay })(InjectedCheckout);
