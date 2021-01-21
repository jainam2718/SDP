import {
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  FETCHING_DATA,
  FETCHING_COMPLETE
} from './types';

import { returnErrors } from './messages';
import http from '../http-common';
import {tokenConfig} from './auth'

//Get Vendor
export const loadVendor = () => (dispatch,getState) => {
  dispatch({ type: FETCHING_DATA });
  // Get Vendor From Server
  http
    .get('/Authuser/get_vendor', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: FETCHING_COMPLETE,
            payload: res.data,
        });
    }).catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    });
};


// Update Vendor
export const updateVendor = (data) => (dispatch,getState) => {
  
  // Request Body
  const body = JSON.stringify(data);
  http
  .post('/Authuser/vendor/update', body, tokenConfig(getState))
  .then((res) => {
    console.log(res);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: UPDATE_FAIL,
    });
  });
};
