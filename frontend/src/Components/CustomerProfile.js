import { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {  loadUser } from '../actions/auth';
import {  Link, Redirect } from 'react-router-dom';



export class CustomerProfile extends Component{

    state = {
        first_name: '',
        last_name: '',
        phone: '',
        
    }

    constructor(props){
        super(props);
        this.props.loadUser();
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
    };

    render() {
        if (!this.props.auth.isAuthenticated) {
            console.log("a");
            return <Redirect to="/" />;
        }
        if(this.props.auth.isLoading){
            return (
                <FontAwesomeIcon icon={faSpinner}/>
            );
        }
        else{
            const {  first_name, last_name, phone}=this.props.auth.user ;
            return(
                <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                <h2 className="text-center">Profile</h2>
                    <div className="form-group">
                    <label>First Name  : </label>

                    <label
                        className="form-control"
                    > {first_name}</label>
                    
                    </div>
                    <div className="form-group">
                    <label>Last Name : </label>
                    <label
                        className="form-control"
                    > {last_name}</label>
                    </div>
                    
                    <div className="form-group">
                    <label>Phone : </label>
                    <label
                       className="form-control"
                    > {phone}</label>
                    
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <Link to="/update/customer">
                            Make Changes
                        </Link>
                    </button>
                </div>
            </div>
            );    
        }   
    }

}

const mapStateToProps = (state) => ({
    auth : state.auth,
  });
  
  export default connect(mapStateToProps, { loadUser})(CustomerProfile);