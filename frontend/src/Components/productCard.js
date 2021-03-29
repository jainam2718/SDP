import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/productCard.css';
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
class ProductCard extends Component {
    static propTypes = {
        prop: PropTypes,
        isProductLoaded: PropTypes.bool,
        isProductDeleted: PropTypes.bool,
        cartUpdated: PropTypes.bool,
        cartItems: PropTypes.object.isRequired,
        isCartLoading: PropTypes.bool,
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
    constructor(props) {
        super(props);
        if (!this.props.auth.is_vendor) {
            this.props.getCartItems();
        }
        /*this.props.cartItems.forEach((e) => {
      if (e.product.id == this.props.element.id) {
        this.setState({ isInCart: true });
        this.setState({ quantity: e.quantity });
      }
    });*/
    }

    async UpdateState() {
        await this.props.cartItems.forEach((e) => {
            if (e.product.id === this.props.element.id) {
                this.setState({isInCart: true});
                this.setState({quantity: e.quantity});
            }
        });
    }

    componentDidUpdate = () => {
        if (!this.props.isCartLoading && !this.props.auth.is_vendor) {
            if (this.state.flag) {
                //console.log(this.props.vendor);
                this.setState({flag: false});
                this.UpdateState();
            }
        }
    };

    addToCart = (e) => {
        e.preventDefault();
        this.state.pid = this.props.element.id;
        this.state.quantity = 1;
        this.props.addToCart(this.state);
    };
    onClick = (e) => {
        e.preventDefault();
        this.setState({redirect: true}, () => {
            this.renderRedirect();
        });
    };
    onEditClick = (e) => {
        e.preventDefault();
        console.log('Edit');
        this.setState({Editredirect: true}, () => {
            this.renderRedirect();
        });
    };
    onDeleteClick = (e) => {
        // e.preventDefault();
        // store.dispatch({type:PRODUCT_LIST_UPDATING})
        this.props.delete_Product(this.props.element.id);
    };
    onUploadImagesClick = (e) => {
        // e.preventDefault();
        // store.dispatch({type:PRODUCT_LIST_UPDATING})
        return (
            <Redirect to={`/Product/UploadImages/${this.props.element.id}`} />
        );
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
        return (
            <div>
                {this.renderRedirect()}
                <div
                    className="product"
                    style={{
                        minHeight: '30rem',
                        maxHeight: '35rem',
                        maxWidth: '25rem',
                        minWidth: '20rem',
                        margin: '20px 20px 20px',
                    }}
                >
                    <div className="product__info">
                        <p>{this.props.element.title}</p>
                        <p className="product__price">
                            <small>
                                <FontAwesomeIcon icon={faRupeeSign} />
                            </small>
                            <strong>{this.props.element.amount}</strong>
                        </p>
                    </div>
                    <img
                        src={`http://127.0.0.1:8000${this.props.element.image[0]}`}
                        alt=""
                    />
                    {this.props.canEdit ? (
                        <center>
                            <div>
                                <Link
                                    to={`/Product/Images/${this.props.element.id}`}
                                >
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            margin: '10px 10px 10px',
                                            width: '100px',
                                        }}
                                    >
                                        Images
                                    </button>
                                </Link>
                                <Link
                                    to={`/Product/UploadImages/${this.props.element.id}`}
                                >
                                    <button
                                        className="btn btn-primary"
                                        style={{margin: '10px 10px 10px'}}
                                    >
                                        Add Images
                                    </button>
                                </Link>
                                <button
                                    className="btn btn-warning"
                                    style={{
                                        margin: '10px 10px 10px',
                                        width: '100px',
                                    }}
                                    onClick={this.onEditClick}
                                >
                                    Edit
                                </button>{' '}
                                <button
                                    className="btn btn-danger"
                                    style={{
                                        margin: '10px 10px 10px',
                                        width: '100px',
                                    }}
                                    onClick={this.onDeleteClick}
                                >
                                    Delete
                                </button>
                            </div>
                        </center>
                    ) : (
                        <div>
                            {this.props.isCartLoading ? (
                                <FontAwesomeIcon icon={faSpinner} />
                            ) : (
                                <div>
                                    <button
                                        className="btn btn-info"
                                        onClick={this.onClick}
                                        style={{margin: '10px 10px 10px'}}
                                    >
                                        Show
                                    </button>
                                    {this.state.isInCart ? (
                                        <span>Added To Cart</span>
                                    ) : (
                                        <button
                                            className="btn btn-success"
                                            onClick={this.addToCart}
                                        >
                                            Add To Cart
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isProductLoaded: state.product.isProductLoaded,
    isProductListUpdating: state.product.isProductDeleted,
    cartUpdated: state.cart.cartUpdated,
    cartItems: state.cart.cartItems,
    isCartLoading: state.cart.isCartLoading,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    delete_Product,
    addToCart,
    getCartItems,
})(ProductCard);
