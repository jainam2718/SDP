import React, {Component} from 'react';
import PropTypes from 'prop-types';
import http from '../http-common';
import {connect} from 'react-redux';
import {registerCustomer} from '../actions/auth';
import {Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export class CustomerRegister extends Component {
    state = {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        is_vendor: false,
        password: null,
        password2: null,
    };

    static propTypes = {
        registerCustomer: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };
    // this.state.first_name, this.state.last_name,this.state.password,this.state.email, this.state.is_vendor, this.state.password2, this.state.username, this.state.phone
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.registerCustomer(this.state);
    };

    onChange = (e) => {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const {
            username,
            password,
            password2,
            first_name,
            last_name,
            phone,
            is_vendor,
            email,
        } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register Customer</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>firstname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>lastname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password2</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
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
                        <input
                            hidden
                            name="is_vendor"
                            value={is_vendor}
                        ></input>
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
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {registerCustomer})(CustomerRegister);
