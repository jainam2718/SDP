import {tokenConfig} from './auth';
import http from '../http-common';
import {PAYMENT_FAIL, PAYMENT_SUCCESS} from './types';

export const pay = (data) => (dispatch, getState) => {
    //dispatch({ CART_ITEM_ADDING });
    const body = JSON.stringify(data);
    console.log(body);
    http.post('ManageOrders/pay', body, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: PAYMENT_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('PAy Error');
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PAYMENT_FAIL,
            });
        });
};
