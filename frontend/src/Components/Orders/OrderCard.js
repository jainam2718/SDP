import {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/Cart.css';

class OrderCard extends Component {
    state = {
        quantity: 0,
        flag: true,
    };

    render() {
        // console.log(this.props.element);
        const dateToFormat = new Date(this.props.element.order_date);
        return (
            <div>
                <div className="row mb-4">
                    <div className="col-3">
                        <div className="">
                            <img
                                className="img-fluid w-100 h-90"
                                src={`http://127.0.0.1:8000${this.props.element.product.image[0]}`}
                                alt={this.props.element.product.title}
                            />
                        </div>
                    </div>
                    <div className="col-5">
                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="text-uppercase">
                                        {this.props.element.product.title}
                                    </h4>
                                    <span className="text-muted text-uppercase describe">
                                        {this.props.element.product.catagory}
                                    </span>
                                    <br />
                                    <span className="text-muted text-uppercase describe">
                                        {this.props.element.product.details}
                                    </span>
                                    <br />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">
                                    <span>
                                        <strong id="summary">
                                            <FontAwesomeIcon
                                                icon={faRupeeSign}
                                            />
                                            {this.props.element.product.amount}
                                        </strong>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <br></br>
                                    <span className="text-uppercase describe">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            hour12: true,
                                        }).format(dateToFormat)}
                                    </span>
                                    <br />
                                    <span className="text-muted text-uppercase describe">
                                        {this.props.element.address.address}
                                    </span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(OrderCard);
