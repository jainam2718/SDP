import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCustomer } from "../actions/auth";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { loadUser } from "../actions/auth";
import store from "../store";
import { UPDATE_FAIL } from "../actions/types";

export class CustomerUpdate extends Component {
    state = {
        first_name: "",
        last_name: "",
        phone: "",
        flag: true,
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        updateCustomer: PropTypes.func.isRequired,
        isUpdated: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.props.loadUser();
    }

    UpdateState() {
        this.setState(this.props.auth.user);
    }

    componentDidUpdate() {
        if (this.state.flag) {
            //console.log(this.props.vendor);
            this.setState({ flag: false });
            this.UpdateState();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateCustomer(this.state);
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (!this.props.auth || !this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.isUpdated) {
            store.dispatch({ type: UPDATE_FAIL });
            return <Redirect to="/profile/customer" />;
        }
        if (this.props.auth.isLoading) {
            return <FontAwesomeIcon icon={faSpinner} />;
        } else {
            const { first_name, last_name, phone } = this.state;
            return (
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Update Profile</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    onChange={this.onChange}
                                    value={first_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    onChange={this.onChange}
                                    value={last_name}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    onChange={this.onChange}
                                    value={phone}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isUpdated: state.vendor.isUpdated,
});

export default connect(mapStateToProps, { updateCustomer, loadUser })(
    CustomerUpdate
);
