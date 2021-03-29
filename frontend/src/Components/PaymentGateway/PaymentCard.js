import React, {Component} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import '../../style/CardSection.css';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import {pay} from '../../actions/payment';
import PropTypes from 'prop-types';

export class PaymentCard extends Component {
    state = {
        email: '',
        id: '',
        stripeToken: '',
    };
    static propTypes = {
        success: PropTypes.bool,
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const {stripe, elements} = this.props;
        console.log('Payement card');
        console.log(this.props);
        let id = this.props.id;
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            console.log(result.error.message);
        } else {
            this.setState({email: this.props.auth.user.email});
            this.setState({stripeToken: result.token.id});
            this.setState({id: id});
            this.props.pay(this.state);
        }
    };
    render() {
        console.log(this.props);
        if (this.props.success) {
            return (
                <center>
                    <h1>SUCCESS</h1>
                </center>
            );
        }
        return (
            <div className="cardcontainer">
                <form onSubmit={this.handleSubmit}>
                    <CardSection />
                    <button
                        disabled={!this.props.stripe}
                        type="submit"
                        className="btn btn-primary bg-success"
                    >
                        Buy Now
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({success: state.payment.success});

export default connect(mapStateToProps, {pay})(PaymentCard);
