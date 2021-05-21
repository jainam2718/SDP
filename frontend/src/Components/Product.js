import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import product from "../reducers/product";
import { Link, Redirect, useParams } from "react-router-dom";
import store from "../store";
import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_REMOVED,
} from "../actions/types";
import {
    getProduct,
    getComment,
    postComment,
    deleteComment,
} from "../actions/product";
import CommentList from "./Comment/commentList";
import CommentForm from "./Comment/commentForm";
import { getOrderItems } from "../actions/cart";

class Product extends Component {
    static propTypes = {
        product: PropTypes.object,
        isProductLoaded: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        isCommentloading: PropTypes.bool,
        comments: PropTypes.object,
        isCommentloaded: PropTypes.bool,
        user: PropTypes.object,
        commentDeleted: PropTypes.bool,
        commentDeleting: PropTypes.bool,
        order: PropTypes.object,
    };
    prop;
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.prop = this.props;
        store.dispatch(getProduct(id));
        store.dispatch(getComment(id));
        this.props.getOrderItems();
    }
    componentWillUnmount() {
        store.dispatch({ type: PRODUCT_REMOVED });
    }
    async commentSubmitHandler(msg, id, prop) {
        // let id = prop.match.params.id;
        let obj = {
            pid: id,
            description: msg,
        };
        await prop.postComment(obj);
        await prop.getComment(id);
    }
    getCommentsProduct = (id) => {
        store.dispatch(getComment(id));
    };
    async onDelete(e, prop) {
        let id = prop.match.params.id;
        // e.preventDefault();
        // console.log(e);
        await prop.deleteComment(e.target.id);
        await prop.getComment(id);
    }
    handler = () => {
        let id = this.props.match.params.id;
        store.dispatch(getComment(id));
    };
    render() {
        console.log(this.props.commentDeleting);
        const orders = this.props.order.orderItems;
        let flag = false;
        let id = this.props.match.params.id;
        if (this.props.commentDeleting) {
            return <div>DELETING</div>;
        }
        orders.forEach((e) => {
            if (e.product.id == id) {
                flag = true;
            }
        });
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        if (this.props.isProductLoaded) {
            // return <Redirect to="/" />;
            // return (
            //     <div>
            //         <CommentList
            //             loading={this.props.isCommentloading}
            //             comments={this.props.comments}
            //             onDelete={this.onDelete}
            //             user={this.props.user.email}
            //         ></CommentList>
            //         <CommentForm
            //             disabled={!flag}
            //             submitHandler={this.commentSubmitHandler}
            //         ></CommentForm>
            //     </div>
            // );
            return (
                <div>
                    <br></br>
                    <br></br>
                    <center>
                        <h1>{this.props.product.title}</h1>
                    </center>
                    <br></br>
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <ol className="carousel-indicators">
                            {this.props.product.image.map((img, index) => {
                                return (
                                    <li
                                        data-target="#carouselExampleIndicators"
                                        data-slide-to={index}
                                        className="active"
                                    ></li>
                                );
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {this.props.product.image.map((img) => {
                                if (img == this.props.product.image[0])
                                    return (
                                        <div className="carousel-item active">
                                            <img
                                                className="d-block w-100"
                                                src={`http://127.0.0.1:8000${img}`}
                                                style={{
                                                    height: "30rem",
                                                    width: "10rem",
                                                }}
                                            />
                                        </div>
                                    );
                                return (
                                    <div className="carousel-item ">
                                        <img
                                            className="d-block w-100"
                                            src={`http://127.0.0.1:8000${img}`}
                                            style={{ height: "30rem" }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    {/* comments */}
                    <div>
                        <CommentList
                            loading={this.props.isCommentloading}
                            comments={this.props.comments}
                            onDelete={this.onDelete}
                            prop={this.props}
                            user={this.props.user.email}
                        ></CommentList>
                        <CommentForm
                            disabled={!flag}
                            id={id}
                            prop={this.props}
                            submitHandler={this.commentSubmitHandler}
                        ></CommentForm>
                    </div>
                </div>
            );
        }
        return <div></div>;
    }
}

// function Product(props) {
//     let { id } = useParams();
//     useEffect(() => {
//         store.dispatch(getProduct(id));
//       });

//     console.log("HERE")
//     if (!props.isAuthenticated) {
//         return <Redirect to="/login" />;
//     }
//     if (!props.isProductLoaded) {
//         return <Redirect to="/" />;
//     }
//     return (
//         <div>

//             <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//                 <ol className="carousel-indicators">
//                     {
//                         props.product.image.map((img,index) =>{
//                             return(
//                                 <li data-target="#carouselExampleIndicators" data-slide-to={index} className="active"></li>
//                             )
//                         })
//                     }
//                 </ol>
//                 <div className="carousel-inner">
//                     {
//                         props.product.image.map(img =>{
//                             if(img == props.product.image[0])
//                                 return(
//                                 <div className="carousel-item active">
//                                     <img className="d-block w-100" src={`http://127.0.0.1:8000${img}`} />
//                                 </div>)
//                             return(
//                                 <div className="carousel-item ">
//                                     <img className="d-block w-100" src={`http://127.0.0.1:8000${img}`} />
//                                 </div>
//                             )})
//                     }
//                 </div>
//                 <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Previous</span>
//                 </a>
//                 <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Next</span>
//                 </a>
//                 </div>
//         </div>
//     )
// }

// Product.propTypes = {
//     product: PropTypes.object,
//     isProductLoaded: PropTypes.bool,
//     isAuthenticated: PropTypes.bool
// }

const mapStateToProps = (state) => ({
    product: state.product.product,
    isAuthenticated: state.auth.isAuthenticated,
    isProductLoaded: state.product.isProductLoaded,
    isCommentloading: state.product.isCommentloading,
    isCommentloaded: state.product.isCommentloaded,
    comments: state.product.comments,
    user: state.auth.user,
    commentDeleted: state.product.commentDeleted,
    commentDeleting: state.product.commentDeleting,
    order: state.order,
});

export default connect(mapStateToProps, {
    getComment,
    postComment,
    deleteComment,
    getOrderItems,
})(Product);
// export default getCommentsProduct;
