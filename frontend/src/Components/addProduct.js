import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_Product} from '../actions/product';
import store from '../store';
import {PRODUCT_LOADING_FAIL} from '../actions/types';
class addProduct extends Component {
    state = {
        title: '',
        catagory: '',
        amount: 0,
        discount: 0,
        details: '',
        quantity: 0,
    };
    static propTypes = {
        isProductAdded: PropTypes.bool,
        add_Product: PropTypes.func.isRequired,
        prop: PropTypes,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.add_Product(this.state);
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {
            title,
            catagory,
            amount,
            discount,
            details,
            quantity,
        } = this.state;
        if (this.props.isProductAdded) {
            store.dispatch({type: PRODUCT_LOADING_FAIL});
            return <Redirect to="/Home/" />;
        }
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
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isProductAdded: state.product.isProductAdded,
});

export default connect(mapStateToProps, {add_Product})(addProduct);
