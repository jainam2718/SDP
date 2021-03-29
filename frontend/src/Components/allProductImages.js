import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {element} from 'prop-types';
import '../style/ProductImages.css';
import {deleteImages, getImages} from '../actions/product';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

class allProductImages extends Component {
    static propTypes = {
        areImagesLoaded: PropTypes.bool,
        productImages: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            pid: this.props.match.params.id,
        };
        console.log(this.state.pid);
        this.props.getImages(this.state.pid);
    }

    removeImage(e) {
        e.preventDefault();
    }
    handler() {
        // this.props.getImages(this.state.id)
    }
    componentDidUpdate() {
        console.log(this.props.areImagesLoaded);
        console.log(this.props.productImages);
    }

    render() {
        if (this.state.reload) {
            this.setState({reload: false});
            return <div></div>;
        }
        console.log(this.props.areImagesloaded);
        if (this.props.areImagesLoaded) {
            return (
                <form>
                    <h1>
                        <center>All Images</center>
                    </h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="form-group multi-preview">
                        {(this.props.productImages || []).map((element) => (
                            <img
                                src={`http://127.0.0.1:8000${element.image}`}
                                className="image"
                                id={element.id}
                                style={{
                                    height: '10rem',
                                    margin: '20px 20px 20px',
                                }}
                                onClick={this.removeImage}
                                alt="..."
                            />
                        ))}
                    </div>
                </form>
            );
        }
        return <div>No Images</div>;
    }
}

const mapStateToProps = (state) => ({
    areImagesLoaded: state.product.areImagesLoaded,
    productImages: state.product.productImages,
});
export default connect(mapStateToProps, {deleteImages, getImages})(
    allProductImages
);
