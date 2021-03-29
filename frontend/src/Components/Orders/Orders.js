import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Switch, Link, Redirect, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Cart.css';
import OrderCard from './OrderCard';
import {getOrderItems} from '../../actions/cart';
import {loadUser} from '../../actions/auth';
import '../../style/home.css';

class Orders extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        console.log(this.props.auth.isAuthenticated);
        this.props.loadUser();
        this.props.getOrderItems();
    }

    handler() {
        this.props.getOrderItems();
    }
    render() {
        if (!this.props.auth.isAuthenticated) {
            console.log(this.props.auth);
            return <Redirect to="/" />;
        }
        if (this.props.auth.user.is_vendor) {
            return <Redirect to="/" />;
        }
        if (this.props.order.isOrderLoading) {
            return <FontAwesomeIcon icon={faSpinner} />;
        }
        let totalAmt = 0;
        const orders = this.props.order.orderItems;
        const items =
            orders && orders.length ? (
                orders.map((element) => {
                    return (
                        <div>
                            <OrderCard element={element} />
                        </div>
                    );
                })
            ) : (
                /**/
                <div>No Items Placed</div>
            );
        const len = orders && orders.length ? orders.length : 0;
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <h5 className="mb-4">
                    Orders (<span>{len}</span> items)
                </h5>
                {items}
            </div>
        );
    }
}

export const mapStateToProps = (state) => ({
    order: state.order,
    auth: state.auth,
});

export default connect(mapStateToProps, {getOrderItems, loadUser})(Orders);
