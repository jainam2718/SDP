import { tokenConfig } from "./auth";
import http from "../http-common";
import { PAYMENT_FAIL, PAYMENT_SUCCESS, PAYMENT_IN_PROCESS } from "./types";

export const pay = (data) => (dispatch, getState) => {
    dispatch({ type: PAYMENT_IN_PROCESS });
    const body = JSON.stringify(data);
    http.post("ManageOrders/pay", body, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({
                type: PAYMENT_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log("PAy Error");
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PAYMENT_FAIL,
            });
        });
};
