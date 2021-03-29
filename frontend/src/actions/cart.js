import {tokenConfig} from './auth';
import http from '../http-common';
import {
    CART_LOADED,
    CART_ITEM_ADDED,
    CART_ITEM_ADD_FAIL,
    CART_LOADING,
    CART_LOAD_FAIL,
    CART_ITEM_DELETED,
    CART_ITEM_DELETION_FAIL,
    CART_ITEM_MODIFIED,
    CART_ITEM_MODIFY_FAIL,
    ORDERS_LOADED,
    ORDERS_LOADING,
    ORDERS_LOAD_FAIL,
} from './types';
import cart from '../reducers/cart';

export const addToCart = (data) => (dispatch, getState) => {
    //dispatch({ CART_ITEM_ADDING });
    const body = JSON.stringify(data);
    http.post('ManageOrders/cart/', body, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: CART_ITEM_ADDED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: CART_ITEM_ADD_FAIL,
            });
        });
};

export const getCartItems = () => (dispatch, getState) => {
    dispatch({type: CART_LOADING});
    http.get('ManageOrders/cart/', tokenConfig(getState))
        .then((res) => {
            //console.log(res.data);
            dispatch({
                type: CART_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: CART_LOAD_FAIL,
            });
        });
};

export const getOrderItems = () => (dispatch, getState) => {
    dispatch({type: ORDERS_LOADING});
    http.get('ManageOrders/orders/', tokenConfig(getState))
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: ORDERS_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: ORDERS_LOAD_FAIL,
            });
        });
};

export const deleteCartItem = (id) => (dispatch, getState) => {
    dispatch({type: CART_LOADING});

    // Request Body
    const body = JSON.stringify(id);

    console.log(body);
    http.delete(`/ManageOrders/cart/${id}/`, tokenConfig(getState))
        .then((res) => {
            // console.log("PP")
            dispatch({
                type: CART_ITEM_DELETED,
                payload: id,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            // console.log(err)
            dispatch({
                type: CART_ITEM_DELETION_FAIL,
            });
        });
};

export const modifyItemQuantity = (id, quantity) => (dispatch, getState) => {
    const body = JSON.stringify({quantity});
    var obj = {id: id, quantity: quantity};
    http.put(`/ManageOrders/cart/${id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CART_ITEM_MODIFIED,
                payload: obj,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: CART_ITEM_MODIFY_FAIL,
            });
        });
};
