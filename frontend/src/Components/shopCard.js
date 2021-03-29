import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/shopCard.css';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {delete_Product} from '../actions/product';
import {addToCart, getCartItems} from '../actions/cart';
import {
    faTrash,
    faRupeeSign,
    faPlusCircle,
    faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
class ShopCard extends Component {
    static propTypes = {
        prop: PropTypes,
        isShopLoaded: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };
    state = {
        redirect: false,
        Editredirect: false,
        pid: 0,
        quantity: 1,
        flag: true,
        isInCart: false,
    };

    onClick = (e) => {
        e.preventDefault();
        this.setState({redirect: true}, () => {
            this.renderRedirect();
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            console.log('renderRedirect');
            return <Redirect to={`/Product/${this.props.element.id}`} />;
        }
        if (this.state.Editredirect)
            return <Redirect to={`/Product/Edit/${this.props.element.id}`} />;
        if (this.props.isProductDeleted) this.props.handler();
    };

    render() {
        console.log(this.props.element);
        return (
            <div>
                {this.renderRedirect()}
                <div
                    className="product"
                    style={{
                        minHeight: '20rem',
                        maxHeight: '20rem',
                        maxWidth: '15rem',
                        minWidth: '15rem',
                        margin: '20px 20px 20px',
                    }}
                >
                    <div>
                        <strong>{this.props.element.shop_name}</strong>
                        <p>
                            <p>{this.props.element.address}</p>
                        </p>
                        <p>{this.props.element.pincode}</p>
                        <p>
                            {this.props.element.cod_available
                                ? 'COD AVAILABLE'
                                : 'COD NOT AVAILABLE'}
                        </p>
                    </div>
                    <Link to={`/Product/byShop/${this.props.element.id}`}>
                        <button
                            className="btn btn-primary"
                            style={{margin: '10px 10px 10px'}}
                        >
                            Show Product
                        </button>
                    </Link>

                    <div></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isShopLoaded: state.product.isProductLoaded,
    auth: state.auth,
});

export default connect(mapStateToProps)(ShopCard);
