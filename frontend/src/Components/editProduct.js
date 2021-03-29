import React, {Component, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import product from '../reducers/product';
import {Link, Redirect, useParams} from 'react-router-dom';
import store from '../store';
import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_REMOVED,
} from '../actions/types';
import {getProduct, edit_Product} from '../actions/product';

class editProduct extends Component {
    state = {
        title: '',
        catagory: '',
        amount: 0,
        discount: 0,
        details: '',
        quantity: 0,
        flag: true,
    };
    static propTypes = {
        product: PropTypes.object,
        isProductLoaded: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        isProductUpdated: PropTypes.bool,
    };
    UpdateState() {
        // console.log(this.props.product)
        this.setState(this.props.product);
    }
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.getProduct(id);
    }
    componentDidUpdate() {
        // console.log(this.state)
        if (this.state.flag) {
            this.setState({flag: false});
            this.UpdateState();
        }
    }
    componentWillUnmount() {
        store.dispatch({type: PRODUCT_REMOVED});
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.edit_Product(this.state);
    };
    render() {
        if (this.props.isProductUpdated) {
            return <Redirect to="/Home/" />;
        }
        if (this.props.isProductLoaded) {
            const {
                title,
                catagory,
                amount,
                discount,
                details,
                quantity,
            } = this.state;
            return (
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Add Product</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Product Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    onChange={this.onChange}
                                    value={title}
                                />
                            </div>
                            <div className="form-group">
                                <label>Catagory</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="catagory"
                                    onChange={this.onChange}
                                    value={catagory}
                                />
                            </div>
                            <div className="form-group">
                                <label>Details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="details"
                                    onChange={this.onChange}
                                    value={details}
                                />
                            </div>
                            <div className="form-group">
                                <label>amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    onChange={this.onChange}
                                    value={amount}
                                />
                            </div>
                            <div className="form-group">
                                <label>Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="discount"
                                    onChange={this.onChange}
                                    value={discount}
                                />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    onChange={this.onChange}
                                    value={quantity}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        return <div>EDIT PRODUCT NOT FOUND</div>;
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    isAuthenticated: state.auth.isAuthenticated,
    isProductLoaded: state.product.isProductLoaded,
    isProductUpdated: state.product.isProductUpdated,
});

export default connect(mapStateToProps, {edit_Product, getProduct})(
    editProduct
);
