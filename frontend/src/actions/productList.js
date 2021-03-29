import {returnErrors} from './messages';
import http from '../http-common';

import {
    PRODUCT_LIST_LOADED,
    PRODUCT_LIST_LOADING,
    PRODUCT_LIST_LOADING_FAIL,
} from './types';

export const getAllProductList = () => (dispatch, getState) => {
    // Product List Loading
    dispatch({type: PRODUCT_LIST_LOADING});
    http.get('/ManageShops/products/all', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_LIST_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PRODUCT_LIST_LOADING_FAIL,
            });
        });
};

export const getProductList = (id) => (dispatch, getState) => {
    // Product List Loading
    dispatch({type: PRODUCT_LIST_LOADING});
    http.get(`/ManageShops/products/all/by_vendor/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_LIST_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PRODUCT_LIST_LOADING_FAIL,
            });
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
