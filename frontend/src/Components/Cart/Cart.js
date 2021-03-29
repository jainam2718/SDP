import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Switch, Link, Redirect, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Cart.css';
import CartCard from './CartCard';
import {getCartItems} from '../../actions/cart';
import {loadUser} from '../../actions/auth';

class Cart extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        cart: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.getCartItems();
    }

    calculateTotalAmount() {}

    handler() {
        this.props.getCartItems();
    }
    render() {
        console.log(this.props.auth);

        if (!this.props.auth.isAuthenticated) {
            console.log(this.props.auth);
            return <Redirect to="/" />;
        }
        if (this.props.auth.user.is_vendor) {
            return <Redirect to="/" />;
        }
        if (this.props.cart.isCartLoading) {
            return <FontAwesomeIcon icon={faSpinner} />;
        }
        if (this.props.cart.cartUpdated) {
            return <div>{this.props.getCartItems()}</div>;
        }
        let totalAmt = 0;
        const cart = this.props.cart.cartItems;
        const items =
            cart && cart.length ? (
                cart.map((element) => {
                    totalAmt += element.product.amount * element.quantity;
                    return (
                        <div>
                            <CartCard element={element} />
                        </div>
                    );
                })
            ) : (
                /**/
                <div>No Items In Cart</div>
            );
        const len = cart && cart.length ? cart.length : 0;
        return (
            <div>
                <h5 class="mb-4">
                    Cart (<span>{len}</span> items)
                </h5>
                {items}

                <h3>Total Amount {this.props.cart.totalAmt}</h3>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Link to={`/Address`}>
                    <button
                        className="btn btn-success"
                        style={{width: '70rem'}}
                    >
                        Select Address
                    </button>
                </Link>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export const mapStateToProps = (state) => ({
    cart: state.cart,
    auth: state.auth,
});

export default connect(mapStateToProps, {getCartItems, loadUser})(Cart);
