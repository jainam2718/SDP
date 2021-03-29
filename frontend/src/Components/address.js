import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAddress, deleteAddress, addAddress} from '../actions/order';
import 'bootstrap/dist/css/bootstrap.css';
import store from '../store';

class addProduct extends Component {
    state = {
        address_title: '',
        address: '',
        pincode: '',
    };
    static propTypes = {
        addressLoaded: PropTypes.bool,
        addressAdded: PropTypes.bool,
        addressElementDelete: PropTypes.bool,
        addressList: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.props.getAddress(0);
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addAddress(this.state);
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    selectAddress = (e) => {
        e.preventDefault();
        console.log(e.target.id);
    };

    onAddressDelete = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        this.props.deleteAddress(e.target.id);
        // console.log(e.target.id)
    };
    handler() {
        this.props.getAddress(0);
    }
    render() {
        const {address, address_title, pincode} = this.state;
        if (this.props.addressAdded) return <div>{this.handler()}</div>;
        if (this.props.addressElementDelete) {
            return <div>{this.handler()}</div>;
        }
        if (!this.props.addressLoaded) return <div>{this.handler()}</div>;

        return (
            <div>
                <br></br>
                <br />
                {console.log(this.props.addressList.length)}
                {this.props.addressList.length === 0 ? (
                    <div></div>
                ) : (
                    <center>
                        <h2>Select Address</h2>
                    </center>
                )}
                <br></br>
                <br />
                <center>
                    <div className="card-group">
                        {this.props.addressList.map((item) => {
                            return (
                                <div
                                    className="card"
                                    style={{
                                        maxWidth: '15rem',
                                        margin: '10px 10px 10px',
                                    }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {item.address_title}
                                        </h5>
                                        <p className="card-text">
                                            {item.address}
                                        </p>
                                        <p className="card-text">
                                            {item.pincode}
                                        </p>
                                        <Link to={`/paymentGateway/${item.id}`}>
                                            <button
                                                id={item.id}
                                                className="btn btn-primary"
                                            >
                                                Select
                                            </button>
                                        </Link>
                                        <a
                                            onClick={this.onAddressDelete}
                                            id={item.id}
                                            className="btn btn-danger"
                                            style={{margin: '2px 2px 2px'}}
                                        >
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </center>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Add New Address</h2>
                        <br />
                        <form onSubmit={this.onSubmit}>
                            <br></br>
                            <br></br>
                            <div className="form-group">
                                <label>Address Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address_title"
                                    onChange={this.onChange}
                                    value={address_title}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    onChange={this.onChange}
                                    value={address}
                                />
                            </div>
                            <div className="form-group">
                                <label>pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    onChange={this.onChange}
                                    value={pincode}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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

const mapStateToProps = (state) => ({
    addressAdded: state.order.addressAdded,
    addressLoaded: state.order.addressLoaded,
    addressElementDelete: state.order.addressElementDelete,
    addressList: state.order.addressList,
});

export default connect(mapStateToProps, {
    getAddress,
    deleteAddress,
    addAddress,
})(addProduct);
