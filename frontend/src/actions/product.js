import { returnErrors } from "./messages";
import http from "../http-common";

import {
    PRODUCT_LOADED,
    PRODUCT_LOADING,
    PRODUCT_LOADING_FAIL,
    PRODUCT_ADDED,
    PRODUCT_ADDING_FAIL,
    PRODUCT_ADDING,
    PRODUCT_EDITED,
    PRODUCT_EDIT_FAIL,
    PRODUCT_DELETED,
    PRODUCT_DELETION_FAIL,
    PRODUCT_IMAGES_UPLOAD_FAIL,
    PRODUCT_IMAGES_UPLOADED,
    PRODUCT_IMAGES_LOADED,
    PRODUCT_IMAGES_LOADING,
    PRODUCT_IMAGES_LOAD_FAIL,
    PRODUCT_REVIEWS_LOADED,
    PRODUCT_REVIEWS_LOADING,
    PRODUCT_REVIEWS_LOAD_FAIL,
    PRODUCT_REVIEWS_ADDED,
    PRODUCT_REVIEWS_DELETED,
    PRODUCT_REVIEWS_DELETING,
} from "./types";
// import {getCommentsProduct} from '../Components/Product';

export const add_Product = (Product) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_ADDING });

    // Request Body
    const body = JSON.stringify(Product);

    console.log(body);

    http.post("/ManageShops/products/", body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_ADDED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_ADDING_FAIL,
            });
        });
};

export const edit_Product = (Product) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_ADDING });

    // Request Body
    const body = JSON.stringify(Product);

    console.log(body);

    http.put(
        `/ManageShops/products/${Product.id}/`,
        body,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: PRODUCT_EDITED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_EDIT_FAIL,
            });
        });
};

export const getProduct = (id) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_LOADING });

    // Request Body
    const body = JSON.stringify(id);

    console.log(body);
    http.get(`/ManageShops/product/${id}`, tokenConfig(getState))
        .then((res) => {
            // console.log("PP")
            dispatch({
                type: PRODUCT_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_LOADING_FAIL,
            });
        });
};

export const delete_Product = (id) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_LOADING });

    // Request Body
    const body = JSON.stringify(id);

    console.log(body);
    http.delete(`/ManageShops/products/${id}/`, tokenConfig(getState))
        .then((res) => {
            // console.log("PP")
            dispatch({
                type: PRODUCT_DELETED,
                payload: id,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_DELETION_FAIL,
            });
        });
};

export const addImages = (obj) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_LOADING });

    // Request Body
    const body = JSON.stringify(obj);
    const formData = new FormData();
    obj.images.map((image) => formData.append("images", image));
    formData.append("pid", obj.pid);

    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            "Access-Control-Allow-Origin": "*",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    console.log(formData);
    http.post(`/ManageShops/productimage`, formData, config)
        .then((res) => {
            // console.log("PP")
            dispatch({
                type: PRODUCT_IMAGES_UPLOADED,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_IMAGES_UPLOAD_FAIL,
            });
        });
};

export const getImages = (obj) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_IMAGES_LOADING });

    // Request Body
    const body = JSON.stringify(obj);

    console.log(body);
    http.get(`/ManageShops/getproductimage/${obj}`, tokenConfig(getState))
        .then((res) => {
            console.log(res.data);
            // console.log("PP")
            dispatch({
                type: PRODUCT_IMAGES_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_IMAGES_LOAD_FAIL,
            });
        });
};

export const deleteImages = (obj) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_IMAGES_LOADING });

    // Request Body
    const body = JSON.stringify(obj);

    // console.log(formData)
    http.get(`/ManageShops/productimage`, body, tokenConfig(getState))
        .then((res) => {
            // console.log("PP")
            dispatch({
                type: PRODUCT_IMAGES_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: PRODUCT_IMAGES_LOAD_FAIL,
            });
        });
};

export const getComment = (obj) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_REVIEWS_LOADING });

    // Request Body
    const body = JSON.stringify(obj);
    // console.log(formData)
    // console.log(obj);
    http.get(`/ManageReviews/reviews/${obj}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_REVIEWS_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            console.log("err");
            dispatch({
                type: PRODUCT_REVIEWS_LOAD_FAIL,
            });
        });
};
export const postComment = (obj) => (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify(obj);
    http.post(`/ManageReviews/reviews/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_REVIEWS_ADDED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteComment = (obj) => (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify(obj);
    dispatch({
        type: PRODUCT_REVIEWS_DELETING,
    });
    http.delete(`/ManageReviews/deletereviews/${obj}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_REVIEWS_DELETED,
                payload: obj,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};
