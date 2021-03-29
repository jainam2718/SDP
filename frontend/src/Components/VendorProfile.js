import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {loadVendor} from '../actions/vendor';
import {Link, Redirect} from 'react-router-dom';
import {loadUser} from '../actions/auth';

export class VendorProfile extends Component {
    state = {
        first_name: '',
        last_name: '',
        phone: '',
        shop_name: '',
        address: '',
        location_long: null,
        location_lat: null,
        pincode: '',
        cod_available: true,
    };

    constructor(props) {
        super(props);
        this.props.loadVendor();
        this.props.loadUser();
    }

    static propTypes = {
        vendor: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        isFetching: PropTypes.bool,
    };

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.isFetching || this.props.auth.isLoading) {
            return <FontAwesomeIcon icon={faSpinner} />;
        } else {
            const {first_name, last_name, phone} = this.props.auth.user;
            const {
                shop_name,
                address,
                location_long,
                location_lat,
                pincode,
                cod_available,
                transaction_id,
            } = this.props.vendor;
            return (
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Profile</h2>
                        <div className="form-group">
                            <label>First Name : </label>

                            <label className="form-control">
                                {' '}
                                {first_name}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Last Name : </label>
                            <label className="form-control"> {last_name}</label>
                        </div>

                        <div className="form-group">
                            <label>Phone : </label>
                            <label className="form-control"> {phone}</label>
                        </div>
                        <div className="form-group">
                            <label>Shop name : </label>
                            <label className="form-control"> {shop_name}</label>
                        </div>
                        <div className="form-group">
                            <label>Address : </label>
                            <label className="form-control"> {address}</label>
                        </div>
                        <div className="form-group">
                            <label>Location Longitude : </label>
                            <label className="form-control">
                                {' '}
                                {location_long}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Location Lattitude : </label>
                            <label className="form-control">
                                {' '}
                                {location_lat}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Pincode : </label>
                            <label className="form-control"> {pincode}</label>
                        </div>
                        <button type="submit" className="btn btn-dark">
                            <Link to="/update/vendor">Make Changes</Link>
                        </button>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    vendor: state.vendor.vendor,
    auth: state.auth,
    isFetching: state.vendor.isFetching,
});

export default connect(mapStateToProps, {loadVendor, loadUser})(VendorProfile);
