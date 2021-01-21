import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {  loadVendor, updateVendor } from '../actions/vendor';
import {  Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

export class VendorUpdate extends Component {
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
        transaction_id: '',
        isLoading : true,
        flag:true,
    };

    static propTypes = {
        vendor:PropTypes.object.isRequired,
        auth:PropTypes.object.isRequired,
        updateVendor: PropTypes.func.isRequired,
        isFetching:PropTypes.bool,
        isUpdated : PropTypes.bool,
    };
    constructor(props){
        super(props);
        this.props.loadVendor();  
             
    }

    UpdateState(){
        this.setState(this.props.vendor);
        //console.log(this.props.vendor);
        this.setState(this.props.auth.user);
        //console.log(this.state);
    }

    componentDidUpdate(){
        if(this.state.flag)
        {
            //console.log(this.props.vendor);
            this.setState({flag: false});
            this.UpdateState();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.updateVendor(this.state);
    };
    
     onChange = (e) =>{ 
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        if(this.props.isUpdated){
            return <Redirect to="/profile/vendor" />;
        }
        if(this.props.isFetching){
            return (
                <FontAwesomeIcon icon={faSpinner}/>
            );
        }
        else{
            const {  first_name, last_name, phone,  
            shop_name, address, location_long, location_lat, pincode, cod_available, transaction_id} = this.state;
            return(
                <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                <h2 className="text-center">Update Profile</h2>
                <form onSubmit={this.onSubmit}>
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
                    <label>Shop name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="shop_name"
                        onChange={this.onChange}
                        value={shop_name}
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
                    <label>Location Longitude</label>
                    <input
                        type="number"
                        className="form-control"
                        name="location_long"
                        onChange={this.onChange}
                        value={location_long}
                    />
                    </div>
                    <div className="form-group">
                    <label>Location Lattitude</label>
                    <input
                        type="number"
                        className="form-control"
                        name="location_lat"
                        onChange={this.onChange}
                        value={location_lat}
                    />
                    </div>
                    <div className="form-group">
                    <label>Pincode</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        onChange={this.onChange}
                        value={pincode}
                    />
                    </div>
                    <div className="form-group">
                    <label>Transaction id</label>
                    <input
                        type="text"
                        className="form-control"
                        name="transaction_id"
                        onChange={this.onChange}
                        value={transaction_id}
                    />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">
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
    vendor : state.vendor.vendor,
    auth : state.auth,
    isFetching:state.vendor.isFetching,
    isUpdated:state.vendor.isUpdated,
  });
  
  export default connect(mapStateToProps, { updateVendor,loadVendor})(VendorUpdate);