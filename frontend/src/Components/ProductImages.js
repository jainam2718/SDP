import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {element} from 'prop-types';
import '../style/ProductImages.css';
import {addImages} from '../actions/product';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

class ProductImages extends Component {
    fileObj = [];
    fileArray = [];

    static propTypes = {
        areProductImagesUploaded: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            images: [null],
            reload: false,
            pid: this.props.match.params.id,
        };
        // let id = this.props.match.params.id;
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    uploadMultipleFiles(e) {
        // console.log(e.target)
        this.fileObj.push(e.target.files[0]);
        let index = this.fileObj.length - 1;
        // console.log(this.fileObj[index])
        this.fileArray.push({
            url: URL.createObjectURL(this.fileObj[index]),
            id: index,
        });
        this.setState({images: this.fileObj});
        // console.log(this.fileObj)
    }

    uploadFiles(e) {
        e.preventDefault();
        // console.log(this.state)
        this.props.addImages(this.state);
    }

    removeImage(e) {
        // e.preventDefault()
        this.fileObj.splice(e.target.id, 1);
        this.fileArray.splice(e.target.id, 1);
        for (let i = 0; i < this.fileArray.length; i++) {
            this.fileArray[i].id = i;
        }
        this.setState({images: this.fileObj});
        console.log(this.fileObj);
        this.setState({reload: true});
    }

    render() {
        if (this.state.reload) {
            this.setState({reload: false});
            return <div></div>;
        }
        if (this.props.areProductImagesUploaded) {
            return <Redirect to={`/Product/${this.props.match.params.id}`} />;
        }
        return (
            <form>
                <h1>
                    <center>Upload Images</center>
                </h1>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map((element) => (
                        <img
                            src={element.url}
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

                <div className="form-group">
                    <input
                        type="file"
                        className="form-control"
                        onChange={this.uploadMultipleFiles}
                        multiple
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={this.uploadFiles}
                >
                    Upload
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    areProductImagesUploaded: state.product.areProductImagesUploaded,
});
export default connect(mapStateToProps, {addImages})(ProductImages);
