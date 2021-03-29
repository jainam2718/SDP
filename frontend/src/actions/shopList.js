import {returnErrors} from './messages';
import http from '../http-common';

import {
    SHOP_LIST_LOADED,
    SHOP_LIST_LOADING,
    SHOP_LIST_LOADING_FAIL,
} from './types';

export const getAllShopList = () => (dispatch, getState) => {
    // SHOP List Loading
    dispatch({type: SHOP_LIST_LOADING});
    http.get('/Authuser/vendors/all', tokenConfig(getState))
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: SHOP_LIST_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: SHOP_LIST_LOADING_FAIL,
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
